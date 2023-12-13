/** @format */

// Funktionen der fetcher bøgerne fra Open Library APIt
function fetchFantasyBooks(category, containerId) {
  const url = `https://openlibrary.org/subjects/${category}.json?`; //limit=10: specificeret at det skal være limit til 10 bøger (så det ikke er overvældende antallet af bøger der vises)
  // const url = `https://openlibrary.org/subjects/${category}.json?limit=10`; //limit=10: specificeret at det skal være limit til 10 bøger (så det ikke er overvældende antallet af bøger der vises)

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const books = data.works;
      const container = document.getElementById(containerId);

      // Visning af bøgerne
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

// Fetch fantasy bøgerne
fetchFantasyBooks("fantasy", "booksContainer");

// Underemnerne:
const categories = ["high_fantasy", "urban_fantasy", "epic_fantasy"];

categories.forEach((category) => {
  const categoryDiv = document.createElement("li");
  categoryDiv.className = "category";
  categoryDiv.innerHTML = `<h2>${category
    .split("_")
    .join(" ")
    .toUpperCase()}</h2><div id="${category}Container"></div>`;
  document.body.appendChild(categoryDiv);

  // Fetcher bøger for hver katagori
  fetchFantasyBooks(category, `${category}Container`);
});
