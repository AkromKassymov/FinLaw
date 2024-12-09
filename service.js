let activeTab = 0;
let activeQuestion = 0;
const language = localStorage.getItem("lang") || 1;

function serviceOnLoad() {
  const tabsView = document.getElementById("tab__select");
  const db = firebase.firestore();
  const data = [];
  const render = [];
  db.collection("services")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc, index) => {
        const tab = doc.data();
        if (index === 0) {
          render.push(`<div
            class="tab active__tab"
            id="tab__${tab.id}"
            onclick="setTab(${tab.id})"
            >
            ${tab.tab_name[language]}
            </div>`);
          return;
        }
        render.push(`<div
          class="tab"
          id="tab__${tab.id}"
          onclick="setTab(${tab.id})"
          >
          ${tab.tab_name[language]}
          </div>`);
        return;
      });
      tabsView.innerHTML = render.join("");
      setTab("1");
    });
}
function setTab(tabId) {
  let tab_content = document.getElementById("data__content");
  let questionsView = document.getElementById("tab__content");
  let mobileQuestionView = document.getElementById("select_opt");
  console.log(mobileQuestionView);
  let tabs = document.getElementsByClassName("tab");
  let activeQuestion = "";
  const db = firebase.firestore();
  db.collection("services")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const tab = doc.data();
        for (const tab of tabs) {
          tab.classList.remove("active__tab");
          if (tab.id === `tab__${tabId}`) {
            tab.classList.add("active__tab");
          }
        }

        let i = 0;
        if (tab.id == tabId) {
          questionsView.innerHTML = "";
          mobileQuestionView.innerHTML = "";
          console.log(tab);
          tab.questions.forEach((question, index) => {
            if (i === 0) {
              questionsView.innerHTML += `<div class="question active__question">${question.question[language]}</div>`;
              mobileQuestionView.innerHTML += `<option value="${question.question[language]}">${question.question[language]}</option>`;
              i++;
              tab_content.innerHTML = question.answer[language];
            } else {
              questionsView.innerHTML += `<div onclick="setActiveQuestion('${question.question}')" class="question">${question.question[language]}</div>`;
              mobileQuestionView.innerHTML += `<option value="${question.question[language]}">${question.question[language]}</option>`;
            }
          });
        }
      });
    });
  setActiveQuestion(activeQuestion);
}

const setTabMobile = () => {
  const tab = document.getElementById("select_opt").value;
  const answer = document.getElementById("data__content");
  const db = firebase.firestore();
  db.collection("services")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const tabData = doc.data();
        tabData.questions.forEach((question) => {
          if (question.question[language] === tab) {
            answer.innerHTML = question.answer[language];
          }
        });
      });
    });
};

function setActiveQuestion(id) {
  console.log(typeof id);
  activeQuestion = id;

  let tab_content = document.getElementById("data__content");
  let questionsView = document.getElementById("tab__content");
  let tabs = document.getElementsByClassName("tab");
  let mobileQuestionView = document.getElementById("select_opt");
  let tabId = "";
  questionsView.innerHTML = "";

  const db = firebase.firestore();
  db.collection("services")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const tab = doc.data();
        for (const question of tab.questions) {
          if (question.question == id) {
            tab_content.innerHTML = "";
            console.log(question.answer);
            tab_content.innerHTML = question.answer[language];
            tabId = tab.id;
            continue;
          }
        }
        for (const question of tab.questions) {
          if (tabId == tab.id) {
            questionsView.innerHTML += `<div onclick="setActiveQuestion('${
              question.question
            }')" class="question ${
              question.question == id ? "active__question" : ""
            }">${question.question[language]}</div>`;
            mobileQuestionView.innerHTML += `<option value="${question.question[language]}">${question.question[language]}</option>`;
          }
        }
      });
    });
}
