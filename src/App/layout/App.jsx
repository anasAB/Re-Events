import React from "react";
import { useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import AccountPage from "../../Features/auth/AccountPage";
import EventDashboard from "../../Features/events/eventDashboard/EventDashboard";
import EventDetaildPage from "../../Features/events/eventDetalied/EventDetaildPage";
import EventForm from "../../Features/events/eventForm/EventForm";
import HomePage from "../../Features/home/HomePage";
import NavBar from "../../Features/nav/NavBar";
import ProfilePage from "../../Features/profiles/profilePage/ProfilePage";
import SandBox from "../../Features/sadbox/SandBox";
import ErrorComponent from "../common/errors/errorComponent";
import ModalManger from "../common/modal/ModalManger";
import LoadingComponent from "./LoadingComponent";
import PrivateRoute from "./PrivateRoute";

function App() {
  const { key } = useLocation();
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) return <LoadingComponent content="Loading The App..." />;
  return (
    <>
      <ModalManger />
      <Route exact path="/" component={HomePage} />

      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetaildPage} />
              <Route
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key}
              />
              <Route path="/account" component={AccountPage} />
              <Route path="/profile/:id" component={ProfilePage} />
              <Route path="/error" component={ErrorComponent} />
              <Route path="/test" component={SandBox} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
