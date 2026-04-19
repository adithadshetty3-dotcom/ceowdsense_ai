import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../lib/store';

describe('Global Store (Zustand)', () => {
  it('should initialize with default values', () => {
    const state = useStore.getState();
    expect(state.user).toBeNull();
    expect(state.highVisibility).toBe(false);
    expect(state.language).toBe('EN');
  });

  it('should update language', () => {
    useStore.getState().setLanguage('HI');
    expect(useStore.getState().language).toBe('HI');
  });

  it('should toggle high visibility mode', () => {
    useStore.getState().setHighVisibility(true);
    expect(useStore.getState().highVisibility).toBe(true);
  });
});
