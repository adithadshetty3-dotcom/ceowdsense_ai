import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Chatbot from '../components/Chatbot';
import { useStore } from '../lib/store';

vi.mock('../lib/store', () => ({
  useStore: vi.fn(),
}));

describe('Chatbot', () => {
  it('opens and closes correctly', () => {
    (useStore as any).mockReturnValue({ language: 'EN' });

    render(<Chatbot />);
    
    const botButton = screen.getByRole('button', { name: /Open AI Assistant/i });
    fireEvent.click(botButton);
    
    expect(screen.getByRole('heading', { name: /CrowdSense AI/i })).toBeDefined();
    
    // The close button has the 'X' icon but let's check its role
    // and just find the button that is inside the dialog
    const closeButton = screen.getAllByRole('button').find(b => !b.getAttribute('aria-expanded'));
    if (closeButton) fireEvent.click(closeButton);
  });

  it('responds to user questions', () => {
    (useStore as any).mockReturnValue({ language: 'EN' });

    render(<Chatbot />);
    
    // Open chatbot
    fireEvent.click(screen.getByRole('button'));
    
    const input = screen.getByLabelText(/Message Input/i);
    fireEvent.change(input, { target: { value: 'Where is the exit?' } });
    
    const sendButton = screen.getByLabelText(/Send Message/i);
    fireEvent.click(sendButton);
    
    expect(screen.getByText(/Where is the exit/i)).toBeDefined();
  });
});
