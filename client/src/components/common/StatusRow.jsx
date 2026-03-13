export default function StatusRow({ overdueCount, todayCount, incompleteCount, completedCount }) {
  const stats = [
    { count: todayCount, mobileLabel: 'Today', desktopPrefix: 'You have', desktopSuffix: 'tasks today', color: 'bg-babyOrange' },
    { count: overdueCount, mobileLabel: 'Overdue', desktopPrefix: 'You have', desktopSuffix: 'overdue', color: 'bg-babyPink' },
    { count: incompleteCount, mobileLabel: 'Incomplete', desktopPrefix: 'You have', desktopSuffix: 'tasks left', color: 'bg-babyPurple' },
    { count: completedCount, mobileLabel: 'Completed', desktopPrefix: 'Completed', desktopSuffix: 'tasks', color: 'bg-babyBlue' },
  ];

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 text-sm md:text-base">
      {stats.map((stat) => (
        <div
          key={stat.mobileLabel}
          className={`rounded-lg p-2 md:p-3 flex flex-col justify-center items-center ${stat.color} text-center`}
        >
          <span className="hidden md:inline">{stat.desktopPrefix}</span>
          <div className="text-2xl md:text-3xl font-semibold">
            {stat.count}
          </div>
          <span className="text-xs md:hidden">{stat.mobileLabel}</span>
          <span className="hidden md:inline text-base">{stat.desktopSuffix}</span>
        </div>
      ))}
    </div>
  );
}
