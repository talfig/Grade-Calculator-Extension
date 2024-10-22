# Grade Average Calculator

![Grade Average Calculator](https://via.placeholder.com/600x200.png?text=Grade+Average+Calculator)  <!-- Replace with actual image if available -->

## Description

The **Grade Average Calculator** is a Chrome extension designed to calculate the weighted average of grades from your university grade summary page. With a user-friendly interface, this extension allows students to quickly assess their academic performance by clicking a button to compute their average grade.

## Features

- Calculates the weighted grade average based on grades and credits.
- Simple and intuitive user interface.
- Real-time results displayed directly in the extension popup.

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/talfig/grade-average-calculator.git
cd grade-average-calculator
```

2. **Load the extension in Chrome:**

- Open Chrome and go to `chrome://extensions/`.
- Enable Developer mode using the toggle in the top right corner.
- Click on Load unpacked and select the directory of the cloned repository.

## Usage

1. Navigate to your university's grade summary page.
2. Click on the Grade Average Calculator icon in the Chrome toolbar.
3. Press the Calculate Average button in the popup.
4. The calculated average will be displayed in the popup.

## Customization

To customize the extension for a specific university or grade summary format, modify the `matches` field in the `manifest.json` file with the appropriate URL of the grade summary page.
```json
"content_scripts": [
    {
        "matches": ["<URL_of_the_grade_summary_page>"],
        "js": ["content.js"],
        "run_at": "document_idle"
    }
]
```
