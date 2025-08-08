// import React, { use, useContext } from 'react';
// import { Link, NavLink } from 'react-router';
// import { AuthContext } from '../../context/AuthContext/AuthContext';
// import logo from '../../assets/logo.jpg'
// import car from '../../assets/car.webp'

// const Navbar = () => {

//     const { user, logOutUser } = useContext(AuthContext);
//     const handleLogOut = () => {
//         logOutUser()
//             .then(() => {
//                 console.log('logged out user')
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }

//     const links = <>
//         <li><NavLink to="/">Home</NavLink></li>
//         <li><NavLink to="/availableCars">Available Cars</NavLink></li>
//         {
//             user && <>
//                 <li><NavLink to='/addCar'>Add Car</NavLink></li>
//                 <li><NavLink to={`/myCars/${user?.email}`}>My Cars</NavLink></li>
//                 <li><NavLink to='/myBookings'>My Bookings</NavLink></li>
//                 {
//             user ? <button onClick={handleLogOut}>Log Out</button> : <>
//                 <li><NavLink to="/logIn" >Log In</NavLink></li>
//             </>
//         }
//                 <div className="navbar-end">
//                     <Link className="btn">Button</Link>
//                 </div>
//             </>
//         }
        

//     </>
//     return (
//         <div className="navbar bg-blue-400 shadow-sm">
//             <div className="navbar-start">
//                 <div className="dropdown">
//                     <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//                     </div>
//                     <ul
//                         tabIndex={0}
//                         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//                         {links}
//                     </ul>
//                 </div>

//                 <div className='flex justify-center items-center gap-2 '>
//                     <img src={car} alt="" className='w-5 h-5 md:w-10 md:h-10 rounded-md' />
//                     <p className="  text-xl">Car Jet</p>
//                 </div>
//             </div>
//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu menu-horizontal px-1">
//                     {links}
//                 </ul>
//             </div>

//         </div>
//     );
// };

// export default Navbar;

//   Removed 'use' as it's not standard for useContext
// import { Link, NavLink } from 'react-router'; // Changed 'react-router' to 'react-router-dom'
// import car from '../../assets/car.webp'; // Assuming logo is no longer needed if using user.photoURL
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext/AuthContext';

// const Navbar = () => {
//     const { user, logOutUser } = useContext(AuthContext); // Use useContext directly

//     const handleLogOut = () => {
//         logOutUser()
//             .then(() => {
//                 console.log('logged out user');
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     };

//     const navLinks = (
//         <>
//             <li><NavLink to="/">Home</NavLink></li>
//             <li><NavLink to="/availableCars">Available Cars</NavLink></li>
//             {user && ( // Only show these if user is authenticated
//                 <>
//                     <li><NavLink to='/addCar'>Add Car</NavLink></li>
//                     <li><NavLink to={`/myCars/${user?.email}`}>My Cars</NavLink></li>
//                     <li><NavLink to='/myBookings'>My Bookings</NavLink></li>
//                 </>
//             )}
//         </>
//     );

//     return (
//         <div className="navbar bg-blue-400 shadow-sm">
//             <div className="navbar-start">
//                 <div className="dropdown">
//                     <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                         </svg>
//                     </div>
//                     <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//                         {navLinks}
//                         {/* Mobile view login/logout/profile pic */}
//                         {user ? (
//                             <>
//                                 <li>
//                                     <button onClick={handleLogOut}>Log Out</button>
//                                 </li>
//                                 {user?.photoURL && (
//                                     <li>
//                                         <img src={user.photoURL} alt="User Profile" className="w-8 h-8 rounded-full" title={user?.displayName || user?.email} />
//                                     </li>
//                                 )}
//                                 {/* Consider adding user display name here for mobile if desired */}
//                             </>
//                         ) : (
//                             <li><NavLink to="/logIn">Log In</NavLink></li>
//                         )}
//                     </ul>
//                 </div>

