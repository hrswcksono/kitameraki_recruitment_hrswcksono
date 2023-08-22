import { createSlice } from "@reduxjs/toolkit";

export const saveForm = createSlice({
  name: "save",
  initialState: {
    value: [[]],
    editValue: [],
    label: [],
    duplicate: 1,
  },
  reducers: {
    save: (state, action) => {
      let labelData = [];
      action.payload.forEach((item) => {
        item.forEach((data) => {
          if (state.label.find((item) => item[0] === data.id) === undefined) {
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
    checkForm: (state) => {
      let duplicateTx = 1;
      state.label.forEach((item) => {
        let test = state.label.filter((temp) => temp[1] === item[1]);
        if (test.length > 1) {
          duplicateTx = 2;
        }
      });
      state.duplicate = duplicateTx;
    },
  },
});

export const {
  save,
  deleteForm,
  addForm,
  editProp,
  saveProp,
  deleteEdit,
  checkForm,
} = saveForm.actions;

export default saveForm.reducer;
