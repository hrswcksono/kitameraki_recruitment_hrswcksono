import React, { useState, useEffect } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { addItems, getItems } from "./fetchApi";
import { useLocation, useNavigate } from "react-router-dom";
import ItemList from "./components/ItemList";

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
      if (!endPage) {
        navigation("");
      }
    }
  };

  const submitFormItem = () => {
    addItems(form, () => {
      setForm({
        title: "",
        description: "",
      });
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
      <TextField
        label="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <TextField
        className="my-3"
        label="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        multiline
        autoAdjustHeight
      />
      <DefaultButton
        text="Add Item"
        allowDisabledFocus
        className="mb-5"
        onClick={submitFormItem}
      />
      <ItemList data={data} refresh={refresh} />
    </div>
  );
};

export default Page;
