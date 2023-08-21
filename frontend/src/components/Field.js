import React from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { SpinButton } from "@fluentui/react/lib/SpinButton";
import { DatePicker, defaultDatePickerStrings } from "@fluentui/react";

const Field = ({ inputType, label }) => {
  const renderInput = (inputType, label) => {
    switch (inputType) {
      case "TextField":
        return <TextField label={label} />;
      case "SpinButton":
        return (
          <SpinButton
            label={label}
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
            label={label}
            placeholder="Select a date..."
            ariaLabel="Select a date"
            strings={defaultDatePickerStrings}
          />
        );
      default:
        return null;
    }
  };
  return renderInput(inputType, label);
};

export default Field;
