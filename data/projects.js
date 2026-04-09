const projectsData = [
  {
    slug: "smart-flema",
    title: "Smart Flema",
    color: "emerald",
    imageUrl: "pic/1.png",
    shortDescription:
      "A camera-based system for street markets that creates heatmaps of foot traffic. Helps market managers figure out the best spots and set fair rental prices. Currently in the idea-pitching stage for the ICT Startup Competition 2026.",
    fullDescription: `Smart Flema is a smart system designed for street markets and events. It uses cameras to track how people walk and move around, then creates a "heatmap" to show busy areas and quiet areas. It also checks how long people stay in one place.

The idea came from my earlier work on the Smart City Lampang project, where we used CCTV and AI people counting for a city municipality. I took the good parts from that experience and scaled them up into something specifically built for market operators and event organizers.

Why is it useful? It helps market managers know the best spots. They can change rental prices based on actual foot traffic data, make more money, and prevent areas from getting too crowded. Instead of guessing which spots are popular, they get real numbers.

Right now, Smart Flema is in the idea-pitching stage for the 3rd ICT Startup Competition 2026 at the International College of Technology, Kanazawa. I'm one of the people who started and proposed this idea.`,
    techStack: ["AI", "Computer Vision", "Analytics", "Python"],
    role: "Idea Initiator",
    context: "3rd ICT Startup Competition 2026 — International College of Technology, Kanazawa",
    githubUrl: "",
    liveUrl: "",
    canvaUrl: "https://canva.link/u9lpz7fzu9wihek",
  },
  {
    slug: "smart-city-lampang",
    title: "Smart City Management Platform",
    color: "violet",
    shortDescription:
      "A system that uses real data to help manage public areas and support better decisions. Built with CCTV, AI people counting, weather, and air quality data.",
    fullDescription: `This project is a platform to manage public areas using real data, built for Lampang Municipality in collaboration with Pyramid Solution.

City staff needed real data to manage public areas. The old method used guessing and was not accurate. We worked with the team and clients to collect requirements and helped develop a platform using CCTV, people counting AI, weather data, and air quality data. The system sends notifications through LINE OA and shows real-time information.

The main goal is to help the municipality make better decisions by using real information instead of guessing. Instead of estimating how busy a park is, they can check actual numbers. Instead of reacting to bad air quality after complaints, they can see it in real-time and act early.

I took on the role of Project Manager and Developer for this project. My responsibility was to gather and analyze requirements from the clients — Lampang Municipality and Pyramid Solution — in order to develop the solution further. It was my first real PM role, and I learned a lot about talking to clients and translating their needs into technical specifications.

This project later evolved into Smart Flema, where I took the concepts of camera-based analytics and applied them specifically to street markets and events.`,
    techStack: ["IoT", "AI", "Smart City", "Data System"],
    role: "Project Manager, Developer",
    context: "CAMT CMU · with Pyramid Solution · Academic Year 2025",
    githubUrl: "https://github.com/Floridae242/FORLP.git",
    liveUrl: "https://forlp-bams.vercel.app/",
    canvaUrl: "https://canva.link/454emqxa8jc1alh",
  },
  {
    slug: "agrilink",
    title: "AgriLink Agriculture Platform",
    color: "amber",
    shortDescription:
      "A platform that connects farmers and buyers and improves transparency in agriculture. Uses AI, IoT, and QR Code to track product source.",
    fullDescription: `AgriLink is an agriculture platform that helps solve the problem of low transparency in the Thai agricultural market. Farmers had low transparency and lost products after harvest. Buyers could not check product source.

We helped design and build a prototype using AI, IoT, and QR Code. The platform tracks product source and supports smart logistics and cold chain system so users can check where their food comes from. You scan a QR code on the produce and see where it was grown, when it was harvested, and how it was transported.

The cold chain tracking makes sure temperature-sensitive products stay fresh from farm to table, reducing post-harvest loss by more than 30%.

The goal is simple: create fairness for farmers who often get underpaid by middlemen, build trust for buyers who want to know what they're getting, and allow consumers to get fresh, clean, and safe food in a sustainable way.

I worked as a prototype developer and was one of the people who proposed the idea and solution for this project during the Hylife Hackathon 2025.`,
    techStack: ["AI", "IoT", "QR Code", "Platform"],
    role: "Prototype Developer",
    context: "Hylife Hackathon 2025 — Code For Change, CAMT CMU",
    githubUrl: "https://github.com/Floridae242/agrilink.git",
    liveUrl: "https://agrilink-7a2f4.web.app",
    canvaUrl: "https://canva.link/uumc0gdd6lnff77",
  },
  {
    slug: "web3-mesh-network",
    title: "Decentralized IoT Communication System",
    color: "sky",
    shortDescription:
      "Local communication system that works without internet using ESP32 devices. Works peer-to-peer — designed for disaster scenarios when centralized networks go down.",
    fullDescription: `This project comes from a real problem: normal communication systems fail when the internet is down during disasters. When centralized networks go down, people lose the ability to communicate right when they need it most.

Our solution is a local-first communication system using ESP32 microcontroller devices. The devices communicate in a peer-to-peer way and use keys for secure identity. The system can continue even if some nodes stop working.

Each device has its own cryptographic identity using private and public keys, so messages can be verified and trusted. The network can expand by itself as more nodes join, forming a self-healing mesh.

It's suitable for emergency situations like natural disasters, but it can also be used for IoT activities that need checking, such as rescue coordination or community social activities in remote areas.

I built this as part of the WEB3 Student Club at CAMT CMU. During November to December, I was on the Developer team creating this project for the CAMT FEST exhibition. We used C++ together with PlatformIO and Arduino IDE.`,
    techStack: ["IoT", "ESP32", "Embedded", "P2P"],
    role: "Developer",
    context: "WEB3 Student Club — CAMT CMU, Academic Year 2025",
    githubUrl: "https://github.com/Floridae242/Web3-Student-Club-Showcase.git",
    liveUrl: "https://heyzine.com/flip-book/6c7e35871a.html",
    canvaUrl: "https://canva.link/bqrbrg4pstikokp",
  },
  {
    slug: "library-management-system",
    title: "Library Management System",
    color: "rose",
    shortDescription:
      "A Java project covering the full OOP toolkit — encapsulation, inheritance, polymorphism, and abstraction. Manages members, books, digital media, and handles borrow/return with late fee calculations.",
    fullDescription: `This is a library management system built with Java as a coursework project. It demonstrates all four pillars of Object-Oriented Programming in a practical, working system.

The system can manage members and different types of media — both physical books and digital media. It has a full borrow and return system that checks if media is available and calculates late fees when items are returned past their due date.

Encapsulation: All variables are private. Users can't change data directly — they have to go through public getters and setters. The Member class stores member information safely this way.

Inheritance: The Book and DigitalMedia classes extend the Media class. They share common properties like id, title, and quantity, but each has their own special properties — Book has ISBN and pages, DigitalMedia has format and file size.

Polymorphism: Book and DigitalMedia override the calculateLateFee() method, so each type has a different way to calculate fees. There's also method overloading — the same method name can take different parameters.

Abstraction: Media is an abstract class (you can't create objects from it directly — it's a template). LibraryService is an interface that defines what the system should do, and LibraryManager implements it with the real code.

It's a coursework project, but the architecture turned out clean and I learned a lot about designing class hierarchies that actually make sense.`,
    techStack: ["Java", "OOP"],
    role: "Developer",
    context: "OOP Post-Midterm Project — CAMT CMU, Academic Year 2026",
    githubUrl: "https://github.com/Floridae242/OOP-Post-Midterm-Project.git",
    liveUrl: "",
    canvaUrl: "",
  },
];
