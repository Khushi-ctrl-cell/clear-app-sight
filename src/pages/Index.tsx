import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import PrivacyScore from '@/components/PrivacyScore';
import AppCard from '@/components/AppCard';
import AppDetail from '@/components/AppDetail';
import PrivacyAlerts from '@/components/PrivacyAlerts';
import SmartRecommendations from '@/components/SmartRecommendations';
import RiskDistribution from '@/components/RiskDistribution';
import QuickStats from '@/components/QuickStats';
import { mockApps, getOverallPrivacyScore, getHighRiskApps, AppData } from '@/data/mockApps';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [sortBy, setSortBy] = useState<'risk' | 'name' | 'recent'>('risk');

  const overallScore = getOverallPrivacyScore(mockApps);
  const highRiskApps = getHighRiskApps(mockApps);

  const sortedApps = [...mockApps].sort((a, b) => {
    switch (sortBy) {
      case 'risk':
        return b.riskScore - a.riskScore;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'recent':
        return 0; // Would normally sort by date
      default:
        return 0;
    }
  });

  const renderOverview = () => (
    <div className="space-y-6">
      <PrivacyScore
        score={overallScore}
        totalApps={mockApps.length}
        highRiskCount={highRiskApps.length}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <RiskDistribution apps={mockApps} />
        <QuickStats apps={mockApps} />
      </div>

      <PrivacyAlerts apps={mockApps} />

      {/* Quick App List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Apps Requiring Attention</h2>
        <div className="grid gap-3">
          {highRiskApps.slice(0, 3).map((app, index) => (
            <AppCard
              key={app.id}
              app={app}
              index={index}
              onClick={() => setSelectedApp(app)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderApps = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{mockApps.length} Installed Apps</h2>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-secondary text-foreground rounded-lg px-3 py-2 text-sm border border-border"
          >
            <option value="risk">Sort by Risk</option>
            <option value="name">Sort by Name</option>
            <option value="recent">Recently Used</option>
          </select>
        </div>
      </div>

      <div className="grid gap-3">
        {sortedApps.map((app, index) => (
          <AppCard
            key={app.id}
            app={app}
            index={index}
            onClick={() => setSelectedApp(app)}
          />
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'apps':
        return renderApps();
      case 'alerts':
        return <PrivacyAlerts apps={mockApps} />;
      case 'recommendations':
        return <SmartRecommendations apps={mockApps} />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="mb-6">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {renderContent()}
      </main>

      {/* App Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <AppDetail app={selectedApp} onClose={() => setSelectedApp(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
