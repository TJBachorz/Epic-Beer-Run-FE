import React from 'react';
import { render, act } from '@testing-library/react';
import App from './App';

describe('App loading state', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([])
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('shows loading screen on initial render', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('status')).toBeInTheDocument();
  });

  test('hides loading screen after breweries fetch resolves', async () => {
    const { queryByRole } = render(<App />);
    await act(async () => {
      await Promise.resolve(); // fetch resolves
      await Promise.resolve(); // response.json() resolves
      await Promise.resolve(); // .then(data => setIsLoading(false)) runs
    });
    act(() => { jest.advanceTimersByTime(400); });
    expect(queryByRole('status')).not.toBeInTheDocument();
  });

  test('hides loading screen even when fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    const { queryByRole } = render(<App />);
    await act(async () => {
      await Promise.resolve(); // fetch resolves
      await Promise.resolve(); // response.json() resolves
      await Promise.resolve(); // .then(data => setIsLoading(false)) runs
    });
    act(() => { jest.advanceTimersByTime(400); });
    expect(queryByRole('status')).not.toBeInTheDocument();
  });
});
