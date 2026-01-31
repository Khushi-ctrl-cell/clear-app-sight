import { motion } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface PrivacyScoreProps {
  score: number;
  totalApps: number;
  highRiskCount: number;
}

const PrivacyScore = ({ score, totalApps, highRiskCount }: PrivacyScoreProps) => {
  const getScoreColor = () => {
    if (score >= 7) return 'text-risk-safe';
    if (score >= 4) return 'text-risk-medium';
    return 'text-risk-critical';
  };

  const getScoreGlow = () => {
    if (score >= 7) return 'glow-safe';
    if (score >= 4) return 'glow-warning';
    return 'glow-danger';
  };

  const getScoreIcon = () => {
    if (score >= 7) return <ShieldCheck className="w-8 h-8" />;
    if (score >= 4) return <Shield className="w-8 h-8" />;
    return <ShieldAlert className="w-8 h-8" />;
  };

  const getScoreLabel = () => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    if (score >= 2) return 'Poor';
    return 'Critical';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 10) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`glass-card p-8 ${getScoreGlow()}`}
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Circular Score */}
        <div className="relative">
          <svg className="w-40 h-40 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <motion.circle
              cx="80"
              cy="80"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={getScoreColor()}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ strokeDasharray: circumference }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-4xl font-bold ${getScoreColor()}`}
            >
              {score}
            </motion.span>
            <span className="text-sm text-muted-foreground">/10</span>
          </div>
        </div>

        {/* Score Details */}
        <div className="flex-1 text-center md:text-left">
          <div className={`flex items-center justify-center md:justify-start gap-2 ${getScoreColor()} mb-2`}>
            {getScoreIcon()}
            <h2 className="text-2xl font-bold">Privacy Score: {getScoreLabel()}</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Your overall privacy health based on {totalApps} installed apps
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-foreground">{totalApps}</div>
              <div className="text-sm text-muted-foreground">Apps Analyzed</div>
            </div>
            <div className="glass-card p-4">
              <div className={`text-2xl font-bold ${highRiskCount > 0 ? 'text-risk-critical' : 'text-risk-safe'}`}>
                {highRiskCount}
              </div>
              <div className="text-sm text-muted-foreground">High Risk Apps</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyScore;
