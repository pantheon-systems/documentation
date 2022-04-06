1. Review our documentation on [Git](/git), [Composer](/guides/composer), and [Terminus](/terminus), and have them installed and configured on your local computer. Pantheon requires Composer 2 at minimum.

   - Mac users can use [Homebrew](https://brew.sh/) to install Git, Composer, and PHP, along with their required dependencies. Note that Terminus 3 should be used for PHP versions 8.0 and up. Restart the shell or terminal environment after entering the following command:

    ```bash{promptUser:user}
    brew install git composer php
    ```

   - Windows users can install [Composer](https://getcomposer.org/doc/00-intro.md#installation-windows) and [Git](https://git-scm.com/download/win), and may need to install [XAMPP](https://www.apachefriends.org/index.html) or similar to satisfy some dependencies.

1. Install the [Terminus Site Clone](https://github.com/pantheon-systems/terminus-site-clone-plugin) plugin:

   ```bash
   terminus self:plugin:install pantheon-systems/terminus-site-clone-plugin
   ```

1. <Partial file="export-alias.md" />
