import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StaffTable from '../StaffTable';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('StaffTable Testing', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('it displays loading state', async () => {
    (useQuery as jest.MockedFunction<typeof useQuery>).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
      isFetching: true,
      isSuccess: false,
      status: 'loading',
      refetch: jest.fn(),
      remove: jest.fn(),
      fetchStatus: 'fetching',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<StaffTable />);
    const loadingSkeleton = screen.getByTestId('table-loading-skeleton');
    expect(loadingSkeleton).toBeInTheDocument();
  });
  it('it displays error state', async () => {
    (useQuery as jest.MockedFunction<typeof useQuery>).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Error loading staff members'),
      isError: true,
      isFetching: false,
      isSuccess: false,
      status: 'error',
      refetch: jest.fn(),
      remove: jest.fn(),
      fetchStatus: 'idle',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<StaffTable />);
    const errorMessage = screen.getByText(/Error loading staff members/i);
    expect(errorMessage).toBeInTheDocument();
  });
  it('it displays no data state', async () => {
    (useQuery as jest.MockedFunction<typeof useQuery>).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
      isFetching: false,
      isSuccess: true,
      status: 'success',
      refetch: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      remove: jest.fn(),
      fetchStatus: 'idle',
    });

    render(<StaffTable />);
    const noDataMessage = screen.getByText(/No staff members found/i);
    expect(noDataMessage).toBeInTheDocument();
  });
  it('it display user data', async () => {
    const mockStaffData = [
      {
        id: '1',
        name: 'John Doe',
        role: 'Developer',
        email: 'john@example.com',
        status: 'Active',
        lastLogin: '2023-10-15T10:30:00.000Z',
        driveUsage: '2.5GB',
        device: 'Macbook Pro',
      },
      {
        id: '2',
        name: 'Jane Smith',
        role: 'Designer',
        email: 'jane@example.com',
        status: 'Away',
        lastLogin: '2023-10-14T08:15:00.000Z',
        driveUsage: '1.8GB',
        device: 'Windows PC',
      },
    ];
    (useQuery as jest.MockedFunction<typeof useQuery>).mockReturnValue({
      data: mockStaffData,
      isLoading: false,
      error: null,
      isError: false,
      isFetching: false,
      isSuccess: true,
      status: 'success',
      refetch: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      remove: jest.fn(),
      fetchStatus: 'idle',
    });

    render(<StaffTable />);
    const userName = screen.getByText(/John Doe/i);
    const userRole = screen.getByText(/Developer/i);
    const userEmail = screen.getByText(/john@example.com/i);
    expect(userName).toBeInTheDocument();
    expect(userRole).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
  });
});
