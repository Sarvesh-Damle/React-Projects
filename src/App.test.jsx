import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders React Projects text', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/React Projects/i);
    expect(linkElement).toBeInTheDocument();
  });
});
