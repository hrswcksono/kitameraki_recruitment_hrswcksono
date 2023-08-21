import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Field from "./Field";

const CustomForm = ({ formData }) => {
  return (
    <div className="w-9/12 max-h-fit border-2 rounded-md">
      <div className="flex justify-start">
        {formData.map((temp, idx) => {
          return (
            <Droppable
              droppableId={`${idx}`}
              type="controls"
              key={idx.toString()}
            >
              {(provided, snapshot) => (
                <div
                  className="h-auto p-5 gap-3 grid bg-gray-100 content-start w-6/12"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {temp.map((data, index) => (
                    <Draggable
                      key={`${data.id}`}
                      draggableId={`${data.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="bg-white"
                          >
                            {/* {index} */}
                            <Field inputType={data.type} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </div>
  );
};

export default CustomForm;
