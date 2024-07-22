import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Button } from './Button';

// Mock the buttonStyles function
jest.mock('./../../../styles/buttonStyles', () => ({
  __esModule: true,
  default: jest.fn(() => 'mock-button-style'),
}));

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('custom-class');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies buttonStyles with variant', () => {
    render(<Button variant="primary">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('mock-button-style');
  });

  it('passes through other props', () => {
    render(<Button data-testid="test-button">Button</Button>);
    expect(screen.getByTestId('test-button')).toBeInTheDocument();
  });

  it('renders as a button element', () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // it('applies type attribute', () => {
  //   render(<Button type="submit">Submit</Button>);
  //   expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
  // });
});
