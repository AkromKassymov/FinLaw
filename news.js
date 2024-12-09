const language = localStorage.getItem("lang") || 1;

async function loadCards() {
  const cardsView = document.getElementById("cards__view");
  const db = firebase.firestore();
  let cards = [];

  db.collection("posts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        console.log(post);
        cardsView.innerHTML += `
        <a
          class="navbar__news__card"
          href="post.html?id=${post.id}"
        >
          <div class="navbar__news__card__left">
            <img
              src="${post.img}"
              alt="blogimg1"
              class="blogimg1"
            />
          </div>
          <div class="navbar__news__card__right">
            <div class="news__card__right__top">
              <div class="date">${post.theme[language]}</div>
              <div class="date">${post.date}</div>
            </div>
            <div class="news__card__right__bottom">
              <div class="card__nav__title">${post.title[language]}</div>
              <div class="card__nav__text">
                  ${post.cardShortDescription[language]}
              </div>
            </div>
          </div>
        </a>
        `;
      });
    });

  // fetch("posts.json")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     for (const post of data) {

  //     }
  //   });
}
