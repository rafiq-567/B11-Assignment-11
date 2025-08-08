import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { toast } from 'react-toastify';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [car, setCar] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isBookingLoading, setIsBookingLoading] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/cars/${id}`)
            .then(res => setCar(res.data))
            .catch(err => console.error("Error fetching car details:", err));
    }, [id]);

    if (!car) return <p className="text-center text-lg mt-10">Loading car details...</p>;

    const calculateTotalPrice = () => {
        if (!startDate || !endDate || endDate < startDate) return 0;
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        return days > 0 ? days * car.dailyRentalPrice : 0;
    };

    const handleBookingConfirm = async () => {
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates.");
            return;
        }
        if (endDate < startDate) {
            toast.error("End date cannot be before start date.");
            return;
        }

        setIsBookingLoading(true);

        const bookingData = {
            carId: car._id,
            carModel: car.carModel,
            imageUrl: car.imageUrl,
            customerEmail: user?.email,
            bookingDate: new Date().toISOString(),
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            totalPrice: calculateTotalPrice(),
            status: 'Confirmed'
        };

        try {
            const response = await axiosSecure.post('/bookings', bookingData);
            console.log("Booking successful:", response.data);
            toast.success("Booking confirmed successfully!");

            setShowModal(false);
            setShowSuccessModal(true);

        } catch (err) {
            console.error("Booking failed:", err);
            if (err.response) {
                toast.error(`Booking failed: ${err.response.data.message || err.response.statusText}`);
            } else if (err.request) {
                toast.error("Booking failed: No response from server. Check your backend connection.");
            } else {
                toast.error(`Booking failed: ${err.message}`);
            }
        } finally {
            setIsBookingLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
                <img src={car.imageUrl} alt={car.carModel} className="w-full md:w-1/2 rounded-lg object-cover h-64 md:h-auto" />
                <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
                    <h2 className="text-3xl font-bold mb-2 text-blue-700">{car.carModel}</h2>
                    <p className="text-xl mb-2">Price/Day: <span className="font-semibold text-green-600">${car.dailyRentalPrice}</span></p>
                    <p className="text-md mb-4">Availability: <span className="font-semibold">{car.availability}</span></p>
                    <p className="text-gray-700 leading-relaxed mb-6">{car.description}</p>
                    <button
                        className="btn btn-primary w-full md:w-auto"
                        onClick={() => setShowModal(true)}
                        disabled={car.availability !== 'Available'}
                    >
                        {car.availability === 'Available' ? 'Book Now' : 'Not Available'}
                    </button>
                </div>
            </div>


            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
                        <h3 className="text-2xl font-semibold mb-4 text-center">Confirm Booking</h3>
                        <p className="mb-2"><strong>Model:</strong> {car.carModel}</p>
                        <p className="mb-4"><strong>Price/Day:</strong> ${car.dailyRentalPrice}</p>

                        <div className="my-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={new Date()}
                                    className="input input-bordered w-full p-2"
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="Select start date"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate || new Date()}
                                    className="input input-bordered w-full p-2"
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="Select end date"
                                />
                            </div>
                        </div>

                        <p className="mt-4 text-lg"><strong>Total Price:</strong> <span className="text-green-600">${calculateTotalPrice().toFixed(2)}</span></p>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="btn btn-ghost px-5 py-2"
                                onClick={() => setShowModal(false)}
                                disabled={isBookingLoading}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary px-5 py-2"
                                onClick={handleBookingConfirm}
                                disabled={isBookingLoading || !startDate || !endDate || calculateTotalPrice() <= 0}
                            >
                                {isBookingLoading ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm text-center">
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Booking Successful! 🎉</h3>
                        <p className="text-lg text-gray-700 mb-6">
                            Your car rental for <span className="font-semibold">{car.carModel}</span> has been confirmed.
                        </p>
                        <p className="text-md text-gray-600 mb-6">
                            You can view and manage your bookings in "My Bookings".
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                className="btn btn-primary px-6 py-2"
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    navigate('/myBookings');
                                }}
                            >
                                Go to My Bookings
                            </button>
                            <button
                                className="btn btn-ghost px-6 py-2"
                                onClick={() => {
                                    setShowSuccessModal(false);
                                }}
                            >
                                Continue Browse
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarDetails;