import { ApiRoutes } from '@/types';

export const getStaffMembers = async () => {
  try {
    const response = await fetch(ApiRoutes.GET_STAFF);
    console.log('Response:', response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching staff members:', error);
    throw error;
  }
};
