import { createSlice } from "@reduxjs/toolkit";

export const saveForm = createSlice({
  name: "save",
  initialState: {
    value: [[]],
  },
  reducers: {
    save: (state, action) => {
      state.value = action.payload;
    },
    deleteForm: (state) => {
      state.value = [[]];
    },
    addForm: (state) => {
      if (state.value.length < 2) {
        state.value.push([]);
      }
    },
  },
});

export const { save, deleteForm, addForm } = saveForm.actions;

export default saveForm.reducer;
