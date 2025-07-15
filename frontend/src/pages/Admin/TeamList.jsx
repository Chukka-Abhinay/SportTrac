import { Link } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import { useAllTeamsQuery } from "../../redux/api/teamApiSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/message";
import { useFetchSportsQuery } from "../../redux/api/sportApiSlice";
// import AdminMenu from "./AdminMenu";

const TeamList = () => {
  const { data: teams, refetch, isLoading, isError } = useAllTeamsQuery();

  const { data: sports } = useFetchSportsQuery();

  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, [refetch]);
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="p-4 pl-[10%] pr-[5%] items-center">
      <div className="flex justify-between pr-[20%]">
        <h1 className="text-2xl font-semibold text-white mb-4 pl-3">Teams</h1>
        <div className="flex flex-wrap justify-between gap-2">
          <Link
            to={`/admin/teams`}
            className="bg-emerald-500 font-semibold hover:bg-emerald-600 rounded-full   px-4 pt-1  cursor-pointer hover:scale-110 text-white "
          >
            Create Team
          </Link>
          <button
            onClick={handleClick}
            className="bg-emerald-400 font-semibold hover:bg-emerald-600 rounded-full  my-10 px-4 py-0 cursor-pointer hover:scale-110"
          >
            Home
          </button>
        </div>
      </div>
      <br />
      <hr className="w-[80%]" />
      {isLoading ? (
        <Loader></Loader>
      ) : isError ? (
        <Message variant="danger">
          {" "}
          {isError?.data.message || isError.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* <AdminMenu></AdminMenu> */}
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">TEAM NAME</th>
                <th className="px-4 py-2 text-left">SPORT</th>
                <th className="px-4 py-2 text-left">TOTAL PLAYERS</th>
                <th className="px-4 py-2 text-left">EDIT</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr
                  key={team._id}
                  className=" hover:text-emerald-500 hover:scale-101"
                >
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/teams/${team._id}`}
                      className="cursor-pointer"
                    >
                      {team._id}
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/teams/${team._id}`}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </Link>
                    {/* <p>{team.name}</p> */}
                  </td>
                  <td className="px-4 py-2">
                    {sports?.map((sport) => (
                      <div key={sport._id}>
                        {/* {team.sport._id}
                        {sport._id} */}
                        {sport._id === team.sport._id && sport.name}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 pl-9 py-2">{team.players.length}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/teams/update/${team._id}`}
                      className="bg-red-500 font-semibold hover:bg-red-600 rounded-full  my-10 px-4 py-0 cursor-pointer hover:scale-110 text-white"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default TeamList;
