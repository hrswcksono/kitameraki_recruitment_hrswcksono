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
  const filterNumber = array[inputKey].filter(
    (item) => item.id[0] === key.toString()
  );
  const number = filterNumber.map((element) => +element.id[2]);
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
    }
    if (checkIndex(array, keyTwo, key) !== undefined) {
      arrNum2 = getKey(array, keyTwo, key);
    }
    const number = [...arrNum1, ...arrNum2];
    if (number.length === 0) {
      return 1;
    }
    const index = Math.max(...number) + 1;
    return index;
  }
};

const findIndex = (id, label) => label.findIndex((item) => item[0] === id);

export { setIndexItem, move, reorder, findIndex };
