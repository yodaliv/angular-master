export const serverAddr = "http://localhost";

export class User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  api_token: string;
}

export class NaireInfo {
  id: number;
  content: string;
}

export class Question {
  id: number;
  content: string;
  options: string[];
}

export class Naire {
  id: number;
  content: string;
  questions: Question[];
}

export class NaireWithResult {
  id: number;
  content: string;
  questions: Question[];
  result: number[][];
}