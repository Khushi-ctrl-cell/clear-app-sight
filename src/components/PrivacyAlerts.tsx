import { motion } from 'framer-motion';
import { AlertTriangle, Bell, Shield, X } from 'lucide-react';
import { AppData } from '@/data/mockApps';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface PrivacyAlertsProps {
  apps: AppData[];
  onAppSelect?: (app: AppData) => void;
}

interface Alert {
  id: string;
  appName: string;
  appIcon: string;
  appId: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
}

const PrivacyAlerts = ({ apps, onAppSelect }: PrivacyAlertsProps) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  // Generate alerts from app data
  const generateAlerts = (): Alert[] => {
    const alerts: Alert[] = [];

    apps.forEach((app) => {
      if (app.riskScore >= 8) {
        alerts.push({
          id: `${app.id}-critical`,
          appName: app.name,
          appIcon: app.icon,
          appId: app.id,
          severity: 'high',
          title: `Critical Privacy Risk Detected`,
          description: `${app.name} has an extremely high risk score (${app.riskScore}/10). ${app.suspiciousBehaviors[0] || 'Multiple permissions are being misused.'}`,
          action: 'Review permissions immediately',
        });
      }

      app.permissions.forEach((perm) => {
        if (perm.backgroundAccess && perm.accessCount > 500) {
          alerts.push({
            id: `${app.id}-${perm.type}-bg`,
            appName: app.name,
            appIcon: app.icon,
            appId: app.id,
            severity: 'high',
            title: `${perm.type.charAt(0).toUpperCase() + perm.type.slice(1)} accessed ${perm.accessCount.toLocaleString()} times`,
            description: `${app.name} is accessing your ${perm.type} in the background excessively. This may drain battery and compromise privacy.`,
            action: 'Revoke background access',
          });
        }
      });

      // Check for odd-hour activity
      const nightActivity = app.accessPatterns
        .filter((p) => p.hour >= 1 && p.hour <= 5)
        .reduce((sum, p) => sum + p.count, 0);
      
      if (nightActivity > 100) {
        alerts.push({
          id: `${app.id}-night`,
          appName: app.name,
          appIcon: app.icon,
          appId: app.id,
          severity: 'medium',
          title: 'Unusual nighttime activity',
          description: `${app.name} accessed your data ${nightActivity} times between 1 AM - 5 AM. This could indicate background data collection.`,
          action: 'Monitor this app',
        });
      }
    });

    return alerts.filter((alert) => !dismissedAlerts.includes(alert.id));
  };

  const handleAction = (alert: Alert) => {
    const app = apps.find(a => a.id === alert.appId);
    if (app && onAppSelect) {
      onAppSelect(app);
    }
    toast.success(`Opening ${alert.appName} details`, {
      description: 'Review and manage permissions for this app',
    });
  };

  const alerts = generateAlerts();

  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-risk-critical/50 bg-risk-critical/5';
      case 'medium':
        return 'border-risk-medium/50 bg-risk-medium/5';
      case 'low':
        return 'border-risk-low/50 bg-risk-low/5';
    }
  };

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-risk-critical" />;
      case 'medium':
        return <Bell className="w-5 h-5 text-risk-medium" />;
      case 'low':
        return <Shield className="w-5 h-5 text-risk-low" />;
    }
  };

  const dismissAlert = (id: string) => {
    setDismissedAlerts((prev) => [...prev, id]);
  };

  if (alerts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <Shield className="w-16 h-16 text-risk-safe mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">All Clear!</h3>
        <p className="text-muted-foreground">No privacy alerts at this time. Keep monitoring!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-risk-high" />
          Privacy Alerts
          <span className="px-2 py-0.5 text-sm rounded-full bg-risk-critical/20 text-risk-critical">
            {alerts.length}
          </span>
        </h2>
      </div>

      <div className="space-y-3">
        {alerts.slice(0, 5).map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-4 ${getSeverityStyles(alert.severity)}`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{alert.appIcon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getSeverityIcon(alert.severity)}
                  <h3 className="font-semibold text-foreground">{alert.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => handleAction(alert)}
                  >
                    {alert.action}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      dismissAlert(alert.id);
                      toast.info('Alert dismissed', {
                        description: `You can still find ${alert.appName} in the Apps tab`,
                      });
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="p-1 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyAlerts;
