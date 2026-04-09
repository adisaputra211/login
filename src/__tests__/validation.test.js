import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../app/login/page';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage Validation', () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
  });

  test('should show error if fields are empty on submit', () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /masuk/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/email atau username wajib diisi/i)).toBeInTheDocument();
  });

  test('should show error if email format is invalid', () => {
    render(<LoginPage />);

    const identifierInput = screen.getByLabelText(/email atau username/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const submitButton = screen.getByRole('button', { name: /masuk/i });

    fireEvent.change(identifierInput, { target: { value: 'invalid-email@' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/format email tidak valid/i)).toBeInTheDocument();
  });

  test('should clear error when user typing', () => {
    render(<LoginPage />);

    const identifierInput = screen.getByLabelText(/email atau username/i);
    const submitButton = screen.getByRole('button', { name: /masuk/i });

    // Trigger error
    fireEvent.click(submitButton);
    expect(screen.getByText(/email atau username wajib diisi/i)).toBeInTheDocument();

    // Typing should clear error
    fireEvent.change(identifierInput, { target: { value: 'a' } });
    expect(screen.queryByText(/email atau username wajib diisi/i)).not.toBeInTheDocument();
  });
});
