import { motion } from 'framer-motion';
import { Shield, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface HeaderProps {
  onAlertClick?: () => void;
  alertCount?: number;
}

const Header = ({ onAlertClick, alertCount = 3 }: HeaderProps) => {
  const [settings, setSettings] = useState({
    notifications: true,
    backgroundMonitoring: true,
    weeklyReports: false,
    autoRevoke: false,
  });

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
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onAlertClick}
            >
              <Bell className="w-5 h-5" />
              {alertCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-risk-critical text-[10px] flex items-center justify-center text-foreground">
                  {alertCount}
                </span>
              )}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Privacy Settings</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications" className="flex flex-col gap-1">
                      <span>Push Notifications</span>
                      <span className="text-xs text-muted-foreground">Get alerts for suspicious activity</span>
                    </Label>
                    <Switch 
                      id="notifications" 
                      checked={settings.notifications}
                      onCheckedChange={(checked) => setSettings(s => ({ ...s, notifications: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="background" className="flex flex-col gap-1">
                      <span>Background Monitoring</span>
                      <span className="text-xs text-muted-foreground">Continuously monitor app behavior</span>
                    </Label>
                    <Switch 
                      id="background" 
                      checked={settings.backgroundMonitoring}
                      onCheckedChange={(checked) => setSettings(s => ({ ...s, backgroundMonitoring: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reports" className="flex flex-col gap-1">
                      <span>Weekly Reports</span>
                      <span className="text-xs text-muted-foreground">Receive privacy summary emails</span>
                    </Label>
                    <Switch 
                      id="reports" 
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked) => setSettings(s => ({ ...s, weeklyReports: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoRevoke" className="flex flex-col gap-1">
                      <span>Auto-Revoke Unused</span>
                      <span className="text-xs text-muted-foreground">Automatically revoke unused permissions</span>
                    </Label>
                    <Switch 
                      id="autoRevoke" 
                      checked={settings.autoRevoke}
                      onCheckedChange={(checked) => setSettings(s => ({ ...s, autoRevoke: checked }))}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
