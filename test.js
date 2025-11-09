// ตั้งค่าข้อมูลการเชื่อมต่อ MQTT
  const broker = "wss://broker.hivemq.com:8884/mqtt";
  const topicControl = "espkuy";   // topic ควบคุมไฟ
  const topicTemp = "tempjee";   // topic อุณหภูมิ
  const topicHumi = "humijee";   // topic ความชื้น

  // สร้าง client MQTT
  const client = mqtt.connect(broker);

  // เมื่อเชื่อมต่อสำเร็จ
  client.on("connect", function () {
    document.getElementById("status").innerText = "สถานะ: ✅ เชื่อมต่อแล้ว";
    // สมัครฟัง topic ทุกตัว
    
    client.subscribe(topicControl);
    client.subscribe(topicTemp);
    client.subscribe(topicHumi);
  });

  // เมื่อได้รับข้อความจาก broker
  client.on("message", function (topic, message) {
    const msg = message.toString();

    if(topic === topicControl){
      document.getElementById("status").innerText = "สถานะไฟ: " + msg;
    } else if(topic === topicTemp){
      document.getElementById("temp").innerText = "อุณหภูมิ: " + msg + " °C";
    } else if(topic === topicHumi){
      document.getElementById("humi").innerText = "ความชื้น: " + msg + " %";
    }
  });

  // เมื่อเกิดข้อผิดพลาด
  client.on("error", function (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    document.getElementById("status").innerText = "❌ เกิดข้อผิดพลาดในการเชื่อมต่อ";
  });

  // ฟังก์ชันเปิดไฟ
  function turnOn() {
    client.publish(topicControl, "ON");
    document.getElementById("status").innerText = "ส่งคำสั่ง: เปิดไฟ";
  }

  // ฟังก์ชันปิดไฟ
  function turnOff() {
    client.publish(topicControl, "OFF");
    document.getElementById("status").innerText = "ส่งคำสั่ง: ปิดไฟ";
  }
  // ฟังก์ชันlogin
function login() {
  const userId = document.getElementById("userId").value;
  const pass = document.getElementById("pass").value;

  if (userId === "admin" && pass === "123") {
    // ลิงก์ไปหน้าต่อไป เช่น home.html
sessionStorage.setItem("isLoggedIn", "true");
    window.location.href = "home.html";
  } else {
    alert("รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
  }
}
function Logout(){
  
  
  window.location.href ="index.html"
}



