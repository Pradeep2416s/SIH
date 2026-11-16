import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ml';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'header.title': 'Fault Management System',
    'header.subtitle': 'Real-Time Monitoring',
    'header.consumerPortal': 'Consumer Portal',
    'header.adminDashboard': 'Admin Dashboard',
    'header.backToHome': 'Back to Home',
    'header.back': 'Back',
    'header.adminTitle': 'Admin Dashboard',
    'header.adminSubtitle': 'Fault Management System',
    'header.consumerTitle': 'Consumer Portal',
    'header.consumerSubtitle': 'Fault Management System',
    
    // Landing Page
    'landing.hero.title': 'Real-Time Electrical Fault Management',
    'landing.hero.description': 'Advanced electrical fault monitoring. Report issues, track repairs, and ensure electrical safety across Kerala.',
    'landing.stats.issuesResolved': 'Issues Resolved',
    'landing.stats.responseTime': 'Avg Response Time',
    'landing.stats.activeAlerts': 'Active Alerts',
    'landing.stats.systemUptime': 'System Uptime',
    'landing.features.title': 'System Features',
    'landing.features.description': 'Comprehensive tools for electrical fault monitoring, consumer service, and real-time alerts',
    'landing.features.consumerPortal.title': 'Consumer Portal',
    'landing.features.consumerPortal.description': 'Report electrical issues, track complaint status, and access safety guidelines',
    'landing.features.consumerPortal.action': 'Access Portal →',
    'landing.features.liveMonitoring.title': 'Live Monitoring',
    'landing.features.liveMonitoring.description': 'Real-time district-wise fault tracking with interactive Kerala map visualization',
    'landing.features.liveMonitoring.action': 'View Dashboard →',
    'landing.features.alertManagement.title': 'Alert Management',
    'landing.features.alertManagement.description': 'Configure thresholds, manage notifications, and track response times',
    'landing.features.alertManagement.action': 'Manage Alerts →',
    'landing.safety.title': 'Electrical Safety Guidelines',
    'landing.safety.emergency.title': '⚠️ Emergency Procedures',
    'landing.safety.emergency.line1': '• Never touch fallen power lines',
    'landing.safety.emergency.line2': '• Keep away from water near electrical equipment',
    'landing.safety.emergency.line3': '• Call emergency services immediately',
    'landing.safety.emergency.line4': '• Evacuate area if gas smell is detected',
    'landing.safety.prevention.title': '✓ Prevention Tips',
    'landing.safety.prevention.line1': '• Regular electrical system maintenance',
    'landing.safety.prevention.line2': '• Use proper voltage stabilizers',
    'landing.safety.prevention.line3': '• Avoid overloading circuits',
    'landing.safety.prevention.line4': '• Install circuit breakers and ELCB',
    'landing.safety.contact.title': 'Emergency Contact Numbers',
    'landing.safety.contact.ksebl': 'Emergency Helpline',
    'landing.safety.contact.fire': 'Fire & Rescue',
    'landing.safety.contact.police': 'Police',
    'landing.footer.companyName': 'Fault Management System',
    'landing.footer.quickLinks': 'Quick Links',
    'landing.footer.consumerPortal': 'Consumer Portal',
    'landing.footer.adminDashboard': 'Admin Dashboard',
    'landing.footer.about': 'About Fault Management System',
    'landing.footer.contact': 'Contact Us',
    'landing.footer.followUs': 'Follow Us',
    'landing.footer.copyright': '© 2024 Fault Management System. All rights reserved.',
    
    // Tabs
    'tabs.liveMonitoring': 'Live Monitoring',
    'tabs.analytics': 'Analytics',
    'tabs.reports': 'Reports',
    'tabs.alerts': 'Alerts',
    'tabs.reportIssue': 'Report Issue',
    'tabs.trackStatus': 'Track Status',
    'tabs.safetyInfo': 'Safety Info',
    
    // Live Monitoring Tab
    'liveMonitoring.district': 'District',
    'liveMonitoring.select': 'Select',
    'liveMonitoring.totalPoles': 'Total Poles',
    'liveMonitoring.normalPoles': 'Normal Poles',
    'liveMonitoring.faultyPoles': 'Faulty Poles',
    'liveMonitoring.activeFaults': 'Active Faults',
    'liveMonitoring.poleStatus': 'Pole Status',
    'liveMonitoring.selectPole': 'Select Pole',
    'liveMonitoring.phaseStatus': 'Phase Status',
    'liveMonitoring.networkTopology': 'Network Topology',
    'liveMonitoring.mainline': 'Mainline',
    'liveMonitoring.phase': 'Phase',
    'liveMonitoring.inputVoltage': 'Input Voltage',
    'liveMonitoring.outputVoltage': 'Output Voltage',
    'liveMonitoring.inputCurrent': 'Input Current',
    'liveMonitoring.outputCurrent': 'Output Current',
    'liveMonitoring.status': 'Status',
    'liveMonitoring.lastUpdate': 'Last Update',
    'liveMonitoring.operational': 'Operational',
    'liveMonitoring.fault': 'Fault',
    'liveMonitoring.breakage': 'Breakage',
    'liveMonitoring.noMains': 'No Mains',
    'liveMonitoring.unknown': 'Unknown',
    'liveMonitoring.keralaFaultMap': 'Kerala Fault Map',
    'liveMonitoring.faultAlert': 'Fault Alert',
    'liveMonitoring.faultAlertMessage': 'detected. Immediate attention required.',
    'liveMonitoring.acknowledge': 'Acknowledge',
    'liveMonitoring.activeFaultsTitle': 'Active Faults',
    'liveMonitoring.activeFaultsDescription': 'The following components have reported faults:',
    'liveMonitoring.phaseTitle': 'Phase',
    'liveMonitoring.realtimeSensorFeed': 'Realtime sensor feed from',
    'liveMonitoring.streetBranchesNetwork': 'Street branches network',
    'liveMonitoring.poleDetails': 'Pole Details',
    'liveMonitoring.clickToView': 'Click on a pole to view details',
    'liveMonitoring.pole': 'Pole',
    'liveMonitoring.street': 'Street',
  },
  ml: {
    // Header
    'header.title': 'Fault Management System',
    'header.subtitle': 'തത്സമയ നിരീക്ഷണം',
    'header.consumerPortal': 'ഉപഭോക്തൃ പോർട്ടൽ',
    'header.adminDashboard': 'അഡ്മിൻ ഡാഷ്ബോർഡ്',
    'header.backToHome': 'ഹോമിലേക്ക് മടങ്ങുക',
    'header.back': 'മടങ്ങുക',
    'header.adminTitle': 'അഡ്മിൻ ഡാഷ്ബോർഡ്',
    'header.adminSubtitle': 'Fault Management System',
    'header.consumerTitle': 'ഉപഭോക്തൃ പോർട്ടൽ',
    'header.consumerSubtitle': 'Fault Management System',
    
    // Landing Page
    'landing.hero.title': 'തത്സമയ വൈദ്യുത തകരാർ മാനേജ്മെന്റ്',
    'landing.hero.description': 'നൂതന വൈദ്യുത തകരാർ നിരീക്ഷണ സംവിധാനം. പ്രശ്നങ്ങൾ റിപ്പോർട്ട് ചെയ്യുക, അറ്റകുറ്റപ്പണികൾ ട്രാക്ക് ചെയ്യുക, കേരളത്തിലുടനീളം വൈദ്യുത സുരക്ഷ ഉറപ്പാക്കുക.',
    'landing.stats.issuesResolved': 'പരിഹരിച്ച പ്രശ്നങ്ങൾ',
    'landing.stats.responseTime': 'ശരാശരി പ്രതികരണ സമയം',
    'landing.stats.activeAlerts': 'സജീവ അലേർട്ടുകൾ',
    'landing.stats.systemUptime': 'സിസ്റ്റം അപ്‌ടൈം',
    'landing.features.title': 'സിസ്റ്റം സവിശേഷതകൾ',
    'landing.features.description': 'വൈദ്യുത തകരാർ നിരീക്ഷണം, ഉപഭോക്തൃ സേവനം, തത്സമയ അലേർട്ടുകൾക്കുള്ള സമഗ്ര ഉപകരണങ്ങൾ',
    'landing.features.consumerPortal.title': 'ഉപഭോക്തൃ പോർട്ടൽ',
    'landing.features.consumerPortal.description': 'വൈദ്യുത പ്രശ്നങ്ങൾ റിപ്പോർട്ട് ചെയ്യുക, പരാതി സ്ഥിതി ട്രാക്ക് ചെയ്യുക, സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ ആക്‌സസ് ചെയ്യുക',
    'landing.features.consumerPortal.action': 'പോർട്ടൽ ആക്‌സസ് ചെയ്യുക →',
    'landing.features.liveMonitoring.title': 'തത്സമയ നിരീക്ഷണം',
    'landing.features.liveMonitoring.description': 'ഇന്ററാക്ടീവ് കേരള മാപ്പ് വിഷ്വലൈസേഷനോടുകൂടിയ തത്സമയ ജില്ലാതല തകരാർ ട്രാക്കിംഗ്',
    'landing.features.liveMonitoring.action': 'ഡാഷ്ബോർഡ് കാണുക →',
    'landing.features.alertManagement.title': 'അലേർട്ട് മാനേജ്മെന്റ്',
    'landing.features.alertManagement.description': 'പരിധികൾ കോൺഫിഗർ ചെയ്യുക, അറിയിപ്പുകൾ മാനേജ് ചെയ്യുക, പ്രതികരണ സമയം ട്രാക്ക് ചെയ്യുക',
    'landing.features.alertManagement.action': 'അലേർട്ടുകൾ മാനേജ് ചെയ്യുക →',
    'landing.safety.title': 'വൈദ്യുത സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    'landing.safety.emergency.title': '⚠️ അടിയന്തര നടപടിക്രമങ്ങൾ',
    'landing.safety.emergency.line1': '• വീണുകിടക്കുന്ന വൈദ്യുതി വയറുകളിൽ സ്പർശിക്കരുത്',
    'landing.safety.emergency.line2': '• വൈദ്യുത ഉപകരണങ്ങൾക്ക് സമീപം വെള്ളത്തിൽ നിന്ന് അകന്ന് നിൽക്കുക',
    'landing.safety.emergency.line3': '• അടിയന്തര സേവനങ്ങളെ ഉടൻ വിളിക്കുക',
    'landing.safety.emergency.line4': '• ഗ്യാസ് മണം വന്നാൽ പ്രദേശം ഒഴിപ്പിക്കുക',
    'landing.safety.prevention.title': '✓ പ്രതിരോധ നുറുങ്ങുകൾ',
    'landing.safety.prevention.line1': '• പതിവ് വൈദ്യുത സംവിധാന അറ്റകുറ്റപ്പണി',
    'landing.safety.prevention.line2': '• ശരിയായ വോൾട്ടേജ് സ്റ്റെബിലൈസറുകൾ ഉപയോഗിക്കുക',
    'landing.safety.prevention.line3': '• സർക്യൂട്ടുകളിൽ അമിത ഭാരം ഒഴിവാക്കുക',
    'landing.safety.prevention.line4': '• സർക്യൂട്ട് ബ്രേക്കറുകളും ഇഎൽസിബിയും സ്ഥാപിക്കുക',
    'landing.safety.contact.title': 'അടിയന്തര ബന്ധപ്പെടാനുള്ള നമ്പറുകൾ',
    'landing.safety.contact.ksebl': 'അടിയന്തര ഹെൽപ്‌ലൈൻ',
    'landing.safety.contact.fire': 'അഗ്നിരക്ഷാ സേന',
    'landing.safety.contact.police': 'പോലീസ്',
    'landing.footer.companyName': 'Fault Management System',
    'landing.footer.quickLinks': 'ദ്രുത ലിങ്കുകൾ',
    'landing.footer.consumerPortal': 'ഉപഭോക്തൃ പോർട്ടൽ',
    'landing.footer.adminDashboard': 'അഡ്മിൻ ഡാഷ്ബോർഡ്',
    'landing.footer.about': 'Fault Management System-നെ കുറിച്ച്',
    'landing.footer.contact': 'ഞങ്ങളെ സമീപിക്കുക',
    'landing.footer.followUs': 'ഞങ്ങളെ പിന്തുടരുക',
    'landing.footer.copyright': '© 2024 Fault Management System. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.',
    
    // Tabs
    'tabs.liveMonitoring': 'തത്സമയ നിരീക്ഷണം',
    'tabs.analytics': 'വിശകലനം',
    'tabs.reports': 'റിപ്പോർട്ടുകൾ',
    'tabs.alerts': 'അലേർട്ടുകൾ',
    'tabs.reportIssue': 'പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
    'tabs.trackStatus': 'സ്റ്റാറ്റസ് ട്രാക്ക് ചെയ്യുക',
    'tabs.safetyInfo': 'സുരക്ഷാ വിവരങ്ങൾ',
    
    // Live Monitoring Tab
    'liveMonitoring.district': 'ജില്ല',
    'liveMonitoring.select': 'തിരഞ്ഞെടുക്കുക',
    'liveMonitoring.totalPoles': 'മൊത്തം പോളുകൾ',
    'liveMonitoring.normalPoles': 'സാധാരണ പോളുകൾ',
    'liveMonitoring.faultyPoles': 'തകരാറുള്ള പോളുകൾ',
    'liveMonitoring.activeFaults': 'സജീവ തകരാറുകൾ',
    'liveMonitoring.poleStatus': 'പോൾ സ്ഥിതി',
    'liveMonitoring.selectPole': 'പോൾ തിരഞ്ഞെടുക്കുക',
    'liveMonitoring.phaseStatus': 'ഫേസ് സ്ഥിതി',
    'liveMonitoring.networkTopology': 'നെറ്റ്‌വർക്ക് ടോപ്പോളജി',
    'liveMonitoring.mainline': 'മെയിൻലൈൻ',
    'liveMonitoring.phase': 'ഫേസ്',
    'liveMonitoring.inputVoltage': 'ഇൻപുട്ട് വോൾട്ടേജ്',
    'liveMonitoring.outputVoltage': 'ഔട്ട്പുട്ട് വോൾട്ടേജ്',
    'liveMonitoring.inputCurrent': 'ഇൻപുട്ട് കറന്റ്',
    'liveMonitoring.outputCurrent': 'ഔട്ട്പുട്ട് കറന്റ്',
    'liveMonitoring.status': 'സ്ഥിതി',
    'liveMonitoring.lastUpdate': 'അവസാന അപ്ഡേറ്റ്',
    'liveMonitoring.operational': 'പ്രവർത്തനക്ഷമം',
    'liveMonitoring.fault': 'തകരാർ',
    'liveMonitoring.breakage': 'തകർച്ച',
    'liveMonitoring.noMains': 'മെയിൻ ഇല്ല',
    'liveMonitoring.unknown': 'അജ്ഞാതം',
    'liveMonitoring.keralaFaultMap': 'കേരള തകരാർ മാപ്പ്',
    'liveMonitoring.faultAlert': 'തകരാർ അലേർട്ട്',
    'liveMonitoring.faultAlertMessage': 'കണ്ടെത്തി. അടിയന്തര ശ്രദ്ധ ആവശ്യമാണ്.',
    'liveMonitoring.acknowledge': 'അംഗീകരിക്കുക',
    'liveMonitoring.activeFaultsTitle': 'സജീവ തകരാറുകൾ',
    'liveMonitoring.activeFaultsDescription': 'ഇനിപ്പറയുന്ന ഘടകങ്ങൾ തകരാറുകൾ റിപ്പോർട്ട് ചെയ്തിട്ടുണ്ട്:',
    'liveMonitoring.phaseTitle': 'ഫേസ്',
    'liveMonitoring.realtimeSensorFeed': 'എന്നതിൽ നിന്നുള്ള തത്സമയ സെൻസർ ഫീഡ്',
    'liveMonitoring.streetBranchesNetwork': 'സ്ട്രീറ്റ് ബ്രാഞ്ച് നെറ്റ്‌വർക്ക്',
    'liveMonitoring.poleDetails': 'പോൾ വിശദാംശങ്ങൾ',
    'liveMonitoring.clickToView': 'വിശദാംശങ്ങൾ കാണാൻ ഒരു പോളിൽ ക്ലിക്ക് ചെയ്യുക',
    'liveMonitoring.pole': 'പോൾ',
    'liveMonitoring.street': 'സ്ട്രീറ്റ്',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ml' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
