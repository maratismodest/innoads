import { render, screen } from '@testing-library/react';
import React from 'react';

import { Toast } from './Toast';

// Mock the next-intl hook
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock SVG imports
jest.mock('@/public/svg/close.svg', () => {
  const CloseSvg = () => <svg data-testid="close-svg" />;
  CloseSvg.displayName = 'CloseSvg';
  return CloseSvg;
});

jest.mock('@/public/svg/fire.svg', () => {
  const FireSvg = () => <svg data-testid="fire-svg" />;
  FireSvg.displayName = 'FireSvg';
  return FireSvg;
});

describe('Toast', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    message: 'Test message',
  };

  it('renders nothing when isOpen is false', () => {
    render(<Toast {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders the toast when isOpen is true', () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays the provided message', () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

});