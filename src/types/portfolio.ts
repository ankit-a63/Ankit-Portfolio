export type Language = 'en' | 'hi';

export interface Project {
  id: string;
  title: string;
  category: {
    en: string;
    hi: string;
  };
  subtitle: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  liveUrl: string;
  tags: string[];
  metrics: {
    label: { en: string; hi: string };
    value: string;
  }[];
  features: {
    en: string[];
    hi: string[];
  };
  accentColor: string;
  themeStyle: string;
}

export interface SkillCategory {
  id: string;
  name: {
    en: string;
    hi: string;
  };
  skills: {
    name: string;
    level: string; // descriptive, e.g. "Practical Experience", "Core Proficiency", "Summer Training Focus"
    icon: string;
    description: {
      en: string;
      hi: string;
    };
  }[];
}

export interface NavItem {
  id: string;
  label: {
    en: string;
    hi: string;
  };
  href: string;
}
