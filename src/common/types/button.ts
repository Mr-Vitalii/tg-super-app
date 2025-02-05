
import { LinkProps } from "react-router-dom";

 type ButtonVariant = "primary" | "secondary" | "danger" | "reg_btn";
 type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}


type LinkVariant = "initial" | "reg-link";

export type LinkButtonProps = {
  to: string;
  variant?: LinkVariant;
  size?: ButtonSize;
} & LinkProps;