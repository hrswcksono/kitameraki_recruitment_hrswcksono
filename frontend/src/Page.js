import React, { useState, useEffect } from "react";
import { TextField} from "@fluentui/react/lib/TextField";
import { DefaultButton, } from "@fluentui/react/lib/Button";
import { addItems, deleteItem, editItems, getItems } from "./fetchApi";
import { useLocation, useNavigate } from "react-router-dom";

const Page = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
  });
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

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

  const openEditForm = (index, data) => {
    setEditIndex(index);
    setEditForm({
      title: data.title,
      description: data.description,
    });
  };

  const closeEditForm = () => {
    setEditIndex(-1);
  };

  const saveEdit = (id) => {
    console.log(id);
    editItems(+id, editForm);
    closeEditForm();
    getData(page);
    navigation("");
  };

  const deleteItems = (id) => {
    deleteItem(+id)
    navigation("");
  };

  const submitFormItem = () => {
    addItems(form);
    setData([]);
    setEndPage(false);
    setPage(1);
    getData(page);
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
        className="mb-5"
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
                {editIndex === index ? (
                  <>
                    <TextField
                      label="Title"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                    />
                    <TextField
                      className="my-1"
                      label="Description"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <>
                    <div className="text-2xl">{item.title}</div>
                    <div>{item.description}</div>
                  </>
                )}
              </div>
              <div className="grid justify-items-end content-around">
                <div>
                  {editIndex === index ? (
                    <DefaultButton
                      text="Cancel"
                      onClick={() => closeEditForm()}
                      allowDisabledFocus
                    />
                  ) : (
                    <DefaultButton
                      text="Edit"
                      onClick={() => openEditForm(index, item)}
                      allowDisabledFocus
                    />
                  )}
                </div>
                <div>
                  {editIndex === index ? (
                    <DefaultButton
                      text="Save"
                      onClick={() => saveEdit(item.id)}
                      allowDisabledFocus
                    />
                  ) : (
                    <DefaultButton
                      text="Delete"
                      onClick={() => deleteItems(item.id)}
                      allowDisabledFocus
                    />
                  )}
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
