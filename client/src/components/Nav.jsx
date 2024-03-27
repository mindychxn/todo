export default function Nav() {
  const tabs = ['Today', 'Completed', 'All Tasks'];
  return (
    <div className="bg-white p-5 h-screen">
      {tabs.map((tab) => (
        <div>{tab}</div>
      ))}
    </div>
  );
}
