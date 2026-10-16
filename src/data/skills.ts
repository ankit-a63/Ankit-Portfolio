import { SkillCategory } from '../types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: {
      en: 'Frontend Engineering',
      hi: 'फ्रंटएंड इंजीनियरिंग',
    },
    skills: [
      {
        name: 'HTML',
        level: 'Semantic Structure & Accessibility',
        icon: 'code-2',
        description: {
          en: 'Semantic markup, accessible DOM hierarchies, forms, meta integration, and standards-compliant document models.',
          hi: 'सिमेंटिक मार्कअप, सुलभ DOM संरचना, फॉर्म्स और आधुनिक वेब मानकों के अनुरूप डॉक्यूमेंट निर्माण।',
        },
      },
      {
        name: 'CSS',
        level: 'Modern Layouts & Animations',
        icon: 'palette',
        description: {
          en: 'Flexbox, CSS Grid, media queries, CSS variables, transitions, and responsive mobile-first styling.',
          hi: 'फ्लेक्सबॉक्स, सीएसएस ग्रिड, मीडिया क्वेरी, वैरिएबल्स और मोबाइल-प्रथम रिस्पॉन्सिव स्टाइलिंग।',
        },
      },
      {
        name: 'JavaScript',
        level: 'Core ES6+ & DOM Engineering',
        icon: 'braces',
        description: {
          en: 'Asynchronous programming, event delegation, DOM manipulation, browser APIs, and application logic.',
          hi: 'एसिंक्रोनस प्रोग्रामिंग, इवेंट डेलिगेशन, DOM मैनिपुलेशन और ब्राउज़र वेब APIs का व्यावहारिक उपयोग।',
        },
      },
      {
        name: 'Bootstrap',
        level: 'Rapid Component Frameworks',
        icon: 'layout-grid',
        description: {
          en: 'Grid system, modular UI components, utilities, and clean responsive interface prototyping.',
          hi: 'ग्रिड सिस्टम, मॉड्यूलर UI कंपोनेंट्स और त्वरित रिस्पॉन्सिव इंटरफेस प्रोटोटाइपिंग।',
        },
      },
      {
        name: 'React',
        level: 'Component Architecture & State',
        icon: 'atom',
        description: {
          en: 'Functional components, hooks, state management, props data flow, and modern SPA development.',
          hi: 'फंक्शनल कंपोनेंट्स, कस्टम हुक्स, स्टेट मैनेजमेंट और आधुनिक सिंगल पेज एप्लीकेशन आर्किटेक्चर।',
        },
      },
    ],
  },
  {
    id: 'backend',
    name: {
      en: 'Backend & Data',
      hi: 'बैकएंड और डेटाबेस',
    },
    skills: [
      {
        name: 'PHP',
        level: 'Server-Side Scripting',
        icon: 'server',
        description: {
          en: 'Server-side request handling, form processing, session management, and database connectivity.',
          hi: 'सर्वर-साइड रिक्वेस्ट हैंडलिंग, फॉर्म प्रोसेसिंग, सेशन मैनेजमेंट और डेटाबेस कनेक्टिविटी।',
        },
      },
      {
        name: 'Python',
        level: 'Logic, Scripting & Algorithms',
        icon: 'terminal',
        description: {
          en: 'Object-oriented programming, data structures, automation scripts, and problem-solving logic.',
          hi: 'ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग, डेटा संरचनाएं, ऑटोमेशन स्क्रिप्ट्स और अल्गोरिद्म लॉजिक।',
        },
      },
      {
        name: 'SQL',
        level: 'Relational Query Language',
        icon: 'database',
        description: {
          en: 'Relational data modeling, table schemas, CRUD operations, joins, and indexing concepts.',
          hi: 'रिलेशनल डेटा मॉडलिंग, टेबल स्कीमा, CRUD ऑपरेशन्स, जॉइन्स और इंडेक्सिंग अवधारणाएं।',
        },
      },
      {
        name: 'MySQL / MariaDB',
        level: 'Database Implementation',
        icon: 'hard-drive',
        description: {
          en: 'Database normalization, relational integrity, data queries, and secure database interactions.',
          hi: 'डेटाबेस सामान्यीकरण, रिलेशनल इंटीग्रिटी और सुरक्षित डेटाबेस इंटरैक्शन।',
        },
      },
    ],
  },
  {
    id: 'tools',
    name: {
      en: 'Version Control & Workflow',
      hi: 'वर्जन कंट्रोल और टूल्स',
    },
    skills: [
      {
        name: 'Git',
        level: 'Distributed Version Control',
        icon: 'git-branch',
        description: {
          en: 'Repository management, branching strategies, commits, diff inspections, and merge conflict resolution.',
          hi: 'रिपॉजिटरी प्रबंधन, ब्रांचिंग रणनीतियां, कमिट्स, इतिहास ट्रैकिंग और कोड सहयोग।',
        },
      },
      {
        name: 'GitHub',
        level: 'Collaborative Development',
        icon: 'github',
        description: {
          en: 'Remote repositories, issue tracking, project boards, open source workflows, and deployment integrations.',
          hi: 'रिमोट रिपॉजिटरी, इश्यू ट्रैकिंग, प्रोजेक्ट बोर्ड्स और ऑटोमेटेड डिप्लॉयमेंट इंटीग्रेशन।',
        },
      },
    ],
  },
];
