import { Result } from '../models/result';

const locao = 'localhost';
const wifi = '192.168.1.24';


const createTopic = async (topicName: string, user_id: string): Promise<Result> => {
  try {
    const response = await fetch(`http://${locao}:3000/create-topic`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        name: topicName,
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

export default createTopic;