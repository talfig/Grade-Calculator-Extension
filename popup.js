// Send a message to the content script to calculate the average
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: calculateAverage
  }, (results) => {
    if (results[0].result) {
      document.getElementById('average').textContent = `Your average grade is: ${results[0].result}`;
    } else {
      document.getElementById('average').textContent = 'No grades found.';
    }
  });
});

// Same function as the content.js script
function calculateAverage() {
  let gradeElements = document.querySelectorAll(".grade");
  let grades = [];
  gradeElements.forEach(element => {
    let grade = parseFloat(element.textContent);
    if (!isNaN(grade)) {
      grades.push(grade);
    }
  });

  if (grades.length > 0) {
    let total = grades.reduce((acc, grade) => acc + grade, 0);
    return (total / grades.length).toFixed(2);
  } else {
    return null;
  }
}
