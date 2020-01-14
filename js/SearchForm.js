class SearchForm {
  constructor(data) {
    this.data = data;
    this.tag = this.tag();
    this.directoryShowSearchResults = null;
    this.submitEvent = this.tag.addEventListener('submit', this.submitHandler.bind(this));
    this.keyupEvent = this.tag.addEventListener('keyup', this.keyupHandler.bind(this));
  }

  tag() {
    const tag = document.createElement('form');
    tag.setAttribute('action', '#');
    tag.setAttribute('method', 'get');
    return tag;
  }

  inputs() {
    return ` 
      <input type="search" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" class="search-submit"> `;
  }

  element() {
    const element = this.tag;
    element.innerHTML = this.inputs();
    return element;
  }

  validation(keyValue) {
    if(keyValue === 'backspace') return true;
    const letterRegex = /^[a-z]$/;
    return letterRegex.test(keyValue);
  }

  searchForValue() {
    const input = document.querySelector('input.search-input');
    const value = input.value.toLowerCase();
    const arrayResults = this.data.filter(person => {
      let { first, last } = person.info.name;
      let name = first.toLowerCase() + ' ' + last.toLowerCase();
      if(name.includes(value)) return person;
    });
    return arrayResults.length ? arrayResults : false;
  }

  submitHandler(event) {
    event.preventDefault();
    const results = this.searchForValue();
    return this.directoryShowSearchResults(results);
  }
  
  keyupHandler(event) { 
    const keyValue = event.key.toLowerCase();
    if(this.validation(keyValue) === false) return;
    const results = this.searchForValue();
    return this.directoryShowSearchResults(results);
  }
}