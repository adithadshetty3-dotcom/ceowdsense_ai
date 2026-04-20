import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AttendeeDashboard from '../pages/AttendeeDashboard';
import { BrowserRouter } from 'react-router-dom';
import { useStore } from '../lib/store';

// Mock the store
vi.mock('../lib/store', () => ({
  useStore: vi.fn(),
}));

describe('AttendeeDashboard', () => {
  it('renders common dashboard elements', () => {
    (useStore as any).mockReturnValue({
      user: { displayName: 'Test User' },
      language: 'EN',
      highVisibility: false,
      setLanguage: vi.fn(),
    });

    render(
      <BrowserRouter>
        <AttendeeDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Namaste/i)).toBeDefined();
    expect(screen.getByText(/Live Insights/i)).toBeDefined();
    expect(screen.getByText(/Crowd Density/i)).toBeDefined();
  });

  it('switches languages correctly', () => {
    const setLanguage = vi.fn();
    (useStore as any).mockReturnValue({
      user: { displayName: 'Test User' },
      language: 'EN',
      highVisibility: false,
      setLanguage: setLanguage,
    });

    render(
      <BrowserRouter>
        <AttendeeDashboard />
      </BrowserRouter>
    );

    const langToggle = screen.getAllByText('EN')[0];
    fireEvent.click(langToggle);
    expect(setLanguage).toHaveBeenCalled();
  });
});
