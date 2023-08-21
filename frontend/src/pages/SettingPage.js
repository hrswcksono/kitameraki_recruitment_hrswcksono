/* eslint-disable array-callback-return */
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

const getKey = (array, inputKey, key) => {
  const number = array[inputKey].map((element) => {
    if (element.id[0] === key.toString()) {
      return +element.id[2];
    }
  });
  return number;
};

const checkIndex = (array, inputKey, key) =>
  array[inputKey].find((element) => element.id[0] === key.toString());

const setIndexItem = (array, key) => {
  let destructKey = Object.keys(array);
  if (destructKey.length === 1) {
    const keyOne = destructKey[0];
    let index = 0;
    if (array[keyOne].length === 0) {
      return 1;
    } else {
      const number = getKey(array, keyOne, key);
      index = Math.max(...number) + 1;
      return index;
    }
  } else {
    const keyOne = destructKey[0],
      keyTwo = destructKey[1];
    let arrNum1 = [];
    let arrNum2 = [];
    if (checkIndex(array, keyOne, key) !== undefined) {
      arrNum1 = getKey(array, keyOne, key);
      console.log(arrNum1);
    }
    console.log(
      `${keyTwo} check ${checkIndex(array, keyTwo, key) !== undefined}`
    );
    if (checkIndex(array, keyTwo, key) !== undefined) {
      arrNum2 = getKey(array, keyTwo, key);
      console.log(arrNum2);
    }
    const number = [...arrNum1, ...arrNum2];
    if (number.length === 0) {
      return 1;
    }
    const index = Math.max(...number) + 1;
    return index;
  }
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
