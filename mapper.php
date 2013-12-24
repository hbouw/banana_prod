<?php

// dec-2012 pvgenuchten
// this is the main script defining the html elements in the page, actual layout is build in javascript/extjs in bananamapper.js

include('config.php');
?>

<html><head>
        <title>Banana mapper</title>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
             
       <!--Ext -->
        <link rel="stylesheet" type="text/css" href="script/gxp/externals/ext-3.4.0/resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="script/gxp/externals/ext-3.4.0/resources/css/xtheme-gray.css" />
        <link rel="stylesheet" type="text/css" href="script/Ext.ux.form.CheckboxCombo.min.css" />
		<?php 
		//if (DEBUG) {
		//	echo "<script src=\"script/gxp/externals/ext-3.4.0/adapter/ext/ext-base-debug.js\"></script>";
		//	echo "<script src=\"script/gxp/externals/ext-3.4.0/ext-all-debug.js\"></script>";
		//} else {
			echo "<script src=\"script/gxp/externals/ext-3.4.0/adapter/ext/ext-base.js\"></script>";
			echo "<script src=\"script/gxp/externals/ext-3.4.0/ext-all.js\"></script>";	
		//}
		?>
		<!--OpenLayers -->
		<link rel="stylesheet" type="text/css" href="script/gxp/externals/openlayers/theme/default/style.css" />
        <link rel="stylesheet" type="text/css" href="script/gxp/externals/openlayers/theme/default/google.css" />
		<?php 
		if (DEBUG) {
			echo "<script src=\"script/gxp/externals/openlayers/lib/OpenLayers.js\"></script>";
		} else {
			echo "<script src=\"script/OpenLayers.js\"></script>";	
		}
		?>
		
		<!--GeoExt -->
	    <link rel="stylesheet" type="text/css" href="script/gxp/externals/geoext/resources/css/gxtheme-gray.css" />
		<?php 
		if (DEBUG) {
			echo "<script src=\"script/gxp/externals/geoext/lib/GeoExt.js\"></script>";
		} else {
			echo "<script src=\"script/GeoExt.js\"></script>";	
		}
		?>
        <script src="script/gxp/externals/geoext/lib/overrides/override-ext-ajax.js"></script>
		
		<!--GXP -->
		<link rel="stylesheet" type="text/css" href="script/gxp/src/theme/all.css"/>
		<?php 
