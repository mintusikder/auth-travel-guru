import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

const Login = () => {
  const { loginUser, resetPass, googleLogin } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
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
        if (result.user.emailVerified) {
          console.log(result.user);
          form.reset();
          navigate(location?.state ? location.state : "/");
        } else {
          setLoginError("Please verify your email before logging in.");
        }
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
      return;
    }
    resetPass(email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handelGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
      })
      .then((error) => console.error(error));
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
          {loginError && <p className="mt-4 text-red-600">{loginError}</p>}
          <p className="text-center mt-4">
            Dont have an account?{" "}
            <Link
              to="/registration"
              className="text-orange-600 font-bold underline"
            >
              Create Account{" "}
            </Link>
          </p>
          <hr className="mb-5 mt-5" />
          <button onClick={handelGoogleLogin} className="btn w-full">
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
