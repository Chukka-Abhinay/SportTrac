import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateSportMutation,
  useUpdateSportMutation,
  useDeleteSportMutation,
  useFetchSportsQuery,
  useUploadVideoMutation,
} from "../../redux/api/sportApiSlice";

import { toast } from "react-toastify";
import SportForm from "../../components/SportForm";
import Modal from "../../components/Modal";
// import AdminMenu from "./AdminMenu";
const SportList = () => {
  const { data: sports, refetch } = useFetchSportsQuery();
  const [name, setName] = useState("");
  const [video, setVideo] = useState("");
  const [selectedSport, setSelectedSport] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [updatingVideo, setUpdatingVideo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createSport] = useCreateSportMutation();
  const [updateSport] = useUpdateSportMutation();
  const [deleteSport] = useDeleteSportMutation();
  const [uploadVideo] = useUploadVideoMutation();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [refetch]);
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("video", e.target.files[0]);

    try {
      const res = await uploadVideo(formData).unwrap();
      toast.success("Video uploaded successfully", { autoClose: 2000 });
      setVideo(res.video);
      setUpdatingVideo(res.video);
    } catch (error) {
      toast.error("Video upload failed", { autoClose: 2000 });
    }
  };

  const handleCreateSport = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Sport name is required");
      return;
    }

    try {
      const result = await createSport({ name, video }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        setVideo("");
        toast.success(`${result.name} is created.`);

        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating sport failed, try again.");
    }
  };

  const handleUpdateSport = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Sport name is required");
      return;
    }

    try {
      const result = await updateSport({
        sportId: selectedSport._id,
        updatedSport: {
          name: updatingName,
          video: updatingVideo,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedSport(null);
        setVideo("");
        setUpdatingName("");
        setUpdatingVideo("");
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSport = async () => {
    try {
      const result = await deleteSport(selectedSport._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedSport(null);
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Sport deletion failed. Try again.");
    }
  };
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="pl-[10%] flex flex-col md:flex-row pt-[1%]">
      {/* <AdminMenu /> */}
      <div className="md:w-3/4 p-3">
        <div className="flex justify-between flex-wrap">
          <h1 className="h-12 font-bold text-2xl">Manage Sports</h1>
          <button
            onClick={handleClick}
            className="bg-emerald-400 font-semibold hover:bg-emerald-600 rounded-[20px]  h-8 px-4 py-0 cursor-pointer hover:scale-110"
          >
            Home
          </button>
        </div>
        <SportForm
          value={name}
          setValue={setName}
          video={video}
          setVideo={setVideo}
          handleSubmit={handleCreateSport}
          uploadFileHandler={uploadFileHandler}
        />
        <br />
        <hr />
        <br />
        <div className="flex flex-wrap gap-2 mx-2">
          {sports?.map((sport) => (
            <div key={sport._id}>
              <button
                className="bg-white border border-emerald-500 text-black py-2 px-4 rounded-lg m-3 hover:bg-emerald-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 cursor-pointer"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedSport(sport);
                    setUpdatingName(sport.name);
                    setUpdatingVideo(sport.video);
                  }
                }}
              >
                {sport.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <SportForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            video={updatingVideo}
            setVideo={(video) => setUpdatingVideo(video)}
            handleSubmit={handleUpdateSport}
            uploadFileHandler={uploadFileHandler}
            buttonText="Update"
            handleDelete={handleDeleteSport}
          />
        </Modal>
      </div>
    </div>
  );
};

export default SportList;
