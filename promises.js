document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("promiseBtn")
  const output = document.getElementById("output")

  button.addEventListener("click", () => {
    output.textContent = "Loading..."

    fetchDataWithTimeout()
      .then((data) => {
        const posts = data.posts
        let postContent = "Fetched posts:\n\n"
        posts.forEach((post) => {
          postContent += `Title: ${post.title}\n`
          postContent += `Body: ${post.body}\n\n`
        })
        output.textContent = postContent
      })
      .catch((error) => {
        output.textContent = `Error: ${error.message}`
      })
  })
})

function fetchDataWithTimeout() {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Operation timed out"))
    }, 5000)

    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => {
        clearTimeout(timeoutId)
        resolve(data)
      })
      .catch((error) => {
        clearTimeout(timeoutId)
        reject(error)
      })
  })
}

