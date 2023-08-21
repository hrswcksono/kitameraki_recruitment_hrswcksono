import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkForm } from "../features/saveForm";

const Navbar = () => {
  const { duplicate, label } = useSelector((state) => state.save);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkForm());
  }, [label]);

  return (
    <div className="flex justify-center gap-x-5 my-3">
      {duplicate < 2 ? (
        <Link className="text-lg rounded-md p-1  shadow-lg border-2" to={"/"}>
          Main
        </Link>
      ) : null}
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
