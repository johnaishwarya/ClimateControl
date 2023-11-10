function addCategoryRow() {
    var table = document.querySelector("table");

    // Calculate the total weight in existing rows
    var existingWeight = calculateTotalWeight();

    if (existingWeight >= 1.0) {
        alert("Error: Total weight in existing rows exceeds 1.0. Cannot add a new row.");
        return;
    }

    var newRow = table.insertRow(-1);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.innerHTML = '<input type="text" name="category_name[]" required>';
    cell2.innerHTML = `
        <select name="scoring_type[]">
            <option value="number">Number</option>
            <option value="descriptive">Descriptive</option>
        </select>`;
    cell3.innerHTML = `<input type="number" step="0.01" name="weight[]" placeholder="Remaining: ${(1.0 - existingWeight).toFixed(2)}" oninput="updateRemainingWeight(this)"><span class="error-message" style="font-size: 10px;"></span>`;
    cell4.innerHTML = `
        <select name="direction_to_optimize[]">
            <option value="up">Up</option>
            <option value="down">Down</option>
        </select>`;
    cell5.innerHTML = `
        <span class="delete-icon" onclick="deleteRow(this)">🗑️</span>
        <span class="clear-icon" onclick="clearRow(this)">🔄</span>`;
}

function updateRemainingWeight(input) {
    var table = document.querySelector("table");
    var weightInputs = table.querySelectorAll('input[name="weight[]"]');

    var totalWeight = 0.0;

    weightInputs.forEach(function (weightInput) {
        var weightValue = parseFloat(weightInput.value) || 0;
        totalWeight += weightValue;
    });

    var remainingWeight = 1.0 - totalWeight;

    if (remainingWeight >= 0) {
        // If there is still remaining weight, set it as a placeholder for the current input
        input.placeholder = "Remaining: " + remainingWeight.toFixed(2);
    } else {
        // If the remaining weight is negative, throw an error
        alert("Error: Total weight exceeds 1.0");
        input.value = "";
    }
}

