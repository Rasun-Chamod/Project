interface StatCardProps {
  label: string;
  value: string;
  change: string;
}

const StatCard = ({ label, value, change }: StatCardProps) => (
  <div className="stat-card">
    <div>
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
    <span>{change}</span>
  </div>
);

export default StatCard;
