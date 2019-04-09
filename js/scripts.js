// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

// function AddressLog() {
//   this.addresses = [];
// }
//
// AddressLog.prototype.addAddress = function(address) {
//   this.addresses.push(address)
// }

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}


AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, addressObject) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress,
  this.addressObject = addressObject
}

// function Address(workAddress, homeAddress, otherAddress) {
//   this.workAddress = workAddress,
//   this.homeAddress = homeAddress,
//   this.otherAddress = otherAddress
// }

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook1 = new AddressBook();
var addressBook2 = new AddressBook();
var addressBook3 = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = whichAddressBook($("input:radio[name=exampleRadios]:checked").val()).findContact(contactId);
  $("#show-contact").toggle();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  if (contact.addressObject.homeAddress === "") {
    $("#one").hide();

  } else {
    $("#address1").html(contact.addressObject.homeAddress);
  };
  if (contact.addressObject.workAddress === "") {
    $("#two").hide();
  } else {
    $("#address2").html(contact.addressObject.workAddress);
  }
  if (contact.addressObject.otherAddress === "") {
    $("#three").hide();
  } else {
    $("#address3").html(contact.addressObject.otherAddress);
  }
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

function resetForm() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  $("input#new-email-address").val("");
  $("input#new-address").val("");
  $("input#new-address-home").val("");
  $("input#new-address-work").val("");
  $("input#new-address-other").val("");

  };

function whichAddressBook(submitType) {
  if (submitType == "option1") {
    submitType = addressBook1
    return submitType
    console.log(submitType);
  } else if (submitType == "option2") {
     return addressBook2
     console.log(submitType);
   } else if (submitType == "option3") {
     return addressBook3
     console.log(submitType);
   } else {
     console.log("breakie")
   }
};

// Keyup Keydown experiment

function experiment() {
  $("input").keydown(function(){
  $("input").css("background-color", "yellow");
  $("input").css("color", "#42f4e5");
});
$("input").keyup(function(){
  $("input").css("background-color", "pink");
  $("input").css("color", "hotpink");
});
}

$(document).ready(function() {
  attachContactListeners();
  experiment();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var submitType = $("input:radio[name=exampleRadios]:checked").val();

    console.log("alert");
    console.log(submitType);
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var homeAddress = $("input#new-address-home").val();
    var workAddress = $("input#new-address-work").val();
    var otherAddress = $("input#new-address-other").val();
    var addressObject = {homeAddress, workAddress, otherAddress};
    resetForm();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, addressObject);
    var addressBook = whichAddressBook(submitType);
    console.log(addressBook);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    console.log(addressObject);
  })
})
