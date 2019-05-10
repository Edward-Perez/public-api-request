const randomUserAPI = 'https://randomuser.me/api/?results=12&nat=us,nz,au';
const gallery = document.getElementById('gallery');
const userData = [];
const headerInner = document.getElementsByClassName('header-inner-container');
const headerText = document.getElementsByClassName('header-text-container');


function initiate(results) {
    results.forEach(person => {
        userData.push(person);
        gallery.innerHTML += person.card;
    });
    searchBar();
}

function appendModal(jsDataId) {
    let currentIndex = parseInt(jsDataId);
    gallery.insertAdjacentHTML('afterend', userData[currentIndex].modal);
    const modal = document.querySelector('.modal-container');
    const prev = document.querySelector('#modal-prev');
    const next = document.querySelector('#modal-next');

    if(currentIndex === 0) {
        prev.style.display = 'none';
    }
    if(currentIndex === userData.length -1) {
        next.style.display = 'none';
    }

    modal.addEventListener('click', (e) => {
        const eText = e.target.textContent.toLowerCase();
        if(eText === 'x' || eText === 'next' || eText === 'prev') {
            modal.parentNode.removeChild(modal);
        }
        if(eText === 'next' ) {
            appendModal(currentIndex + 1);
        }
        if(eText === 'prev') {
            appendModal(currentIndex - 1);
        }
    })

}

function searchBar() {
    const search = document.querySelector('.search-container');
    let searchString = '';
    search.innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`;

    search.addEventListener('keyup', (e) => {
        console.log(e);
        const userKey = e.key.toLowerCase();
        const letterRegex = /^[a-z]$/;
        if(userKey === 'backspace') {
            searchString = searchString.slice(0, -1);
        }
        if(letterRegex.test(userKey)) {
            searchString += userKey;
            // console.log(userData[0].name);               working on search function
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



