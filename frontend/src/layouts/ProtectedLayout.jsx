import TopBar from "../components/TopBar";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}   