import { format, formatDistance } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Comment, Header, Segment } from "semantic-ui-react";
import {
  getEventChatRef,
  ObjectInToArray,
} from "../../../App/firestore/fireBaseService";
import { listenToEventChat } from "../EventsActions";
import { CLEAR_COMMENT } from "../EventsConstants";
import EventDetailsChatForm from "./EventDetailsChatForm";

export default function EventDetailsChat({ event }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.events);
  useEffect(() => {
    getEventChatRef(event.id).on("value", (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(listenToEventChat(ObjectInToArray(snapshot.val()).reverse()));
    });
    return () => {
      dispatch({ type: CLEAR_COMMENT });
      getEventChatRef().off();
    };
  }, [event, dispatch]);
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Let Chat about {event.hostedBy} event</Header>
      </Segment>

      <Segment attached>
        <EventDetailsChatForm eventId={event.id} />
        <Comment.Group>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment.ChatId}>
                <Comment.Avatar
                  src={
                    comment.photoURL
                      ? comment.photoURL
                      : "https://randomuser.me/api/portraits/women/72.jpg"
                  }
                />
                <Comment.Avatar />

                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <p>
                      {format(event.date, "MMMM d, yyyy ")}
                      {formatDistance(comment.date, new Date())}
                    </p>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
        </Comment.Group>
      </Segment>
    </>
  );
}
