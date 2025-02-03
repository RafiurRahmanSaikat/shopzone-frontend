import ShinyText from "../typographs/ShinyText";

export default function ShinyButtonText() {
  return (
    <ShinyText
      text="Just some shiny text!"
      disabled={false}
      speed={3}
      className="custom-class"
    />
  );
}
