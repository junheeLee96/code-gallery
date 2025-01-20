"use client";

import { userActivities } from "@/app/lib/options";
import { useState } from "react";
import UserActivityList from "./UserAvticityList";

const SelectedActivityClass = "border-b";

export default function History() {
  const [userActivity, setUserActivity] = useState("post");

  const onActivityClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const btn = (e.target as HTMLElement).closest("button");
    if (!btn) return;
    const { name } = btn;
    setUserActivity(name);
  };

  return (
    <div className="w-full mt-5 ">
      <div className="w-full flex justify-between" onClick={onActivityClick}>
        {userActivities.map((activity) => (
          <button
            key={activity.value}
            className={`flex-1 flex justify-center pb-1 ${
              userActivity === activity.value ? SelectedActivityClass : ""
            }`}
            type="button"
            name={activity.value}
          >
            {activity.name}
          </button>
        ))}
      </div>
      <UserActivityList activity={userActivity} />
    </div>
  );
}
