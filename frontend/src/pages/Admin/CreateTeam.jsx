import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateTeamMutation,
  useUploadTeamLogoMutation,
} from "../../redux/api/teamApiSlice";
import { useFetchSportsQuery } from "../../redux/api/sportApiSlice";
import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";

const CreateTeam = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [logo, setLogo] = useState("");
  const [logoUrl, setLogoUrl] = useState(null);

  const [createTeam] = useCreateTeamMutation();
  const [uploadTeamLogo] = useUploadTeamLogoMutation();
  const { data: sports = [] } = useFetchSportsQuery();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadTeamLogo(formData).unwrap();
      toast.success("Logo uploaded successfully", { autoClose: 2000 });
      setLogo(res.image);
      setLogoUrl(res.image);
    } catch (error) {
      toast.error("Logo upload failed", { autoClose: 2000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sport", sport);
      formData.append("logo", logo);

      const { data } = await createTeam(formData);

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Team created successfully");
        navigate("/admin/teamlist");
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
        {/* <AdminMenu /> */}
        <div className="md:w-3/4 p-3 flex flex-col ">
          <div className="flex  justify-between">
            <h2 className="text-2xl font-bold text-emerald-500 mb-6">
              Create Team
            </h2>
            <button
              onClick={handleClick}
              className="bg-emerald-400 font-semibold hover:bg-emerald-600 rounded-full  my-10 px-4 py-0 cursor-pointer hover:scale-110"
            >
              Home
            </button>
          </div>

          {logoUrl && (
            <div className="text-center mb-6 items-center pl-[40%] pt-10">
              <img
                src={logoUrl}
                alt="team logo"
                className="block mx-auto w-[200px] h-[200px] object-contain rounded"
              />
            </div>
          )}

          <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold">
            {logo ? `Uploaded Logo: ${logo.split("/").pop()}` : ""}
            <br />
            <div>
              <span className="border bg-gray-700 rounded px-2 mt-2 inline-block">
                Upload Logo
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={uploadFileHandler}
              className="hidden"
            />
          </label>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-4 pt-2"
          >
            <div>
              <label className="font-bold text-lg">Team Name:</label>
              <input
                type="text"
                className="p-4 mb-3 w-full border-0 shadow-sm shadow-emerald-300 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="font-bold text-lg">Sport:</label>
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
            </div>
            <span>
              <button
                type="submit"
                className="bg-emerald-500 font-bold hover:bg-emerald-600 rounded-full px-4 py-2 text-lg cursor-pointer hover:scale-101 text-white"
              >
                Create Team
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
