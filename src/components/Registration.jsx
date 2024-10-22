import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useContext, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendEmailVerification, updateProfile } from "firebase/auth";

const Registration = () => {
  const { createUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [regError, setRegError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handelRegistration = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");
    //password validation
    if (password > 6) {
      setRegError("Password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegError("Password must include at least one uppercase letter.");
      return;
    }
    console.log(email, password);
    createUser(email, password)
      .then((result) => {
        sendEmailVerification(result.user)
          .then(() => {
            setVerificationSent(true);
            console.log(result.user);
            //update profile
            updateProfile(result.user, {
              displayName: name,
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            });
            navigate(location?.state ? location.state : "/");
            form.reset();
            alert(
              "A verification email has been sent. Please verify your email to complete registration."
            );
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
            setRegError("Failed to send verification email. Please try again.");
          });
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
              {/* <div className="form-control">
                <input
                  type="name"
                  name="name"
                  placeholder="Last Name"
                  className="input "
                />
                <hr />
              </div> */}
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
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className="input w-full"
                    required
                  />
                  <span
                    className="absolute mt-4 right-3"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <hr />
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-warning">Registration</button>
            </div>
          </form>
          {regError && <p className="mt-4 text-red-600">{regError}</p>}
          {verificationSent && (
            <p className="mt-4 text-green-600">
              Verification email sent. Please check your email.
            </p>
          )}
          <p className="text-center mt-4">
            Dont have an account?{" "}
            <Link to="/login" className="text-orange-600 font-bold underline">
              Login{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
