import React from "react";
import AddComp from "../components/AddComp";
import { DragDropContext } from "react-beautiful-dnd";
import CustomForm from "../components/CustomForm";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../features/saveForm";

const SettingPage = () => {

  const { value } = useSelector((state) => state.save);
  const dispatch = useDispatch();

  const onDragEnd = (data) => {
    const { draggableId, source, destination } = data;

    console.log(value);

    console.log(destination);

    if (source && destination) {
      if (source.droppableId === "controls_droppable") {
        const newFormControl = {
          id: `${value.length}`,
          type: draggableId,
          config: {},
        };
        const newFormData = [...value];
        newFormData.splice(destination.index, 0, newFormControl);
        dispatch(save(newFormData));
        console.log(value);
      }
      if (source.droppableId === "form_droppable") {
        if (source.index !== destination.index) {
          const newFormData = [...value];
          const movedFormControl = newFormData.splice(source.index, 1)[0];
          newFormData.splice(destination.index, 0, movedFormControl);
          dispatch(save(newFormData));
        }
      }
    }
  };

  return (
    <div className="h-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-evenly">
          <AddComp />
          <CustomForm formData={value} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default SettingPage;
