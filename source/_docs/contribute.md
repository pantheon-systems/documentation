---
title: Contributing to Pantheon Docs
description: Learn how you can contribute to the Pantheon open-source documentation project on GitHub.
---
Become one of our [contributors](/docs/contributors)! Help us create relevant and useful content for developers like yourself. See something you'd like to add or change? We love pull requests!

Get involved by:

- Reporting a doc issue
- Improving existing content
- Suggesting new docs
- Commenting on work in progress

## Edit Directly on GitHub

- See an issue with a doc? Click **Contribute** within the doc and select **Report Doc Issue**.
- Want to improve a doc? Click **Contribute** within the doc and select **Edit this page**.
- Have an idea for a new doc? [Suggest new content](https://github.com/pantheon-systems/documentation/issues/new?title=New%20Doc%20Proposal%20&body=Priority%20(Low‚%20Medium‚%20High)%3A%0A%0A%23%23%20Title%0A%0A%0A%23%23%20Description%0A%0A%0A%23%23%20Outline%0A%0A%0A%23%23%20Expected%20Audience%0A%0A%0A%23%23%20Path%0A(e.g.%20%60source%2Fdocs%2Farticles%2Fsites%2Fcode%60%20or%20%60source%2Fdocs%2Farticles%2Fwordpress%60)&labels=new%20doc) by opening an issue.
- Want to provide more insight to an [existing PR](https://github.com/pantheon-systems/documentation/pulls)? Add your comments.

## Edit and Build Locally

If you would like to work on documentation locally and see your work, we offer a Docker containerized solution.

### Prerequisites

 - MacOS or Linux system (untested on Bash on Windows)
 - Docker

### Install

1. Clone the repository to your project directory:

    ```bash
    cd ~/projects
    git clone https://github.com/pantheon-systems/documentation.git

    OR

    git clone git@github.com:pantheon-systems/documentation.git
    ```

1. Pull the Docker image:

    ```bash
    docker image pull pantheonsystems/documentation
    ```

### Run

1. From the project root, execute the `runthedocs.sh` script:

    ```bash
    cd documentation
    ./runthedocs.sh
    ```

    **Note::** This will occupy the terminal in which you invoke the script, providing output when files are changed or loaded. Use **CTRL** + **C** to exit.

    You should see:

    ```bash
    Creating the Docker container...
    Container built and running. 👍👍
    Building the latest docs...
    Detected new or updated files
    Generating: 100% (1035 sources / 0.06 seconds)
    Converting: 100% (1122 sources / 8.04 seconds)
    Formatting: 100% (1122 sources / 2.73 seconds)
    Processing completed in 12.20 seconds
    Running "watch" task
    Waiting...
    ```

    Once running, you can view the local dev environment by visiting `http://localhost:8000/docs` in your browser.

    The Docker image will mount the `source` directory from the project root on your computer, and rebuild when you save changes:

    ```bash
    /documentation/source/_docs/getting-support.md was changed. Building...
    Detected new or updated files
    Generating: 100% (1035 sources / 0.04 seconds)
    Converting: 100% (1122 sources / 5.73 seconds)
    Formatting: 100% (1122 sources / 2.01 seconds)
    Processing completed in 9.05 seconds
    ```

1. When you're done, run:

    ```bash
    docker container stop pantheon-docs
    ```

### Update The Docs

The `pantheon-docs` container mounts the `documentation/source` directory from your computer, so the image remains evergreen as long as the toolset is unchanged. To update your local project with the latest version of the docs, you need only pull them from git:

```bash
git pull origin
```

### Update The App



1. To update the documentation build locally run:

    ```bash
    ./updater.sh
    ```

### Testing

We include several tools to test that new content doesn't break the documentation. Most of these tests are performed automatically by our continuous integration service, but pull requests created from external contributors aren't included in CI tests. If you want to manually test your branch, you can execute the following tests within the Docker container.

#### Merge Conflicts

To check for merge conflict messages accidentally commited into the docs, run the `merge_conflicts.sh` script:

```bash
docker exec pantheon-docs scripts/merge_conflicts.sh
Merge conflict:pass
```
#### [HTMLProofer](https://github.com/gjtorikian/html-proofer)

To make sure all relative links (like `/docs/support/`) are correct, run

```bash
docker exec pantheon-docs htmlproofer --assume-extension  ./output_dev/ --disable-external true
```

#### [A11y](https://github.com/addyosmani/a11y)

We use grunt to manage accessibility tests:

```bash
docker exec pantheon-docs node_modules/.bin/grunt test
Running "a11y:dev" (a11y) task

Done, without errors.
```

#### [Wraith](https://github.com/BBC-News/wraith)

Checks for visual regression:

```bash
docker exec pantheon-docs wraith capture wraith.yaml
```

#### [Behat](https://github.com/Behat/Behat)

```bash
docker exec pantheon-docs bin/behat
```


## Code of Conduct

Pantheon is dedicated to a positive and harassment-free community experience for everyone. [See our full code of conduct](/docs/code-of-conduct) for details, including how to report abuse.
