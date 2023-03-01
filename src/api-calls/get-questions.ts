import { Question } from '../models/topic';
import { Result } from '../models/result';

const getQuestions = async (user_id: string, topic_id: string): Promise<Result<Question[]>> => {
  try {
    const response = await fetch(`https://boiling-cliffs-71800.herokuapp.com/get-questions`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        topic_id: topic_id,
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

export default getQuestions;