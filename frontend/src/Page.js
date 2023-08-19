import React, { useState, useEffect } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { addItems, getItems } from "./fetchApi";
import { useLocation, useNavigate } from "react-router-dom";
import ItemList from "./components/ItemList";
import { useForm } from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(false);

  const navigation = useNavigate();
  const location = useLocation();

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      if (!endPage) {
        navigation("");
      }
    }
  };

  const submitFormItem = (input) => {
    addItems(input, () => {
      refresh();
    });
  };

  const refresh = () => {
    console.log("refresh");
    setEndPage(false);
    setPage(1);
    setData([]);
    navigation("");
  };

  const getData = (page) => {
    getItems(page, 8, (result) => {
      const nextPage = page + 1;
      const nextData = data.concat(result.data);
      setData(nextData);
      setPage(nextPage);
      if (result.count === 0) {
        setEndPage(true);
      }
    });
  };

  useEffect(() => {
    getData(page);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.key]);

  return (
    <div className="w-8/12 justify-self-center">
      <div className="text-3xl font-bold underline my-5">
        Task Management App
      </div>
      <form onSubmit={handleSubmit(submitFormItem)}>
        <TextField
          label="Title"
          {...register("title", {
            required: true,
            pattern: /^[A-Za-z]+$/i,
          })}
        />
        {errors?.title?.type === "required" && <p>This field is required</p>}
        <TextField
          className="my-3"
          label="Description"
          multiline
          autoAdjustHeight
          {...register("description")}
        />
        {/* <input type="submit" /> */}
        <DefaultButton
          text="Add Item"
          allowDisabledFocus
          className="mb-5"
          type="submit"
        />
      </form>
      <ItemList data={data} refresh={refresh} />
    </div>
  );
};

export default Page;
