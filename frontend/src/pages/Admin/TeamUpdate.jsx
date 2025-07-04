import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useUploadTeamLogoMutation,
} from "../../redux/api/teamApiSlice";
import { useFetchSportsQuery } from "../../redux/api/sportApiSlice";
import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";

const TeamUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: teamData } = useGetTeamByIdQuery(id);
  const { data: sports = [] } = useFetchSportsQuery();
  const [updateTeam] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();
  const [uploadTeamLogo] = useUploadTeamLogoMutation();

  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (teamData && teamData._id) {
      setName(teamData.name);
      setSport(teamData.sport);
      setLogo(teamData.logo || "");
    }
  }, [teamData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadTeamLogo(formData).unwrap();
      toast.success("Logo uploaded successfully", { autoClose: 2000 });
      console.log(res.logo);
      setLogo(res.image);
    } catch (err) {
      toast.error("Logo upload failed", { autoClose: 2000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("logo", logo);
      formData.append("name", name);
      formData.append("sport", sport);
      const data = await updateTeam({ teamId: id, formData }).unwrap();

      if (data?.error) {
        toast.error(data.error, { autoClose: 2000 });
      } else {
        toast.success("Team updated successfully", { autoClose: 2000 });
        navigate("/admin/teamlist");
      }
    } catch (err) {
      toast.error("Team update failed. Try again.", { autoClose: 2000 });
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this team?"
      );
      if (!confirmDelete) return;

      const { data } = await deleteTeam(id);
      toast.success(`"${data.name}" is deleted`, { autoClose: 2000 });
      navigate("/admin/teamlist");
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
        {/* <AdminMenu /> */}
        <div className="md:w-3/4 p-3 flex flex-col justify-around">
          <div className="flex">
            <h2 className="text-2xl font-bold text-emerald-500 mb-6">
              Update / Delete Team
            </h2>
            <button
              onClick={handleClick}
              className="bg-emerald-400 font-semibold hover:bg-emerald-600 rounded-full  my-10 px-4 py-0 cursor-pointer hover:scale-110"
            >
              Home
            </button>
          </div>

          {logo && (
            <div className="text-center mb-6 items-center pl-[40%] pt-10">
              <img
                src={logo}
                alt="team logo"
                className="block mx-auto w-[200px] h-[200px] object-contain rounded "
              />
            </div>
          )}

          <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold">
            {logo ? `Current Logo: ${logo.split("/").pop()}` : "Upload Logo"}
            <br />
            <div>
              <span className="border bg-gray-700 rounded px-2 mt-2 inline-block">
                Update Logo
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={uploadFileHandler}
              className="hidden"
            />
          </label>

          <div className="mt-6 flex flex-col justify-around gap-4">
            <label className="font-bold">Team Name:</label>
            <input
              type="text"
              className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg"
              //   "border-0 shadow-sm shadow-emerald-300 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="font-bold">Sport:</label>
            <select
              className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg bg-[#1e1e2f]"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            >
              <option value="">Select Sport</option>
              {sports?.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <div className="mt-6 flex gap-4 justify-between">
              <button
                onClick={handleSubmit}
                className="bg-emerald-500 font-bold hover:bg-emerald-600 rounded-full   px-4 text-lg cursor-pointer hover:scale-110 text-white "
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 font-semibold hover:bg-red-600 rounded-full  my-10 px-4 py-1 cursor-pointer hover:scale-110"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamUpdate;
