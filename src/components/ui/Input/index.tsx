import { forwardRef } from "react";

export interface InputProps {
  type?: "email" | "number" | "tel" | "text";
  name: string;
  [k: string]: any;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = "text", name, ...props },
  forwardedRef,
) {
  return (
    <input
      id={name}
      type={type}
      ref={forwardedRef}
      className="w-full border-b border-textColor text-lg focus:border-b focus:border-textColor focus:outline-none"
      {...props}
    />
  );
});
