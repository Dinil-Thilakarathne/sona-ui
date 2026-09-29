import TextHighlight from "@/registry/sonaui/text-highlight/text-highlight";

export default function TextHighlightDemo() {
  return (
    <p className="max-w-xl text-center text-3xl font-medium leading-tight tracking-tight">
      Good interfaces make the important details{" "}
      <TextHighlight>feel obvious</TextHighlight>.
    </p>
  );
}
