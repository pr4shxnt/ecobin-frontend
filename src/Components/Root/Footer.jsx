import React from "react";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-4 text-center w-full">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <div className="mb-2 md:mb-0">
        &copy; {new Date().getFullYear()} Ecobin. All rights reserved.
      </div>
      <div>
        Powered by{" "}
        <span className="font-semibold text-green-400">GIT Force</span>
      </div>
    </div>
  </footer>
);

export default Footer;
