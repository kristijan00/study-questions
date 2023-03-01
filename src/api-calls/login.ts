import { User } from '../models/user';
import { Result } from '../models/result';

const login = async (email: string, password: string): Promise<Result<User>> => {
  try {
    const response = await fetch(`https://boiling-cliffs-71800.herokuapp.com/login`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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

export default login;