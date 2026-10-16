import { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    id: 'sanix-tool',
    title: 'SANIX TOOL',
    category: {
      en: 'UTILITY ECOSYSTEM // WEB PLATFORM',
      hi: 'यूटिलिटी प्लेटफॉर्म // वेब टूल्स',
    },
    subtitle: {
      en: 'All-in-one browser-native utility suite with 34+ zero-upload tools',
      hi: '34+ निःशुल्क ब्राउज़र-आधारित टूल्स का संपूर्ण डिजिटल संग्रह',
    },
    description: {
      en: 'A collection of online utilities designed to simplify everyday digital tasks, including image, PDF, text, developer, calculator, and file-related tools. Built for high speed and privacy, executing directly within the browser without uploading files to external servers.',
      hi: 'दैनिक डिजिटल कार्यों को आसान बनाने के लिए डिज़ाइन किया गया ऑनलाइन टूल्स का व्यापक संग्रह, जिसमें इमेज, पीडीएफ, टेक्स्ट, डेवलपर, कैलकुलेटर और फाइल संबंधित 34 से अधिक टूल्स शामिल हैं। यह सभी टूल्स उपयोगकर्ता की गोपनीयता का सम्मान करते हुए बिना बाहरी सर्वर पर अपलोड किए सीधे ब्राउज़र में तीव्र गति से काम करते हैं।',
    },
    liveUrl: 'https://sanixtool.vercel.app/',
    tags: ['JavaScript', 'HTML5 Canvas', 'Web APIs', 'Responsive UI', 'Client-side Security'],
    metrics: [
      {
        label: { en: 'In-Browser Tools', hi: 'ब्राउज़र टूल्स' },
        value: '34+',
      },
      {
        label: { en: 'Privacy Architecture', hi: 'गोपनीयता मानक' },
        value: '100% Client-Side',
      },
      {
        label: { en: 'Tool Categories', hi: 'टूल श्रेणियां' },
        value: '6 Distinct Modules',
      },
    ],
    features: {
      en: [
        'Image Compressor, Resizer, Cropper, Converter & ID Photo Maker',
        'PDF Merger, Splitter, Page Rotator & Metadata Inspector',
        'Developer Suite: JSON Formatter, Base64, Hash Generator & Regex Tester',
        'Text Utilities: Word Counter, Slug Generator & Case Converter',
        'Interactive Sani Virtual Assistant widget & Theme Customization',
      ],
      hi: [
        'इमेज कंप्रेसर, रीसाइज़र, क्रॉपर, कन्वर्टर और पासपोर्ट फोटो मेकर',
        'पीडीएफ मर्जर, स्प्लिटर, पेज रोटेटर और मेटाडेटा विश्लेषक',
        'डेवलपर टूल्स: JSON फॉर्मेटर, Base64, हैश जेनरेटर और रीजेक्स टेस्टर',
        'टेक्स्ट उपयोगिताएं: वर्ड काउंटर, यूआरएल स्लग जेनरेटर और केस कन्वर्टर',
        'इंटरएक्टिव सानी वर्चुअल असिस्टेंट और थीम अनुकूलन',
      ],
    },
    accentColor: '#38bdf8',
    themeStyle: 'cyan',
  },
  {
    id: 'smart-village',
    title: 'SMART VILLAGE SYSTEM',
    category: {
      en: 'CIVIC TECH // E-GOVERNANCE',
      hi: 'नागरिक सेवा // ई-गवर्नेंस',
    },
    subtitle: {
      en: 'Digital governance platform for village complaints, resources & administration',
      hi: 'ग्राम पंचायत स्तर पर जन-शिकायत निवारण और सार्वजनिक संसाधन प्रबंधन प्रणाली',
    },
    description: {
      en: 'A digital-governance project focused on village-level public complaints, public resources, and administrative workflows. Empowers rural citizens and local administration with transparent issue logging, status tracking, and public asset records.',
      hi: 'ग्रामीण स्तर पर जन-शिकायतों, सार्वजनिक संसाधनों और प्रशासनिक कार्यप्रवाह को सुव्यवस्थित करने के लिए तैयार किया गया ई-गवर्नेंस प्रोजेक्ट। यह नागरिकों और ग्राम पंचायत प्रशासन को पारदर्शी शिकायत पंजीकरण, स्थिति ट्रैकिंग और ग्राम विकास संसाधनों का सहज डिजिटल डैशबोर्ड प्रदान करता है।',
    },
    liveUrl: 'https://smartvillage-jet.vercel.app/',
    tags: ['React', 'Full-Stack Architecture', 'Civic Tech', 'Dashboard UX', 'Tailwind CSS'],
    metrics: [
      {
        label: { en: 'Governance Scope', hi: 'प्रशासनिक स्तर' },
        value: 'Gram Panchayat',
      },
      {
        label: { en: 'Workflow Speed', hi: 'ट्रैकिंग प्रणाली' },
        value: 'Real-Time Updates',
      },
      {
        label: { en: 'Citizen Access', hi: 'नागरिक पहुंच' },
        value: 'Direct Portal',
      },
    ],
    features: {
      en: [
        'Village Grievance Portal for logging public infrastructure and utility complaints',
        'Live Issue Tracking system with status progression and resolution updates',
        'Village Public Resource directory mapping community assets and amenities',
        'Administrative dashboard designed for transparent Gram Panchayat oversight',
        'Mobile-friendly responsive interface accessible for rural community users',
      ],
      hi: [
        'सार्वजनिक बुनियादी ढांचे और जन-सुविधाओं की शिकायतों के लिए डिजिटल शिकायत पोर्टल',
        'शिकायत की अद्यतन स्थिति और समाधान जानने के लिए लाइव ट्रैकिंग सिस्टम',
        'सामुदायिक संपत्तियों और नागरिक सुविधाओं का विस्तृत ग्राम संसाधन विवरण',
        'ग्राम पंचायत में पारदर्शिता और जवाबदेही के लिए प्रशासनिक डैशबोर्ड',
        'ग्रामीण स्मार्टफोन उपयोगकर्ताओं के लिए सहज और सुलभ रिस्पॉन्सिव इंटरफेस',
      ],
    },
    accentColor: '#0284c7',
    themeStyle: 'blue',
  },
];
