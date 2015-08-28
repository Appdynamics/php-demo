<?php

namespace BundyShoes\Database;

class Mysql {
    
    protected $mysqli;
    
    public function __construct($host, $user, $password, $database) {
        $this->mysqli = new \mysqli($host, $user, $password, $database);
    }
    
    public function query($query)
    {
        return $this->mysqli->query($query);
    }
}