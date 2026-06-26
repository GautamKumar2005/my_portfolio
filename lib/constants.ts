export const PROFILE = {
  name: "Gautam Kumar",
  title: "Software Developer & AI Engineer",
  subtitle: "DTU | 2027 Graduate",
  description:
    "Passionate about building scalable applications and exploring AI/ML. Competitive programmer with a keen interest in full-stack development.",
  image: "https://avatars.githubusercontent.com/u/YOUR_GITHUB_ID",
};

export const LINKS = {
  github: "https://github.com/GautamKumar2005",
  linkedin: "https://www.linkedin.com/in/gautam-kumar-489903281/",
  leetcode: "https://leetcode.com/u/GautamKumar_code/",
  codechef: "https://www.codechef.com/users/gaut_code2005",
  codeforces: "https://codeforces.com/profile/Galacti_",
  geeksforgeeks: "https://www.geeksforgeeks.org/profile/gautamgkdz",
  codolio: "https://codolio.com/profile/Gautam_coder2005",
  email: "gautam@example.com", // Update with your email
};

export const SKILLS = {
  languages: ["C", "C++", "TypeScript", "JavaScript (ES6+)", "Python", "SQL"],
  aiml: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "OpenCV", "YOLO"],
  deeplearning: [
    "Transformers",
    "CNNs",
    "RNNs",
    "LSTMs",
    "ANNs",
    "Word2Vec",
    "Gensim",
  ],
  frontend: ["Next.js", "React.js", "Tailwind CSS", "HTML5", "CSS3"],
  backend: ["Node.js", "Express.js", "REST APIs", "MongoDB", "MySQL", "PostgreSQL", "Supabase"],
  tools: ["Git", "GitHub", "Postman", "VS Code", "Linux (Ubuntu)", "WSL"],
  design: ["Figma", "Canva", "Draw.io", "UML Diagrams"],
  ai: ["Claude Code", "OpenAI APIs", "Gemini APIs"],
  fundamentals: ["Operating Systems", "DBMS", "OOP", "Computer Networks", "DSA"],
};

export const EDUCATION = {
  school: "Delhi Technological University",
  degree: "B.Tech in Software Engineering",
  year: "2027",
  location: "Delhi, India",
  cgpa: "8.52",
  link: "https://www.google.com/maps/place/Delhi+Technological+University/@28.7500684,77.1053391,2305m/data=!3m1!1e3!4m15!1m8!3m7!1s0x390d0127947c9d65:0x12ce9ec01b812d4e!2sDelhi+Technological+University,+Shahbad+Daulatpur+Village,+Rohini,+Delhi,+110042!3b1!8m2!3d28.7499867!4d77.1183137!16s%2Fg%2F1pv1y63s8!3m5!1s0x390d0138a74f7da7:0xf09fad683c23bd5d!8m2!3d28.7486085!4d77.1172002!16zL20vMGI1ajdq?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D",
};

export const SOCIAL_PROFILES = [
  {
    name: "LeetCode",
    icon: "code",
    url: LINKS.leetcode,
    color: "from-yellow-500 to-orange-500",
    stats: "Competitive Programming",
  },
  {
    name: "CodeChef",
    icon: "code2",
    url: LINKS.codechef,
    color: "from-amber-500 to-orange-600",
    stats: "Problem Solving",
  },
  {
    name: "Codeforces",
    icon: "zap",
    url: LINKS.codeforces,
    color: "from-blue-500 to-cyan-500",
    stats: "Algorithm Contests",
  },
  {
    name: "GeeksforGeeks",
    icon: "book",
    url: LINKS.geeksforgeeks,
    color: "from-green-500 to-emerald-600",
    stats: "Learning & Tutorials",
  },
  {
    name: "GitHub",
    icon: "github",
    url: LINKS.github,
    color: "from-slate-700 to-slate-900",
    stats: "All Projects & Code",
  },
  {
    name: "Codolio",
    icon: "codolio",
    url: LINKS.codolio,
    color: "from-fuchsia-500 to-purple-600",
    stats: "Coding Analytics",
  },
];

