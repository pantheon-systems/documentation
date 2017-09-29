---
title: Git and WordPress on Pantheon
subtitle: Installing a Parent Theme and Creating a Child Theme
gitwordpresspage: true
anchorid: parent-child-theme
generator: pagination
layout: guide
pagination:
    provider: data.gitwordpresspages
use:
    - gitwordpresspages
permalink: docs/guides/git-wordpress/parent-child-theme/
nexturl: guides/git-wordpress/adding-media/
previousurl: guides/git-wordpress/create-site/
editpath: build-tools/03-parent-child-theme.md
---
Next, let’s install a theme. We could use the UI, exactly like we did with our plugins, but let’s assume you have a theme downloaded you want to use. In this example, I have saved the Bento theme to my desktop. Please do the same.

![Download Bento Theme](/source/docs/assets/images/guides/git-wordpress/download-bento.png)

Now let’s make sure we have our FTP client setup. In Transmit, click the “+” sign to add a new site. 

![New Transmit Site](/source/docs/assets/images/guides/git-wordpress/transmit-new-site.png)

Enter in the information found on the Pantheon dashboard’s connection settings:

![Pantheon SFTP Connection Settings](/source/docs/assets/images/guides/git-wordpress/sftp-connection.png)

And enter them in Transmit. Be sure to use the correct port number.

![Transmit SFTP Settings](/source/docs/assets/images/guides/git-wordpress/transmit-settings.png)

When you connect, you should see your entire directory tree. The WordPress code is located in the /code folder. Once in here, you can see that it looks like a typical WordPress installation.

![Transmit SFTP View](/source/docs/assets/images/guides/git-wordpress/transmit-ftp-view.png)

Navigate to code/wp-content/themes and now drag the Bento theme folder into here. You should see Transmit start uploading the code, and a notification should appear when completed:

![Upload Complete Notification](/source/docs/assets/images/guides/git-wordpress/transmit-upload-complete.png)

And you should see the new theme in the correct location:

![Uploaded Bento Theme](/source/docs/assets/images/guides/git-wordpress/bento-uploaded.png)

We want to use best practices, so we should create a child theme which will inherit all the features of the Bento theme we just downloaded, but allow us to safely customize without worrying that updates to the theme will break the site. To do this we will need to create some files and folders.

First we want to right click to open the dialog box directly in the Transmit theme directory and select “New Folder.” It can be named anything, in this example, it’s called “wp-git-demo-bento.” Transmit will create that folder remotely.

Within that new folder, right-click again and select “New File.” Name that file “style.css.”

Let’s add the code here to let WordPress know we are creating a child theme. You can choose the editor you prefer to open the file, or even select “Edit in Transmit” to use its built in editor. Then add this snippet of code:
```
/*
Theme Name:   WP-Git-Demo
Description:  A Bento-based child theme for demo purposes on Pantheon.
Author:       <Your Name>
Template:     bento
Version:      1.0.0
*/
```
Here is what it looks like in the Atom text editor.

![Atom Child Theme Code Snippet](/source/docs/assets/images/guides/git-wordpress/atom.png)

Now let’s create a second file called functions.php in the same folder as style.css. Add this block of code and save:
```
<?php

add_action( 'wp_enqueue_scripts', 'bento_child_enqueue_styles' );
function bento_child_enqueue_styles() {
	$parent_style = 'bento-theme-styles';
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}
```

Now we should have a working child theme. From the WordPress Dashboard, navigate to Appearance and you should see both your parent Bento theme and your child theme. Activate the child theme.
 
![Installed Chile theme](/source/docs/assets/images/guides/git-wordpress/all-installed-themes.png)

Now let’s make a few small changes to our theme. Add these CSS snippets into our style.css:

```
.site-content a:not(.button) {
    color: blue;
}

.site-header {
    background-color: grey;
}

```

If we save the file, it will be automatically uploaded. We can refresh and should see our changes. The title text is now blue and the header text is grey:

![Site with New CSS changes](/source/docs/assets/images/guides/git-wordpress/new-css.png)

Now let’s commit all these changes: the new Bento theme, our child theme folder, the required function.php file and the CSS changes.

We have now added code via the WordPress admin interface, and through an FTP client. Since we made commits as we went, that code is safe and secure. And it isn’t a lot of extra work. There are a few things to cover before you substitute “Amateur Cowboy Coder” for “Pantheon Power User and Professional WordPress Developer” on your business card.