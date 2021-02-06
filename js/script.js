const card = $(".flash-card");
let kanji = [];
let hanViet = [];
let curNum = 1;
let front = true;
function changeLevel(level) {
  kanji = [];
  hanViet = [];
  let flag = true;
  if (level !== "Choose level") {
    fetch("csv/" + level + ".csv")
      .then((res) => res.text())
      .then((data) => {
        callback(data);
      });

    const callback = (data) => {
      tmpWord = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i] !== ",") {
          if (data[i] !== "\n") {
            tmpWord += data[i];
          }
        } else {
          if (flag) {
            kanji.push(tmpWord);
            flag = false;
          } else {
            hanViet.push(tmpWord);
            flag = true;
          }
          tmpWord = "";
        }
      }
      $("#word").html(`<p>${curNum} / ${kanji.length}</>`);
      showTheWord(curNum, front);
    };
  }
}

$(".flash-card").click(() => {
  if (front) {
    $(".flash-card").css("transform", "rotateX(180deg)");
  } else {
    $(".flash-card").css("transform", "rotateX(360deg)");
  }
  front = !front;
  card.html("");
  setTimeout(() => {
    showTheWord(curNum, front);
  }, 500);
});

$("#left").click(() => {
  if (curNum > 1) {
    curNum--;
  }
  $("#word").html(`<p>${curNum} / ${kanji.length}</>`);
  showTheWord(curNum, front);
});

$("#right").click(() => {
  if (curNum <= kanji.length) {
    curNum++;
  }
  $("#word").html(`<p>${curNum} / ${kanji.length}</>`);
  showTheWord(curNum, front);
});

function showTheWord(curNum, front) {
  if (front) {
    card.html(`<p class="normal-p">${kanji[curNum]}</p>`);
  } else {
    card.html(`<p class="rotated-p">${hanViet[curNum]}</p>`);
  }
}
