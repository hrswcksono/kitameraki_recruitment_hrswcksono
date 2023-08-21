import React, { useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { useDispatch, useSelector } from "react-redux";
import { saveProp } from "../features/saveForm";
import { findIndex } from "../helpers/helpers";

const PropField = () => {
  const { editValue, label } = useSelector((state) => state.save);
  const dispatch = useDispatch();
  const [form, setForm] = useState("");

  return (
    <div className="w-1/12 border-2 p-3 bg-gray-100 rounded-md place-content-center grid gap-y-3">
      <div className="text-xl">{editValue[1]}</div>
      <TextField onChange={(e) => setForm(e.target.value)} />
      <DefaultButton
        text="Save"
        allowDisabledFocus
        onClick={() => {
          let arrNew = [];
          // const index = findIndex(editValue[0], label);
          label.forEach((item) => {
            if (item === editValue) {
              arrNew.push([editValue[0], form]);
            } else {
              arrNew.push(item);
            }
          });
          console.log(arrNew);
          dispatch(saveProp(arrNew));
        }}
      />
    </div>
  );
};

export default PropField;
