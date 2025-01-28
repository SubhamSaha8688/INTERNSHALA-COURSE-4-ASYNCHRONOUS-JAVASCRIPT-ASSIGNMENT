document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("asyncBtn")
  const output = document.getElementById("output")

  button.addEventListener("click", async () => {
    output.textContent = "Loading..."

    try {
      const data = await fetchDataWithTimeout()
      const posts = data.posts
      let postContent = "Fetched posts:\n\n"
      posts.forEach((post) => {
        postContent += `Title: ${post.title}\n`
        postContent += `Body: ${post.body}\n\n`
      })
      output.textContent = postContent
    } catch (error) {
      output.textContent = `Error: ${error.message}`
    }
  })
})

async function fetchDataWithTimeout() {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Operation timed out")), 5000))

  try {
    const response = await Promise.race([fetch("https://dummyjson.com/posts"), timeout])
    return await response.json()
  } catch (error) {
    if (error.message === "Operation timed out") {
      throw error
    } else {
      throw new Error("Network error")
    }
  }
}

