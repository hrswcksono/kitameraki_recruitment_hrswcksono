import React from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { SpinButton } from "@fluentui/react/lib/SpinButton";
import { DatePicker, defaultDatePickerStrings } from "@fluentui/react";

const Field = ({ inputType, label, formControl }) => {
  const renderInput = (inputType, label) => {
    switch (inputType) {
      case "TextField":
        return <TextField label={label} {...formControl} />;
      case "SpinButton":
        return (
          <SpinButton
            label={label}
            defaultValue="0"
            min={0}
            max={100}
            step={1}
            {...formControl}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
          />
        );
      case "DatePicker":
        return (
          <DatePicker
            {...formControl}
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
