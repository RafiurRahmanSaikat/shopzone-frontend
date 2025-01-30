export default function NoData() {
  return (
    <div className="boxShadow flex flex-col items-center justify-center gap-[4px] rounded-xl p-2 sm:px-20 sm:py-14">
      <img
        src="https://i.ibb.co/cgfgxGH/Illustrations.png"
        alt="empty/image"
        className="h-52"
      />
      <h1 className="text-[1.4rem]">Result Not Found</h1>
      <p className="text- text-gray-100">
        Whoops ... this information is not available for a moment
      </p>
    </div>
  );
}
