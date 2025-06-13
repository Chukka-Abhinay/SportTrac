import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import "./NavBar.css";
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Teams & Players", href: "/teams" },
    { label: "Tournaments", href: "/tournaments" },
    { label: "Leaderboard", href: "/leaderboard" },
  ];

  return (
    <nav className="w-full bg-[#1e1e2f] text-white shadow-lg px-6 py-4 rounded-b-xl  shadow-emerald-300/10">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="logo.png" alt="🏀SPORTRAC" className="h-10" />
        </div>

        {/* Toggle Button - Mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center absolute md:static top-16 right-0 w-full  md:w-auto bg-[#1e1e2f] 
           shadow-md md:shadow-none p-4 md:p-0 gap-4 md:gap-10 z-20 transition-all duration-300 ease-in-out`}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative font-semibold text-white hover:text-emerald-400 transition group hover:scale-110"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
            </a>
          ))}
          <a
            href="/login"
            className="bg-emerald-500 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-emerald-600 transition duration-300 hover:scale-110"
          >
            Sign in
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
