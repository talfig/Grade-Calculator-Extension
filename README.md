# Grade Average Calculator

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

1. Navigate to your university's grade summary page (e.g., `https://sheilta.apps.openu.ac.il/student360/Home/StudiesPlans/`).
2. Click on the Grade Average Calculator icon in the Chrome toolbar.
3. Press the Calculate Average button in the popup.
4. The calculated average will be displayed in the popup.

## Customization

To customize the extension for a specific university or grade summary format, simply modify two key parts of the extension:

- The `matches` field in the `manifest.json` file.
- The `allowedUrlPattern` in the `popup.js` file.

### Step 1: Modify the `manifest.json`

1. **Open `manifest.json`**:
   - Locate and open the `manifest.json` file in your project.

2. **Update the `matches` Field**:
   - Find the `content_scripts` section and replace `<URL_of_the_grade_summary_page>` with the appropriate URL pattern for your university's grade summary page.

     For example, if your university's grade summary page is `https://sheilta.apps.openu.ac.il/student360/Home/StudiesPlans/`, you would use:

     ```json
     "content_scripts": [
         {
             "matches": ["https://sheilta.apps.openu.ac.il/student360/Home/StudiesPlans/*"],
             "js": ["content.js"]
         }
     ]
     ```

### Step 2: Modify the Allowed URL Pattern

1. **Open `popup.js`**:
   - Locate and open the `popup.js` file in your project.

2. **Update the Allowed URL Pattern**:
   - Find the line that defines the `allowedUrlPattern`. It will look like this:

     ```javascript
     const allowedUrlPattern = /<URL_of_the_grade_summary_page>/; // Replace with your actual URL pattern
     ```

   - Replace `<URL_of_the_grade_summary_page>` with the appropriate URL pattern that matches your university's grade summary page.
  
     For example, if your university's grade summary page is `https://sheilta.apps.openu.ac.il/student360/Home/StudiesPlans/`, you would use:

     ```javascript
     const allowedUrlPattern = /https:\/\/sheilta.apps.openu.ac.il\/student360\/Home\/StudiesPlans\//;
     ```
