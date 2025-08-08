import React, { use } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SocialLogIn from '../shared/SocialLogIn';

const Register = () => {
    const { createUser } = use(AuthContext)
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.fullname.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl = form.photoUrl.value;
        console.log(fullName, email, password, photoUrl)

        // create user
        createUser(email,password).then(result =>{
            console.log(result.user)
        }).catch(error=>{
            console.log(error)
        })

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">


                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold text-center mb-2">Register now!</h1>
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <div>
                                    <label className="block mb-2 text-sm">Full Name</label>
                                    <input type="text" name="fullname" id="fullname" placeholder="John Doe" required className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />

                                </div>

                                <div>
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className="input" placeholder="Email" />
                                </div>

                                <div>
                                    <label className="label">Password</label>
                                    <input type="password" name='password' required className="input" placeholder="Password" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm">Photo URL:</label>
                                    <input type="text" name="photoUrl" id="photoUrl" placeholder="Photo Url" required className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />

                                </div>

                                <button type='submit' className="btn btn-neutral mt-4">Register</button>
                            </fieldset>

                        </form>

<SocialLogIn></SocialLogIn>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;

