import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
        const response = await fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            
          }),
        });
        
        const data = await response.json();
        console.log(data)

        data && navigate('/')
    }

  return (
    <div className="flex items-center justify-center  min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-violet-600 mb-6">Sign-Up</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handleInput}
            />
           
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handleInput}
            />
            
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handleInput}
            />
            
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-violet-600 text-white rounded-md hover:bg-cyan-400 f focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign up
          </button>

          <p className="text-center text-sm text-gray-600">
            You agree to our <span className="text-blue-500">terms and policies</span>
          </p>

          <div className="flex items-center justify-center">
            <Link
              to="/login"
              className="mt-3 block text-center text-sm bg-violet-600 text-slate-100 border border-gray-300 rounded-md py-3 w-full hover:bg-cyan-400 focus:ring-2 focus:ring-blue-500 no-underline"
            >
              Log in
            </Link>
          </div>

         
        </form>
      </div>
    </div>
  );
};




export default Signup;
