# Images
Images should show users single actions, in context. Use more than one image to show a procedure so that users can track the differences, especially cause/effect relationships. 
Save images inside of this directory, no matter the location of the document(s) that contain them. 

## Capturing Screenshots

Use any screen capture tool, but capture only as much of an interface as you need. We recommend [Skitch](https://evernote.com/skitch/ "Skitch download page"), because it's free, easy, and we require it for annotations.  

## Cropping
Capture only as much of the screen as needed to convey the action users will perform, or the context that is relevant to their performance.

## Skitch Annotations
Use [Skitch](https://evernote.com/skitch/ "Skitch download page") to __add meaning__ to your images. All annotations must be red, medium line width. Use only the following Skitch tools:
 - __Rectangle:__ Highlight specific areas of an interface where the user will act, such as a text box or button. Do not highlight things the interface already highlights, such as the active environment or tool in site dashboards.
 - __Text:__ Add imperative statements or labels, located next to the location of the action. Avoid redundancy with the interface, but it's okay to be redundant with the instructions in the document.  
 - __Pixelate:__ Always pixelate sensitive information, such as:
    - User email addresses which show in team modals and on the org dashboard's people tab. 
    - Site names, if they cannot be cropped out.
    - Site connection information and passwords (add text to indicate what is missing if necessary)
 - __Arrow:__ Use sparingly. Arrows convey direction or motion. Rectangles are better at highlighting areas of the screen, and text proximity is better for indicating locations

## Saving Images
Use the .png file format.

Name images descriptively so that we, and search engines, can differentiate between them. Use hyphens between words in the filename.  
Ex: sites-dev-code-pending-changes-ready-commit.png

## Embedding Images
Markdown syntax for images is `![Alt text](/path/to/filename.png "Optional Title")` You can also use html <img> tags, but this should be unnecessary, as images are set to a max-width of 100% by .css, and are provided with a 1px black border.

The Alt attribute should convey the meaning of the image as closely as possible. The Title attribute is optional, and if used, should only elaborate on the Alt attribute. It will be shown to users when their cursor hovers over the image. The example below omits the title attribute

The code: `![The code tool in a site dashboard's development environment, with one file with changes ready to commit](/source/docs/assets/images/dev-code-pendingchanges-commit.png)`

will yield:
![The code tool in a site dashboard's development environment, with one file with changes ready to commit](/source/docs/assets/images/dev-code-pendingchanges-commit.png) 

## Committing Docs with Images
Add image files and the docs they are embedded in to a single commit. 

## Updating Images
Sometimes you will need to update an image because of a functionality or interface change. To do so:

1. Search the repo for the filename to see if other docs use the same image. 
2. Add the image to your local clone, using the same filename to update, change the filename to replace and keep the original in the repo.
3. Commit the image file with any related documentation changes.
