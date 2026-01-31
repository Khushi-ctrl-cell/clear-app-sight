import { motion } from 'framer-motion';
import { Shield, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20 glow-primary">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Privacy Dashboard</h1>
              <p className="text-xs text-muted-foreground">for Humans</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-risk-critical text-[10px] flex items-center justify-center text-foreground">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
