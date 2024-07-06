import Spinner from '@/components/ui/Spinner';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Spinner Component', () => {
  it('renders with default props', () => {
    const { container } = render(<Spinner />);
    const spinnerElement = container.querySelector('.animate-spin');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('h-16');
    expect(spinnerElement).toHaveClass('w-16');
    expect(spinnerElement).toHaveClass('border-b-2');
    expect(spinnerElement).toHaveClass('border-blue');
  });

  it('renders with custom className', () => {
    const { container } = render(<Spinner className="custom-class" />);
    const spinnerContainer = container.querySelector('.flex');
    expect(spinnerContainer).toHaveClass('custom-class');
  });

  it('matches snapshot', () => {
    const { container } = render(<Spinner />);
    expect(container).toMatchSnapshot();
  });
});
