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

// Run the calculation and display the result
let weightedAverage = calculateWeightedAverage();
if (weightedAverage !== null) {
  console.log(`Your weighted average (GPA) is: ${weightedAverage}`);
  alert(`Your weighted average (GPA) is: ${weightedAverage}`);
} else {
  console.log("No grades or credits found.");
  alert("No grades or credits found.");
}
