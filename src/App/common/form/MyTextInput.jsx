import React from "react";
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

export default function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);

  //   const toastrOptions = {
  //     timeOut: 1000,
  //     icon: meta.error,
  //     status: meta.error,
  //     removeOnHover: true,
  //     removeOnHoverTimeOut: 1000,
  //     closeOnToastrClick: true,
  //     // attention: true,
  //     transitionIn: "bounceIn",
  //     transitionOut: "bounceOut",
  //     newestOnTop: true,
  //     progressBar: false,
  //   };

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <input {...field} {...props} />

      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
