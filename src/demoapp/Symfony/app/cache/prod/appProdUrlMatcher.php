<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * appProdUrlMatcher
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appProdUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    /**
     * Constructor.
     */
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($pathinfo)
    {
        $allow = array();
        $pathinfo = rawurldecode($pathinfo);
        $context = $this->context;
        $request = $this->request;

        // bundy_shoes_homepage
        if (rtrim($pathinfo, '/') === '') {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', 'bundy_shoes_homepage');
            }

            return array (  '_controller' => 'Bundy\\ShoesBundle\\Controller\\DefaultController::indexAction',  '_route' => 'bundy_shoes_homepage',);
        }

        if (0 === strpos($pathinfo, '/product')) {
            // bundy_shoes_product_search
            if ($pathinfo === '/product/search') {
                return array (  '_controller' => 'Bundy\\ShoesBundle\\Controller\\ProductController::searchAction',  '_route' => 'bundy_shoes_product_search',);
            }

            // bundy_shoes_product_popular
            if ($pathinfo === '/product/popular') {
                return array (  '_controller' => 'Bundy\\ShoesBundle\\Controller\\ProductController::popularAction',  '_route' => 'bundy_shoes_product_popular',);
            }

            // bundy_shoes_product_view
            if (preg_match('#^/product/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'bundy_shoes_product_view')), array (  '_controller' => 'Bundy\\ShoesBundle\\Controller\\ProductController::viewAction',));
            }

            // bundy_shoes_product_list
            if ($pathinfo === '/product') {
                return array (  '_controller' => 'Bundy\\ShoesBundle\\Controller\\ProductController::listAction',  '_route' => 'bundy_shoes_product_list',);
            }

        }

        if (0 === strpos($pathinfo, '/cart')) {
            // bundy_shoes_cart
            if ($pathinfo === '/cart') {
                return array (  '_controller' => 'Bundy\\ShoesBundle\\Controller\\CartController::indexAction',  '_route' => 'bundy_shoes_cart',);
            }

            // bundy_shoes_cart_addToCart
            if ($pathinfo === '/cart/addToCart') {
                return array (  '_controller' => 'Bundy\\ShoesBundle\\Controller\\CartController::addToCartAction',  '_route' => 'bundy_shoes_cart_addToCart',);
            }

            // bundy_shoes_cart_checkout
            if ($pathinfo === '/cart/checkout') {
                return array (  '_controller' => 'Bundy\\ShoesBundle\\Controller\\CartController::checkoutAction',  '_route' => 'bundy_shoes_cart_checkout',);
            }

        }

        if (0 === strpos($pathinfo, '/BundyBackend')) {
            // bundy_shoes_mock_javasearch
            if ($pathinfo === '/BundyBackend/search') {
                return array (  '_controller' => 'Bundy\\ShoesBundle\\Controller\\MockController::searchAction',  '_route' => 'bundy_shoes_mock_javasearch',);
            }

            // bundy_shoes_mock_javainventory
            if ($pathinfo === '/BundyBackend/inventory') {
                return array (  '_controller' => 'Bundy\\ShoesBundle\\Controller\\MockController::searchAction',  '_route' => 'bundy_shoes_mock_javainventory',);
            }

        }

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}
