import { Button } from "semantic-ui-react";
import React from "react";
import { useDispatch } from "react-redux";
import { socialLogIn } from "../../App/firestore/fireBaseService";
import { closeModal } from "../../App/common/modal/ModalReducer";

export default function SocialLogIn() {
  const dispatch = useDispatch();

  function handleSocialLogIn(provider) {
    dispatch(closeModal());
    socialLogIn(provider);
  }

  return (
    <>
      <Button
        icon="facebook"
        fluid
        color="facebook"
        style={{ marginBottom: 10 }}
        content="Login With FaceBook"
        onClick={() => handleSocialLogIn("facebook")}
      ></Button>
      <Button
        icon="google"
        fluid
        color="red"
        style={{ marginBottom: 10 }}
        content="Login With Google"
        onClick={() => handleSocialLogIn("google")}
      ></Button>
    </>
  );
}