//		if (DEBUG) {
			echo "<script src=\"script/gxp/src/script/loader.js\"></script>";
	//	} else {
		//	echo "<script src=\"script/gxp.js\"></script>";	
		//}
		?>
        <script type="text/javascript" src="AreaEditPanel.js"></script>
		<script type="text/javascript" src="downloadtool.js"></script>
		<script type="text/javascript" src="script/Ext.ux.form.CheckboxCombo.min.js"></script>
	</script>	
			
			
		<?php		
		//get all lookup lists, to be used at places where only foreign keys are available
		 $dbh = pg_connect("host=".DB_HOST." dbname=".DB_NAME." user=".DB_USER." password=".DB_PASS." port=".DB_PORT);
		 if (!$dbh) {
			 error_log("Error in connection:".pg_last_error());
			 die("Excuse us, the application can not start due to an error in the database connection: " . pg_last_error());
		 }       
		
				
		//transfer some javascript variables from php-variables from config.php
		echo "<script type=\"text/javascript\">";
		echo "var gs_url = '".GEOSERVER_URL."';";
		echo "var SECURED_LAYER = \"".SECURED_LAYER."\";";
		echo "var DOWNLOAD_LAYER = \"".DOWNLOAD_LAYER."\";";
		echo "var gs_workspace = \"".GS_WORKSPACE."\";";
		
		// Query banana variables and possible values
		$sql = "SELECT * FROM banana_lookup order by varname,value"; 
		$result = pg_query($dbh, $sql);   
		 if (!$result) {
			 die("Error in SQL query: " . pg_last_error());
		 }       
		$data = array();
		$firstVar = true;
		$firstLkp = true;
		$curVar = "";
		$curGroup = "";
		
		echo "var lookups = {";	
		while ($row=pg_fetch_object($result)) {
			if ($curVar!=$row->varname){
				$curVar = $row->varname;
				if ($firstVar) $firstVar=false;
				else echo "],";
				echo "\"".$curVar."\":[";
				$firstLkp = true;
			}
			
			if ($firstLkp) $firstLkp = false;
			else echo ",";
			echo "[" . $row->value . ",\"" . $row->label . "\"]";
		}
		echo "]};";
		
		
		// Query countries
		$sqlcountries = "SELECT country FROM banana_systems GROUP BY country ORDER BY country ASC";
		$firstLkp = true;
		
		// Query regions
		$sqlregions = "select countries.region from banana_systems INNER JOIN countries ON banana_systems.country=countries.country group by countries.region";
		$firstLkpRegions = true;
		
		$result = pg_query($dbh, $sqlcountries);   
		 if (!$result) {
			 die("Error in SQL query: " . pg_last_error());
		 }  
		 
		 $resultRegions = pg_query($dbh, $sqlregions);   
		 if (!$resultRegions) {
			 die("Error in SQL query: " . pg_last_error());
		 }  
		 
		 
		   
			
		echo "var countryLookup = {";
		echo "\"countries\":[";
		
		while ($row=pg_fetch_object($result)) {			
			if ($firstLkp) $firstLkp = false;
			else echo ",";
			echo "[\"" . $row->country. "\",\"" . $row->country. "\"]" ;
		}
		echo "],\"regions\":[";
		while ($row=pg_fetch_object($resultRegions)) {			
			if ($firstLkpRegions) $firstLkpRegions = false;
			else echo ",";
			echo "[\"" . $row->region. "\",\"" . $row->region. "\"]" ;
		}
		
		echo "]};";
		
		// Query min and max of total_prod
		$sqlprod = "select COALESCE(max(total_prod),0) as max_prod, COALESCE(min(total_prod),0) as min_prod from banana_systems where total_prod<>-9999";
		$resultprod = pg_query($dbh, $sqlprod);   
		 if (!$resultprod) {
			 die("Error in SQL query: " . pg_last_error());
		 }  
		 
		 while ($row=pg_fetch_object($resultprod)){
		 	echo "var totalprodMax =" . $row->max_prod . ";";
		 	echo "var totalprodMin =" . $row->min_prod . ";";	 	
		 }
		 
		 
		
		
		
		
		// Query the pests and diseases
		$sqlpests= "select * from diseases ORDER BY nameneat ASC";
		$firstLkp = true;
		
		$result = pg_query($dbh, $sqlpests);   
		 if (!$result) {
			 die("Error in SQL query: " . pg_last_error());
		 }   
		 
		 
		echo "var pestsLookups = {";
		echo "\"pest_diseases\":[";
		
		while ($row=pg_fetch_object($result)) {			
			if ($firstLkp) $firstLkp = false;
			else echo ",";
			echo "[\"" . $row->namedb . "\",\"" . $row->nameneat . "\"]";
		}
		echo "]};";
		
		echo "var AssStore = new Ext.data.ArrayStore({fields: [\"id\", \"label\"],data : lookups[\"association\"] });";
		echo "var CltStore = new Ext.data.ArrayStore({fields: [\"id\", \"label\"],data : lookups[\"cultivar_type\"] });";
		
		echo "var user = "; 
		if ($_SESSION['user']) echo "true;";
		else echo "false;";
		?>
		</script>
		
        <!--Banana Mapper -->        
        <link rel="stylesheet" type="text/css" href="mapper.css"/>
        <script type="text/javascript" src="BananaMapper.js"></script>
		<script type="text/javascript" src="script/gxp/externals/ux/RowExpander.js"></script>
		<script type="text/javascript" src="script/gxp/externals/ux/PrintPreview/PrintPreview.js"></script>
<?php
		 if (!DEBUG) {
?>		 
		<!--google analytics part-->
		<script type="text/javascript">
		
		var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-33463656-1']);
			_gaq.push(['_trackPageview']);

		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
		<!--/google analytics part-->
<?php	
	}
