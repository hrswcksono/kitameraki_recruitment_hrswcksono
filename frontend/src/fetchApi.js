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
    console.log(error);
  }
};

const addItems = async (item) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL,
      data: item,
    });
    //   Swal.fire("Add Book", book.name + " has been added", "success");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const editItems = async (id, item) => {
  try {
    let result = await axios({
      method: "PUT",
      url: `${URL}/${id}`,
      data: item,
    });

    // Swal.fire("Edit Book", book.name + " has been updated", "success");
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

const deleteItem = async (id) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await axios({
          method: "DELETE",
          url: `${URL}/${id}`,
        });
        console.log(result);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { getItems, addItems, editItems, deleteItem };
