import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Users, Shield, BarChart3, Phone, AlertTriangle, CheckCircle2, Clock, Twitter, Instagram, Facebook, Linkedin, Mail } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";

const Landing = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('header.title')}</h1>
              <p className="text-xs text-muted-foreground">{t('header.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/consumer">{t('header.consumerPortal')}</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/admin">{t('header.adminDashboard')}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-5xl font-bold mb-6 animate-fade-in">
              {t('landing.hero.title')}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t('landing.hero.description')}
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="shadow-lg">
                <Link to="/consumer">
                  <Users className="w-5 h-5 mr-2" />
                  {t('header.consumerPortal')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                <Link to="/admin">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  {t('header.adminDashboard')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={CheckCircle2}
              label={t('landing.stats.issuesResolved')}
              value="1,247"
              trend="+12%"
              variant="success"
            />
            <StatCard
              icon={Clock}
              label={t('landing.stats.responseTime')}
              value="2.3h"
              trend="-15%"
              variant="info"
            />
            <StatCard
              icon={AlertTriangle}
              label={t('landing.stats.activeAlerts')}
              value="23"
              trend="+3"
              variant="warning"
            />
            <StatCard
              icon={Zap}
              label={t('landing.stats.systemUptime')}
              value="99.8%"
              trend="+0.2%"
              variant="primary"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">{t('landing.features.title')}</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('landing.features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">{t('landing.features.consumerPortal.title')}</h4>
              <p className="text-muted-foreground mb-4">
                {t('landing.features.consumerPortal.description')}
              </p>
              <Button variant="ghost" asChild className="p-0 h-auto text-primary">
                <Link to="/consumer">{t('landing.features.consumerPortal.action')}</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">{t('landing.features.liveMonitoring.title')}</h4>
              <p className="text-muted-foreground mb-4">
                {t('landing.features.liveMonitoring.description')}
              </p>
              <Button variant="ghost" asChild className="p-0 h-auto text-primary">
                <Link to="/admin">{t('landing.features.liveMonitoring.action')}</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <h4 className="text-xl font-semibold mb-2">{t('landing.features.alertManagement.title')}</h4>
              <p className="text-muted-foreground mb-4">
                {t('landing.features.alertManagement.description')}
              </p>
              <Button variant="ghost" asChild className="p-0 h-auto text-primary">
                <Link to="/admin">{t('landing.features.alertManagement.action')}</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-destructive" />
              <h3 className="text-3xl font-bold text-foreground">{t('landing.safety.title')}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card">
                <h4 className="font-semibold text-lg mb-3 text-destructive">{t('landing.safety.emergency.title')}</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>{t('landing.safety.emergency.line1')}</li>
                  <li>{t('landing.safety.emergency.line2')}</li>
                  <li>{t('landing.safety.emergency.line3')}</li>
                  <li>{t('landing.safety.emergency.line4')}</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card">
                <h4 className="font-semibold text-lg mb-3 text-success">{t('landing.safety.prevention.title')}</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>{t('landing.safety.prevention.line1')}</li>
                  <li>{t('landing.safety.prevention.line2')}</li>
                  <li>{t('landing.safety.prevention.line3')}</li>
                  <li>{t('landing.safety.prevention.line4')}</li>
                </ul>
              </Card>
            </div>

            <Card className="mt-6 p-6 bg-destructive/10 border-destructive/20">
              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">{t('landing.safety.contact.title')}</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">{t('landing.safety.contact.ksebl')}</p>
                      <p className="text-xl font-bold text-destructive">1912</p>
                    </div>
                    <div>
                      <p className="font-medium">{t('landing.safety.contact.fire')}</p>
                      <p className="text-xl font-bold text-destructive">101</p>
                    </div>
                    <div>
                      <p className="font-medium">{t('landing.safety.contact.police')}</p>
                      <p className="text-xl font-bold text-destructive">100</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-gradient-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-foreground">{t('header.title')}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('landing.footer.companyName')}
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-3">{t('landing.footer.quickLinks')}</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/consumer" className="hover:text-primary">{t('landing.footer.consumerPortal')}</Link></li>
                <li><Link to="/admin" className="hover:text-primary">{t('landing.footer.adminDashboard')}</Link></li>
                <li><a href="#" className="hover:text-primary">{t('landing.footer.about')}</a></li>
                <li><a href="#" className="hover:text-primary">{t('landing.footer.contact')}</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">{t('landing.footer.followUs')}</h5>
              <div className="flex gap-3">
                <a href="https://x.com/KSEBLtd" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors" title="Follow us on X">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/ksebltd?igsh=cThmYXdrbWx2YWNk" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors" title="Follow us on Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://facebook.com/ksebl" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors" title="Follow us on Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/kerala-state-electricity-board-kerala/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors" title="Follow us on LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:support@kseb.in" className="p-2 rounded-lg bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors" title="Email support">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>{t('landing.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
