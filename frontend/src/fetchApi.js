import axios from "axios";
import Swal from "sweetalert2";
const URL = "http://localhost:3001/api";

const getItems = async (page, limit, cb) => {
  try {
    let items = await axios({
      method: "GET",
      url: `${URL}?page=${page}&limit=${limit}`,
    });
    cb(items.data);
  } catch (error) {
    Swal.fire("Error", "Internet error", "error");
  }
};

const addItems = async (item, cb) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL,
      data: item,
    });
    Swal.fire("Add Item", item.title + " has been added", "success");
    cb(result.data);
  } catch (error) {
    Swal.fire("Error", "Internet error", "error");
  }
};

const editItems = async (id, item, cb) => {
  try {
    let result = await axios({
      method: "PUT",
      url: `${URL}/${id}`,
      data: item,
    });

    Swal.fire("Edit Item", item.title + " has been updated", "success");
    cb(result.data);
  } catch (error) {
    Swal.fire("Error", "Internet error", "error");
  }
};

const deleteItem = async (id, cb) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (temp) => {
      if (temp.isConfirmed) {
        let result = await axios({
          method: "DELETE",
          url: `${URL}/${id}`,
        });
        cb(result.data);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  } catch (error) {
    Swal.fire("Error", "Internet error", "error");
  }
};

export { getItems, addItems, editItems, deleteItem };
