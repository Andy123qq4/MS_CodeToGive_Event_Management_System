import Section from "@/components/train/Section";
import Header from "@/components/ui/Header";
import { useRouter } from "next/router";

export default function TrainPage() {
  const router = useRouter();
  const { eventID } = router.query;

  const eventName = "Train for Kayaking Event";
  const eventImg = "/images/kayaking.jpg";
  const eventDate = "Date: Sun, Jul 28, 2024";
  const sectionVideo = "https://www.youtube.com/embed/tgbNymZ7vqY";
  const sectionTitle = "Briefing Video";
  const sectionDescription =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in";

  const handleProceed = () => {
    const currentPath = router.pathname;
    router.push(currentPath + "/1");
  };

  return (
    <div className="mb-40">
      <Header img={eventImg} heading={eventName} description={eventDate} />
      <div className="flex justify-center">
        <div className="flex justify-center text-text font-bold w-1/2 bg-gray-100 rounded-full mt-4">
          0%
        </div>
      </div>
      <Section
        sectionVideo={sectionVideo}
        sectionTitle={sectionTitle}
        sectionDescription={sectionDescription}
      />
      <div className="flex justify-end mr-32 p-4 mt-8">
        <div
          onClick={handleProceed}
          className="text-text bg-gray-100 border border-text rounded-full flex justify-center items-center p-3 w-44 hover:bg-gray-200 cursor-pointer"
        >
          Proceed
        </div>
      </div>
    </div>
  );
}
