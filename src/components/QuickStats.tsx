import { motion } from 'framer-motion';
import { MapPin, Camera, Mic, Users, FolderOpen } from 'lucide-react';
import { AppData } from '@/data/mockApps';

interface QuickStatsProps {
  apps: AppData[];
}

const QuickStats = ({ apps }: QuickStatsProps) => {
  const getPermissionStats = () => {
    const stats = {
      location: { count: 0, bgCount: 0, icon: MapPin },
      camera: { count: 0, bgCount: 0, icon: Camera },
      microphone: { count: 0, bgCount: 0, icon: Mic },
      contacts: { count: 0, bgCount: 0, icon: Users },
      files: { count: 0, bgCount: 0, icon: FolderOpen },
    };

    apps.forEach((app) => {
      app.permissions.forEach((perm) => {
        if (perm.type in stats) {
          const key = perm.type as keyof typeof stats;
          stats[key].count++;
          if (perm.backgroundAccess) {
            stats[key].bgCount++;
          }
        }
      });
    });

    return stats;
  };

  const stats = getPermissionStats();

  const statItems = [
    { key: 'location', label: 'Location', ...stats.location },
    { key: 'camera', label: 'Camera', ...stats.camera },
    { key: 'microphone', label: 'Microphone', ...stats.microphone },
    { key: 'contacts', label: 'Contacts', ...stats.contacts },
    { key: 'files', label: 'Files', ...stats.files },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Permission Overview</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          const hasBgAccess = item.bgCount > 0;

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`text-center p-4 rounded-xl ${
                hasBgAccess ? 'bg-risk-critical/10 border border-risk-critical/30' : 'bg-secondary'
              }`}
            >
              <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                hasBgAccess ? 'bg-risk-critical/20 text-risk-critical' : 'bg-primary/20 text-primary'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-foreground">{item.count}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
              {hasBgAccess && (
                <div className="text-xs text-risk-critical mt-1">
                  {item.bgCount} in background
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickStats;
