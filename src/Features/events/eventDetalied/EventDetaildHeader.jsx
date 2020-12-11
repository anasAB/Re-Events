import React, { useState } from "react";
import { format } from "date-fns";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";
import {
  addUSerAttendace,
  cancelUserAttendance,
} from "../../../App/firestore/firestoreService";
import { useSelector } from "react-redux";
import UnAuthModal from "../../auth/UnAuthModal";

export default function EventDetaildHeader({ event, isGoing, isHost }) {
  const [loading, setLoading] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  async function handlerJoinUserEvent() {
    setLoading(true);
    try {
      await addUSerAttendace(event);
    } catch (error) {
      toastr.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserLeaveEvent() {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toastr.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {openModal && <UnAuthModal setOpenModal={setOpenModal} />}
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image src={`/assets/${event.category}.jpg`} fluid />
          <Segment basic>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={event.title}
                    style={{ color: "white" }}
                  />
                  <p>{format(event.date, "MMMM d, yyyy h:mm a")}</p>
                  <p>
                    Hosted by{" "}
                    <strong>
                      <Link to={`/profile/${event.hostUid}`}>
                        {event.hostedBy}
                      </Link>
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment attached="bottom" clearing>
          {!isHost && (
            <>
              {isGoing ? (
                <Button onClick={handleUserLeaveEvent} loading={loading}>
                  Cancel My Place
                </Button>
              ) : (
                <Button
                  onClick={
                    authenticated
                      ? handlerJoinUserEvent
                      : () => setOpenModal(true)
                  }
                  color="teal"
                  loading={loading}
                >
                  JOIN THIS EVENT
                </Button>
              )}
            </>
          )}

          {isHost && (
            <Button
              as={Link}
              to={`/manage/${event.id}`}
              color="orange"
              floated="right"
              content=" Manage Event"
            />
          )}
        </Segment>
      </Segment.Group>
    </>
  );
}
