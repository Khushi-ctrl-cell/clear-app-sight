import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Camera, Mic, Users, FolderOpen, Image, Calendar, Heart } from 'lucide-react';
import { AppData, AppPermission } from '@/data/mockApps';

interface AppCardProps {
  app: AppData;
  index: number;
  onClick: () => void;
}

const permissionIcons: Record<AppPermission['type'], React.ReactNode> = {
  location: <MapPin className="w-4 h-4" />,
  camera: <Camera className="w-4 h-4" />,
  microphone: <Mic className="w-4 h-4" />,
  contacts: <Users className="w-4 h-4" />,
  files: <FolderOpen className="w-4 h-4" />,
  photos: <Image className="w-4 h-4" />,
  calendar: <Calendar className="w-4 h-4" />,
  health: <Heart className="w-4 h-4" />,
};

const AppCard = ({ app, index, onClick }: AppCardProps) => {
  const getRiskColor = () => {
    if (app.riskScore <= 3) return 'bg-risk-safe';
    if (app.riskScore <= 6) return 'bg-risk-medium';
    return 'bg-risk-critical';
  };

  const getRiskBadgeClass = () => {
    if (app.riskScore <= 3) return 'risk-badge-safe';
    if (app.riskScore <= 6) return 'risk-badge-warning';
    return 'risk-badge-danger';
  };

  const getRiskLabel = () => {
    if (app.riskScore <= 3) return 'Safe';
    if (app.riskScore <= 6) return 'Moderate';
    return 'High Risk';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="glass-card p-4 cursor-pointer hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-4">
        {/* App Icon */}
        <div className="text-4xl">{app.icon}</div>

        {/* App Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{app.name}</h3>
            <span className={`px-2 py-0.5 text-xs rounded-full ${getRiskBadgeClass()}`}>
              {getRiskLabel()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{app.category}</p>
          
          {/* Permission Icons */}
          <div className="flex items-center gap-2">
            {app.permissions.map((perm) => (
              <div
                key={perm.type}
                className={`p-1.5 rounded-md ${
                  perm.backgroundAccess
                    ? 'bg-risk-critical/20 text-risk-critical'
                    : 'bg-secondary text-muted-foreground'
                }`}
                title={`${perm.type}${perm.backgroundAccess ? ' (Background)' : ''}`}
              >
                {permissionIcons[perm.type]}
              </div>
            ))}
          </div>
        </div>

        {/* Risk Score */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-12 h-12 rounded-full ${getRiskColor()} flex items-center justify-center`}>
            <span className="text-lg font-bold text-background">{app.riskScore}</span>
          </div>
          <span className="text-xs text-muted-foreground">Risk</span>
        </div>

        {/* Chevron */}
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      {/* Suspicious Behaviors Preview */}
      {app.suspiciousBehaviors.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-risk-high text-sm">
            <span className="w-2 h-2 rounded-full bg-risk-high animate-pulse" />
            {app.suspiciousBehaviors[0]}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AppCard;
