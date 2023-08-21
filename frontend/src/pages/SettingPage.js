import React from "react";
import AddComp from "../components/AddComp";
import { DragDropContext } from "react-beautiful-dnd";
import CustomForm from "../components/CustomForm";
import { useDispatch, useSelector } from "react-redux";
import { save, addForm, deleteForm } from "../features/saveForm";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

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
      const number = newState[dInd].map((element) => +element.id[2]);
      console.log(number);
      let index = Math.max(...number) + 1;
      console.log(index);
      if (newState[dInd].length === 0) {
        index = 0;
      }
      const newFormControl = {
        id: `${dInd}-${index}`,
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
      dispatch(save(newState.filter((group) => group.length)));
    }
  }

  return (
    <div className="h-auto">
      <div className="flex gap-x-5 justify-center mb-5">
        <DefaultButton
          text="Add row"
          allowDisabledFocus
          disabled={value === 2 ? true : false}
          onClick={() => dispatch(addForm())}
        />
        <DefaultButton
          text="Reset form"
          allowDisabledFocus
          // onClick={() => dispatch(deleteForm())}
          onClick={() => console.log(value)}
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
