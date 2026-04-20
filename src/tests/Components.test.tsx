import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';
import { useStore } from '../lib/store';
import { vi } from 'vitest';

vi.mock('../lib/store', () => ({
  useStore: vi.fn(),
}));

describe('UI Components', () => {
  it('ThemeToggle renders correctly', () => {
    (useStore as any).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
    });

    render(<ThemeToggle />);
    const toggle = screen.getByRole('button');
    expect(toggle).toBeDefined();
  });
});
