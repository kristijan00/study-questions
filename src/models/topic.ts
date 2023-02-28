export interface Topic {
  id: string;
  name: string;
  date_created: string;
  user_id: string;
  questionList: Question[];
  noOfQuestions: number;
}

export interface Question {
  id: string;
  title: string;
  answer: string;
  user_id: string;
  topic_id: string;
  difficulty: string;
  date_created: string;
}