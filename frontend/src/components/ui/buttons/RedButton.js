export default function RedButton(props) {
  return (
    <div className="bg-red text-white hover:bg-orange-900 m-2 cursor-pointer font-bold p-2 w-24 flex justify-center items-center rounded-md">
      {props.children}
    </div>
  );
}
