
function addCategoryRow() {
    var table = document.querySelector("table");
    var newRow = table.insertRow(-1);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.innerHTML = '<input type="text" name="category_name[]" required>';
    cell2.innerHTML = `
        <select name="scoring_type[]">
            <option value="number">Number</option>
            <option value="descriptive">Descriptive</option>
        </select>`;
    cell3.innerHTML = `
        <select name="direction_to_optimize[]">
            <option value="up">Up</option>
            <option value="down">Down</option>
        </select>`;
    cell4.innerHTML = `
        <span class="delete-icon" onclick="deleteRow(this)">🗑️</span>
        <span class="clear-icon" onclick="clearRow(this)">🔄</span>`;
}

function addScenarioRow() {
    var table = document.querySelectorAll("table")[1];
    var newRow = table.insertRow(-1);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    // var cell3 = newRow.insertCell(2);

    cell1.innerHTML = '<input type="text" name="scenario_name[]">';
    // cell2.innerHTML = '<input type="number" step="0.01" name="scenario_value[]">';
    cell2.innerHTML = `
        <span class="delete-icon" onclick="deleteRow(this)">🗑️</span>
        <span class="clear-icon" onclick="clearRow(this)">🔄</span>`;
}

function deleteRow(element) {
    var row = element.parentElement.parentElement;
    row.parentNode.removeChild(row);
}

function clearRow(element) {
    var row = element.parentElement.parentElement;
    var inputs = row.querySelectorAll('input');
    for (var input of inputs) {
        input.value = '';
    }
}

function getCategoryData() {
    var table = document.querySelector("table");
    var categoryData = [];
    
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var cells = row.cells;
        
        var categoryName = cells[0].querySelector('input[name="category_name[]"]').value;
        var scoringType = cells[1].querySelector('select[name="scoring_type[]"]').value;
        var directionToOptimize = cells[2].querySelector('select[name="direction_to_optimize[]"]').value;
        
        categoryData.push({
            categoryName: categoryName,
            scoringType: scoringType,
            directionToOptimize: directionToOptimize
        });
    }
    
    return categoryData;
}

function getScenarioData() {
    var table = document.querySelectorAll("table")[1];
    var scenarioData = [];
    
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var cells = row.cells;
        
        var scenarioName = cells[0].querySelector('input[name="scenario_name[]"]').value;
        // var scenarioValue = cells[1].querySelector('input[name="scenario_value[]"]').value;
        
        scenarioData.push({
            scenarioName: scenarioName,
            // scenarioValue: scenarioValue
        });
    }
    
    return scenarioData;
}

function valueTable(){

    var tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";

    var categoryData = getCategoryData(); 
    var scenarioData = getScenarioData(); 
    var categoryData = categoryData.filter(entry => entry.categoryName != "");
    var scenarioData = scenarioData.filter(entry => entry.scenarioName != "");
    //console.log(categoryWithoutEmpty);
    //console.log(allNamesEmpty);
    console
    if (categoryData.length == 0 && scenarioData.length==0) {
         alert('Enter the Category & Scenario Names');
         return;
    } else if(categoryData.length == 0){
        alert('Enter the Category Names');
        return;
    }else if(scenarioData.length==0){
        alert('Enter the Scenario Names');
        return;
    } 

    

    var table = document.createElement("table");
    var headerRow = table.insertRow(0);
    var firstColNRow = headerRow.insertCell(0);
    firstColNRow.textContent="";



    // Create header cells with category names
    for (var i = 0; i < categoryData.length; i++) {
        if (categoryData[i].categoryName !== '') {
            var categoryCell = headerRow.insertCell(headerRow.cells.length);
            categoryCell.textContent = categoryData[i].categoryName;
        } else{
            console.log("Empty");
        }
    }

    // Create rows with scenario names and input fields
    for (var i = 0; i < scenarioData.length; i++) {
        var scenarioRow = table.insertRow(i + 1);
        var scenarioNameCell = scenarioRow.insertCell(0);
        scenarioNameCell.textContent = scenarioData[i].scenarioName;

        // Create cells for scenario values in corresponding categories with the appropriate input fields
        for (var j = 0; j < categoryData.length; j++) {
            var categoryCell = scenarioRow.insertCell(scenarioRow.cells.length);
            if(categoryData[j].scoringType === 'descriptive'){
                var select = document.createElement("select");
                select.name = 'scenario_value';
                var descriptiveOptions = ['low', 'low-mid', 'mid', 'mid-high', 'high'];
                for (var option of descriptiveOptions) {
                    var optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    select.appendChild(optionElement);
                }
                categoryCell.appendChild(select);
            }
            else{
                var input = document.createElement("input");
                input.type = "number";
                input.name = 'scenario_value';
                categoryCell.appendChild(input);
            }
            
        }
    }
    
    tableContainer.appendChild(table);

}


// // Get the modal
 var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
//   console.log("button pressed");
// }

function modalWindowOpen() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    console.log("button pressed");
}

function closeWindowOpen() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
  
// }

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", closeWindowWhenClickedAnywhere);
function closeWindowWhenClickedAnywhere(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
      }
}
