<?php

namespace Bundy\ShoesBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Bundy\ShoesBundle\Entity\Product;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\Query\ResultSetMapping;

class CartController extends Controller
{
    /**
     * View cart
     * 
     * @return string
     */
    public function indexAction()
    {
        return $this->render('BundyShoesBundle:Cart:index.html.php', array(
            'items' => $this->getCartItems()
        ));
    }
    
    /**
     * Add to cart
     * 
     * This is a simple bt, with two database queries, 
     * one insert and one select
     * 
     * @return string
     * @throws \Exception
     */
    public function addToCartAction()
    {
        $session = $this->get('bundy_shoes.session');
        $session->start();
        
        if (!isset($_REQUEST['productId']) || !is_numeric($_REQUEST['productId'])) {
            throw new \Exception('A productId must be passed in via post or get');
        }
        
        $product = $this->getDoctrine()
            ->getRepository('BundyShoesBundle:Product')
            ->find($_REQUEST['productId']);
        
        $item = new \Bundy\ShoesBundle\Entity\CartItem;
        $item->setProduct($product);
        $item->setSessionId($session->getId());
        
        $em = $this->getDoctrine()->getManager('default');
        $em->persist($item);
        $em->flush();
        
        return $this->render('BundyShoesBundle:Cart:index.html.php', 
            array('items' => $this->getCartItems())
        );
    }
    
    /**
     * Checkout
     * 
     * Complicated bt, with 3rd party requests, cache gets, and multiple database
     * queries. Slow SQL query is executed on downstream PHP tier, and
     * this tier passes slow parameter to downstream.
     * 
     * 
     * @return string
     */
    public function checkoutAction()
    {   
        $config = $this->get('bundy_shoes.config');
        
        $cache = $this->get('bundy_shoes.cache');
        $cache->get('someValue');
        $cache->get('someOtherValue');
        
        $em = $this->getDoctrine()->getManager('default');
        foreach ($this->getCartItems() as $item) {
            $em->remove($item);
        }
        $em->flush();
        
        $slow = $config->isTransactionSlow() ? 'yes' : 'no';
        $phpService = $this->get('bundy_shoes.phpService');
        $phpResponse = $phpService->makeRequest('/order?on=' . $slow);
        
        $fem = $this->getDoctrine()->getManager('fullfillment');
        $orderRequest = $fem->getRepository('BundyShoesBundle:Fullfillment')->find(1);
        
        $fedexService = $this->get('bundy_shoes.fedexService');
        $fedexResponse = $fedexService->makeRequest('/marketing-fedex.php');
        
        
        $visaService = $this->get('bundy_shoes.visaService');
        $visaResponse = $visaService->makeRequest('/marketing-visa.php');
        
        $javaService = $this->get('bundy_shoes.javaService');
        $remoteResponse = $javaService->makeRequest('/BundyBackend/inventory');
        
        return $this->render('BundyShoesBundle:Cart:checkout.html.php', array());
    }
    
    /**
     * Get cart items
     * 
     * Select cart items from database based on sessionId
     * 
     * @return array
     */
    protected function getCartItems()
    {
        $session = $this->get('bundy_shoes.session');
        $session->start();
        
        return $this->getDoctrine()
            ->getRepository('BundyShoesBundle:CartItem')
            ->findBy(array('sessionId' => $session->getId()));
    }
}