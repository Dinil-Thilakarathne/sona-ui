import ComponentWrapper from "@/components/Common/component-wrapper";
import BubbleUpButton from "@/registry/sonaui/bubble-up-button/bubble-up-button";

export default function BubbleUpButtonExample() {
  return (
    <ComponentWrapper className="!py-8">
      <BubbleUpButton className="bg-background">Hover me!</BubbleUpButton>
    </ComponentWrapper>
  );
}
