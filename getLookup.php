
<?php

// dec-2012 pvgenuchten
// script not used anymore, but can be used to retrieve a list of lookup values from db (input is var-type)

include('config.php');

 // attempt a connection
 $dbh = pg_connect("host=".DB_HOST." dbname=".DB_NAME." user=".DB_USER." password=".DB_PASS." port=".DB_PORT);
 if (!$dbh) {
	 error_log("Error in connection:".pg_last_error());
     die("Error in connection: " . pg_last_error());
 }       

$sql = "SELECT * FROM banana_lookup where varname = '" . str_replace("'", "''", $_GET["type"]) . "'";
 
$result = pg_query($dbh, $sql);   

 if (!$result) {
     die("Error in SQL query: " . pg_last_error() . $sql);
 }       

    $data = array();

    while ($row=pg_fetch_object($result))

    {
        $data [] = $row;
    }
	echo "{ data :";
    echo json_encode($data);
	echo "}";
// free memory
 pg_free_result($result);       

 // close connection
 pg_close($dbh);
 
 
 
?>