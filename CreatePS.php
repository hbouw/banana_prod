

<?php

// dec-2012 pvgenuchten
// insert a new record in system table, based on input from a form-post
// response in json format (including error handling) 

include('config.php');

try {

 // execute query
 if (!is_numeric ( $_GET["area_id"] ) || $_GET["area_id"] < 1) {
	throw new Exception("Area_id wrong syntax: ".$_GET["area_id"]);
 } 

$sql = "insert into banana_area_variables (area_id, cultivar_type, association) values (".$_GET["area_id"].",0,0 ) ";

 // attempt a connection
 $dbh = pg_connect("host=".DB_HOST." dbname=".DB_NAME." user=".DB_USER." password=".DB_PASS." port=".DB_PORT);
 if (!$dbh) {
	 error_log("Error in connection: ".pg_last_error());
     throw new Exception("Error in connection: " . pg_last_error());
 }       

//echo $sql;
 
$result = pg_query($dbh, $sql);   

if (pg_last_error()){
	echo "{\"status\": \"false\", \"message\":\"".str_replace("\"","",str_replace("\n","",pg_last_error()))."\"";
   if (DEBUG) echo ", \"sql\":\"".str_replace("\"","",$sql)."\"";
   echo "}";
} else {
   echo "{\"status\": \"true\", \"message\":\"Update succesfull\"";
   if (DEBUG) echo ", \"sql\":\"".str_replace("\"","",str_replace("\n","",$sql))."\"";
   echo "}";
}

} catch (Exception $e) {
    echo "{\"status\": \"false\", \"message\":\"".  $e->getMessage() ."\"}";
}

?>