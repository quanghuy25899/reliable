// Handle sin number format
var totalLength = 0;
var portionLength = 0;
format = () => {
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
validateForm = () => {
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

// Handle add field
onAddField = () => {
    var fieldTitle = prompt("Please enter field title");

    var convertFieldTitle = "";
    for (var i = 0; i < fieldTitle.length; i++) {
        if(fieldTitle[i] === " ") {
            convertFieldTitle += "-";
        } else {
            convertFieldTitle += fieldTitle[i].toLowerCase();
        }
    }

    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div id="${convertFieldTitle}-field" class="field-group">
            <label id="${convertFieldTitle}-label" class="is-title" for="name">${fieldTitle}</label><br />
            <div class="input-field-wrapper">
            <input type="text" id="${convertFieldTitle}" class="styled-input" name="${convertFieldTitle}" placeholder="${fieldTitle}" />
            <button type="button" class="delete-btn"><b>X</b></button>
            </div>
        </div>
    `;

    console.log(newDiv);
    document.getElementById("#input-value-field").appendChild(newDiv);
}