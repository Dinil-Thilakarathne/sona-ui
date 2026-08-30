import { cn } from "@/lib/utils";
import Tag from "./tag";

interface LogoProps {
  className?: string;
  showVersion?: boolean;
  version?: string;
}

const Logo = ({ className, showVersion, version }: LogoProps) => {
  return (
    <div role="presentation" className="flex gap-2 items-center">
      <h1 className={cn("font-helvetica-neue text-lg font-bold", className)}>
        Sona UI
      </h1>
      {showVersion && version && (
        <Tag text={version} type="default" className="md:text-xs" />
      )}
    </div>
  );
};

export default Logo;
