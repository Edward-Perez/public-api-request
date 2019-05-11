const randomUserAPI = 'https://randomuser.me/api/?results=12&nat=us,nz,au';
const gallery = document.getElementById('gallery');
const userData = [];


function initiate(results) {
    searchBar();

    results.forEach(person => {
        userData.push(person);
        gallery.innerHTML += person.card;
    });

    gallery.addEventListener('click', (e) => {
        let jsDataId = e.target.attributes[1].value;
        if(!isNaN(jsDataId)) {
            appendModal(jsDataId);
        }
    })
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
    const searchContainer = document.querySelector('.search-container');
    searchContainer.innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`;
    const search = searchContainer.firstElementChild.firstElementChild;

    search.addEventListener('keyup', (e) => {
        const userKey = e.key.toLowerCase();
        const searchVal = search.value.toLowerCase();
        const letterRegex = /^[a-z]$/;

        if(letterRegex.test(userKey) || userKey == 'backspace') {
            search.placeholder = '';
            search.style.border = '1px solid rgba(200, 200, 200, 0.9)';
            gallery.innerHTML = '';
            userData.forEach(person => {
                if(person.name.search(searchVal) != -1 || person.lsName.search(searchVal) != -1 ) {
                    gallery.innerHTML += person.card;
                }
            })
            
        } else if (!isNaN(userKey)) {
            search.style.border = '2px solid rgba(200, 0, 0, 0.9)';
            search.value = '';
            search.placeholder = 'Only letters please.';
        }

        if(gallery.innerHTML === '') {
            gallery.innerHTML = '<h3>Sorry there was no match.</h3>';
        }
    })
}

fetch(randomUserAPI)
    .then(response => response.json())
    .then(data => 
        data.results.map((person, index) => new Person(person, index)))
    .then(initiate)
    .catch( err => console.log(err))



