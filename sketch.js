let input;
let slider;
let button;
let dropdown;
let offsets = [];
let jumping = false;

function setup() {
  createCanvas(windowWidth, windowHeight); // 設定畫布大小為螢幕大小
  input = createInput();//產生一個文字框
  input.position(10, 10);//把文字框放在座標為(10,10)的位置
  input.size(200,50);//設定文字框的大小
  input.value('hi🐶');//預設文字框的文字
  input.style('font-size', '50px');//設定文字框的文字大小

  slider = createSlider(28, 50, 32);//產生一個滑桿，範圍從28到50，預設值為32
  slider.position(input.x + input.width + 10, 10);//把滑桿放在文字框的右側

  button = createButton('跳動文字');//產生一個按鈕
  button.position(slider.x + slider.width + 10, 10);//把按鈕放在滑桿的右側
  button.mousePressed(startJumping);//按下按鈕時執行 startJumping 函數

  dropdown = createSelect();//產生一個下拉式選單
  dropdown.position(button.x + button.width + 10, 10);//把下拉式選單放在按鈕的右側
  dropdown.option('第一周');
  dropdown.option('第二周');
  dropdown.option('第三周');
  dropdown.changed(goToLink);//當選擇改變時執行 goToLink 函數

  for (let i = 0; i < 5; i++) {
    offsets.push(random(0, 1000)); // 初始化每行文字的跳動偏移量
  }
}

function startJumping() {
  jumping = !jumping; // 切換跳動狀態
  for (let i = 0; i < offsets.length; i++) {
    offsets[i] = random(0, 1000); // 重新設定每行文字的跳動偏移量
  }
}

function goToLink() {
  let selected = dropdown.value();
  if (selected === '第一周') {
    window.open('https://www.tku.edu.tw/', '_blank');
  } else if (selected === '第二周') {
    window.open('https://www.et.tku.edu.tw/', '_blank');
  } else if (selected === '第三周') {
    window.open('https://hackmd.io/ELLcU03eQ96lmklEG8xNFA', '_blank');
  }
}

function draw() {
  background(220);
  let textValue = input.value();
  let textSizeValue = slider.value();//取得滑桿的值
  textSize(textSizeValue);//設定文字大小
  textAlign(CENTER, CENTER);
  let y = textSizeValue / 2; // 初始 y 座標
  let lines = floor(height / (textSizeValue + 10)); // 計算可以顯示的行數
  for (let i = 0; i < lines; i++) { // 顯示多行文字
    let yOffset = 0;
    if (jumping) {
      yOffset = sin((frameCount + offsets[i % offsets.length]) * 0.1) * 10; // 計算跳動偏移量
    }
    text(textValue, width / 2, y + yOffset);
    y += textSizeValue + 10; // 每行文字之間的間隔
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
}

