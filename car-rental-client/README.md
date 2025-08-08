# [car rental service]

---

## Project Overview

This project is a full-stack car rental application designed to streamline the process of Browse, renting, and managing car bookings. It provides an intuitive interface for users to find available cars, make bookings, and track their rentals, while also allowing car owners to list and manage their vehicles.

---

## Live URLs

* **Frontend (Firebase Hosting):** [Live Firebase Hosting URL Here, e.g., `https://car-rental-76f12.web.app/`]
* **Backend API (Vercel):** [Live Vercel Backend URL Here, e.g., `car-rental-server2-kzj6wokfi-rafiqs-projects-a2d63c2b.vercel.app`]

---

## Key Features

* **User Authentication:** Secure login and registration using email/password and social providers (e.g., Google, GitHub, etc., if implemented).
* **Car Browse:** View a list of available cars with details like model, price, and images.
* **Detailed Car View:** Access comprehensive information for each car, including specifications and availability status.
* **Booking Management:**
    * **Book Cars:** Users can easily book cars for specific date ranges.
    * **My Bookings:** Authenticated users can view all their past and active bookings.
    * **Modify Bookings:** Users can modify the start and end dates of existing bookings.
    * **Cancel Bookings:** Users can cancel their active bookings.
* **Car Owner Dashboard:**
    * **Add Cars:** Owners can list new cars for rent, providing all necessary details.
    * **My Cars:** Owners can view and manage their listed vehicles.
    * **Update Car Details:** Owners can update information for their listed cars.
    * **Delete Cars:** Owners can remove cars from their listings.
* **Responsive Design:** The application is designed to be fully responsive, providing a seamless experience across various devices (desktops, tablets, mobile phones).

---

## Technologies Used

This project utilizes a modern MERN (MongoDB, Express.js, React, Node.js) stack, along with several key libraries and tools:

### Frontend

* **React.js:** A JavaScript library for building user interfaces.
* **Vite:** A next-generation frontend tooling that provides an extremely fast development experience.
* **React Router DOM:** For declarative routing within the React application.
* **Axios:** A promise-based HTTP client for making API requests.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **DaisyUI:** A Tailwind CSS component library that provides pre-built, customizable UI components.
* **React Query (TanStack Query):** For efficient data fetching, caching, and state management.
* **React Datepicker:** A flexible date picker component.
* **Lucide React:** A beautiful and consistent icon library.
* **React Toastify:** For elegant toast notifications.

### Backend

* **Node.js:** A JavaScript runtime for building server-side applications.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB:** A NoSQL document database for data storage.
* **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js. (If you're using Mongoose, otherwise remove this and keep only `mongodb` driver).
* **`mongodb`:** The official MongoDB Node.js driver (if not using Mongoose).
* **CORS:** Node.js middleware for enabling Cross-Origin Resource Sharing.
* **Dotenv:** To load environment variables from a `.env` file.
* **Jsonwebtoken (jsonwebtoken):** For generating and verifying JWTs (if you have token-based authentication).
* **Cookie-parser:** Middleware for parsing cookies (if you handle cookies for authentication).

---

## Installation and Setup

To run this project locally, follow these steps:


