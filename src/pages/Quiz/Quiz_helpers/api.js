import { decodeHTML, shuffleArray } from './utils';

export const fetchQuestions = async (amount = 10, difficulty = '') => {
  const url = `https://opentdb.com/api.php?amount=${amount}&type=multiple${difficulty ? `&difficulty=${difficulty}` : ''}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.response_code !== 0) {
        throw new Error("Failed to fetch questions");
    }

    return data.results.map((q) => {
        const decodedQuestion = decodeHTML(q.question);
        const decodedCorrect = decodeHTML(q.correct_answer);
        const decodedIncorrect = q.incorrect_answers.map(decodeHTML);
        
        // Combine and shuffle options
        const allOptions = shuffleArray([decodedCorrect, ...decodedIncorrect]);
        
        return {
            question: decodedQuestion,
            correctAnswer: decodedCorrect,
            options: allOptions,
            category: q.category,
            difficulty: q.difficulty
        };
    });

  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
