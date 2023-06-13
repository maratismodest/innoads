import { cva } from 'class-variance-authority';

const buttonStyles = cva(['inline-block text-center rounded-lg px-4 py-2 w-fit cursor-pointer shadow transition-all hover:shadow-lg'], {
  variants: {
    variant: {
      primary: [
        'bg-blue',
        'text-white'
      ],
      secondary: [
        'border-none',
        'text-black',
        'shadow-none',
        'hover:shadow-none',
        'hover:text-black/80'
      ]
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4']
    }
  },
  compoundVariants: [
    {
      variant: 'primary',
      size: 'medium'
      // class: "uppercase",
      // **or** if you're a React.js user, `className` may feel more consistent:
      // className: "uppercase"
    }
  ],
  defaultVariants: {
    variant: 'primary'
    // size: "medium",
  }
});
export default buttonStyles;
