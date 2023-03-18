const form = document.getElementById("create-discipline-form");
const createDisciplineDiv = document.getElementById("create-discipline");
const showDisciplinesDiv = document.getElementById("show-disciplines");
const DISCIPLINES_ARRAY = [
  {
    weekDay: "Segunda-feira",
    disciplineName: "Sistemas Operacionais",
    time: "07:30 - 10:00",
    teacher: "Fulano de tal",
    room: "Lab 07",
  },
  {
    weekDay: "Terça-feira",
    disciplineName: "Sistemas Operacionais",
    time: "07:30 - 10:00",
    teacher: "Fulano de tal",
    room: "Lab 09",
  },
  {
    weekDay: "Quarta-feira",
    disciplineName: "Sistemas Operacionais",
    time: "07:30 - 10:00",
    teacher: "Fulano de tal",
    room: "Lab 08",
  },
];
/* on submit form */
const onsubmit = (ev) => {
  ev.preventDefault();
  createDisciplineDiv.style.display = "none";
  showDisciplinesDiv.style.display = "flex";
};

form.addEventListener("submit", onsubmit);

const loadDisciplines = () => {
  return (document.getElementById("list-content").innerHTML =
    DISCIPLINES_ARRAY.map(
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
    >${item.time}</p>
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
        <span class="material-symbols-outlined">
          edit_square
        </span>
        <span class="material-symbols-outlined">
          delete
        </span>
      </div>
    </div>
  </div>

</div>
  `
    ));
};

const onLoad = () => {
  createDisciplineDiv.style.display = "none";
  showDisciplinesDiv.style.display = "flex";
  loadDisciplines();
};
onLoad();
/* end of submit form */