?>
	</head>
    <body>           
        	
            <div style=visibility:hidden>
			<div id=Head_html>			
		
			
			
			<?php if ($_SESSION['user']){
			 echo "<H1 style=\"text-shadow:2px 2px 2px #fff;float:left;margin-top:10px;margin-left:10px;font-size:xx-large;\">CropMapper.org - <i>Banana - Editor</i></H1>";			
			 echo "<p style=\"float:right;font-size:small;margin:10px;font-weight:bold;color:black\">Welcome: <a href=\"./index.html\" alt=\"Log in with a different account\">". $_SESSION['username']."</a></p>"; 
			} else {
			echo "<H1 style=\"text-shadow:2px 2px 2px #fff;float:left;margin-top:10px;margin-left:10px;font-size:xx-large;\">CropMapper.org - <i>Banana - Viewer</i></H1>";			
        	echo "<a href=\"./index.html\" alt=\"Log in\"style=\"float:right;font-size:small;margin:10px;font-weight:bold;color:black\">Not logged in</a>"; 
        	
        	}
        	?>
        	<!--<img src="images/bioversity_logo_small.jpg" alt="Bioversity logo"  height="60" align="right" />-->
        	<!--img src="images/promusa_logo.jpg" alt="ProMusa logo"  height="60" align="right"/>-->
			        		
        	</div>	
        	    		
      		<div id=Help style="width: 100%; height: 100%; font-size: 9pt; overflow: auto">
      			
      			<h1>Icons</h1>
				Most functions of the crop mapper are presented by icons. The icons are only visible when the tab "Map is open. <br><br>
				
				<ul>
				<li><img src="script/gxp/src/theme/img/silk/add.png" alt="Add Layer Icon"  height="20" align="left"/> This icon allows adding layers from any of the preconfigured map servers (e.g. banana server, google server and map quest) to the map. It also allows to add other map servers by entering the URL.</li><br>
				<li><img src="script/gxp/src/theme/img/silk/delete.png" alt="Remove Layer Icon"  height="20" align="left"/> When clicked the selected layer (base or overlay) will be removed from the map.</li><br>
				<li><img src="script/gxp/src/theme/img/silk/wrench.png" alt="Remove Layer Icon"  height="20" align="left"/> When clicked a pop-up appears with information on the selected layer (overlay only).</li><br><br>
				<li><img src="script/gxp/src/theme/img/silk/arrow_out.png" height="20" align="left"/> When clicked the map zooms to the maximum spatial extent.</li><br>
				<li><img src="script/gxp/src/theme/img/silk/magnifier_zoom_in.png" height="20" align="left"/> When clicked the map zooms in (one zoom-level).</li><br>
				<li><img src="script/gxp/src/theme/img/silk/magnifier_zoom_out.png" height="20" align="left"/> When clicked the map zooms out (one zoom-level).</li><br>
				<li><img src="script/gxp/src/theme/img/geosilk/ruler.png" height="20" align="left"/> This tool allows measuring a distance or an area.</li><br>
				<li><img src="script/gxp/src/theme/img/silk/information.png" alt="Remove Layer Icon"  height="20" align="left"/> When clicked the selected layer (overlay only) the properties of the features that are clicked on with the mouse. If two or more features overlay then both properties will be given.</li><br>
				<li><img src="script/gxp/src/theme/img/silk/pencil_add.png" alt="Remove Layer Icon"  height="20" align="left"/> This icon allow new features to be added to a selected layer, using the format of that layer.</li><br>
				<li><img src="script/gxp/src/theme/img/silk/map.png" alt="Remove Layer Icon"  height="20" align="left"/> When clicked the selected layer (overlay only) becomes editable. </li><br>
				<li><img src="script/gxp/src/theme/img/silk/printer.png" alt="Remove Layer Icon"  height="20" align="left"/> This icon will print the map. Please note that Google base layers will not be visible omn the map, due to license restictions. For Please select a different base layer if background is desired.</li><br>
				</ul>
				
				<h1>Add a production area</h1>
					<p>
					1) Login to have editing rights (otherwise you only have read rights and an error message will appear when saving the production area). Use the credentials listed in Error! Reference source not found.<br> 
					2) Return to the "Map" tab.<br>
					3) If not already on,  turn on the layer "Production Areas" in the layer tree by ticking the box in front of it.<br> 
					4) Select the layer "Production Areas"  in the layer tree  by left clicking on it. It will turn grey and the icons  "create a new feature" and "Edit existing feature" are enabled in the icon bar.<br>
					5) Left click the "create new feature". When moving the cursor over the map, it changes to a white arrow with little blue square.<br>
					6) Move the arrow to where you want the first node (corner-point) of the production area and left click....followed by others until satisfied with the production area. When happy and all nodes are completed, left double click.<br>
					7) A pop-up window will open with three entries. The "area_id" will be automatically generated so don"t worry about it. The area_name and country are to be filled in by the user.<br> 
					8) When done click the icon "save" and your area is entered to the database.<br><br>
					</p>

				<h1>Edit an existing production area</h1>
					<p>
					1) Go to login tab and login to have editing rights.<br>
					2) Return to the "Map" tab.<br>
					3) If not already on,  turn on the layer "Production Areas" in the layer tree by ticking the box in front of it.<br>
					4) Click on the icon "Edit existing feature" in the icon menu.<br>
					5) Click on the production area for which the shape is to be altered.<br>
					6) A pop-up window will appear with id, name and country of the area. (The pop-up window can be moved if the pushpin symbol in the upper right corner is selected).<br>
					7) Click the icon "Edit" in the bottom left of the pop-up window.<br>
					8) A little square appears on every "Node" (corner of the selected area). These nodes can be dragged or new nodes can be added to add more detail. A snapping agent has been installed so that new nodes will snap to possible adjacent other production areas.<br>
					9) When satisfied with the new shape, click "Save".<br>
					10) The changes to the shape of the production area are saved in the database.<br><br>
					</p>

				<h1>Delete a production area</h1>
					<p>
					1)	Go to login tab and login to have editing rights. <br>
					2)	Return to the "Map" tab.<br>
					3)	If not already on,  turn on the layer "Production Areas" in the layer tree by ticking the box in front of it.  <br>
					4)	Select the layer "Production Areas"  in the layer tree  by left clicking on it. It will turn grey and the icons  "create a new feature" and "Edit existing feature" are enabled in the icon bar.<br>
					5)	Click on the icon "Edit existing  feature" in the icon menu.<br>
					6)	Click on the production area that is to be deleted.<br>
					7)	A pop-up window will appear with id, name and country of the area.<br>
					8)	Click the icon "Delete" in the bottom left of the window.<br>
					9)	Another pop-up window asks for confirmation of user. (Note that any production system information associated with this area will also be deleted).<br>
					10)	The deleted production area is removed from the database.<br><br>
					</p>
					
				<h1>Enter information of a new production area</h1>
					<p>
					1)	Go to login tab and login to have editing rights. <br>
					2)	Return to the "Map" tab.<br>
					3)	If not already on,  turn on the layer "Production Areas" in the layer tree by ticking the box in front of it.<br>
					4)	Select the layer "Production Areas"  in the layer tree  by left clicking on it. It will turn grey and the icons  "create a new feature" and "Edit existing feature" are enabled in the icon bar.<br>
					5)	In the icon bar click on the icon "get feature info" (blue circle). The icon will turn grey, meaning it is selected.<br>
					6)	Click on any production area. A pop-up window will open with area_name and country and a link to the information of the production area "View production systems". (Note that there can be multiple production systems attached to a single area.)<br>
					7)	Click the link "View production systems", which will be opened in the right panel (Production System Details). If there is information entered it will appear. If no information is added an icon "Add" will appear on top-right of the panel.<br>
					8)	Click the icon "Add". All variables will appear, with no data entered (except the unique area_id!)<br>
					9)	Click the  icon "Edit" to start entering data and double click on the value to be entered . In most cases the variable is associated with a lookup table, making it easier for the user to enter data and to make the database more robust. For example, if the user chooses to enter "Cultivar type". The user will be presented with a pull-down menu with 7 options. (Note the double clicking only has to be done once and moving down the variable list can be done with the Tab-key, moving though the pull-down menus with the Arrow-keys and confirming your choice with the Enter-key.)<br>
					10)	When done filling information click the icon "Save" and the productions system is entered into the database.<br>
					11)	If you want you can enter another production system by clicking the icon "Add", thus allowing multiple systems that are associated with a single area.<br><br>
					</p>
					
				<h1>Edit information of an existing production area</h1>
					<p>
					1)	Go to login tab and login to have editing rights. <br>
					2)	Return to the "Map" tab.<br>
					3)	If not already on,  turn on the layer "Production Areas" in the layer tree by ticking the box in front of it.  <br>
					4)	Select the layer "Production Areas"  in the layer tree  by left clicking on it. It will turn grey and the icons  "create a new feature" and "Edit existing feature" are enabled in the icon bar.<br>
					5)	In the icon bar click on the icon "get feature info" (blue circle). The icon will turn grey, meaning it is selected.<br>
					6)	Click on the production area of which you wish to alter the variables. A pop-up window will open with area_name and country and a link to the information of the production area ("View production systems". (Note that there can be multiple production systems attached to a single area.)<br>
					7)	Click the link "View production systems", which will be opened in the right panel (Production System Details). All information on the production system will appear in the right panel ("Production System Details".<br>
					8)	Click the icon "Edit" to start entering data and double click on the value to be entered. In most cases the variable is associated with a lookup table, making it easier for the user to enter data and to make the database more robust. For example, if the user chooses to enter "Cultivar type". The user will be presented with a pull-down menu with 7 options. (Note the double clicking only has to be done once and moving down the variable list can be done with the Tab-key, moving though the pull-down menus with the Arrow-keys and confirming your choice with the Enter-key.)<br>
					9)	When done filling information click the icon "Save" and the productions system is entered into the database.<br><br>
					</p>
					
				<h1>Navigating</h1>
					<p>
					The mapper contains a lot of information and thus requires a lot of screen,  but most computer screens are limited in size however. To save space the panel "Layer Tree" and  "Production System Details" can be minimized by clicking the "collapse button" in the upper right corner of the panels. To make the panels reappear click the tiny-tiny triangle exactly at the centre of the border between the panel "Map" and where the minimized panel used to be. Zooming into a particular area can be quickly done by keeping the "Shift" key pressed, left clicking the mouse on any point of the map and dragging the cursor to create the desirwed zoombox. <br><br>
					</p>
					
				<h1>Downloading production system data</h1>
					<p>
					To download the Production System data right click the layer Production Systems in the layer tree and select "download" from the pop-up window.  The user will be asked in what format the layer should be downloaded, with options as Esri shapefile, Pdf, GeoTiff, KML or CSV. Note that the integer values of the variables are downloaded, and not the explanations of the integers. Note that the download layer is configured (in the config.php) as the "production systems" layer and not the "production areas" layer.<br><br>
					</p> 
					
				<h1>Search/Query production systems</h1>
					<p>
					The "Search results" panel shows the variables associated with the layers "production areas" or "production systems", at the bottom of the website. On default this panel is minimized to save space. To enable it press the tiny triangle that is exactly in the centre below the map window. The panel is empty until either "systems" or "areas" are selected in the layer tree. Click on the button "Query" at bottom right of the "Search results", to search/query the layer that is selected. The button "Display on map" will draw a red line around the areas that are searched for. Alternatively, a layer can be querried by right clicking on the layer itself and selecting the option "Query Layer".<br><br>
					</p>
					
				<h1>Printing a map</h1>
					<p>
					To print a map left click the print icon ( only visible in "Map" window) in the icon menu. Only the layers on the GeoServer can be printed as Google does not allow printing of its maps. It is difficult to orientate on a map with only the  banana areas, without a background . As a solution, a map layer "Country boundaries" was added to the GeoServer. The printing module  used should allow additional layers to be printed. <br><br>
					</p>
		
				
      		</p></div>
      		
      		     		  
      	</div>   
		
		
		<iframe id="_wfsFrame" name="_wfsFrame" style="width:10px;height:1px;border:none"></iframe>
    </body>


</html>
