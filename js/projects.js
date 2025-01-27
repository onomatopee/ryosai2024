generator(projects);
let current_date = "11/29";

function project_str(proj) {
  proj_name = proj["title"];
  proj_date = proj["date"];
  proj_time = proj["time"];
  proj_place = proj["place"];
  proj_imgurl = proj_name+".jpg";
  proj_txt = proj["txt"];
  console.log(proj_name);

  switch (proj_name) {
    case "Fate/stay night Heaven's Feel 上映会":
      proj_imgurl = "Fate.stay night Heaven's Feel 上映会.jpg";
      break;
    case "#熊野寮祭2024をトレンド入りさせる":
      proj_imgurl = "熊野寮祭2024をトレンド入りさせる.jpg";
      break;
  }

  switch (proj_date.substr(3,2) % 3) {
    case 0:
      color = "red";
      break;
    case 1:
      color = "green";
      break;
    case 2:
    color = "transparent";
    break;
  }

  if (proj_name.length > 18 && proj_place !== "") {
    return `<div class="projects">
      <input type="checkbox" class="project_popup" id="${proj_name}${proj_time}${proj_place}">
      <label class="${color}_back" for="${proj_name}${proj_time}${proj_place}">
        <img class="project_img" src="img/projects/${proj_imgurl}">
        <div class="project_title">
          <h1 class="small_point">${proj_name}</h1>
        </div>
        <div class="project_time_place">
          <img src="img/time.svg">
          <h2>${proj_date} ${proj_time}</h2>
          <img src="img/place.svg">
          <h2>${proj_place}</h2>
        </div>
        <div class="project_txt">
          <p>${proj_txt}</p>
        </div>
      </label>

      <div class="res">
        <div class="large_head">
          <div class="large_head_left">
            <h1>${proj_time}</h1>
          </div>
          <div class="large_head_right">
            <h1>@${proj_place}</h1>
          </div>
        </div>
        <div class="large_nm">
          <h1>${proj_name}</h1>
        </div>
        <div class="large_img">
          <img src="img/projects/${proj_imgurl}">
        </div>
        <div class="large_txt">
          <p>${proj_txt}</p>
        </div>
      </div>
    </div>`;
  } else if (proj_place !== "") {
    return `<div class="projects">
      <input type="checkbox" class="project_popup" id="${proj_name}${proj_time}${proj_place}">
      <label class="${color}_back" for="${proj_name}${proj_time}${proj_place}">
        <img class="project_img" src="img/projects/${proj_imgurl}">
        <div class="project_title">
          <h1>${proj_name}</h1>
        </div>
        <div class="project_time_place">
          <img src="img/time.svg">
          <h2>${proj_date} ${proj_time}</h2>
          <img src="img/place.svg">
          <h2>${proj_place}</h2>
        </div>
        <div class="project_txt">
          <p>${proj_txt}</p>
        </div>
      </label>

      <div class="res">
        <div class="large_head">
          <div class="large_head_left">
            <h1>${proj_time}</h1>
          </div>
          <div class="large_head_right">
            <h1>@${proj_place}</h1>
          </div>
        </div>
        <div class="large_nm">
          <h1>${proj_name}</h1>
        </div>
        <div class="large_img">
          <img src="img/projects/${proj_imgurl}">
        </div>
        <div class="large_txt">
          <p>${proj_txt}</p>
        </div>
      </div>
    </div>`;
  } else {
    return `<div class="projects">
      <input type="checkbox" class="project_popup" id="${proj_name}${proj_time}${proj_place}">
      <label class="${color}_back" for="${proj_name}${proj_time}${proj_place}">
        <img class="project_img" src="img/projects/${proj_imgurl}">
        <div class="project_title">
          <h1>${proj_name}</h1>
        </div>
        <div class="project_time_place">
          <img src="img/time.svg">
          <h2>${proj_date} ${proj_time}</h2>
        </div>
        <div class="project_txt">
          <p>${proj_txt}</p>
        </div>
      </label>

      <div class="res">
        <div class="large_head">
          <div class="large_head_left">
            <h1>${proj_time}</h1>
          </div>
          <div class="large_head_right">
            <h1></h1>
          </div>
        </div>
        <div class="large_nm">
          <h1>${proj_name}</h1>
        </div>
        <div class="large_img">
          <img src="img/projects/${proj_imgurl}">
        </div>
        <div class="large_txt">
          <p>${proj_txt}</p>
        </div>
      </div>
    </div>`;
  }
}

function timetable_str(date) {
  date = (date[0]+date[1]+date[3]+date[4]);
  return `<img id="timetable_img" src="img/timetable/${date}.png">`;
}

function clear_projs() {
  document.querySelector("#project_canvas").innerHTML = "<h1 id='canvas_top'>企画一覧</h1>";
}

function add_hits(num) {
  document.querySelector("#canvas_top").innerHTML += `<p>${num}件ヒットしました。</p>`;
}

function add_date(str) {
  document.querySelector("#canvas_top").innerHTML += `<p>${str}のタイムテーブルです。</p>`;
}

function generator(projs) {
  clear_projs();
  let section = document.querySelector("#project_canvas");
  let result_str = "";
  for (const proj of projs) {
    result_str += project_str(proj);
  }
  section.innerHTML += result_str;
  add_hits(projs.length);
}

function date_generator(projs,date) {
  clear_projs()
  let section = document.querySelector("#project_canvas");
  let num_hits = 0;
  let result_str = "";
  for (const proj of projs) {
    if (proj["date"] == date) {
      result_str += project_str(proj);
      num_hits++;
    }
  }
  section.innerHTML += result_str;
  add_hits(num_hits);
  current_date = date;
}

function time_generator(projs,time) {
  clear_projs()
  let section = document.querySelector("#project_canvas");
  let num_hits = 0;
  let result_str = "";
  for (const proj of projs) {
    if (proj["time"] == time) {
      result_str += project_str(proj);
      num_hits++;
    }
  }
  section.innerHTML += result_str;
  add_hits(num_hits);
}

function title_generator(projs,title) {
  clear_projs()
  let section = document.querySelector("#project_canvas");
  let num_hits = 0;
  let result_str = "";
  for (let i = 0; i < projs.length; i++) {
    if (projs[i].title.includes(title) || kanaTitles[i].includes(title)) {
      result_str += project_str(projs[i]);
      num_hits++;
    }
  }
  section.innerHTML += result_str;
  add_hits(num_hits);
}

function title_search() {
  const title_text = document.getElementById("search_box").value;
  title_generator(projects,title_text);
}

function time_table() {
  clear_projs()
  let section = document.querySelector("#project_canvas");
  section.innerHTML += timetable_str(current_date);
  add_date(current_date);
}