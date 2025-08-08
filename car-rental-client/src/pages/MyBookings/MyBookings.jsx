// import React, { useContext, useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Trash2, Calendar } from 'lucide-react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import { AuthContext } from '../../context/AuthContext/AuthContext';
// import { toast } from 'react-toastify';

// const MyBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   const [modifyingId, setModifyingId] = useState(null);
//   const [cancelId, setCancelId] = useState(null);
//   const [newStart, setNewStart] = useState(null);
//   const [newEnd, setNewEnd] = useState(null);

//   const { data: bookings = [], isLoading, isError, error } = useQuery({
//     queryKey: ['bookings', user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email
//   });

//   const cancelBooking = useMutation({
//     mutationFn: (id) => axiosSecure.patch(`/bookings/${id}/cancel`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['bookings', user?.email]);
//       toast.success("Booking cancelled successfully!");
//     },
//     onError: (err) => {
//       console.error("Cancellation failed:", err);
//       toast.error(`Cancellation failed: ${err.response?.data?.message || err.message || 'Unknown error'}`);
//     },
//     onSettled: () => {
//       setCancelId(null);
//     }
//   });

//   const modifyBooking = useMutation({
//     mutationFn: ({ id, startDate, endDate }) =>
//       axiosSecure.patch(`/bookings/${id}/modify`, { startDate, endDate }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['bookings', user?.email]);
//       toast.success("Booking dates modified successfully!");
//     },
//     onError: (err) => {
//       console.error("Modification failed:", err);
//       toast.error(`Modification failed: ${err.response?.data?.message || err.message || 'Unknown error'}`);
//     },
//     onSettled: () => {
//       setModifyingId(null);
//       setNewStart(null);
//       setNewEnd(null);
//     }
//   });

//   if (isLoading) return <p className="text-center py-10">Loading your bookings...</p>;
//   if (isError) return <p className="text-center py-10 text-red-500">Error loading bookings: {error.message}</p>;
//   if (!bookings || bookings.length === 0) {
//     return <p className="text-center py-10 text-gray-600">You have no active bookings.</p>;
//   }

