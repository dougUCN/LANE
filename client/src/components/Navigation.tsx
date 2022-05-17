import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav className="border-b pb-4">
        <Link to="/ems">EMS</Link>
      </nav>
      <nav className="border-b pb-4">
        <Link to="/run-scheduler">Run Scheduler</Link>
      </nav>
      <nav className="border-b pb-4">
        <Link to="/control-panel">Control Panel</Link>
      </nav>
      <nav className="border-b pb-4">
        <Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
