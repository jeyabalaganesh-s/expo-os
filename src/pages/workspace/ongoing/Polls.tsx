import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type PollOption = {
  id: string;
  text: string;
  votes: number;
};

type Poll = {
  id: string;
  question: string;
  options: PollOption[];
};

/* ================= MOCK POLLS ================= */

const INITIAL_POLLS: Poll[] = [
  {
    id: "poll-1",
    question: "How useful is this session?",
    options: [
      { id: "o1", text: "Very Useful", votes: 0 },
      { id: "o2", text: "Useful", votes: 0 },
      { id: "o3", text: "Average", votes: 0 },
    ],
  },
  {
    id: "poll-2",
    question: "Would you attend our next event?",
    options: [
      { id: "o1", text: "Yes", votes: 0 },
      { id: "o2", text: "Maybe", votes: 0 },
      { id: "o3", text: "No", votes: 0 },
    ],
  },
];

/* ================= COMPONENT ================= */

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [votedPolls, setVotedPolls] = useState<string[]>([]);

  /* ================= INIT ================= */

  useEffect(() => {
    const savedPolls = localStorage.getItem("event_polls");
    const savedVotes = localStorage.getItem("voted_polls");

    setPolls(savedPolls ? JSON.parse(savedPolls) : INITIAL_POLLS);
    setVotedPolls(savedVotes ? JSON.parse(savedVotes) : []);
  }, []);

  /* ================= PERSIST ================= */

  useEffect(() => {
    localStorage.setItem("event_polls", JSON.stringify(polls));
  }, [polls]);

  useEffect(() => {
    localStorage.setItem(
      "voted_polls",
      JSON.stringify(votedPolls)
    );
  }, [votedPolls]);

  /* ================= VOTE ================= */

  const vote = (pollId: string, optionId: string) => {
    if (votedPolls.includes(pollId)) return;

    setPolls((prev) =>
      prev.map((poll) =>
        poll.id === pollId
          ? {
              ...poll,
              options: poll.options.map((opt) =>
                opt.id === optionId
                  ? { ...opt, votes: opt.votes + 1 }
                  : opt
              ),
            }
          : poll
      )
    );

    setVotedPolls((prev) => [...prev, pollId]);
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Live Polls
      </h1>

      {polls.map((poll) => {
        const totalVotes = poll.options.reduce(
          (sum, o) => sum + o.votes,
          0
        );

        return (
          <div
            key={poll.id}
            className="bg-white border rounded-xl p-4 space-y-4"
          >
            <div className="font-medium text-gray-900">
              {poll.question}
            </div>

            <div className="space-y-2">
              {poll.options.map((opt) => {
                const percent =
                  totalVotes === 0
                    ? 0
                    : Math.round(
                        (opt.votes / totalVotes) * 100
                      );

                return (
                  <button
                    key={opt.id}
                    disabled={votedPolls.includes(poll.id)}
                    onClick={() =>
                      vote(poll.id, opt.id)
                    }
                    className="w-full text-left border rounded-md p-3 hover:bg-gray-50 disabled:opacity-60"
                  >
                    <div className="flex justify-between text-sm">
                      <span>{opt.text}</span>
                      <span>{percent}%</span>
                    </div>

                    <div className="h-1 bg-gray-200 rounded mt-2">
                      <div
                        className="h-1 bg-orange-600 rounded transition-all"
                        style={{
                          width: `${percent}%`,
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {votedPolls.includes(poll.id) && (
              <div className="text-xs text-green-600">
                You have voted
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
