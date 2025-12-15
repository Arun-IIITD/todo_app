import { Link, useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";
import React from 'react';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-400" />
          <span className=" text-2xl text-blue-400 tracking-wide">
            NoteKeeper
          </span>
        </Link>

        {/* Links */}
        <div className="space-x-6">
          <Link
            to="/"
            className={`hover:text-blue-400 transition ${
              location.pathname === "/" ? "text-blue-400 font-semibold" : "text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link
            to="/create-note"
            className={`hover:text-blue-400 transition ${
              location.pathname === "/create" ? "text-blue-400 font-semibold" : "text-gray-300"
            }`}
          >
            Create Note
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;