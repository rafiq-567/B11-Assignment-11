import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { FaCar } from 'react-icons/fa';
import { AiOutlineDollar } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const AvailableCars = () => {
    const [cars, setCars] = useState([]);
    const [view, setView] = useState('grid');
    const [sort, setSort] = useState('newest');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/cars?available=true`)
            .then(res => {
                let sortedCars = res.data;
                if (sort === 'newest') sortedCars.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
                if (sort === 'oldest') sortedCars.sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));
                if (sort === 'lowest') sortedCars.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
                if (sort === 'highest') sortedCars.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
                setCars(sortedCars);
            })
            .catch(err => {
                console.error("Error fetching cars:", err);
            });
    }, [sort]);

    const filteredCars = cars.filter(car =>
        car.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
                {/* 🔍 Search Bar */}
                <input
                    type="text"
                    placeholder="Search by model, brand, or location..."
                    className="input px-2 py-1 rounded border w-full md:w-2/3"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />

                {/* Sort & Toggle */}
                <div className="flex justify-end items-center gap-2">
                    <select value={sort} onChange={e => setSort(e.target.value)} className="input px-2 py-1 rounded border">
                        <option value="" disabled>Sort By</option>
                        <option value="newest">Date Added (Newest)</option>
                        <option value="oldest">Date Added (Oldest)</option>
                        <option value="lowest">Price (Lowest)</option>
                        <option value="highest">Price (Highest)</option>
                    </select>
                    <button onClick={() => setView(view === 'grid' ? 'list' : 'grid')} className="text-gray-100 bg-amber-600 btn">
                        Toggle View ({view === 'grid' ? 'List' : 'Grid'})
                    </button>
                </div>
            </div>

            <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4' : 'space-y-4'}>
                {filteredCars.map(car => (
                    <div key={car._id} className="text-black border p-3 rounded-md shadow-sm bg-white">
                        <img src={car.imageUrl} alt={car.carModel} className="w-full h-40 object-cover rounded-md" />

                        <div className='mt-2 space-y-1'>
                            <div className='flex items-center gap-2'>
                                <FaCar className="text-red-800" />
                                <h3 className="text-lg font-semibold">{car.carModel}</h3>
                            </div>

                            <div className='flex items-center gap-2'>
                                <AiOutlineDollar className="text-orange-400" />
                                <p>Price: ${car.dailyRentalPrice}/day</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <MdLocationOn className="text-amber-400" />
                                <p>Location: {car.location}</p>
                            </div>

                            

                            <div className='flex items-center gap-2 mt-1'>
                                {car.availability === "Available" ? (
                                    <FiCheckCircle className="text-green-500" />
                                ) : (
                                    <FiXCircle className="text-red-500" />
                                )}
                                <span className="font-medium">{car.availability}</span>
                            </div>

                            <div className='text-sm flex text-gray-700 gap-2'>
                                <FaCar className="text-blue-600 mt-1 " />
                                Bookings Count: {car.bookingCount || 0}
                            </div>
                            <p className="text-sm text-gray-600">{car.description}</p>

                            <Link to={`/car/${car._id}`}>
                                <button className="mt-2 btn btn-primary w-full">Book Now</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableCars;
