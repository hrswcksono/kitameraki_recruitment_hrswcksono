import { configureStore } from "@reduxjs/toolkit";
import saveForm from "../features/saveForm";

export default configureStore({
  reducer: {
    save: saveForm,
  },
});
