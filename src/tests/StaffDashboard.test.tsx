import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StaffDashboard from '../pages/StaffDashboard';
import { BrowserRouter } from 'react-router-dom';
import { useStore } from '../lib/store';

vi.mock('../lib/store', () => ({
  useStore: vi.fn(),
}));

describe('StaffDashboard', () => {
  it('renders operational stats and grid', () => {
    (useStore as any).mockReturnValue({
      user: { displayName: 'Staff User', role: 'staff' },
      logout: vi.fn(),
    });

    render(
      <BrowserRouter>
        <StaffDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Control/i)).toBeDefined();
    expect(screen.getByText(/Network Load/i)).toBeDefined();
    expect(screen.getByText(/Security Level/i)).toBeDefined();
  });

  it('navigates between operational tabs', () => {
    (useStore as any).mockReturnValue({
      user: { displayName: 'Staff User', role: 'staff' },
      logout: vi.fn(),
    });

    render(
      <BrowserRouter>
        <StaffDashboard />
      </BrowserRouter>
    );

    const ordersTab = screen.getByText(/orders/i);
    fireEvent.click(ordersTab);
    expect(screen.getByText(/F&B Service Queue/i)).toBeDefined();
  });
});
