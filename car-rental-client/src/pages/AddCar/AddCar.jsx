import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router'

const AddCar = () => {
     const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const handleAddCar = async (e) => {
       
        e.preventDefault();
        const form = e.target;

        const carModel = form.carModel.value;
        const dailyRentalPrice = parseFloat(form.dailyRentalPrice.value); // Convert to number
        const availability = form.availability.value;
        const vehicleRegistrationNumber = form.vehicleRegistrationNumber.value;
        // Split features by comma and trim whitespace for an array of strings
        const features = form.features.value.split(',').map(feature => feature.trim());
        const description = form.description.value;
        const imageUrl = form.imageURL.value;
        const location = form.location.value;

        const bookingCount = 0;
        console.log(location, bookingCount, imageUrl, description, features, vehicleRegistrationNumber, availability, dailyRentalPrice, carModel)

        // 2. Get user details (owner) from AuthContext
        const ownerEmail = user?.email; // Safely get email if user exists
        const ownerUid = user?.uid;     // Safely get UID if user exists
        const datePosted = new Date().toISOString();




        // 3. Create a car object
        const newCar = {
            carModel,
            dailyRentalPrice,
            availability,
            vehicleRegistrationNumber,
            features,
            description,
            bookingCount,
            imageUrl,
            location,
            ownerEmail, 
            ownerUid,  
            datePosted,
        };
        console.log('New Car Data:', newCar);
        axios.post(`${import.meta.env.VITE_API_URL}/add-car`, newCar)
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: "Good job!",
                    text: "car added successfully!",
                    icon: "success"
                });
                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })
        // save car data
        // fetch(`${import.meta.env.VITE_API_URL}/add-car`, {
        //     method: "POST",
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(newCar),
        // })
        // .then(res => res.json())
        // .then(data=>{
        // console.log(data)
        // })


    }

    return (
        <div className="flex justify-center py-10  bg-gray-900">
            <div className="w-full max-w-2xl p-6  bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold text-center text-white mb-8 text-gray-800 ">Add New Car</h1>
                <form onSubmit={handleAddCar}>
                    <fieldset className="fieldset  bg-gray-700  border-gray-600 rounded-box border p-6 space-y-4"> {/* Adjusted spacing and padding */}

                        <div className="form-control"> {/* Wrap each input group for better styling */}
                            <label className="label">
                                <span className="label-text text-gray-200">Car Model</span>
                            </label>
                            <input type="text" name='carModel' className="input input-bordered w-full bg-gray-600 text-white" placeholder="Enter car model" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-200">Daily Rental Price</span>
                            </label>
                            <input type="number" name='dailyRentalPrice' className="input input-bordered w-full bg-gray-600 text-white" placeholder="Enter daily rental price" required min="0" step="0.01" /> {/* Changed to type="number" for price */}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-200">Availability</span>
                            </label>
                            <select
                                name="availability"
                                className="select select-bordered w-full bg-gray-600 text-white"
                                defaultValue="Available"
                                required
                            >
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-200">Vehicle Registration Number</span>
                            </label>
                            <input type="text" name='vehicleRegistrationNumber' className="input input-bordered w-full bg-gray-600 text-white" placeholder="Enter vehicle registration number" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-200">Features (e.g., GPS, AC, etc.)</span>
                            </label>
                            <input type="text" name='features' className="input input-bordered w-full bg-gray-600 text-white" placeholder="Enter features separated by comma" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-200">Description</span>
                            </label>
                            <textarea placeholder="Write a short description" name='description' className="textarea textarea-bordered h-24 w-full bg-gray-600 text-white" required></textarea>
                        </div>

                        {/* As per requirements, bookingCount should default to 0 and not be user editable on this page */}
                        {/* <label className="label">bookingCount(default 0)</label>
                        <input type="text" name='bookingCount' className="input" placeholder="Booking count" /> */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-200">Image URL</span>
                            </label>
                            <input type="url" name='imageURL' className="input input-bordered w-full bg-gray-600 text-white" placeholder="Enter Image URL" required /> {/* Changed to type="url" */}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-200">Location</span>
                            </label>
                            <input type="text" name='location' className="input input-bordered w-full bg-gray-600 text-white" placeholder="Enter location" required />
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">Add Car</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default AddCar;