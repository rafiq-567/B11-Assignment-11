

import React from 'react';

import { FaStar } from 'react-icons/fa'; 



const testimonialsData = [

 {

 id: 1,

 quote: "Renting a car was incredibly easy and straightforward. The car was spotless and the process was super quick. Highly recommend!",

name: "Aisha Rahman",

 city: "Dhaka",

 rating: 5,

 avatar: "https://randomuser.me/api/portraits/women/11.jpg" // Placeholder avatar

  },

  {

 id: 2,

 quote: "Fantastic selection and even better prices! Found the perfect luxury car for my weekend trip. Customer support was also very helpful.",

 name: "Mohammad Islam",

 city: "Chittagong",

 rating: 5,

 avatar: "https://randomuser.me/api/portraits/men/22.jpg" // Placeholder avatar

  },

  {

 id: 3,

 quote: "The booking process was a breeze. I loved the real-time availability updates. Will definitely use this service again!",

 name: "Fatima Begum",

 city: "Sylhet",

 rating: 4,

 avatar: "https://randomuser.me/api/portraits/women/33.jpg" // Placeholder avatar

  },

  {

 id: 4,

 quote: "Affordable rates and great customer service. Picked up and dropped off without any hassle. A top-notch car rental experience.",

 name: "Rahim Uddin",

 city: "Khulna",

 rating: 5,

 avatar: "https://randomuser.me/api/portraits/men/44.jpg" // Placeholder avatar

  },

];



const Testimonials = () => {

  return (

 // Background colors are now directly set to dark theme values

 <section className="py-20 bg-gray-900 transition-colors duration-300">

   <div className="container mx-auto px-4">

  {/* Text color is now directly set to dark theme text color */}

  <h2 className="text-5xl font-bold text-center mb-16 text-gray-100">

    What Our Customers Say

  </h2>



  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

    {testimonialsData.map((testimonial, index) => (

   <div

     key={testimonial.id}

     // Card background and text colors are now directly dark theme values

     className="bg-gray-700 p-8 rounded-lg shadow-lg flex flex-col items-center text-center

       transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl

       opacity-0 animate-fade-in" // Animation still applies

     style={{ animationDelay: `${index * 0.1}s` }}

   >

     <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-600 shadow-md">

    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />

     </div>

     <p className="text-lg italic text-gray-200 mb-4">

    "{testimonial.quote}"

     </p>

     <div className="flex justify-center mb-3">

    {[...Array(5)].map((_, i) => (

      <FaStar

     key={i}

     className={

       `text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-500'}` 

     }

      />

    ))}

     </div>

     <p className="font-semibold text-gray-100">{testimonial.name}</p>

     <p className="text-sm text-gray-400">{testimonial.city}</p>

   </div>

    ))}

  </div>

   </div>

 </section>

  );

};



export default Testimonials;