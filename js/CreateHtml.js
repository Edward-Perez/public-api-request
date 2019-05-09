function createHtml(tag, property, value, appendTo) {
    const element = document.createElement(tag);
    element[property] = value;
    appendTo.appendChild(element);
    return element;
}

function createCards(json) {
    let info = json.results;

    info.forEach(person => {
        const divCard = createHtml('div', 'className', 'card', gallery);
        const divImg = createHtml('div', 'className', 'card-img-container', divCard);
        const image = createHtml('img', 'src', person.picture.large, divImg);
                image.className = 'card-img';
                image.alt = "profile picture";
        const divInfo = createHtml('div', 'className', 'card-info-container', divCard);
        const name = createHtml('h3', 'className', 'card-name cap', divInfo);
                name.id ='name';
                name.textContent = `${person.name.first} ${person.name.last}`;
        const email = createHtml('p', 'className', 'card-text', divInfo)
                .textContent = person.email;
        const location = createHtml('p', 'className', 'card-text cap', divInfo)
                .textContent = `${person.location.city}, ${person.location.state}`;
    });
}

function createModal(json){
    
}
/* <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">first last</h3>
        <p class="card-text">email</p>
        <p class="card-text cap">city, state</p>
    </div>
</div>

//////////////
<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
             */