import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "@/components/ui/Header";

const localizer = momentLocalizer(moment);

export const EventCalendar = () => {
  const [events, setEvents] = useState([]);

  // const events1 = [
  //   {
  //     start: moment("2024-08-25T13:00:00").toDate(),
  //     end: moment("2024-08-25T15:00:00").toDate(),
  //     title: "Kayaking event",
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = '66cb157066c043cef5083cb1';
        const response = await fetch(`/api/users/calendar?user_id=${user_id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const formattedEvents = data.data.map(event => ({
          start: moment(`${event.start_date}T${event.start_time}`).toDate(),
          end: moment(`${event.end_date}T${event.end_time}`).toDate(),
          title: event.event_name,
          description: event.description,
          location: event.location
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header
        img={"/images/kayaking.jpg"}
        heading="My Calendar"
        description="Check out the events you might be interested in!"
      />
       <div>
      <div style={{ height: "95vh", width: "80%", margin: "0 auto" }}>
        <Calendar localizer={localizer} events={events} />
      </div>
    </div>
      
      <style jsx>{`
        .rbc-event {
          background-color: red;
        }
      `}</style>
    </div>
  );
};