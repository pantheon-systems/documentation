<?php
$csv = 'redirects.csv'; # header row, first column is old path, 2nd column is new path
$index ='index.php';

$row = 0;
$index_file = fopen($index, "w") or die("Unable to open $index");
fwrite($index_file, "<?php\n");
if (($handle = fopen($csv, "r")) !== FALSE) {
  while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
    $row++;
    if ($row > 1) {
$redirect = "if (strpos(\$_SERVER['REQUEST_URI'], '/customer/portal/articles/$data[0]') !== FALSE ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: /$data[1]'); exit();
}\n";
      fwrite($index_file, $redirect);
    }
  }
}

$categories_redirect = "if (strpos(\$_SERVER['REQUEST_URI'], 'customer/portal/topics') !== FALSE) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: /docs/articles'); exit();
}\n";

fwrite($index_file, $categories_redirect);

fclose($handle);
fclose($index_file);
