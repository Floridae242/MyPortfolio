import urllib.request
import json

SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZ2VvZ2FoaGF0eWJubGhtZ2J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY5NTE0OCwiZXhwIjoyMDkyMjcxMTQ4fQ.tOap3UMeUzmpy--Gwa_AJ7ZiYc96JoidQ6mOztYETDw"

headers = {
    'apikey': SERVICE_KEY,
    'Authorization': f'Bearer {SERVICE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates'
}

def upsert_data(table, data):
    req = urllib.request.Request(f'{SUPABASE_URL}/{table}', data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
    try:
        urllib.request.urlopen(req)
        print(f"✅ {table} migrated successfully.")
    except Exception as e:
        print(f"❌ Error migrating {table}: {e}")

projects = [
    {
        "slug": "smart-flema",
        "title": "Smart Flema",
        "categories": ["Competition", "Production"],
        "color": "emerald",
        "image_url": "/Users/floridae/Portfolio(Tle)/MyPortfolio/pic/1.png",
        "short_description": "Camera-based foot traffic heatmap system for street markets and walking street events.",
        "full_description": "Smart Flema started as a spin-off from the Smart City Lampang project. While working on that city-wide platform, I noticed that the foot traffic tracking concept had a sharper, more focused use case — Thailand's booming walking street markets and outdoor events.\n\nThe idea was simple: if we could show market operators exactly where crowds gather and how long they stay, those operators could price rental spots more fairly, rearrange layouts for better flow, and ultimately increase the market's value for both vendors and visitors.\n\nI took the camera-based heatmap approach from the Smart City work and refined it specifically for market environments — smaller scale, more actionable data for non-technical operators.",
        "problem_solved": "Market and event operators rely on guesswork to price vendor spots and manage crowd flow. There's no data to back decisions, leading to unfair pricing and poor layout planning.",
        "key_learnings": [
            "Scaling a proven concept from one domain (city management) into a focused niche (street markets).",
            "Pitching in English under time pressure at an international competition.",
            "Research depth matters — some jury questions exposed gaps in our preparation, and that taught me to dig deeper before presenting."
        ],
        "result": "Won the Popular Vote award. Learned that while the idea resonated with the audience, deeper research would have strengthened answers to technical jury questions.",
        "tech_stack": ["AI", "Computer Vision", "Analytics", "Python"],
        "role": "Idea Initiator · Research & Prototype Design",
        "context": "3rd ICT Startup Competition 2026 — International College of Technology, Kanazawa",
        "github_url": "",
        "live_url": "",
        "canva_url": "https://www.canva.com/design/DAHAwjtI2js/pLeUkjHuZftOEKlaI9b-cg/view"
    },
    {
        "slug": "smart-city-lampang",
        "title": "Smart City Management Platform",
        "categories": ["Production", "Academic"],
        "color": "violet",
        "image_url": "",
        "short_description": "Real-world city management platform built for Lampang Municipality using CCTV, AI, and environmental data.",
        "full_description": "This is a production platform built for Lampang Municipality in collaboration with Pyramid Solution — not a classroom simulation, but a real system with real stakeholders.\n\nMy role was dual: as Project Manager, I coordinated between our university team, the municipal staff, and the company partner. I sat in requirement meetings, compiled specifications, and kept the communication flowing between people who speak very different professional languages. As a developer, I personally built the frontend dashboard and integrated the LINE OA notification API so city staff could receive real-time alerts.\n\nThis was my first time managing a project of this scale, and honestly, I struggled with it. Delegating tasks effectively, keeping teammates on schedule, and making architectural decisions without prior experience were all new challenges. I had to teach myself project management on the fly while simultaneously writing code.",
        "problem_solved": "City staff at Lampang Municipality relied on visual estimation to assess public area usage. They needed quantifiable data from CCTV, weather sensors, and air quality monitors to make faster, evidence-based decisions.",
        "key_learnings": [
            "First real experience as a Project Manager — learned that managing people is harder than managing code.",
            "Gathering requirements from non-technical municipal stakeholders and translating them into software specs.",
            "Self-teaching project management methodology while executing the project simultaneously.",
            "The People Counting module remained incomplete — a lesson in scoping realistic deliverables."
        ],
        "result": "Delivered a functional web dashboard with LINE OA integration. The municipality gave positive feedback on the concept, though the People Counting AI module was not fully operational by deadline.",
        "tech_stack": ["IoT", "AI", "Smart City", "LINE API", "JavaScript"],
        "role": "Project Manager · Frontend Developer",
        "context": "CAMT CMU · with Pyramid Solution · Academic Year 2025",
        "github_url": "https://github.com/Floridae242/FORLP.git",
        "live_url": "https://forlp-bams.vercel.app/",
        "canva_url": "https://www.canva.com/design/DAHA_8bVZGI/6TzZAjO0C0O5ay2vCKerSw/view"
    },
    {
        "slug": "agrilink",
        "title": "AgriLink Agriculture Platform",
        "categories": ["Competition", "Academic"],
        "color": "amber",
        "image_url": "",
        "short_description": "Hackathon prototype connecting farmers directly with buyers via AI, IoT, and QR Code traceability.",
        "full_description": "AgriLink was born during the Hylife Hackathon 2025 at CAMT. In a team of five, I proposed the core idea and then built the entire working prototype myself — frontend, backend integration, and the QR code tracing flow.\n\nThe platform tackles a real problem in Thai agriculture: buyers have no reliable way to verify where their food comes from, and farmers lose significant produce due to poor logistics after harvest. AgriLink gives each product a QR code identity that traces its journey from farm to buyer, supported by IoT sensors and AI-driven logistics suggestions.\n\nThis was my first time building a complete prototype from scratch on my own, and my first experience with \"vibe coding\" — moving fast, making decisions on instinct, and shipping something that works within hours rather than days.",
        "problem_solved": "Thai agricultural supply chains lack transparency. Buyers cannot verify crop origin, and farmers face significant post-harvest losses from poor cold-chain logistics.",
        "key_learnings": [
            "Building a complete working prototype solo for the first time under hackathon pressure.",
            "First experience with rapid 'vibe coding' — prioritizing shipping over perfection.",
            "Learned to be honest about projected numbers — our '30% reduction' figure was an aspirational estimate, not measured data."
        ],
        "result": "Delivered a fully functional prototype deployed on Firebase within the hackathon timeframe. First solo prototype and first vibe-coded project.",
        "tech_stack": ["AI", "IoT", "QR Code", "Firebase", "JavaScript"],
        "role": "Idea Proposer · Sole Prototype Developer",
        "context": "Hylife Hackathon 2025 — Code For Change, CAMT CMU",
        "github_url": "https://github.com/Floridae242/agrilink.git",
        "live_url": "https://agrilink-7a2f4.web.app",
        "canva_url": "https://www.canva.com/design/DAGzJyHOtcM/qG6Y__Utl5yiouxGFGBZJQ/view"
    },
    {
        "slug": "web3-mesh-network",
        "title": "Decentralized IoT Communication System",
        "categories": ["Open Source", "Academic"],
        "color": "sky",
        "image_url": "",
        "short_description": "Local peer-to-peer communication system for disaster scenarios using ESP32 mesh networking.",
        "full_description": "Built as part of the WEB3 Student Club at CAMT, this project creates a communication system that works without internet — designed for scenarios like natural disasters where centralized infrastructure collapses.\n\nThe system uses ESP32 microcontrollers communicating in a peer-to-peer mesh network. Each device has its own cryptographic identity using public/private key pairs, so messages can be verified and trusted even without a central authority.\n\nI worked with both Arduino IDE and PlatformIO, and was responsible for building Station 1 (the primary communication node) and the Reset Station (the recovery/reinitialization node). At CAMT FEST, I served as the team's demo presenter — explaining the system architecture and walking visitors through the live demonstration.",
        "problem_solved": "Centralized communication infrastructure (cell towers, internet) fails during natural disasters, leaving affected communities completely isolated.",
        "key_learnings": [
            "Programming ESP32 devices in C++ across two different IDEs (Arduino IDE and PlatformIO).",
            "Understanding basic cryptography for device identity and message verification.",
            "Presenting technical concepts to non-technical CAMT FEST visitors clearly."
        ],
        "result": "Delivered a working mesh communication system demonstrated live at CAMT FEST. Successfully sent verified messages between ESP32 nodes without internet connectivity.",
        "tech_stack": ["IoT", "ESP32", "C++", "PlatformIO", "Arduino"],
        "role": "Developer · Demo Presenter",
        "context": "WEB3 Student Club — CAMT CMU · CAMT FEST Exhibition · Academic Year 2025",
        "github_url": "https://github.com/Floridae242/Web3-Student-Club-Showcase.git",
        "live_url": "https://heyzine.com/flip-book/6c7e35871a.html",
        "canva_url": "https://www.canva.com/design/DAG65HyKCrs/2HtsEpHytLT__9CyyQgRwA/view"
    },
    {
        "slug": "library-management-system",
        "title": "Library Management System",
        "categories": ["Academic", "Personal"],
        "color": "rose",
        "image_url": "",
        "short_description": "Java OOP system with full CRUD, CSV persistence, and polymorphic late-fee calculation.",
        "full_description": "A library management system built in Java as a post-midterm coursework project. While it was a team assignment, I personally wrote approximately 80% of the codebase.\n\nThe system manages members, physical books, and digital media with a comprehensive feature set: CRUD operations for members and media, borrowing/returning workflows, overdue reports, and most-borrowed analytics. Data persists across sessions using CSV file I/O for members, media, and loan records.\n\nThe design received specific praise from the instructor: the method overloading was described as \"well-designed with meaningful distinctions\" — Book's calculateLateFee handles both standard and premium-member cases, while DigitalMedia's version factors in download counts. The LibraryService interface enforces 14 methods across all CRUD and reporting functions, and InputValidator was recognized as a cleanly separated utility class.\n\nThe instructor also identified clear areas for improvement: the inheritance hierarchy is shallow (only two levels), the loan persistence doesn't correctly restore dates from CSV, and the code lacks Javadoc documentation — making Stream API usage in LibraryManager harder to follow.",
        "problem_solved": "Coursework challenge: design a complex class hierarchy that accurately mirrors a real-world lending library while demonstrating all four OOP pillars.",
        "key_learnings": [
            "Designing meaningful method overloading — not just different parameter counts, but genuinely different business logic per overload.",
            "Building a 14-method interface (LibraryService) taught me how contracts enforce completeness.",
            "Instructor feedback showed that shallow inheritance and missing documentation are professional-level concerns, not just academic ones.",
            "Taking on 80% of a team project taught me about workload balance and the importance of delegation."
        ],
        "result": "Received instructor recognition for overloading design, interface comprehensiveness, and input validation architecture. Key improvement areas: deeper inheritance, accurate date persistence, and Javadoc coverage.",
        "tech_stack": ["Java", "OOP", "Maven", "CSV I/O"],
        "role": "Lead Developer (80% of codebase)",
        "context": "OOP Post-Midterm Project — CAMT CMU · Academic Year 2026",
        "github_url": "https://github.com/Floridae242/OOP-Post-Midterm-Project.git",
        "live_url": "",
        "canva_url": ""
    }
]

certs = [
    {
        "type": "Hackathon",
        "title": "AMI HACKATHON",
        "institution": "College of Advanced Manufacturing Innovation (AMI), King Mongkut's Institute of Technology Ladkrabang (KMITL)",
        "date_issued": "2023-11-11",
        "credential_url": "",
        "image_url": "pic/certs/ami-hackathon.jpg"
    },
    {
        "type": "Competition",
        "title": "Computer Programming and Problem Solving Competition",
        "institution": "Department of Computer Engineering, Faculty of Engineering, King Mongkut's University of Technology Thonburi (KMUTT)",
        "date_issued": "2024-01-29",
        "credential_url": "",
        "image_url": "pic/certs/kmutt-programming.jpg"
    },
    {
        "type": "Competition/Workshop",
        "title": "Drone Swarm Programming and Light Show Design Workshop & Competition",
        "institution": "Radio Control Airplane Modellers Association (RCA) in collaboration with the National Research Council of Thailand (NRCT)",
        "date_issued": "2023-03-06",
        "credential_url": "",
        "image_url": "pic/certs/drone-programming.jpg"
    },
    {
        "type": "Camp",
        "title": "The 14th CLICKCAMP (Computer Engineering Camp)",
        "institution": "Department of Computer Engineering, Faculty of Engineering, Mahidol University",
        "date_issued": "2024-01-04",
        "credential_url": "",
        "image_url": "pic/certs/clickcamp-14.jpg"
    },
    {
        "type": "Workshop",
        "title": "Workshop on \"Generative AI for Web Application\"",
        "institution": "College of Arts, Media and Technology (CAMT), Chiang Mai University",
        "date_issued": "2024-08-17",
        "credential_url": "",
        "image_url": "pic/certs/gen-ai-web.jpg"
    },
    {
        "type": "Competition",
        "title": "The 70th Student Arts and Crafts Festival (Academic Year 2022), Educational Service Area Level",
        "institution": "Secondary Educational Service Area Office Sukhothai",
        "date_issued": "2022-09-12",
        "credential_url": "",
        "image_url": "pic/certs/art-craft-70.jpg"
    },
    {
        "type": "Competition",
        "title": "The 71st Student Arts and Crafts Festival (Academic Year 2023), Educational Service Area Level",
        "institution": "Secondary Educational Service Area Office Sukhothai",
        "date_issued": "2023-09-14",
        "credential_url": "",
        "image_url": "pic/certs/art-craft-71.jpg"
    },
    {
        "type": "Workshop",
        "title": "Workshop on \"Technology Skills Development\"",
        "institution": "Thung Saliam Chanupatham School",
        "date_issued": "2023-01-07",
        "credential_url": "",
        "image_url": "pic/certs/tech-skills-school.jpg"
    }
]

awards = [
    {
        "category": "Winner",
        "title": "1st Place - Smart City Hackathon",
        "organization": "Lampang Municipality",
        "date": "2025-06-15",
        "description": "Developed the best smart city solution focusing on data transparency."
    },
    {
        "category": "Popular Vote",
        "title": "Popular Vote - Smart Flema",
        "organization": "3rd ICT Startup Competition - International College of Technology, Kanazawa",
        "date": "2026-02-20",
        "description": "Smart street market foot-traffic analytics platform."
    }
]

activities = [
    {
        "activity_name": "WEB3 Student Club",
        "role": "Developer · Demo Presenter",
        "period": "Academic Year 2025",
        "description": "Built decentralized mesh communication system using ESP32. Presented live demo at CAMT FEST exhibition.",
        "image_url": "",
        "soft_skills": ["Teamwork", "Adaptability", "Problem-solving", "Public Speaking"]
    },
    {
        "activity_name": "Deepa Coding Thailand — Teaching Assistant",
        "role": "Coding Instructor",
        "period": "2025",
        "description": "Taught high school and elementary school students to write their first lines of code. Translated complex programming concepts into language that kids can understand and enjoy.",
        "image_url": "",
        "soft_skills": ["Communication", "Emotional Intelligence", "Mentorship", "Patience"]
    }
]

upsert_data('projects', projects)
upsert_data('certificates', certs)
upsert_data('awards', awards)
upsert_data('activities', activities)
