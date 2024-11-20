// document.getElementById("counter16").textContent = "Form(0~"+String(projects16.length-1)+")";
// document.getElementById("counter19").textContent = "Form(0~"+String(projects19.length-1)+")";
// document.getElementById("counter22").textContent = "Form(0~"+String(projects22.length-1)+")";
// document.getElementById("counterU").textContent = "Form(0~"+String(projectsU.length-1)+")";

function unified() {
  let id = document.getElementById('tentacles').value;
  routine(projectsU[id]["name"],projectsU[id]["time"],projectsU[id]["place"],projectsU[id]["txt"],"img/projects/"+projectsU[id]["imgurl"]);
}


function generate16() {
  let id = document.getElementById('tentacles').value;
  routine(projects16[id]["name"],projects16[id]["time"],projects16[id]["place"],projects16[id]["txt"],"img/projects/"+projects16[id]["imgurl"]);
}

function generate19() {
  let id = document.getElementById('tentacles').value;
  routine(projects19[id]["name"],projects19[id]["time"],projects19[id]["place"],projects19[id]["txt"],"img/projects/"+projects19[id]["imgurl"]);
}

function generate22() {
  let id = document.getElementById('tentacles').value;
  routine(projects22[id]["name"],projects22[id]["time"],projects22[id]["place"],projects22[id]["txt"],"img/projects/"+projects22[id]["imgurl"]);
}



function previewFile(file) {
  // FileReaderオブジェクトを作成
  const reader = new FileReader();
  // ファイルが読み込まれたときに実行する
  reader.onload = function (e) {
    const imageUrl = e.target.result; // 画像のURLはevent.target.resultで呼び出せる
    const img = document.getElementById("resImg"); // img要素を作成
    img.src = imageUrl; // 画像のURLをimg要素にセット
  }
  // いざファイルを読み込む
  reader.readAsDataURL(file);
}
// <input>でファイルが選択されたときの処理
const fileInput = document.getElementById("photo");
const handleFileSelect = () => {
  const files = fileInput.files;
  previewFile(files[0]);
}
fileInput.addEventListener('change', handleFileSelect);

function routine(nm,time,place,text,imgUrl) {
  document.getElementById('timePutter').textContent = time;
  document.getElementById('placePutter').textContent = place;
  document.getElementById('textPutter').textContent = text;
  document.getElementById('nm').textContent = nm;
  document.getElementById('resImg').src = imgUrl;
  // const $preview = document.querySelector("#result");
  // $preview.addEventListener("input", () => {
  //   for (const $img of $preview.querySelectorAll("img")) {
  //     if ($img.src.match(/^https*:/)) {
  //       $img.crossOrigin = "anonymous";
  //     }
  //   }
  // }, false);
  setTimeout(() => {start()},2500);
  setTimeout(() => {saveCanvas()},5000);
}

function update() {
  document.getElementById('timePutter').textContent = document.getElementById('timeGetter').value;
  document.getElementById('placePutter').textContent = document.getElementById('placeGetter').value;
  document.getElementById('textPutter').textContent = document.getElementById('textGetter').value;
  document.getElementById('nm').textContent = document.getElementById('nmGetter').value;
};


function startAndSave() {
  update();
  const $preview = document.querySelector("#result");
  $preview.addEventListener("input", () => {
    for (const $img of $preview.querySelectorAll("img")) {
      if ($img.src.match(/^https*:/)) {
        $img.crossOrigin = "anonymous";
      }
    }
  }, false);
  setTimeout(() => {start()},2500);
  setTimeout(() => {saveCanvas()},5000);
}


// codes copied and pasted from https://blog.totoraj.net/sample/html-to-canvas/sample.html and https://blog.totoraj.net/2022-01-07-html-to-canvas/

document.addEventListener("DOMContentLoaded", () => {
  const $preview = document.querySelector("#result");
  $preview.addEventListener("input", () => {
    for (const $img of $preview.querySelectorAll("img")) {
      if ($img.src.match(/^https*:/)) {
        $img.crossOrigin = "anonymous";
      }
    }
  }, false);
});

async function start() {
  const $css = document.querySelector("#css");
  const $preview = document.querySelector("#result");
  const $canvas = document.querySelector("#canvas");
  const ctx = $canvas.getContext("2d");

  const clientRect = $preview.getBoundingClientRect();
  const w = clientRect.width;
  const h = clientRect.height;

  const cssText = await replaceUrlToBase64($css.innerHTML);

  const svgText = elementToSvgText($preview, cssText);

  const svgBase64 =
    "data:image/svg+xml;base64,"
    + btoa(unescape(encodeURIComponent(svgText)));
  
  // 2倍のサイズでcanvasに描画する
  // svgなので描画サイズは自由に変えられる
  $canvas.width = w * 2;
  $canvas.height = h * 2;

  const img = new Image();
  img.src = svgBase64;

  img.onload = () => {
    // 2倍のサイズでcanvasに描画する
    ctx.drawImage(img, 0, 0, w * 2, h * 2);
  }
  img.onerror = err => {
    console.log(err);
  }
}

function saveCanvas() {
  saveCanvasStr("canvasTest.png");
}

function saveCanvasStr(str) {
  const $canvas = document.querySelector("#canvas");
  const $a = document.createElement("a");
  $a.download = str;
  document.body.append($a);
  console.log($canvas.toDataURL());
  $canvas.toBlob(blob => {
    $a.href = URL.createObjectURL(blob);
    $a.click();
    URL.revokeObjectURL(blob);
    $a.remove();
  }, "image/png");
}

// CSS内のurlをbase64にして埋め込む
async function replaceUrlToBase64(cssText) {
  const regex = /url\s*\(["']*(.+?)["']*\)/g;
  const promises = [];
  cssText.replace(regex, async (match, url) => {
    const promise = fetchFileBase64(url)
      .then(base64 => `url(${base64})`);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return cssText.replace(regex, () => data.shift());
}

// ファイルを取得してbase64で返す
async function fetchFileBase64(fileUrl) {
  const req = new Request(fileUrl);
  let mimeType = "";
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error(`fetch error ${res.status}`);
  }
  mimeType = res.headers.get("content-type").split(";")[0];
  const aBuff = await res.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(aBuff);
  const length = bytes.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:${mimeType};base64,${window.btoa(binary)}`;
}

// 画像をbase64にして返す
function imageToBase64($img, mimeType="image/png") {
  const $canvas = document.createElement("canvas");
  $canvas.width  = $img.naturalWidth;
  $canvas.height = $img.naturalHeight;
  const ctx = $canvas.getContext("2d");
  ctx.drawImage($img, 0, 0);
  return $canvas.toDataURL(mimeType);
}

// 対象要素をSVGにして返す
function elementToSvgText($target, cssText) {
  const $clone = $target.cloneNode(true);

  const $targetImages = $target.querySelectorAll("img");
  const $cloneImages = $clone.querySelectorAll("img");

  for (let i=0; i < $targetImages.length; i++) {
    $cloneImages[i].src = imageToBase64($targetImages[i]);
  }

  const clientRect = $target.getBoundingClientRect();
  const width = clientRect.width;
  const height = clientRect.height;
  console.log(width, height);
  const xmlText = new XMLSerializer().serializeToString($clone);
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <foreignObject width="100%" height="100%" requiredExtensions="http://www.w3.org/1999/xhtml">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
            ${cssText}
          </style>
          ${xmlText}
        </div>
      </foreignObject>
    </svg>
  `;
}