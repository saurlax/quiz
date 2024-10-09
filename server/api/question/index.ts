import { QuestionModel } from "~/models/Question";
import { QuizModel } from "~/models/Quiz";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (!query.quiz) {
    throw createError({
      statusCode: 400,
      message: "quiz is required",
    });
  }
  const quiz = await QuizModel.findById(query.quiz);
  if (!quiz) {
    throw createError({
      statusCode: 404,
      message: "Quiz not found",
    });
  }
  return await QuestionModel.find({ _id: { $in: quiz.questions } });
});