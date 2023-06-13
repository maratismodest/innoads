import { cva } from 'class-variance-authority';

const inputStyles = cva(['border border-inputBorder h-9 rounded px-4'], {
  variants: {
    variant: {
      primary: [],
      secondary: []
    },
    size: {
      // small: ["text-sm", "py-1", "px-2"],
      // medium: ["text-base", "py-2", "px-4"],
    }
  },
  compoundVariants: [
    {
      variant: 'primary'
      // size: "medium",
    }
  ],
  defaultVariants: {
    variant: 'primary'
    // size: "medium",
  }
});
export default inputStyles;
