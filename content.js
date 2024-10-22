function calculateWeightedAverage() {
  // Select all table rows where grades and credits are located
  let rows = document.querySelectorAll("table.table-condensed.table-hover tbody tr");

  let totalCredits = 0;
  let weightedGradeSum = 0;

  rows.forEach(row => {
    let cells = row.querySelectorAll("td");
    
    // Ensure the row has enough cells (at least 6 for credits and grades)
    if (cells.length >= 6) {
      let creditsCell = cells[4];  // Credits in the 5th cell (index 4)
      let gradeCell = cells[5];    // Grade in the 6th cell (index 5)
      
      // Extract and parse the credit and grade values
      let credits = parseFloat(creditsCell.textContent.trim());
      let grade = parseFloat(gradeCell.textContent.trim());
      
      if (!isNaN(credits) && !isNaN(grade)) {
        totalCredits += credits;
        weightedGradeSum += credits * grade;  // Multiply grade by credits
      }
    }
  });

  // Calculate the weighted average (GPA)
  if (totalCredits > 0) {
    let weightedAverage = weightedGradeSum / totalCredits;
    return weightedAverage.toFixed(2); // Rounded to 2 decimal places
  } else {
    return null;
  }
}

// Run the calculation and display the result
let weightedAverage = calculateWeightedAverage();
if (weightedAverage !== null) {
  console.log(`Your weighted average (GPA) is: ${weightedAverage}`);
  alert(`Your weighted average (GPA) is: ${weightedAverage}`);
} else {
  console.log("No grades or credits found.");
  alert("No grades or credits found.");
}

