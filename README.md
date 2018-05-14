[![Circle CI](https://circleci.com/gh/pantheon-systems/documentation.svg?style=svg)](https://circleci.com/gh/pantheon-systems/documentation)
Pantheon Documentation
======================
https://pantheon.io/docs/

This repository contains the [Pantheon](https://pantheon.io) documentation, as well as the tools to build local test environmnets.

### Contributing

Our docs are written in [PHP Markdown](), and live in `source/_docs`. Read [CONTRIBUTING.md](<CONTRIBUTING.md>) for more details on contributing
documentation improvements.

### Style Guide

Read [style-guide.md](<style-guide.md>) for our guidelines on how to write
documentation.

### Get the Code
Fork and clone this repository. Issue pull requests per document.

## Local Setup (Optional)

If you would like to develop documentation locally and see your work, we offer a Docker containerized solution.

**Prerequisites**

 - MacOS or Linux system (untested on Bash on Windows)
 - Docker

1. Clone the repository to your project directory:

    ```bash
    cd ~/projects
    git clone https://github.com/pantheon-systems/documentation.git

    OR

    git@github.com:pantheon-systems/documentation.git
    ```

2. Pull the Docker image:

    ```bash
    docker image pull pantheonsystems/documentation
    ```

3. From the project root, run the `runthedocs.sh` script:

    ```bash
    cd documentation
    ./runthedocs.sh
    ```

    **Note::** This will occupy the terminal in which you invoke the script, providing output when files are changed or loaded. Use **CTRL** + **C** to exit.

    The Docker image will mount the `source` directory from the project root, and rebuild when you save changes.

4. When you're done, run:

    ```bash
    docker container stop pantheon-docs
    ```
