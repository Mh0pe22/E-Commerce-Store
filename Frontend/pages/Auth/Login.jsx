import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoding }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form className="container w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium ">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-medium ">
                Password
              </label>

              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                value={password}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              disabled={isLoding}
              type="submit"
              className="bg-pink-500 px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoding ? "Sigin In..." : "Sign In"}
            </button>

            {isLoding && <Loader />}

          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
