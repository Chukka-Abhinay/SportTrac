import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleCross = () => {
    navigate("/");
  };

  return (
    <div className="">
      <div className="">
        <div className="form-container  flex items-center h-screen w-full justify-center text-white">
          <form
            onSubmit={submitHandler}
            className="shadow-lg shadow-emerald-300 w-5/6 md:w-1/3  flex flex-col p-10 justify-between sm:w-5/6 gap-5"
          >
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            <div className="flex justify-between">
              <img src="logo.png" alt="" className="w-[100px] top-0 left-0 " />
              <RxCross2
                className="bg-[#1e1e2f] rounded-full p-0.5 scale-115"
                onClick={handleCross}
              />
            </div>

            <label className="text-white font-semibold font-sans">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="border-0 shadow-sm shadow-emerald-300 rounded-lg text-md pl-2 "
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label className="text-white font-semibold font-sans">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="border-0 shadow-sm shadow-emerald-300 rounded-lg text-md pl-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-white font-semibold font-sans">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="border-0 shadow-sm shadow-emerald-300 rounded-lg text-md pl-2 "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="text-white font-semibold font-sans">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="border-0 shadow-sm shadow-emerald-300 rounded-lg text-md pl-2 "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="border border-emerald-300 rounded-full gap-t-5 hover:bg-emerald-400 font-semibold hover:scale-105"
            >
              Update
            </button>

            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
