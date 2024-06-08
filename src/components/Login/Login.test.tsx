import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { toast } from 'react-toastify';

// Mock react-toastify to mock the success function
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Mock the login and logout functions
const mockLogin = jest.fn().mockResolvedValue({ success: true, message: 'Logged in successfully' });
const mockLogout = jest.fn();

// Mock useUserAuth hook
jest.mock('../../hooks/useUserAuth', () => ({
  useUserAuth: () => ({
    isAuthenticated: false,
    loading: false,
    username: 'johnd',
    login: mockLogin,
    logout: mockLogout,
  }),
}));

// Mock disableScroll and enableScroll functions
jest.mock('../../utils/disableScroll', () => ({
  disableScroll: jest.fn(),
  enableScroll: jest.fn(),
}));

describe('Login component', () => {
  it('should render login form when not authenticated', () => {
    const { getByText, getByLabelText } = render(<Login isLoginOpen={true} toggleLoginMenu={() => { }} />);

    expect(getByText(/Login/i)).toBeInTheDocument();
    expect(getByLabelText(/Username/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should call login function on form submission', async () => {
    const { getByText, getByLabelText } = render(<Login isLoginOpen={true} toggleLoginMenu={() => { }} />);
    const usernameInput = getByLabelText(/Username/i);
    const passwordInput = getByLabelText(/Password/i);
    const loginButton = getByText(/Login/i);

    fireEvent.change(usernameInput, { target: { value: 'johnd' } });
    fireEvent.change(passwordInput, { target: { value: 'm38rmF$' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginButton).toBeDisabled();
      expect(mockLogin).toHaveBeenCalledWith('johnd', 'm38rmF$');
      expect(toast.success).toHaveBeenCalledWith('Logged in successfully!');
    });
  });

  it('should call logout function when authenticated', async () => {
    // Update useUserAuth hook to return authenticated state
    jest.mock('../../hooks/useUserAuth', () => ({
      useUserAuth: () => ({
        isAuthenticated: true,
        loading: false,
        username: 'johnd',
        login: mockLogin,
        logout: mockLogout,
      }),
    }));

    const { getByText } = render(<Login isLoginOpen={true} toggleLoginMenu={() => { }} />);
    const logoutButton = getByText(/Logout/i);

    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Logged out successfully!');
    });
  });

  it('should show forgot password message on click and reset it', async () => {
    const { getByText, queryByText } = render(<Login isLoginOpen={true} toggleLoginMenu={() => { }} />);
    const forgotPasswordLink = getByText(/Forgot your password\?/i);

    fireEvent.click(forgotPasswordLink);

    await waitFor(() => {
      expect(queryByText(/Reset password link sent to your email./i)).toBeInTheDocument();
    });
  });
});
