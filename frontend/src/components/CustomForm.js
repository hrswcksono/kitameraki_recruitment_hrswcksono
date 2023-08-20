import React from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { SpinButton } from "@fluentui/react/lib/SpinButton";
import { DatePicker, defaultDatePickerStrings } from "@fluentui/react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const CustomForm = ({ formData }) => {
  const renderInput = (inputType) => {
    switch (inputType) {
      case "TextField":
        return <TextField label="Text Field" />;
      case "SpinButton":
        return (
          <SpinButton
            label="SpinButton"
            defaultValue="0"
            min={0}
            max={100}
            step={1}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
          />
        );
      case "DatePicker":
        return (
          <DatePicker
            label="Date picker"
            placeholder="Select a date..."
            ariaLabel="Select a date"
            strings={defaultDatePickerStrings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-9/12 max-h-fit border-2 rounded-md">
      <Droppable droppableId="form_droppable" type="controls">
        {(provided, snapshot) => (
          <div
            className="h-auto p-5 gap-3 grid bg-gray-100"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {formData.map((data, index) => (
              <Draggable
                key={`form_draggable_${index}`}
                draggableId={`form_draggable_${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <div {...provided.dragHandleProps} className="bg-white">
                      {index}
                      {renderInput(data.type)}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default CustomForm;
