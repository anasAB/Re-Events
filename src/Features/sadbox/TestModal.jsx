import React from "react";
import ModalWrapper from "../../App/common/modal/ModalWrapper";

export default function TestModal({ state }) {
  return (
    <ModalWrapper size="mini" header="Test Modal">
      <div>the Data is :{state}</div>
    </ModalWrapper>
  );
}
