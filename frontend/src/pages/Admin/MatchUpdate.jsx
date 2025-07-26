import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useGetMatchByIdQuery,
  useUpdateMatchByIdMutation,
  useDeleteMatchByIdMutation,
} from "../../redux/api/matchApiSlice";
import { useFetchSportsQuery } from "../../redux/api/sportApiSlice";
import { useAllTeamsQuery } from "../../redux/api/teamApiSlice";
import { toast } from "react-toastify";
import moment from "moment";
const MatchUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: matchData } = useGetMatchByIdQuery(id);
  const { data: teams } = useAllTeamsQuery();
  const { data: sports } = useFetchSportsQuery();
  const [updateMatch] = useUpdateMatchByIdMutation();
  const [deleteMatch] = useDeleteMatchByIdMutation();

  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [scoreteamA, setScoreTeamA] = useState(0);
  const [scoreteamB, setScoreTeamB] = useState(0);
  const [scheduledTime, setScheduledTime] = useState("");
  const [duration, setDuration] = useState(120);

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
    }
  }, [matchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("teamA", teamA);
      formData.append("teamB", teamB);
      formData.append("sport", sport);
      formData.append("location", location);
      // formData.append("score", score);
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
        toast.success("Match updated successfully", { autoClose: 2000 });
        navigate("/admin/matchlist");
      }
    } catch (err) {
      toast.error("Match update failed. Try again.", { autoClose: 2000 });
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this match?"
      );
      if (!confirmDelete) return;

      const { data } = await deleteMatch(id).unwrap();
      toast.success(`Match is deleted`, { autoClose: 2000 });
      navigate("/admin/matchlist");
    } catch (err) {
      toast.error("Delete failed. Try again.", { autoClose: 2000 });
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
              Update Match
            </h2>
            <button
              onClick={handleClick}
              className="bg-emerald-400 font-semibold hover:bg-emerald-600 rounded-full  my-10 px-4 py-0 cursor-pointer hover:scale-110"
            >
              Home
            </button>
          </div>

          <div>
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-4 pt-2"
            >
              <div className="">
                <div>
                  <label className="font-bold text-lg">Sport:</label>
                  <select
                    className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg bg-[#1e1e2f]"
                    value={sport}
                    onChange={(e) => {
                      setSport(e.target.value);
                      setTeamA("");
                      setTeamB("");
                    }}
                  >
                    <option value="">Select Sport</option>
                    {sports?.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* {console.log({ sport })} */}
                <br />
                <div className="flex justify-between">
                  <div>
                    <label className="font-bold text-lg"> Team A:</label>
                    <select
                      className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg bg-[#1e1e2f]"
                      value={teamA}
                      onChange={(e) => setTeamA(e.target.value)}
                    >
                      <option value="">Select team</option>
                      {teams
                        ?.filter(
                          (t) => t._id !== teamB && t.sport._id === sport
                        )
                        .map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="">
                    <label className="font-bold text-lg"> Team B:</label>
                    <select
                      className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg bg-[#1e1e2f]"
                      value={teamB}
                      onChange={(e) => setTeamB(e.target.value)}
                    >
                      <option value="">Select team</option>
                      {teams
                        ?.filter(
                          (t) => t._id !== teamA && t.sport._id === sport
                        )
                        .map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="font-bold text-lg">Score Team A:</label>
                    <input
                      type="text"
                      className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg"
                      value={scoreteamA}
                      onChange={(e) => setScoreTeamA(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-bold text-lg">Score Team B:</label>
                    <input
                      type="text"
                      className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg"
                      value={scoreteamB}
                      onChange={(e) => setScoreTeamB(e.target.value)}
                    />
                  </div>
                </div>
                <br />
                <div>
                  <label className="font-bold text-lg">Location:</label>
                  <input
                    type="text"
                    className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-lg">Duration of Match:</label>
                <input
                  type="text"
                  className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div>
                <label className="font-bold text-lg">Scheduled Time:</label>
                <input
                  type="datetime-local"
                  className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg"
                  value={
                    scheduledTime
                      ? moment(scheduledTime).format("YYYY-MM-DDTHH:mm")
                      : ""
                  }
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
            </form>
            <br />
            <div className="flex justify-between pt-1">
              <span>
                <button
                  type="submit"
                  className="bg-emerald-500 font-bold hover:bg-emerald-600 rounded-full px-4 py-2 text-lg cursor-pointer hover:scale-101 text-white"
                  onClick={handleSubmit}
                >
                  Update Match
                </button>
              </span>
              <span>
                <button
                  type="submit"
                  className="bg-red-500 font-bold hover:bg-red-600 rounded-full px-4 py-2 text-lg cursor-pointer hover:scale-101 text-white"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MatchUpdate;
