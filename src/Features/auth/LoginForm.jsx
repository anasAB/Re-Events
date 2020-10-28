import React from "react";
import ModalWrapper from "../../App/common/modal/ModalWrapper";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Button } from "semantic-ui-react";
import MyTextInput from "../../App/common/form/MyTextInput";
import { useDispatch } from "react-redux";
import { signIn } from "./AuthConstance";
import { closeModal } from "../../App/common/modal/ModalReducer";

export default function LoginForm() {
  const dispatch = useDispatch();
  return (
    <ModalWrapper size="large" header="Sign in">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={yup.object({
          email: yup.string().required().email(),
          password: yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signIn(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="ui form">
            <MyTextInput name="email" placeholder="password" />
            <MyTextInput
              name="password"
              placeholder="Password"
              type="Password"
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              color={!isValid || !dirty || isSubmitting ? "red" : "green"}
              size="large"
              fluid
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
