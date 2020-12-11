import { format, formatDistance } from "date-fns";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Comment, Header, Segment } from "semantic-ui-react";
import { createDataTree } from "../../../App/common/util/util";
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
  const { authenticated } = useSelector((state) => state.auth);

  const [replay, setReplay] = useState({ open: false, commentId: null });

  function handleCloseReplayForm() {
    setReplay({ open: false, commentId: null });
  }

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
        <Header>
          {authenticated
            ? `Let Chat about ${event.hostedBy} event`
            : "Please signIn To Chat"}
        </Header>
      </Segment>
      {authenticated && (
        <Segment attached>
          <EventDetailsChatForm
            eventId={event.id}
            parentId={0}
            handleCloseReplayForm={handleCloseReplayForm}
          />

          <Comment.Group>
            {comments &&
              createDataTree(comments).map((comment) => (
                <Comment key={comment.ChatId}>
                  <Comment.Avatar
                    src={
                      comment.photoURL
                        ? comment.photoURL
                        : "https://randomuser.me/api/portraits/women/72.jpg"
                    }
                  />

                  <Comment.Content key={comment.ChatId}>
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
                      <Comment.Action
                        onClick={() => {
                          setReplay({ open: true, commentId: comment.ChatId });
                        }}
                      >
                        Reply
                      </Comment.Action>
                      {replay.open && comment.ChatId === replay.commentId && (
                        <EventDetailsChatForm
                          eventId={event.id}
                          parentId={comment.ChatId}
                          closeReplayForm={handleCloseReplayForm}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>
                  {comment.childNodes.length > 0 && (
                    <Comment.Group>
                      {comment.childNodes.map((child) => (
                        <Comment key={child.ChatId}>
                          <Comment.Avatar
                            src={
                              child.photoURL
                                ? child.photoURL
                                : "https://randomuser.me/api/portraits/women/72.jpg"
                            }
                          />
                          <Comment.Avatar />

                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${child.uid}`}
                            >
                              {child.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <p>
                                {format(event.date, "MMMM d, yyyy ")}
                                {formatDistance(child.date, new Date())}
                              </p>
                            </Comment.Metadata>
                            <Comment.Text>{child.text}</Comment.Text>
                            <Comment.Actions>
                              <Comment.Action
                                onClick={() => {
                                  setReplay({
                                    open: true,
                                    commentId: child.ChatId,
                                  });
                                }}
                              >
                                Reply
                              </Comment.Action>
                              {replay.open &&
                                child.ChatId === replay.commentId && (
                                  <EventDetailsChatForm
                                    eventId={event.id}
                                    parentId={child.parentId}
                                    closeReplayForm={handleCloseReplayForm}
                                  />
                                )}
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      ))}
                    </Comment.Group>
                  )}
                </Comment>
              ))}
          </Comment.Group>
        </Segment>
      )}
    </>
  );
}
