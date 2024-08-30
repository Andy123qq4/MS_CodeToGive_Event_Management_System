import EventPreview from "@/components/events/user/EventPreview";
import EventPreviewCard from "@/components/events/user/EventPreviewCard";
import eventimage from '../../public/images/1.jpg'
import { EventDialog } from "@/components/events/user/EventDialog";
import { Fragment } from "react";

export default function EventDummy() {
  const handleRegister = () => {
    // Empty Function 
  }
  return (
    <Fragment>
      <EventPreview 
        imageSrc={eventimage}
        title="Kayaking with your fellow friends"
        date="Sun, July 28, 2028"
        time="10:00 AM"
        location="Sham Shui Po"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        onRegister={handleRegister}/>
      <EventPreviewCard 
       imageUrl={eventimage}
       date="28"
       month="JUL"
       title="Kayaking with your fellow friends"
       link="#"
       />
    </Fragment>
  );
}
