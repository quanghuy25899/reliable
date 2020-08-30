// List of entries
var finalList = [
    {
        id : 1,
        data: {
            name: "Quang Huy Pham",
            age: "21",
            occupation: "Web Developer",
            sin: "942-255-373"
        }
    },
    {
        id: 2,
        data: {
            name: "Banana",
            age: "5",
            occupation: "Fruit",
            sin: "555-555-555"
        }
    },
    {
        id: 3,
        data: {
            name: "Tom",
            age: "10",
            occupation: "House keeping",
            sin: "123-456-789"
        }
    },
    {
        id: 4,
        data: {
            name: "Jerry",
            age: "8",
            occupation: "Trouble maker",
            sin: "987-654-321"
        }
    },
    {
        id: 5,
        data: {
            name: "Lamborghini",
            age: "57",
            occupation: "Horse killer",
            sin: "777-777-777"
        }
    }
];

// Global variables
var idCounter = 6;
var currentUserId = null;
var order = "ascending";
var ongoingIndex = null;
var personData = {};
var currentField = null;

// Handle populate table body row data
const tableBodyRowData = currentIndex => {
    var rowData = ``;
    // get user's data
    var values = Object.values(finalList[currentIndex].data);
    // add user's id
    values.unshift(finalList[currentIndex].id);
    // update and delete options
    var actionsDiv = `
        <div class="button-wrapper">
            <button type="button" onclick="onEdit(${currentIndex})">Edit</button>
            <button type="button" onclick="onDelete(${currentIndex})">Delete</button>
        </div>
    `;
    values.push(actionsDiv);

    for (var i = 0; i < values.length; i++) {
        rowData += `<td>${values[i]}</td>`;
    }

    return rowData;
}

// Handle populate table body row
const tableBodyRow = () => {
    var tableRow = ``;
    for (var i = 0; i < finalList.length; i++) {
        tableRow += `
            <tr id="user-${finalList[i].id}">
                ${tableBodyRowData(i)}
            </tr>
        `;
    }

    return tableRow;
}

// populate table when the page is loaded for the first time
finalList.length > 0 ? document.getElementById("tbody").innerHTML += `${tableBodyRow()}` : null;

// Handle sin number format
const format = () => {
    var sinNumber = document.getElementById("sin").value;
    var newSinNumber = "";
    for (var i in sinNumber) {
        (sinNumber.charAt(i) === "-" || sinNumber.charAt(i) === " ") ? newSinNumber += "" : newSinNumber += sinNumber.charAt(i);
    }
    document.getElementById("sin").value = newSinNumber.slice(0, 3) + "-" + newSinNumber.slice(3, 6) + "-" + newSinNumber.slice(6);
}

// Delete table
const handleDeleteTable = () => {
    var tbody = document.getElementById("tbody");
    tbody.parentNode.removeChild(tbody);
}

// Populate table
const handlePopulateTable = () => {
    document.getElementById("result-table").innerHTML += `
        <tbody id="tbody">
            ${tableBodyRow()}
        </tbody>
    `;
}

// Form validation
const validateForm = () => {
    var missingField = false;
    const sinFormat = /[0-9]{3}-[0-9]{3}-[0-9]{3}/;

    const formData = new FormData(document.querySelector('form'))
    for (var pair of formData.entries()) {
        if(pair[0] !== "occupation" && pair[1].length === 0) {
            alert(`Please input your ${pair[0]}`);
            missingField = true;
        } else {
            if (pair[0] === "age") {
                if (pair[1] > 1 && pair[1] < 101) {
                    personData[pair[0]] = pair[1];
                } else {
                    alert(`Please input the correct format of your ${pair[0]}`);
                    missingField = true;
                }
            } else if (pair[0] === "sin") {
                if(pair[1].match(sinFormat) && pair[1].length === 11) {
                    personData[pair[0]] = pair[1];
                } else {
                    alert(`Please input the correct format of your ${pair[0]}`);
                    missingField = true;
                }
            } else {
                personData[pair[0]] = pair[1];
            }
        }
    }

    return !missingField ? true : false;
}

// Handle add user
const addUser = () => {
    if (validateForm()) {
        // add new user data
        finalList.push({ id: idCounter, data: personData });
        idCounter++;
        // reset personData variable
        personData = {};

        // re-render table
        handleDeleteTable();
        handlePopulateTable();
        document.getElementById("survey-form").reset();
        alert("User is added successfully");
    }
}

// Handle update user
const updateUser = () => {
    if (validateForm()) {
        // remove old user data
        finalList.splice(ongoingIndex, 1);
        // add new user data with the same id
        finalList.push({ id: currentUserId, data: personData });
        // reset personData variable
        personData = {};

        // re-render table
        handleDeleteTable();
        handlePopulateTable();
        document.getElementById("survey-form").reset();
        alert("User is updated successfully");
    }
}

// Handle update user
const onEdit = (currentIndex) => {
    // Update HTML code
    // Remove Add User button
    var addUserButton = document.getElementById("submit");
    if (addUserButton !== null) {
        addUserButton.parentNode.removeChild(addUserButton);

        // Add Update User options
        document.getElementById("buttons-field").innerHTML += `
            <div id="update-options">
                <button type="button" id="cancel-update" class="button button-ghost" method="post" onclick="handleCancelUpdate()">
                    <strong>Cancel</strong>
                </button>
                <button type="button" id="update" class="button button-primary" method="post" onclick="updateUser()">
                    <strong>Update User</strong>
                </button>
            </div>
        `;
    }

    // Handle edit
    ongoingIndex = currentIndex;
    var userInfo = Object.values(finalList[currentIndex].data);
    currentUserId = finalList[currentIndex].id;
    const fieldId = ["name", "age", "occupation", "sin"];

    for (var i = 0; i< fieldId.length; i++) {
        document.getElementById(`${fieldId[i]}`).value = userInfo[i];
    }
    // console.log(finalList);
}

// Handle cancel update
const handleCancelUpdate = () => {
    // Remove update options
    var updateOptions = document.getElementById("update-options");
    updateOptions.parentNode.removeChild(updateOptions);

    // Add submit button
    document.getElementById("buttons-field").innerHTML += `
        <button type="button" id="submit" class="button button-primary" method="post" onclick="validateForm(false)">
            <strong>+ Add user</strong>
        </button>
    `;
    document.getElementById("survey-form").reset();
}

// Handle delete user
const onDelete = currentIndex => {
    var confirmonDelete = confirm('Are you sure you want to delete this user?');

    if (confirmonDelete) {
        // remove the selected user from finalList
        finalList.splice(currentIndex, 1);

        // re-render table
        handleDeleteTable();
        handlePopulateTable();
    }
    // console.log(finalList);
}

// Handle sorting
const onSort = sortField => {
    // Reset order when a new field is selected to be sorted
    if (sortField !== currentField && currentField !== null) {
        order = "ascending";
    }
    currentField = sortField;

    // handle sorting
    switch(order) {
        case "ascending":
            if (sortField === 'name') {
                finalList.sort((a, b) => a.data.name.toLocaleLowerCase() < b.data.name.toLocaleLowerCase() ? -1 : 1);
            } else {
                finalList.sort((a, b) => a.data.age - b.data.age);
            }
            order = "descending";
            break;
        case "descending":
            if (sortField === 'name') {
                finalList.sort((a, b) => b.data.name.toLocaleLowerCase() < a.data.name.toLocaleLowerCase() ? -1 : 1);
            } else {
                finalList.sort((a, b) => b.data.age - a.data.age);
            }
            order = "ascending";
            break;
    }
    
    // re-render table
    handleDeleteTable();
    handlePopulateTable();
}