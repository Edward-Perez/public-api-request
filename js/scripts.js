const randomUserAPI = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const userData = [];
/**
 *  Appends HTML elements, add e.listener to append modal to DOM 
 * @param {Array} - array contains each Person Class created from JSON data and stores into global var
 */
 
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

/**
 * Appends modal based on js-data-id attribute value from event trigger element
 * @param {string} jsDataId - Value of js-data-id attribute is equivalent to the Class index position inside global var userData
 */

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

/**
 * Appends search bar to the DOM / Adds key up and submit event listener to search bar
 */

function searchBar() {
    document.querySelector('.search-container').innerHTML = 
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
     </form>`;
    const search = document.querySelector('.search-input');

    search.parentElement.addEventListener('submit', (e) => {
        e.preventDefault();
        let searchVal = search.value.toLowerCase();
        gallery.innerHTML = '';
        userData.forEach(person => {
            if(person.name.search(searchVal) != -1 || person.lsName.search(searchVal) != -1 ) {
                gallery.innerHTML += person.card;
            }
        })
        if(gallery.innerHTML === '') {
            gallery.innerHTML = '<h3>Sorry there was no match.</h3>';
        }
    })
    
    search.addEventListener('keyup', (e) => {
        if(e.key == undefined) { 
            return; 
        }
        const userKey = e.key.toLowerCase();
        let searchVal = search.value.toLowerCase();
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

/**
 * fetch retrieves data response, parse data to JSON, 
 * Creates new Array, stores a new Person Class for each value 
 * calls initiate function
 */
fetch(randomUserAPI)
    .then(response => response.json())
    .then(data => 
        data.results.map((person, index) => new Person(person, index)))
    .then(initiate)
    .catch( error => gallery.innerHTML = `<h3>Something went wrong, maybe refresh? ${error}</h3>`)



