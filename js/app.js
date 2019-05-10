const randomUserAPI = 'https://randomuser.me/api/?results=12&nat=us,nz,au';
const gallery = document.getElementById('gallery');
const userData = [];
const headerInner = document.getElementsByClassName('header-inner-container');
const headerText = document.getElementsByClassName('header-text-container');
const search = document.getElementsByClassName('search-container');

function initiate(results) {
    results.forEach(person => {
        userData.push(person);
        gallery.innerHTML += person.card;
    });
}

function appendModal(jsDataId) {
    gallery.insertAdjacentHTML('afterend', userData[jsDataId].modal);
    const modal = document.querySelector('.modal-container');

    modal.addEventListener('click', (e) => {
        if(e.target.textContent === 'X') {
            modal.parentNode.removeChild(modal);
        }
    })

}


gallery.addEventListener('click', (e) => {
    let jsDataId = e.target.attributes[1].value;
    if(!isNaN(jsDataId)) {
        appendModal(jsDataId);
    }
})




fetch(randomUserAPI)
    .then(response => response.json())
    .then(data => 
        data.results.map((person, index) => new Person(person, index)))
    .then(initiate)
    .catch( err => console.log(err))



