import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

interface GitHubAuthor {
  email: string;
  name: string;
}

interface GitHubCommit {
  sha: string;
  author: GitHubAuthor;
  message: string;
  distinct: boolean;
  url: string;
}

interface GitHubActor {
  id: number;
  login: string;
  display_login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  url: string;
}

interface GitHubPayload {
  repository_id: number;
  push_id: number;
  size: number;
  distinct_size: number;
  ref: string;
  head: string;
  before: string;
  commits: GitHubCommit[];
}

interface GitHubEvent {
  id: string;
  type: string;
  actor: GitHubActor;
  repo: GitHubRepo;
  payload: GitHubPayload;
  public: boolean;
  created_at: string;
}

interface ProcessedEvent {
  date: Date;
  username: string;
  repo: string;
  commitHash: string;
  commitUrl: string;
}

const GitHubActivity = () => {
  const [events, setEvents] = useState<ProcessedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGitHubEvents();
  }, []);

  const fetchGitHubEvents = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/users/bucurdavid/events/public"
      );
      const data: GitHubEvent[] = await response.json();

      const pushEvents = data
        .filter((event: GitHubEvent) => event.type === "PushEvent")
        .slice(0, 5)
        .map((event: GitHubEvent) => ({
          date: new Date(event.created_at),
          username: event.actor.login,
          repo: event.repo.name,
          commitHash: event.payload.commits[0].sha.substring(0, 7),
          commitUrl: `https://github.com/${event.repo.name}/commit/${event.payload.commits[0].sha}`,
        }));

      setEvents(pushEvents);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch GitHub events");
      setLoading(false);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="relative w-full  bg-black text-green-400 p-4 font-mono rounded-lg overflow-hidden">
      {/* Base CRT effect with subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0,_rgba(0,0,0,0.2)_100%)] opacity-50" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px]" />

      {/* RGB pixel effect */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-conic-gradient(rgba(255,0,0,0.03)_0deg_120deg,rgba(0,255,0,0.03)_120deg_240deg,rgba(0,0,255,0.03)_240deg_360deg)] bg-[length:2px_2px]" />

      {/* Vertical scan effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent animate-scan" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-3 border-b border-green-400/30 pb-2">
          <span className="text-lg">$ open source activity</span>
          {loading && <Loader className="ml-4 w-4 h-4 animate-spin" />}
        </div>

        {error ? (
          <div className="text-red-400 text-sm">{error}</div>
        ) : loading ? (
          <div className="space-y-2">
            <div className="animate-pulse bg-green-400/10 h-4 rounded" />
            <div className="animate-pulse bg-green-400/10 h-4 rounded" />
            <div className="animate-pulse bg-green-400/10 h-4 rounded" />
          </div>
        ) : (
          <div className="space-y-1 text-sm">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity whitespace-nowrap overflow-x-auto group"
              >
                <span className="text-green-400/70">
                  [{formatDate(event.date)}]
                </span>
                <span className="text-green-300 group-hover:text-green-200 transition-colors">
                  {event.username}
                </span>
                <span className="text-green-400/70">committed in</span>
                <span className="text-green-300 group-hover:text-green-200 transition-colors">
                  [{event.repo}]
                </span>
                <a
                  href={event.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  #{event.commitHash}#
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="mt-2 text-green-400/50">
          <span className="animate-pulse">_</span>
        </div>
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjE1Ii8+PC9zdmc+')] opacity-20" />

      {/* Screen glow */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(51,255,51,0.15)]" />

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0,_rgba(0,0,0,0.4)_100%)] opacity-50" />
    </div>
  );
};

export default GitHubActivity;
