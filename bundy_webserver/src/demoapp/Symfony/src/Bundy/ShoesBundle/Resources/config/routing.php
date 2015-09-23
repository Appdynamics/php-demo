<?php

use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Routing\Route;

$collection = new RouteCollection();

$collection->add('bundy_shoes_homepage', new Route('/', array(
    '_controller' => 'BundyShoesBundle:Default:index',
)));

$collection->add('bundy_shoes_product_search', new Route('/product/search', array(
    '_controller' => 'BundyShoesBundle:Product:search',
)));

$collection->add('bundy_shoes_product_popular', new Route('/product/popular', array(
    '_controller' => 'BundyShoesBundle:Product:popular',
)));

$collection->add('bundy_shoes_product_view', new Route('/product/{id}', array(
    '_controller' => 'BundyShoesBundle:Product:view',
)));

$collection->add('bundy_shoes_product_list', new Route('/product', array(
    '_controller' => 'BundyShoesBundle:Product:list',
)));

$collection->add('bundy_shoes_cart', new Route('/cart', array(
    '_controller' => 'BundyShoesBundle:Cart:index',
)));

$collection->add('bundy_shoes_cart_addToCart', new Route('/cart/addToCart', array(
    '_controller' => 'BundyShoesBundle:Cart:addToCart',
)));
$collection->add('bundy_shoes_cart_checkout', new Route('/cart/checkout', array(
    '_controller' => 'BundyShoesBundle:Cart:checkout',
)));

$collection->add('bundy_shoes_mock_javasearch', new Route('/BundyBackend/search', array(
    '_controller' => 'BundyShoesBundle:Mock:search',
)));

$collection->add('bundy_shoes_mock_javainventory', new Route('/BundyBackend/inventory', array(
    '_controller' => 'BundyShoesBundle:Mock:search',
)));

return $collection;
