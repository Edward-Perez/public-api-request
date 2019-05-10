const randomUserAPI = 'https://randomuser.me/api/?results=12&nat=us,nz,au';
const gallery = document.getElementById('gallery');
const headerInner = document.getElementsByClassName('header-inner-container');
const headerText = document.getElementsByClassName('header-text-container');
const search = document.getElementsByClassName('search-container');



fetch(randomUserAPI)
    .then(response => response.json())
    .then(data => 
        data.results.map((person, index) => new Person(person, index)))
    .then(more => console.log(more))
    .catch( err => console.log(err))
