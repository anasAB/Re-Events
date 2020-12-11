import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Modal } from "semantic-ui-react";
import { openModal } from "../../App/common/modal/ModalReducer";
import { useHistory } from "react-router-dom";

export default function UnAuthModal({ state, setOpenModal }) {
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const { prevLocation } = useSelector((state) => state.auth);

  function handleClose() {
    if (!history) {
      setOpenModal(false);
      setOpen(false);
      return;
    }
    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push("/events");
    }
    setOpen(false);
  }

  function handleOpenLogInModal({ modalType }) {
    dispatch(openModal({ modalType }));
    setOpen(false);
    setOpenModal(false);
  }

  return (
    <Modal open={open} size="mini" onClose={handleClose}>
      <Modal.Header content="Please SignIn To Continue" />
      <Modal.Content>
        <p>please either LogIn or Register to Continue</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color="teal"
            content="LogIn"
            onClick={() => handleOpenLogInModal("LoginForm")}
          />
          <Button.Or />
          <Button
            fluid
            color="green"
            content="Register"
            onClick={() => handleOpenLogInModal("RegisterForm")}
          />
        </Button.Group>
        <Divider />
        <div style={{ textAlign: "center" }}>
          <p>
            Or Click on Cancel to Continue as a gust will Redirect you to Events
          </p>
          <Button onClick={handleClose} content="Cancel" color="red" />
        </div>
      </Modal.Content>
    </Modal>
  );
}
