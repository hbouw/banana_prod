<?php
include('config.php');
// retrieve post request parameters [incoming request1]
$password= $_POST["password"];
$username= $_POST["username"];
$url= $_POST["url"];
$data = array('username' => $username, 'password' => $password);
// authorization request [outgoing request2] to geoserver
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, "username=" .$username ."&password=" .$password );
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
$header = curl_getinfo ( $ch );	
curl_close($ch);
$gs_response = $header ["url"];

if (strpos( $gs_response, "error=true") !== false ) {
$result = false ;
} else {
$result = true ;
}
// send response back for [request1]
if ( $result ) {
$_SESSION['username']=$username;
$_SESSION['user']=true;
echo "{\"login\":\"true\"}";
} else  {
$_SESSION['user']=false;
echo "{\"login\":\"false\"}";
}
?>
