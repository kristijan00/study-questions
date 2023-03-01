import { Result } from '../models/result';

const createTopic = async (topicName: string, user_id: string): Promise<Result> => {
  try {
    const response = await fetch(`https://boiling-cliffs-71800.herokuapp.com/create-topic`, {
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