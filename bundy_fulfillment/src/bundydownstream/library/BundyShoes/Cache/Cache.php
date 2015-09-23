<?php

namespace BundyShoes\Cache;

/**
 * Cache Interface
 *
 * @category BundyShoes
 * @package BundyShoes\Cache
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