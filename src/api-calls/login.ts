import { User } from '../models/user';
import { Result } from '../models/result';

const locao = 'localhost';
const wifi = '192.168.1.24';

const login = async (email: string, password: string): Promise<Result<User>> => {
  try {
    const response = await fetch(`http://${locao}:3000/login`, {
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