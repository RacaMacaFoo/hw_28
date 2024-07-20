const findBtn = document.getElementById("findBtn");
const clearBtn = document.getElementById("clearBtn");

const idSearch = document.getElementById("idSearch");

const postHolder = document.getElementById("postHolder");
const commHolder = document.getElementById("commHolder");

findBtn.addEventListener("click", () => {
  if (!idSearch.value) {
    alert("Fild can't be empty");
    throw new Error("Fild can't be empty");
  }
  fetch(`https://jsonplaceholder.typicode.com/posts/${idSearch.value}`)
    .then((data) =>data.json()
      .then((post) => {
        if (Object.keys(post).length === 0) {
          postHolder.innerHTML = "<h2>NO data. Try again</h2>";
          postHolder.style.display = "block";
        } else {
          postHolder.children[0].textContent = post.title;
          postHolder.children[1].textContent = post.body;
          postHolder.style.display = "block";
          commHolder.style.display = "none"
        }
      })
      .catch((err) => {
        console.error(err);
      })
    )
    .catch((err) => {
      console.error(err);
    });
});

commBtn.addEventListener("click", () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${idSearch.value}`)
      .then(data => data.json()
        .then(comments => {
          commHolder.innerHTML = `
          <h2>Comments</h2>
          ${comments.map((comment) => `<p>${comment.body}</p>`).join('')}`
          commHolder.style.display = "block"
        })
        .catch(err => console.error(err)))
      .catch(err => console.error(err))
})

clearBtn.addEventListener("click", () => {
  idSearch.value = null;
  commHolder.style.display = "none"
  postHolder.style.display = "none";
});


