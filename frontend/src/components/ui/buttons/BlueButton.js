export default function BlueButton(props) {
  return (
    <div className="bg-blue-500 text-white hover:bg-blue-700 m-2 cursor-pointer font-bold p-2 w-24 flex justify-center items-center rounded-md">
      {props.children}
    </div>
  );
}
