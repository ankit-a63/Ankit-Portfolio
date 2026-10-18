export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  liveUrl: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  features: string[];
  accentColor: string;
  themeStyle: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: {
    name: string;
    level: string;
    icon: string;
    description: string;
  }[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
