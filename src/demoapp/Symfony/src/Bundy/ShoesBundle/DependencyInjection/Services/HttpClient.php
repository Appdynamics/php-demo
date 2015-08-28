<?php

namespace Bundy\ShoesBundle\DependencyInjection\Services;

/**
 * Local HTTP Client
 * 
 * This is used to call local "services" with an external looking hostname
 * 
 * /etc/hosts file should be updated to point the hostname used in the url to
 * localhost. The http host header value is set to the hostname of this app
 * so this application can handle the request
 *
 * @category Bundy
 * @package Bundy\ShoesBundle
 * @subpackage Bundy\ShoesBundle\DependencyInjection\Services
 * @author rbolton
 */
class HttpClient {
    
    /**
     * destination
     * 
     * The host/IP address plus port of the downstream service 
     * 
     * @var string
     */
    protected $destination;
    
    /**
     * Host or IP address of destination
     * 
     * @var string
     */
    protected $hostOrIp;
    
    /**
     * Port
     * 
     * Port nmber on destination
     * 
     * @var string
     */
    protected $port;
    
    /**
     * hostnameOverride
     * 
     * This is used to put in host header in case you have virtual hosts set up
     * on destination (or local testing) and require host header to 
     * route the request properly. 
     * 
     * 
     * @var string
     */
    protected $hostnameOverride;
    
    
    /**
     * Constructor
     * 
     * @param string $hostOrIp host or IP address
     * @param string $port port on consumer
     * @param string $hostnameOverride used to set hostname header in HTTP
     * @throws Exception\InvalidArgumentException
     * @return void
     */
    
    public function __construct($hostOrIp, $port = 80, $hostnameOverride = null)
    {
        if (!is_string($hostOrIp)) {
            throw new Exception\InvalidArgumentException(sprintf('$hostname must be a string, you passed a %s', gettype($hostname)));
        }
 
        $this->hostOrIp = $hostOrIp;
        $this->port = $port;
        $this->destination = $this->hostOrIp . ":" .  $this->port;
        $this->hostnameOverride = $hostnameOverride;
    }
    

    
    /**
     * make the request
     * 
     * @param string $fullUrl
     * @return string
     * @throws Exception\InvalidArgumentException
     */
    public function makeRequest($path)
    {   
        $ch = curl_init('http://' . $this->destination . $path);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        if ($this->hostnameOverride) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Host: ' . $this->hostnameOverride
            ));
        }
        return curl_exec($ch);    
    }
    
    protected function checkUrl($fullUrl)
    {
        if (!is_string($fullUrl)) {
            throw new Exception\InvalidArgumentException(sprintf('$hostname must be a string, you passed a %s', gettype($fullUrl)));
        } else if (!filter_var($fullUrl, FILTER_VALIDATE_URL)) {
            throw new Exception\InvalidArgumentException(sprintf('The url (%s) you provided does not appear to be valid', $fullUrl));
        } else if (strpos($fullUrl, 'http://') === false && strpos($fullUrl, 'https://') === false) {
            throw new Exception\InvalidArgumentException(sprintf('The url (%s) you provided must start with http(s)://', $fullUrl));
        }
    }
}