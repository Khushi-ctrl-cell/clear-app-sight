export interface AppPermission {
  type: 'location' | 'camera' | 'microphone' | 'contacts' | 'files' | 'photos' | 'calendar' | 'health';
  granted: boolean;
  accessCount: number;
  lastAccessed: string;
  backgroundAccess: boolean;
}

export interface AccessPattern {
  hour: number;
  count: number;
}

export interface AppData {
  id: string;
  name: string;
  icon: string;
  category: string;
  riskScore: number;
  permissions: AppPermission[];
  accessPatterns: AccessPattern[];
  suspiciousBehaviors: string[];
  recommendations: string[];
  installDate: string;
  lastUsed: string;
}

export const mockApps: AppData[] = [
  {
    id: '1',
    name: 'SocialConnect',
    icon: '📱',
    category: 'Social',
    riskScore: 8,
    permissions: [
      { type: 'location', granted: true, accessCount: 847, lastAccessed: '2 min ago', backgroundAccess: true },
      { type: 'camera', granted: true, accessCount: 234, lastAccessed: '1 hour ago', backgroundAccess: false },
      { type: 'microphone', granted: true, accessCount: 156, lastAccessed: '3 hours ago', backgroundAccess: true },
      { type: 'contacts', granted: true, accessCount: 45, lastAccessed: 'Yesterday', backgroundAccess: false },
      { type: 'photos', granted: true, accessCount: 1203, lastAccessed: '30 min ago', backgroundAccess: false },
    ],
    accessPatterns: [
      { hour: 0, count: 12 }, { hour: 1, count: 8 }, { hour: 2, count: 15 }, { hour: 3, count: 22 },
      { hour: 4, count: 5 }, { hour: 5, count: 3 }, { hour: 6, count: 18 }, { hour: 7, count: 45 },
      { hour: 8, count: 67 }, { hour: 9, count: 89 }, { hour: 10, count: 78 }, { hour: 11, count: 92 },
      { hour: 12, count: 110 }, { hour: 13, count: 95 }, { hour: 14, count: 88 }, { hour: 15, count: 102 },
      { hour: 16, count: 115 }, { hour: 17, count: 98 }, { hour: 18, count: 120 }, { hour: 19, count: 135 },
      { hour: 20, count: 128 }, { hour: 21, count: 95 }, { hour: 22, count: 65 }, { hour: 23, count: 35 },
    ],
    suspiciousBehaviors: [
      'Accessing location 847 times in background',
      'Microphone access detected at 3 AM',
      'Reading contacts list without visible reason',
    ],
    recommendations: [
      'Revoke background location access',
      'Disable microphone when not in use',
      'Review why contacts are needed',
    ],
    installDate: '2024-01-15',
    lastUsed: '2 min ago',
  },
  {
    id: '2',
    name: 'WeatherPro',
    icon: '🌤️',
    category: 'Weather',
    riskScore: 6,
    permissions: [
      { type: 'location', granted: true, accessCount: 2340, lastAccessed: '5 min ago', backgroundAccess: true },
    ],
    accessPatterns: [
      { hour: 0, count: 45 }, { hour: 1, count: 42 }, { hour: 2, count: 48 }, { hour: 3, count: 51 },
      { hour: 4, count: 47 }, { hour: 5, count: 52 }, { hour: 6, count: 89 }, { hour: 7, count: 120 },
      { hour: 8, count: 95 }, { hour: 9, count: 78 }, { hour: 10, count: 65 }, { hour: 11, count: 58 },
      { hour: 12, count: 72 }, { hour: 13, count: 68 }, { hour: 14, count: 61 }, { hour: 15, count: 55 },
      { hour: 16, count: 63 }, { hour: 17, count: 85 }, { hour: 18, count: 92 }, { hour: 19, count: 78 },
      { hour: 20, count: 65 }, { hour: 21, count: 58 }, { hour: 22, count: 52 }, { hour: 23, count: 48 },
    ],
    suspiciousBehaviors: [
      'Excessive location polling (every 15 seconds)',
      'Location accessed 2,340 times this week',
    ],
    recommendations: [
      'Switch to "While Using" location access',
      'Consider alternative weather apps with less tracking',
    ],
    installDate: '2023-06-22',
    lastUsed: '5 min ago',
  },
  {
    id: '3',
    name: 'PhotoVault',
    icon: '📸',
    category: 'Photography',
    riskScore: 3,
    permissions: [
      { type: 'photos', granted: true, accessCount: 89, lastAccessed: 'Yesterday', backgroundAccess: false },
      { type: 'camera', granted: true, accessCount: 12, lastAccessed: '3 days ago', backgroundAccess: false },
    ],
    accessPatterns: [
      { hour: 0, count: 0 }, { hour: 1, count: 0 }, { hour: 2, count: 0 }, { hour: 3, count: 0 },
      { hour: 4, count: 0 }, { hour: 5, count: 0 }, { hour: 6, count: 2 }, { hour: 7, count: 5 },
      { hour: 8, count: 8 }, { hour: 9, count: 12 }, { hour: 10, count: 15 }, { hour: 11, count: 10 },
      { hour: 12, count: 8 }, { hour: 13, count: 6 }, { hour: 14, count: 9 }, { hour: 15, count: 11 },
      { hour: 16, count: 7 }, { hour: 17, count: 5 }, { hour: 18, count: 4 }, { hour: 19, count: 3 },
      { hour: 20, count: 2 }, { hour: 21, count: 1 }, { hour: 22, count: 0 }, { hour: 23, count: 0 },
    ],
    suspiciousBehaviors: [],
    recommendations: [
      'This app follows best practices',
      'No action needed',
    ],
    installDate: '2024-03-10',
    lastUsed: 'Yesterday',
  },
  {
    id: '4',
    name: 'FitTracker',
    icon: '💪',
    category: 'Health & Fitness',
    riskScore: 5,
    permissions: [
      { type: 'location', granted: true, accessCount: 156, lastAccessed: '1 hour ago', backgroundAccess: true },
      { type: 'health', granted: true, accessCount: 890, lastAccessed: '10 min ago', backgroundAccess: true },
    ],
    accessPatterns: [
      { hour: 0, count: 5 }, { hour: 1, count: 5 }, { hour: 2, count: 5 }, { hour: 3, count: 5 },
      { hour: 4, count: 5 }, { hour: 5, count: 15 }, { hour: 6, count: 45 }, { hour: 7, count: 35 },
      { hour: 8, count: 20 }, { hour: 9, count: 15 }, { hour: 10, count: 12 }, { hour: 11, count: 10 },
      { hour: 12, count: 25 }, { hour: 13, count: 18 }, { hour: 14, count: 12 }, { hour: 15, count: 10 },
      { hour: 16, count: 15 }, { hour: 17, count: 35 }, { hour: 18, count: 42 }, { hour: 19, count: 38 },
      { hour: 20, count: 25 }, { hour: 21, count: 15 }, { hour: 22, count: 8 }, { hour: 23, count: 5 },
    ],
    suspiciousBehaviors: [
      'Health data synced to third-party servers',
    ],
    recommendations: [
      'Review data sharing settings',
      'Disable third-party integrations if not needed',
    ],
    installDate: '2024-02-28',
    lastUsed: '10 min ago',
  },
  {
    id: '5',
    name: 'QuickNotes',
    icon: '📝',
    category: 'Productivity',
    riskScore: 1,
    permissions: [
      { type: 'files', granted: true, accessCount: 23, lastAccessed: '2 days ago', backgroundAccess: false },
    ],
    accessPatterns: [
      { hour: 0, count: 0 }, { hour: 1, count: 0 }, { hour: 2, count: 0 }, { hour: 3, count: 0 },
      { hour: 4, count: 0 }, { hour: 5, count: 0 }, { hour: 6, count: 0 }, { hour: 7, count: 1 },
      { hour: 8, count: 3 }, { hour: 9, count: 5 }, { hour: 10, count: 4 }, { hour: 11, count: 3 },
      { hour: 12, count: 2 }, { hour: 13, count: 2 }, { hour: 14, count: 3 }, { hour: 15, count: 2 },
      { hour: 16, count: 1 }, { hour: 17, count: 1 }, { hour: 18, count: 0 }, { hour: 19, count: 0 },
      { hour: 20, count: 0 }, { hour: 21, count: 0 }, { hour: 22, count: 0 }, { hour: 23, count: 0 },
    ],
    suspiciousBehaviors: [],
    recommendations: [
      'Excellent privacy practices',
      'This app is safe to use',
    ],
    installDate: '2023-11-05',
    lastUsed: '2 days ago',
  },
  {
    id: '6',
    name: 'VoiceAssist',
    icon: '🎙️',
    category: 'Utilities',
    riskScore: 9,
    permissions: [
      { type: 'microphone', granted: true, accessCount: 3420, lastAccessed: '1 min ago', backgroundAccess: true },
      { type: 'contacts', granted: true, accessCount: 234, lastAccessed: '1 hour ago', backgroundAccess: false },
      { type: 'calendar', granted: true, accessCount: 156, lastAccessed: '2 hours ago', backgroundAccess: false },
      { type: 'location', granted: true, accessCount: 567, lastAccessed: '5 min ago', backgroundAccess: true },
    ],
    accessPatterns: [
      { hour: 0, count: 45 }, { hour: 1, count: 38 }, { hour: 2, count: 42 }, { hour: 3, count: 55 },
      { hour: 4, count: 35 }, { hour: 5, count: 28 }, { hour: 6, count: 85 }, { hour: 7, count: 145 },
      { hour: 8, count: 178 }, { hour: 9, count: 195 }, { hour: 10, count: 167 }, { hour: 11, count: 145 },
      { hour: 12, count: 189 }, { hour: 13, count: 156 }, { hour: 14, count: 134 }, { hour: 15, count: 145 },
      { hour: 16, count: 167 }, { hour: 17, count: 189 }, { hour: 18, count: 198 }, { hour: 19, count: 178 },
      { hour: 20, count: 156 }, { hour: 21, count: 123 }, { hour: 22, count: 89 }, { hour: 23, count: 67 },
    ],
    suspiciousBehaviors: [
      'Microphone constantly listening in background',
      'Unusual activity spike at 3-4 AM',
      'Accessing calendar without user interaction',
      'Location tracked even when app is closed',
    ],
    recommendations: [
      'URGENT: Revoke microphone background access',
      'Disable location tracking',
      'Review if calendar access is necessary',
      'Consider uninstalling this app',
    ],
    installDate: '2024-04-01',
    lastUsed: '1 min ago',
  },
  {
    id: '7',
    name: 'BankSecure',
    icon: '🏦',
    category: 'Finance',
    riskScore: 2,
    permissions: [
      { type: 'camera', granted: true, accessCount: 5, lastAccessed: '1 week ago', backgroundAccess: false },
    ],
    accessPatterns: [
      { hour: 0, count: 0 }, { hour: 1, count: 0 }, { hour: 2, count: 0 }, { hour: 3, count: 0 },
      { hour: 4, count: 0 }, { hour: 5, count: 0 }, { hour: 6, count: 0 }, { hour: 7, count: 0 },
      { hour: 8, count: 1 }, { hour: 9, count: 2 }, { hour: 10, count: 1 }, { hour: 11, count: 1 },
      { hour: 12, count: 0 }, { hour: 13, count: 1 }, { hour: 14, count: 0 }, { hour: 15, count: 0 },
      { hour: 16, count: 0 }, { hour: 17, count: 0 }, { hour: 18, count: 0 }, { hour: 19, count: 0 },
      { hour: 20, count: 0 }, { hour: 21, count: 0 }, { hour: 22, count: 0 }, { hour: 23, count: 0 },
    ],
    suspiciousBehaviors: [],
    recommendations: [
      'Camera only used for check deposits',
      'This app follows security best practices',
    ],
    installDate: '2023-08-15',
    lastUsed: '1 week ago',
  },
  {
    id: '8',
    name: 'GameZone',
    icon: '🎮',
    category: 'Games',
    riskScore: 7,
    permissions: [
      { type: 'microphone', granted: true, accessCount: 456, lastAccessed: '30 min ago', backgroundAccess: false },
      { type: 'contacts', granted: true, accessCount: 89, lastAccessed: '1 day ago', backgroundAccess: false },
      { type: 'files', granted: true, accessCount: 234, lastAccessed: '2 hours ago', backgroundAccess: false },
    ],
    accessPatterns: [
      { hour: 0, count: 25 }, { hour: 1, count: 18 }, { hour: 2, count: 12 }, { hour: 3, count: 8 },
      { hour: 4, count: 5 }, { hour: 5, count: 3 }, { hour: 6, count: 8 }, { hour: 7, count: 15 },
      { hour: 8, count: 22 }, { hour: 9, count: 28 }, { hour: 10, count: 35 }, { hour: 11, count: 42 },
      { hour: 12, count: 55 }, { hour: 13, count: 48 }, { hour: 14, count: 52 }, { hour: 15, count: 58 },
      { hour: 16, count: 72 }, { hour: 17, count: 85 }, { hour: 18, count: 95 }, { hour: 19, count: 110 },
      { hour: 20, count: 125 }, { hour: 21, count: 115 }, { hour: 22, count: 85 }, { hour: 23, count: 55 },
    ],
    suspiciousBehaviors: [
      'Why does a game need contacts access?',
      'File access seems excessive for a game',
    ],
    recommendations: [
      'Revoke contacts permission',
      'Limit file access to game saves only',
    ],
    installDate: '2024-05-20',
    lastUsed: '30 min ago',
  },
];

export const getOverallPrivacyScore = (apps: AppData[]): number => {
  const totalRisk = apps.reduce((sum, app) => sum + app.riskScore, 0);
  const avgRisk = totalRisk / apps.length;
  return Math.round(10 - avgRisk);
};

export const getHighRiskApps = (apps: AppData[]): AppData[] => {
  return apps.filter(app => app.riskScore >= 7);
};

export const getMediumRiskApps = (apps: AppData[]): AppData[] => {
  return apps.filter(app => app.riskScore >= 4 && app.riskScore < 7);
};

export const getLowRiskApps = (apps: AppData[]): AppData[] => {
  return apps.filter(app => app.riskScore < 4);
};