export const PROJECT_OVERRIDES: Record<string, { description: string[]; techStack: string[]; homepage?: string }> = {
  "insipreShop": {
    description: [
      "Architected a high-throughput, full-stack ecosystem integrating an e-commerce engine with a social hub, facilitating seamless, sub-100ms real-time interactions for over 1,000+ simulated concurrent users.",
      "Engineered a hybrid database architecture utilizing MongoDB for high-speed, flexible product indexing alongside Supabase (PostgreSQL) for structured authentication, reducing data redundancy by 25% and ensuring 100% data integrity.",
      "Integrated real-time communication protocols using Socket.io to handle instant push notifications and live messaging, which boosted simulated user engagement and platform responsiveness by 40%.",
      "Optimized frontend performance metrics via Next.js server-side rendering (SSR) and Tailwind CSS code-splitting, achieving an elite Lighthouse score of 96 and an industry-leading Largest Contentful Paint (LCP) of 0.9 seconds."
    ],
    techStack: ["Next.js", "React.js", "Node.js", "MongoDB", "PostgreSQL", "Supabase", "Socket.io", "Tailwind CSS", "Cloudinary", "JWT", "REST APIs"],
    homepage: "https://insipreshop.vercel.app/"
  },
  "CuisineAI-Food-Image-to-Recipe-Generation": {
    description: [
      "Developed and deployed an end-to-end AI application using Flask and Next.js that automates complex multi-class food classification and instantly generates structured culinary recipes from user-uploaded images.",
      "Built a custom deep learning pipeline using PyTorch and Torchvision, leveraging transfer learning on advanced convolutional architectures to achieve a 94% validation accuracy through hyperparameter tuning and rigorous data augmentation.",
      "Streamlined inference workflows by implementing real-time image preprocessing and matrix transformations using NumPy and Pillow, reducing model inference latency by 35%.",
      "Designed a responsive frontend architecture using Next.js and TypeScript, incorporating secure asynchronous REST API boundaries to handle heavy payload deliveries and provide an ultra-smooth UX."
    ],
    techStack: ["PyTorch", "Torchvision", "Flask", "Next.js", "TypeScript", "NumPy", "Pillow", "REST APIs", "Matplotlib", "gdown"],
    homepage: "https://gkumar2005-cuisineai.hf.space/"
  },
  "PTX-Analyzer-Static-Analysis-Optimization-Tool-for-GPU-Kernels": {
    description: [
      "Architected a high-performance static analysis engine in C++ to parse and analyze NVIDIA PTX (Parallel Thread Execution) ISA, simulating compiler backend front-end tasks and generating reports prior to PTXAS assembly.",
      "Developed a robust Control Flow Graph (CFG) generator using custom graph traversal algorithms to map execution paths, facilitating data-flow analysis and the identification of unreachable code within GPU kernels.",
      "Engineered a SIMT-aware heuristic engine to detect Warp Divergence, flagging non-uniform control flow patterns that trigger thread serialization and significantly degrade parallel throughput and performance.",
      "Quantified hardware-level resource constraints by calculating Instruction Mix (Arithmetic vs. Memory) and estimating Register Pressure, enabling developers to model and optimize Streaming Multiprocessor (SM) occupancy."
    ],
    techStack: ["C++", "PTX ISA", "LLVM IR", "Graph Theory", "Compiler Design", "Linux/WSL", "GDB"]
  },
  "QuantEdge": {
    description: [
      "Spearheaded the creation of a high-frequency financial platform utilizing Next.js and FastAPI, delivering real-time options pricing and risk assessment through a low-latency, Bloomberg-inspired RESTful interface.",
      "Leveraged C++ to build high-performance quantitative engines, including Black-Scholes, Monte Carlo simulations, and Binomial Trees to ensure sub-millisecond valuation accuracy for complex derivatives.",
      "Integrated a predictive Machine Learning pipeline via Scikit-Learn (Random Forest, K-Means) to evaluate Option Greeks, automating trade success forecasting and algorithmic risk categorization.",
      "Orchestrated multi-dimensional data visualizations using Plotly.js, converting complex volatility trends and 3D risk surfaces into actionable insights for data-driven financial decision-making."
    ],
    techStack: ["C++", "Next.js", "FastAPI", "Python", "Scikit-Learn", "NumPy", "Pandas", "Plotly.js", "Docker", "yfinance"],
    homepage: "https://gkumar2005-quantdetermine.hf.space/dashboard"
  },
  "AI_Driven_Solutions_for_farmers_in_India": {
    description: [
      "Developed a scalable AI platform using MERN stack, Python, and ML/DL frameworks including TensorFlow, Keras, and PyTorch, successfully tested by 50+ users in real-world agricultural environments.",
      "Integrated YOLOv8, OpenCV, PaddleOCR, Weather API, and drone data to enable precise crop monitoring and pesticide detection, achieving 72.89% accuracy.",
      "Designed and deployed intelligent AI agents powered by Google Gemini API and Vertex AI to provide real time farming recommendations and automate decision-making processes."
    ],
    techStack: ["MERN", "Python", "YOLOv8", "OpenCV", "PaddleOCR", "TensorFlow", "PyTorch", "Keras", "REST APIs", "Google Gemini API", "Vercel"],
    homepage: "https://agriconnect-k5uz.onrender.com/"
  },
  "Vehicle-Number-plate-detection": {
    description: [
      "Built a real-time AI number plate detection system with 89.89% accuracy across diverse traffic and lighting conditions, improving vehicle identification efficiency.",
      "Achieved 89.89% accuracy across varied traffic and lighting conditions; deployed with Streamlit UI and Ngrok for secure remote access.",
      "Demonstrated expertise in computer vision, deep learning, and real-time AI deployment using a robust multi-framework tech stack."
    ],
    techStack: ["Python", "YOLOv8", "PaddleOCR", "OpenCV", "TensorFlow", "PyTorch", "Streamlit", "Flask", "Ngrok", "Scikit-learn"],
    homepage: "https://gautampython.streamlit.app/"
  }
};
