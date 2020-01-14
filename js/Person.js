class Person {
  constructor(data, index) {
    this.info = this.info(data, index);
  }

  info(data, index) {
     return {
      name : data.name,
      id : index,
      img : data.picture.large,
      email : data.email,
      location : data.location,
      cell : data.cell,
      dob : this.birthFormat(data.dob.date)
    }
  }

  card() {
    const card = new Card(this.info);
    return card;
  }

  modal() {
    const modal = new Modal(this.info);
    return modal;
  }

  // Format birthday data to mm/dd/year
  birthFormat(dob) {
    const regexDob = /^(\d{4})\-(\d{2})\-(\d{2})(.*)$/;
    return dob.replace(regexDob, '$2/$3/$1');
  }
}