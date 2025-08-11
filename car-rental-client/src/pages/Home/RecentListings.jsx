import { FaCar } from "react-icons/fa";
import { AiOutlineDollar } from "react-icons/ai";
import { CgUnavailable } from "react-icons/cg";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { formatRelativeTime } from "../shared/formatTime";
import { MdDescription } from "react-icons/md";


const RecentListings = ({ car }) => {
    const { _id, imageUrl, carModel, dailyRentalPrice, availability, bookingCount, datePosted, description } = car;

    const isAvailable = availability === "Available";


    return (
        <div className='card mt-8 flex bg-emerald-100 shadow-xl w-11/12 mx-auto'>
            
            <figure className='h-36 '>

                <img src={imageUrl} alt='Movie' />
            </figure>
            <div className='flex mt-4 w-full ml-4 mb-3 text-black'>
                <div>
                    <div className="flex gap-2">
                        
                        <MdDescription className="mt-1" />
                        <h2 className=''>{description}</h2>
                    </div>
                    <div className="flex gap-2">
                        <FaCar className="mt-1" />
                        <h2 className=''>{carModel}</h2>
                    </div>
                    <div className="flex gap-2">
                        <AiOutlineDollar className="mt-1" />
                        <p>Daily Price: {dailyRentalPrice}</p>
                    </div>
                    <div className="flex gap-2">

                         {isAvailable ? (
                    <>
                        <FaRegCheckCircle className="text-green-500 text-lg mt-1" />
                        <span className="text-green-600">Available</span>
                    </>
                ) : (
                    <>
                        <CgUnavailable className="text-red-500 text-lg mt-1" />
                        <span className="text-red-600">Unavailable</span>
                    </>
                )}
                    </div>
                  
                    <div className="flex gap-2">
                        <IoIosTime className="mt-1 text-amber-600" />

                        <p>Added: {formatRelativeTime(datePosted)}</p>
                    </div>
                    <div>
                        <button className="btn bg-amber-700 rounded-lg mx-auto text-white">See More</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RecentListings;