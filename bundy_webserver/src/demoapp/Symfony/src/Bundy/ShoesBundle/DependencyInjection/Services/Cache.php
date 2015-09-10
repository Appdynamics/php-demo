<?php

namespace Bundy\ShoesBundle\DependencyInjection\Services;

/**
 * Cache Interface
 *
 * @category Bundy
 * @package Bundy\ShoeBundle
 * @subpackage Bundy\ShoeBundle\DependencyInjection\Services
 * @author rbolton
 */
interface Cache {
    
    /**
     * Get item
     * 
     * @param string $name
     * @return mixed
     */
    public function get($name);
    
    /**
     * 
     * @param string $name
     * @param mixed $value
     * @return boolean
     */
    public function put($name, $value);
}