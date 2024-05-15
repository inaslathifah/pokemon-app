import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-pink-300 text-slate-900">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
            <ul className="flex gap-4">
              <li><a className="hover:text-white hover:font-semibold text-slate-900" href="/"> Pokemon </a></li>
              </ul>  
        </div>
        <ul className="flex space-x-4">
          <li>
            <a
              className="hover:text-white hover:font-semibold text-slate-900"
              href="/"
            >
              Pokemon List
            </a>
          </li>
          <li>
            <a
              className="hover:text-white hover:font-semibold text-slate-900"
              href="/my-pokemon"
            >
              My Pokemon
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
