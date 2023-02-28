import { Question } from '../models/topic';
import { Result } from '../models/result';

const local = 'localhost';
const wifi = '192.168.1.24';


const getQuestions = async (user_id: string, topic_id: string): Promise<Result<Question[]>> => {
  try {
    const response = await fetch(`http://${local}:3000/get-questions`, {
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