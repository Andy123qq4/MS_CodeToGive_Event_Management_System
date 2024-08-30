import Header from "@/components/ui/Header";
import { Star } from "@mui/icons-material";

export default function TrainComplete() {
  const eventName = "Train for Kayaking Event";
  const eventImg = "/images/kayaking.jpg";
  const eventDate = "Date: Sun, Jul 28, 2024";

  return (
    <div className="mb-40">
      <Header img={eventImg} heading={eventName} description={eventDate} />
      <div className="flex justify-center">
        <div className="flex justify-center text-white font-bold w-1/2 bg-green-500 rounded-full mt-4">
          100%
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src="/images/zubin_cartoon.png" className="w-64 h-64 mt-16" />
        <div className="text-3xl text-text m-8">
          Congratulations on Completing the Training!
        </div>
        <div className="text-text text-xl m-6 mt-0">
          You have earn one more star! Get 4 more to get a badge
        </div>
        <div className="flex justify-between p-6">
          <Star color="primary" sx={{ fontSize: 60 }} />
          <Star color="gray" sx={{ fontSize: 60 }} />
          <Star color="gray" sx={{ fontSize: 60 }} />
          <Star color="gray" sx={{ fontSize: 60 }} />
          <Star color="gray" sx={{ fontSize: 60 }} />
        </div>
      </div>
    </div>
  );
}
