// ─── ALL CONTENT DATA ───

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#achievements', label: 'Awards' },
  { href: '#publications', label: 'Research' },
  { href: '#contact', label: 'Contact' },
];

export const TICKER_ITEMS = [
  'PyTorch', 'LangChain', 'Vision Transformers', 'RAG Pipelines',
  'LlamaIndex', 'HuggingFace', 'LoRA/QLoRA', 'Scikit-learn',
  'FAISS', 'OpenCV', 'React.js', 'Node.js', 'MongoDB', 'Express.js',
  'Tailwind', 'Docker',
];

export const PROJECTS = {
  grid: [
    {
      id: 'parkinsons-disease-prediction',
      year: '2025',
      title: 'Parkinson\'s Disease Prediction',
      desc: 'Ensemble machine learning pipeline for Parkinson\'s prediction with robust validation and explainable feature analysis.',
      metrics: [
        { val: '95%+', label: 'Accuracy' },
        { val: 'Cross-Validation', label: 'Validation' },
        { val: 'Optimized', label: 'Hyperparameter Tuning' },
      ],
      tags: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      links: [
        { label: 'View Project', href: 'https://github.com/Shreya-Shukla27/ML_projects/blob/main/Copy_of_Parkinsons.ipynb', type: 'primary' },
        { label: 'GitHub', href: 'https://github.com/Shreya-Shukla27/ML_projects/blob/main/Copy_of_Parkinsons.ipynb', type: 'secondary' },
      ],
    },
    {
      id: 'adhd-classification-cnn-vit',
      year: '2025',
      title: 'ADHD Classification (CNN + Vision Transformer)',
      desc: 'Hybrid CNN + Vision Transformer MRI classifier with GPU optimization, transfer learning, and augmentation-led accuracy lift.',
      metrics: [
        { val: '+25%', label: 'Accuracy Lift' },
        { val: 'CNN + ViT', label: 'Architecture' },
        { val: 'GPU-Optimized', label: 'Training Pipeline' },
      ],
      tags: ['PyTorch', 'TensorFlow', 'OpenCV', 'Transfer Learning', 'Ablation Studies'],
      links: [
        { label: 'View Project', href: '#', type: 'primary' },
        { label: 'GitHub', href: 'https://github.com/Shreya-Shukla27', type: 'secondary' },
      ],
    },
    {
      id: 'covid19-analysis-dashboard',
      year: '2026',
      title: 'COVID-19 Data Analysis Dashboard',
      desc: 'Interactive analytics dashboard covering pandemic trends, maps, and heatmaps with deployment-ready Streamlit UX.',
      metrics: [
        { val: '187', label: 'Countries Analyzed' },
        { val: '8+', label: 'Interactive Visualizations' },
        { val: 'Live', label: 'Streamlit Deployment' },
      ],
      tags: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
      links: [
        { label: 'View Project', href: 'https://github.com/Shreya-Shukla27/covid19_dashboard', type: 'primary' },
        { label: 'GitHub', href: 'https://github.com/Shreya-Shukla27/covid19_dashboard', type: 'secondary' },
      ],
    },
    {
      id: 'lensai-caption-generator',
      year: '2026',
      title: 'LensAI — AI Image Caption Generator',
      desc: 'Full-stack AI caption generator using BLIP with secure APIs, media storage, user history, and social-ready output modes.',
      metrics: [
        { val: '5', label: 'Caption Tone Modes' },
        { val: 'JWT', label: 'Auth + Sessions' },
        { val: 'MongoDB', label: 'History Tracking' },
      ],
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary', 'Hugging Face'],
      links: [
        { label: 'View Project', href: 'https://lensai-image-caption-generator.vercel.app', type: 'primary' },
        { label: 'GitHub', href: 'https://github.com/Shreya-Shukla27/lensai-image-caption-generator', type: 'secondary' },
      ],
    },
  ],
};

