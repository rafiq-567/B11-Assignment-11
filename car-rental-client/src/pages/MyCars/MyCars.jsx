import { Link, useLoaderData } from 'react-router';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyCars = () => {
  const loaderData = useLoaderData();
  const initialCars = loaderData?.data || [];

  const [cars, setCars] = useState(initialCars);
  const [editingCar, setEditingCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortOption, setSortOption] = useState('newest');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const handleEditClick = (car) => {
    setEditingCar(car);
    setShowModal(true);
  };

  const handleDeleteClick = (car) => {
    setCarToDelete(car);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/cars/${carToDelete._id}`);
      if (res.data.deletedCount > 0) {
        toast.success('Car deleted successfully!');
        const filtered = cars.filter(car => car._id !== carToDelete._id);
        setCars(filtered);
      }
    } catch (error) {
      toast.error('Failed to delete car');
    } finally {
      setShowDeleteModal(false);
      setCarToDelete(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCar = {
      carModel: form.carModel.value,
      dailyRentalPrice: form.dailyRentalPrice.value,
      availability: form.availability.value,
      vehicleRegistrationNumber: form.vehicleRegistrationNumber.value,
      features: form.features.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      location: form.location.value,
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/cars/${editingCar._id}`, updatedCar);
      if (res.data.modifiedCount > 0) {
        toast.success('Car updated successfully!');
        const updatedList = cars.map((car) =>
          car._id === editingCar._id ? { ...car, ...updatedCar } : car
        );
        setCars(updatedList);
        setShowModal(false);
      }
    } catch (err) {
      toast.error('Failed to update car');
    }
  };

  const sortedCars = [...cars].sort((a, b) => {
    if (sortOption === 'newest') return new Date(b.datePosted) - new Date(a.datePosted);
    if (sortOption === 'oldest') return new Date(a.datePosted) - new Date(b.datePosted);
    if (sortOption === 'priceLow') return Number(a.dailyRentalPrice) - Number(b.dailyRentalPrice);
    if (sortOption === 'priceHigh') return Number(b.dailyRentalPrice) - Number(a.dailyRentalPrice);
    return 0;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-4 text-black">My Listed Cars</h1>

      {cars.length === 0 ? (
     <div className='flex-row justify-center items-center gap-4 h-auto text-center'>
           <p className=' text-red-600 mb-4'>
          No cars listed yet. 
        </p>
        <Link to='/addCar' className="text-blue-600 btn text-center">Add a car</Link>
     </div>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="select select-bordered max-w-xs"
            >
              <option value="newest">Date Added: Newest First</option>
              <option value="oldest">Date Added: Oldest First</option>
              <option value="priceLow">Price: Lowest First</option>
              <option value="priceHigh">Price: Highest First</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="table text-black">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Model</th>
                  <th>Price/day</th>
                  <th>Booking Count</th>
                  <th>Availability</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCars.map((car) => (
                  <tr key={car._id}>
                    <td>
                      <img className="h-12 w-12 object-cover" src={car.imageUrl} alt={car.carModel} />
                    </td>
                    <td>{car.carModel}</td>
                    <td>${car.dailyRentalPrice}</td>
                    <td>{car.bookingCount || 0}</td>
                    <td className={car.availability === 'Available' ? 'text-green-600' : 'text-red-600'}>
                      {car.availability}
                    </td>
                    <td>{new Date(car.datePosted).toLocaleDateString()}</td>
                    <td className="flex gap-2 mt-2">
                      <button
                        className="p-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
                        onClick={() => handleEditClick(car)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-2 bg-red-600 rounded-md text-white hover:bg-red-700"
                        onClick={() => handleDeleteClick(car)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {showModal && editingCar && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[60%]">
            <h2 className="text-3xl text-center font-bold mb-4">Update Car</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-2">
              <input name="carModel" defaultValue={editingCar.carModel} className="input input-bordered" required />
              <input name="dailyRentalPrice" defaultValue={editingCar.dailyRentalPrice} type="number" className="input input-bordered" required />
              <select name="availability" defaultValue={editingCar.availability} className="input input-bordered" required>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
              <input name="vehicleRegistrationNumber" defaultValue={editingCar.vehicleRegistrationNumber || ''} className="input input-bordered" />
              <textarea name="features" defaultValue={editingCar.features || ''} className="textarea textarea-bordered" />
              <input name="imageUrl" defaultValue={editingCar.imageUrl} className="input input-bordered" required />
              <input name="location" defaultValue={editingCar.location || ''} className="input input-bordered" />
              <textarea name="description" defaultValue={editingCar.description || ''} className="textarea textarea-bordered" />
              <div className="col-span-2 flex justify-center gap-2 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md text-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete <strong>{carToDelete?.carModel}</strong>?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="btn btn-outline">Cancel</button>
              <button onClick={confirmDelete} className="btn btn-error">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCars;
