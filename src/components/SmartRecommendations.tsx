import { motion } from 'framer-motion';
import { Sparkles, Lock, Eye, EyeOff, Smartphone, AlertCircle } from 'lucide-react';
import { AppData } from '@/data/mockApps';
import { Button } from '@/components/ui/button';

interface SmartRecommendationsProps {
  apps: AppData[];
}

interface Recommendation {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action: string;
  affectedApps: string[];
}

const SmartRecommendations = ({ apps }: SmartRecommendationsProps) => {
  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Find apps with background location
    const bgLocationApps = apps.filter((app) =>
      app.permissions.some((p) => p.type === 'location' && p.backgroundAccess)
    );
    if (bgLocationApps.length > 0) {
      recommendations.push({
        id: 'bg-location',
        icon: <Eye className="w-6 h-6" />,
        title: 'Disable Background Location',
        description: `${bgLocationApps.length} app${bgLocationApps.length > 1 ? 's are' : ' is'} tracking your location in the background. This drains battery and compromises privacy.`,
        impact: 'high',
        action: 'Fix Now',
        affectedApps: bgLocationApps.map((a) => a.icon),
      });
    }

    // Find apps with background microphone
    const bgMicApps = apps.filter((app) =>
      app.permissions.some((p) => p.type === 'microphone' && p.backgroundAccess)
    );
    if (bgMicApps.length > 0) {
      recommendations.push({
        id: 'bg-mic',
        icon: <EyeOff className="w-6 h-6" />,
        title: 'Stop Background Listening',
        description: `${bgMicApps.length} app${bgMicApps.length > 1 ? 's have' : ' has'} microphone access in the background. This is a serious privacy concern.`,
        impact: 'high',
        action: 'Revoke Access',
        affectedApps: bgMicApps.map((a) => a.icon),
      });
    }

    // Find high-risk apps
    const highRiskApps = apps.filter((a) => a.riskScore >= 8);
    if (highRiskApps.length > 0) {
      recommendations.push({
        id: 'high-risk',
        icon: <AlertCircle className="w-6 h-6" />,
        title: 'Review High-Risk Apps',
        description: `${highRiskApps.length} app${highRiskApps.length > 1 ? 's require' : ' requires'} immediate attention due to excessive data collection.`,
        impact: 'high',
        action: 'Review Apps',
        affectedApps: highRiskApps.map((a) => a.icon),
      });
    }

    // Unused permissions
    const unusedPerms = apps.filter((app) =>
      app.permissions.some((p) => p.accessCount < 10)
    );
    if (unusedPerms.length > 0) {
      recommendations.push({
        id: 'unused-perms',
        icon: <Lock className="w-6 h-6" />,
        title: 'Remove Unused Permissions',
        description: `Some apps have permissions they rarely use. Revoking these won't affect functionality.`,
        impact: 'medium',
        action: 'Clean Up',
        affectedApps: unusedPerms.slice(0, 4).map((a) => a.icon),
      });
    }

    // General recommendation
    recommendations.push({
      id: 'general',
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Enable Permission Notifications',
      description: 'Get notified when apps access sensitive data like camera or microphone.',
      impact: 'low',
      action: 'Enable',
      affectedApps: [],
    });

    return recommendations;
  };

  const recommendations = generateRecommendations();

  const getImpactStyles = (impact: Recommendation['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-risk-critical/20 text-risk-critical';
      case 'medium':
        return 'bg-risk-medium/20 text-risk-medium';
      case 'low':
        return 'bg-primary/20 text-primary';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-primary" />
        AI-Powered Recommendations
      </h2>

      <div className="grid gap-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${getImpactStyles(rec.impact)}`}>
                {rec.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{rec.title}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getImpactStyles(rec.impact)}`}>
                    {rec.impact === 'high' ? 'High Impact' : rec.impact === 'medium' ? 'Medium' : 'Optional'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                
                <div className="flex items-center justify-between">
                  {rec.affectedApps.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground mr-2">Affected:</span>
                      {rec.affectedApps.map((icon, i) => (
                        <span key={i} className="text-lg">{icon}</span>
                      ))}
                    </div>
                  )}
                  <Button size="sm" className="ml-auto">
                    {rec.action}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SmartRecommendations;
