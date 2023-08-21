import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Field from "./Field";
import { useDispatch, useSelector } from "react-redux";
import { editProp } from "../features/saveForm";
import { findIndex } from "../helpers/helpers";

const CustomForm = ({ formData }) => {
  const dispatch = useDispatch();
  const { label } = useSelector((state) => state.save);

  const getLabel = (id) => {
    return label[findIndex(id, label)][1];
  };

  const openEditProp = (id) => {
    dispatch(editProp(label[findIndex(id, label)]));
  };

  return (
    <div className="w-8/12 max-h-fit border-2 rounded-md">
      <div className="flex justify-start w-full bg-red-300 place-items-stretch">
        {formData.map((temp, idx) => {
          return (
            <Droppable
              droppableId={`${idx}`}
              type="controls"
              key={idx.toString()}
            >
              {(provided, snapshot) => (
                <div
                  className="h-auto p-5 grid gap-y-3 bg-gray-100 content-start w-full"
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
                          onClick={() => {
                            openEditProp(data.id);
                            // alert("sdadas");
                          }}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="bg-white"
                          >
                            <Field
                              inputType={data.type}
                              label={getLabel(data.id)}
                            />
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
