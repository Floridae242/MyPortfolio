const selfDevelopmentData = [
  {
    id: 1,
    type: "Hackathon",
    title: "AMI HACKATHON",
    institution: "วิทยาลัยนวัตกรรมการผลิตขั้นสูง สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    date: "2023-11-11", // 11/11/2566
    credentialUrl: null,
    imageUrl: "pic/certs/ami-hackathon.jpg" // วางไฟล์รูปในโฟลเดอร์ pic/certs/
  },
  {
    id: 2,
    type: "Competition",
    title: "โครงการแข่งขันแก้ไขปัญหาด้วยการเขียนโปรแกรมคอมพิวเตอร์",
    institution: "ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
    date: "2024-01-29", // 29/01/2567
    credentialUrl: null,
    imageUrl: "pic/certs/kmutt-programming.jpg"
  },
  {
    id: 3,
    type: "Competition/Workshop",
    title: "การแข่งขันอบรมการเขียนโปรแกรมออกแบบแผนการบินโดรนแปรอักษร",
    institution: "สมาคมกีฬาเครื่องบินจำลองและวิทยุบังคับ ร่วมกับ สำนักงานการวิจัยแห่งชาติ (วช.)",
    date: "2023-03-06", // 06/03/2566
    credentialUrl: null,
    imageUrl: "pic/certs/drone-programming.jpg"
  },
  {
    id: 4,
    type: "Camp",
    title: "โครงการค่าย CLICKCAMP ครั้งที่ 14",
    institution: "ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยมหิดล",
    date: "2024-01-04", // 04/01/2567
    credentialUrl: null,
    imageUrl: "pic/certs/clickcamp-14.jpg"
  },
  {
    id: 5,
    type: "Workshop",
    title: "การอบรมเชิงปฏิบัติการ \"Generative Al for Web Application\"",
    institution: "วิทยาลัยศิลปะสื่อ และเทคโนโลยี มหาวิทยาลัยเชียงใหม่",
    date: "2024-08-17", // 17/08/2567
    credentialUrl: null,
    imageUrl: "pic/certs/gen-ai-web.jpg"
  },
  {
    id: 6,
    type: "Competition",
    title: "งานศิลปหัตถกรรมนักเรียน ระดับเขตพื้นที่การศึกษา ครั้งที่ 70 ประจำปีการศึกษา 2565",
    institution: "สำนักงานเขตพื้นที่การศึกษามัธยมศึกษาสุโขทัย",
    date: "2022-09-12", // 12/09/2565
    credentialUrl: null,
    imageUrl: "pic/certs/art-craft-70.jpg"
  },
  {
    id: 7,
    type: "Competition",
    title: "งานศิลปหัตถกรรมนักเรียน ระดับเขตพื้นที่การศึกษา ครั้งที่ 71 ประจำปีการศึกษา 2566",
    institution: "สำนักงานเขตพื้นที่การศึกษามัธยมศึกษาสุโขทัย",
    date: "2023-09-14", // 14/09/2566
    credentialUrl: null,
    imageUrl: "pic/certs/art-craft-71.jpg"
  },
  {
    id: 8,
    type: "Workshop",
    title: "การอบรม \"การพัฒนาทักษะทางเทคโนโลยี\"",
    institution: "โรงเรียนทุ่งเสลี่ยมชนูปถัมภ์",
    date: "2023-01-07", // 07/01/2566
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
