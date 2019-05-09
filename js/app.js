const apiUrl = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const headerInner = document.getElementsByClassName('header-inner-container');
const headerText = document.getElementsByClassName('header-text-container');
const search = document.getElementsByClassName('search-container');



fetch(apiUrl)
    .then(response => response.json())
    .then(createCards)
    .catch( err => console.log(err))




