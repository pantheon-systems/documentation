## HAR (HTTP ARchive format)

An HAR file is a JSON file that you generate to track all logs of a web browser's interaction with a website. It is used to troubleshoot performance and page rendering issues such as slow page loads, timeouts, incorrect page formats, and missing information.

It is recommended that you generate multiple HAR files, for comparison. For example, you can generate an HAR file for a page that is performing normally, as well as for the page that is having issues.

### How do I generate and HAR file?

<TabList>

<Tab title="Chrome" id="chrome" active={true}>

1. Open **Developer Tools** in Google Chrome.

1. Select the **Network** tab.

1. Locate the **Record 🔴** button; it should be red. If the **Record 🔴** button is gray, click to begin recording.

1. Check the **<i class="fa fa-check-square"></i> Preserve log** box to enable.

1. Click the **Clear 🚫** symbol to clear all current network requests.

1. Navigate to the search bar and enter the URL of the page that is having issues. Reproduce the steps that led to the issue.

1. Once you have reproduced the issue, click on the **Export HAR <i class="fa fa-download"></i>** symbol and save the file.

</Tab>

<Tab title="Firefox" id="firefox">

1. Open **Developer Tools** in Mozilla Firefox.

1. Select the **Network** tab.

1. Locate and click the **Cog <i class="fa fa-gear"></i>** icon on the right side of the panel, then select **Persist Logs**.

1. Locate a **Trash** icon on the left side of the panel and click to clear all current network requests.

1. Navigate to the search bar and enter the URL of the page that is having issues; reproduce the steps that led to the issue.

1. Right-click on any file, in any column, and navigate to **Save All As HAR**.

</Tab>

<Tab title="Edge" id="edge">

1. Open **Developer Tools** in Microsoft Edge.

1. Select the **Network** tab.

1. Locate the **Record 🔴** button; it should be red. If the **Record 🔴** button is gray, click to begin recording.

1. Check the **<i class="fa fa-check-square"></i> Preserve log** box to enable.

1. Click the **Clear 🚫** symbol to clear all current network requests.

1. Navigate to the search bar and enter the URL of the page that is having issues; reproduce the steps that led to the issue.

1. Once you have reproduced the issue, click on the **Export HAR <i class="fa fa-download"></i>** symbol and save the file.

</Tab>

<Tab title="Explorer" id="explorer">

1. Open **Developer Tools** in Internet Explorer.

1. Select the **Network** tab.

1. On the left side of the panel, locate, and click, a green **Record <i class="fa fa-caret-right"></i>** button; once clicked, there will be a red square to indicate it is recording.

1. Next, locate the **<i class="fa fa-times"></i>** icon and click to clear all current network requests.

1. Check the **Preserve** icon (arrow with a red x) to preserve your console logs.

1. Navigate to the search bar and enter the URL of the page that is having issues; reproduce the steps that led to the issue.

1. Once you have reproduced the issue, click the **Export <i class="fa fa-save"></i>** symbol and save the file.

</Tab>

<Tab title="Safari" id="safari">

1. Open **Web Inspector** in Safari.

1. Select the **Network** tab.

1. Check the **<i class="fa fa-check-square"></i> Preserve Log** box to enable.

1. Locate a **Trash** icon on the right side of the panel and click to clear all current network requests.

1. Navigate to the search bar and enter the URL of the page that is having issues; reproduce the steps that led to the issue.

1. Once you have reproduced the issue, click on the **<i class="fa fa-upload"></i> Export** symbol and save the file.

</Tab>

</TabList>

