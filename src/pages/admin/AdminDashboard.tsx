import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, ArrowLeft, LayoutDashboard, BarChart3, FileText, Bell } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { LiveMonitoringTab } from "@/components/admin/LiveMonitoringTab";
import { AnalyticsTab } from "@/components/admin/AnalyticsTab";
import { ConsumerReportsTab } from "@/components/admin/ConsumerReportsTab";
import { AlertManagementTab } from "@/components/admin/AlertManagementTab";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";

const AdminDashboard = () => {
  const { t } = useLanguage();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-card shadow-sm sticky top-0 z-10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t('header.backToHome')}
                    </Link>
                  </Button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-foreground">{t('header.adminTitle')}</h1>
                      <p className="text-xs text-muted-foreground">{t('header.adminSubtitle')}</p>
                    </div>
                  </div>
                </div>
                <LanguageToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <Tabs defaultValue="monitoring" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-8">
                <TabsTrigger value="monitoring" className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('tabs.liveMonitoring')}</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('tabs.analytics')}</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('tabs.reports')}</span>
                </TabsTrigger>
                <TabsTrigger value="alerts" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('tabs.alerts')}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="monitoring">
                <LiveMonitoringTab />
              </TabsContent>

              <TabsContent value="analytics">
                <AnalyticsTab />
              </TabsContent>

              <TabsContent value="reports">
                <ConsumerReportsTab />
              </TabsContent>

              <TabsContent value="alerts">
                <AlertManagementTab />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
