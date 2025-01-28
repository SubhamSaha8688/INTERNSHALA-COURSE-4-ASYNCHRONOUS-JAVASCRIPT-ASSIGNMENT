document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("callbackBtn")
  const output = document.getElementById("output")

  button.addEventListener("click", () => {
    output.textContent = "Waiting for callback..."

    setTimeout(() => {
      output.textContent = "Callback executed after 5 seconds"

      fetchData((error, data) => {
        if (error) {
          output.textContent = `Error: ${error.message}`
        } else {
          const posts = data.posts
          let postContent = "Fetched posts:\n\n"
          posts.forEach((post) => {
            postContent += `Title: ${post.title}\n`
            postContent += `Body: ${post.body}\n\n`
          })
          output.textContent = postContent
        }
      })
    }, 5000)
  })
})

function fetchData(callback) {
  fetch("https://dummyjson.com/posts")
    .then((response) => response.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null))
}

