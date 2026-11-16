import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, ArrowLeft } from "lucide-react";
import { ReportIssueTab } from "@/components/consumer/ReportIssueTab";
import { TrackStatusTab } from "@/components/consumer/TrackStatusTab";
import { SafetyInfoTab } from "@/components/consumer/SafetyInfoTab";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";

const ConsumerPortal = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('header.back')}
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">{t('header.consumerTitle')}</h1>
                  <p className="text-xs text-muted-foreground">{t('header.consumerSubtitle')}</p>
                </div>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="report" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="report">{t('tabs.reportIssue')}</TabsTrigger>
            <TabsTrigger value="track">{t('tabs.trackStatus')}</TabsTrigger>
            <TabsTrigger value="safety">{t('tabs.safetyInfo')}</TabsTrigger>
          </TabsList>

          <TabsContent value="report">
            <ReportIssueTab />
          </TabsContent>

          <TabsContent value="track">
            <TrackStatusTab />
          </TabsContent>

          <TabsContent value="safety">
            <SafetyInfoTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ConsumerPortal;