export const TECH_STACK = [
  { name: 'Python', category: 'Programming Languages' },
  { name: 'C', category: 'Programming Languages' },
  { name: 'C++', category: 'Programming Languages' },
  { name: 'Java', category: 'Programming Languages' },
  { name: 'SQL (MySQL)', category: 'Programming Languages' },

  { name: 'PyTorch', category: 'AI/ML' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'Keras', category: 'AI/ML' },
  { name: 'Scikit-learn', category: 'AI/ML' },
  { name: 'Hugging Face', category: 'AI/ML' },
  { name: 'CNNs', category: 'AI/ML' },
  { name: 'Vision Transformers', category: 'AI/ML' },

  { name: 'LangChain', category: 'GenAI/LLM' },
  { name: 'LlamaIndex', category: 'GenAI/LLM' },
  { name: 'RAG Pipelines', category: 'GenAI/LLM' },
  { name: 'LoRA', category: 'GenAI/LLM' },
  { name: 'QLoRA', category: 'GenAI/LLM' },
  { name: 'FAISS', category: 'GenAI/LLM' },

  { name: 'Pandas', category: 'Data Science' },
  { name: 'NumPy', category: 'Data Science' },
  { name: 'SciPy', category: 'Data Science' },
  { name: 'Matplotlib', category: 'Data Science' },
  { name: 'Seaborn', category: 'Data Science' },
  { name: 'OpenCV', category: 'Data Science' },

  { name: 'React.js', category: 'Web' },
  { name: 'Node.js', category: 'Web' },
  { name: 'Express.js', category: 'Web' },
  { name: 'Tailwind CSS', category: 'Web' },

  { name: 'FastAPI', category: 'Backend' },

  { name: 'MongoDB', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MySQL', category: 'Database' },

  { name: 'Git', category: 'DevOps & Tools' },
  { name: 'GitHub', category: 'DevOps & Tools' },
  { name: 'Linux (Ubuntu)', category: 'DevOps & Tools' },
  { name: 'Jupyter', category: 'DevOps & Tools' },
  { name: 'VS Code', category: 'DevOps & Tools' },
  { name: 'Power BI', category: 'DevOps & Tools' },
  { name: 'Excel', category: 'DevOps & Tools' },

  { name: 'AWS', category: 'Cloud' },
  { name: 'Vercel', category: 'Cloud' },
  { name: 'Render', category: 'Cloud' },
];

export const EXPERIENCE = [
  {
    period: 'Dec 2024 – Present',
    company: 'PwC India',
    companyClass: 'pwc',
    current: true,
    badges: ['CURRENT'],
    role: 'AI & Cloud Application Development Trainee',
    bullets: [
      'Building production LLM architectures and GenAI pipelines for enterprise clients at scale.',
      'Developing RAG systems with hybrid retrieval, semantic re-ranking, and hallucination mitigation.',
      'Collaborating on cloud-native AI solutions using Azure OpenAI and Google Cloud AI Platform.',
      'Contributing to responsible AI frameworks and model evaluation benchmarks.',
    ],
    tech: ['LangChain', 'Azure OpenAI', 'Python', 'FastAPI', 'Docker'],
  },
  {
    period: 'Aug 2023 – Present',
    company: 'ANOVA MUJ',
    companyClass: 'anova',
    current: false,
    badges: ['LEADERSHIP'],
    role: 'Vice Chairperson — Data Science & Engineering Club',
    bullets: [
      'Leading technical initiatives for 500+ member data science community at Manipal University Jaipur.',
      'Organized 15+ workshops, hackathons, and industry speaker sessions on AI/ML topics.',
      'Mentored 50+ students through end-to-end ML project development and research.',
      'Built the club\'s analytics dashboard tracking member engagement and event metrics.',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Python', 'D3.js'],
  },
];

export const ACHIEVEMENTS = [
  {
    id: 'aic-incubation-support',
    icon: 'trophy',
    title: 'AIC Incubation Support',
    description: 'Selected for Atal Incubation Centre support for an AI-driven healthcare startup, with mentorship, funding access, and lab resources.',
    year: '2025',
    domain: 'AI + Healthcare',
    highlights: [
      { label: 'Program', value: 'Incubation' },
      { label: 'Support', value: 'Funding + Labs' },
    ],
    tags: ['Startup', 'Mentorship', 'Healthcare AI'],
  },
  {
    id: 'published-patent',
    icon: 'patent',
    title: 'Published Patent',
    description: 'Granted patent for a novel method in automated medical image segmentation using attention-based neural networks.',
    year: '2024',
    domain: 'Medical Imaging',
    highlights: [
      { label: 'Status', value: 'Granted' },
      { label: 'Method', value: 'Attention Nets' },
    ],
    tags: ['Patent', 'Research', 'Computer Vision'],
  },
  {
    id: 'research-publications',
    icon: 'research',
    title: '2 Research Publications',
    description: 'Author of 2 peer-reviewed papers in IEEE and Springer journals focused on medical AI and computer vision.',
    year: '2024',
    domain: 'Medical AI + CV',
    highlights: [
      { label: 'Papers', value: '2' },
      { label: 'Venues', value: 'IEEE + Springer' },
    ],
    tags: ['Research', 'Peer Reviewed', 'Medical AI'],
  },
];

export const PUBLICATIONS = [
  {
    id: 'patent-immersion-cooling',
    type: 'patent',
    year: '2025',
    title: 'AI-driven & PCM-based Immersion Cooling for Data Centres',
    details: 'Patent Published (No. 202511056772)',
    issued: 'Issued: June 27, 2025',
    highlights: [
      'AI-based dynamic cooling optimization',
      'PCM-based immersion cooling system',
      'Reduced PUE and energy consumption',
      'Scalable for AI/ML infrastructure',
    ],
    venue: 'Patent Publication',
    status: 'Patent',
    statusLabel: 'PATENT GRANTED',
    link: '#',
  },
  {
    id: 'adhd-vit-systematic-review',
    type: 'paper',
    year: '2025',
    title: 'ADHD Classification Using Vision Transformers and Deep Learning: A Systematic Review of Neuroimaging-Based Diagnostic Approaches',
    details: 'Under Review (IEEE Access)',
    venue: 'IEEE Access',
    status: 'Under Review',
    link: '#',
  },
  {
    id: 'vertically-integrated-data-centre-architecture',
    type: 'paper',
    year: '2025',
    title: 'Vertically Integrated Data Centre System with CFD-Based Cooling, Cryogenic Storage, and Quantum-Secure Architecture: A Paradigm Shift in Sustainable Computing Infrastructure',
    details: 'Under Review (IEEE Access)',
    venue: 'IEEE Access',
    status: 'Under Review',
    link: '#',
  },
];
