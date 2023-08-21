/* eslint-disable array-callback-return */
import React from "react";
import AddComp from "../components/AddComp";
import { DragDropContext } from "react-beautiful-dnd";
import CustomForm from "../components/CustomForm";
import { useDispatch, useSelector } from "react-redux";
import { save, addForm, deleteForm } from "../features/saveForm";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { move, setIndexItem, reorder } from "../helpers/helpers";

const SettingPage = () => {
  const { value } = useSelector((state) => state.save);
  const dispatch = useDispatch();

  function onDragEnd(result) {
    const { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (source.droppableId === "controls_droppable") {
      let newState = [...value];
      const newFormControl = {
        id: `${dInd}-${setIndexItem(value, dInd)}`,
        type: draggableId,
        config: {},
      };
      newState[dInd] = Object.assign([], newState[dInd]);
      newState[dInd].splice(destination.index, 0, newFormControl);
      dispatch(save(newState));
    } else if (sInd === dInd) {
      const items = reorder(value[sInd], source.index, destination.index);
      const newState = [...value];
      newState[sInd] = items;
      dispatch(save(newState));
    } else {
      const result = move(value[sInd], value[dInd], source, destination);
      const newState = [...value];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      dispatch(save(newState));
    }
  }

  return (
    <div className="h-auto">
      <div className="flex gap-x-5 justify-center mb-5">
        <DefaultButton
          text="Add row"
          allowDisabledFocus
          disabled={value.length === 2 ? true : false}
          onClick={() => dispatch(addForm())}
        />
        <DefaultButton
          text="Reset form"
          allowDisabledFocus
          onClick={() => dispatch(deleteForm())}
        />
      </div>
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
