import { Result } from '../models/result';

const deleteQuestion = async (question_id: string, user_id: string): Promise<Result> => {
  try {
    const response = await fetch(`https://boiling-cliffs-71800.herokuapp.com/delete-question`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        question_id: question_id,
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

export default deleteQuestion;