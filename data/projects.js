const projectsData = [
  {
    slug: "smart-flema",
    categories: ["Competition", "Production"],
    title: "Smart Flema",
    color: "emerald",
    imageUrl: "pic/1.png",
    shortDescription: "Camera-based foot traffic heatmap system for street markets and walking street events.",
    fullDescription: `Smart Flema started as a spin-off from the Smart City Lampang project. While working on that city-wide platform, I noticed that the foot traffic tracking concept had a sharper, more focused use case — Thailand's booming walking street markets and outdoor events.

The idea was simple: if we could show market operators exactly where crowds gather and how long they stay, those operators could price rental spots more fairly, rearrange layouts for better flow, and ultimately increase the market's value for both vendors and visitors.

I took the camera-based heatmap approach from the Smart City work and refined it specifically for market environments — smaller scale, more actionable data for non-technical operators.`,
    problemSolved: "Market and event operators rely on guesswork to price vendor spots and manage crowd flow. There's no data to back decisions, leading to unfair pricing and poor layout planning.",
    keyLearnings: [
      "Scaling a proven concept from one domain (city management) into a focused niche (street markets).",
      "Pitching in English under time pressure at an international competition.",
      "Research depth matters — some jury questions exposed gaps in our preparation, and that taught me to dig deeper before presenting."
    ],
    techStack: ["AI", "Computer Vision", "Analytics", "Python"],
    role: "Idea Initiator · Research & Prototype Design",
    context: "3rd ICT Startup Competition 2026 — International College of Technology, Kanazawa",
    result: "Won the Popular Vote award. Learned that while the idea resonated with the audience, deeper research would have strengthened answers to technical jury questions.",
    githubUrl: "",
    liveUrl: "",
    canvaUrl: "https://canva.link/u9lpz7fzu9wihek",
  },
  {
    slug: "smart-city-lampang",
    categories: ["Production", "Academic"],
    title: "Smart City Management Platform",
    color: "violet",
    imageUrl: "",
    shortDescription: "Real-world city management platform built for Lampang Municipality using CCTV, AI, and environmental data.",
    fullDescription: `This is a production platform built for Lampang Municipality in collaboration with Pyramid Solution — not a classroom simulation, but a real system with real stakeholders.

My role was dual: as Project Manager, I coordinated between our university team, the municipal staff, and the company partner. I sat in requirement meetings, compiled specifications, and kept the communication flowing between people who speak very different professional languages. As a developer, I personally built the frontend dashboard and integrated the LINE OA notification API so city staff could receive real-time alerts.

This was my first time managing a project of this scale, and honestly, I struggled with it. Delegating tasks effectively, keeping teammates on schedule, and making architectural decisions without prior experience were all new challenges. I had to teach myself project management on the fly while simultaneously writing code.`,
    problemSolved: "City staff at Lampang Municipality relied on visual estimation to assess public area usage. They needed quantifiable data from CCTV, weather sensors, and air quality monitors to make faster, evidence-based decisions.",
    keyLearnings: [
      "First real experience as a Project Manager — learned that managing people is harder than managing code.",
      "Gathering requirements from non-technical municipal stakeholders and translating them into software specs.",
      "Self-teaching project management methodology while executing the project simultaneously.",
      "The People Counting module remained incomplete — a lesson in scoping realistic deliverables."
    ],
    techStack: ["IoT", "AI", "Smart City", "LINE API", "JavaScript"],
    role: "Project Manager · Frontend Developer",
    context: "CAMT CMU · with Pyramid Solution · Academic Year 2025",
    result: "Delivered a functional web dashboard with LINE OA integration. The municipality gave positive feedback on the concept, though the People Counting AI module was not fully operational by deadline.",
    githubUrl: "https://github.com/Floridae242/FORLP.git",
    liveUrl: "https://forlp-bams.vercel.app/",
    canvaUrl: "https://canva.link/454emqxa8jc1alh",
  },
  {
    slug: "agrilink",
    categories: ["Competition", "Academic"],
    title: "AgriLink Agriculture Platform",
    color: "amber",
    imageUrl: "",
    shortDescription: "Hackathon prototype connecting farmers directly with buyers via AI, IoT, and QR Code traceability.",
    fullDescription: `AgriLink was born during the Hylife Hackathon 2025 at CAMT. In a team of five, I proposed the core idea and then built the entire working prototype myself — frontend, backend integration, and the QR code tracing flow.

The platform tackles a real problem in Thai agriculture: buyers have no reliable way to verify where their food comes from, and farmers lose significant produce due to poor logistics after harvest. AgriLink gives each product a QR code identity that traces its journey from farm to buyer, supported by IoT sensors and AI-driven logistics suggestions.

This was my first time building a complete prototype from scratch on my own, and my first experience with "vibe coding" — moving fast, making decisions on instinct, and shipping something that works within hours rather than days.`,
    problemSolved: "Thai agricultural supply chains lack transparency. Buyers cannot verify crop origin, and farmers face significant post-harvest losses from poor cold-chain logistics.",
    keyLearnings: [
      "Building a complete working prototype solo for the first time under hackathon pressure.",
      "First experience with rapid 'vibe coding' — prioritizing shipping over perfection.",
      "Learned to be honest about projected numbers — our '30% reduction' figure was an aspirational estimate, not measured data."
    ],
    techStack: ["AI", "IoT", "QR Code", "Firebase", "JavaScript"],
    role: "Idea Proposer · Sole Prototype Developer",
    context: "Hylife Hackathon 2025 — Code For Change, CAMT CMU",
    result: "Delivered a fully functional prototype deployed on Firebase within the hackathon timeframe. First solo prototype and first vibe-coded project.",
    githubUrl: "https://github.com/Floridae242/agrilink.git",
    liveUrl: "https://agrilink-7a2f4.web.app",
    canvaUrl: "https://canva.link/uumc0gdd6lnff77",
  },
  {
    slug: "web3-mesh-network",
    categories: ["Open Source", "Academic"],
    title: "Decentralized IoT Communication System",
    color: "sky",
    imageUrl: "",
    shortDescription: "Local peer-to-peer communication system for disaster scenarios using ESP32 mesh networking.",
    fullDescription: `Built as part of the WEB3 Student Club at CAMT, this project creates a communication system that works without internet — designed for scenarios like natural disasters where centralized infrastructure collapses.

The system uses ESP32 microcontrollers communicating in a peer-to-peer mesh network. Each device has its own cryptographic identity using public/private key pairs, so messages can be verified and trusted even without a central authority.

I worked with both Arduino IDE and PlatformIO, and was responsible for building Station 1 (the primary communication node) and the Reset Station (the recovery/reinitialization node). At CAMT FEST, I served as the team's demo presenter — explaining the system architecture and walking visitors through the live demonstration.`,
    problemSolved: "Centralized communication infrastructure (cell towers, internet) fails during natural disasters, leaving affected communities completely isolated.",
    keyLearnings: [
      "Programming ESP32 devices in C++ across two different IDEs (Arduino IDE and PlatformIO).",
      "Understanding basic cryptography for device identity and message verification.",
      "Presenting technical concepts to non-technical CAMT FEST visitors clearly."
    ],
    techStack: ["IoT", "ESP32", "C++", "PlatformIO", "Arduino"],
    role: "Developer · Demo Presenter",
    context: "WEB3 Student Club — CAMT CMU · CAMT FEST Exhibition · Academic Year 2025",
    result: "Delivered a working mesh communication system demonstrated live at CAMT FEST. Successfully sent verified messages between ESP32 nodes without internet connectivity.",
    githubUrl: "https://github.com/Floridae242/Web3-Student-Club-Showcase.git",
    liveUrl: "https://heyzine.com/flip-book/6c7e35871a.html",
    canvaUrl: "https://canva.link/bqrbrg4pstikokp",
  },
  {
    slug: "library-management-system",
    categories: ["Academic", "Personal"],
    title: "Library Management System",
    color: "rose",
    imageUrl: "",
    shortDescription: "Java OOP system with full CRUD, CSV persistence, and polymorphic late-fee calculation.",
    fullDescription: `A library management system built in Java as a post-midterm coursework project. While it was a team assignment, I personally wrote approximately 80% of the codebase.

The system manages members, physical books, and digital media with a comprehensive feature set: CRUD operations for members and media, borrowing/returning workflows, overdue reports, and most-borrowed analytics. Data persists across sessions using CSV file I/O for members, media, and loan records.

The design received specific praise from the instructor: the method overloading was described as "well-designed with meaningful distinctions" — Book's calculateLateFee handles both standard and premium-member cases, while DigitalMedia's version factors in download counts. The LibraryService interface enforces 14 methods across all CRUD and reporting functions, and InputValidator was recognized as a cleanly separated utility class.

The instructor also identified clear areas for improvement: the inheritance hierarchy is shallow (only two levels), the loan persistence doesn't correctly restore dates from CSV, and the code lacks Javadoc documentation — making Stream API usage in LibraryManager harder to follow.`,
    problemSolved: "Coursework challenge: design a complex class hierarchy that accurately mirrors a real-world lending library while demonstrating all four OOP pillars.",
    keyLearnings: [
      "Designing meaningful method overloading — not just different parameter counts, but genuinely different business logic per overload.",
      "Building a 14-method interface (LibraryService) taught me how contracts enforce completeness.",
      "Instructor feedback showed that shallow inheritance and missing documentation are professional-level concerns, not just academic ones.",
      "Taking on 80% of a team project taught me about workload balance and the importance of delegation."
    ],
    techStack: ["Java", "OOP", "Maven", "CSV I/O"],
    role: "Lead Developer (80% of codebase)",
    context: "OOP Post-Midterm Project — CAMT CMU · Academic Year 2026",
    result: "Received instructor recognition for overloading design, interface comprehensiveness, and input validation architecture. Key improvement areas: deeper inheritance, accurate date persistence, and Javadoc coverage.",
    githubUrl: "https://github.com/Floridae242/OOP-Post-Midterm-Project.git",
    liveUrl: "",
    canvaUrl: "",
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
