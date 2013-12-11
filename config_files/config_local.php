<?php
ini_set('display_errors', 0); //always show php errors/warnings
define('DEBUG', false); //laadt de volledige javascripts, ipv de gecompileerde
define('DB_USER', 'postgres'); //user of postgres database
define('DB_PASS', 'postgres'); //password of postgres database
define('DB_HOST', 'localhost'); //define location/host of database, in this case localhost because both php and postgres are on same server
define('DB_PORT', '5432'); //specifies port on which the postgres db is
define('DB_NAME', 'cropmapper_banana_test'); //specifies the postgres database name
define('GEOSERVER_URL', '/geoserver'); //define location/host of geoserver, in this case localhost because both php and geoserver are on same server
define('SECURED_LAYER','protected:states'); //specifies the secure (dummy) layer in geoserver, necessary for the login procedure 
define('DOWNLOAD_LAYER','banana_systems');	//specifies the layer in GeoServer) that is to be downloaded 
define('GS_WORKSPACE','banana_test');

session_start();

if(!isset($_SESSION['user'])) $_SESSION['user']=false;

?>