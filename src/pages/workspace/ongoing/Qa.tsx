import { useEffect, useState } from "react";
import { ThumbsUp, MessageSquare } from "lucide-react";

/* ================= TYPES ================= */

type Question = {
  id: string;
  text: string;
  votes: number;
  createdAt: string;
};

/* ================= COMPONENT ================= */

export default function QAPage() {
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [voted, setVoted] = useState<string[]>([]);

  /* ================= INIT ================= */

  useEffect(() => {
    const savedQ = localStorage.getItem("event_questions");
    const savedVotes = localStorage.getItem("voted_questions");

    setQuestions(savedQ ? JSON.parse(savedQ) : []);
    setVoted(savedVotes ? JSON.parse(savedVotes) : []);
  }, []);

  /* ================= PERSIST ================= */

  useEffect(() => {
    localStorage.setItem(
      "event_questions",
      JSON.stringify(questions)
    );
  }, [questions]);

  useEffect(() => {
    localStorage.setItem(
      "voted_questions",
      JSON.stringify(voted)
    );
  }, [voted]);

  /* ================= ACTIONS ================= */

  const submitQuestion = () => {
    if (!questionText.trim()) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: questionText,
      votes: 0,
      createdAt: new Date().toISOString(),
    };

    setQuestions((prev) => [newQuestion, ...prev]);
    setQuestionText("");
  };

  const upvote = (id: string) => {
    if (voted.includes(id)) return;

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, votes: q.votes + 1 } : q
      )
    );

    setVoted((prev) => [...prev, id]);
  };

  /* ================= SORT ================= */

  const sortedQuestions = [...questions].sort(
    (a, b) => b.votes - a.votes
  );

  /* ================= UI ================= */

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Live Q&A
        </h1>
        <p className="text-sm text-gray-500">
          Ask questions and vote for the best ones
        </p>
      </div>

      {/* ASK QUESTION */}
      <div className="bg-white border rounded-xl p-4 space-y-3">
        <textarea
          value={questionText}
          onChange={(e) =>
            setQuestionText(e.target.value)
          }
          placeholder="Type your question here…"
          className="w-full border rounded-md p-3 text-sm resize-none"
          rows={3}
        />

        <button
          onClick={submitQuestion}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          <MessageSquare size={16} />
          Ask Question
        </button>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-3">
        {sortedQuestions.length === 0 ? (
          <div className="text-sm text-gray-400">
            No questions yet. Be the first to ask!
          </div>
        ) : (
          sortedQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white border rounded-xl p-4 flex justify-between gap-4"
            >
              <div>
                <div className="text-sm text-gray-900">
                  {q.text}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Asked at{" "}
                  {new Date(
                    q.createdAt
                  ).toLocaleTimeString()}
                </div>
              </div>

              <button
                onClick={() => upvote(q.id)}
                disabled={voted.includes(q.id)}
                className="flex flex-col items-center text-sm text-gray-600 hover:text-orange-600 disabled:opacity-50"
              >
                <ThumbsUp size={18} />
                <span>{q.votes}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
