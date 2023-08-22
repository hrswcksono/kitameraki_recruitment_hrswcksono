import React, { useState, useEffect } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { addItems, getItems } from "../fetchApi";
import { useLocation, useNavigate } from "react-router-dom";
import ItemList from "../components/ItemList";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Field from "../components/Field";
import { findIndex } from "../helpers/helpers";

const Page = () => {
  const { value, label } = useSelector((state) => state.save);

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

  const getLabel = (id) => {
    return label[findIndex(id, label)][1];
  };

  const submitFormItem = (input) => {
    addItems(input, () => {
      refresh();
    });
  };

  const refresh = () => {
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
      <div className="text-3xl font-bold my-5 text-center">
        Task Management App
      </div>
      <form onSubmit={handleSubmit(submitFormItem)}>
        <div className="text-lg font-semibold my-5">Standard Fields</div>
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
        {value[0].length !== 0 ? (
          <>
            <div className="text-lg font-semibold my-5">Optional Fields</div>
            <div className="flex justify-start gap-x-3 w-full place-items-stretch mb-5">
              {value.map((temp, idx) => {
                return (
                  <div
                    key={`tab${idx}`}
                    className="h-auto grid gap-y-3 content-start w-full"
                  >
                    {temp.map((data, index) => (
                      <div key={index.toString()}>
                        <div className="bg-white">
                          <Field
                            inputType={data.type}
                            label={getLabel(data.id)}
                            formControl={{ ...register(getLabel(data.id)) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
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
