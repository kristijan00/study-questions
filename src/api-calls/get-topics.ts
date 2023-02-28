import { Topic } from '../models/topic';
import { Result } from '../models/result';

const locao = 'localhost';
const wifi = '192.168.1.24';


const getTopics = async (user_id: string): Promise<Result<Topic[]>> => {
  try {
    const response = await fetch(`http://${locao}:3000/get-topics`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
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

export default getTopics;