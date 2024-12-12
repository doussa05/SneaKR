import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
          </div>
          <div className="flex justify-center space-x-4">
            
          </div>
        </div>
      </div>
    </footer>
  );
}
