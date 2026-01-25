import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Quiz from './Quiz';
import { GamestateContext } from './Quiz_helpers/Contexts';
import * as api from './Quiz_helpers/api';

// Mock the API fetch function
vi.mock('./Quiz_helpers/api');

// Helper to render with Router
const renderWithRouter = (ui) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Quiz Component Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockQuestions = [
        {
            question: "What is 2+2?",
            correctAnswer: "4",
            options: ["3", "4", "5", "6"],
            category: "Math",
            difficulty: "easy"
        },
        {
            question: "Capital of France?",
            correctAnswer: "Paris",
            options: ["London", "Berlin", "Paris", "Madrid"],
            category: "Geography",
            difficulty: "easy"
        }
    ];

    it('renders the menu initially', () => {
        renderWithRouter(<Quiz />);
        expect(screen.getByText(/Quiz App/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Your Name.../i)).toBeInTheDocument();
        expect(screen.getByText(/Start Quiz/i)).toBeInTheDocument();
    });

    it('allows user to enter name and select difficulty', () => {
        renderWithRouter(<Quiz />);
        
        const nameInput = screen.getByPlaceholderText(/Your Name.../i);
        fireEvent.change(nameInput, { target: { value: 'TestUser' } });
        expect(nameInput.value).toBe('TestUser');

        const easyBtn = screen.getByText('easy');
        fireEvent.click(easyBtn);
    });

    it('starts the quiz and displays questions', async () => {
        api.fetchQuestions.mockResolvedValue(mockQuestions);
        
        renderWithRouter(<Quiz />);
        
        // Enter Name
        fireEvent.change(screen.getByPlaceholderText(/Your Name.../i), { target: { value: 'TestUser' } });
        
        // Click Start
        const startBtn = screen.getByText(/Start Quiz/i);
        fireEvent.click(startBtn);

        // Wait for first question
        await waitFor(() => {
            expect(screen.getByText("What is 2+2?")).toBeInTheDocument();
        });

        // Check options are rendered
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it('updates score correctly when correct answer is clicked', async () => {
        api.fetchQuestions.mockResolvedValue(mockQuestions);
        renderWithRouter(<Quiz />);

        // Start Quiz
        fireEvent.change(screen.getByPlaceholderText(/Your Name.../i), { target: { value: 'TestUser' } });
        fireEvent.click(screen.getByText(/Start Quiz/i));

        await waitFor(() => screen.getByText("What is 2+2?"));

        // Click Correct Answer
        fireEvent.click(screen.getByText("4"));

        // Check for feedback
        expect(screen.getByText("✔")).toBeInTheDocument();
    });

    it('shows results screen after finishing quiz', async () => {
        api.fetchQuestions.mockResolvedValue([mockQuestions[0]]); // Single question for speed
        renderWithRouter(<Quiz />);

        // Start
        fireEvent.change(screen.getByPlaceholderText(/Your Name.../i), { target: { value: 'TestUser' } });
        fireEvent.click(screen.getByText(/Start Quiz/i));

        await waitFor(() => screen.getByText("What is 2+2?"));

        // Answer
        fireEvent.click(screen.getByText("4"));
        
        // Click Next/Finish
        const nextBtn = screen.getByText("Finish Quiz"); 
        fireEvent.click(nextBtn);

        // Expect Score Screen
        await waitFor(() => {
            expect(screen.getByText(/Quiz Finished!/i)).toBeInTheDocument();
        });
        
        expect(screen.getByText("1")).toBeInTheDocument(); // Score 1
        expect(screen.getByText("/ 1")).toBeInTheDocument(); // Total 1
    });
});
