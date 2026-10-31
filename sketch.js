// 各國美食大解密 - p5.js 程式碼範本
let gameState = "start"; // 目前狀態: 'start', 'quiz', 'result'
let currentQ = 0;        // 當前題號 (0 到 5)
let score = 0;           // 答對題數
let selectedOption = null; // 使用者選的選項
let showFeedback = false;  // 是否顯示立即回饋
let questionImages = [];

// 6 道題目資料
const QUESTIONS = [
  {
    q: "請問照片中這道由醋飯與新鮮生魚片組合而成的傳統日本料理，是來自哪一個國家？",
    options: ["韓國", "日本", "泰國", "中國"],
    answer: "日本",
    explain: "壽司是日本最具代表性的傳統美食之一，透過醋飯與生魚片等豐富食材搭配聞名全世界！"
  },
  {
    q: "這道外皮酥脆、裹著甜辣醬汁且深受年輕人喜愛的「韓式炸雞」，是哪國的國民美食？",
    options: ["日本", "韓國", "新加坡", "越南"],
    answer: "韓國",
    explain: "韓式炸雞結合特製的甜辣醬料或醬油蒜香，是代表性的韓國飲食文化。"
  },
  {
    q: "這碗加入蝦子、檸檬葉、香茅與辣椒，口感酸辣開胃的「冬蔭功湯」，是哪裡的名菜？",
    options: ["韓國", "泰國", "新加坡", "日本"],
    answer: "泰國",
    explain: "冬蔭功（Tom Yum Goong）是泰國的國菜級湯品，「冬蔭」意為酸辣，「功」則是蝦子。"
  },
  {
    q: "這道用透明米紙包裹著鮮蝦、米線與生菜，口感清爽不油膩的「生春捲」，屬於哪國的美食？",
    options: ["西班牙", "越南", "泰國", "韓國"],
    answer: "越南",
    explain: "越南生春捲使用透明柔軟的米皮包裹豐富餡料，沾上酸甜魚露醬是其精髓。"
  },
  {
    q: "這盤使用香米烹煮、搭配鮮嫩白切雞與特製辣椒醬的「海南雞飯」，是哪國的代表美食？",
    options: ["越南", "新加坡", "日本", "西班牙"],
    answer: "新加坡",
    explain: "海南雞飯被視為新加坡的國菜之一，極度講究雞肉軟嫩度與米飯油香。"
  },
  {
    q: "這道用平底鍋烹煮、金黃色的米飯吸滿海鮮精華與番紅花香氣的料理，源自哪裡？",
    options: ["法國", "義大利", "西班牙", "德國"],
    answer: "西班牙",
    explain: "西班牙海鮮飯（Paella）是地中海沿岸傳統名菜，以番紅花賦予金黃色澤與香氣。"
  }
];

function preload() {
  const imagePaths = [
    "1/壽司 (2).jpg",
    "1/韓式炸雞.jpg",
    "1/冬蔭功.jpg",
    "1/越南生春捲.jpg",
    "1/海南雞飯.jpg",
    "1/西班牙海鮮飯.jpg"
  ];
  questionImages = imagePaths.map(path => loadImage(path));
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(255, 243, 224); // 溫暖的淺黃橘色背景

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "quiz") {
    drawQuizScreen();
  } else if (gameState === "result") {
    drawResultScreen();
  }
}

// 1. 開始畫面
function drawStartScreen() {
  fill(211, 84, 0);
  textSize(36);
  text("🌍 各國美食大解密 🍜", width / 2, 150);

  fill(50);
  textSize(18);
  text("挑戰你的世界美食知識，看看你能答對幾題！", width / 2, 230);

  // 開始按鈕
  fill(230, 126, 34);
  rectMode(CENTER);
  rect(width / 2, 360, 200, 60, 10);
  fill(255);
  textSize(22);
  text("開始測驗", width / 2, 360);
}

