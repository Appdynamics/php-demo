<?php

namespace Bundy\ShoesBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Bundy\ShoesBundle\Entity\Product;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductController extends Controller
{
    public function viewAction($id)
    {
        $product = $this->getDoctrine()
        ->getRepository('BundyShoesBundle:Product')
        ->find($id);

        if (!$product) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }
        
        return $this->render('BundyShoesBundle:Product:view.html.php', array('product' => $product));
    }
    
    /**
     * List products
     * 
     * We call a non-existent function, and have to set an error handler,
     * otherwise Symfony will trigger an exception.
     * 
     * @return string
     */
    public function listAction()
    {   
        $config = $this->get('bundy_shoes.config');
        $rand = mt_rand(1, 100);
        
        if ($rand < 6 && $config->isPHPErrorTriggered()) {
            set_error_handler(function($errno, $errstr) {
                echo $errstr;
            });
            $var = getProductList();
        }
        
        $products = $this->getDoctrine()
        ->getRepository('BundyShoesBundle:Product')
        ->findBy(array(), null, 10);
        
        return $this->render('BundyShoesBundle:Product:list.html.php', array('products' => $products));
    }
    
    /**
     * Search product by name
     * 
     * This will throw an exception ~5% of requests
     * 
     * @return string
     * @throws \Exception
     */
    public function searchAction()
    {
        if (!isset($_REQUEST['product']) || !is_string($_REQUEST['product'])) {
            $name = 'Product 1'; 
        } else {
            $name = $_REQUEST['product'];
        }
        
        $javaService = $this->get('bundy_shoes.javaService');
        $remoteResponse = $javaService->makeRequest('/BundyBackend/search');
        
        return $this->render('BundyShoesBundle:Product:search.html.php', array('products' => array()));
    }
    
    /**
     * Pull popular items
     * 
     * ~5% of requests will throw an error
     * 
     * Used as AJAX request by application homepage
     */
    public function popularAction()
    {
        $config = $this->get('bundy_shoes.config');
        
        $rand = mt_rand(1, 100);
        $id = 1;
        
        if ($rand < 6 && $config->isExceptionThrown()) {
            throw new \Exception('Popular item could not be found');
        } else {
            $product = $this->getDoctrine()
            ->getRepository('BundyShoesBundle:Product')
            ->find($id);
        }

        return new JsonResponse($product);
    }
}
