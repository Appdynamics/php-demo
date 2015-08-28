#!/usr/bin/php
<?php 

if (strpos(gethostname(), 'rbolt') !== FALSE) {
    $baseSymfony = '/Users/rbolton/Sites/bundyshoes';
} else {
    $baseSymfony = '/var/www/html/demoapp';
}

require($baseSymfony . '/Symfony/vendor/symfony/symfony/src/Symfony/Component/Yaml/Parser.php');
require($baseSymfony . '/Symfony/vendor/symfony/symfony/src/Symfony/Component/Yaml/Inline.php');
use Symfony\Component\Yaml\Parser;

$yaml = new Parser();
$value = $yaml->parse(file_get_contents($baseSymfony . '/Symfony/app/config/parameters.yml'));

$dbHost = $value['parameters']['database_host'];
$dbUser = $value['parameters']['database_user'];
$dbPassword = $value['parameters']['database_password'];
$dbName = $value['parameters']['database_name'];

$mysqli = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
}

$mysqli->query("DELETE FROM Cart");

echo "Done\n";
?>