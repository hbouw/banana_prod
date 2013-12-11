<?php
// 
$password= $_POST["password"];
$username= $_POST["username"];
$url= $_POST["url"];


$data = array('username' => $username, 'password' => $password);

// 
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, curlopt_followlocation, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "username=" .$username ."&password=" .$password );
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$header = curl_getinfo ( $ch );
curl_close($ch);


$gs_response = $header ["redirect_url"];
if (strpos( $gs_response, "error=true") !== false ) {
$result = false ;
} else {
$result = true ;
}
$output = array();
if ( $result ) {
echo "{\"login\":\"true\"}";
} else  {
echo "{\"login\":\"false\"}";
}








/*
$r = new HttpRequest('http://example.com/form.php', HttpRequest::METH_POST);
$r->setOptions(array('cookies' => array('lang' => 'de')));
$r->addPostFields(array('password' => $password, '$username' => $username );
try {
    echo $r->send()->getBody();
} catch (HttpException $ex) {
    echo $ex;
}





/*
$process = curl_init($url);
curl_setopt($process, CURLOPT_HTTPHEADER, array('Content-Type: application/xml', $additionalHeaders));
curl_setopt($process, CURLOPT_HEADER, 1);
curl_setopt($process, CURLOPT_USERPWD, $username . ":" . $password);
curl_setopt($process, CURLOPT_TIMEOUT, 30);
curl_setopt($process, CURLOPT_POST, 1);
curl_setopt($process, CURLOPT_POSTFIELDS, $data);
curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
$return = curl_exec($process);
curl_close($process);
echo $return
*/
?>
