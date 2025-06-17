import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { RiAccountCircleFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import "./UserPage.css";
// import React from "react";
const UserPageNav = ({
  scrollToDashboard,
  scrollToTeams,
  scrollToSchedule,
  scrollToLeaderboard,
}) => {
  const { username } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (scrollFn) => {
    setMenuOpen(false);
    scrollFn();
  };

  return (
    <nav className="w-full bg-[#1e1e2f] text-white shadow-lg px-6 py-4 rounded-b-xl shadow-emerald-300/10 z-50">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="logo.png" alt="🏀SPORTRAC" className="h-10" />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center absolute md:static top-16 right-0 w-full md:w-auto bg-[#1e1e2f] 
          shadow-md md:shadow-none p-4 md:p-0 gap-4 md:gap-10 z-20 transition-all duration-300 ease-in-out`}
        >
          <button
            onClick={() => handleClick(scrollToDashboard)}
            className="relative font-semibold text-white hover:text-emerald-400 transition group md:hover:scale-110 cursor-pointer sm:hover:scale-102 hover:font-bold"
          >
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
          </button>

          <button
            onClick={() => handleClick(scrollToTeams)}
            className="relative font-semibold text-white hover:text-emerald-400 transition group md:hover:scale-110 cursor-pointer sm:hover:scale-102 hover:font-bold"
          >
            Teams & Players
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full cursor-pointer"></span>
          </button>

          <button
            onClick={() => handleClick(scrollToSchedule)}
            className="relative font-semibold text-white hover:text-emerald-400 transition group md:hover:scale-110 cursor-pointer sm:hover:scale-102 hover:font-bold"
          >
            Schedule
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full cursor-pointer"></span>
          </button>
          <button
            onClick={() => handleClick(scrollToLeaderboard)}
            className="relative font-semibold text-white hover:text-emerald-400 transition group md:hover:scale-110 cursor-pointer sm:hover:scale-102 hover:font-bold"
          >
            Leaderboard
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full cursor-pointer"></span>
          </button>

          {/* Login Button */}
          {/* <a
            href="/login"
            className="bg-emerald-500 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-emerald-600 transition duration-300 md:hover:scale-110 text-center sm:hover:scale-102"
          >
            Sign in
          </a> */}
          <RiAccountCircleFill className="text-4xl hover:text-emerald-400 hover:scale-110 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default UserPageNav;
