document.getElementById('calculate').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const allowedUrlPattern = /<URL_of_the_grade_summary_page>/; // Replace with your actual URL pattern

        if (!allowedUrlPattern.test(tabs[0].url)) {
            showErrorMessage(); // Call the error function
            return; // Exit the function if the URL is not allowed
        }

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: calculateWeightedAverage
        }, (results) => {
            if (results[0].result) {
                document.getElementById('average').textContent = `Your weighted average (GPA) is: ${results[0].result}`;
                document.getElementById('error').style.display = 'none'; // Hide error message if calculation is successful
            } else {
                document.getElementById('average').textContent = 'No grades found.';
                document.getElementById('error').style.display = 'none'; // Hide error message if no grades are found
            }
        });
    });
});

// Function to display an error message
function showErrorMessage() {
    const averageDiv = document.getElementById('average');
    averageDiv.textContent = ''; // Clear previous average message
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = 'Ensure you\'re on the grade summary page to use this.'; // Set the short error message
    errorDiv.classList.add('error'); // Add error class for styling
    errorDiv.style.display = 'block'; // Show error message
}

// This function will be injected into the active tab
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
