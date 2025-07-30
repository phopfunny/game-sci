const messages = [
    "Neuron (เซลล์ประสาท)",
    "Axon (แขนส่งสัญญาณของเซลล์ประสาท)",
    "Dendrite (แขนรับสัญญาณของเซลล์ประสาท)",
    "Myelin (ปลอกหุ้มแอกซอน ช่วยให้ส่งสัญญาณเร็ว)",
    "Synapse (จุดเชื่อมต่อระหว่างเซลล์ประสาท)",
    "Neurotransmitter (สารสื่อประสาท)",
    "Serotonin (เซโรโทนิน - ความสงบ/อารมณ์)",
    "Adrenaline (อะดรีนาลีน - ความตื่นตัว/ตกใจ)",
    "Norepinephrine (นอร์เอพิเนฟรีน - สู้หรือหนี)",
    "Reflex (รีเฟล็กซ์ - ตอบสนองอัตโนมัติ)",
    "Central nervous system (ระบบประสาทส่วนกลาง)",
    "Peripheral nervous system (ระบบประสาทส่วนปลาย)",
    "Sensory neuron (เซลล์ประสาทรับความรู้สึก)",
    "Motor neuron (เซลล์ประสาทสั่งการกล้ามเนื้อ)",
    "Sympathetic nervous system (ระบบประสาทซิมพาเทติก)",
    "Parasympathetic nervous system (ระบบประสาทพาราซิมพาเทติก)",
    "Prefrontal cortex (สมองส่วนหน้า - การคิด/ควบคุมตนเอง)",
  ];

  let timeLeft = 0;
  let gameInterval = null;
  let currentMessage = '';
  let yesAnswers = [];
  let noAnswers = [];
  let unusedMessages = [...messages];

  function startGame() {
    const duration = parseInt(document.getElementById("durationInput").value);
    if (isNaN(duration) || duration <= 0) {
      alert("กรุณาใส่เวลาที่ถูกต้อง");
      return;
    }

    document.getElementById("setup").classList.remove("active");
    document.getElementById("game").classList.add("active");

    timeLeft = duration;
    document.getElementById("timeLeft").textContent = timeLeft;
    showRandomMessage();

    gameInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("timeLeft").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(gameInterval);
        endGame();
      }
    }, 1000);
  }

  function showRandomMessage() {
    if (unusedMessages.length === 0) {
      clearInterval(gameInterval);
      endGame();
      return;
    }

    const randomIndex = Math.floor(Math.random() * unusedMessages.length);
    currentMessage = unusedMessages.splice(randomIndex, 1)[0];
    document.getElementById("message").textContent = currentMessage;
  }

  function handleAnswer(answer) {
    if (answer === "ถูก") {
      yesAnswers.push(currentMessage);
    } else if (answer === "ข้าม") {
      noAnswers.push(currentMessage);
    }
    showRandomMessage();
  }

  function endGame() {
    document.getElementById("game").classList.remove("active");
    document.getElementById("end").classList.add("active");

    const yesList = document.getElementById("yesList");
    const noList = document.getElementById("noList");

    yesList.innerHTML = yesAnswers.map(item => `<li><span class="leaf-icon">🌱</span>${item}</li>`).join("");
    noList.innerHTML = noAnswers.map(item => `<li><span class="leaf-icon">🍂</span>${item}</li>`).join("");
  }
