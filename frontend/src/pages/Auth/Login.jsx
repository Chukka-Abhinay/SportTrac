import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  //  `${userInfo.username}` ||
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      const username = res.username;
      console.log(username);
      navigate(`/`);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  const handleCross = () => {
    navigate("/");
  };
  return (
    <div>
      <section className="">
        <div className="form-container  flex items-center h-screen w-full justify-center text-white ">
          {/* <div className="text-2xl font-semibold mb-4">Sign In</div> */}

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

            <label
              htmlFor="email"
              className="text-white font-semibold font-sans"
            >
              Email Address
            </label>
            <input
              type="email"
              className="border-0 shadow-sm shadow-emerald-300 rounded-lg"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label
              htmlFor="password"
              className="text-white font-semibold font-sans"
            >
              Password
            </label>
            <input
              type="password"
              className="border-0 shadow-sm shadow-emerald-300 rounded-lg pl-0.5"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={isLoading}
              type="submit"
              className="border border-emerald-300 rounded-full gap-t-5 hover:bg-emerald-400 font-semibold hover:scale-105"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
            <p>
              don't have account?
              <Link to="/register" className="underline text-emerald-400 pl-2">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};
export default Login;
