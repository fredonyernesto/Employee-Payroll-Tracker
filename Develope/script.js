// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  //created a constant variable for an empty array box
  const employeesInfo = []; 

  //Created a while loop to keep asking the user questions about the employee's info.
  while(true){
      /*Created an variable for each prompt, prompting the user for the employee's info.
       Created an each after each prompt to check if the user selected cancel and break the loop.*/
      let employeeFirstName = window.prompt("Enter your employee's first name:");
      if(!employeeFirstName){
        break;
      }
      let employeeLastName = window.prompt("Enter your employee's last name:");
      if(!employeeLastName){
        break;
      }
      let employeeSalary = window.prompt("Enter your employee's salary:");
      if(!employeeSalary){
        break;
      }
      
      //used both the built-in method for parseFloat to convert the string to a number and with isNan to check if the input was a number. If not, an alert pops up.
      employeeSalary = parseFloat(employeeSalary);
      if(isNaN(employeeSalary)){
        employeeSalary = 0;
        alert('You should input the salary only as numbers!')
        continue; 
      }
      //.push is used to push the reponses from the user back into the array above.
      employeesInfo.push({
        firstName: employeeFirstName,
        lastName: employeeLastName,
        salary: employeeSalary

      })
      //defining another varaible so that user has an option to add any more employees if need be.
      let addAnotherEmployee = window.confirm("Would you like to add another employee?");
      //If the user clicks cancel, I called upon a another function to display the all the employeesInfo enteries.
      if(!addAnotherEmployee){
        displayEmployees(employeesInfo);
        break;
      }
  }
  return employeesInfo;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  let salaries = employeesArray;
  let totalSalary = 0;

  //created for loop that goes through every input for a employee's salary and adds them up to later create and average
  for (let i = 0; i < salaries.length; i++){
    totalSalary = totalSalary + salaries[i].salary;
  } 

  let averageSalary = totalSalary / salaries.length;

  console.log(`The average employee salary between our ${salaries.length} employee(s) is ${averageSalary}`)
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  //using the Math.random built-in in this function so that a random mutiplied by the number of enteries to pick a random employees.
  let randomEmployee = employeesArray
  let randomNumber = Math.floor(Math.random()*randomEmployee.length) 
  let randomFirstName = randomEmployee[randomNumber];

  console.log(`Congratulations to ${randomFirstName.firstName}, our random drawing winner!`)
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
