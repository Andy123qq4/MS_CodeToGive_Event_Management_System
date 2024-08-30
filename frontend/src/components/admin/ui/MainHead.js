import FilterButtons from "@/components/ui/FilterButtons";
import { MdAdd } from "react-icons/md";

export default function MainHead(props) {
  const { title, b1, b2, b3, b4 } = props;

  return (
    <div>
      <div className="flex justify-between p-28 pb-12">
        <div className="text-4xl text-text">{title}</div>
        <div className="bg-primary cursor-pointer hover:bg-yellow-400 rounded-full flex justify-center items-center w-16 h-16">
          <MdAdd style={{ fontSize: "32px" }} />
        </div>
      </div>
      <FilterButtons b1={b1} b2={b2} b3={b3} b4={b4} />
    </div>
  );
}
