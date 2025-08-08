import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SocialLogIn from '../shared/SocialLogIn';

const LogIn = () => {
    const { logInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        logInUser(email, password)
            .then(result => {
                console.log('Email/Password Login successful:', result.user);
                toast.success('Logged in successfully!');
                navigate('/');
            })
            .catch(error => {
                console.error('Email/Password Login error:', error);
                let errorMessage = 'Failed to log in. Please check your credentials.';
                if (error.code === 'auth/user-not-found') {
                    errorMessage = 'No user found with this email.';
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = 'Incorrect password.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Invalid email address.';
                }
                toast.error(errorMessage);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome Back!</h1>
                    <p className="py-6 text-gray-600">
                        Log in to manage your car rentals, view your bookings, and list your own cars.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">Login now!</h1>
                        <form onSubmit={handleLogIn}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' className="input input-bordered w-full" placeholder="Email" required />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' className="input input-bordered w-full" placeholder="Password" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-neutral w-full">Login</button>
                            </div>
                        </form>
                        <div className="flex items-center pt-4 space-x-1">
                            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                            <p className="px-3 text-center text-sm text-gray-600">Login with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                        </div>

                        <SocialLogIn navigate={navigate}></SocialLogIn>
                        <p className="text-sm text-center sm:px-6 text-gray-600 mt-4">
                            Don't have an account?{' '}
                            <NavLink to="/register" className="link link-hover text-blue-600 font-semibold">Register</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;