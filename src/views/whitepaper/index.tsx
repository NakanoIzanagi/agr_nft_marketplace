// Next, React
import { FC, useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const WhitepaperView: FC = ({ }) => {

  return (
    <div className="flex flex-col items-center mt-10 px-6 py-12 pb-40 xl:w-[1000px]   bg-gradient-to-b from-transparent via-black/50 to-black/20">
      {/* Title Section */}
      <h1 className="mb-8 text-4xl font-bold animate__animated animate__fadeIn">White Paper</h1>

      {/* Preview Section */}
      <div className="relative w-full max-w-4xl mb-12 bg-[#434643] rounded-lg shadow-lg">
        <iframe
          src="/Foodsply_Whitepaper v1.0.pdf"
          title="White Paper Preview"
          className="w-full rounded-t-lg h-96"
          frameBorder="0"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-lg bg-gradient-to-t from-gray-800 to-transparent">
          <a
            href="/Foodsply_Whitepaper v1.0.pdf"
            download="whitepaper.pdf"
            className="inline-block px-6 py-3 text-white transition-colors duration-300 bg-[#092709] rounded-md shadow-md hover:bg-[#1a5a1d]"
          >
            Download White Paper
          </a>
        </div>
      </div>

      {/* Optional Description Section */}
      <p className="max-w-4xl text-lg text-center">
        Explore our comprehensive white paper to get detailed insights into our project and vision.
      </p>
    </div>
  );
};
