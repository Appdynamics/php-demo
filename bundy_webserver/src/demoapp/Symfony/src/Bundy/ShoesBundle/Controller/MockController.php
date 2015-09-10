<?php

namespace Bundy\ShoesBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class MockController extends Controller
{
    /**
     * Search action
     * 
     * Used for local testing when java backend instance is not available
     * 
     * @return void
     */
    public function searchAction()
    {
        die('search called');
    }
    
    /**
     * Inventory action
     * 
     * Used for local testing when java backend instance is not available
     * 
     * @return void
     */
    public function inventoryAction()
    {
        die('inventory called');
    }
}