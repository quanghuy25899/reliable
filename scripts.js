// Handle sin number format
var totalLength = 0;
var portionLength = 0;
function format() {
    portionLength++;
    totalLength++;
    if (portionLength === 3) {
        if (totalLength < 9) {
            document.getElementById("sin").value += "-";
            portionLength = 0;
        }
    }
}

// Form validation
function validateForm() {
    var validationArr = [];
    var missingField = false;

    validationArr.push({ value: document.forms["survey-form"]["name"].value, name: document.forms["survey-form"]["name"].name });
    validationArr.push({ value: document.forms["survey-form"]["age"].value, name: document.forms["survey-form"]["age"].name });
    validationArr.push({ value: document.forms["survey-form"]["occupation"].value, name: document.forms["survey-form"]["occupation"].name });
    validationArr.push({ value: document.forms["survey-form"]["sin"].value, name: document.forms["survey-form"]["sin"].name });

    validationArr.forEach(element => {
        if (element.value.length === 0 || element.value === undefined) {
            alert(`Please input your ${element.name}`);
            missingField = true;
        }
    });

    if(missingField === false) {
        alert("Thank you for your information! We will contact you shortly.");
    }
}