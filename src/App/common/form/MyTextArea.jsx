import React from "react";
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

export default function MyTextArea({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <textarea {...field} {...props} />

      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
