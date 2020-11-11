import React from "react";
import ModalWrapper from "../../App/common/modal/ModalWrapper";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Button, Label, Divider } from "semantic-ui-react";
import MyTextInput from "../../App/common/form/MyTextInput";
import { useDispatch } from "react-redux";
import { closeModal } from "../../App/common/modal/ModalReducer";
import { registerUser } from "../../App/firestore/fireBaseService";
import SocialLogIn from "./SocialLogIn";

export default function RegisterForm() {
  const dispatch = useDispatch();
  return (
    <ModalWrapper size="mini" header="Register">
      <Formik
        initialValues={{ displayName: "", email: "", password: "" }}
        validationSchema={yup.object({
          displayName: yup.string().required(),
          email: yup.string().required().email(),
          password: yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerUser(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <MyTextInput name="displayName" placeholder="Name" />
            <MyTextInput name="email" placeholder="email" />
            <MyTextInput
              name="password"
              placeholder="Password"
              type="Password"
            />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              color={!isValid || !dirty || isSubmitting ? "red" : "green"}
              size="large"
              fluid
              content="Register"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogIn />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
