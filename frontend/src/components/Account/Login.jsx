import { useForm } from "react-hook-form";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const { email, password } = data;

    axios
      .post("http://localhost:3000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          navigate(`/${result.data.username}`); // Go to /username
        } else if (result.data.error) {
          alert(result.data.error); // optional
        }
      })
      .catch((error) => console.log(error)); // fixed typo from "err" to "error"
  };

  return (
    <div className="form-container  flex items-center h-screen w-full justify-center text-white ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg shadow-emerald-300 w-5/6 md:w-1/3 rounded flex flex-col p-10 justify-between sm:w-5/6 gap-5"
      >
        <img src="logo.png" alt="" className="w-[100px] top-0 left-0 " />

        <label htmlFor="email" className="text-white font-semibold font-sans">
          Email:
        </label>
        <input
          name="email"
          {...register("email")}
          className="border-0 shadow-sm shadow-emerald-300 rounded-lg"
        />
        <label
          htmlFor="password"
          className="text-white font-semibold font-sans"
        >
          Password:
        </label>
        <input
          type="password"
          name="password"
          {...register("password")}
          className="border-0 shadow-sm shadow-emerald-300 rounded-lg pl-0.5"
        />
        <input
          type="submit"
          className="border border-emerald-300 rounded-full gap-t-5 hover:bg-emerald-400 font-semibold hover:scale-105"
        />
        <p>
          don't have account?
          <Link to="/register" className="underline text-emerald-400 pl-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
