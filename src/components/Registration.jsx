import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

const Registration = () => {
  const {createUser} = useContext(AuthContext)
  const handelRegistration = e =>{
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get("email")
    const password = form.get("password")
    console.log(email,password)
    createUser(email,password)
    .then(result =>{
      console.log(result.user)
    })
    .catch(error =>{
      console.error(error)
    })
  }
  return (
    <div>
      <NavBar></NavBar>
      <div className="hero  min-h-screen">
        <div className=" w-full max-w-lg border-2 p-12">
          <h2 className="text-2xl font-bold mb-6">Create an account</h2>
          <form onSubmit={handelRegistration} className="">
            <div className="space-y-6">
            <div className="form-control">
              <input
                type="name"
                name="name"
                placeholder="First Name"
                className="input "
              />
              <hr />
            </div>
            <div className="form-control">
              <input
                type="name"
                name="name"
                placeholder="Last Name"
                className="input "
              />
              <hr />
            </div>
            <div className="form-control">
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

            <div className="form-control mt-6">
              <button className="btn btn-warning">Registration</button>
            </div>
          </form>
          <p className="text-center mt-4">
            Dont have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-bold underline"
            >
              Login{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
