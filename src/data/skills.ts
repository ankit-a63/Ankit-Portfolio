import { SkillCategory } from '../types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    skills: [
      {
        name: 'HTML',
        level: 'Semantic Structure & Accessibility',
        icon: 'code-2',
        description: 'Semantic markup, accessible DOM hierarchies, forms, meta integration, and standards-compliant document models.',
      },
      {
        name: 'CSS',
        level: 'Modern Layouts & Animations',
        icon: 'palette',
        description: 'Flexbox, CSS Grid, media queries, CSS variables, transitions, and responsive mobile-first styling.',
      },
      {
        name: 'JavaScript',
        level: 'Core ES6+ & DOM Engineering',
        icon: 'braces',
        description: 'Asynchronous programming, event delegation, DOM manipulation, browser APIs, and application logic.',
      },
      {
        name: 'Bootstrap',
        level: 'Rapid Component Frameworks',
        icon: 'layout-grid',
        description: 'Grid system, modular UI components, utilities, and clean responsive interface prototyping.',
      },
      {
        name: 'React',
        level: 'Component Architecture & State',
        icon: 'atom',
        description: 'Functional components, hooks, state management, props data flow, and modern SPA development.',
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Data',
    skills: [
      {
        name: 'PHP',
        level: 'Server-Side Scripting',
        icon: 'server',
        description: 'Server-side request handling, form processing, session management, and database connectivity.',
      },
      {
        name: 'Python',
        level: 'Logic, Scripting & Algorithms',
        icon: 'terminal',
        description: 'Object-oriented programming, data structures, automation scripts, and problem-solving logic.',
      },
      {
        name: 'SQL',
        level: 'Relational Query Language',
        icon: 'database',
        description: 'Relational data modeling, table schemas, CRUD operations, joins, and indexing concepts.',
      },
      {
        name: 'MySQL / MariaDB',
        level: 'Database Implementation',
        icon: 'hard-drive',
        description: 'Database normalization, relational integrity, data queries, and secure database interactions.',
      },
    ],
  },
  {
    id: 'tools',
    name: 'Version Control & Workflow',
    skills: [
      {
        name: 'Git',
        level: 'Distributed Version Control',
        icon: 'git-branch',
        description: 'Repository management, branching strategies, commits, diff inspections, and merge conflict resolution.',
      },
      {
        name: 'GitHub',
        level: 'Collaborative Development',
        icon: 'github',
        description: 'Remote repositories, issue tracking, project boards, open source workflows, and deployment integrations.',
      },
    ],
  },
];
