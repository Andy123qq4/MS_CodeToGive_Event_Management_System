export default function GreenButton(props) {
  return (
    <div className="bg-green-600 text-white hover:bg-green-700 m-2 cursor-pointer font-bold p-2 w-24 flex justify-center items-center rounded-md">
      {props.children}
    </div>
  );
}
