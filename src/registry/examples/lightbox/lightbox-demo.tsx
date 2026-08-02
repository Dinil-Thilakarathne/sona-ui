import Lightbox from "@/registry/sonaui/lightbox/lightbox";

export default function LightboxDemo() {
  return (
    <Lightbox
      alt="Accordion component preview on a dark canvas"
      caption="Select the backdrop, close button, or press Escape to return."
      className="aspect-[16/10] w-full max-w-xl"
      src="/og/accordion-og.png"
    />
  );
}
