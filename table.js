let data = JSON.parse(localStorage.getItem('data')) || [];

let body = document.getElementById("tablebody");

document.addEventListener('DOMContentLoaded', function () {
    let data = JSON.parse(localStorage.getItem('data')) || [];

    function updateTable() {
        let table = document.getElementById('tablebody');
        table.innerHTML = '';

        data.forEach((item) => {
            let newRow = table.insertRow(-1);
            newRow.innerHTML = `
                <td>${item["ID"]}</td>
                <td>${item["Product Name"]}</td>
                <td>${item["Product title"]}</td>
                <td>${item["Product description"]}</td>
                <td>${item["Product vendor"]}</td>
                <td>${item["In stock"]}</td>
                <td>${item["Buying price"]}</td>
                <td>${item["Sale price"]}</td>
                <td>${item["Purchase quantity"]}</td>
                <td>${item["Product type"]}</td>
                <td>${item["Shipping rates"]}</td>
                <td>${item["Refill limit"]}</td>
                <td>${item["Product location address"]}</td>
                <td><button class="deleteButton">Delete</button>
                <button class="editButton">Edit</button></td>
            `;

            newRow.querySelector('.deleteButton').addEventListener('click', () => {
                let index = data.indexOf(item);
                data.splice(index, 1);
                localStorage.setItem('data', JSON.stringify(data));
                updateTable();
            });

        });
    }

    updateTable();

    document.getElementById('addButton').addEventListener('click', () => {
        document.getElementById('addRowForm').style.display = 'block';
    });

    document.getElementById('cancelButton').addEventListener('click', () => {
        document.getElementById('addRowForm').style.display = 'none';
    });

    document.getElementById('addRowFormData').addEventListener('submit', (event) => {
        event.preventDefault();
        let id = document.getElementById('id').value;
        let productName = document.getElementById('productName').value;
        let productTitle = document.getElementById('productTitle').value;
        let productDescription = document.getElementById('productDescription').value;
        let productVendor = document.getElementById('productVendor').value;
        let inStock = document.getElementById('inStock').value;
        let buyingPrice = document.getElementById('buyingPrice').value;
        let salePrice = document.getElementById('salePrice').value;
        let purchaseQuantity = document.getElementById('purchaseQuantity').value;
        let productType = document.getElementById('productType').value;
        let shippingRates = document.getElementById('shippingRates').value;
        let refillLimit = document.getElementById('refillLimit').value;
        let productLocation = document.getElementById('productLocation').value;


        let newData = {
            "ID": id,
            "Product Name": productName,
            "Product title": productTitle,
            "Product description": productDescription,
            "Product vendor": productVendor,
            "In stock": inStock,
            "Buying price": buyingPrice,
            "Sale price": salePrice,
            "Purchase quantity": purchaseQuantity,
            "Product type": productType,
            "Shipping rates": shippingRates,
            "Refill limit": refillLimit,
            "Product location address": productLocation
        };

        data.push(newData);
        localStorage.setItem('data', JSON.stringify(data));
        updateTable();
        document.getElementById('addRowFormData').reset();
        document.getElementById('addRowForm').style.display = 'none';
        

    });

    // Event listener for edit button in table rows
    document.getElementById('tablebody').addEventListener('click', (event) => {
        if (event.target.classList.contains('editButton')) {
            // Get the row that was clicked
            let row = event.target.closest('tr');

            // Populate the edit form with the row's data
            document.getElementById('editId').value = row.cells[0].textContent;
            document.getElementById('editProductName').value = row.cells[1].textContent;
            document.getElementById('editProductTitle').value = row.cells[2].textContent;
            document.getElementById('editProductDescription').value = row.cells[3].textContent;
            document.getElementById('editProductVendor').value = row.cells[4].textContent;
            document.getElementById('editInStock').value = row.cells[5].textContent;
            document.getElementById('editBuyingPrice').value = row.cells[6].textContent;
            document.getElementById('editSalePrice').value = row.cells[7].textContent;
            document.getElementById('editPurchaseQuantity').value = row.cells[8].textContent;
            document.getElementById('editProductType').value = row.cells[9].textContent;
            document.getElementById('editShippingRates').value = row.cells[10].textContent;
            document.getElementById('editRefillLimit').value = row.cells[11].textContent;
            document.getElementById('editProductLocation').value = row.cells[12].textContent;

            // Display the edit modal
            document.getElementById('editModalContent').style.display = 'block';
        }
    });

    // Event listener for edit form submission
    document.getElementById('editForm').addEventListener('submit', (event) => {
        event.preventDefault();

        // Get the ID of the edited item
        let id = document.getElementById('editId').value;

        // Find the index of the item in the data array
        let index = data.findIndex(item => item["ID"] === id);

        // Update the item in the data array
        data[index] = {
            "ID": id,
            "Product Name": document.getElementById('editProductName').value,
            "Product title": document.getElementById('editProductTitle').value,
            "Product description": document.getElementById('editProductDescription').value,
            "Product vendor": document.getElementById('editProductVendor').value,
            "In stock": document.getElementById('editInStock').value,
            "Buying price": document.getElementById('editBuyingPrice').value,
            "Sale price": document.getElementById('editSalePrice').value,
            "Purchase quantity": document.getElementById('editPurchaseQuantity').value,
            "Product type": document.getElementById('editProductType').value,
            "Shipping rates": document.getElementById('editShippingRates').value,
            "Refill limit": document.getElementById('editRefillLimit').value,
            "Product location address": document.getElementById('editProductLocation').value
        };

        // Update the table
        updateTable();

        // Update local storage
        localStorage.setItem('data', JSON.stringify(data));

        // Hide the edit modal
        document.getElementById('editModalContent').style.display = 'none';
    });

    // Get the table
    let table = document.getElementById('data-table');

    // Get the table headers
    let headers = table.querySelectorAll('th');

    // Create an object to store filter values for each column
    let filters = {};

// Assuming headers is an array of th elements representing table headers
headers.forEach((header, index) => {
    // Skip the last header (Actions column)
    if (index === headers.length - 1) {
        return;
    }

    let filterInput = document.createElement('input');
    filterInput.setAttribute('type', 'text');
    filterInput.setAttribute('placeholder', 'Filter...');

    filterInput.addEventListener('input', () => {
        filters[index] = filterInput.value.toLowerCase();
        filterTable();
    });

    header.appendChild(filterInput);
});


    function filterTable() {
        let rows = table.querySelectorAll('tbody tr');
    
        rows.forEach(row => {
            let display = true;
    
            // Iterate over all columns except the last one (Actions column)
            for (let i = 0; i < row.cells.length - 1; i++) {
                if (!filters.hasOwnProperty(i)) continue; // Skip if not a filterable column
    
                let cellValue = row.cells[i].textContent.toLowerCase();
                if (cellValue.indexOf(filters[i]) === -1) {
                    display = false;
                    break; // Exit the loop early if any filter condition is not met
                }
            }
    
            if (display) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    

    // add coulunms

    // Event listener for custom columns dropdown
    document.getElementById('customColumns').addEventListener('change', function () {
        const selectedColumn = this.value;
        addCustomColumn(selectedColumn);
    });

    function addCustomColumn(columnName) {
        // Update Table Header
        const tableHeader = document.querySelector('#data-table thead tr');
        const actionHeader = tableHeader.querySelector('th:last-child'); // Get the last header (Actions column)
        const newHeaderCell = document.createElement('th');
        newHeaderCell.textContent = columnName;
        tableHeader.insertBefore(newHeaderCell, actionHeader);
    
        // Update Table Body
        const tableRows = document.querySelectorAll('#data-table tbody tr');
        tableRows.forEach(row => {
            const newCell = row.insertCell(13); 
            newCell.textContent = 'Custom Data'; 
        });
    
        // Update local storage
        data.forEach(item => {
            item[columnName] = ''; // Initialize custom column to empty string
        });
        localStorage.setItem('data', JSON.stringify(data));
    }
    
    // Check if custom columns exist in local storage, otherwise initialize them
    if (!data[0].hasOwnProperty('Product sales')) {
        // Add custom columns to the data array and update local storage
        addCustomColumn('Product sales');
        addCustomColumn('Product margin');
    }
    
});
