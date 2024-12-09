const language = localStorage.getItem("lang") || 1;

const loadData = () => {
  const db = firebase.firestore();
  const postsView = document.getElementById("post_view");
  const postsCollection = db.collection("posts");
  postsCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const post = {
        id: data.id,
        date: data.date,
        title: data.title[language],
        theme: data.theme[language],
        cardShortDescription: data.cardShortDescription[language],
        content: data.content[language],
        img: data.img,
      };
      postsView.innerHTML += `
        <div class="postView" onclick="editModalOpen(${post.id})">
          <div class="postImage"><img src="${post.img}" /></div>
          <div class="postId">ID: ${post.id}</div>
          <div class="postTitle">Title: ${post.title}</div>
          <div class="postDate">Date: ${post.date}</div>
          <div class="postShort">Short Description: ${post.cardShortDescription}</div>
        </div>        
      `;
    });
  });

  const qaView = document.getElementById("legal_view");
  const qaCollection = db.collection("services");

  qaCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id != "1") return;
      data.questions.map((qa) => {
        qaView.innerHTML += `
          <div class="qaView" onclick="editLegalModalOpen('${qa.question[0]}')">
              <div class="qaTitle">Title EN: ${qa.question[0]}</div>
              <div class="qaTitle">Title AZ: ${qa.question[1]}</div>
          </div>
        `;
      });
    });
  });

  const fiView = document.getElementById("finance_view");
  const fiCollection = db.collection("services");

  fiCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id == "1") return;
      data.questions.map((qa) => {
        fiView.innerHTML += `
          <div class="qaView" onclick="editLegalModalOpen('${qa.question[0]}')">
              <div class="qaTitle">Title EN: ${qa.question[0]}</div>
              <div class="qaTitle">Title AZ: ${qa.question[1]}</div>
          </div>
        `;
      });
    });
  });
};
const editModalOpen = (openId) => {
  const editPostView = document.getElementById("editPostValues");
  const db = firebase.firestore();
  const postsCollection = db.collection("posts");

  postsCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id == openId) {
        console.log(data);
        editPostView.innerHTML = `
          <input type="text" value="${data.id}" id="idEdit" placeholder="id" />
          <input type="text" value="${
            data.date
          }" id="dateEdit" placeholder="date" />
          <input type="text" value="${
            data.theme ? data.theme[0] : ""
          }" id="themeENEdit" placeholder="themeEN" />
          <input type="text" value="${
            data.theme ? data.theme[1] : ""
          }" id="themeAZEdit" placeholder="themeAZ" />
          <input type="text" value="${
            data.title ? data.title[0] : ""
          }" id="titleENEdit" placeholder="titleEN" />
          <input type="text" value="${
            data.title ? data.title[1] : ""
          }" id="titleAZEdit" placeholder="titleAZ" />
          <input
            type="text"
            id="cardShortDescriptionENEdit"
            value="${
              data.cardShortDescription ? data.cardShortDescription[0] : ""
            }"
            placeholder="cardShortDescriptionEN"
          />
          <input
            type="text"
            value="${
              data.cardShortDescription ? data.cardShortDescription[1] : ""
            }"
            id="cardShortDescriptionAZEdit"
            placeholder="cardShortDescriptionAZ"
          />
          <input type="text" value="${
            data.content ? data.content[0] : ""
          }" id="contentENEdit" placeholder="contentEN html" />
          <input type="text" value="${
            data.content ? data.content[1] : ""
          }" id="contentAZEdit" placeholder="contentAZ html" />
          <input type="text" value="${
            data.img || ""
          }" id="imgEdit" placeholder="img link" />
        `; // Correctly closed template literal
      }
    });
  });

  document.getElementById("modalEdit").style.display = "flex";
};

