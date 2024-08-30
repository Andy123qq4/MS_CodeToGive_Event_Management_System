export default function YellowButton(props) {
  return (
    <div className="bg-primary text-black hover:bg-yellow-400 m-2 cursor-pointer font-bold p-2 w-24 flex justify-center items-center rounded-md">
      {props.children}
    </div>
  );
}
