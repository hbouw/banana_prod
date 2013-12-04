<?php

error_reporting(0);


    $url = $_REQUEST["url"];

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
	
	// If it's a POST, put the POST data in the body
	if ($_POST['request']) {
		$postvars = '';
		while ($element = current($_POST)) {
			$postvars .= urlencode(key($_POST)).'='.urlencode($element).'&';
			next($_POST);
		}
		curl_setopt ($curl, CURLOPT_POST, true);
		curl_setopt ($curl, CURLOPT_POSTFIELDS, $postvars);
	}
	
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'POST HTTP/1.0',
            'Content-type: text/xml;charset="UTF-8"',
            'Accept: text/xml',
            'Cache-Control: no-cache',
            'Pragma: no-cache'
        ));
    $theData = curl_exec($curl);
    curl_close($curl);

    echo $theData;

?>