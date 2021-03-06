<?php

namespace Bundy\ShoesBundle\DependencyInjection\Services\Exception;

use Bundy\ShoesBundle\DependencyInjection\Services\Exception;

/**
 * Exception Marker
 *
 * @category Bundy
 * @package Bundy\ShoeBundle
 * @subpackage Bundy\ShoeBundle\DependencyInjection\Services
 * @author rbolton
 */
class InvalidArgumentException extends \InvalidArgumentException implements Exception
{

}