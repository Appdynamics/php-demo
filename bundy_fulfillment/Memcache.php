<?php

namespace BundyShoes\Cache;

/**
 * Memcache
 *
 * @category BundyShoes
 * @package BundyShoes\Cache
 * @author rbolton
 */
class Memcache implements Cache {

    /**
     * cache
     * 
     * @var Memcache
     */
    protected $cache;

    /**
     * Constructor
     * 
     * @param string $host
     * @param string $port
     * @throws Exception\RuntimeException
     * @return void
     */
    public function __construct($host, $port)
    {
        $this->cache = new \Memcached('mcConnection1');
        if (!count($this->cache->getServerList())) {
            $this->cache->addServer($host, $port);
        }
    }

    /**
     * Get item
     * 
     * @param string $name
     * @return mixed
     */
    public function get($name)
    {
        return $this->cache->get($name);
    }

    /**
     * 
     * @param string $name
     * @param mixed $value
     * @return boolean
     */
    public function put($name, $value)
    {
        return $this->cache->set($name, $value);
    }
}
