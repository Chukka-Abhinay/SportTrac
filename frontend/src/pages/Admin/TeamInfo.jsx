import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import {
  useGetTeamByIdQuery,
  useAddPlayerMutation,
  useDeletePlayerMutation,
  useUpdatePlayerMutation,
  useDeleteTeamMutation,
} from "../../redux/api/teamApiSlice";
import { useUploadTeamLogoMutation } from "../../redux/api/teamApiSlice";
import { useFetchSportsQuery } from "../../redux/api/sportApiSlice";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import PlayerForm from "../../components/PlayerForm";
const TeamInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: team, refetch, isLoading, Error } = useGetTeamByIdQuery(id);
  const { data: sports } = useFetchSportsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [player, setPlayer] = useState({
    name: "",
    position: "",
    number: "",
    age: "",
    nationality: "",
    avatar: "",
  });
  const [deleteTeam] = useDeleteTeamMutation();
  const [addPlayer] = useAddPlayerMutation();
  const [updatePlayer] = useUpdatePlayerMutation();
  const [deletePlayer] = useDeletePlayerMutation();
  const [uploadPlayerAvatar] = useUploadTeamLogoMutation();
  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      await addPlayer({
        teamId: id,
        playerData: { ...player, avatar },
      }).unwrap();

      toast.success("Player added");
      setPlayer({
        name: "",
        position: "",
        number: "",
        age: "",
        nationality: "",
        avatar: "",
      });
      handleCloseAddModal();
      refetch();
    } catch (error) {
      toast.error("Add failed");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadPlayerAvatar(formData).unwrap();
      toast.success("Player avatar uploaded successfully", { autoClose: 2000 });
      setAvatar(res.image);
    } catch (error) {
      toast.error("Avatar upload failed", { autoClose: 2000 });
    }
  };
  const handleUpdatePlayer = async (e) => {
    e.preventDefault();
    try {
      await updatePlayer({
        teamId: id,
        playerId: selectedPlayer._id,
        playerData: { ...player, avatar },
      }).unwrap();
      toast.success("Player updated");

      handleCloseEditModal();
      refetch();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDeletePlayer = async () => {
    try {
      await deletePlayer({ teamId: id, playerId: selectedPlayer._id }).unwrap();
      toast.success("Player deleted");

      handleCloseEditModal();
      refetch();
    } catch (error) {
      toast.error("Delete failed");
    }
  };
  const handleCloseAddModal = () => {
    setModalVisible(false);
    setPlayer({
      name: "",
      position: "",
      number: "",
      age: "",
      nationality: "",
      avatar: "",
    });
  };

  const handleCloseEditModal = () => {
    console.log("edit close is called");
    setEditModalVisible(false);
    setPlayer({
      name: "",
      position: "",
      number: "",
      age: "",
      nationality: "",
      avatar: "",
    });
    setSelectedPlayer(null);
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
  if (isLoading) {
    return <Loader />;
  }
  if (Error) {
    return <div>Error Loading Team</div>;
  }
  return (
    <div className="pl-[10%] pt-[5%]">
      <div className="flex flex-wrap pl-[5%] gap-20">
        <div className="w-[200px] h-[250px] ">
          <img src={team.logo} alt={team.name} className="rounded  " />
        </div>
        <div className="flex flex-col pt-10 gap-6 font-bold ">
          <h1 className="text-4xl font-bold underline-offset-4 underline text-emerald-500">
            {team.name}
          </h1>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 text-white text-xl gap-y-3">
            <span>ID</span>
            <span>
              :{"  "} {team._id}
            </span>
            <span>Sport</span>
            <span>
              :{"  "}
              {sports?.find((sport) => sport._id === team.sport)?.name || "N/A"}
            </span>

            <span>Total Players</span>
            <span>
              :{"  "}
              {team.numPlayers}
            </span>
          </div>
        </div>
        <div className="flex flex-col pt-10 pl-10 justify-around">
          <Link
            to={`/`}
            className="bg-emerald-500 font-semibold hover:bg-emerald-600 rounded-full   px-4 text-center py-1 cursor-pointer hover:scale-110 text-white "
          >
            Home
          </Link>
          <Link
            to={`/admin/teams/update/${team._id}`}
            className="bg-emerald-500 font-semibold hover:bg-emerald-600 rounded-full   px-4 pt-1 py-1 cursor-pointer hover:scale-110 text-white "
          >
            Update Team
          </Link>
          <button
            onClick={() => setModalVisible(true)}
            className="bg-emerald-500 font-semibold hover:bg-emerald-600 rounded-full   px-4 pt-1 py-1 cursor-pointer hover:scale-110 text-white"
          >
            Add Player
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-400 font-semibold hover:bg-red-600 rounded-full  my-10 px-4 py-1 cursor-pointer hover:scale-110"
          >
            Delete Team
          </button>
        </div>
      </div>
      <br />
      <hr className="w-[95%]" />
      <br />
      <div className="px-[5%] pr-[15%]">
        <h2 className="text-2xl text-emerald-400 font-semibold mb-4">
          Players
        </h2>

        {team.players?.length === 0 ? (
          <p className="text-white">No players in this team.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full border text-white border-emerald-400 rounded-2xl">
              <thead>
                <tr className="bg-emerald-600 text-white">
                  <th className="px-4 py-2 border border-emerald-500">#</th>
                  <th className="px-4 py-2 border border-emerald-500">Name</th>
                  <th className="px-4 py-2 border border-emerald-500">
                    Position
                  </th>
                  <th className="px-4 py-2 border border-emerald-500">
                    Number
                  </th>
                  <th className="px-4 py-2 border border-emerald-500">Age</th>
                  <th className="px-4 py-2 border border-emerald-500">
                    Nationality
                  </th>
                  <th className="px-4 py-2 border border-emerald-500">Edit</th>
                </tr>
              </thead>
              <tbody>
                {team.players.map((player, index) => (
                  <tr key={player._id} className="text-center">
                    <td className="px-4 py-2 border border-emerald-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-emerald-500">
                      {player.name}
                    </td>
                    <td className="px-4 py-2 border border-emerald-500">
                      {player.position}
                    </td>
                    <td className="px-4 py-2 border border-emerald-500">
                      {player.number}
                    </td>
                    <td className="px-4 py-2 border border-emerald-500">
                      {player.age || "N/A"}
                    </td>
                    <td className="px-4 py-2 border border-emerald-500">
                      {player.nationality || "N/A"}
                    </td>
                    {/* <td className="px-4 py-2 border border-emerald-500">
                      {player.avatar ? (
                        <img
                          src={`http://localhost:5000/${player.avatar}`}
                          alt={player.name}
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td> */}
                    <td className="px-4 py-2 border border-emerald-500">
                      <button
                        onClick={() => {
                          setSelectedPlayer(player);
                          setPlayer(player);
                          setEditModalVisible(true);
                        }}
                        className="bg-emerald-500 font-semibold hover:bg-emerald-600 rounded-full   px-4 pt-1 py-1 cursor-pointer hover:scale-110 text-white"
                      >
                        UPDATE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal isOpen={modalVisible} onClose={handleCloseAddModal}>
        <PlayerForm
          player={player}
          setPlayer={setPlayer}
          avatar={avatar}
          setAvatar={setAvatar}
          handleSubmit={handleAddPlayer}
          uploadFileHandler={uploadFileHandler}
        />
      </Modal>

      <Modal isOpen={editModalVisible} onClose={handleCloseEditModal}>
        <PlayerForm
          player={player}
          setPlayer={setPlayer}
          avatar={avatar}
          setAvatar={setAvatar}
          handleSubmit={handleUpdatePlayer}
          buttonText="Update"
          handleDelete={handleDeletePlayer}
          uploadFileHandler={uploadFileHandler}
        />
      </Modal>
    </div>
  );
};
export default TeamInfo;
