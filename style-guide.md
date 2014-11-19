**DOCUMENTATION STYLE GUIDE**



[[TOC]]

# About This Guide

This style guide will help Pantheors who create technical content write in consistent voice, tone, and style. See the glossary for an alphabetical listing of commonly used words, terms, UI elements, and titles.

For any questions or comments, email [docs@pantheon.com](mailto:docs@pantheon.com). 

## Writing Style

### Voice and Tone

##### Common Web Writing Guidelines

* Be consistent.  Use the same terminology, voice, and tone throughout all documentation. 

* Write in a friendly, yet professional tone.  Pantheon is "Fast, Proven, Innovative". Pantheon is young, but mature for its age. Smart, but not disconnected from culture. Focused, but agile. Fast, but extremely intricate. 

* Write clearly, and use language the audience understands. Avoid jargon whenever possible.

* Be concise. Focus on providing key information and avoid including superfluous information (less is more). 

* Write in a visually appealing style. 

    * Use numbered lists for chronological steps.

    * Use bulleted lists to highlight information in a visually appealing way. This also gives the user a visual rest by breaking up blocks of content. 

### General Guidelines for All Content

* Avoid gender-specific language. Use the imperative. This form of a verb lets you use the second person (you, your) rather than the third person (him, her, she, his).

* Write in an action-oriented style. Focus on helping the user complete the task at hand by writing in the active voice. An active voice is more direct and reduces ambiguity. Avoid passive voice as it is often vague and creates awkward sentences.

* Be mindful of the audience's varying needs and prior knowledge. Write content  that users of all technical knowledge and experience-level can easily understand and follow. 

* Use of contractions:  Contractions can be used to create a conversational, informal tone, such as in FAQs or WalkMe content. Avoid using contractions in UI labels i.e. button names, page headers, etc. 

* Text Formatting (Bold vs. Italics): Avoid using italics in web content as it decreases readability. Use bold if you need to make content prominent. For instance,  when referring to a button or page name in technical documentation. 

## Content Types for the Web

### Fonts

The preferred font at Pantheon is Futura Medium and Open Sans. Body font should always use Open Sans. 

It is best practice to limit the amount of fonts used in a document and remain consistent throughout the entire doc.

### User Interface Images/Screenshots

* Screenshots must be responsive.

* Every image should have descriptive alt text.

* Screenshots must not capture the site name.

* Screenshots should include the Environments bar and Tool tab.

* Use arrows and callouts to help explain the elements in the image.

### Videos

Videos enable visual learners to get information in a way that works for them (vs. content only). 

Best practices for using video in web-based help documentation:

* Use video sparingly, and only for more complex tasks. 

* Videos must be hosted on YouTube.

* Videos should be as short as possible, typically no more than 30 seconds.

* By default, videos should display in a paused state until the user clicks  it.  Display a prominent play button to direct user attention to the Play option. 

* Video should be embedded within the page rather than opening in a new window.  

### Code Snippets

Any bits of code should be wrapped in `code `tags. Any standalone code blocks should be wrapped in `pre` tags.

### Links

