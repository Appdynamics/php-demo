<?php

namespace Bundy\ShoesBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="customer")
 */
class Customer
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    protected $firstName;

    /**
     * @ORM\Column(type="string", length=100)
     */
    protected $lastName;
    
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Customer
     */
    public function setFirstName($name)
    {
        $this->firstName = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set price
     *
     * @param string $price
     * @return Customer
     */
    public function setLastName($name)
    {
        $this->lastName = $name;
        return $this;
    }

    /**
     * Get last name
     *
     * @return string 
     */
    public function getLastName()
    {
        return $this->lastName;
    }
}