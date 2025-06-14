import { useForm } from "react-hook-form";
import "../../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { name, role, email, password } = data;

    try {
      const result = await axios.post("http://localhost:3000/register", {
        name,
        role,
        email,
        password,
      });
      console.log(result);
      alert("Register successful");
      navigate("/login");
    } catch (error) {
      console.error("Register Error:", error);
      alert("Register request failed");
    }
  };

  return (
    <div className="form-container  flex items-center h-screen w-full justify-center text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg shadow-emerald-300 w-5/6 md:w-1/3  flex flex-col p-10 justify-between sm:w-5/6 gap-5"
      >
        <img src="logo.png" alt="" className="w-[100px] top-0 left-0 " />
        <label htmlFor="name" className="text-white font-semibold font-sans">
          Username:
        </label>
        <input
          name="name"
          {...register("name")}
          className="border-0 shadow-sm shadow-emerald-300 rounded-lg"
        />
        <label htmlFor="role" className="text-white font-semibold font-sans">
          Role as:
        </label>
        <select
          name="role"
          {...register("role")}
          className="bg-[#1e1e2f] border-0 shadow-sm shadow-emerald-300 rounded-lg"
        >
          <option value="customer">customer</option>
          <option value="admin">Admin</option>
        </select>
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
          already have account?
          <Link to="/login" className="underline text-emerald-400 pl-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
