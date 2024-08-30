import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function EventPreviewDescriptionInfo(props) {
  const { date, time, location } = props;

  return (
    <div>
      <div className="flex text-text m-2">
        <CalendarMonthIcon />
        <div className="ml-4">{"Date: " + date}</div>
      </div>
      <div className="flex text-text m-2">
        <AccessTimeIcon />
        <div className="ml-4">{"Time: " + time}</div>
      </div>
      <div className="flex text-text m-2">
        <LocationOnIcon />
        <div className="ml-4">{"Location: " + location}</div>
      </div>
    </div>
  );
}
