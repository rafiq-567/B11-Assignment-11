import React from 'react';
import { FaCar, FaDollarSign, FaCalendarCheck, FaHeadset } from 'react-icons/fa'; 

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCar className="text-4xl text-red-800 mb-4" />,
      title: 'Wide Variety of Cars',
      description: 'From budget-friendly options to luxurious vehicles, find the perfect car for every journey and occasion.',
    },
    {
      icon: <FaDollarSign className="text-4xl text-red-800 mb-4" />,
      title: 'Affordable Prices',
      description: 'Enjoy competitive daily rates with no hidden fees. We offer transparent pricing you can always count on.',
    },
    {
      icon: <FaCalendarCheck className="text-4xl text-red-800 mb-4" />,
      title: 'Easy Booking Process',
      description: 'Book your ideal ride in just a few clicks! Our seamless and intuitive platform makes renting a breeze.',
    },
    {
      icon: <FaHeadset className="text-4xl text-red-800 mb-4" />,
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is available around the clock to assist you with any queries or needs.',
    },
  ];

  return (
    <section className="py-16 bg-gray-900"> 
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-amber-700">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-orange-600 p-8 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              
              {feature.icon}
              
              <h3 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-800">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;