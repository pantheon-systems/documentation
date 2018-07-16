<?php

$buildScriptPath = '/documentation/bin/sculpin generate --env=dev';

$startPaths = [
    '/documentation/app/config/*',
    '/documentation/source/_docs/*',
    '/documentation/source/docs/assets/images/*',
];

$lastTime = time();

while (true) {
    $files = recursiveGlob($startPaths);

    foreach ($files as $file) {
        $time = filemtime($file);

        if ($time > $lastTime) {
            $lastTime = time();

            echo sprintf("%s was changed. Building...\n", $file);
            echo shell_exec($buildScriptPath)."\n";
            // echo shell_exec("mplayer /usr/share/sounds/gnome/default/alerts/drip.ogg </dev/null >/dev/null 2>&1 &")."\n"; //Written for Fedora/Gnome. Adjust for your local setup
        }
    }
    sleep(1);
}

function recursiveGlob(array $paths)
{
    $files = [];

    foreach ($paths as $path) {
        $files = array_merge($files, glob($path));

        foreach ($files as $file) {
            if (is_dir($file)) {
                $dirPath = $file.'/*';

                $dirFiles = recursiveGlob([$dirPath]);

                $files = array_merge($files, $dirFiles);
            }
        }
    }

    return $files;
}
