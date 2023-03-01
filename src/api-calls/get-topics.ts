import { Topic } from '../models/topic';
import { Result } from '../models/result';

const getTopics = async (user_id: string): Promise<Result<Topic[]>> => {
  try {
    const response = await fetch(`https://boiling-cliffs-71800.herokuapp.com/get-topics`, {
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