const addPost = () => {
  console.log("dsa");
  const id = document.getElementById("id").value;
  const titleEn = document.getElementById("titleEN").value;
  const titleAZ = document.getElementById("titleAZ").value;
  const date = document.getElementById("date").value;
  const themeEN = document.getElementById("themeEN").value;
  const themeAZ = document.getElementById("themeAZ").value;
  const cardShortDescriptionEN = document.getElementById(
    "cardShortDescriptionEN"
  ).value;
  const cardShortDescriptionAZ = document.getElementById(
    "cardShortDescriptionAZ"
  ).value;
  const contentEN = document.getElementById("contentEN").value;
  const contentAZ = document.getElementById("contentAZ").value;
  const img = document.getElementById("img").value;

  const dataToSave = {
    id: id,
    date: date,
    title: [titleEn, titleAZ],
    theme: [themeEN, themeAZ],
    cardShortDescription: [cardShortDescriptionEN, cardShortDescriptionAZ],
    content: [contentEN, contentAZ],
    img: img,
  };
  let isOk = true;
  Object.keys(dataToSave).forEach((key) => {
    if (!dataToSave[key]) {
      alert("Please fill all fields, " + key + " is empty");
      isOk = false;
    }
  });
  if (!isOk) return;

  const db = firebase.firestore();
  const postsCollection = db.collection("posts");

  postsCollection
    .add(dataToSave)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    })
    .then(() => {
      window.location.reload();
    });
};

const updatePost = () => {
  const id = document.getElementById("idEdit").value;
  const titleEn = document.getElementById("titleENEdit").value;
  const titleAZ = document.getElementById("titleAZEdit").value;
  const date = document.getElementById("dateEdit").value;
  const themeEN = document.getElementById("themeENEdit").value;
  const themeAZ = document.getElementById("themeAZEdit").value;
  const cardShortDescriptionEN = document.getElementById(
    "cardShortDescriptionENEdit"
  ).value;
  const cardShortDescriptionAZ = document.getElementById(
    "cardShortDescriptionAZEdit"
  ).value;
  const contentEN = document.getElementById("contentENEdit").value;
  const contentAZ = document.getElementById("contentAZEdit").value;
  const img = document.getElementById("imgEdit").value;

  const dataToSave = {
    id: id,
    date: date,
    title: [titleEn, titleAZ],
    theme: [themeEN, themeAZ],
    cardShortDescription: [cardShortDescriptionEN, cardShortDescriptionAZ],
    content: [contentEN, contentAZ],
    img: img,
  };

  Object.keys(dataToSave).forEach((key) => {
    if (!dataToSave[key]) {
      alert("Please fill all fields, " + key + " is empty");
      return;
    }
  });

  const db = firebase.firestore();
  const postsCollection = db.collection("posts");

  postsCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id == id) {
        postsCollection
          .doc(doc.id)
          .update(dataToSave)
          .then(() => {
            window.location.reload();
          });
        closeModalEdit();
      }
    });
  });
};

const deletePost = () => {
  const id = document.getElementById("idEdit").value;
  const db = firebase.firestore();

  const postsCollection = db.collection("posts");

  postsCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id == id) {
        postsCollection
          .doc(doc.id)
          .delete()
          .then(() => {
            window.location.reload();
          });
        closeModalEdit();
      }
    });
  });
};

const editLegalModalOpen = (ques) => {
  const editLegalView = document.getElementById("editQALegal");
  const db = firebase.firestore();
  const servicesCollection = db.collection("services");

  servicesCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.questions.map((qa) => {
        if (ques == qa.question[0]) {
          console.log("1");
          editLegalView.innerHTML = `
            <input type="text" style="display: none" value="${qa.question[0]}" id="questionEnEditp" placeholder="questionEn" />
            <input type="text" value="${qa.question[0]}" id="questionEnEdit" placeholder="questionEn" />
            <input type="text" value="${qa.question[1]}" id="questionAzEdit" placeholder="questionAz" />
            <input type="text" value="${qa.answer[0]}" id="answerENEdit" placeholder="answerEN" />
            <input type="text" value="${qa.answer[1]}" id="answerAZEdit" placeholder="answerAZ" />
          `;
        }
      });
    });
  });

  document.getElementById("editQAModalLegal").style.display = "flex";
};

