import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

interface ContributionDay {
    contributionCount: number;
    date: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionData {
    totalContributions: number;
    weeks: ContributionWeek[];
}

const GitHubContributionGraph = () => {
    const [contributionData, setContributionData] = useState<ContributionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const weekdays = ['Mon', 'Wed', 'Fri'];

    useEffect(() => {
        fetchContributions();
    }, []);

    const fetchContributions = async () => {
        try {
            const query = `
        query($userName:String!) { 
          user(login: $userName){
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

            const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API}`,
                },
                body: JSON.stringify({
                    query,
                    variables: { userName: 'bucurdavid' },
                }),
            });

            const data = await response.json();
            setContributionData(data.data.user.contributionsCollection.contributionCalendar);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch contribution data');
            setLoading(false);
        }
    };

    const getContributionColor = (count: number) => {
        if (count === 0) return 'bg-green-950/30';
        if (count <= 3) return 'bg-green-800/50';
        if (count <= 6) return 'bg-green-600/50';
        if (count <= 9) return 'bg-green-500/60';
        return 'bg-green-400/70';
    };

    const getLastMonthData = (weeks: ContributionWeek[]) => {
        const lastFourWeeks = weeks.slice(-5); // Get slightly more than 4 weeks to ensure we cover a full month
        return lastFourWeeks;
    };

    return (
        <div className="relative w-full bg-black text-green-400 p-2 font-mono rounded-lg overflow-hidden">
            {/* Base CRT effect with subtle texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0,_rgba(0,0,0,0.2)_100%)] opacity-50" />

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px]" />

            {/* RGB pixel effect */}
            <div className="absolute inset-0 pointer-events-none bg-[repeating-conic-gradient(rgba(255,0,0,0.03)_0deg_120deg,rgba(0,255,0,0.03)_120deg_240deg,rgba(0,0,255,0.03)_240deg_360deg)] bg-[length:2px_2px]" />

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 border-b border-green-400/30 pb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">$ contributions</span>
                        {loading && <Loader className="w-4 h-4 animate-spin" />}
                    </div>
                    {contributionData && (
                        <span className="text-green-400/70 text-sm">
                            <span className="hidden md:inline">
                                {contributionData.totalContributions} contributions in the last year
                            </span>
                            <span className="md:hidden">Last 30 days</span>
                        </span>
                    )}
                </div>

                {error ? (
                    <div className="text-red-400 text-sm">{error}</div>
                ) : loading ? (
                    <div className="space-y-2">
                        <div className="animate-pulse bg-green-400/10 h-32 rounded" />
                    </div>
                ) : (
                    contributionData && (
                        <div className="relative">
                            {/* Months */}
                            <div className="hidden md:flex justify-between mb-2 text-xs text-green-400/50">
                                {months.map(month => (
                                    <span key={month}>{month}</span>
                                ))}
                            </div>

                            {/* Graph */}
                            <div className="flex gap-1">
                                {/* Weekdays */}
                                <div className="flex flex-col justify-between text-xs text-green-400/50 pr-2">
                                    {weekdays.map(day => (
                                        <span key={day}>{day}</span>
                                    ))}
                                </div>

                                {/* Contribution grid */}
                                <div className="flex gap-1 flex-1">
                                    {/* Desktop view */}
                                    <div className="hidden md:flex gap-1">
                                        {contributionData.weeks.map((week, weekIndex) => (
                                            <div key={weekIndex} className="flex flex-col gap-1">
                                                {week.contributionDays.map((day, dayIndex) => (
                                                    <div
                                                        key={`${weekIndex}-${dayIndex}`}
                                                        className={`w-3 h-3 rounded-sm ${getContributionColor(
                                                            day.contributionCount,
                                                        )} 
                            hover:ring-1 hover:ring-green-400/50 transition-all duration-200
                            group relative`}
                                                    >
                                                        <div
                                                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                              bg-green-900/90 text-green-200 text-xs rounded opacity-0 group-hover:opacity-100 
                              transition-opacity whitespace-nowrap pointer-events-none"
                                                        >
                                                            {day.contributionCount} contributions on{' '}
                                                            {new Date(
                                                                day.date,
                                                            ).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mobile view */}
                                    <div className="flex md:hidden gap-1">
                                        {getLastMonthData(contributionData.weeks).map(
                                            (week, weekIndex) => (
                                                <div
                                                    key={weekIndex}
                                                    className="flex flex-col gap-1"
                                                >
                                                    {week.contributionDays.map((day, dayIndex) => (
                                                        <div
                                                            key={`${weekIndex}-${dayIndex}`}
                                                            className={`w-3 h-3 rounded-sm ${getContributionColor(
                                                                day.contributionCount,
                                                            )} 
                            hover:ring-1 hover:ring-green-400/50 transition-all duration-200
                            group relative`}
                                                        >
                                                            <div
                                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                              bg-green-900/90 text-green-200 text-xs rounded opacity-0 group-hover:opacity-100 
                              transition-opacity whitespace-nowrap pointer-events-none"
                                                            >
                                                                {day.contributionCount}{' '}
                                                                contributions on{' '}
                                                                {new Date(
                                                                    day.date,
                                                                ).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-2 mt-4 text-xs text-green-400/50">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-sm bg-green-950/30" />
                                    <div className="w-3 h-3 rounded-sm bg-green-800/50" />
                                    <div className="w-3 h-3 rounded-sm bg-green-600/50" />
                                    <div className="w-3 h-3 rounded-sm bg-green-500/60" />
                                    <div className="w-3 h-3 rounded-sm bg-green-400/70" />
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    )
                )}

                <div className="mt-2 text-green-400/50">
                    <span className="animate-pulse">_</span>
                </div>
            </div>

            {/* Screen glow */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(51,255,51,0.15)]" />

            {/* Vignette effect */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0,_rgba(0,0,0,0.4)_100%)] opacity-50" />
        </div>
    );
};

export default GitHubContributionGraph;
