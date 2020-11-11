import React from "react";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import MyTextInput from "../../App/common/form/MyTextInput";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateUserPassword } from "../../App/firestore/fireBaseService";
import { toastr } from "react-redux-toastr";

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);
  const history = useHistory();

  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      <>
        <Header color="teal" sub content="Change your PassWord" />
        {currentUser?.providerId === "password" && (
          <Formik
            initialValues={{ newPassword1: "", newPassword2: "" }}
            validationSchema={yup.object({
              newPassword1: yup.string().required("Password is Required"),
              newPassword2: yup
                .string()
                .oneOf(
                  [yup.ref("newPassword1"), null],
                  "Passwords do not match"
                ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await updateUserPassword(values);
                toastr.success("Password Has been successfully updated");
                await history.push("/");
              } catch (error) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, isValid, dirty, errors }) => (
              <Form className="ui form">
                <MyTextInput
                  name="newPassword1"
                  type="password"
                  placeholder="New Password"
                />
                <MyTextInput
                  name="newPassword2"
                  type="password"
                  placeholder="Confirm Password"
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
                  content="Update Password"
                />
              </Form>
            )}
          </Formik>
        )}
      </>
      {currentUser?.providerId && currentUser.providerId === "facebook.com" && (
        <>
          <Header color="teal" sub content="Facebook account" />
          <p>Please visit Facebook to update your account</p>
          <Button
            icon="facebook"
            color="facebook"
            as={Link}
            to="https://facebook.com"
            content="Go to Facebook"
          />
        </>
      )}
      {currentUser?.providerId && currentUser.providerId === "google.com" && (
        <>
          <Header color="teal" sub content="Google account" />
          <p>Please visit GOOGLE to update your account</p>
          <Button
            icon="google"
            color="google plus"
            as={Link}
            to="https://facebook.com"
            content="Go to Google"
          />
        </>
      )}
    </Segment>
  );
}
