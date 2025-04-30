import '@testing-library/jest-dom';

import { screen, render } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';

import userEvent from '@testing-library/user-event';
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

import RequestForm from '../RequestForm';
import TicketsProvider from '@/providers/TicketProvider';
describe('RequestForm', () => {
  beforeEach(() => {
    // Set up default mock implementation for useQuery
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
      refetch: jest.fn(),
      status: 'success',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<TicketsProvider>{ui}</TicketsProvider>);
  };

  it('should render without crashing', () => {
    renderWithProvider(<RequestForm />);
    const formHeading = screen.getByText(/IT Request Form/i);
    expect(formHeading).toBeInTheDocument();
  });
  it('it does not submit the form when the email is invalid', async () => {
    renderWithProvider(<RequestForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await userEvent.type(emailInput, '2222@test.');
    await userEvent.click(submitButton);
    const errorMessage = screen.getByText(/Invalid email/i);
    expect(errorMessage).toBeInTheDocument();
  });
  it('should show confirmation message when the form is submitted', async () => {
    const user = userEvent.setup();
    renderWithProvider(<RequestForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, 'test@test.com');

    const issueSelectElement = screen.getByLabelText(/Issue/i);
    await user.click(issueSelectElement);

    const emailDeliveryOption = screen.getByText('Email delivery failure');
    await user.click(emailDeliveryOption);

    const prioritySelectElement = screen.getByLabelText(/Priority/i);
    await user.click(prioritySelectElement);
    const highPriorityOption = screen.getByText('High');
    await user.click(highPriorityOption);

    const descriptionInput = screen.getByLabelText(/Description/i);
    await user.type(descriptionInput, 'Test description');

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await user.click(submitButton);

    const successMessage = await screen.findByTestId(
      'success-it-request-alert'
    );
    expect(successMessage).toBeInTheDocument();

    expect(successMessage).toHaveTextContent(
      /Your request has been submitted successfully/i
    );
    expect(successMessage).toHaveTextContent(
      /You can track your request in the Tickets page!/i
    );
  });
});
