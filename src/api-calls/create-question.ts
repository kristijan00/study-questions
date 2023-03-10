import { Result } from '../models/result';

const createQuestion = async (title: string, answer: string, user_id: string, topicId: string, difficulty: string): Promise<Result> => {
  try {
    const response = await fetch(`https://boiling-cliffs-71800.herokuapp.com/create-question`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        topic_id: topicId,
        title: title,
        answer: answer,
        difficulty: difficulty,
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

export default createQuestion;