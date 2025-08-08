import React from 'react';
import { motion } from 'framer-motion';

const offers = [
  {
    title: "Get 15% Off for Weekend Rentals!",
    description: "Book now and enjoy exclusive weekend discounts.",
    cta: "Book Now",
    bg: "bg-gradient-to-r from-purple-500 to-indigo-600",
  },
  {
    title: "Luxury Cars at $99/day!",
    description: "This holiday season, drive in style for less.",
    cta: "Learn More",
    bg: "bg-gradient-to-r from-rose-500 to-pink-500",
  },
];

const SpecialOffers = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">🔥 Special Offers</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-2xl shadow-lg p-8 ${offer.bg} flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <p className="text-white/90">{offer.description}</p>
              </div>
              <button className="mt-6 px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition">
                {offer.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
