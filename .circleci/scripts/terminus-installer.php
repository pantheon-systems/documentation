<?php

/* Terminus Installer Script
Created by Alex Fornuto - alex@fornuto.com
*/

// Define environment variables.
$pathUpdated = false;
$paths = explode(":", getenv('PATH'));             // Creates an array with all paths in $PATH
$installdir = ("/usr/local/bin");                  // Creates a string with the desired installation path
$rcfiles = array(                                  // Array of common .rc files to look for.
  ".bashrc",
  ".zshrc",
  ".config/fish/config.fish",
  ".profile",
);
$package = "terminus";

// Function to download Terminus executable file from GitHub to /tmp/ then move it to $installdir
// prompts for sudo if required.
function downloadTerminus($installdir, $package)
{
    // $opts defines values required by the GitHub API to respond correctly. $context formats them for use.
    $opts = [
            'http' => [
              'method' => 'GET',
              'header' => [
                'User-Agent: PHP'
              ]
            ]
    ];
    $context  = stream_context_create($opts);
    $releases = file_get_contents("https://api.github.com/repos/pantheon-systems/" . $package . "/releases", false, $context);
    $releases = json_decode($releases);
    $version  = $releases[0]->tag_name;
    $url      = $releases[0]->assets[0]->browser_download_url;
    // Do the needful
    echo("\nDownloading Terminus " . $version . " from " . $url . " to /tmp \n");
    $couldDownload = file_put_contents("/tmp/" . $package . ".phar", file_get_contents($url));
    echo("Moving to " . $installdir . "...\n");
    exec("sudo chown -R $USER:$USER /usr/local/bin/");
    if(!rename("/tmp/" . $package . ".phar", $installdir . "/" . $package)){
        echo("\n" . $installdir . " requires admin rights to write to...\n");
        exec("sudo mv /tmp/" . $package . ".phar " . $installdir . "/" . $package);
        echo("\n");
    }
    // Return true if successful
    $couldMove = exec("ls " . $installdir . "/" . $package, $output, $couldMove);
    return $couldMove;
}


// Function to add to any common shell configuration files a line to amend $PATH with  $installdir.
function ammendPath($rcfile, $installdir, &$pathUpdated)
{
    $pathUpdated = file_put_contents(getenv('HOME') . "/$rcfile", "# Adds Terminus to \$PATH\nPATH=\$PATH:" . $installdir . "\n\n", FILE_APPEND | LOCK_EX);
    if (!$pathUpdated) {
        throw new Exception($rcfile . " found, but unable to write to it.");
    }

    return $pathUpdated;
}

// Function to determine if ~/.terminus/bin is already in $PATH
function checkpath($paths, $installdir)
{

    return in_array($installdir, $paths);
}

// BEGIN ACTUAL DOING OF THINGS!

//Makes ~/.terminus/bin if it doesn't exist.
if (!file_exists($installdir)) {
    echo("Creating " . $installdir . "/\n");
    mkdir($installdir, 0700, true);
}

//Download terminus.phar
if (downloadTerminus($installdir, $package)) {
    echo("Installed to " . $installdir . "\n\n");
} else {
    exit("Download unsuccessful.\n\n");
}

// Make Terminus executable
echo("Making Terminus executable... ");
chmod($installdir . "/" . $package, 0755)
or exit("\nUnable to set Terminus as executable.\n");
echo("Done.\n\n");

// If $installdir isn't in path, add it.
if (checkpath($paths, $installdir) === false) {
    foreach ($rcfiles as $rcfile) {
        if (file_exists(getenv('HOME') . "/$rcfile") && is_writable(getenv('HOME') . "/$rcfile")) {
            ammendpath($rcfile, $installdir, $pathUpdated);
            echo("Found " . $rcfile . " and added " . $installdir .
            " to your \$PATH.\nIn order to run Terminus, you must first run:\n\nsource ~/" . $rcfile . "\n");
        }
    }
    if (!$pathUpdated) {
        echo("Terminus has been installed to " . $installdir .
        " But no suitable configuration file was found to update \$PATH.\n\nYou must manually add " . $installdir .
        " to your PATH, or execute Terminus from the full path.\n\n");
    }
}
exit();
