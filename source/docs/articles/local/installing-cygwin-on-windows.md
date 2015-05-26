---
title: Installing Cygwin on Windows
description: Learn how to install and configure Cygwin.
category:
  - getting-started
keywords: cygwin, install, linux tool, windows
---
[Cygwin](http://cygwin.com/install.html) is a collection of tools which provide a Linux tools and utilities for Windows computers. If you do not have access to a Mac or Linux environment you can use Cygwin to generate the .key and .csr file that are needed to get a SSL certificate from a provider.

## Getting Started
Before you begin, you should be sure to take a look at the [Getting an SSL Cert](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication) documentation. Once you have one through the process of generating the command to get a valid CSR certificate for your domain, you can proceed with the rest of this tutorial.

## Download Cygwin
Get started by downloading the latest version of [Cygwin](http://cygwin.com/install.html) by going to the installer page.

## Install Cygwin
Start the Cygwin installer using setup.exe. If you already have Cygwin installed or you would like to add extra packages after you have the program running on your system you can simply click setup.exe and running through the installer again.<br />
 ![Start Cygwin Installer](/source/docs/assets/images/desk_images/40750.png)  

## Select the Cygwin Root
We have opted to the root directory directly inside the `C:\` directory. This will make it easier when we are trying to locate the CSR files we are going to generate later in the tutorial.<br />
 ![Cygwin Root install directory](/source/docs/assets/images/desk_images/40751.png)  

## Select the Package Directory
Once you have chosen the default directory to install Cygwin, you will also need to select a Local Package directory. In this case we are using the same directory as the Cygwin Root directory.<br />
 ![Cygwin Local package directory](/source/docs/assets/images/desk_images/40752.png)

## Choose Your Internet Connection
To download the necessary packages, the recommended settings for this is the "Direct Connection".<br />
 ![Cygwin Connection Type](/source/docs/assets/images/desk_images/40753.png)  

## Select a Download Site
Choose the nearest mirror site or most stable location. If for some reason the download does not work, you can always select another mirror.<br />
 ![Choose Cygwin mirror](/source/docs/assets/images/desk_images/40755.png)  

## Install the SSL Package
Start Cygwin and paste in the command that you got from the Wizard.<br />
 ![Select openSSL package](/source/docs/assets/images/desk_images/40768.png)  

## Generate the CSR
Once the installation is complete, you can run start a Cygwin terminal session. Here you can paste in the command you generated from the Wizard and get your private key and CSR certificate.<br />
 ![Generate the CSR with Cygwin](/source/docs/assets/images/desk_images/40769.png)

## Get the CSR Certificate
Finally, you can navigate to the home directory within Cygwin's root and get a copy of both your private key and CSR certificate.<br />
 ![CSR cert in windows](/source/docs/assets/images/desk_images/40770.png)  


## Complete the Installation
You can now navigate to the  [Getting an SSL Cert](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication#get-an-ssl-certificate) documentation where you can complete the rest of the installation process on Pantheon.
