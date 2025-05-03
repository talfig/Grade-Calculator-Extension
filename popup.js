document.getElementById('calculate').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const allowedUrlPattern = /https:\/\/sheilta.apps.openu.ac.il\/student360\/Home\/StudiesPlans\//; // Replace with your actual URL pattern

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
    const rows = document.querySelectorAll("table.table-condensed.table-hover tbody tr");

    let totalCredits = 0;
    let weightedGradeSum = 0;

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        
        // Ensure the row has enough cells (at least 6 for credits and grades)
        if (cells.length >= 6) {
            const levelCell = cells[2]     // Level in the 3th cell (index 2)
            const statusCell = cells[3]    // Status in the 4th cell (index 3)
            const creditsCell = cells[4];  // Credits in the 5th cell (index 4)
            const gradeCell = cells[5];    // Grade in the 6th cell (index 5)
            
            const levelTexts = levelCell.textContent.trim().split('/');
            const grade = parseFloat(gradeCell.textContent.trim());
            const status = statusCell.textContent.trim();
            const creditsArr = creditsCell.textContent.trim().split('/').map(c => parseFloat(c));
    
            if (status !== "הצלחה" || isNaN(grade)) {
                return; // Skip this row if not successful or credits are invalid
            }

            // Process each level-grade pair
            for (let i = 0; i < Math.min(levelTexts.length, creditsArr.length); i++) {
                const level = levelTexts[i];
                let credits = creditsArr[i];

                if (isNaN(credits)) continue;

                const isAdvanced = level.includes("מתקדם");
                if (isAdvanced) credits *= 1.5;

                totalCredits += credits;
                weightedGradeSum += credits * grade;
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
