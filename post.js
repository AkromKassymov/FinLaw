const language = localStorage.getItem("lang") || 1;

function loadPost() {
  const theme = document.getElementById("theme");
  const date = document.getElementById("date");
  const post__image = document.getElementById("post__image");
  const post__content = document.getElementById("post__content");

  const db = firebase.firestore();
  db.collection("posts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        if (post.id == id) {
          theme.innerHTML = post.theme[language];
          date.innerHTML = post.date;
          post__image.src = post.img;
          post__content.innerHTML = post.content[language];
        }
      });
    });

  // fetch("posts.json")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const id = urlParams.get("id");
  //     console.log(data);
  //     for (const post of data) {
  //       if (post.id == id) {
  //         theme.innerHTML = post.theme[language];
  //         date.innerHTML = post.date;
  //         post__image.src = post.img;
  //         post__content.innerHTML = post.content[language];
  //       }
  //     }
  //   });
}
