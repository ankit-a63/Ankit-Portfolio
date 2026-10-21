import { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    id: 'sanix-tool',
    title: 'SANIX TOOL',
    category: 'UTILITY ECOSYSTEM // WEB PLATFORM',
    subtitle: 'All-in-one browser-native utility suite with 34+ zero-upload tools',
    description: 'A comprehensive collection of online utilities engineered to simplify everyday digital workflows, including image, PDF, developer, text, calculator, and file-related tools. Built for speed and privacy, executing directly within the browser without uploading files to external servers.',
    liveUrl: 'https://sanixtool.vercel.app/',
    tags: ['JavaScript', 'HTML5 Canvas', 'Web APIs', 'Client-side Privacy', 'Responsive UI'],
    metrics: [
      {
        label: 'In-Browser Tools',
        value: '34+',
      },
      {
        label: 'Privacy Architecture',
        value: '100% Client-Side',
      },
      {
        label: 'Tool Categories',
        value: '6 Modules',
      },
    ],
    features: [
      'Image Compressor, Resizer, Cropper, Converter & ID Photo Maker',
      'PDF Merger, Splitter, Page Rotator & Metadata Inspector',
      'Developer Suite: JSON Formatter, Base64, Hash Generator & Regex Tester',
      'Text Utilities: Word Counter, Slug Generator & Case Converter',
      'Interactive Sani Virtual Assistant widget & Theme Customization',
    ],
    accentColor: '#38bdf8',
    themeStyle: 'cyan',
  },
  {
    id: 'smart-village',
    title: 'SMART VILLAGE SYSTEM',
    category: 'CIVIC TECH // E-GOVERNANCE',
    subtitle: 'Digital governance platform for village complaints, resources & administration',
    description: 'A digital-governance system focused on village-level public complaints, public resources, and administrative workflows. Empowers rural citizens and local administration with transparent issue logging, status tracking, and public asset records.',
    liveUrl: 'https://smartvillage-jet.vercel.app/',
    tags: ['React', 'Full-Stack Web', 'Civic Tech', 'Dashboard UX', 'Tailwind CSS'],
    metrics: [
      {
        label: 'Governance Scope',
        value: 'Gram Panchayat',
      },
      {
        label: 'Workflow Speed',
        value: 'Real-Time Updates',
      },
      {
        label: 'Citizen Access',
        value: 'Direct Portal',
      },
    ],
    features: [
      'Village Grievance Portal for logging public infrastructure and utility complaints',
      'Live Issue Tracking system with status progression and resolution updates',
      'Village Public Resource directory mapping community assets and amenities',
      'Administrative dashboard designed for transparent Gram Panchayat oversight',
      'Mobile-friendly responsive interface accessible for rural community users',
    ],
    accentColor: '#0284c7',
    themeStyle: 'blue',
  },
  {
    id: 'ankix-sports',
    title: 'ANKIX SPORTS',
    category: 'SPORTS TECH // LIVE SCORE PLATFORM',
    subtitle: 'High-performance live cricket score engine with interactive 3D spatial arena',
    description: 'An elite live cricket score platform delivering sub-second real-time match scores, comprehensive scorecards, interactive 3D spatial arena with procedural leather shaders (Three.js), upcoming fixtures with automatic IST scheduling, tournament standings, and serverless API proxy caching.',
    liveUrl: 'https://ankix-sports.vercel.app/',
    tags: ['React 19', 'Three.js 3D Arena', 'TypeScript', 'TanStack Query', 'Tailwind CSS', 'Vercel Serverless'],
    metrics: [
      {
        label: 'Visual Engine',
        value: '60 FPS 3D',
      },
      {
        label: 'Sync Frequency',
        value: 'Real-Time / 60s',
      },
      {
        label: 'Architecture',
        value: 'Serverless Proxy',
      },
    ],
    features: [
      'Interactive 3D Cricket Arena with procedural leather shaders, raised seam geometry & stadium lighting',
      'Real-Time Match Centre with detailed batting tables, bowling economy, extras & commentary status',
      'Upcoming Fixtures & Archive with countdown timers converted to Asia/Kolkata (IST)',
      'Tournament Points Table & Standings browser covering international and domestic series',
      'Secure Serverless Caching Proxy (api/*) protecting CricAPI quota with in-memory TTL',
    ],
    accentColor: '#10b981',
    themeStyle: 'emerald',
  },
];
