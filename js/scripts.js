// Business Logic for AddressBook ---------
function AddressBook() {
  (this.contacts = []), (this.currentId = 0);
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
};

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  }
  return false;
};

AddressBook.prototype.deleteContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  }
  return false;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, address) {
  (this.firstName = firstName),
    (this.lastName = lastName),
    (this.phoneNumber = phoneNumber),
    (this.email = email);
    (this.address = address);
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};


function Address(street,city,zip, type){
 this.street = street;
 this.city = city;
 this.zip = zip;
 this.type = type
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function (contact) {
    htmlForContactInfo +=
      "<li id=" +
      contact.id +
      ">" +
      contact.firstName +
      " " +
      contact.lastName +
      "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email); 
  $(".address").html(`<>`); 
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append(
    "<button class='deleteButton' id=" + contact.id + ">Delete</button>"
  );
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function (event) {
    showContact(event.target.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedStreet = $("input#street").val();
    var inputtedCity = $("input#city").val();
    var inputtedZip = $("input#zip").val();
    var inputtedType = $("input#type").val();
    $("input#new-first-name").val("");  
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#street").val('');
    var newAdress = new Address(inputtedStreet,  inputtedCity,  inputtedZip, inputtedType)
    var newContact = new Contact(
      inputtedFirstName,
      inputtedLastName,
      inputtedPhoneNumber,
      inputtedEmail,
      newAddress
    );
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
