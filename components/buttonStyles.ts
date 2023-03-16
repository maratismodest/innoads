import {cva} from "class-variance-authority";

const buttonStyles = cva(["rounded-lg px-4 py-2 w-fit cursor-pointer shadow transition-all hover:shadow-lg"], {
  variants: {
    intent: {
      primary: [
        "bg-blue",
        "text-white",
      ],
      secondary: [
        "border-none",
        "text-black",
        "shadow-none",
        "hover:shadow-none",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      size: "medium",
      // class: "uppercase",
      // **or** if you're a React.js user, `className` may feel more consistent:
      // className: "uppercase"
    },
  ],
  defaultVariants: {
    intent: "primary",
    // size: "medium",
  },
});
export default buttonStyles
