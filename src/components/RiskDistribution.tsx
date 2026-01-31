import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AppData } from '@/data/mockApps';

interface RiskDistributionProps {
  apps: AppData[];
}

const RiskDistribution = ({ apps }: RiskDistributionProps) => {
  const lowRisk = apps.filter((a) => a.riskScore <= 3).length;
  const mediumRisk = apps.filter((a) => a.riskScore > 3 && a.riskScore <= 6).length;
  const highRisk = apps.filter((a) => a.riskScore > 6).length;

  const data = [
    { name: 'Safe (1-3)', value: lowRisk, color: 'hsl(var(--risk-safe))' },
    { name: 'Moderate (4-6)', value: mediumRisk, color: 'hsl(var(--risk-medium))' },
    { name: 'High Risk (7-10)', value: highRisk, color: 'hsl(var(--risk-critical))' },
  ].filter((d) => d.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
      
      <div className="flex items-center gap-6">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-risk-safe" />
              <span className="text-sm text-muted-foreground">Safe</span>
            </div>
            <span className="font-semibold">{lowRisk}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-risk-medium" />
              <span className="text-sm text-muted-foreground">Moderate</span>
            </div>
            <span className="font-semibold">{mediumRisk}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-risk-critical" />
              <span className="text-sm text-muted-foreground">High Risk</span>
            </div>
            <span className="font-semibold">{highRisk}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RiskDistribution;
