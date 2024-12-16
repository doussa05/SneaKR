import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-purple-200  text-fuchsia-950 py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  justify-center items-center">
          <div className="text-2xl font-bold ">
            &copy; {new Date().getFullYear()} Anisus-Online-Shop. All rights reserved.
          </div>
          <div className="flex justify-center space-x-4">
            
          </div>
        </div>
      </div>
    </footer>
  );
}
