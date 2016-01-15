<?php

namespace BundyShoes\Controller;

class OrderController extends AbstractController {
    
    public $dbCRM;
    
    public $dbFullfillment;
    
    public $cache;

    public $c_exit;

    public $c_host;

    public $c_port;
    
    public function processOrder($request)
    {
        
		if ($this->c_exit == 'yes') {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $this->c_host . ':' . $this->c_port);
            curl_setopt($ch, CURLOPT_HEADER, $this->c_port);
            if (!$result = curl_exec($ch)) {
                echo 'Curl error : ' . curl_error($ch);
            }
            curl_close($ch);
        }

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
