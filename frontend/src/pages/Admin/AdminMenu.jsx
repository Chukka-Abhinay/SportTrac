import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-27 right-2" : "top-27 right-7"
        }  p-2 fixed rounded-lg bg-emerald-400 text-white px-4 py-1.5  font-semibold hover:bg-emerald-500 transition duration-300 md:hover:scale-110 text-center sm:hover:scale-102 shadow-sm shadow-emerald-400 cursor-pointer`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" className="" />
        ) : (
          <>
            <h1>Admin Menu</h1>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[#151515] p-4 fixed right-2 top-34 rounded-2xl">
          <ul className="list-none mt-2">
            <li>
              {/* <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "emerald" : "white",
                })}
              >
                Admin Dashboard
              </NavLink> */}
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/sportlist"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
              >
                Create Sport
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/teams"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
              >
                Create Team
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/matches"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
              >
                Create Match
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/teamlist"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
              >
                All Teams
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/matchlist"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
              >
                All Matches
              </NavLink>
            </li>

            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
