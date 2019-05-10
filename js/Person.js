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
        this.dob = this.birthFormat();
        this.card = this.cardDiv();
        this.modal = this.modalDiv();
    }

    cardDiv() {
        const cardElement =
        `<div class="card" js-data-id="${this.id}">
            <div class="card-img-container" js-data-id="${this.id}">
                <img class="card-img" js-data-id="${this.id}" src="${this.img}" alt="profile picture">
            </div>
            <div class="card-info-container" js-data-id="${this.id}">
                <h3 id="name" js-data-id="${this.id}" class="card-name cap">${this.name} ${this.lsName}</h3>
                <p class="card-text" js-data-id="${this.id}">${this.email}</p>
                <p class="card-text cap" js-data-id="${this.id}">${this.city}, ${this.state}</p>
            </div>
        </div>`;
        return cardElement;
    }

    modalDiv() {
        const modalElement =
            `<div class="modal-container js-data-id="${this.id}">
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
                        <p class="modal-text">Birthday: ${this.dob}</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`;
        return modalElement;
    }

    birthFormat() {
        const birth = this.data.dob.date;
        const regexDob = /^(\d{4})\-(\d{2})\-(\d{2})(.*)$/;
        return birth.replace(regexDob, '$2/$3/$1');
    }
}