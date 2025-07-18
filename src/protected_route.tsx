import { Navigate, Outlet } from "react-router-dom";

type Protected_route_interface = {
  condition: boolean;
  redirectTo?: string;
};

const Protected_route = ({ condition, redirectTo = "/" }: Protected_route_interface) => {

  console.log(condition)
  
  return condition ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
export default Protected_route;