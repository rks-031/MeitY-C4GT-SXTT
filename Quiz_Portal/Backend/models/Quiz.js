const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    question: String,
    type: { type: String, enum: ['multiple-choice', 'fill-in-the-blank'], required: true },
    options: [String], // Only for multiple-choice questions
    correctAnswer: String, // Correct option or answer
    points: { type: Number, default: 4 }
});

const Quiz = mongoose.model('Quiz', QuizSchema);