//                 <div className='flex justify-center items-center gap-2'>
//                     <img src={car} alt="" className='w-5 h-5 md:w-10 md:h-10 rounded-md' />
//                     <p className="text-xl">Car Jet</p>
//                 </div>
//             </div>

//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu menu-horizontal px-1">
//                     {navLinks}
//                 </ul>
//             </div>

//             <div className="navbar-end"> {/* This is where the user info/login/logout will be */}
//                 {user ? (
//                     <div className="flex items-center gap-3">
//                         {user?.photoURL && (
//                             <div className="tooltip tooltip-bottom" data-tip={user?.displayName || user?.email}>
//                                 <img src={user.photoURL} alt="User Profile" className="w-10 h-10 rounded-full cursor-pointer" />
//                             </div>
//                         )}
//                         {/* Optional: display user name next to photo */}
//                         {user?.displayName && <span className="hidden md:inline text-white">{user.displayName}</span>}

//                         <button onClick={handleLogOut} className="btn btn-error text-white">Log Out</button>
//                     </div>
//                 ) : (
//                     <Link to="/logIn" className="btn btn-info text-white">Log In</Link>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Navbar;

import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';

import carLogo from '../../assets/car.webp';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                console.log('User logged out successfully.');
                // Optionally show a toast notification here: toast.success('Logged out successfully!');
            })
            .catch(error => {
                console.error('Logout error:', error);
                // Optionally show an error toast: toast.error('Failed to log out.');
            });
    };

    // Define main navigation links, now including the Log Out button if user is authenticated
    const mainNavLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/availableCars">Available Cars</NavLink></li>
            {user && ( // Render these links only if a user is logged in
                <>
                    <li><NavLink to='/addCar'>Add Car</NavLink></li>
                    <li><NavLink to={`/myCars/${user?.email}`}>My Cars</NavLink></li>
                    <li><NavLink to='/myBookings'>My Bookings</NavLink></li>
                    {/* Log Out button moved here, appears as a list item with other links */}
                    <li>
                        <button onClick={handleLogOut} className="">Log Out</button>
                    </li>
                </>
            )}
            {!user && ( // Only show Log In if user is NOT authenticated
                <li><NavLink to="/logIn">Log In</NavLink></li>
            )}
        </>
    );

    return (
        <div className="navbar bg-blue-400 text-white shadow-sm">
            {/* Navbar Start Section (Logo and Mobile Dropdown) */}
            <div className="navbar-start">
                {/* Mobile Dropdown Menu */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-gray-800">
                        {mainNavLinks}
                        {/* No additional auth/profile logic needed here for mobile, as log out is now in mainNavLinks */}
                    </ul>
                </div>

                {/* Brand Logo and Name */}
                <Link to="/" className='flex items-center gap-2 text-xl font-bold'>
                    <img src={carLogo} alt="Car Jet Logo" className='w-8 h-8 md:w-10 md:h-10 rounded-md object-cover' />
                    <span>Car Jet</span>
                </Link>
            </div>

            {/* Navbar Center Section (Desktop Navigation Links) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {mainNavLinks}
                </ul>
            </div>

            {/* Navbar End Section (User Profile Photo and Display Name) */}
            <div className="navbar-end">
                {user && ( // Only show user info if authenticated
                    <div className="flex items-center gap-3">
                        {/* User Profile Image with Tooltip */}
                        {user?.photoURL && (
                            <div className="tooltip tooltip-bottom" data-tip={user?.displayName || user?.email || "Logged In"}>
                                <img
                                    src={user.photoURL}
                                    alt={user?.displayName || "User Profile"}
                                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                                />
                            </div>
                        )}
                        {/* User Display Name (visible on medium/large screens) */}
                        {user?.displayName && <span className="hidden md:inline text-white font-medium">{user.displayName}</span>}

                        {/* No Log Out button here anymore, it's now in mainNavLinks */}
                    </div>
                )}
                {/* No Log In button here either, it's now in mainNavLinks */}
            </div>
        </div>
    );
};

export default Navbar;