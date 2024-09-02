import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import PropTypes from "prop-types";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (user) {
    return children;
  }
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoutes;
PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
