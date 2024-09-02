import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useContext, useRef } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

const Login = () => {
  const { loginUser, resetPass } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const handelLogin = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
        form.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handelForgot = () => {
    const email = emailRef.current.value;
    console.log(email);
    if (!email) {
      console.log("Enter your email address");
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Enter a valid address");
    }
    resetPass(email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <NavBar></NavBar>
      <div className="hero  min-h-screen">
        <div className=" w-full max-w-lg border-2 p-12">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handelLogin} className="">
            <div className="space-y-6">
              <div>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input w-full"
                  required
                />
                <hr />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input"
                  required
                />
                <hr />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <input
                  className="mr-2"
                  type="checkbox"
                  name="terms"
                  id="terms"
                />
                <label htmlFor="terms">Remember me</label>
              </div>
              <div>
                <label className="label">
                  <a
                    onClick={handelForgot}
                    href="#"
                    className="label-text-alt link link-hover text-orange-600"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-warning">Login</button>
            </div>
          </form>
          <p className="text-center mt-4">
            Dont have an account?{" "}
            <Link
              to="/registration"
              className="text-orange-600 font-bold underline"
            >
              Create Account{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
