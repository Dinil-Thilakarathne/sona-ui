import { type ReactNode } from "react";

import RippleButton, {
  RippleButtonText,
  RippleButtonTextProps,
} from "@/registry/sonaui/ripple-button/ripple-button";

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

export default function RippleButtonExample({
  textProps,
  buttonProps,
  className,
  ...props
}: RippleButtonEx1Props) {
  return (
    <RippleButton {...buttonProps}>
      <RippleButtonText {...textProps} text="Hover me!" />
    </RippleButton>
  );
};
