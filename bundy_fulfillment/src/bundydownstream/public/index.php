<?php

/**
 * This is a really simple application and could be 20 lines in one script
 * ,but there is a bunch of extra code to make the callgraph look interesting...
 * 
 * ../config/main.yml has everything you would want to change
 */


function __autoload($className) {
    include ('../library/' . str_replace('\\', "/", $className) . '.php');
}

ini_set('display_errors', '1');

$yaml = new Symfony\Component\Yaml\Parser();
$config = $yaml->parse(file_get_contents('../config/main.yml'));

$dbCRM = new BundyShoes\Database\Mysql($config['crm_host'], $config['crm_user'], $config['crm_password'], $config['crm_database']);
$dbFullfillment = new \PDO('mysql:host='.$config['fullfillment_host'].';dbname=' . $config['fullfillment_database'] . ';charset=UTF8', $config['fullfillment_user'], $config['fullfillment_password']);
$cache = new BundyShoes\Cache\Memcache($config['cache_host'], $config['cache_port']);
$router = new BundyShoes\Controller\Router($config['routes']);

$frontController = new \BundyShoes\Controller\FrontController($router);
$frontController->setInjectable('dbCRM', $dbCRM);
$frontController->setInjectable('dbFullfillment', $dbFullfillment);
$frontController->setInjectable('cache', $cache);
$frontController->setInjectable('c_exit', $config['c_exit']);
$frontController->setInjectable('c_host', $config['c_host']);
$frontController->setInjectable('c_port', $config['c_port']);

try {
    $frontController->handleRequest($_REQUEST);
} catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
}
