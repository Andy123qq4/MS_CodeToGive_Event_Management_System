export default function Header(props) {
  const { img, heading, description } = props;
  return (
    <div>
      <img src={img} className="object-cover min-w-full h-96" />
      <div className="bg-white min-w-full h-24 relative flex justify-center">
        <div className="bg-white rounded-3xl flex flex-col justify-center items-center p-12 absolute bottom-0 w-4/5">
          <div className="text-secondary font-bold text-6xl p-4 pb-6 text-center">
            {heading}
          </div>
          <div className="text-text text-center">{description}</div>
        </div>
      </div>
    </div>
  );
}

