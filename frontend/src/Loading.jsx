
import React from 'react'
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-800"></div>
      <p className="mt-4 text-lg font-semibold">Chargement...</p>
    </div>
  );
};

export default Loading;
