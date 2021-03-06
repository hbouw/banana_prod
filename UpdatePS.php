<?php

// dec-2012 pvgenuchten
// update the production system table, based on input from a form-post
// response in json format (including error handling) 

include('config.php');

try {
$data = json_decode ( $_POST["config"] );

$sql = "update banana_area_variables set ";
if (isset($data->cultivar_type)) $sql .= "cultivar_type = '".$data->cultivar_type."',";
if ($data->cultivar_name) $sql .= "cultivar_name = '".$data->cultivar_name."',";
if ($data->area_product) $sql .= "area_product = '".$data->area_product."',";
if ($data->yield) $sql .= "yield = '".$data->yield."',";
if ($data->density) $sql .= "density = '".$data->density."',";
if ($data->total_prod) $sql .= "total_prod = '".$data->total_prod."',";
if (isset($data->use)) $sql .= "use = '".$data->use."',";
if (isset($data->association)) $sql .= "association = '".$data->association."',";
if ($data->other_cult) $sql .= "other_cult = '".$data->other_cult."',";
if ($data->number_hh) $sql .= "number_hh = '".$data->number_hh."',";
if (isset($data->inputs)) $sql .= "inputs = '".$data->inputs."',";
if (isset($data->irrigation)) $sql .= "irrigation = '".$data->irrigation."',";
if ($data->chem_fert) $sql .= "chem_fert = '".$data->chem_fert."',";
if ($data->org_fert) $sql .= "org_fert = '".$data->org_fert."',";
if (isset($data->herbicides)) $sql .= "herbicides = '".$data->herbicides."',";
if (isset($data->fungicides)) $sql .= "fungicides = '".$data->fungicides."',";
if (isset($data->nematicides)) $sql .= "nematicides = '".$data->nematicides."',";
if (isset($data->insecticides)) $sql .= "insecticides = '".$data->insecticides."',";
if (isset($data->p_goodeyi)) $sql .= "p_goodeyi = '".$data->p_goodeyi."',";
if (isset($data->p_coffea)) $sql .= "p_coffea = '".$data->p_coffea."',";
if (isset($data->r_similis)) $sql .= "r_similis = '".$data->r_similis."',";
if (isset($data->meloidogyne)) $sql .= "meloidogyne = '".$data->meloidogyne."',";
if (isset($data->h_multici)) $sql .= "h_multici = '".$data->h_multici."',";
if (isset($data->moko_bugtok)) $sql .= "moko_bugtok = '".$data->moko_bugtok."',";
if (isset($data->bxw)) $sql .= "bxw = '".$data->bxw."',";
if (isset($data->blood_disease)) $sql .= "blood_disease = '".$data->blood_disease."',";
if (isset($data->erwinia)) $sql .= "erwinia = '".$data->erwinia."',";
if ($data->other_bac_dis) $sql .= "other_bac_dis = '".$data->other_bac_dis."',";
if (isset($data->oth_bacdis_im)) $sql .= "oth_bacdis_im = '".$data->oth_bacdis_im."',";
if (isset($data->stem_weevil)) $sql .= "stem_weevil = '".$data->stem_weevil."',";
if (isset($data->corm_weevil)) $sql .= "corm_weevil = '".$data->corm_weevil."',";
if (isset($data->black_streak)) $sql .= "black_streak = '".$data->black_streak."',";
if (isset($data->yel_sigatoka)) $sql .= "yel_sigatoka = '".$data->yel_sigatoka."',";
if (isset($data->eumusae)) $sql .= "eumusae = '".$data->eumusae."',";
if ($data->other_leaf_dis) $sql .= "other_leaf_dis = '".$data->other_leaf_dis."',";
if (isset($data->oth_leafdis_im)) $sql .= "oth_leafdis_im = '".$data->oth_leafdis_im."',";
if (isset($data->fus_race1)) $sql .= "fus_race1 = '".$data->fus_race1."',";
if (isset($data->fus_race2)) $sql .= "fus_race2 = '".$data->fus_race2."',";
if (isset($data->fus_race4)) $sql .= "fus_race4 = '".$data->fus_race4."',";
if (isset($data->fus_subtrop4)) $sql .= "fus_subtrop4 = '".$data->fus_subtrop4."',";
if ($data->other_fungal) $sql .= "other_fungal = '".$data->other_fungal."',";
if (isset($data->oth_fungal_im)) $sql .= "oth_fungal_im = '".$data->oth_fungal_im."',";
if (isset($data->bbtv)) $sql .= "bbtv = '".$data->bbtv."',";
if (isset($data->bsv)) $sql .= "bsv = '".$data->bsv."',";
if ($data->other_virus) $sql .= "other_virus = '".$data->other_virus."',";
if (isset($data->oth_virus_im)) $sql .= "oth_virus_im = '".$data->oth_virus_im."',";
if (isset($data->yield_tendency5)) $sql .= "yield_tendency5 = '".$data->yield_tendency5."',";
if (isset($data->production_tendency5)) $sql .= "production_tendency5 = '".$data->production_tendency5."',";
$sql .= "area_id = ". $data->area_id. " where ((association = '".$data->association."' and cultivar_type = '".$data->cultivar_type."') or (association = '0' and cultivar_type = '0')) and area_id = ".$data->area_id;

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