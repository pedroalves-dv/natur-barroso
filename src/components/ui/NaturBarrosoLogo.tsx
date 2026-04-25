type Props = {
  variant?: "dark" | "light";
  className?: string;
};

export default function NaturBarrosoLogo({
  variant = "dark",
  className = "",
}: Props) {
  const fill = variant === "light" ? "#FFFFFF" : "#2A2A28";

  return (
    <svg
      viewBox="0 0 200 44"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Natur Barroso"
      role="img"
      height="44"
      className={className}
    >
      {/* Mountain mark: two layered peaks */}
      <path d="M6 38 L20 10 L34 38Z" fill={fill} opacity="0.38" />
      <path d="M18 38 L32 16 L46 38Z" fill={fill} />

      {/* Wordmark */}
      <text
        x="56"
        y="23"
        fill={fill}
        fontSize="14"
        fontWeight="700"
        letterSpacing="3"
        style={{
          fontFamily:
            "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
        }}
      >
        NATUR
      </text>
      <text
        x="56"
        y="38"
        fill={fill}
        fontSize="12"
        fontWeight="400"
        letterSpacing="2.5"
        style={{
          fontFamily:
            "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
        }}
      >
        BARROSO
      </text>
    </svg>
  );
}
