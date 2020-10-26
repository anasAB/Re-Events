import React from "react";
import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

export default function MySelectInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(event, dropDownItem) => helpers.setValue(dropDownItem.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
