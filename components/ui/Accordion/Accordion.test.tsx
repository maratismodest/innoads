import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Accordion } from './Accordion';

describe('Accordion', () => {
  const title = 'Test Accordion';
  const content = 'Accordion content';

  it('renders the accordion title', () => {
    render(<Accordion title={title}>{content}</Accordion>);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('does not show content by default', () => {
    render(<Accordion title={title}>{content}</Accordion>);
    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });

  it('shows content when clicked', () => {
    render(<Accordion title={title}>{content}</Accordion>);
    fireEvent.click(screen.getByText(title));
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('hides content when clicked twice', () => {
    render(<Accordion title={title}>{content}</Accordion>);
    const titleElement = screen.getByText(title);
    fireEvent.click(titleElement);
    fireEvent.click(titleElement);
    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });
});