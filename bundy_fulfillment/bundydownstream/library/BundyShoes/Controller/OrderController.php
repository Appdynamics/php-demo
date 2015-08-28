<?php

namespace BundyShoes\Controller;

class OrderController extends AbstractController {
    
    public $dbCRM;
    
    public $dbFullfillment;
    
    public $cache;
    
    public function processOrder($request)
    {
        
        $this->cache->get('orderNumber');
        
        $this->dbFullfillment->query("SELECT * FROM request LIMIT 1");
        
        $slow = (isset($request['on']) && $request['on'] == 'yes') ? true : false;
        $rand = mt_rand(1, 100);
        $response = "Slow : " . (int)$slow . ", Rand : $rand<br />\n";
        
        if ($rand < 6 && $slow) {
            if (!$this->dbCRM->query("call CRM.get_frequent_customer(1,@fn,@ln)")) {
                $response .= "CALL failed: (" . $mysqli->errno . ") " . $mysqli->error;
            } else {
                $response .= 'Slow sproc executed';
            }
        } else {
            if (!$this->dbCRM->query("call CRM.get_customer()")) {
                $response .= "CALL failed: (" . $mysqli->errno . ") " . $mysqli->error;
            } else {
                $response .= 'Normal sproc executed';
            }
        }
        return $response;
    }
}