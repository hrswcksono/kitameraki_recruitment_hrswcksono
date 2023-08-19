import React, { useState } from "react";
import { deleteItem, editItems } from "../fetchApi";
import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";

const ItemList = ({ data, refresh }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
  });

  const openEditForm = (index, input) => {
    setEditIndex(index);
    setEditForm({
      title: input.title,
      description: input.description,
    });
  };

  const closeEditForm = () => {
    setEditIndex(-1);
  };

  const saveEdit = (id) => {
    editItems(+id, editForm, (result) => {
      if (result.status === 200) {
        refresh();
      }
    });
    closeEditForm();
  };

  const deleteItems = (id) => {
    deleteItem(+id, (result) => {
      if (result.status === 200) {
        refresh();
      }
    });
  };

  return (
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
  );
};

export default ItemList;
