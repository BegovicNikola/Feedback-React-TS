import { PropsWithChildren } from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  version?: "primary" | "secondary";
  isDisabled?: boolean;
};

const Button = ({
  children,
  version = "primary",
  type = "button",
  isDisabled = false,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
};

export default Button;
