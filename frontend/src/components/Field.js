import React from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { SpinButton } from "@fluentui/react/lib/SpinButton";
import { DatePicker, defaultDatePickerStrings } from "@fluentui/react";

const Field = ({ inputType }) => {
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
  return renderInput(inputType);
};

export default Field;
