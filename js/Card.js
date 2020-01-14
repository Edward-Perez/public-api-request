class Card {
  constructor(person) {
    this.info = person;
    this.id = person.id;
    this.tag = this.tag();
    this.directoryShowModal = null;
    this.clickEvent = this.tag.addEventListener('click', () => this.directoryShowModal(this.id));
  }

  tag(){
    const tag = document.createElement('div');
    tag.setAttribute('class', 'card');
    return tag;
  }

  content() {
    const { name, img, email, location } = this.info;
    return `
      <div class="card-img-container">
        <img class="card-img" src="${img}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${location.city}, ${location.state}</p>
      </div> `;
  }

  element() {
    const element = this.tag;
    element.innerHTML = this.content();
    return element;
  }
}