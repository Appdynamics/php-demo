<?php

namespace Bundy\ShoesBundle\DependencyInjection\Services;

/**
 * Config
 * 
 * This object used to trigger problems in application, store eum info, etc..
 *
 * @category Bundy
 * @package Bundy\ShoeBundle
 * @subpackage Bundy\ShoeBundle\DependencyInjection\Services
 * @author rbolton
 */
class Config {
    
    protected $defaultOptions = array(
        'transaction_slow' => true,
        'exception_thrown' => true,
        'php_error' => true,
        'eum_enabled' => true,
        'eum_key' => 'AD-AAB-AWM'
    );
    
    protected $options;
    
    public function __construct(array $options)
    {
        $mergedOptions = array_merge($this->defaultOptions, $options);
        $this->options = $mergedOptions;
    }
    
    public function isTransactionSlow()
    {
        return $this->options['transaction_slow'];
    }
    
    public function isExceptionThrown()
    {
        return $this->options['exception_thrown'];
    }
    
    public function isPHPErrorTriggered()
    {
        return $this->options['php_error'];
    }
    
    public function isEumEnabled()
    {
        return $this->options['eum_enabled'];
    }
    
    public function getEumKey()
    {
        return $this->options['eum_key'];
    }
}