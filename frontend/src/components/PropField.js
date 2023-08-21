import React, { useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteEdit, saveProp } from "../features/saveForm";

const PropField = () => {
  const { editValue, label } = useSelector((state) => state.save);
  const dispatch = useDispatch();
  const [form, setForm] = useState("");

  const saveForm = () => {
    let arrNew = [];
    label.forEach((item) => {
      if (item === editValue) {
        arrNew.push([editValue[0], form]);
      } else {
        arrNew.push(item);
      }
    });
    dispatch(saveProp(arrNew));
    setForm("");
    dispatch(deleteEdit());
  };

  return (
    <div className="w-1/12 border-2 p-3 bg-gray-100 rounded-md place-content-center grid gap-y-3">
      <div className="text-lg text-center">{editValue[1]}</div>
      <TextField onChange={(e) => setForm(e.target.value)} value={form} />
      <DefaultButton
        text="Save"
        allowDisabledFocus
        onClick={() => {
          saveForm();
        }}
      />
    </div>
  );
};

export default PropField;
