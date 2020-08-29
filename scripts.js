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
finalList.sort((a, b) => a.data.name < b.data.name ? -1 : 1);

var idCounter = 6;

// Handle table body row
tableBodyRowData = currentId => {
    var rowData = ``;
    var values = Object.values(finalList[currentId].data);
    values.unshift(finalList[currentId].id);
    var actionsDiv = `
        <div class="button-wrapper">
            <button type="button" onclick="onEdit()">Edit</button>
            <button type="button" onclick="onDelete()">Delete</button>
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
    // Delete old table (if any)
    var tbody = document.getElementById("tbody");
    tbody.parentNode.removeChild(tbody);

    var missingField = false;
    var personData = {};

    const formData = new FormData(document.querySelector('form'))
    for (var pair of formData.entries()) {
        console.log(pair);
        if(pair[1].length === 0) {
            alert(`Please input your ${pair[0]}`);
            missingField = true;
        } else {
            personData[pair[0]] = pair[1];
        }
    }

    if(missingField === false) { 
        finalList.push({ id: idCounter, data: personData });
        idCounter++;
        finalList.sort((a, b) => a.data.name < b.data.name ? -1 : 1);

        document.getElementById("result-table").innerHTML += `
            <tbody id="tbody">
                ${tableBodyRow()}
            </tbody>
        `;
    }
}

// Handle delete user
onDelete = id => {
    console.log('here');
}