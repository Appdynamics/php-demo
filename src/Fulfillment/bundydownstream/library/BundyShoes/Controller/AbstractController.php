<?php

namespace BundyShoes\Controller;

abstract class AbstractController {
    
    public function inject($name, $injectable)
    {
        if (!property_exists($this, $name)) {
            return false;
        }
        
        $this->$name = $injectable;
        return true;
    }
}

?>
