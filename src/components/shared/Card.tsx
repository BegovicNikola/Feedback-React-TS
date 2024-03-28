import { PropsWithChildren } from "react";

type CardProps = {
  theme?: "light" | "dark";
};

const Card = ({ children, theme = "light" }: PropsWithChildren<CardProps>) => {
  return <div className={`card ${theme}`}>{children}</div>;
};

export default Card;
