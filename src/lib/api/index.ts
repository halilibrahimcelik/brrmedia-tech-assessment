export const fetchedData = async (route: string) => {
  try {
    const response = await fetch(route);

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
