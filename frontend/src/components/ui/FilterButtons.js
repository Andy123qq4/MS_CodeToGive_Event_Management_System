import { useState } from "react";

export default function FilterButtons(props) {
  const { b1, b2, b3, b4 } = props;
  const [feature, setFeature] = useState("b1");

  return (
    <div className="flex justify-evenly mr-20 ml-20 mb-12">
      <div
        onClick={() => setFeature("b1")}
        className={`cursor-pointer w-56 p-2 hover:text-red border hover:border-red flex justify-center items-center bg-gray-100 text-text rounded-full font-bold ${
          feature === "b1" ? "border-red" : "border-gray-100"
        } ${feature === "b1" ? "text-red" : ""}`}
      >
        {b1}
      </div>
      <div
        onClick={() => setFeature("b2")}
        className={`cursor-pointer w-56 p-2 hover:text-red border hover:border-red flex justify-center items-center bg-gray-100 text-text rounded-full font-bold ${
          feature === "b2" ? "border-red" : "border-gray-100"
        } ${feature === "b2" ? "text-red" : ""}`}
      >
        {b2}
      </div>
      <div
        onClick={() => setFeature("b3")}
        className={`cursor-pointer w-56 p-2 hover:text-red border hover:border-red flex justify-center items-center bg-gray-100 text-text rounded-full font-bold ${
          feature === "b3" ? "border-red" : "border-gray-100"
        } ${feature === "b3" ? "text-red" : ""}`}
      >
        {b3}
      </div>
      <div
        onClick={() => setFeature("b4")}
        className={`cursor-pointer w-56 p-2 hover:text-red border hover:border-red flex justify-center items-center bg-gray-100 text-text rounded-full font-bold ${
          feature === "b4" ? "border-red" : "border-gray-100"
        } ${feature === "b4" ? "text-red" : ""}`}
      >
        {b4}
      </div>
    </div>
  );
}
