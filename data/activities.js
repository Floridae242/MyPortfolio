const activitiesData = [
  {
    id: 1,
    activityName: "WEB3 Student Club",
    role: "Developer · Demo Presenter",
    period: "Academic Year 2025",
    description: "Built decentralized mesh communication system using ESP32. Presented live demo at CAMT FEST exhibition.",
    imageUrl: null,
    softSkills: ["Teamwork", "Adaptability", "Problem-solving", "Public Speaking"]
  },
  {
    id: 2,
    activityName: "Deepa Coding Thailand — Teaching Assistant",
    role: "Coding Instructor",
    period: "2025",
    description: "Taught high school and elementary school students to write their first lines of code. Translated complex programming concepts into language that kids can understand and enjoy.",
    imageUrl: null,
    softSkills: ["Communication", "Emotional Intelligence", "Mentorship", "Patience"]
  },
  // ──────────────────────────────────────────────
  // 📌 HOW TO ADD A NEW ACTIVITY:
  // Copy the template below, fill in your details, and paste it above this comment.
  //
  // {
  //   id: 3,
  //   activityName: "Your Activity Name",
  //   role: "Your Role (e.g., Volunteer, President, Organizer)",
  //   period: "2025",
  //   description: "One or two sentences about what you did and what you learned.",
  //   imageUrl: "pic/your-image.jpg",   // or null if no image
  //   softSkills: ["Skill1", "Skill2", "Skill3"]
  // },
  // ──────────────────────────────────────────────
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = activitiesData;
}
