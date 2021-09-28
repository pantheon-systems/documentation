<?php
if (!in_array($_SERVER['REQUEST_URI'], ['', '/', '/index.php'])) {
    http_response_code(404);
    echo file_get_contents('/404');
    die();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pantheon Docs Preview Environment</title>
</head>
<body>
Click <a href="/docs">here</a> to go to the docs preview environment.  
</body>
</html>