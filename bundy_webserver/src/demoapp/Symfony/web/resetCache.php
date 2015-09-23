<?php

/***
 * Reset/Clear ZendOpcache
 * 
 * Scripts opcode are cached, so if you need to make changes in place,
 * you must reset cache in order for changes to appear
 */
opcache_reset();

?>