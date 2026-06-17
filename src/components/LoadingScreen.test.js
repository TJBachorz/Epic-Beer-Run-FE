import React from 'react';
import { render, act } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

describe('LoadingScreen', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test('renders overlay when isLoading is true', () => {
    const { getByRole } = render(<LoadingScreen isLoading={true} />);
    expect(getByRole('status')).toBeInTheDocument();
  });

  test('removes overlay 400ms after isLoading becomes false', () => {
    const { rerender, queryByRole } = render(<LoadingScreen isLoading={true} />);
    rerender(<LoadingScreen isLoading={false} />);
    act(() => { jest.advanceTimersByTime(400); });
    expect(queryByRole('status')).not.toBeInTheDocument();
  });

  test('overlay has fade class when isLoading becomes false before timer fires', () => {
    const { rerender, getByRole } = render(<LoadingScreen isLoading={true} />);
    rerender(<LoadingScreen isLoading={false} />);
    // Before 400ms fires — element still visible but fading
    expect(getByRole('status')).toHaveClass('loading-overlay--fade');
  });
});
