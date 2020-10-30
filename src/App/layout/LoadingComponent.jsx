import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export default function ({ inverted = false, content }) {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content={content} />
    </Dimmer>
  );
}
