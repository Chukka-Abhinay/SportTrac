import { Link } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/message";
import { useGetAllMatchesQuery } from "../../redux/api/matchApiSlice";
import { useFetchSportsQuery } from "../../redux/api/sportApiSlice";
import { useGetTeamByIdQuery } from "../../redux/api/teamApiSlice";
// import AdminMenu from "./AdminMenu";

const MatchList = () => {
  const { data: matches, refetch, isLoading, error } = useGetAllMatchesQuery();

  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, [refetch]);
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="p-4 pl-[5%] pr-[5%] items-center">
      <div className="flex justify-between ">
        <h1 className="text-2xl font-semibold text-white mb-4 pl-3">Matches</h1>
        <div className="flex flex-wrap justify-between gap-2">
          <Link
            // to={`/admin/matches`}
            className="bg-emerald-500 font-semibold hover:bg-emerald-600 rounded-full   px-4 pt-1  cursor-pointer hover:scale-110 text-white "
          >
            Create Match
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
      <hr className="" />
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">
          {" "}
          {error?.data.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* <AdminMenu></AdminMenu> */}
          <table className="w-full  mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">MATCH</th>
                <th className="px-4 py-2 text-left">SCORE</th>
                <th className="px-4 py-2 text-left">SPORT</th>
                <th className="px-4 py-2 text-left">STATUS</th>
                <th className="px-4 py-2 text-left">LOCATION</th>
                <th className="px-4 py-2 text-left">TIME</th>
                <th className="px-4 py-2 text-left">EDIT</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr
                  key={match._id}
                  className=" hover:text-emerald-500 hover:scale-101"
                >
                  <td className="px-4 py-2">
                    <Link
                      //   to={`/admin/matches/${match._id}`}
                      className="cursor-pointer"
                    >
                      {match._id}
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      //   to={`/admin/teams/${match._id}`}
                      className="cursor-pointer"
                    >
                      {match.teamA.name} VS {match.teamB.name}
                    </Link>
                    {/* <p>{team.name}</p> */}
                  </td>
                  <td className="px-4 py-2">
                    {match.score.teamA} : {match.score.teamB}
                  </td>
                  <td className="px-4 py-2">{match.sport.name}</td>

                  {match.calculatedStatus === "upcoming" ? (
                    <td className="px-4  py-2 text-orange-400">
                      {match.calculatedStatus}
                    </td>
                  ) : match.calculatedStatus === "live" ? (
                    <td className="px-4  py-2 text-red-600">
                      {match.calculatedStatus}
                    </td>
                  ) : (
                    <td className="px-4  py-2 text-green-700">
                      {match.calculatedStatus}
                    </td>
                  )}
                  <td className="px-4 py-2">{match.location}</td>
                  <td className="px-4 py-2">
                    <td className="px-4 py-2">
                      {moment(match.scheduledTime).format("DD MMM YYYY, HH:mm")}
                    </td>
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      //   to={`/admin/teams/update/${team._id}`}
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
export default MatchList;
