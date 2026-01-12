import ComponentWrapper from "@/components/Common/component-wrapper";
import SpinningText from "../sonaui/spinningText/SpinningText";

const SpinningText_ex = () => {
  return (
    <ComponentWrapper>
      <div className="flex min-h-[320px] items-center justify-center">
        <SpinningText>This is example text!</SpinningText>
      </div>
    </ComponentWrapper>
  );
};

export default SpinningText_ex;
