1. Review our documentation on [Git](/git), [Composer](/composer), and [Terminus](/terminus), and have them installed and configured on your local computer. Pantheon requires Composer 2 at minimum.

   - Mac users can use [Homebrew](https://brew.sh/) to install Git, Composer, and PHP 7.4, along with their required dependencies. Restart the shell or terminal environment after entering the following command:

    ```bash{promptUser:user}
    brew install git composer php@7.4
    ```

   - Windows users can install [Composer](https://getcomposer.org/doc/00-intro.md#installation-windows) and [Git](https://git-scm.com/download/win), and may need to install [XAMPP](https://www.apachefriends.org/index.html) or similar to satisfy some dependencies.

1. Install the [Terminus Site Clone](https://github.com/pantheon-systems/terminus-site-clone-plugin) plugin.

1. This guide uses several commands that depend on the site name in the local command line environment.

  To make this easier, set the temporary variable `$SITE` in your terminal session to match the site name. Read the steps further in this doc to see which sites should be aliased (it may be more than one), then replace `anita-drupal` in this example:

   ```bash{promptUser:user}
   export SITE=anita-drupal && echo "New alias set as $SITE"
   ```

   <Accordion title="How to Use Terminus to Find the Site Name" id="site-name" icon="info-sign">

   Use `terminus site:list` for a list of sites you have access to:

    ```bash{outputLines:2-6}
    terminus site:list
    --------------------------- --------------------- ------------- ------------------- ---------------- -------------------- --------------------- ------------- ------------
    Name                        ID                    Plan          Framework           Region           Owner                Created               Memberships   Is Frozen?
    --------------------------- --------------------- ------------- ------------------- ---------------- -------------------- --------------------- ------------- ------------
    anita-drupal                abdc80ce-286c-1234-   Sandbox       drupal8             Canada           3374708c-987e-1234   2020-12-15 19:40:42   d3ecc20c-395a false
    anita-wordpres              abdc9954-fab2-1234-   Sandbox       wordpress           United States    c96ddb25-336a-1234   2020-09-02 07:18:51   d3ecc20c-395a false
    ```

    The site name is listed under `Name`. In this example, `anita-drupal`.

   </Accordion>
