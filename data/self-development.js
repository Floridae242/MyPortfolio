const selfDevelopmentData = [
  {
    id: 1,
    type: "Certification",
    title: "AWS Certified Cloud Practitioner",
    institution: "Amazon Web Services",
    date: "2025-03-15",
    credentialUrl: "https://aws.amazon.com/verification",
    imageUrl: null  // Add path like "pic/certs/aws-cert.jpg" when you have the image
  },
  {
    id: 2,
    type: "Certification",
    title: "Google Cloud Associate Cloud Engineer",
    institution: "Google Cloud",
    date: "2025-02-20",
    credentialUrl: "https://cloud.google.com/certification",
    imageUrl: null
  },
  {
    id: 3,
    type: "Workshop",
    title: "Agile Project Management Seminar",
    institution: "Chiang Mai Technology Hub",
    date: "2024-09-05",
    credentialUrl: null,
    imageUrl: null
  },
  {
    id: 4,
    type: "Certification",
    title: "Advanced JavaScript Development",
    institution: "Codecademy",
    date: "2024-11-10",
    credentialUrl: null,
    imageUrl: null
  },
  // ──────────────────────────────────────────────
  // 📌 HOW TO ADD A NEW CERTIFICATE OR WORKSHOP:
  //
  // 1. Put your certificate image inside the "pic/certs/" folder
  //    (create the folder if it doesn't exist)
  //
  // 2. Copy the template below, fill in your details, and paste it
  //    above this comment block:
  //
  // {
  //   id: 5,
  //   type: "Certification",          // or "Workshop" or "Seminar"
  //   title: "Your Certificate Title",
  //   institution: "Issuing Organization",
  //   date: "2026-01-15",             // YYYY-MM-DD format
  //   credentialUrl: "https://...",    // or null if no online verification link
  //   imageUrl: "pic/certs/your-cert-image.jpg"  // or null if no image
  // },
  //
  // 3. Supported imageUrl formats:
  //    - Local file:  "pic/certs/my-cert.jpg"
  //    - Online URL:  "https://example.com/cert.png"
  //    - No image:    null
  //
  // 4. That's it — refresh the page and your new entry will appear!
  // ──────────────────────────────────────────────
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = selfDevelopmentData;
}
