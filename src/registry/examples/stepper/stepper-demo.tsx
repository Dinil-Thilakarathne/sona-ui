import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTitle,
  StepperTrigger,
} from "@/registry/sonaui/stepper/stepper";

export default function StepperDemo() {
  return (
    <Stepper defaultValue={1} orientation="vertical" className="max-w-xl">
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <StepperTitle>Install dependencies</StepperTitle>
          </StepperTrigger>
        </StepperItem>
        <StepperItem step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <StepperTitle>Copy the files</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
      <StepperPanel>
        <StepperContent value={1}>
          Add the package dependencies before copying the component source.
        </StepperContent>
        <StepperContent value={2}>
          Copy each component file into the matching location in your project.
        </StepperContent>
      </StepperPanel>
    </Stepper>
  );
}
