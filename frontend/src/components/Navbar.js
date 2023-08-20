import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center gap-x-5 my-3">
      <Link className="text-lg rounded-md p-1  shadow-lg border-2" to={"/"}>
        Main
      </Link>
      <Link
        className="text-lg rounded-md p-1  shadow-lg border-2"
        to={"/setting"}
      >
        Setting Form
      </Link>
    </div>
  );
};

export default Navbar;
