<?php

namespace BundyShoes\Controller;

class FrontController {
    
    protected $injectable = array();
    
    protected $router;
    
    public function __construct(Router $router)
    {
        $this->router = $router;
    }
    
    public function handleRequest($request)
    {
        $response = new Response();
        
        if (!$route = $this->router->determineController($request)) {
            throw new \Exception('Unable to determine route');
        }
        
        $controller = new $route['controller'];
        $this->inject($controller);
        $response->appendOutput($controller->{$route['method']}($request));
        
        echo $response;
    }
    
    public function setInjectable($name, $injectable)
    {
        $this->injectable[$name] = $injectable;
    }
    
    protected function inject($controller)
    {
        foreach ($this->injectable as $name => $value) {
            $controller->$name = $value;
        }
    }
}

?>
