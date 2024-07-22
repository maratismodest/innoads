import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Switcher } from './Switcher';

describe('Switcher', () => {
  it('renders correctly', () => {
    render(<Switcher checked={false} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('applies correct classes when unchecked', () => {
    render(<Switcher checked={false} onChange={() => {}} />);
    const switchContainer = screen.getByRole('checkbox').nextElementSibling;
    expect(switchContainer).toHaveClass('flex h-6 w-11 items-center rounded-full bg-blue px-1');
    expect(switchContainer).not.toHaveClass('justify-end');
  });

  it('applies correct classes when checked', () => {
    render(<Switcher checked={true} onChange={() => {}} />);
    const switchContainer = screen.getByRole('checkbox').nextElementSibling;
    expect(switchContainer).toHaveClass(
      'flex h-6 w-11 items-center rounded-full bg-blue px-1 justify-end'
    );
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Switcher checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('reflects checked state in the input', () => {
    render(<Switcher checked={true} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('has correct accessibility attributes', () => {
    render(<Switcher checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('applies correct styles to the switch knob', () => {
    render(<Switcher checked={false} onChange={() => {}} />);
    const switchKnob = screen.getByRole('checkbox').nextElementSibling?.firstElementChild;
    expect(switchKnob).toHaveClass('h-4 w-4 rounded-full bg-white');
  });
});
