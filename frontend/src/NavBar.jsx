import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-bold">Anisus</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/home" className="hover:text-gray-400">Home</Link>
            <Link to="/" className="hover:text-gray-400">Login</Link>
            <Link to="/MyProfile" className="hover:text-gray-400">MyProfile</Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={!isOpen ? "inline-flex" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
                <path className={isOpen ? "inline-flex" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-400">Home</Link>
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-400">Login</Link>
          <Link to="/MyProfile" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-400">MyProfile</Link>
        </div>
      </div>
    </nav>
  );
}
