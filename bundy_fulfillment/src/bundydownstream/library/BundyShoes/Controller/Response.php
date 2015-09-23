<?php

namespace BundyShoes\Controller;

class Response {
    
    protected $output = '';
    
    public function appendOutput($output)
    {
        $this->output .= $output;
    }
    
    public function __toString() {
        return $this->output;
    }
}

?>
