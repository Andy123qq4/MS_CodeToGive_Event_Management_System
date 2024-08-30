import EventPreviewDescriptionInfo from "./EventPreviewDescriptionInfo";

export default function EventPreviewDescription(props) {
  const { title, date, time, location } = props;
  return (
    <div className="m-4 mb-0">
      <div className="font-bold text-xl m-2">{title}</div>
      <EventPreviewDescriptionInfo
        date={date}
        time={time}
        location={location}
      />
    </div>
  );
}
