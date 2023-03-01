import { Result } from '../models/result';

const appUsage = async (user_id: string, action: string): Promise<Result> => {
  try {
    const response = await fetch(`https://boiling-cliffs-71800.herokuapp.com/app-usage`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        action: action,
      }),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: 'Something went wrong!',
    };
  }
};

export default appUsage;