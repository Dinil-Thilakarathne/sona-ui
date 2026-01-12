import ComponentWrapper from "@/components/Common/component-wrapper";
import Magnetic from "../sonaui/magnetic/MagneticButton";

const Magnetic_ex = () => {
  return (
    <ComponentWrapper>
      <div className="rounded-full border border-dashed border-slate-400 p-2">
        <Magnetic interactionArea="parent">
          <button className="cursor-pointer rounded-full bg-slate-400 px-6 py-4 font-semibold text-slate-800 dark:bg-slate-600 dark:text-slate-50">
            Magnetic Button
          </button>
        </Magnetic>
      </div>
    </ComponentWrapper>
  );
};

export default Magnetic_ex;
