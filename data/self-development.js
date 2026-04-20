const selfDevelopmentData = [
  {
    id: 1,
    type: "Hackathon",
    title: "AMI HACKATHON",
    institution: "College of Advanced Manufacturing Innovation (AMI), King Mongkut's Institute of Technology Ladkrabang (KMITL)",
    date: "2023-11-11", // Nov 2023
    credentialUrl: null,
    imageUrl: "pic/certs/ami-hackathon.jpg"
  },
  {
    id: 2,
    type: "Competition",
    title: "Computer Programming and Problem Solving Competition",
    institution: "Department of Computer Engineering, Faculty of Engineering, King Mongkut's University of Technology Thonburi (KMUTT)",
    date: "2024-01-29", // Jan 2024
    credentialUrl: null,
    imageUrl: "pic/certs/kmutt-programming.jpg"
  },
  {
    id: 3,
    type: "Competition/Workshop",
    title: "Drone Swarm Programming and Light Show Design Workshop & Competition",
    institution: "Radio Control Airplane Modellers Association (RCA) in collaboration with the National Research Council of Thailand (NRCT)",
    date: "2023-03-06", // Mar 2023
    credentialUrl: null,
    imageUrl: "pic/certs/drone-programming.jpg"
  },
  {
    id: 4,
    type: "Camp",
    title: "The 14th CLICKCAMP (Computer Engineering Camp)",
    institution: "Department of Computer Engineering, Faculty of Engineering, Mahidol University",
    date: "2024-01-04", // Jan 2024
    credentialUrl: null,
    imageUrl: "pic/certs/clickcamp-14.jpg"
  },
  {
    id: 5,
    type: "Workshop",
    title: "Workshop on \"Generative AI for Web Application\"",
    institution: "College of Arts, Media and Technology (CAMT), Chiang Mai University",
    date: "2024-08-17", // Aug 2024
    credentialUrl: null,
    imageUrl: "pic/certs/gen-ai-web.jpg"
  },
  {
    id: 6,
    type: "Competition",
    title: "The 70th Student Arts and Crafts Festival (Academic Year 2022), Educational Service Area Level",
    institution: "Secondary Educational Service Area Office Sukhothai",
    date: "2022-09-12", // Sep 2022
    credentialUrl: null,
    imageUrl: "pic/certs/art-craft-70.jpg"
  },
  {
    id: 7,
    type: "Competition",
    title: "The 71st Student Arts and Crafts Festival (Academic Year 2023), Educational Service Area Level",
    institution: "Secondary Educational Service Area Office Sukhothai",
    date: "2023-09-14", // Sep 2023
    credentialUrl: null,
    imageUrl: "pic/certs/art-craft-71.jpg"
  },
  {
    id: 8,
    type: "Workshop",
    title: "Workshop on \"Technology Skills Development\"",
    institution: "Thung Saliam Chanupatham School",
    date: "2023-01-07", // Jan 2023
    credentialUrl: null,
    imageUrl: "pic/certs/tech-skills-school.jpg"
  },
  // ──────────────────────────────────────────────
  // 📌 วิธีการใส่รูปลงไปให้แสดงผล:
  //
  // 1. นำไฟล์รูป Certificate ของคุณ ไปใส่ไว้ในโฟลเดอร์ `pic/certs/`
  // 2. ตั้งชื่อไฟล์รูปให้ตรงกับตรงคำว่า "imageUrl" ด้านบน (เช่น ami-hackathon.jpg)
  //    หรือจะใช้วิธีแก้ชื่อ imageUrl ในไฟล์นี้ให้ตรงกับชื่อไฟล์รูปที่คุณมีก็ได้
  // 3. ระบบจะแสดงปุ่ม "View Image" และรูปขนาดย่อให้คลิกได้อัตโนมัติ!
  // ──────────────────────────────────────────────
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = selfDevelopmentData;
}
