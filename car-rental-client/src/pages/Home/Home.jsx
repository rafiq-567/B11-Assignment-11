import { useState } from 'react';
import Banner from './Banner';
import WhyChooseUs from './WhyChooseUs';
import { useLoaderData } from 'react-router';
import RecentListings from './RecentListings';
import Testimonials from './Testimonials';
import SpecialOffers from './SpecialOffers';



const Home = () => {
    const data = useLoaderData()
    const [cars, setCars] = useState(data?.data || [])
    console.log(cars)
    return (
        <div className='bg-gray-900 mt-16'>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <h1 className='text-6xl text-center text-amber-500 mb-10'>Recent Listings</h1>
           <div className='grid grid-cols-3 bg-gray-900 mx-auto mt-4 '>
            
             {
                cars.map(car=>(
                <RecentListings key={car._id} car={car}></RecentListings>))
            }
           </div>
           <Testimonials></Testimonials>
           <SpecialOffers></SpecialOffers>
        </div>
    );
};

export default Home;