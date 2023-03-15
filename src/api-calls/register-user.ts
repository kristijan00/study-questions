import { Result } from '../models/result';

const registerUser = async (first_name: string, last_name: string, email: string, password: string): Promise<Result> => {
  try {
    const response = await fetch(`https://boiling-cliffs-71800.herokuapp.com/register-user`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
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

export default registerUser;