const editLegal = () => {
  const questionEnID = document.getElementById("questionEnEditp").value;
  const questionEn = document.getElementById("questionEnEdit").value;
  const questionAz = document.getElementById("questionAzEdit").value;
  const answerEN = document.getElementById("answerENEdit").value;
  const answerAZ = document.getElementById("answerAZEdit").value;

  const dataToSave = {
    question: [questionEn, questionAz],
    answer: [answerEN, answerAZ],
  };

  const db = firebase.firestore();
  const servicesCollection = db.collection("services");

  servicesCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.questions.map((qa) => {
        console.log(qa);
        if (qa.question[0] == questionEnID) {
          const newData = data;
          newData.questions.forEach((item, index) => {
            if (item.question[0] == questionEnID) {
              newData.questions[index] = dataToSave;
            }
          });
          servicesCollection
            .doc(doc.id)
            .update(newData)
            .then(() => {
              window.location.reload();
            });
          closeModalEdit();
        }
      });
    });
  });
};

const deleteLegal = () => {
  const questionEn = document.getElementById("questionEnEdit").value;
  const db = firebase.firestore();
  const servicesCollection = db.collection("services");

  servicesCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.questions.map((qa) => {
        if (qa.question[0] == questionEn) {
          // remove this quiestion
          const newData = data;
          newData.questions = newData.questions.filter(
            (item) => item.question[0] != questionEn
          );
          servicesCollection
            .doc(doc.id)
            .update(newData)
            .then(() => {
              window.location.reload();
            });
        }
      });
    });
  });
};

const setModalVisible = () => {
  document.getElementById("modal").style.display = "flex";
};

const closeModal = () => {
  document.getElementById("modal").style.display = "none";
};

const closeModalEdit = () => {
  document.getElementById("modalEdit").style.display = "none";
};

const locale = {
  data: [],
};

const openAddQAModalLegal = (type) => {
  // delete input with id 'type'
  document.getElementById("type").remove();
  // create new input <input type="text" value="legal" id="type" style="display: none;" disabled="true" />
  document.getElementById(
    "openAddQAModalLegal"
  ).innerHTML += `<input type="text" value="${type}" id="type" style="display: none;" disabled="true" />`;

  document.getElementById("openAddQAModalLegal").style.display = "flex";
};

const closeAddQAModalLegal = () => {
  document.getElementById("openAddQAModalLegal").style.display = "none";
};

const addQA = () => {
  const questionEN = document.getElementById("questionEnCreate").value;
  const questionAZ = document.getElementById("questionAzCreate").value;
  const answerEN = document.getElementById("answerENCreate").value;
  const answerAZ = document.getElementById("answerAZCreate").value;

  const type = document.getElementById("type").value;

  const dataToSave = {
    question: [questionEN, questionAZ],
    answer: [answerEN, answerAZ],
  };

  Object.keys(dataToSave).forEach((key) => {
    if (!dataToSave[key]) {
      alert("Please fill all fields, " + key + " is empty");
      return;
    }
  });

  const db = firebase.firestore();
  const servicesCollection = db.collection("services");

  servicesCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (type == "finance") {
        if (data.id == "2") {
          const newData = data;
          newData.questions.push(dataToSave);
          servicesCollection
            .doc(doc.id)
            .update(newData)
            .then(() => {
              window.location.reload();
            });
          closeAddQAModalLegal();
        }
      }
      if (type == "legal") {
        if (data.id == "1") {
          const newData = data;
          newData.questions.push(dataToSave);
          servicesCollection
            .doc(doc.id)
            .update(newData)
            .then(() => {
              window.location.reload();
            });
          closeAddQAModalLegal();
        }
      }
    });
  });
};

const closeLegal = () => {
  document.getElementById("editQAModalLegal").style.display = "none";
};

loadData();

const updateSocial = () => {
  const facebook = document.getElementById("facebookLink").value;
  const linkedin = document.getElementById("linkedinLink").value;
  const twitter = document.getElementById("twitterLink").value;
  const instagram = document.getElementById("instagramLink").value;

  const db = firebase.firestore();
  const localeCollection = db.collection("locale");

  localeCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.data.map((lng) => {
        Object.keys(lng).map((key) => {
          if (key == "facebook" && facebook) {
            lng[key] = facebook;
          }
          if (key == "linkedin" && linkedin) {
            lng[key] = linkedin;
          }
          if (key == "twitter" && twitter) {
            lng[key] = twitter;
          }
          if (key == "instagram" && instagram) {
            lng[key] = instagram;
          }
        });
      });
      localeCollection
        .doc(doc.id)
        .update(data)
        .then(() => {
          window.location.reload();
        });
    });
  });
};
