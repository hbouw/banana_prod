<?php
// retrieve post request parameters [incoming request1]
$password= $_POST["password"];
$username= $_POST["username"];
$url= $_POST["url"];
$data = array('username' => $username, 'password' => $password);
// authorization request [outgoing request2] to geoserver
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, curlopt_followlocation, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "username=" .$username ."&password=" .$password );
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$header = curl_getinfo ( $ch );
curl_close($ch);
//  check response from [request2] whether user is authenticated
$gs_response = $header ["redirect_url"];
if (strpos( $gs_response, "error=true") !== false ) {
$result = false ;
} else {
$result = true ;
}
$output = array();
// send response back for [request1]
if ( $result ) {
echo "{\"login\":\"true\"}";
} else  {
echo "{\"login\":\"false\"}";
}
?>