//   return (
//     <div className="p-4 overflow-x-auto">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">My Bookings</h2>
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Car Image</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Car Model</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Booking Date</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Price</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
//             <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {bookings.map(booking => (
//             <tr key={booking._id} className="hover:bg-gray-50">
//               <td className="p-2">
//                 <img src={booking.imageUrl} alt={booking.carModel} className="w-16 h-10 object-cover rounded" />
//               </td>
//               <td className="p-2 text-gray-700 font-medium">{booking.carModel}</td>
//               <td className="p-2 text-gray-600">{new Date(booking.bookingDate).toLocaleString()}</td>
//               {/* Corrected Date Display for Start/End Date */}
//               <td className="p-2 text-gray-600">
//                 {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'}
//               </td>
//               <td className="p-2 text-gray-600">
//                 {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
//               </td>
//               <td className="p-2 text-gray-800 font-semibold">${(booking.totalPrice?.toFixed(2) ?? 'N/A')}</td>
//               <td className="p-2">
//                 <span className={`px-2 py-1 rounded-full text-xs font-semibold
//                   ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
//                     booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                     booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                     'bg-gray-100 text-gray-800'}`
//                 }>
//                   {booking.status}
//                 </span>
//               </td>
//               <td className="p-2 flex gap-2 items-center">
//                 <button
//                   className="text-red-500 hover:text-red-700 flex items-center gap-1 p-2 rounded-md hover:bg-red-50 transition-colors"
//                   onClick={() => {
//                     setCancelId(booking._id);
//                     toast.info("Confirm cancellation.");
//                   }}
//                   disabled={cancelBooking.isLoading || booking.status === 'cancelled'}
//                   title={booking.status === 'cancelled' ? 'Booking already cancelled' : 'Cancel booking'}
//                 >
//                   <Trash2 size={16} /> Cancel
//                 </button>
//                 <button
//                   className="text-blue-500 hover:text-blue-700 flex items-center gap-1 p-2 rounded-md hover:bg-blue-50 transition-colors"
//                   onClick={() => {
//                     setModifyingId(booking._id);
//                     // Add checks here for valid date strings before creating Date objects
//                     setNewStart(booking.startDate ? new Date(booking.startDate) : null);
//                     setNewEnd(booking.endDate ? new Date(booking.endDate) : null);
//                     toast.info("Modify booking dates.");
//                   }}
//                   disabled={modifyBooking.isLoading || booking.status === 'cancelled'}
//                   title={booking.status === 'cancelled' ? 'Cannot modify cancelled booking' : 'Modify booking dates'}
//                 >
//                   <Calendar size={16} /> Modify Date
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Cancel Modal */}
//       {cancelId && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-80 max-w-sm">
//             <p className="text-lg text-gray-800 mb-4">Are you sure you want to cancel this booking?</p>
//             <div className="flex justify-end gap-3">
//               <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors" onClick={() => setCancelId(null)}>No</button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-1"
//                 onClick={() => cancelBooking.mutate(cancelId)}
//                 disabled={cancelBooking.isLoading}
//               >
//                 {cancelBooking.isLoading && <span className="loading loading-spinner loading-xs"></span>}
//                 Yes, Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modify Modal */}
//       {modifyingId && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96 max-w-md">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Modify Booking Dates</h3>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//               <DatePicker
//                 selected={newStart}
//                 onChange={(date) => setNewStart(date)}
//                 className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:border-blue-500"
//                 dateFormat="PP"
//                 minDate={new Date()}
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//               <DatePicker
//                 selected={newEnd}
//                 onChange={(date) => setNewEnd(date)}
//                 className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:border-blue-500"
//                 dateFormat="PP"
//                 minDate={newStart || new Date()}
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors" onClick={() => setModifyingId(null)}>Cancel</button>
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
//                 onClick={async () => {
//                   if (!newStart || !newEnd) {
//                     toast.error("Please select both start and end dates.");
//                     return;
//                   }
//                   if (newStart > newEnd) {
//                     toast.error("End date cannot be before start date.");
//                     return;
//                   }
//                   await modifyBooking.mutate({
//                     id: modifyingId,
//                     startDate: newStart.toISOString(),
//                     endDate: newEnd.toISOString(),
//                   });
//                 }}
//                 disabled={modifyBooking.isLoading}
//               >
//                 {modifyBooking.isLoading && <span className="loading loading-spinner loading-xs"></span>}
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;

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
        <div className="p-4 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">My Bookings</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-100">
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
                        <tr key={booking._id} className="hover:bg-gray-50">
                            <td className="p-2">
                                <img src={booking.imageUrl} alt={booking.carModel} className="w-16 h-10 object-cover rounded" />
                            </td>
                            <td className="p-2 text-gray-700 font-medium">{booking.carModel}</td>
                            <td className="p-2 text-gray-600">{new Date(booking.bookingDate).toLocaleString()}</td>
                            <td className="p-2 text-gray-600">
                                {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="p-2 text-gray-600">
                                {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="p-2 text-gray-800 font-semibold">${(booking.totalPrice?.toFixed(2) ?? 'N/A')}</td>
                            <td className="p-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                    ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : // 'Confirmed' might be capitalized
                                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : // 'Pending' might be capitalized
                                      booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' : // 'Cancelled' might be capitalized
                                      'bg-gray-100 text-gray-800'}`
                                }>
                                    {booking.status}
                                </span>
                            </td>
                            <td className="p-2 flex gap-2 items-center">
                                {/* Cancel Button */}
                                <button
                                    className="text-red-500 hover:text-red-700 flex items-center gap-1 p-2 rounded-md hover:bg-red-50 transition-colors"
                                    onClick={() => {
                                        setCancelId(booking._id);
                                        toast.info("Confirm cancellation.");
                                    }}
                                    disabled={cancelBooking.isLoading || booking.status === 'Cancelled' || booking.status === 'cancelled'} // Check both casings
                                    title={booking.status === 'Cancelled' || booking.status === 'cancelled' ? 'Booking already cancelled' : 'Cancel booking'}
                                >
                                    <Trash2 size={16} /> Cancel
                                </button>

                                {/* Modify Date Button */}
                                <button
                                    className="text-blue-500 hover:text-blue-700 flex items-center gap-1 p-2 rounded-md hover:bg-blue-50 transition-colors"
                                    onClick={() => handleOpenModifyModal(booking)} // Use the new handler
                                    disabled={modifyBooking.isLoading || booking.status === 'Cancelled' || booking.status === 'cancelled'} // Check both casings
                                    title={booking.status === 'Cancelled' || booking.status === 'cancelled' ? 'Cannot modify cancelled booking' : 'Modify booking dates'}
                                >
                                    <Calendar size={16} /> Modify Date
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Cancel Confirmation Modal */}
            {cancelId && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80 max-w-sm">
                        <p className="text-lg text-gray-800 mb-4">Are you sure you want to cancel this booking?</p>
                        <div className="flex justify-end gap-3">
                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors" onClick={() => setCancelId(null)}>No</button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-1"
                                onClick={() => cancelBooking.mutate(cancelId)}
                                disabled={cancelBooking.isLoading}
                            >
                                {cancelBooking.isLoading && <span className="loading loading-spinner loading-xs"></span>}
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modify Booking Dates Modal */}
            {modifyingId && currentBookingToModify && ( // Ensure currentBookingToModify is not null
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96 max-w-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Modify Booking for: <span className="text-blue-600">{currentBookingToModify.carModel}</span>
                        </h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <DatePicker
                                selected={newStart}
                                onChange={(date) => setNewStart(date)}
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:border-blue-500"
                                dateFormat="PP"
                                minDate={new Date()} // Can't select dates before today
                                placeholderText="Select new start date"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <DatePicker
                                selected={newEnd}
                                onChange={(date) => setNewEnd(date)}
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:border-blue-500"
                                dateFormat="PP"
                                minDate={newStart || new Date()} // End date cannot be before newStart or today
                                placeholderText="Select new end date"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                                onClick={() => {
                                    setModifyingId(null);
                                    setCurrentBookingToModify(null); // Clear on cancel
                                    setNewStart(null);
                                    setNewEnd(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
                                onClick={handleConfirmModification} // Call the new handler
                                disabled={modifyBooking.isLoading || !newStart || !newEnd || newStart > newEnd}
                            >
                                {modifyBooking.isLoading && <span className="loading loading-spinner loading-xs"></span>}
                                Confirm Modification
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;