function calculateTotalWeight() {
    var table = document.querySelector("table");
    var weightInputs = table.querySelectorAll('input[name="weight[]"]');

    var totalWeight = 0.0;

    weightInputs.forEach(function (weightInput) {
        var weightValue = parseFloat(weightInput.value) || 0;
        totalWeight += weightValue;
    });

    return totalWeight;
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

///ADDD VALIDATION PLS
/*function updateRemainingWeight(input) {
    validateWeight(input);
    var table = document.querySelector("table");
    var weightInputs = table.querySelectorAll('input[name="weight[]"]');
    
    var totalWeight = 1.0;
    
    weightInputs.forEach(function(weightInput) {
        var weightValue = parseFloat(weightInput.value) || 0;
        totalWeight -= weightValue;
    });
    
    var remainingWeight = totalWeight.toFixed(2);
    
    weightInputs.forEach(function(weightInput) {
        weightInput.placeholder = "Remaining: " + remainingWeight;
    });
}*/

function updateRemainingWeight(input) {
    var table = document.querySelector("table");
    var weightInputs = table.querySelectorAll('input[name="weight[]"]');

    var totalWeight = 0.0;

    weightInputs.forEach(function (weightInput) {
        var weightValue = parseFloat(weightInput.value) || 0;
        totalWeight += weightValue;
    });

    var remainingWeight = 1.0 - totalWeight;

    if (remainingWeight >= 0) {
        // If there is still remaining weight, set it as a placeholder for the current input
        input.placeholder = "Remaining: " + remainingWeight.toFixed(2);
    } else {
        // If the remaining weight is negative, throw an error
        alert("Error: Total weight exceeds 1.0");
        input.value = "";
    }
}


function validateWeight(input) {
    var value = parseFloat(input.value);
    console.log(value);
    var errorMessage = input.parentElement.querySelector('.error-message');
    
    if (isNaN(value) || value < 0 || value > 1) {
        errorMessage.textContent = "Weight must be a number between 0 and 1.";
        return false;
    } else {
        errorMessage.textContent = "";
    }
    return true;
}


//
function getCategoryData() {
    var table = document.querySelector("table");
    var categoryData = [];
    
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var cells = row.cells;
        
        var categoryName = cells[0].querySelector('input[name="category_name[]"]').value;
        var scoringType = cells[1].querySelector('select[name="scoring_type[]"]').value;
        var weight = cells[2].querySelector('input[name="weight[]"]').value;
        var directionToOptimize = cells[3].querySelector('select[name="direction_to_optimize[]"]').value;
        
        categoryData.push({
            categoryName: categoryName,
            scoringType: scoringType,
            weight: weight,
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
        // console.log(cells);
        var scenarioName = cells[0].querySelector('input[name="scenario_name[]"]').value;
        // var scenarioValue = cells[1].querySelector('input[name="scenario_value[]"]').value;
        
        scenarioData.push({
            scenarioName: scenarioName,
            // scenarioValue: scenarioValue
        });
    }
    
    return scenarioData;
}

function getValuesTableData(){
    var table = document.getElementById("table-container").querySelector("table");
    var values = [];
    var rows = table.rows;

    // Iterate through rows, starting from the first data row (skip the header)
    for (var i = 1; i < rows.length; i++) {
        var scenario = { data: {} };
        var cells = rows[i].cells;

        for (var j = 1; j < cells.length; j++) {
            var inputElement = cells[j].querySelector('input, select');
            var columnName = table.rows[0].cells[j].textContent;

            if (inputElement) {
                // Retrieve the value from the input element
                var value = inputElement.value;
                scenario.data[columnName] = value;
            }
        }

        // Add the scenario data to the values array
        values.push(scenario);
    }

    var updatedValuesData = [];
    var scenarioData = getScenarioData();

    for (var i = 0; i < scenarioData.length; i++) {
        var scenarioName = scenarioData[i].scenarioName;
        var data = values[i].data;
        updatedValuesData.push({ [scenarioName]: data });
    }

    return updatedValuesData;
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
    var submit_button = document.getElementById("temp-submit-button");
    submit_button.style.display = "block";

}

function calculateScore() {
    var categoryData = getCategoryData();
    var scenarioData = getScenarioData();
    var valuesData = getValuesTableData();
    var dimensionlessScores = {};

    console.log(categoryData)
    console.log(scenarioData)
    console.log(valuesData)

    for (var category of categoryData) {
        var categoryName = category.categoryName;
        var categoryWeight = category.weight;
        var directionToOptimize = category.directionToOptimize;
        console.log("categoryName: ", categoryName);
        console.log("categoryWeight: ", categoryWeight);
        console.log("directionToOptimize: ", directionToOptimize);

        
        

        // Find min and max values for the category
        var min = Number.MAX_VALUE;
        var max = Number.MIN_VALUE;
        var i=0;
        for (var scenario of valuesData) {
            
            var s = scenario[scenarioData[0].scenarioName];

            // console.log("Values: ", s[categoryName]);
            var value = parseFloat(scenario[Object.keys(scenario)[0]][categoryName]);
            if (!isNaN(value)) {
                if (value < min) {
                    min = value;
                }
                if (value > max) {
                    max = value;
                }
            }
            i++;
        }
        
        console.log("min: ", min, " max :", max);

        // Calculate linear scores for each scenario in this category
        for (var scenario of scenarioData) {
            var scenarioName = scenario.scenarioName;
            var value = parseFloat(valuesData.find(data => data.hasOwnProperty(scenarioName))[scenarioName][categoryName]);

            if (!isNaN(value)) {
                if (directionToOptimize === 'down') {
                    // Minimize the linear score
                    dimensionlessScores[scenarioName] = dimensionlessScores[scenarioName] || {};
                    dimensionlessScores[scenarioName][categoryName] = categoryWeight*((min - value) / (max - min));
                } else if (directionToOptimize === 'up') {
                    // Maximize the linear score
                    dimensionlessScores[scenarioName] = dimensionlessScores[scenarioName] || {};
                    dimensionlessScores[scenarioName][categoryName] = categoryWeight*((value - min) / (max - min));
                }
            }
        }
    }

    // After calculation, the valuesData object now contains the calculated linear scores.
    console.log(dimensionlessScores);
    var firstModalPage = document.getElementById("firstModalPage");
    var secondModalPage = document.getElementById("secondModalPage");
    firstModalPage.style.display="none";
    secondModalPage.style.display="block";
    var totalScores = totalScoreForEachScenario(dimensionlessScores);
    plot(totalScores);

}


function openMe(){
    // var categoryData = [{categoryName: 'Emission', scoringType: 'number', weight: '0.3', directionToOptimize: 'up'}, {categoryName: 'Air', scoringType: 'number', weight: '0.4', directionToOptimize: 'up'}, {categoryName: 'Water', scoringType: 'number', weight: '0.3', directionToOptimize: 'down'}];
    // var scenarioData = [{scenarioName: 'Bike'}, {scenarioName: 'Car'}, {scenarioName: 'Cycle'}];
    // var valuesData = [{Bike: {Emission: '1000', Air: '43', Water: '65'}}, {Car:{Emission: '200', Air: '23', Water: '10'}}, {Cycle:{Emission: '-100', Air: '65', Water: '6'}}];
    // var dimensionlessScores = {};

    // console.log(categoryData)
    // console.log(scenarioData)
    // console.log(valuesData)

    // for (var category of categoryData) {
    //     var categoryName = category.categoryName;
    //     var categoryWeight = category.weight;
    //     var directionToOptimize = category.directionToOptimize;
    //     console.log("categoryName: ", categoryName);
    //     console.log("categoryWeight: ", categoryWeight);
    //     console.log("directionToOptimize: ", directionToOptimize);

        
        

    //     // Find min and max values for the category
    //     var min = Number.MAX_VALUE;
    //     var max = Number.MIN_VALUE;
    //     var i=0;
    //     for (var scenario of valuesData) {
            
    //         var s = scenario[scenarioData[0].scenarioName];

    //         // console.log("Values: ", s[categoryName]);
    //         var value = parseFloat(scenario[Object.keys(scenario)[0]][categoryName]);
    //         if (!isNaN(value)) {
    //             if (value < min) {
    //                 min = value;
    //             }
    //             if (value > max) {
    //                 max = value;
    //             }
    //         }
    //         i++;
    //     }
        
    //     console.log("min: ", min, " max :", max);

    //     // Calculate linear scores for each scenario in this category
    //     for (var scenario of scenarioData) {
    //         var scenarioName = scenario.scenarioName;
    //         var value = parseFloat(valuesData.find(data => data.hasOwnProperty(scenarioName))[scenarioName][categoryName]);

    //         if (!isNaN(value)) {
    //             if (directionToOptimize === 'down') {
    //                 // Minimize the linear score
    //                 dimensionlessScores[scenarioName] = dimensionlessScores[scenarioName] || {};
    //                 dimensionlessScores[scenarioName][categoryName] = categoryWeight*((min - value) / (max - min));
    //             } else if (directionToOptimize === 'up') {
    //                 // Maximize the linear score
    //                 dimensionlessScores[scenarioName] = dimensionlessScores[scenarioName] || {};
    //                 dimensionlessScores[scenarioName][categoryName] = categoryWeight*((value - min) / (max - min));
    //             }
    //         }
    //     }
    // }

    // // After calculation, the valuesData object now contains the calculated linear scores.
    // console.log(dimensionlessScores);
    // var totalScores = totalScoreForEachScenario(dimensionlessScores);
    // plot(totalScores);

    
}

function totalScoreForEachScenario(dimensionlessScores){
    var totalscore = [];
    for (var scenario in dimensionlessScores) {
        if (dimensionlessScores.hasOwnProperty(scenario)) {
            var sum = 0;

            for (var category in dimensionlessScores[scenario]) {
                if (dimensionlessScores[scenario].hasOwnProperty(category)) {
                    sum += dimensionlessScores[scenario][category];
                }
            }

            totalscore[scenario] = sum;
        }
    }
    console.log("TotalScore: ", totalscore);
    return totalscore;
}





// // Get the modal
 var modal = document.getElementById("myModal");

function modalWindowOpen() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    console.log("button pressed");
}

function closeWindowOpen() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}



// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", closeWindowWhenClickedAnywhere);
function closeWindowWhenClickedAnywhere(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
      }
}


function plot(totalScores){
    const keys = Object.keys(totalScores);
    console.log("Inplot: ", keys);
    const values = Object.values(totalScores);
    console.log("Inplot: ", values);
    var chart = document.getElementById('chart');
    var data = [
        {
          x: keys,
          y: values,
          type: 'bar'
        }
      ];
    
    //   var myDiv = document.getElementById("myDiv");
      
    Plotly.newPlot( chart, data);
}

function backToFirstModalPage(){
    var firstModalPage = document.getElementById("firstModalPage");
    var secondModalPage = document.getElementById("secondModalPage");
    secondModalPage.style.display="none";
    firstModalPage.style.display="block";
    
}
