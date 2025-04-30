import '@testing-library/jest-dom';

import { screen, render } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import RequestForm from '../RequestForm';
describe('RequestForm', () => {
  it('should render without crashing', () => {
    render(<RequestForm />);
    const formHeading = screen.getByText(/IT Request Form/i);
    expect(formHeading).toBeInTheDocument();
  });
  it('it does not submit the form when the email is invalid', async () => {
    render(<RequestForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await userEvent.type(emailInput, '2222@test.');
    await userEvent.click(submitButton);
    const errorMessage = screen.getByText(/Invalid email/i);
    expect(errorMessage).toBeInTheDocument();
  });
  it('should show confirmation message when the form is submitted', async () => {
    const user = userEvent.setup();
    render(<RequestForm />);

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

    const successMessage = await screen.findByText(
      /Your request has been submitted successfully!/i
    );
    expect(successMessage).toBeInTheDocument();
  });
});
