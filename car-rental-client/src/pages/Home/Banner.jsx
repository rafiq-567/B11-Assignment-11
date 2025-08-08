import { Link } from 'react-router';
import car from '../../assets/car.webp'

const Banner = () => {
    return (
        <div style={{ backgroundImage: `url(${car})` }}
            className="bg-cover bg-center h-screen flex items-center justify-center mx-auto rounded-b-lg text-white">
            <div className="flex flex-col items-center justify-center text-center ">
                <h1 className="text-6xl font-bold drop-shadow-lg">Drive Your Dreams Today!</h1>
               
                 <Link
        to="/availableCars" 
        className="shadow-md mt-8 px-6 py-3 bg-orange-600 hover:bg-blue-700 rounded-lg text-lg"
      >
        View Available Cars
      </Link>
            </div>
        </div>
    );
};

export default Banner;