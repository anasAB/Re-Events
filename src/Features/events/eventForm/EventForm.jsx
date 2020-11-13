import React, { useState } from "react";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listenToEvents } from "../EventsActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../App/common/form/MyTextInput";
import MyTextArea from "../../../App/common/form/MyTextArea";
import MySelectInput from "../../../App/common/form/MySelectInput";
import { categoryData } from "../../../App/api/categoryOptions";
import MyDateInput from "../../../App/common/form/MyDateInput";
import useFirestoreDocs from "../../../App/hooks/useFirestoreDocs";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventToFirestore,
} from "../../../App/firestore/firestoreService";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { toastr } from "react-redux-toastr";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selecteDEvent = useSelector((state) =>
    state.events.events.find((e) => e.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

  //**! Cancel and Activeiate event*/
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [conformOpen, setConformOpen] = useState(false);

  const toastrOptions = {
    timeOut: 3000,
    transitionIn: "bounceIn",
    transitionOut: "bounceOut",
    progressBar: false,
    closeOnToastrClick: false,
  };
  async function handleCancelToggle(event) {
    setConformOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      toastr.success(
        event.isCancelled ? "event now is Cancelled" : "event now is Active",
        toastrOptions
      );
      setLoadingCancel(false);
    } catch (error) {
      toastr.error(error.message);
      setLoadingCancel(true);
    }
  }

  const initialValues = selecteDEvent ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validation = Yup.object({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    category: Yup.string().required(),
    description: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
    date: Yup.date().required(),
  });

  /** Fetch Events From FireStore */
  useFirestoreDocs({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading Selected Event" />;
  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Header content={selecteDEvent ? "Edit Event" : "create new Event"} />
      <Formik
        validationSchema={validation}
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selecteDEvent
              ? await updateEventToFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push("/events");
          } catch (error) {
            toastr.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <MyTextInput name="title" placeholder="Title" />
            <MySelectInput
              name="category"
              placeholder="category"
              options={categoryData}
            />
            <MyTextArea name="description" placeholder="description" rows={3} />
            <MyTextInput name="city" placeholder="city" />
            <MyTextInput name="venue" placeholder="venue" />
            <MyDateInput
              name="date"
              placeholderText="date"
              timeFormat="dd LLL yyyy h:mm a"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:m a"
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              content={selecteDEvent ? "Edit Event" : "Creat Event"}
              type="submit"
              floated="right"
              positive
              name="submit"
            />
            {selecteDEvent && (
              <Button
                loading={loadingCancel}
                onClick={() => setConformOpen(true)}
                name="cancel"
                content={selecteDEvent.isCancelled ? "Activate" : "Cancel"}
                color={selecteDEvent.isCancelled ? "green" : "red"}
                type="button"
                floated="left"
              />
            )}

            <Button as={Link} to="/events" content="cancel" floated="right" />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selecteDEvent?.isCancelled
            ? "this will reactivate the event"
            : "this will cancel reactivate the event"
        }
        open={conformOpen}
        onCancel={() => setConformOpen(false)}
        onConfirm={() => handleCancelToggle(selecteDEvent)}
      />
    </Segment>
  );
}
