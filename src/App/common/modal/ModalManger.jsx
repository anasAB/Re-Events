import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../../Features/auth/LoginForm";
import TestModal from "../../../Features/sadbox/TestModal";

export default function ModalManger() {
  const modalLookup = { TestModal, LoginForm };
  const currentModal = useSelector((state) => state.modal);

  let renderModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderModal}</span>;
}
