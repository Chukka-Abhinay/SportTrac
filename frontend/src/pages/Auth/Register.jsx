import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { RxCross2 } from "react-icons/rx";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  const handleCross = () => {
    navigate("/");
  };

  return (
    <section className="">
      <div className="form-container  flex items-center h-screen w-full justify-center text-white">
        <form
          onSubmit={submitHandler}
          className="shadow-lg shadow-emerald-300 w-5/6 md:w-1/3  flex flex-col p-10 justify-between sm:w-5/6 gap-5"
        >
          <div className="flex justify-between">
            <img src="logo.png" alt="" className="w-[100px] top-0 left-0 " />
            <RxCross2
              className="bg-[#1e1e2f] rounded-full p-0.5 scale-115"
              onClick={handleCross}
            />
          </div>

          <label htmlFor="name" className="text-white font-semibold font-sans">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="border-0 shadow-sm shadow-emerald-300 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email" className="text-white font-semibold font-sans">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border-0 shadow-sm shadow-emerald-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label
            htmlFor="password"
            className="text-white font-semibold font-sans"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="border-0 shadow-sm shadow-emerald-300 rounded-lg pl-0.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label
            htmlFor="confirmPassword"
            className="text-white font-semibold font-sans"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="border-0 shadow-sm shadow-emerald-300 rounded-lg pl-0.5"
            value={confirmPassword}
            onChange={(e) => SetConfirmPassword(e.target.value)}
          />

          <button
            disabled={isLoading}
            className="border border-emerald-300 rounded-full gap-t-5 hover:bg-emerald-400 font-semibold hover:scale-105"
            type="submit"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loader />}
          <div className="mt-4">
            <p className="text-white">
              Already have an account ?{" "}
              <Link
                to={
                  redirect && redirect !== "/"
                    ? `/login?redirect=${redirect}`
                    : "/login"
                }
                className="underline text-emerald-400 pl-2"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Register;
