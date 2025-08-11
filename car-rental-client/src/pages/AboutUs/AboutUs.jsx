import React from "react";
import { Truck, Star, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 mt-16">
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        {/* Left: Hero / Story */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Welcome to <span className="text-indigo-600">Car Jet</span>
          </h2>

          <p className="text-gray-600 max-w-prose">
            We started this company with a simple goal: to make car rental easy,
            transparent, and affordable for everyone. We know that renting a car
            can sometimes be a hassle, so we set out to create a seamless
            experience from start to finish. From our user-friendly booking
            platform to our wide selection of vehicles, we've designed every
            step of the process with you in mind.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold">Our Mission</h3>
              <p className="text-sm mt-2 text-gray-600">
                Provide reliable and high-quality car rental services that
                empower you to travel freely and comfortably — at competitive
                prices and with excellent service.
              </p>
            </div>

            <div className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold">Our Fleet</h3>
              <p className="text-sm mt-2 text-gray-600">
                A diverse collection of well-maintained vehicles — from compact
                city cars to spacious SUVs for family adventures. All vehicles
                undergo regular safety checks and thorough cleaning.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              View Fleet
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Book Now
            </button>
          </div>
        </motion.div>

        {/* Right: Why Choose Us / Features */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>

            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-6 h-6 text-indigo-600 flex-none mt-1" />
                <div>
                  <p className="font-semibold">Easy Booking</p>
                  <p className="text-sm text-gray-600">
                    Our online platform makes it simple to find and book the
                    perfect car in just a few clicks.
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <Star className="w-6 h-6 text-indigo-600 flex-none mt-1" />
                <div>
                  <p className="font-semibold">Transparent Pricing</p>
                  <p className="text-sm text-gray-600">
                    What you see is what you get — no hidden fees or surprise
                    charges.
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <Clock className="w-6 h-6 text-indigo-600 flex-none mt-1" />
                <div>
                  <p className="font-semibold">Dedicated Support</p>
                  <p className="text-sm text-gray-600">
                    Our friendly customer service team is always ready to assist
                    you with questions or concerns.
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <Truck className="w-6 h-6 text-indigo-600 flex-none mt-1" />
                <div>
                  <p className="font-semibold">Well-Maintained Vehicles</p>
                  <p className="text-sm text-gray-600">
                    Regular safety checks and cleaning keep our fleet reliable
                    and safe for every journey.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <a href="/contact">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Contact Support
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Small CTA band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 bg-indigo-600 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>
          <h4 className="text-lg font-semibold">Ready to hit the road?</h4>
          <p className="text-sm opacity-90">
            Find the perfect car and book in minutes.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-200">
            Search Cars
          </button>
          <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-indigo-600">
            Learn More
          </button>
        </div>
      </motion.div>
    </section>
  );
}
