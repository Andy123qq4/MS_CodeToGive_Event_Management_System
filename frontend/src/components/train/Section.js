import Description from "../ui/Description";

export default function Section(props) {
  const { sectionVideo, sectionTitle, sectionDescription } = props;

  return (
    <div className="w-4/5 flex flex-col justify-center m-auto mt-20">
      {sectionVideo && (
        <iframe src={sectionVideo} className="min-w-full h-96 m-4" />
      )}
      <div className="font-bold text-2xl m-4">{sectionTitle}</div>
      <Description>{sectionDescription}</Description>
    </div>
  );
}
