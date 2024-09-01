import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Login = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="hero  min-h-screen">
        <div className=" w-full max-w-lg border-2 p-12">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form className="">
            <div className="space-y-6">
              <div >
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input "
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
