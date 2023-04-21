$(document).ready(function(){


});

function validateForm() {

    if(!validateName())
        return false;
    if(!validateEmail())
        return false;
    if(!validatePhone())
        return false;
    if(!validateAddress())
        return false;
    if(!validateCity())
        return false;
    if(!validateZip())
        return false;
    if(!validateComments())
        return false;

    if (confirm("Thank you for submitting the form. Do you need a present as a token of reward") == true) {
        return true;
    }
    else
        return false;

    return true;

}

function validateName() {
    let fname = document.forms["feedbackForm"]["fname"].value;
    if (fname == "") {
        alert("Name must be filled out");
        return false;
    }

    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if(!regName.test(fname)){
        alert('Please enter your full name (first & last name).');
        return false;
    }
    return true;
}

function validateEmail() {
    let email = document.forms["feedbackForm"]["email"].value;
    if (email == "") {
        alert("Email must be filled out");
        return false;
    }

    var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(!regEmail.test(email)){
        alert('Please enter a valid email address');
        return false;
    }
    return true;
}

function validatePhone() {
    let phone = document.forms["feedbackForm"]["phone"].value;
    if (phone == "") {
        alert("Phone must be filled out");
        return false;
    }

    var regPhone = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/;
    if(!regPhone.test(phone)){
        alert('Please enter a valid phone number');
        return false;
    }
    return true;
}

function validateAddress() {
    let address = document.forms["feedbackForm"]["address"].value;
    if (address == "") {
        alert("Address must be filled out");
        return false;
    }
    return true;
}

function validateCity() {
    let city = document.forms["feedbackForm"]["city"].value;
    if (city == "") {
        alert("City must be filled out");
        return false;
    }


    var regCity = /^[a-zA-Z ]+$/;
    if(!regCity.test(city)){
        alert('Please enter valid city name.');
        return false;
    }

    return true;
}

function validateZip() {
    let zip = document.forms["feedbackForm"]["zip"].value;
    if (zip == "") {
        alert("Zip must be filled out");
        return false;
    }

    var regZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if(!regZip.test(zip)){
        alert('Please enter valid zipcode.');
        return false;
    }

    return true;
}



function validateComments() {
    let comments = document.forms["feedbackForm"]["subject"].value;
    if (comments == "") {
        alert("Cmments must be filled out");
        return false;
    }

    return true;
}