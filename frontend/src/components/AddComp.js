import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const formInput = [
  {
    value: "TextField",
    label: "Text Field",
  },
  {
    value: "DatePicker",
    label: "Date Picker",
  },
  {
    value: "SpinButton",
    label: "Spin Button",
  },
];

const AddComp = () => {
  return (
    <div className="w-2/12 border-2 py-5 bg-gray-100 rounded-md place-content-center grid">
      <Droppable
        droppableId="controls_droppable"
        type="controls"
        isDropDisabled={true}
      >
        {(provided, snapshot) => (
          <div
            className="grid gap-y-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {formInput.map((item, index) => (
              <Draggable
                key={`control_draggable_${item.value}`}
                draggableId={item.value}
                index={index}
              >
                {(provided, snapshot) => {
                  const style = {
                    ...provided.draggableProps.style,
                    backgroundColor: snapshot.isDragging ? "grey" : "white",
                    color: snapshot.isDragging ? "white" : "black",
                  };
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={style}
                    >
                      <div className="border-2 border-gray-200 p-3 text-center" key={item.value}>
                        <div>{item.label}</div>
                      </div>
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default AddComp;
