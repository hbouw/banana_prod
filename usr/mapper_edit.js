//This is the Banana Mapper. It is based on viewer.js and was edited from there

function startup()
            		{ 
            		Ext.MessageBox.confirm('Information', 'Welcome to the demo version of the banana mapper. Expect substantial future changes. Please press "yes" if you can accept this and would like to proceed.', showResult );
            		}
            		         
            		function showResult(btn)
            		{if ( btn !="yes" )
            		{location.href = 'http://geoserver.inibap.org/usr/index.html';	}
            		}; 

var app;
Ext.onReady(function() {
    app = new gxp.Viewer({
        proxy: "../proxy.php?route=",
                
        portalConfig: {
            //renderTo: document.body,
            layout: "border", //
			//align: "stretch",
			//width:  1000,
		    //height: 800,
		
		    //Define 
		    //Insert a header
            items: [
               { 	
               	id: "header",
             	height: 60,
                region: "north",
                xtype: "panel",
				border: true,
	           items: [{contentEl:'Head_html'}],
    
			//Insert main panel with tabss                
                }, {
                id: "mappanel",
                border: "true",
                xtype: "tabpanel",
                region: "center",
                activeTab: 0, // choose tab 0 (map) to be visible on initialization
                border: true,
                items: ["mymap", {title: "Information",contentEl:'Information'}, {title: "Help",contentEl:'Help'},  {title: "Login",contentEl:'Login'},  {title: "Export",contentEl:'Export'}]
                
                },{
				//container for the FeatureGrid information
                id: "data",
				title: "Production system details",
                layout:'accordion',
				collapsible: true,
            	collapseMode: "mini",
            	collapsed: false,
            	border: true,
                region: "east",
				width: 250,
            	         	
            	},{
         		// container for the layers in the map
                id: "treepanel",
                title: "Table of Layers",
                layout: "fit",
                region: "west",
                border: true,
                collapsible: true,
                collapseMode: "mini",
                width: 200,
                },{
             	// container for the legend				//does not work
                //id: "legendpanel",
                //title: "legend",
                //layout: "fit",
                //region: "west",
                //border: true,
                //collapsible: true,
                //collapseMode: "mini",
                //width: 220,
             //},{
            //Insert a footer						
                id: "footer",
                title: "Query banana production data",
             	height: 225,
             	region: "south",
                xtype: "panel",
                border: true,
                collapsible: true,
                collapseMode: "mini",
                collapsed: false
            }],
            bbar: {id: "mybbar",
            	xtype: "container",
            	region: "south",
           // 	height: 25
            }},
        
// Configuration of all tool plugins for this application
       tools: [{
            ptype: "gxp_layertree",
            overlayNodeText: "Overlays",
            baseNodeText: "Base Layers",
			outputConfig: {
				id: "tree",
				border: true,
				tbar: {height:25} // we will add buttons to "tree.bbar" later 
				},
            outputTarget: "treepanel",
			width: 400
         },{
		   ptype: "gxp_addlayers", 
           actionTarget: "tree.tbar",
        },{
           ptype: "gxp_removelayer",
           actionTarget: ["tree.tbar", "tree.contextMenu"] //add button 'remove layer' to the tree.tbar, remove in tree selected layer)
        },{
           ptype: "gxp_layerproperties",
           actionTarget: ["tree.tbar", "tree.contextMenu",] //add button 'layer properties' to the tree.tbar       
        },{ 
		   // icon greyed out, does not work
		   //ptype: "gxp_styler",
           //id: "styler",
           //outputConfig: {autoScroll: true, width: 320},
           //actionTarget: ["tree.tbar", "tree.contextMenu"],
           //outputTarget: "tree"
		//},{	
		   ptype: "gxp_zoomtoextent",
           actionTarget: "map.tbar",//add button 'zoom to extent' to the map.tbar.
           //index: 1
        },{
           ptype: "gxp_zoom",
           actionTarget: "map.tbar",    //add buttons 'zoom out' and 'zoom in' to the map.tbar.
        	//index: 2
        },{
           ptype: "gxp_measure", 
           toggleGroup: "layertools",
           controlOptions: {immediate: true},
           showButtonText: false,
           actionTarget: "map.tbar"
        },{  	
		   ptype: "gxp_wmsgetfeatureinfo",
           actionTarget: "map.tbar",
            popupTitle: "Production area",
           index: 3,
           format: "grid",
           outputTarget: "data",						//display feature info in east panel "data" 
           outputConfig: {xtype: 'panel'},
		   //outputConfig: {id: "popup"},				//display feature info as popup window
           //outputConfig: {panIn:true,width: 200,height: 400},
           toggleGroup: "layertools",
           //to do refresh datapanel on new click
           //to do highlightFeatures: true,				    //look at: https://getsatisfaction.com/opengeo/topics/how_to_highlight_the_feature_when_click_using_identify_tool
        },{
        	//define snapping agent
        	ptype: "gxp_snappingagent",
    		id: "snapping-agent",
    		targets: [{
        		source: "bioversity",
        		name: "banana:banana_areas_shape"
    				 }]	
        /*  ptype: "gxp_mapproperties",
            outputConfig: {
            title: 'Map properties'*/
        },{  	
        // shared FeatureManager for feature editing, grid and querying
            ptype: "gxp_featuremanager",
            id: "featuremanager",
            maxFeatures: 50,
            paging: true
            
        },{
            ptype: "gxp_featureeditor",
            featureManager: "featuremanager",
            //actionTarget: "data",
            snappingAgent: "snapping-agent",
            autoLoadFeature: true,
            outputConfig: {panIn: true,
            			   width:200,
            			   height:500},
            closeOnSave: true,
            readOnly: false,
            toggleGroup: "layertools"
         },{
                           	
            ptype: "gxp_featuregrid",
            featureManager: "featuremanager",
            showTotalResults: true,
            alwaysDisplayOnMap: false,
            //displayMode: "selected"
            displayMode: "all",
            outputConfig: {
                id: "featuregrid",
                height: 175,},
            outputTarget: "footer"
         },{
       		ptype: "gxp_print",											// how to fix http://docs.geoserver.org/stable/en/user/community/printing/				
            customParams: {outputFilename: 'BananaMapper-print'},
            printService: "http://geoserver.inibap.org/geoserver/pdf/",	
            actionTarget: "map.tbar",
            includeLegend: true,
            sourceMap: this.mappanel,
            showButtonText: false
		},{
       	    ptype: "gxp_queryform",
            featureManager: "featuremanager",
            outputConfig: {
                title: "Query",
                width: 320
				},  
            //actionTarget: ["map.tbar", "tree.contextMenu"],  			// icon in map.tbar
            actionTarget: ["featuregrid.bbar", "tree.contextMenu"],		//icon below
                
            appendActions: true
        },{
          // not a useful tool - just a demo for additional items
           actionTarget: "featuregrid.bbar", // ".bbar" would also work
           actions: [{text: "Export Query"}]
        },
      
		],
        
        // Define sources (map servers that publish WMS/WFS) that are referred to when layers are added
        defaultSourceType: "gxp_wmssource",
        
        sources: {
            bioversity: {
            	url: "http://geoserver.inibap.org/geoserver/wms",
            	//url: "http://195.220.148.9/geoserver/wms",
            	version:  "1.1.1"
            },
            sedac: {
            	url: "http://sedac.ciesin.columbia.edu/geoserver/gwc/service/wms",
            	version:  "1.3.0"
            },
            mapquest: {
                ptype: "gxp_mapquestsource"
            },
            ol: {
                ptype: "gxp_olsource"
            },
			//mapspam: {
            //   url: "http://ferb.harvestchoice.org/ArcGIS/services/cell_values_2/MapServer/WMSServer",
            //   version: "1.1.1"
            //},
            google: {
		    	ptype: "gxp_googlesource"
			},
            //develop: {
            //  url: "http://192.168.1.69:8080/geoserver/wms/",  //local IP LT03 Annadaal
            //  url: "http://192.168.2.7:8080/geoserver/wms",    //local IP LT03 geocat
            //	url: "http://admin:geoserver@localhost:8080/geoserver/wms",      //only user admin with pw geoserver can   
            //    version: "1.3.0"
            //},
			},
				
        // define the map window
        map: {
            id: "mymap", // id needed to reference map in portalConfig above
            title: "Map",
            projection: "EPSG:900913",
            units: "m",
            maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34], 
           //center: [-9264594.758211, 1123072.3184791 ], zoom: 8,             //Costa Rica
           //center: [0, 2000000 ], zoom: 3,									//world
           //  center: [2500000, -500000 ], zoom: 5,                              //Tanzania
             center: [13000000, 1000000 ], zoom: 5,                              //Tanzania

           
			
			
			
			
		// specific map-layers from any of the already defined servers that are added to map when loaded	
            layers: [{
            	source: "bioversity",
               	name: "banana:banana_areas_shape", //from PostGIS database new variables
                title: "Banana Production Areas",
                projection: "EPSG:4326",
                queryable: true,
				opacity: 0.5,
                selected: false
              },{
              	source: "bioversity",
               	name: "banana_mapper:BananaAccessions", //from PostGIS database new variables
                title: "Banana Accessions",
                projection: "EPSG:4326",
                queryable: true,
				opacity: 1,
                selected: true
              },{
            //    source: "develop",
            //    name: "banana-mapper:Banana_areas_shape", 
            //    title: "Banana areas shape to link",
            //    projection:   "EPSG:4326",
            //    queryable: true,
            //    selected: true
            // },{
            //	source: "mapspam",
            //   name: "BANP_R_H",
            //   title: "Rainfed Bananas ans Plantain Ha",
            //   visibility: false,
            //   group: "background"
            //},{	
                source: "sedac",
                name: "gpw-v3:gpw-v3-population-density_2000",
                title: "Population density",
                type: "OpenLayers.Layer",
                args: ["Blank"],
                visibility: false,
                group: "background"
            },{
                source: "sedac",
                name: "povmap:povmap-global-subnational-infant-mortality-rates_2000",
                title: "Child Mortality",
                type: "OpenLayers.Layer",
                args: ["Blank"],
                visibility: false,
                group: "background"
            },{
                source: "ol",
                type: "OpenLayers.Layer",
                args: ["Blank background"],
                visibility: false,
                group: "background"
            },{
                source: "mapquest",
                name: "osm",
                 title: "Open Street Map",
                group: "background",
				projection:   "EPSG:900913"
            },{
				source: "google",
				name: "SATELLITE",
				group: "background",
			},{
				source: "google",
				name: "ROADMAP",
				group: "background",
			},
			],
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }]
        }
    });
    
      
    
    
});