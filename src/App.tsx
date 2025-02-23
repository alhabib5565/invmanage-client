import { Navigate } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";

const App = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role;
  if (role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  } else if (role === "sales-executive") {
    return <Navigate to="/sales-executive/dashboard" />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default App;
