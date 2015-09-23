<?php

namespace BundyShoes\Controller;

class Router {
    
    protected $routes = array();
    
    public function __construct(array $routes)
    {
        $this->routes = $routes;
    }
    
    public function determineController($request)
    {
        if (!array_key_exists('param', $request)) {
            if (array_key_exists('__index', $this->routes)) {
                return $this->generateRoute($this->routes['__index']);
            }
            return false;
        }

        $routeKey = $request['param'];
        if (!array_key_exists($routeKey, $this->routes)) {
            return false;
        }
        
        return $this->generateRoute($this->routes[$routeKey]);
    }
    
    protected function generateRoute($route)
    {
        $info = explode('::', $route);
        return array(
            'controller' => $info[0],
            'method' => $info[1]
        );
    }
}

?>
