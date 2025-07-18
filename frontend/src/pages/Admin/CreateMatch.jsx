import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCreateMatchMutation } from "../../redux/api/matchApiSlice";
import { useAllTeamsQuery } from "../../redux/api/teamApiSlice";
import { useFetchSportsQuery } from "../../redux/api/sportApiSlice";
import { toast } from "react-toastify";
const CreateMatch = () => {
  const navigate = useNavigate();

  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [score, setScore] = useState([]);
  const [scheduledTime, setScheduledTime] = useState("");
  const [duration, setDuration] = useState(120);

  const [createMatch] = useCreateMatchMutation();
  const { data: teams } = useAllTeamsQuery();
  const { data: sports } = useFetchSportsQuery();

  // useEffect(() => {
  //   console.log("Updated sport:", sport);
  // }, [sport]);

  // useEffect(() => {
  //   if (teams) {
  //     console.log("Teams:", teams);
  //   }
  // }, [teams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("teamA", teamA);
      formData.append("teamB", teamB);
      formData.append("sport", sport);
      formData.append("location", location);
      formData.append("score", score);
      formData.append("scheduledTime", scheduledTime);
      formData.append("duration", duration);
      const { data } = await createMatch(formData);

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Match created successfully");
        navigate("/admin/matchlist");
      }
    } catch (error) {
      toast.error("Team creation failed. Try again.");
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
              Create Match
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
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
              <span>
                <button
                  type="submit"
                  className="bg-emerald-500 font-bold hover:bg-emerald-600 rounded-full px-4 py-2 text-lg cursor-pointer hover:scale-101 text-white"
                >
                  Create Match
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateMatch;
