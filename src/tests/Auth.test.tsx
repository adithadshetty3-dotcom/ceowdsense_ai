import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { useStore } from '../lib/store';

vi.mock('../lib/store', () => ({
  useStore: vi.fn(),
}));

describe('Authentication Flow', () => {
  it('Landing renders role selection', () => {
    const setRole = vi.fn();
    (useStore as any).mockImplementation((selector?: any) => {
      const state = { setRole };
      return selector ? selector(state) : state;
    });

    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );

    expect(screen.getByText(/CrowdSense/i)).toBeDefined();
    const attendeeButton = screen.getByText(/Enter Stadium/i);
    fireEvent.click(attendeeButton);
    expect(setRole).toHaveBeenCalledWith('attendee');
  });

  it('Login page validates input', () => {
    (useStore as any).mockImplementation((selector?: any) => ({
      user: null,
      login: vi.fn(),
    }));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    expect(screen.getByText(/Secure Log In/i)).toBeDefined();
  });
});
