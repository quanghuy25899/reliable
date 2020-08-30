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
            occupation: "Hourse killer",
            sin: "777-777-777"
        }
    }
];
finalList.sort((a, b) => a.data.name.toLocaleLowerCase() < b.data.name.toLocaleLowerCase() ? -1 : 1);

var idCounter = 6;

// Handle table body row
tableBodyRowData = currentIndex => {
    var rowData = ``;
    var values = Object.values(finalList[currentIndex].data);
    values.unshift(finalList[currentIndex].id);
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

// Handle table body data
tableBodyRow = () => {
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

finalList.length > 0 ? document.getElementById("tbody").innerHTML += `${tableBodyRow()}` : null;

// Handle sin number format
format = () => {
    var sinNumber = document.getElementById("sin").value;
    var newSinNumber = "";
    for (var i in sinNumber) {
        (sinNumber.charAt(i) === "-" || sinNumber.charAt(i) === " ") ? newSinNumber += "" : newSinNumber += sinNumber.charAt(i);
    }
    document.getElementById("sin").value = newSinNumber.slice(0, 3) + "-" + newSinNumber.slice(3, 6) + "-" + newSinNumber.slice(6);
}

// Delete table
handleDeleteTable = () => {
    // Delete old table (if any)
    var tbody = document.getElementById("tbody");
    tbody.parentNode.removeChild(tbody);
}

// Populate table
handlePopulateTable = () => {
    document.getElementById("result-table").innerHTML += `
        <tbody id="tbody">
            ${tableBodyRow()}
        </tbody>
    `;
}

// Form validation
validateForm = () => {
    var missingField = false;
    const sinFormat = /[0-9]{3}-[0-9]{3}-[0-9]{3}/;
    var personData = {};

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

    if(missingField === false) {
        handleDeleteTable();
        finalList.push({ id: idCounter, data: personData });
        idCounter++;
        finalList.sort((a, b) => a.data.name.toLocaleLowerCase() < b.data.name.toLocaleLowerCase() ? -1 : 1);

        handlePopulateTable();
    }
}

// Handle edit user
onEdit = (currentIndex) => {
    var userInfo = Object.values(finalList[currentIndex].data);
    const fieldId = ["name", "age", "occupation", "sin"];

    for (var i = 0; i< fieldId.length; i++) {
        document.getElementById(`${fieldId[i]}`).value = userInfo[i];
    }
    finalList.splice(currentIndex, 1);
    // console.log(finalList);
}

// Handle delete user
onDelete = currentIndex => {
    finalList.splice(currentIndex, 1);
    handleDeleteTable();
    handlePopulateTable();
    // console.log(finalList);
}