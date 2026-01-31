import { motion } from 'framer-motion';
import { X, MapPin, Camera, Mic, Users, FolderOpen, Image, Calendar, Heart, AlertTriangle, CheckCircle2, Clock, Activity } from 'lucide-react';
import { AppData, AppPermission } from '@/data/mockApps';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AppDetailProps {
  app: AppData;
  onClose: () => void;
}

const permissionIcons: Record<AppPermission['type'], React.ReactNode> = {
  location: <MapPin className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
  microphone: <Mic className="w-5 h-5" />,
  contacts: <Users className="w-5 h-5" />,
  files: <FolderOpen className="w-5 h-5" />,
  photos: <Image className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
  health: <Heart className="w-5 h-5" />,
};

const permissionLabels: Record<AppPermission['type'], string> = {
  location: 'Location',
  camera: 'Camera',
  microphone: 'Microphone',
  contacts: 'Contacts',
  files: 'Files & Storage',
  photos: 'Photos',
  calendar: 'Calendar',
  health: 'Health Data',
};

const AppDetail = ({ app, onClose }: AppDetailProps) => {
  const getRiskColor = () => {
    if (app.riskScore <= 3) return 'text-risk-safe';
    if (app.riskScore <= 6) return 'text-risk-medium';
    return 'text-risk-critical';
  };

  const chartData = app.accessPatterns.map((pattern) => ({
    hour: `${pattern.hour}:00`,
    accesses: pattern.count,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm p-6 border-b border-border flex items-start justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{app.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{app.name}</h2>
              <p className="text-muted-foreground">{app.category}</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Last used: {app.lastUsed}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getRiskColor()}`}>{app.riskScore}</div>
              <div className="text-sm text-muted-foreground">Risk Score</div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Permissions Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Permissions & Access
            </h3>
            <div className="grid gap-3">
              {app.permissions.map((perm) => (
                <div
                  key={perm.type}
                  className={`glass-card p-4 ${
                    perm.backgroundAccess ? 'border-risk-high/50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        perm.backgroundAccess
                          ? 'bg-risk-critical/20 text-risk-critical'
                          : 'bg-secondary text-muted-foreground'
                      }`}>
                        {permissionIcons[perm.type]}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {permissionLabels[perm.type]}
                          {perm.backgroundAccess && (
                            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-risk-critical/20 text-risk-critical">
                              Background
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {perm.accessCount.toLocaleString()} accesses • Last: {perm.lastAccessed}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-risk-high border-risk-high/50 hover:bg-risk-high/10"
                    >
                      Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Access Pattern Chart */}
          <div>
            <h3 className="text-lg font-semibold mb-4">24-Hour Access Pattern</h3>
            <div className="glass-card p-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="accessGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="hour"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval={3}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accesses"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#accessGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Suspicious Behaviors */}
          {app.suspiciousBehaviors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-risk-high">
                <AlertTriangle className="w-5 h-5" />
                Suspicious Behaviors Detected
              </h3>
              <div className="space-y-2">
                {app.suspiciousBehaviors.map((behavior, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 border-risk-high/30 bg-risk-critical/5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-risk-critical mt-2 animate-pulse" />
                      <p className="text-foreground">{behavior}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
              <CheckCircle2 className="w-5 h-5" />
              AI Recommendations
            </h3>
            <div className="space-y-2">
              {app.recommendations.map((rec, index) => (
                <div key={index} className="glass-card p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <p className="text-foreground">{rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1" variant="destructive">
              Uninstall App
            </Button>
            <Button className="flex-1" variant="outline">
              Open App Settings
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppDetail;
