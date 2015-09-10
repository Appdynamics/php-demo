<?php

use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\DependencyInjection\Parameter;

$container->setDefinition(
    'bundy_shoes.javaService', new Definition(
        'Bundy\ShoesBundle\DependencyInjection\Services\HttpClient',
        array(
            '%java_host%',
            '%java_port%',
            '%java_hostname%'
        )
    )
);


$container->setDefinition(
    'bundy_shoes.fedexService', new Definition(
        'Bundy\ShoesBundle\DependencyInjection\Services\HttpClient',
        array(
            '%fedex_host%',
            '%fedex_port%',
            '%fedex_hostname%'
        )
    )
);

$container->setDefinition(
    'bundy_shoes.visaService', new Definition(
        'Bundy\ShoesBundle\DependencyInjection\Services\HttpClient',
        array(
            '%visa_host%',
            '%visa_port%',
            '%visa_hostname%'
        )
    )
);

$container->setDefinition(
    'bundy_shoes.phpService', new Definition(
        'Bundy\ShoesBundle\DependencyInjection\Services\HttpClient',
        array(
            '%php_host%',
            '%php_port%',
            '%php_hostname%'
        )
    )
);

$container->setDefinition(
    'bundy_shoes.cache', new Definition(
        'Bundy\ShoesBundle\DependencyInjection\Services\Memcache',
        array(
            '%cache_host%',
            '%cache_port%'
        )
    )
);

$container->setDefinition(
    'bundy_shoes.config', new Definition(
        'Bundy\ShoesBundle\DependencyInjection\Services\Config',
        array(
            '%config%'
        )
    )
);

$container->setDefinition(
    'bundy_shoes.session', new Definition(
        'Symfony\Component\HttpFoundation\Session\Session'
    )
);