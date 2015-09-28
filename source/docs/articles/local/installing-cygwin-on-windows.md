---
title: Installing Cygwin on Windows
description: Learn how to install and configure Cygwin for Windows computers for Pantheon sites.
category:
  - getting-started
keywords: cygwin, install, linux tool, windows
---
[Cygwin](http://cygwin.com/install.html) is a collection of tools which provide Linux tools and utilities for Windows computers. If you do not have access to a Mac or Linux environment, you can use Cygwin to generate the .key and .csr file that are needed to get a SSL certificate from a provider.

## Getting Started
Before you begin, take a look at the [HTTPS documentation](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication). Once you have gone through the process of generating the command to get a valid CSR certificate for your domain, you can continue on to the steps below.

## Download and Install Cygwin
Download the latest version of [Cygwin](http://cygwin.com/install.html) by going to the installer page.

Start the Cygwin installer using setup.exe. If you already have Cygwin installed or you would like to add extra packages after you have the program running on your system, you can click setup.exe and run through the installer again.<br />

### Select the Cygwin Root
Putting the root directory directly inside the `C:\` directory makes it easier when trying to locate the CSR files.

### Select the Package Directory
Once you have chosen the default directory to install Cygwin, select a Local Package directory. You can use the same directory as the Cygwin Root directory.

### Choose Your Internet Connection
Download the necessary packages by selecting "Direct Connection".<br />

### Select a Download Site
Choose the nearest mirror site or most stable location. If for some reason the download does not work, you can always select another mirror.  

### Install the HTTPS Package
Start Cygwin and paste in the command that you got from the wizard.  

### Generate the CSR
Once the installation is complete, start a Cygwin terminal session. Here you can paste in the command you generated from the wizard and get your private key and CSR certificate.

### Get the CSR Certificate
Finally, you can navigate to the home directory within Cygwin's root and get a copy of both your private key and CSR certificate.

See [Enable Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication#get-an-ssl-certificate) to complete the rest of the installation process on Pantheon.
