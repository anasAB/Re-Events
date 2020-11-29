import React from "react";
import { Formik, Form } from "formik";
import { addChatToFireBase } from "../../../App/firestore/fireBaseService";
import MyTextArea from "../../../App/common/form/MyTextArea";
import { Button } from "semantic-ui-react";
import { toastr } from "react-redux-toastr";
import * as Yup from "yup";

export default function EventDetailsChatForm({
  eventId,
  parentId,
  closeReplayForm,
}) {
  return (
    <Formik
      initialValues={{
        comment: "",
      }}
      validationSchema={Yup.object({
        comment: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        try {
          await addChatToFireBase(eventId, { ...values, parentId });
          resetForm();
        } catch (error) {
          toastr.error(error.message);
          setErrors({ auth: error.message });
        } finally {
          setSubmitting(false);
          closeReplayForm({ open: false, commentId: null });
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextArea name="comment" placeholder="comment" rows={2} />
          <Button
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
            icon="edit"
            type="submit"
            primary
            content="Reply"
          />
        </Form>
      )}
    </Formik>
  );
}
