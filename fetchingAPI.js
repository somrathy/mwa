/** @format */

// the function to fetch the books from the api
function fetchBooks(category, containerId) {
  const url = `https://openlibrary.org/subjects/${category}.json?limit=10`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const books = data.works;
      const container = document.getElementById(containerId);

      // Displaying the books
      books.forEach((book) => {
        const bookElement = document.createElement("li");
        bookElement.className = "book";
        bookElement.innerHTML = `<strong>Title:</strong> ${book.title} <strong>   Author:</strong> ${book.authors[0].name}<br />
              <img src="https://covers.openlibrary.org/b/ID/${book.cover_id}-S.jpg"/>`;
        container.appendChild(bookElement);
        console.log(book);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// Fetches 10 fantasy books
fetchBooks("fantasy", "booksContainer");

// Then the subcategories:
const categories = ["high_fantasy", "urban_fantasy", "epic_fantasy"];

categories.forEach((category) => {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category";
  categoryDiv.innerHTML = `<h2>${category
    .split("_")
    .join(" ")
    .toUpperCase()}</h2><div id="${category}Container"></div>`;
  document.body.appendChild(categoryDiv);

  // Fetches 10 books for each subcategory
  fetchBooks(category, `${category}Container`);
});
