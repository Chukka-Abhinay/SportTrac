import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { RiAccountCircleFill } from "react-icons/ri";
import { logout } from "../../redux/features/auth/authSlice";
const NavBar = ({
  scrollToDashboard,
  scrollToTeams,
  scrollToSchedule,
  scrollToLeaderboard,
}) => {
  const { username } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
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
          {!userInfo && (
            <a
              href="/login"
              className="bg-emerald-500 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-emerald-600 transition duration-300 md:hover:scale-110 text-center sm:hover:scale-102"
            >
              Sign in
            </a>
          )}
          <div className="relative  flex">
            {userInfo && (
              <RiAccountCircleFill
                className="text-4xl hover:text-emerald-400 hover:scale-110 cursor-pointer"
                onClick={() => console.log(username)}
              />
            )}
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-800 focus:outline-none pl-0.5"
            >
              {userInfo ? (
                <span className="text-white px-1">{userInfo.username}</span>
              ) : (
                <></>
              )}
              {userInfo && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              )}
            </button>
            {dropdownOpen && userInfo && (
              <ul
                className={`absolute right-0 mt-2 mr-14 space-y-2 bg-gray-300 rounded text-gray-600 ${
                  !userInfo.isAdmin ? "top-10" : "top-8"
                }`}
              >
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/teamlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Teams
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/sportlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Sports
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Users
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
