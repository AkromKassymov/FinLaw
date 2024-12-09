function hideAll() {
  const sections = ["service", "about", "career", "blog"];
  sections.forEach((section) => {
    document.getElementById(section).style.display = "none";
  });
}

function openNavMenu(id) {
  hideAll();
  const navContent = document.getElementById("navbar__content");
  navContent.style.height = "80%";
  navContent.onmouseleave = () => {
    navContent.style.height = "0";
  };
  if (id == 1) {
    document.getElementById("service").style.display = "flex";
  }
  if (id === 2) {
    document.getElementById("about").style.display = "flex";
  }
  if (id === 3) {
    document.getElementById("career").style.display = "flex";
  }
  if (id === 4) {
    document.getElementById("blog").style.display = "flex";
  }
}

function openMobileMenu() {
  const navContent = document.getElementById("mobileMenu");
  navContent.style.display = "flex";
  navContent.style.height = "100%";
}
function closeMobileMenu() {
  const navContent = document.getElementById("mobileMenu");
  navContent.style.height = "0";
  navContent.style.display = "none";
}

function loadLang() {
  const language = localStorage.getItem("lang") || 1;
  const socials = ["facebook", "instagram", "linkedin", "twitter"];
  const db = firebase.firestore();
  db.collection("locale")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data().data;
        console.log(data);
        const ids = Object.keys(data[+language]);
        try {
          for (const id of ids) {
            // console.log(id);
            if (document.getElementById(id)) {
              if (socials.includes(id)) {
                document.getElementById(id).href = data[language][id];
                console.log(document.getElementById(id));
                continue;
              }
              document.getElementById(id).innerText = data[language][id];
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    });
}

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.getElementById("langDialog").style.display = "none";
  loadLang();
}

function showLangDialog() {
  document.getElementById("langDialog").style.display = "flex";
}

loadLang();

function sendEmail() {
  emailjs.init({
    publicKey: "kysivMeVeegptu56S",
  });

  const first_name = document.getElementById("fname").value;
  const last_name = document.getElementById("lname").value;
  const phone = document.getElementById("phn").value;
  const email = document.getElementById("eml").value;
  const info = document.getElementById("info").value;

  var templateParams = {
    first_name: first_name,
    last_name: last_name,
    phone: phone,
    email: email,
    info: info,
  };

  try {
    Object.keys(templateParams).forEach((key) => {
      if (!templateParams[key]) {
        throw new Error("Please fill all the fields");
      }
    });
  } catch (e) {
    alert(e.message);
    return;
  }

  emailjs.send("service_sfbq9ol", "template_qnm00bc", templateParams).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
      alert("Email sent successfully");
    },
    (error) => {
      console.log("FAILED...", error);
    }
  );
}

function sendCV() {
  emailjs.init({
    publicKey: "kysivMeVeegptu56S",
  });

  const first_name = document.getElementById("cvname").value;
  const last_name = document.getElementById("cvlastname").value;
  const phone = document.getElementById("cvphone").value;
  const email = document.getElementById("cvemail").value;
  const position = document.getElementById("cvposition").value;
  const cv_link = document.getElementById("cvlink").value;

  var templateParams = {
    first_name: first_name,
    last_name: last_name,
    phone: phone,
    email: email,
    position: position,
    cv_link: cv_link,
  };

  try {
    Object.keys(templateParams).forEach((key) => {
      if (!templateParams[key]) {
        throw new Error("Please fill all the fields");
      }
    });
  } catch (e) {
    alert(e.message);
    return;
  }

  emailjs.send("service_sfbq9ol", "template_qoqmb0d", templateParams).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
      alert("Email sent successfully");
    },
    (error) => {
      console.log("FAILED...", error);
    }
  );
}
