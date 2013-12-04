    

<?php

// dec-2012 pvgenuchten
// get all parameters for a production system to be displayed in a table
// response in json format (including error handling) 

include('config.php');

try {

 // attempt a connection
 $dbh = pg_connect("host=".DB_HOST." dbname=".DB_NAME." user=".DB_USER." password=".DB_PASS." port=".DB_PORT);
 if (!$dbh) {
	 error_log("Error in connection:".pg_last_error());
     throw new Exception("Error in connection: " . pg_last_error());
 }       

 // execute query
 if (!is_numeric ( $_POST["area_id"] ) || $_POST["area_id"] < 1) {
	throw new Exception("Area_id wrong syntax: ".$_POST["area_id"]);
 } 
 $sql = "SELECT v.* FROM banana_area_variables v where v.area_id = " . $_POST["area_id"] . " order by cultivar_type, association";
 
$result = pg_query($dbh, $sql);   

 if (!$result) {
    throw new Exception("Error in SQL query: " . pg_last_error() . $sql);
 }       

    $data = array();

    while ($row=pg_fetch_object($result))
    {
        $data [] = $row;
    }
	echo "{ areas :";
    echo json_encode($data);
	echo "}";
// free memory
 pg_free_result($result);       

 // close connection
 pg_close($dbh);
 
 } catch (Exception $e) {
 echo "{\"status\": \"false\", \"message\":\"".  $e->getMessage() ."\"}";
 }
 
?>
