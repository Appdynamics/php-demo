<?php

namespace Bundy\ShoesBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="cart")
 */
class CartItem
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Product")
     */
    protected $product;
    
    /**
     * @ORM\Column(type="integer")
     */
    protected $sessionId;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    public function setProduct($product)
    {
        $this->product = $product;
    }
    
    public function getProduct()
    {
        return $this->product;
    }
    
    public function setSessionId($id)
    {
        $this->sessionId = $id;
    }
    
    public function getSessionId()
    {
        return $this->sessionId;
    }
}