import { FC, PropsWithChildren } from "react";

type ButtonProps = JSX.IntrinsicElements["button"] & PropsWithChildren;

const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`${className} btn bg-success w-64 py-1 text-2xl mx-auto rounded font-extrabold text-white`}
    >
      {children}
    </button>
  );
};

export default Button;