// 2. 測驗畫面
function drawQuizScreen() {
  // 顯示題號
  fill(100);
  textSize(16);
  text(`第 ${currentQ + 1} 題 / 共 6 題`, width / 2, 40);

  // 顯示題目與對應圖片
  fill(30);
  textSize(20);
  text(QUESTIONS[currentQ].q, width / 2, 85, 760, 60);

  const qImage = questionImages[currentQ];
  const imageWidth = 300;
  const imageHeight = 145;
  const imageScale = min(imageWidth / qImage.width, imageHeight / qImage.height);
  image(
    qImage,
    (width - qImage.width * imageScale) / 2,
    130 + (imageHeight - qImage.height * imageScale) / 2,
    qImage.width * imageScale,
    qImage.height * imageScale
  );

  // 顯示選項按鈕
  let qData = QUESTIONS[currentQ];
  for (let i = 0; i < qData.options.length; i++) {
    let btnY = 310 + i * 48;
    
    // 按鈕顏色變化
    if (showFeedback) {
      if (qData.options[i] === qData.answer) {
        fill(46, 204, 113); // 正確選項顯示綠色
      } else if (qData.options[i] === selectedOption) {
        fill(231, 76, 60);  // 答錯選到的顯示紅色
      } else {
        fill(245);
      }
    } else {
      fill(255);
    }

    stroke(200);
    rectMode(CENTER);
    rect(width / 2, btnY, 500, 42, 8);

    fill(50);
    textSize(18);
    text(qData.options[i], width / 2, btnY);
  }

  // 如果已經作答，顯示解析與「下一題」按鈕
  if (showFeedback) {
    fill(40);
    textSize(16);
    text("💡 解說：" + qData.explain, width / 2, 510, 760, 40);

    // 下一題按鈕
    fill(52, 152, 219);
    rect(width / 2, 565, 160, 38, 6);
    fill(255);
    text("下一題", width / 2, 565);
  }
}

// 3. 結算畫面
function drawResultScreen() {
  fill(211, 84, 0);
  textSize(32);
  text("🎉 測驗結算完成！", width / 2, 120);

  fill(50);
  textSize(24);
  text(`你的總得分：${score} / 6 題`, width / 2, 200);

  // 依分數給予稱號
  let titleStr = "";
  if (score === 6) {
    titleStr = "🏆 稱號：異國美食大導遊（太神啦！）";
  } else if (score >= 3) {
    titleStr = "😋 稱號：潛力無限小吃貨";
  } else {
    titleStr = "✈️ 稱號：準備出國增廣見聞包";
  }
  
  textSize(20);
  fill(39, 174, 96);
  text(titleStr, width / 2, 270);

  // 這裡可以預留 GIF 的文字提示（實作時可載入圖片/GIF）
  fill(120);
  textSize(14);
  text("[慶祝 GIF 動畫播放區域]", width / 2, 360);

  // 再玩一次按鈕
  fill(230, 126, 34);
  rectMode(CENTER);
  rect(width / 2, 470, 180, 50, 10);
  fill(255);
  textSize(18);
  text("再玩一次", width / 2, 470);
}

// 滑鼠點擊互動事件
function mousePressed() {
  if (gameState === "start") {
    // 點擊「開始測驗」按鈕
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > 330 && mouseY < 390) {
      gameState = "quiz";
      currentQ = 0;
      score = 0;
      showFeedback = false;
    }
  } else if (gameState === "quiz") {
    let qData = QUESTIONS[currentQ];

    if (!showFeedback) {
      // 點選 4個選項的範圍
      for (let i = 0; i < qData.options.length; i++) {
        let btnY = 310 + i * 48;
        if (mouseX > width / 2 - 250 && mouseX < width / 2 + 250 &&
            mouseY > btnY - 21 && mouseY < btnY + 21) {
          selectedOption = qData.options[i];
          if (selectedOption === qData.answer) {
            score++;
          }
          showFeedback = true; // 顯示回饋與解說
        }
      }
    } else {
      // 點擊「下一題」按鈕
      if (mouseX > width / 2 - 80 && mouseX < width / 2 + 80 &&
          mouseY > 546 && mouseY < 584) {
        currentQ++;
        showFeedback = false;
        selectedOption = null;

        // 如果超過 6 題，進入結算畫面
        if (currentQ >= QUESTIONS.length) {
          gameState = "result";
        }
      }
    }
  } else if (gameState === "result") {
    // 點擊「再玩一次」按鈕
    if (mouseX > width / 2 - 90 && mouseX < width / 2 + 90 &&
        mouseY > 445 && mouseY < 495) {
      gameState = "start";
    }
  }
}