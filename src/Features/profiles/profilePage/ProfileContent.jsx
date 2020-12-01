import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import AboutPage from "./AboutPage";
import EventTab from "./EventTab";
import FollowingTab from "./FollowingTab";
import PhotosTab from "./PhotosTab";

export default function ProfileContent({ profile, isCurrentUser }) {
  const [activeTab, setActiveTab] = useState(0);

  const panes = [
    {
      menuItem: "About",
      render: () => (
        <AboutPage profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "Photos",
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "Events",
      render: () => (
        <EventTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "Followers",
      render: () => <FollowingTab profile={profile} activeTab={activeTab} />,
    },
    {
      menuItem: "Following",
      render: () => <FollowingTab profile={profile} activeTab={activeTab} />,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
}
