import NavBar from "./NavBar";
import bg from "../assets/images/icons/Rectangle 1.png";

const Home = () => {
  return (
    <div className="w-full h-screen relative">
      {/* Background image as a full-screen image */}
      <div className="w-full h-full">
        <img
          src={bg}
          className="w-full h-full object-cover"
          alt="Background"
        />
      </div>

      {/* NavBar positioned on top of the image */}
      <div className="absolute top-0 left-0 w-full h-16">
        <NavBar />
      </div>
    </div>
  );
};

export default Home;
