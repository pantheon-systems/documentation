**DOCUMENTATION STYLE GUIDE**

#About This Guide

This style guide will help authors who create technical content write in consistent voice, tone, and style.

For any questions or comments, [create an issue](https://github.com/pantheon-systems/documentation/issues).

## Writing Style

### Voice and Tone
Write in a friendly, yet professional tone.  Pantheon is "Fast, Proven, Innovative". Pantheon is young, but mature for its age. Smart, but not disconnected from culture. Focused, but agile. Fast, but extremely intricate.

#### Common Web Writing Guidelines

* Be consistent.  Use the same terminology, voice, and tone throughout all documentation.

* Write clearly, and use language the audience understands. Avoid jargon whenever possible.

* Be concise. Focus on providing key information and avoid including superfluous information (less is more).

* Write in a visually appealing style.

* Use numbered lists for chronological steps.

* Use bulleted lists to highlight information in a visually appealing way. This also gives the user a visual rest by breaking up blocks of content.

## General Guidelines for All Content

* Avoid gender-specific language. Use the imperative. This form of a verb lets you use the second person (you, your) rather than the third person (him, her, she, his).

* Write in an action-oriented style. Focus on helping the user complete the task at hand by writing in the active voice. An active voice is more direct and reduces ambiguity. Avoid passive voice as it is often vague and creates awkward sentences.

* Be mindful of the audience's varying needs and prior knowledge. Write content  that users of all technical knowledge and experience-level can easily understand and follow.

* Use of contractions:  Contractions can be used to create a conversational, informal tone, such as in FAQs or WalkMe content. Avoid using contractions in UI labels i.e. button names, page headers, etc.

* Text Formatting (Bold vs. Italics): Avoid using italics in web content as it decreases readability. Use bold if you need to make content prominent. For instance,  when referring to a button or page name in technical documentation.

## Web Content Types

### Fonts

The preferred font at Pantheon is Futura Medium and Open Sans. Body font should always use Open Sans.

The best practice is to limit the amount of fonts used in a document and remain consistent throughout the entire document.


### User Interface Images/Screenshots

* Every image should have descriptive alt text.

* Screenshots must not capture the site name.

* Screenshots should include the Environments bar and Tool tab.

* Use arrows and callouts to help explain the elements in the image that are not already highlighted by the interface. Do not use callouts to highlight the environment and tool, as they are apparent.

### Videos

* Use video sparingly, and only for more complex tasks.

* Videos must be hosted by a third party (YouTube, Vimeo, etc.).

* Videos should be as short as possible, typically no more than 30 seconds.

* Embed videos with an iframe: `<iframe allowfullscreen="" frameborder="0" height="315" src="//www.youtube.com/embed/UZgMQ7DIxo8" width="560"></iframe>` will yield <iframe allowfullscreen="" frameborder="0" height="315" src="//www.youtube.com/embed/UZgMQ7DIxo8" width="560"></iframe>.  

### Code Snippets

Any bits of code should be wrapped in backticks.  Any standalone code blocks should use [backtick code fencing](https://help.github.com/articles/github-flavored-markdown/#fenced-code-blocks "Markdown extra fenced code blocks.")

### Links

Only link the title of the article or name of a site, not the entire leading sentence or any ending punctuation. For example: `[Guide Title](/docs/articles/wordpress/guide-title "Pantheon's Guide to doing something in WordPress")` will yield [Guide Title](/docs/articles/wordpress/guide-title "Pantheon's Guide to doing something in WordPress").


### Anchor Tags

Use headings in a logical manner. The system we use should generate these from the headings as a TOC block.

### Anchor Links

Use headings in a logical manner. The site will automatically generate anchor links for H2 and H3 tags, and place them in a Table of Contents in the right column. Generated links will be "pretty".

#A-Z Usage  

## Accessibility

* When creating content, ask if the content you’re creating is accessible by a screen-reader for visually-impaired users, and accessible via mouse or keyboard.

* Provide alt text for all images so that the screen reader can interpret the purpose of the image and convey that to the user. The alt text should include any content shown in the image so that screen reader can read it to the user.

For more information regarding accessibility guidelines, see [W3C Web Content Accessibility Guidelines 2.0](http://www.w3.org/TR/UNDERSTANDING-WCAG20/Overview.html#contents "W3C, Guidelines").

## Acronyms and Abbreviations

* Avoid abbreviating common words. It is preferable to spell it out unless there are major space limitations, such as in a table.

  **Example**: Use account (not acct.) and number (not no.).

* Use abbreviations and acronyms only when the outcome helps the reader and simplifies the experience.

* If it is not a commonly used acronym, spell it out at out at least once per page and abbreviate in parentheses afterward.

  **Example**: Content Management System (CMS)


## Capitalization

See below for when to use title or sentence case. Never use all caps. If you need to make content prominent, use bold rather than all caps or italics.

###Title Case

Use title case for all headers, buttons, tab names, and links, and when referring to these elements in technical documentation. However, do not use title case for the words button, link, page, tab. Only capitalize the name displayed on the element, not the type of element.

Title case means that you capitalize every word except:

* Articles (a, an, as, the)

* Coordinating conjunctions (and, or)

**Examples**:

Domains For the Development Environment (header)

Select **Make Owner**.

Click **Clear Caches**.

Select the **Settings** tab.

###Sentence Case

Use sentence case for body content and short phrases, even when the content is a link. Sentence case means you only capitalize the first letter of the sentence.

**Example:**
If you want to permanently opt-out of a check, you can use the [$conf array in settings.php](https://www.drupal.org/node/1525472).  

**Code Snippets**

Capitalize the proper noun Git in sentences, but leave the ‘g’ lowercase in code snippets.

**Example:**

I use Git on my local machine.

Run "`git add`".

##Contrib Directory

All Drupal sites used for generating documentation must install contributed modules to sites/all/modules/contrib.
All references must be to:
```
sites/all/modules/contrib
```

##Cross-Referencing Documents

When linking to an article in a sentence, use the exact title of the article if possible. If using the exact title, display it in title case. The link should be blue with no other formatting (bold, italics, quotations).   **Example**:

For help with SSH keys, see [Generating SSH Keys](/docs/articles/users/generating-ssh-keys/).

When linking to an article in a sentence without using the exact title, display it as part of the sentence in sentence case. **Example**:
In WordPress, [advanced custom fields can be exported to code](http://stevegrunwell.com/blog/exploring-the-wordpress-advanced-custom-fields-export-feature/ "Steve Grunwell blog, WordPress post").

When referring to another article to provide detailed instructions that are important for completing the current task, use this format:
```
For detailed instructions, see [Article Title](/docs/articles/path).
```
When cross-referencing a document as suggested reading that the user may find helpful because it is related to the task/topic, but not essential for completing the current task, use this format:
```
For more information, see [Article Title](/docs/articles/path).
```
## Dates

Use this format to indicate a date: January 10, 2014. Do not abbreviate the month.

In a form or when space is limited, use slashes in the format of month/day/year without any leading zeros: 1/10/2014


## Elements of Style

See [The Elements of Style](http://www.bartleby.com/141/index.html) by William Strunk and E.B. White for principles of composition, word usage, and writing style guidelines.

## Embedded Guidance (Walkthroughs)
Walkthrough Titles - Use the associated procedure title
Step title:
Step description:

Title: Task focused, very concise.  
**Example**: Add an SSH Key.

Description: Give an overview of the WalkMe demonstration. This is the purpose of the task and accomplishment.   **Example**: Learn how to add and manage SSH keys.

## FAQs

Write the questions as if the user were asking them. If there are more than two steps in the answer, use a numbered list.
When it's an FAQ only doc, include categories as h2s and display the questions as h3s. If FAQs are included as part of a larger document, display them as h4s.

**Example of a simple FAQ**:

**Does Pantheon Support WordPress?**

Yes. We have complete and total support for WordPress sites and developers.

**Example of an instructional FAQ**:

**How do I change my Pantheon password?**

1. Select **Sites & Accounts** from the user account drop-down menu.

2. Click the **Account** tab.

3. Select **Change Password**.

4. Enter the information, and click **Save**.

### File Paths

File paths should be shown the same way code snippets are so that they're easier to read. File paths should be wrapped in backticks.  
```
/source/docs/assets/images/
```

If it's a path within the Dashboard, separate tab/page names with an angle bracket ">".  

**Example**: Settings > Add Ons > Add  

## Filenames
In general, filenames should be as short as possible. Add a hyphen (-) between each word.
**Example:** writing-a-guide.md


## Grammar

See the *Chicago Manual of Style* for all grammar-related questions.

## Headings and Subheadings

When writing a heading or subheading in a document, use an imperative verb and not a gerund (a verb ending in "ing"). Headings should be shown in H2 tags, and subheadings should be shown in H3 tags.

When writing an outline for a guide or article, decide what the main topics are. Those will be your headings (tagged as H2). If there are subtopics that belong under a category, display those as subheaders (tagged as H3).

**Example**:

## Configuration
The configuration topic may have a 1-3 paragraphs on its own, as well as several subtopics.

###Stage and Commit Settings.php
This is a subtopic of Configuration. Specific information related to settings.php will be shown here.


## Identifying Instances of Concepts

Within videos and tutorials, it may be helpful to call out a concept to provide some contextual information. Do this by inserting a hyperlink.

In technical documentation or the UI, this can be a rollover glossary definition with a link to a helpdesk article, if needed.

## Listing Prerequisites (Before You Begin)

If there are tasks a user needs to have completed before continuing on with the current task, i.e. installing a module, downloading a Drupal update, add a "Before You Begin" section at the top of the document, following the overview/intro section or table of contents. Use the title “Before You Begin” and format as H2.

**Example**:

####Before You Begin

You’ll need to enable the ApacheSolr module. Visit the [ApacheSolr](https://drupal.org/project/apachesolr "Drupal.org, apache solr project page") page on Drupal.org for more information.

##Pantheon_Environment
TBD: We should standardize on either using the constant PANTHEON_ENVIRONMENT or the superglobals $_ENV['PANTHEON_ENVIRONMENT'] (always around) or '$_SERVER['PANTHEON_ENVIRONMENT']` (only around on web-originated requests).


## Notes

Notes are helpful to call out information that the user needs to be aware of while completing a task.  

When adding an informational note to a document, use the info alert styling and wrap the word "Note" in H4 tags.

<div class="alert alert-info" role="alert">
<h4>Note:</h4> You will need to download and install Git before you can begin.</div>

If there is **critical** or detrimental information a user must read before starting, use the danger alert styling and wrap the word "Warning" in H4 tags:

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>: This is a permanent change and once you delete it your site cannot be restored.</div>

## Numbers

For all numbers under 10, spell out the number. For 10 and above, use the numeral.

**Correct**: Joe has nine sites and needs to add 12 more.

**Incorrect**: Joe has 9 sites and needs to add twelve more.

##Procedures

When writing about procedures, you can include an overview, prerequisites, a list of steps involved in the task, images, goals, and related procedures. The document may or may not include all of those items.

When writing procedures, steps should be written in parallel style, as sentences with imperative verbs and not gerunds (ending in "ing").

**Example**:

Create Your Site.

Choose Your Framework.

Visit the Dev environment.

## Punctuation

Ampersand (&): Use "&" only in headings where items are grouped or in proper names. Do not use in sentences.

Colon (:) introduces lists or series.

Commas (,) Use a serial comma (the comma preceding the "and" before the last element in a list) in lists of three or more items.

Incorrect: Please enter the name, phone number and address.

Correct: Please enter the name, phone number, and address.

Em dash (—) is used to indicate a break in thought or a parenthetical comment. Do not add spaces around the em dash.

En dash (–) indicates a range or a continuation of a series. Use spaces on each side of the en dash.  

Pages 11 – 19   Mon – Fri,   Sept – Dec, Nov 1 – 17

Exclamation point (!): Avoid.  We do not use exclamation points in user assistance content. It is more appropriate for marketing and sales content, but not in the UI or technical documentation.

Hyphen (-) connects two words. No spaces are needed around the hyphen.

Company-wide holiday, eight-hour day, long-term care

Slash (/): Avoid. Use "or," “and,” or “or both” instead.

## Referring to Drupal or WordPress

Atomic/Official Documentation: When you’re writing technical documentation and the instructions include steps performed in the Drupal or WordPress systems, refer the reader to the Drupal or WordPress helpdesk by creating a link to it,  rather than writing the instructions yourself.  Otherwise, we will have to constantly update our documentation as the Drupal and WordPress interfaces change (creating a maintenance headache).

**Example**:

There are many modules and themes available in Drupal. For more information, see [Installing Modules](https://www.drupal.org/documentation/install/modules-themes/modules-7 "Drupal.org, installing modules"). [This links directly to Drupal’s existing documentation.]

## Referring to Rules and Concepts

Contextual help provides readers with more information or related information without leaving the current page or cluttering the page. It is obvious to the user and is the least disruptive to workflow, as it doesn’t require the reader to view a separate page.

Create contextual help by linking terms or concepts to supplemental documentation so the reader can click to get more information (glossary definition, contextual, call out rules) if needed.

The link can:

1. Open a small pop-up window that provides a definition, and optionally a link to other user assistance material.

2. Link directly to existing documentation i.e. video, WalkMe helpdesk article, third-party support site, user  guide, blog post, etc.

**Example**:

One of the modules already included in every Drupal site on Pantheon is [pantheon_apachesolr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr "github.com, drops 7").

Best Practices:

* Link the term or concept only, not the entire sentence.

* Store rules and concepts in docs which can be reused throughout various content types.

* The stored rules and concepts should be small chunks of information.

* Rules/concepts can be used in any online content, including demonstrations, helpdesk articles, etc.

* Use sparingly to reduce screen noise.

* Use for uncommon or difficult terms and concepts.

##Referring to Tabs in the Platform

There are two ways to display tab/page names, depending on usage. In either case, always use title case for the tab/page name.

1. Instructing the user to click on a tab as part of a task:  
In Settings, click the **Add Ons** tab.  
To update the credit card, click the **Billing** tab.

2. Referring to a page/tab name, without providing instructions:  
You can find the options available in the Add Ons tab.  
You can change the credit card in the Billing tab.


## Titles

For titles of helpdesk articles and WalkMe files, use gerunds (verb ending in "ing") and display it as H1. Create concise, task-based titles so the user can scan a page and quickly find the information they are looking for. The title should be able to fit on 1-2 lines.

**Examples**:

Creating a Pantheon Site

Generating SSH Keys

## User Interface Terminology

See below for examples of the terms to use when referring to specific pages, tabs, or UI elements in the Dashboard.

### Environments
There are four types of environments in the Dashboard: Dev, Test, Live, and Multidev. When referring to an environment, always capitalize the name of the environment, but not the word "environment".

When instructing a user to click on an environment tab, capitalize the name of the environment but not the word "tab".

**Correct**:  
From your Site Dashboard, go to the **Dev environment**.  
Click the **Live tab**.  
All Partner organizations have Multidev available on every site.  
On Test and Live, PHP errors are not displayed to users, but they'll still be logged.  
Load testing should only be performed on the Live environment.  

**Incorrect**  
Go to the Dev Environment.  
The final step is to deploy your code and plugin settings to the live environment.

### User Dashboard
It's always referred to as User Dashboard in order to reduce confusion between the Org Dashboard and Site Dashboard.

![User Dashboard](/source/docs/assets/images/pantheon-user-dashboard1.png)

#### Tabs on the User Dashboard
Organizations Tab
When instructing a user to click on a tab, capitalize the tab name but not the word "tab".  
**Examples**:  
View a list of your Organizations by clicking the **Organizations tab**.  
Open a ticket on the Support tab.

### Site Dashboard

Terms to use when referring to the Dashboard: Site Dashboard or the Dashboard.

![Site Dashboard](/source/docs/assets/images/site-dashboard-image.png)

#### Site Dashboard Tools
Capitalize the name of the tab, but not the word "tab".  
**Examples**:  
View the commit log by clicking the **Code tab**.  
PHP errors are listed on the Errors tab.  

## Resources

[Basho - Documentation - Designing for Clarity and Comprehension](http://basho.com/documentation-designing-for-clarity-and-comprehension/)

[Drupal - Content Style Guide](https://www.drupal.org/style-guide/content)

[Knowledge Base Best Practices](http://kb.mit.edu/confluence/display/handbook/Knowledge+Base+Best+Practices "MIT.edu, KB best practices")

[Atlassian Author Guidelines](https://confluence.atlassian.com/display/ALLDOC/Author+Guidelines#AuthorGuidelines-9.DocumentationStyleGuidelines)

[Atlassian Writing Style](https://design.atlassian.com/latest/product/foundations/writing-style/)

[Apple Style Guide](https://help.apple.com/asg/mac/2013/ASG_2013.pdf)

[Marketing/Brand Style Guide](https://docs.google.com/a/getpantheon.com/file/d/0ByQAGaXeMZgJQmp1Yzk2SnlLdzg/edit "Pantheon google drive, Brand Style Guide")
