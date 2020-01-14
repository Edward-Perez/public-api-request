class Modal {
  constructor(info) {
    this.info = info;
    this.tag = this.tag();
    this.disablePrevButton = false;
    this.disableNextButton = false;
    this.directoryShowModal = null;
    this.clickEvent = this.tag.addEventListener('click', this.clickHandler.bind(this));
  }

  tag() {
    const div = document.createElement('div');
    div.setAttribute('class', 'modal-container');
    return div;
  }

  element() {
    const element = this.tag;
    element.innerHTML = this.content();
    return element;
  }

  content() {
    const { disableNextButton, disablePrevButton } = this;
    const { name, img, email, location, dob, cell} = this.info;
    const isPrevDisabled = disablePrevButton ? 'disabled' :  '';
    const isNextDisabled = disableNextButton ? 'disabled' :  '';
    return `
        <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
            <img class="modal-img" src="${img}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${location.city}</p>
            <hr>
            <p class="modal-text">${cell}</p>
            <p class="modal-text cap">${location.street.name}, ${location.state} ${location.postcode}</p>
            <p class="modal-text">Birthday: ${dob}</p>
          </div>
        </div>
        <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn" ${isPrevDisabled}>Prev</button>
          <button type="button" id="modal-next" class="modal-next btn" ${isNextDisabled}>Next</button>
        </div> `;
  }

  remove() {
    return this.tag.parentNode.removeChild(this.tag);
  }

  clickHandler(event) {
    const text = event.target.textContent.toLowerCase();
    if(text !== 'x' && text !== 'next' && text !== 'prev') return
    if(text === 'next' ) this.directoryShowModal(this.info.id + 1);
    if(text === 'prev') this.directoryShowModal(this.info.id - 1);
    this.remove();
  }
}