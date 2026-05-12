import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function AssessmentQuestionsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/assessments/questions/");
        setQuestions(res.data);
      } catch (err) {
        setError("Unable to load assessment questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelectAnswer = (questionId, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = async () => {
    if (!id) {
      setError("Assessment ID is missing.");
      return;
    }

    if (questions.length === 0) {
      setError("There are no questions to submit.");
      return;
    }

    if (Object.keys(answers).length !== questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
          question_id: Number(questionId),
          selected_answer: selectedAnswer,
        })),
      };

      await api.post(`/assessments/${id}/submit/`, payload);
      navigate("/student/assessments");
    } catch (err) {
      setError("Unable to submit the assessment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Assessment Questions</h1>
          <p className="mt-2 text-sm text-slate-600">
            Answer every question and then submit your assessment.
          </p>
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {questions.length === 0 ? (
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">No questions are available.</p>
          </section>
        ) : (
          questions.map((question, index) => (
            <section
              key={question.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-base font-medium text-slate-900">
                {index + 1}. {question.question_text}
              </h2>

              <div className="mt-4 space-y-3">
                {[
                  ["a", question.option_a],
                  ["b", question.option_b],
                  ["c", question.option_c],
                  ["d", question.option_d],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={value}
                      checked={answers[question.id] === value}
                      onChange={() => handleSelectAnswer(question.id, value)}
                      className="mt-0.5"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </section>
          ))
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/student/assessments")}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || questions.length === 0}
            className="rounded-lg bg-[#0B818D] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#096a73] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Submitting..." : "Submit Assessment"}
          </button>
        </div>
      </div>
    </div>
  );
}
