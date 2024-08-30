import Section from "@/components/train/Section";
import Header from "@/components/ui/Header";
import { useRouter } from "next/router";

export default function TrainSectionPage() {
  const eventName = "Train for Kayaking Event";
  const eventImg = "/images/kayaking.jpg";
  const eventDate = "Date: Sun, Jul 28, 2024";

  const router = useRouter();
  const eventID = "e1";

  const handleFinish = () => {
    router.push("/volunteer/train/" + eventID + "/complete");
  };

  return (
    <div className="mb-40 mt-20">
      <Header img={eventImg} heading={eventName} description={eventDate} />
      <div className="flex justify-center">
        <div className="flex relative justify-start  w-1/2 bg-gray-100 rounded-full mt-4">
          <div className="w-1/2 bg-green-500 rounded-l-full" />
          <div className="text-text font-bold">50%</div>
        </div>
      </div>
      <Section
        sectionTitle="Preparations"
        sectionDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."
      />
      <div className="flex justify-end mr-32 p-4 mt-8">
        <div
          onClick={handleFinish}
          className="bg-primary rounded-full font-bold flex justify-center items-center p-3 w-44 hover:bg-yellow-400 cursor-pointer"
        >
          Finish
        </div>
      </div>
    </div>
  );
}
