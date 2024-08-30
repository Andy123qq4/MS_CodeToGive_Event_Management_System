import { Divider } from "@mui/material";
import EventPreviewDescription from "../ui/EventPreviewDescription";
import { useRouter } from "next/router";
import Description from "../ui/Description";

export default function TrainPreview(props) {
  const { title, date, time, location, description, id, img } = props;
  const router = useRouter();
  const handleTrain = () => {
    const currentPath = router.pathname;
    console.log(id);
    router.push(currentPath + "/" + id);
  };
  return (
    <div>
      <div className="flex flex-col p-20 pr-36 pl-36">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <img src={img} className="object-cover w-96 h-80 rounded-lg m-4" />
          <div className="flex flex-col justify-center">
            <EventPreviewDescription
              key={id}
              title={title}
              date={date}
              time={time}
              location={location}
            />
            <Description key={id}>{description}</Description>
            <div className="flex m-4">
              <div
                onClick={handleTrain}
                className="bg-primary rounded-md font-bold flex justify-center items-center w-36 p-2 hover:bg-yellow-400 border border-primary hover:border-yellow-400 mr-12"
              >
                Train
              </div>
              <div className="bg-gray-100 text-text flex justify-center items-center rounded-md w-36 p-2 border border-text hover:border-red hover:text-red">
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
}
