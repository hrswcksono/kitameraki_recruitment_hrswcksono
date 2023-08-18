import React, { useState, useEffect } from "react";
import { TextField, MaskedTextField } from "@fluentui/react/lib/TextField";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { addItems, getItems } from "./fetchApi";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollMagic from "scrollmagic";

const Page = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
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
      console.log("end scroll");
      if (!endPage) {
        console.log("next page");
        getData(page);
        navigation("");
      }
    }
  };

  const submitFormItem = () => {
    addItems(form);
    setData([]);
    setEndPage(false);
    setPage(1);
    navigation("");
  };

  const getData = (page) => {
    console.log("panggil data");
    getItems(page, 8, (result) => {
      const nextPage = page + 1;
      const nextData = data.concat(result.data);
      setData(nextData);
      setPage(nextPage);
      if (result.data.count === 0) {
        setEndPage(true);
      }
    });
  };

  useEffect(() => {
    if (data.length === 0) {
      getData(page);
    }
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.key]);

  return (
    <div className="w-8/12 justify-self-center">
      <TextField
        label="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <TextField
        className="my-3"
        label="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <DefaultButton
        text="Add Item"
        allowDisabledFocus
        //  disabled={disabled} checked={checked}
        onClick={submitFormItem}
      />
      <div className="w-full">
        {data.map((item, index) => {
          return (
            <div
              className="border-2 my-1 rounded-md p-2 flex justify-between px-10"
              key={index.toString()}
            >
              <div className="grid justify-items-start">
                <div className="text-2xl">{item.title}</div>
                <div>{item.description}</div>
              </div>
              <div className="grid justify-items-end">
                <div>
                  <DefaultButton text="Edit" allowDisabledFocus />
                </div>
                <div>
                  <DefaultButton text="Delete" allowDisabledFocus />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
