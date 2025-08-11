import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Trash2, Calendar } from 'lucide-react'; // Assuming you have lucide-react installed
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { toast } from 'react-toastify';

const MyBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const [modifyingId, setModifyingId] = useState(null);
    const [cancelId, setCancelId] = useState(null);
    const [newStart, setNewStart] = useState(null);
    const [newEnd, setNewEnd] = useState(null);
    // State to hold the current booking being modified, for displaying its details in the modal
    const [currentBookingToModify, setCurrentBookingToModify] = useState(null);


    const { data: bookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Query runs only when user email is available
        // staleTime: 5 * 60 * 1000, // Optional: data considered fresh for 5 minutes
        // cacheTime: 10 * 60 * 1000, // Optional: data kept in cache for 10 minutes
    });

    const cancelBooking = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/bookings/${id}/cancel`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings', user?.email] }); // Use object syntax for invalidateQueries
            toast.success("Booking cancelled successfully!");
        },
        onError: (err) => {
            console.error("Cancellation failed:", err);
            toast.error(`Cancellation failed: ${err.response?.data?.message || err.message || 'Unknown error'}`);
        },
        onSettled: () => {
            setCancelId(null); // Close the cancel modal
        }
    });

    const modifyBooking = useMutation({
        mutationFn: ({ id, startDate, endDate }) =>
            axiosSecure.patch(`/bookings/${id}/modify`, { startDate, endDate }), // Ensure backend expects ISO strings
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings', user?.email] }); // Use object syntax for invalidateQueries
            toast.success("Booking dates modified successfully!");
        },
        onError: (err) => {
            console.error("Modification failed:", err);
            toast.error(`Modification failed: ${err.response?.data?.message || err.message || 'Unknown error'}`);
        },
        onSettled: () => {
            setModifyingId(null); // Close the modify modal
            setCurrentBookingToModify(null); // Clear the current booking
            setNewStart(null);
            setNewEnd(null);
        }
    });

    // Handler for opening the modify modal
    const handleOpenModifyModal = (booking) => {
        setModifyingId(booking._id);
        setCurrentBookingToModify(booking); // Store the entire booking object
        // Set initial dates, ensuring they are valid Date objects or null
        setNewStart(booking.startDate ? new Date(booking.startDate) : null);
        setNewEnd(booking.endDate ? new Date(booking.endDate) : null);
    };

    // Handler for confirming the date modification
    const handleConfirmModification = async () => {
        if (!newStart || !newEnd) {
            toast.error("Please select both start and end dates.");
            return;
        }
        if (newStart > newEnd) {
            toast.error("End date cannot be before start date.");
            return;
        }

        // Calculate total price based on new dates (if your backend expects it, or if it calculates it)
        // For now, let's assume backend calculates it based on new dates.
        // If you need to pass total price from frontend, you'll need the car's daily rental price.
        // For simplicity, we'll send only dates as per your mutationFn.

        await modifyBooking.mutate({
            id: modifyingId,
            startDate: newStart.toISOString(),
            endDate: newEnd.toISOString(),
        });
    };

    if (isLoading) return <p className="text-center py-10">Loading your bookings...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Error loading bookings: {error.message}</p>;
    if (!bookings || bookings.length === 0) {
        return <p className="text-center py-10 text-gray-600">You have no active bookings.</p>;
    }

    return (
        <div className="p-4 mt-20">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">My Bookings</h2>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    {/* Table Head (Desktop only) */}
                    <thead className="bg-gray-100 hidden md:table-header-group">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Car Image</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Car Model</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Booking Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Price</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {bookings.map(booking => (
                            <tr key={booking._id} className="block md:table-row hover:bg-gray-50 border-b md:border-none">
                                {/* Car Image */}
                                <td
                                    className="block md:table-cell p-4 before:content-[attr(data-label)] md:before:content-none font-medium text-gray-900"
                                    data-label="Car Image"
                                >
                                    <div className="flex items-center gap-3">
                                        <img src={booking.imageUrl} alt={booking.carModel} className="w-16 h-10 object-cover rounded" />
                                    </div>
                                </td>

                                {/* Car Model */}
                                <td
                                    className="block md:table-cell p-4 before:content-[attr(data-label)] md:before:content-none font-medium text-gray-900"
                                    data-label="Car Model"
                                >
                                    {booking.carModel}
                                </td>

                                {/* Booking Date */}
                                <td
                                    className="block md:table-cell p-4 before:content-[attr(data-label)] md:before:content-none text-gray-600"
                                    data-label="Booking Date"
                                >
                                    {new Date(booking.bookingDate).toLocaleString()}
                                </td>

                                {/* Start Date */}
                                <td
                                    className="block md:table-cell p-4 before:content-[attr(data-label)] md:before:content-none text-gray-600"
                                    data-label="Start Date"
                                >
                                    {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'}
                                </td>

                                {/* End Date */}
                                <td
                                    className="block md:table-cell p-4 before:content-[attr(data-label)] md:before:content-none text-gray-600"
                                    data-label="End Date"
                                >
                                    {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
                                </td>

                                {/* Total Price */}
                                <td
                                    className="block md:table-cell p-4 before:content-[attr(data-label)] md:before:content-none font-semibold text-gray-800"
                                    data-label="Total Price"
                                >
                                    ${(booking.totalPrice?.toFixed(2) ?? 'N/A')}
                                </td>

                                {/* Status */}
                                <td
                                    className="block md:table-cell p-4 before:content-[attr(data-label)] md:before:content-none"
                                    data-label="Status"
                                >
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'}`
                                    }>
                                        {booking.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td
                                    className="block md:table-cell p-4 before:content-[attr(data-label)] md:before:content-none"
                                    data-label="Actions"
                                >
                                    <div className="flex flex-col md:flex-row gap-2">
                                        <button
                                            className="text-red-500 hover:text-red-700 flex items-center gap-1 p-2 rounded-md hover:bg-red-50 transition-colors"
                                            onClick={() => {
                                                setCancelId(booking._id);
                                                toast.info("Confirm cancellation.");
                                            }}
                                            disabled={cancelBooking.isLoading || ['Cancelled', 'cancelled'].includes(booking.status)}
                                            title={['Cancelled', 'cancelled'].includes(booking.status) ? 'Booking already cancelled' : 'Cancel booking'}
                                        >
                                            <Trash2 size={16} /> <span className="md:hidden">Cancel</span>
                                        </button>

                                        <button
                                            className="text-blue-500 hover:text-blue-700 flex items-center gap-1 p-2 rounded-md hover:bg-blue-50 transition-colors"
                                            onClick={() => handleOpenModifyModal(booking)}
                                            disabled={modifyBooking.isLoading || ['Cancelled', 'cancelled'].includes(booking.status)}
                                            title={['Cancelled', 'cancelled'].includes(booking.status) ? 'Cannot modify cancelled booking' : 'Modify booking dates'}
                                        >
                                            <Calendar size={16} /> <span className="md:hidden">Modify</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals (same as before) */}
            {cancelId && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    {/* ... existing cancel modal code ... */}
                </div>
            )}

            {modifyingId && currentBookingToModify && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    {/* ... existing modify modal code ... */}
                </div>
            )}
        </div>
    );
};

export default MyBookings;