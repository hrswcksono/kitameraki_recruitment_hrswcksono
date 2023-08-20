import { createSlice } from "@reduxjs/toolkit";

export const saveForm = createSlice({
  name: "save",
  initialState: {
    value: [],
  },
  reducers: {
    save: (state, action) => {
      state.value = action.payload;
    },
    deleteForm: (state) => {
      state.value = [];
    },
  },
});

export const { save, deleteForm } = saveForm.actions;

export default saveForm.reducer;
