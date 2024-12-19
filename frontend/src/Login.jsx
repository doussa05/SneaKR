import React, { useState, useEffect } from 'react';
import validation from './LoginValidation';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setErrors(validation(values));
  }, [values]);

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!errors.email && !errors.password) {
      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setBackendError(data.error);
        } else if (data.token) {
          setBackendError(null);
          localStorage.setItem("token", data.token);
          navigate('/home');
        } else {
          setBackendError('Une erreur est survenue. Veuillez réessayer.');
        }
      })
      .catch(err => {
        console.log(err);
        setBackendError('Une erreur est survenue. Veuillez réessayer.');
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="relative bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              onChange={handleInput}
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              onChange={handleInput}
            />
            {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
          </div>
          <button type="submit" className="w-full py-3 bg-orange-600 text-white rounded-md hover:bg-orange-400 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105">Log in</button>
          <p className="text-center text-sm text-gray-600">You agree to our <span className="text-orange-500">terms and policies</span></p>
          <div className="flex items-center justify-center">
            <Link to="/signup" className="mt-3 block text-center text-sm text-gray-600 border border-gray-300 rounded-md py-3 w-full hover:bg-gray-100 focus:ring-2 focus:ring-orange-500 transition duration-300 transform hover:scale-105">
              Create an Account
            </Link>
          </div>
          {backendError && <span className="text-sm text-red-500 block text-center">{backendError}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
