import React from "react";
import { Button, Card } from "@mui/material";
import {
  MdEvent,
  MdAccessTime,
  MdLocationOn,
  MdPerson,
  MdUpdate,
} from "react-icons/md";

export default function EventCard({ event }) {
  return (
    <Card
      variant="outlined"
      className="flex items-center mb-4 rounded-lg shadow-lg p-5 mx-6"
    >
      <img
        src={event.event_details.image_url}
        alt={event.event_details.event_name}
        className="w-36 h-36 rounded-lg object-cover mr-5"
      />
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-2">
          {event.event_details.event_name}
        </h2>
        <div className="flex items-center mb-2">
          <MdEvent className="mr-2" />
          <span>
            Date: {new Date(event.event_details.start_date).toDateString()}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <MdAccessTime className="mr-2" />
          <span>Time: {event.event_details.start_time}</span>
        </div>
        <div className="flex items-center mb-2">
          <MdLocationOn className="mr-2" />
          <span>Location: {event.event_details.location}</span>
        </div>
        <div className="flex items-center mb-2">
          <MdPerson className="mr-2" />
          <span>Created by: {event.created_by}</span>
        </div>
        <div className="flex items-center mb-2">
          <MdUpdate className="mr-2" />
          <span>Last updated: {event.last_modified_by}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button className="bg-[#F9EF1F] text-black px-4 py-2 rounded">
          Remind
        </button>
        <button className="bg-[#01A9FF] text-white px-4 py-2 rounded">
          Edit
        </button>
        <button className="bg-[#B23239] text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </Card>
  );
}
