class Person {
    constructor(data, index) {
        this.data = data;
        this.id = index;
        this.name = data.name.first;
        this.lsName = data.name.last; 
        this.img= data.picture.large;
        this.email = data.email;
        this.cellPhone = data.cell;
        this.city = data.location.city;
        this.street = data.location.street;
        this.state = data.location.state;
        this.postCode = data.location.postcode;
        this.dob = this.dob();
        this.card = this.card();
        this.modal = this.modal();
    }

    card() {
        const cardDiv =
        `<div class="card" js-data-id="${this.id}">
            <div class="card-img-container">
                <img class="card-img" src="${this.img}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${this.name} ${this.lsName}</h3>
                <p class="card-text">${this.email}</p>
                <p class="card-text cap">${this.city}, ${this.state}</p>
            </div>
        </div>`;
        gallery.innerHTML += cardDiv;
    }

    modal() {
        const modalDiv =
            `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${this.img}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${this.name} ${this.lsName}</h3>
                        <p class="modal-text">${this.email}</p>
                        <p class="modal-text cap">${this.city}</p>
                        <hr>
                        <p class="modal-text">${this.cellPhone}</p>
                        <p class="modal-text">${this.street}, ${this.city}, ${this.postCode}</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`;
    }
}