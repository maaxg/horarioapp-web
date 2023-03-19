const form = document.getElementById("create-discipline-form");
const createDisciplineDiv = document.getElementById("create-discipline");
const showDisciplinesDiv = document.getElementById("show-disciplines");
const deleteItemButton = document.getElementById("delete-item");
const editItem = document.getElementById("edit-item");
const myaccountButton = document.getElementById("myaccount-button");
let editableItemId = undefined;
/* on submit form */
const onsubmit = (ev, editableId) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const discipline = Object.fromEntries(formData);
  let disciplines = [];
  const savedDisciplines = JSON.parse(localStorage.getItem("disciplines"));

  if (savedDisciplines) {
    disciplines = savedDisciplines;
  }

  if (Boolean(editableId)) {
    const idx = disciplines.findIndex((item) => item.id === editableId);
    if (idx !== -1)
      disciplines[idx] = { ...discipline, id: disciplines[idx].id };
  } else {
    disciplines.push({ ...discipline, id: new Date().getTime() });
  }

  localStorage.setItem("disciplines", JSON.stringify(disciplines));

  createDisciplineDiv.style.display = "none";
  showDisciplinesDiv.style.display = "flex";
  loadDisciplines();
};

const onClickEditDiscipline = (itemId) => {
  createDisciplineDiv.style.display = "flex";
  showDisciplinesDiv.style.display = "none";
  const disciplines = JSON.parse(localStorage.getItem("disciplines"));

  if (disciplines.length) {
    const discipline = disciplines.find((item) => item.id === itemId);
    if (discipline) {
      const weekDay = document.getElementById("weekDay");
      weekDay.value = discipline.weekDay;
      const disciplineName = document.getElementById("disciplineName");
      disciplineName.value = discipline.disciplineName;
      const startAt = document.getElementById("startAt");
      startAt.value = discipline.startAt;
      const endAt = document.getElementById("endAt");
      endAt.value = discipline.endAt;
      const teacher = document.getElementById("teacher");
      teacher.value = discipline.teacher;
      const room = document.getElementById("room");
      room.value = discipline.room;
      editableItemId = itemId;
    }
  }
};

const onClickDeleteDiscipline = (itemId) => {
  const disciplines = JSON.parse(localStorage.getItem("disciplines"));
  if (disciplines.length) {
    const idx = disciplines.findIndex((item) => item.id === itemId);
    disciplines.splice(idx, 1);
    localStorage.setItem("disciplines", JSON.stringify(disciplines));
    window.location = "http://127.0.0.1:5500/html/disciplines.html";
  }
};

const loadDisciplines = () => {
  const disciplines = JSON.parse(localStorage.getItem("disciplines"));

  if (disciplines.length) {
    createDisciplineDiv.style.display = "none";
    showDisciplinesDiv.style.display = "flex";
    return (document.getElementById("list-content").innerHTML = disciplines.map(
      (item) => `
    <div id="discipline-card" class="discipline-card">
    <p id="discipline-card-weekDay" class="discipline-card-title">${item.weekDay}</p>
    <div id="discipline-card-section">
      <p id="discipline-card-label" class="discipline-card-label">
        Disciplina:
      </p>
      <p
        id="discipline-card-value-disciplineName"
        class="discipline-card-value"
      >${item.disciplineName}</p>
    </div>
    <div id="discipline-card-section">
      <p id="discipline-card-label" class="discipline-card-label">
        Hora:
      </p>
      <p
        id="discipline-card-value-time"
        class="discipline-card-value"
      >${item.startAt} - ${item.endAt}</p>
    </div>
    <div id="discipline-card-section">
      <p id="discipline-card-label" class="discipline-card-label">
        Professor:
      </p>
      <p
        id="discipline-card-value-teacher"
        class="discipline-card-value"
      >${item.teacher}</p>
    </div>
    <div id="discipline-card-section">
      <p id="discipline-card-label" class="discipline-card-label">
        Sala:
      </p>
      <div class="row center-between" >
        <p
          id="discipline-card-value-room"
          class="discipline-card-value"
        >${item.room}</p>
        <div style="margin-top: -24px;">
          <span             
            id="edit-item"
            style="cursor: pointer;" 
            onclick="onClickEditDiscipline(${item.id})"
            class="material-symbols-outlined">
            edit_square
          </span>

          <span 
            id="delete-item"
            onclick="onClickDeleteDiscipline(${item.id})"
            style="cursor: pointer;" 
            class="material-symbols-outlined">
            delete
          </span>
   
        </div>
      </div>
    </div>
  </div>
    `
    ));
  } else {
    createDisciplineDiv.style.display = "flex";
    showDisciplinesDiv.style.display = "none";
  }
};

const onClickMyAccount = (ev) => {
  ev.preventDefault();
  createDisciplineDiv.style.display = "flex";
  showDisciplinesDiv.style.display = "none";
};

const onLoadDisciplines = () => {
  form?.addEventListener("submit", (ev) => onsubmit(ev, editableItemId));
  myaccountButton?.addEventListener("click", onClickMyAccount);
  loadDisciplines();
};
onLoadDisciplines();
