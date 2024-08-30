import EventPreviewDescriptionInfo from "@/components/ui/EventPreviewDescriptionInfo";
import AppointStatus from "./AppointStatus";

export default function AppointInfo(props) {
  const { title, date, time, location, status, img } = props;
  return (
    <div className="flex">
      <img src={img} className="w-48 h-48 rounded-sm mr-8" />
      <div className="flex flex-col">
        <div className="font-bold text-xl m-2">{title}</div>
        <AppointStatus status={status} />
        <EventPreviewDescriptionInfo
          date={date}
          time={time}
          location={location}
        />
      </div>
    </div>
  );
}
