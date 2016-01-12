# Images
Images represent a user's single action, in context. Use one image for each step of a procedure so that users can track the differences, especially cause/effect relationships.
Save images inside of this directory, no matter the location of the document that contains them.

## Capturing Screenshots

Use any screen capture tool, but capture only as much of an interface as you need. We recommend [Skitch](https://evernote.com/skitch/ "Skitch download page"), because it's free, easy, and we use it for annotations.  

## Cropping
Capture only as much of the screen as needed to convey the action users will perform, or the context that is relevant to their performance. It doesn't have to be perfect. If in doubt, capture more than you think we'll need, and we will crop the image further before publishing.

## Annotating images

Do **not** annotate images. If extra meaning is needed, we will add markup to images in a consistent manner. This section will change once our markup standards and workflow are set.

## Naming Images
Use the .png file format. Images with skitch annotations will be saved in skitch png.

Name images descriptively so that we, and search engines, can differentiate between them. Use hyphens between words in the filename.  
Ex: sites-dev-code-pending-changes-ready-commit.png

## Compressing

Take your newly named and locally saved images and compress them at [Tiny PNG](https://tinypng.com/) prior to adding to the repository.

## Adding Images to the Repository
Move your newly compressed files to `/source/docs/assets/images/`.

## Embedding Images
Markdown syntax for images is `![Alt text](/path/to/filename.png "Optional Title")` You can also use html <img> tags, but this should be unnecessary, as images are set to a max-width of 100% by css in our theme, and are provided with a 1px black border.

Add a single space before the image syntax to embed images within a list (ordered or unordered).

The code (when used within a list):
```
1. Ordered list item
2. Ordered list item
3. Ordered list item
 ![Create your first site](/source/docs/assets/images/create-site-dashboard.png)
4. Ordered list item
5. Ordered list item
```

Will yield:

1. Ordered list item
2. Ordered list item
3. Ordered list item
 ![Create your first site](/source/docs/assets/images/create-site-dashboard.png)
4. Ordered list item
5. Ordered list item

The Alt attribute should convey the meaning of the image as closely as possible. The Title attribute is optional, and if used, should only elaborate on the Alt attribute (do not repeat the Alt text in the Title). It will be shown to users when their cursor hovers over the image. The example below omits the title attribute. If in doubt, omit the Title attribute.

The code: `![The code tool in a site dashboard's development environment, with one file with changes ready to commit](/source/docs/assets/images/dev-code-pendingchanges-commit.png)`

will yield in the output server (Sculpin):
![The code tool in a site dashboard's development environment, with one file with changes ready to commit](/source/docs/assets/images/dev-code-pendingchanges-commit.png)

This is possible through the addition of a symlink at the root of the output site. For the images to display locally, you need to add the symlink to your output. From the root of the documentation repository:

```
$ cd output_dev
$ ln -s ./ source
```

## Committing Docs with Images
Add new `png` files to the `source/docs/assets/images` directory, then include the image and `alt` attribute in the desired doc(s) within a single Pull Request.

## Updating Images
Sometimes you will need to update an image because of a functionality or interface change. To do so:

1. Search the repo for the filename to see if other docs use the same image.
2. Add the image to your local clone, using the same filename to update, change the filename to replace and keep the original in the repo.
3. Commit the image file with any related documentation changes.
