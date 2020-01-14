class Directory {
  constructor(data) {
    this.list = this.createPersonClasses(data);
    this.listOnDisplay = this.updateListDisplay();
  }

  createPersonClasses(jsonData) {
    return jsonData.map((person, index) => new Person(person, index));// Index use as 'id'.
  }

  updateListDisplay(listArray = this.list) {
    this.listOnDisplay = listArray;
    return this.listOnDisplay
  }

  insertSearchForm() {
    const container = document.querySelector('.search-container'); 
    const form = new SearchForm(this.list);
    const directoryMethod = this.showSearchResults.bind(this);
    form.directoryShowSearchResults = directoryMethod;
    container.appendChild(form.element());
  }

  insertCards() {
    const container = document.querySelector('#gallery');
    const directoryMethod = this.showModal.bind(this);
    let personClass, cardClass;
    for(let i = 0; i < this.listOnDisplay.length; i++) {
      personClass = this.listOnDisplay[i];
      cardClass = personClass.card();
      cardClass.directoryShowModal = directoryMethod;
      container.appendChild(cardClass.element());
    }
  }

  displayPage() {
    this.insertCards();
    this.insertSearchForm();
  }

  removeListItems() {
    const galleryContainer = document.querySelector('#gallery');
    return galleryContainer.innerHTML = '';
  }

  // Used inside SearchForm Class to update Directory Class
  showSearchResults(list){
    this.removeListItems();
    this.updateListDisplay(list);
    this.insertCards()
  }

  // Used inside Modal Class to update Directory Class
  showModal(id) {
    const container = document.querySelector('#gallery');
    const directoryMethod = this.showModal.bind(this);
    const personClass = this.list[id];
    const modalClass = personClass.modal();
    if(id === 0) modalClass.disablePrevButton = true;
    if(id === this.list.length - 1) modalClass.disableNextButton = true;
    modalClass.directoryShowModal = directoryMethod;
    const modalHTML = modalClass.element();
    container.appendChild(modalHTML);
  }

  // Load json data before creating Directory instance.
  static async loadData() {
    const data = await fetch('https://randomuser.me/api/?results=12&nat=us')
    const json = await data.json();
    return json;
  }

  static notifyUserOfError(error = 'Working on it') {
    const galleryContainer = document.querySelector('#gallery');
    galleryContainer.innerHTML = `<h3>Something went wrong, maybe refresh? ${error}</h3>`;
    console.log(error);
  }

}    
