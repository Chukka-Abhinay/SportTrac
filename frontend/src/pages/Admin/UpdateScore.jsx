import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useGetMatchByIdQuery,
  useUpdateMatchByIdMutation,
} from "../../redux/api/matchApiSlice";
import { useFetchSportsQuery } from "../../redux/api/sportApiSlice";
import { useAllTeamsQuery } from "../../redux/api/teamApiSlice";
import { toast } from "react-toastify";
import moment from "moment";
const UpdateScore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: matchData, refetch } = useGetMatchByIdQuery(id);
  const { data: teams } = useAllTeamsQuery();
  const { data: sports } = useFetchSportsQuery();
  const [updateMatch] = useUpdateMatchByIdMutation();

  //   console.log(teamAInfo);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [scoreteamA, setScoreTeamA] = useState(0);
  const [scoreteamB, setScoreTeamB] = useState(0);
  const [scheduledTime, setScheduledTime] = useState("");
  const [duration, setDuration] = useState(120);
  const teamAInfo = teams?.find((t) => t._id === teamA);
  const teamBInfo = teams?.find((t) => t._id === teamB);
  const sportInfo = sports?.find((s) => s._id === sport);

  console.log(teamAInfo);
  console.log(teamBInfo);
  console.log(sportInfo);

  // useEffect(() => {
  //   teamAInfo = teams?.find((t) => t._id === teamA);
  //   teamBInfo = teams?.find((t) => t._id === teamB);
  //   sportInfo = sports?.find((s) => s._id === sport);
  // }, [teams, teamA]);

  useEffect(() => {
    if (matchData && matchData._id) {
      setTeamA(matchData.teamA);
      setTeamB(matchData.teamB);
      setSport(matchData.sport);
      setLocation(matchData.location);
      setScoreTeamA(matchData?.score.teamA);
      setScoreTeamB(matchData?.score.teamB);
      setScheduledTime(matchData.scheduledTime);
      setDuration(matchData.duration);
      refetch();
    }
    // console.log(matchData);
  }, [matchData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("teamA", teamA);
      formData.append("teamB", teamB);
      formData.append("sport", sport);
      formData.append("location", location);

      formData.append("score[teamA]", scoreteamA);
      formData.append("score[teamB]", scoreteamB);

      formData.append("scheduledTime", scheduledTime);
      formData.append("duration", duration);
      const { data } = await updateMatch({
        matchId: id,
        data: formData,
      }).unwrap();

      if (data?.error) {
        toast.error(data.error, { autoClose: 2000 });
      } else {
        toast.success("Score updated successfully", { autoClose: 2000 });
        // navigate("/admin/matchlist");
      }
    } catch (err) {
      toast.error("Score  update failed. Try again.", { autoClose: 2000 });
    }
  };
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] pl-[10%]">
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="md:w-3/4 p-3 flex flex-col">
          <div className="flex  justify-between">
            <h2 className="text-2xl font-bold text-emerald-500 mb-6">
              Update Score
            </h2>
            <button
              onClick={handleClick}
              className="bg-emerald-400 font-semibold hover:bg-emerald-600 rounded-full  my-10 px-4 py-0 cursor-pointer hover:scale-110"
            >
              Home
            </button>
          </div>

          <div className="pt-[10%]">
            <form
              onSubmit={handleSubmit}
              className="mt-[10%]  flex p-[5%] flex-col gap-4  shadow-md shadow-emerald-300 center"
            >
              <div className="pb-[3%] pt-2">
                <div className="flex justify-between">
                  <img
                    src="/logo.png"
                    alt=""
                    className="w-[120px] top-0 left-0 "
                  />
                  <h1 className="font-xl font-bold text-emerald-500 underline underline-offset-4">
                    {sportInfo?.name.toUpperCase()}
                  </h1>
                  <p className="font-lg font-bold">{location.toUpperCase()} </p>
                </div>
                <div className="flex justify-between pt-4">
                  <div className="flex justify-between w-1/3 items-center">
                    <img
                      src={teamAInfo?.logo}
                      alt={teamAInfo?.name.toUpperCase()}
                      className="w-[100px] h-[100px]"
                    />
                    <p className="text-3xl ">:</p>
                    <input
                      type="text"
                      className="py-4 mb-3  border-0 shadow-sm shadow-emerald-300 rounded-lg w-[100px] h-[100px] text-6xl "
                      value={scoreteamA}
                      onChange={(e) => setScoreTeamA(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between w-1/3 items-center">
                    <input
                      type="text"
                      className="py-4 mb-3  border-0 shadow-sm shadow-emerald-300 rounded-lg w-[100px] h-[100px] text-6xl "
                      value={scoreteamB}
                      onChange={(e) => setScoreTeamB(e.target.value)}
                    />
                    <p className="text-3xl ">:</p>
                    <img
                      src={teamBInfo?.logo}
                      alt={teamBInfo?.name.toUpperCase()}
                      className="w-[100px] h-[100px]"
                    />
                  </div>
                </div>
                <br />
              </div>
              <div className="flex  pt-1 items-center justify-center">
                <span>
                  <button
                    type="submit"
                    className="bg-emerald-500 font-bold hover:bg-emerald-600 rounded-full px-4 py-2 text-lg cursor-pointer hover:scale-101 text-white"
                    onClick={handleSubmit}
                  >
                    Update Score
                  </button>
                </span>
              </div>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateScore;
