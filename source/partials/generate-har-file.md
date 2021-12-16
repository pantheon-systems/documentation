## HAR (HTTP ARchive format)

An HAR file is a JSON file that you generate to track all logs of a web browser's interaction with a website. It is used to troubleshoot performance and page rendering issues such as slow page loads, timeouts, incorrect page formats, and missing information.

It is recommended that you generate multiple HAR files, for comparison. For example, you can generate an HAR file for a page that is performing normally, as well as for the page that is having issues.

### How do I generate and HAR file?

#### Google Chrome

1. Open **Developer Tools** in Chrome

1. Select **Network** tab

1. Look for a **Record 🔴** button; it should be red, if it is gray, click to begin recording

1. Check the **☑️ Preserve log** box to enable

1. Click the **Clear 🚫** symbol to clear all current network requests

1. Navigate to the search bar and enter the URL of the page that is having issues; reproduce the steps that led to the issue

1. Once you have reproduced the issue, click on the **Export HAR (pic of icon)** symbol and save the file

#### Mozilla Firefox

1. Open **Developer Tools** in Firefox

1. Select **Network** tab

1. Click **Cog ⚙️** icon, then on **Persist Logs**

1. Look for a **Trash (pic of icon)** icon and click to clear all current network requests

1. Navigate to the search bar and enter the URL of the page that is having issues; reproduce the steps that led to the issue

1. Right-click on any file, in any column, and navigate to **Save All As HAR**

#### Microsoft Edge

1. Open **Developer Tools** in Edge

1. Select **Network** tab

1. Look for a **Record 🔴** button; it should be red, if it is gray, click to begin recording

1. Check the **☑️ Preserve log** box to enable

1. Click the **Clear 🚫** symbol to clear all current network requests

1. Navigate to the search bar and enter the URL of the page that is having issues; reproduce the steps that led to the issue

1. Once you have reproduced the issue, click on the **Export HAR (pic of button)** symbol and save the file

#### Internet Explorer

1. Open **Developer Tools** in Explorer

1. Select **Network** tab

1. Look for, and click, a green **Record (pic of icon)** button; once clicked, there will be a red square to indicate it is recording

1. Next, look for an **X** and click to clear all current network requests

1. Check the **Preserve (pic of icon)** icon to preserve your console logs

1. Navigate to the search bar and enter the URL of the page that is having issues; reproduce the steps that led to the issue

1. Once you have reproduced the issue, click on the **Export (pic of button)** symbol and save the file

#### Safari

1. Open **Web Inspector** in Safari

1. Select **Network** tab

1. Check the **Preserve Log** box to enable

1. Look for a **Trash (pic of icon)** icon and click to clear all current network requests

1. Navigate to the search bar and enter the URL of the page that is having issues; reproduce the steps that led to the issue

1. Once you have reproduced the issue, click on the **Export (pic of button)** symbol and save the file