Links should be displayed in blue, with no additional formatting. Only link the title of the article or name of a site, not the entire leading sentence or any ending punctuation. For more information, see [Cross-Referencing Documents](#bookmark=id.r632os5owzq1).

### Anchor Tags 

Use headings in a logical manner. The system we use should generate these from the headings as a TOC block. 

## Accessibility

* When creating content, ask if the content you’re creating is accessible by a screen-reader for visually-impaired users, and accessible via mouse or keyboard.

* Provide alt text for all images so that the screen reader can interpret the purpose of the image and convey that to the user. The alt text should include any content shown in the image so that screen reader can read it to the user. 

For more information regarding accessibility guidelines, see [W3C Web Content Accessibility Guidelines 2.0](http://www.w3.org/TR/UNDERSTANDING-WCAG20/Overview.html#contents).

## Acronyms and Abbreviations

* Avoid abbreviating common words. It is preferable to spell it out unless there are major space limitations, such as in a table. 

**Example**: Use account (not acct.) and number (not no.).

* Use abbreviations and acronyms only when the outcome helps the reader and simplifies the experience. 

* If it is not a commonly used acronym, spell it out at out at least once per page and abbreviate in parentheses afterward. 

**Example**: Drupal Runtime Optimized Process (DROPs)

## Capitalization

See below for when to use title or sentence case. Never use all caps; use bold if you need to make content prominent. 

**Title Case**

Use title case for all headers, buttons, and links, and when referring to these elements in technical documentation. However, do not use title case for the words button, link, page, tab. Only capitalize the name displayed on the element, not the type of element. 

Title case means that you capitalize every word except:

* Articles (a, an, as, the)

* Coordinating conjunctions (and, or) 


**Examples**:

Domains For the Development Environment (header)

Clear Caches (button)

Click the **Clear Caches** button.

**Sentence Case**

Use sentence case for body content and short phrases, even when the content is a link. Sentence case means you only capitalize the first letter of the sentence. 

**Example:**   
We run our status checks on your site automatically once an hour. If you'd like fresher data, run the checks now.

**Code Snippets**

Capitalize the proper noun Git in sentences, but leave the ‘g’ lowercase in code snippets. 

**Example:**

I work with Git on my local machine.

Run "`git add`".

## Dates

Use this format to indicate a date: January 10, 2014. Do not abbreviate the month. 

In a form or when space is limited, use slashes in the format of month/day/year without any leading zeros: 1/10/2014 

## Cross-Referencing Documents

When linking to an article in a sentence, use the exact title of the article if possible. If using the exact title, display it in title case. The link should be blue with no other formatting (bold, italics, quotations). **Example**:

For help with SSH keys, see Generating SSH Keys.

When linking to an article in a sentence without using the exact title, display it as part of the sentence in sentence case. **Example**:
In WordPress, [advanced custom fields can be exported to code](http://stevegrunwell.com/blog/exploring-the-wordpress-advanced-custom-fields-export-feature/). 

When referring to another article to provide detailed instructions that are important for completing the current task, use this format:

For detailed instructions, see Article Title.

When cross-referencing a document as suggested reading that the user may find helpful because it is related to the task/topic, but not essential for completing the current task, use this format:

For more information, see Article Title. 

## Elements of Style

See [The Elements of Style](http://www.bartleby.com/141/index.html)  by William Strunk and E.B. White for principles of composition, word usage, and writing style guidelines. 

## Embedded Guidance (Walkthroughs)
Walkthrough Titles - Use the associated procedure title
Step title:
Step description:


Title - Task focused, very concise. **Example**: Add an SSH Key.

Description - Give an overview of the WalkMe demonstration. This is the purpose of the task and accomplishment. **Example**: Learn how to add and manage SSH keys. 

## FAQ’s

Write the questions as if the user were asking them. If there are more than two steps in the answer, use a numbered list. 

**Example**:

How do I change my Pantheon password? 

1. Select **Sites & Accounts **from the user account drop-down menu.

	

1. Click the **Account** tab.

2. Select **Change Password**.

3. Enter the information, and click **Save**. 

## [Glossary](https://docs.google.com/spreadsheets/d/1npBDQl1v0l-mukVC9yF9RSwvwjdSlrqUY5B1oDgy9kw/edit#gid=0)

The glossary includes an A-Z usage list of common terms used in Pantheon documentation.

## Grammar

See the *Chicago Manual of Style* for all grammar-related questions. 

## Headings and Subheadings 

When writing a heading or subheading in a document, use an imperative verb and not a gerund (a verb ending in "ing"). 

**Examples**:

Create a Pantheon Site

Choose Your Framework

Visit the Dev Environment

When using headings or subheadings to group a large amount of text or instructions, number each header and include ending punctuation (typically a period). 

**Example**: 

## 1. Merge Core Releases.

Upstream maintainers update Drupal and WordPress core for their users each time the project releases a new version. Upstreams that are not kept up-to-date with core security updates of either framework will be removed from the platform. To do so: cd to your local, current copy of the remote upstream repo, checkout an update branch, and pull down the latest changes from our core upstream repository with: 

`git pull git://github.com/pantheon-systems/wordpress.git master`

or

`git pull git://github.com/pantheon-systems/drops-6.git master`

## Listing Prerequisites (Before You Begin)

If there are tasks a user needs to have completed before continuing on with the current task, i.e. installing a module, downloading a Drupal update, add a "Before You Begin" section at the top of the document, following the overview/intro section or table of contents. Format “Before You Begin” as a header.

**
****Example**:

## **Before You Begin**

You’ll need to enable the ApacheSolr module. Visit the [ApacheSolr](https://drupal.org/project/apachesolr) page on Drupal.org for more information.

## 
Identifying Instances of Concepts

Within videos and tutorials, it may be helpful to call out a concept to provide some contextual information. Do this by inserting a hyperlink. 

In technical documentation or the UI, this can be a rollover glossary definition with a link to a helpdesk article, if needed.

## Procedures

See below for a template about writing procedures. This area can include an overview, prerequisites, a list of steps involved in the task, images, goals, and related procedures. The document  may or may not include all of those items.

	

When writing procedures, steps should be written in parallel style, as sentences with imperative verbs and not gerunds (ending in "ing). 

**Example**:

Create your site. 

Choose your framework.

Visit the Dev environment.

## Notes

Notes are helpful to call out information that the user needs to be aware of while completing a task.  

When adding a note to a document, use sentence case and bold only the word, not the colon. See the example below:

**Note**: You will need to download and install Git before you can begin.

## Numbers

For all numbers under 10, spell out the number. For 10 and above, use the numeral. 

Correct: Joe has nine sites and needs to add 12 more.

Incorrect: Joe has 9 sites and needs to add twelve more. 

## Punctuation

Ampersand (&):   Use "&" only in headings where items are grouped or in proper names. Do not use in sentences.

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

## Referring to Drupal or Wordpress

Atomic/Official Documentation: When you’re writing technical documentation and the instructions include steps performed in the Drupal or Wordpress systems,  refer the reader to the Drupal or Wordpress helpdesk by creating a link to it,  rather than writing the instructions yourself.  Otherwise, we will have to constantly update our documentation as the Drupal and Wordpress interfaces change (creating a maintenance headache).

**Example**:

There are many modules and themes available in Drupal. For more information, see [Installing Modules](https://www.drupal.org/documentation/install/modules-themes/modules-7). [This links directly to Drupal’s existing documentation.]

## Referring to Rules and Concepts

Contextual help provides readers with more information or related information without leaving the current page or cluttering the page. It is obvious to the user and is the least disruptive to workflow, as it doesn’t require the reader to view a separate page. 

Create contextual help by linking terms or concepts to supplemental documentation so the reader can click to get more information (glossary definition, contextual, call out rules) if needed.

The link can:

1. Open a small pop-up window that provides a definition, and optionally a link to other user assistance material. 

2. Link directly to existing documentation i.e. video, WalkMe helpdesk article, third-party support site, user  guide, blog post, etc.

**Example**:

One of the modules already included in every Pantheon Drupal site is [pantheon_apachesolr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr).

Best practices:

* Link the term or concept only, not the entire sentence.

* Store rules and concepts in docs which can be reused throughout various content types.

* The stored rules and concepts should be small chunks of information. 

* Rules/concepts can be used in any online content, including demonstrations, helpdesk articles, etc. 

* Use sparingly to reduce screen noise.

* Use for uncommon or difficult terms and concepts. 

## Table of Contents 

For documents that have a large amount of content (more than two pages), include a TOC listing the topics/sections. This allows the reader to jump to the section they are interested in reading without having to do a large amount of reading, scanning, or scrolling. 

## Titles

For titles of helpdesk articles and walkme files, use gerunds (verb ending in "ing"). Create concise, task-based titles so the user can scan a page and quickly find the information they are looking for.

**Examples**:

Creating a Pantheon Site

Generating SSH Keys

## User Interface Terminology

See below for visual examples of the terms to use when referring to specific pages. Also see the [Glossary](https://docs.google.com/a/getpantheon.com/spreadsheets/d/1npBDQl1v0l-mukVC9yF9RSwvwjdSlrqUY5B1oDgy9kw/edit#gid=0).

### User Dashboard

### Sites Bar

### Organizations Tab

**@TODO**

**@Brian MacKinney can you insert a screenshot here?**

### Support Tab

### Account Tab

### Site Dashboard


Terms to use when referring to the Dashboard: Site Dashboard or the Dashboard.

### Settings Menu

### Team Menu

### Support Tab

### Tool Tabs

# Document Revision History

<table>
  <tr>
    <td>Version</td>
    <td>Date</td>
    <td>Description</td>
    <td>Initials</td>
  </tr>
  <tr>
    <td>0.1</td>
    <td>10/6/14</td>
    <td>Initial Creation</td>
    <td>BDM</td>
  </tr>
  <tr>
    <td>0.2</td>
    <td>10/7/14</td>
    <td>Revision</td>
    <td>NJ</td>
  </tr>
  <tr>
    <td>0.3</td>
    <td>10/9/14</td>
    <td>Revision</td>
    <td>BDM</td>
  </tr>
  <tr>
    <td>0.4</td>
    <td>10/17/2014</td>
    <td>Revision</td>
    <td>NJ</td>
  </tr>
  <tr>
    <td>0.5</td>
    <td>10/20/2014</td>
    <td>Revision</td>
    <td>NJ</td>
  </tr>
  <tr>
    <td>0.6</td>
    <td>10/21/2014</td>
    <td>Revision</td>
    <td>NJ</td>
  </tr>
  <tr>
    <td>0.7</td>
    <td>10/24/2014</td>
    <td>Revision</td>
    <td>NJ</td>
  </tr>
  <tr>
    <td>0.8</td>
    <td>11/03/2014</td>
    <td>Revision</td>
    <td>NJ</td>
  </tr>
</table>

## Resources 

[Basho - Documentation - Designing for Clarity and Comprehension](http://basho.com/documentation-designing-for-clarity-and-comprehension/) 

[Drupal - Content Style Guide](https://www.drupal.org/style-guide/content) 

[Knowledge Base Best Practices ](http://kb.mit.edu/confluence/display/handbook/Knowledge+Base+Best+Practices)

[Atlassian Author Guidelines](https://confluence.atlassian.com/display/ALLDOC/Author+Guidelines#AuthorGuidelines-9.DocumentationStyleGuidelines)

[Atlassian Writing Style](https://design.atlassian.com/latest/product/foundations/writing-style/)

[Apple Style Guide](https://help.apple.com/asg/mac/2013/ASG_2013.pdf)

[Marketing/Brand Style Guide ](https://docs.google.com/a/getpantheon.com/file/d/0ByQAGaXeMZgJQmp1Yzk2SnlLdzg/edit)
