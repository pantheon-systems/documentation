<?php
$csv = 'docs-2-redirects.csv'; # header row, first column is old path, 2nd column is new path
$index ='docs-2-index.php';

$row = 0;
$index_file = fopen($index, "w") or die("Unable to open $index");
fwrite($index_file, "<?php\n");
if (($handle = fopen($csv, "r")) !== FALSE) {
  while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
    $row++;
    if ($row > 1) {
$redirect = "if (strpos(\$_SERVER['REQUEST_URI'], '$data[0]') !== FALSE ) {
  helpdesk_redirect('$data[1]');
}\n";
      fwrite($index_file, $redirect);
    }
  }
}

fclose($handle);
fclose($index_file);
