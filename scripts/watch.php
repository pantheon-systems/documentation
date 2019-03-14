<?php

$buildScriptPath = '/documentation/bin/sculpin generate --env=dev';

$startPaths = [
    '/documentation/app/config/*',
    '/documentation/source/_docs/*',
    '/documentation/source/docs/assets/images/*',
    '/documentation/source/_changelogs/*',
    '/documentation/source/_partials/*',
    '/documentation/source/_views/*',
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
