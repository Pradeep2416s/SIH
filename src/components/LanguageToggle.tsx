import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="language-toggle" className="text-sm font-medium cursor-pointer">
        {language === 'en' ? 'EN' : 'ML'}
      </Label>
      <Switch
        id="language-toggle"
        checked={language === 'ml'}
        onCheckedChange={toggleLanguage}
        className="data-[state=checked]:bg-blue-600"
      />
    </div>
  );
};
