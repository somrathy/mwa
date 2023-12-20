/** @format */

// This function fetches books from Open Library API
function fetchFantasyBooks(category, containerId) {
  const url = `https://openlibrary.org/subjects/${category}.json?`;

  //This is where we fetch the url and then get the response in json which we then retrieve the data.
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const books = data.works;
      const container = document.getElementById(containerId);

      // Then we say that for each book we want the title, author and cover of the book. We have decided that the book element is in an li html-element
      books.forEach((book) => {
        const bookElement = document.createElement("li");
        bookElement.className = "book";
        bookElement.innerHTML = `<strong>Title:</strong> ${book.title} <strong>   Author:</strong> ${book.authors[0].name}<br />
              <img src="https://covers.openlibrary.org/b/ID/${book.cover_id}-S.jpg"/>`;
        container.appendChild(bookElement);
      });
    })
    //here we want to catch errors if they occur. If they occur we want the error to show in our console.
    .catch((error) => {
      console.log(error);
    });
}

// Here we make a function that we call when we want to fetch books from a certain sub category.
function populateTheBooks(categories) {
  categories.forEach((category) => {
    const categoryDiv = document.createElement("li");
    categoryDiv.className = "category";
    categoryDiv.innerHTML = `<h2>${category
      .split("_")
      .join(" ")
      .toUpperCase()}</h2><div id="${category}Container"></div>`;
    document.getElementById("allBooks").appendChild(categoryDiv);

    // Fetches books for the chosen category.
    fetchFantasyBooks(category, `${category}Container`);
  });
}
