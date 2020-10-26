import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { creatEvent, updateEvent } from "../EventsActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../App/common/form/MyTextInput";
import cuid from "cuid";
import MyTextArea from "../../../App/common/form/MyTextArea";
import MySelectInput from "../../../App/common/form/MySelectInput";
import { categoryData } from "../../../App/api/categoryOptions";
import MyDateInput from "../../../App/common/form/MyDateInput";

export default function EventForm({ match, history }) {
  const selecteDEvent = useSelector((state) =>
    state.events.events.find((e) => e.id === match.params.id)
  );

  function submitForm(values) {
    selecteDEvent
      ? dispatch(updateEvent({ ...selecteDEvent, ...values }))
      : dispatch(
          creatEvent({
            ...values,
            id: cuid(),
            hostedBy: "Bob",
            attendees: [],
            hostPhotURL: "",
          })
        );
    history.push("/events");
  }

  const dispatch = useDispatch();
  const initialValues = selecteDEvent ?? {
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

  return (
    <Segment clearing>
      <Header content={selecteDEvent ? "Edit Event" : "create new Event"} />
      <Formik
        validationSchema={validation}
        initialValues={initialValues}
        onSubmit={(values) => submitForm(values)}
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
              timeFormat="HH:mm"
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
            />
            <Button as={Link} to="/events" content="cancel" floated="right" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
