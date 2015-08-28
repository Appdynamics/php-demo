<?php

namespace Bundy\ShoesBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        $cache = $this->get('bundy_shoes.cache');
        
                //get 10 products
        if (!$products = $cache->get('latestProducts')) {
            $products = $this->getDoctrine()
            ->getRepository('BundyShoesBundle:Product')
            ->findBy(array(), null, 10);
            $cache->put('latestProducts', $products);
        }
        
        return $this->render('BundyShoesBundle:Default:index.html.php', array('name' => 'FooBar', 'products' => $products, 'items' => array()));
    }
}
