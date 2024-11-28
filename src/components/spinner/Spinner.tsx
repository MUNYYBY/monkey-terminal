import clsx from "clsx";

interface Props {
  size: string | number;
  color?: string;
}

const Spinner = ({ size, color }: Props) => {
  // Define sizes if using string-based sizes
  const sizeClasses: any = {
    sm: "h-4 w-4", // 1rem (16px)
    md: "h-6 w-6", // 1.5rem (24px)
    lg: "h-8 w-8", // 2rem (32px)
    xl: "h-10 w-10", // 2.5rem (40px)
  };

  // Determine the size class or use inline styles for numeric sizes
  const sizeClass =
    typeof size === "string" ? sizeClasses[size] || sizeClasses["md"] : null;
  const inlineSize =
    typeof size === "number" ? { height: `${size}px`, width: `${size}px` } : {};

  return (
    <svg
      className={clsx(
        "m-[1.5px] -ml-1 animate-spin",
        sizeClass, // Apply class-based size if it's a string
        color ? `text-${color}` : "text-primary",
      )}
      style={inlineSize} // Apply inline size if it's a number
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Spinner;
