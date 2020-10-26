import React from "react";
import { useField, useFormikContext } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyDateInput({ label, ...props }) {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{label}</label>

      <DatePicker
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => setFieldValue(field.name, value)}
      />

      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
