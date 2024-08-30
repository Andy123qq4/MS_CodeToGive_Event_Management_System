export default function EmergencyPage() {
  return (
    <div className="p-48 pt-32 flex flex-col justify-center items-center">
      <div className="text-4xl text-text mb-12">Emergency Hotline</div>
      <div className="rounded-full text-lg bg-red text-white mb-6 flex justify-center items-center p-4 w-96 hover:bg-orange-800 cursor-pointer">
        <div className="mr-8 font-bold">Domestic Abuse:</div>
        <div>+852 0000 0000</div>
      </div>
      <div className="rounded-full text-lg bg-red text-white mb-6 flex justify-center items-center p-4 w-96 hover:bg-orange-800 cursor-pointer">
        <div className="mr-8 font-bold">Car Accident:</div>
        <div>+852 0000 0000</div>
      </div>
      <div className="rounded-full text-lg bg-red text-white mb-6 flex justify-center items-center p-4 w-96 hover:bg-orange-800 cursor-pointer">
        <div className="mr-8 font-bold">Child Lost:</div>
        <div>+852 0000 0000</div>
      </div>
      <div className="rounded-full text-lg bg-red text-white mb-6 flex justify-center items-center p-4 w-96 hover:bg-orange-800 cursor-pointer">
        <div className="mr-8 font-bold">Report Crime:</div>
        <div>+852 0000 0000</div>
      </div>
    </div>
  );
}
