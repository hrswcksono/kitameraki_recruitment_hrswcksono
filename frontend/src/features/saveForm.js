import { createSlice } from "@reduxjs/toolkit";

export const saveForm = createSlice({
  name: "save",
  initialState: {
    value: [[]],
    editValue: [],
    label: [],
  },
  reducers: {
    save: (state, action) => {
      let labelData = [];
      action.payload.forEach((item) => {
        item.forEach((data) => {
          if (state.label.find((item) => item[0] === data.id) === undefined) {
            console.log(data.id);
            labelData.push([data.id, data.label]);
          }
        });
      });
      state.label = [...labelData, ...state.label];
      state.value = action.payload;
    },
    deleteForm: (state) => {
      state.value = [[]];
      state.label = [];
    },
    addForm: (state) => {
      if (state.value.length < 2) {
        state.value.push([]);
      }
    },
    editProp: (state, action) => {
      state.editValue = action.payload;
    },
    saveProp: (state, action) => {
      state.label = action.payload;
    },
    deleteEdit: (state) => {
      state.editValue = [];
    },
  },
});

export const { save, deleteForm, addForm, editProp, saveProp, deleteEdit } =
  saveForm.actions;

export default saveForm.reducer;
