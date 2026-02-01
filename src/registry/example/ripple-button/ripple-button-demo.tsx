import { type ReactNode } from "react";

import ComponentWrapper from "@/components/Common/component-wrapper";
import RippleButton, {
  RippleButtonText,
  RippleButtonTextProps,
} from "@/registry/sonaui/ripple-button/ripple-button";
import { cn } from "@/lib/utils";

interface LocalRippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  scaleAmount?: number;
  className?: string;
  duration?: number;
  rippleStyle?: string;
}

interface RippleButtonEx1Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonProps?: LocalRippleButtonProps;
  textProps?: RippleButtonTextProps;
  className?: string;
}

const RippleButton_ex = ({
  textProps,
  buttonProps,
  className,
  ...props
}: RippleButtonEx1Props) => {
  return (
    <ComponentWrapper
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <RippleButton {...buttonProps}>
        <RippleButtonText {...textProps} text="Hover me!" />
      </RippleButton>
    </ComponentWrapper>
  );
};

export default RippleButton_ex;
