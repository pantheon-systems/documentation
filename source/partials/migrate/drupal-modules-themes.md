If you have modules and themes that you would like to move to your new site, navigate to the Pantheon site directory and:

- Copy modules from the local directory of the old platform site:

    ```bash{promptUser: user}
    cp -R ../FORMER-PLATFORM/modules/custom web/modules
    git add web/modules/custom
    git commit -m "Copy custom modules"
    ```

- Copy themes from the local directory of the old platform site:

    ```bash{promptUser:user}
    cp -R ../FORMER-PLATFORM/themes/custom web/themes
    git add web/themes/custom
    git commit -m "Copy custom themes"
    ```

- Copy any other custom code you need from your old platform site.
