// Select elements from DOM 

let elWrapper = document.querySelector('#wrapper');
let elForm = document.querySelector('#form');
let elSearchInput = document.querySelector('#search_input');
let elRating = document.querySelector('#rating');
let elCategorySelect = document.querySelector('#category-select');
let elBtn = document.querySelector('#btn');
let elResult = document.querySelector('#search-result');
let elTemplate = document.querySelector('#template').content;

// Get movies list 

let sliceMovies = movies.slice(0, 10);

let normalizedMovieList = sliceMovies.map(movieItem => {

    return {

        title: movieItem.Title.toString(),
        year: movieItem.movie_year,
        category: movieItem.Categories,
        rating: movieItem.imdb_rating,
        imageLink: `https://i.ytimg.com/vi/${movieItem.ytid}/mqdefault.jpg`,
        youtubeLink: `https://www.youtube.com/watch?v=${movieItem.ytid}`  

    }
})

// Create categories

function generateCategories(movieArray) {
    
    let categoryArray = [];

    movieArray.forEach(function(item) {

        let splitItem = item.category.split("|");

        splitItem.forEach(function (item) {
            if (!categoryArray.includes(item)) {
                categoryArray.push(item);
            }
        })
        
    })

    categoryArray.sort();

    let categoryFragment = document.createDocumentFragment();

    categoryArray.forEach(function (item) {
        let categoryOption = document.createElement('option');
        categoryOption.value = item;
        categoryOption.textContent = item;
        categoryFragment.appendChild(categoryOption);
    })

    elCategorySelect.appendChild(categoryFragment);
}

generateCategories(normalizedMovieList)

// Create render function

function renderMovies(movieArray, wrapper) {
    wrapper.innerHTML = null;
    let elFragment = document.createDocumentFragment();

    movieArray.forEach(movie => {
        let templateDiv = elTemplate.cloneNode(true);

        templateDiv.querySelector('.card-img-top').src = movie.imageLink;
        templateDiv.querySelector('.card-title').textContent = movie.title;
        templateDiv.querySelector('.card-year').textContent = movie.year;
        templateDiv.querySelector('.card-category').textContent = movie.category.split('|').join(', ');
        templateDiv.querySelector('.card-rate').textContent = movie.rating;
        templateDiv.querySelector('.card-link').href = movie.youtubeLink;

        elFragment.appendChild(templateDiv)

    });

    wrapper.appendChild(elFragment);

    elResult.textContent = movieArray.length;
}

renderMovies(normalizedMovieList, elWrapper);

elForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    let selectOption = elCategorySelect.value;

    let categoryMovies = [];

    if (selectOption === 'All') {
        categoryMovies = normalizedMovieList
    } else {
        categoryMovies = normalizedMovieList.filter(function (item) {
            return item.category.split('|').includes(selectOption)
        })
    }

    renderMovies(categoryMovies, elWrapper);
})
