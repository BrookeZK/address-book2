// Business Interface Logic

// Business Logic for AddressBook. First creating a global varable and saving Contacts inside of it. The empty array called contacts is a single property where we will store entries in our address book. Each time a new AddressBook is created, it will have a currentId property that begins at 0.

function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

// The addContact method takes a Contact object as an argument. It uses push() to add the Contact provided as aan argument to the AddressBook's contacts array property

AddressBook.prototype.addContact = function(contact) {
  this.contacts.push(contact);
}

// This new method of .assignId will increment the property this.currentId on the AddressBook object by 1 and return the updated value. This mimics a database by creating sequentially incrementing ID values which are never repeated.

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.findContact = function (id) {
  for (var i=0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
    }
   }
  };
  return false;
}

AddressBook.prototype.deleteContact = function (id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id ==id) {
        delete this.contacts[i];
        return true;
    }
   }
  };
  return false;
}
// Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}
