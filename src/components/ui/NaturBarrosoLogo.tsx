import Image from "next/image";

type Props = {
  variant?: "dark" | "light";
  className?: string;
};

export default function NaturBarrosoLogo({
  variant = "dark",
  className = "",
}: Props) {
  return (
    <img
      src="/logo/wordmark.png"
      alt="Natur Barroso"
      className={`${className} ${variant === "light" ? "brightness-0 invert" : ""}`}
    />
  );
}
