'use strict'

const booksLi = document.getElementById('books');
var myResults = {}

getRandomBook();

 async function getResultsInCards(){
     myResults = await getBooksBySearch();
}


async function getRandomBook() {
    const resp = await fetch('https://www.googleapis.com/books/v1/volumes?q=all');
    const respData = await resp.json();
    const randomBook = respData.items[0];
    addBook(randomBook, true);

}

 function getBooksBySearch() {
     const searchKey = document.getElementById('search-term').value;
     const postsPromise = fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchKey}`)
     var results = []
     var i = 0;
    booksLi.innerHTML = '';
     postsPromise
          .then(data => data.json())
           .then(data => {
               while(results.length<10){
                   results.push(data.items[i]);
                   addBook(results[i],true);
                   i++;
               }
               return results;
           }).catch(function (err) {
            console.error(err);
        });
}


function addBook(bookData, random = false) {

    const book = document.createElement('div');
    book.classList.add('book');

    book.innerHTML = `
        <div class="book-header">
            ${
        random
            ? `
            <span class="random"> ${bookData.volumeInfo.authors}</span>
            `
            : ''
    }
            <img
                src="${bookData.volumeInfo.imageLinks.thumbnail}"
                alt="${bookData.strBook}"
            />
        </div>
        <div class="book-body">
            <h4>${bookData.volumeInfo.title}</h4>
           
        </div>
    `;

    booksLi.appendChild(book);
}

