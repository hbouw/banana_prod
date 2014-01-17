//This is the Banana Mapper. It is based on viewer.js and was edited from there

var app,combo,curArea;
var login=false;
var production_systemfilter="";


//style for featureInfo highlight
var featureInfoStyle = new OpenLayers.StyleMap({
	pointRadius: 8,
	graphicName: "circle",
	fillOpacity: 0.4,
	fillColor: "#ccccff",
	strokeWidth: 2,
	strokeColor: "#9999ff"
});


function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
 
    return temp;
}



Ext.onReady(function() {
	lookupsCombo = cloneObject(lookups);
	pestsLookups['pest_diseases'].unshift(["No pests and diseases","No pests and diseases"]);
	lookupsCombo['cultivar_type'].unshift(["All cultivars","All cultivars"]);
	countryLookup['regions'].unshift(["All regions",'All regions']);
	countryLookup['countries'].unshift(["All countries",'All countries']);
	lookupsCombo['yield_tendency5'].unshift(["-9999","No data"]);	
	lookupsCombo['production_tendency5'].unshift(["-9999","No data"]);	
	lookupsCombo['production_tendency5'].unshift(["*","All selected"]);	
	lookupsCombo['yield_tendency5'].unshift(["*","All selected"]);	
	lookupsCombo['use'].unshift(["-9999","No data"]);
	lookupsCombo['use'].unshift(["*","All selected"]);
	lookupsCombo['irrigation'].forEach(function(item){
			item[0]++;
	});
	lookupsCombo['herbicides'].forEach(function(item){
			item[0]++;
	});
	lookupsCombo['fungicides'].forEach(function(item){
			item[0]++;
	});
	lookupsCombo['irrigation'].unshift(["-9999","No data"]);
	lookupsCombo['irrigation'].unshift(["*","All selected"]);
	lookupsCombo['herbicides'].unshift(["-9999","No data"]);
	lookupsCombo['herbicides'].unshift(["*","All selected"]);
	lookupsCombo['fungicides'].unshift(["-9999","No data"]);
	lookupsCombo['fungicides'].unshift(["*","All selected"]);
	// change 0 value into 2, otherwise causes problems with default value combobox
	lookupsCombo['yield_tendency5'][3][0]=3;
	lookupsCombo['production_tendency5'][3][0]=3;
	lookupsCombo['herbicides'][2][0]=4;

	Ext.QuickTips.init();
	var tip = new Ext.slider.Tip({
        getText: function(thumb){
            return String.format('<b>Value={0}</b>', thumb.value);
        }
    });
	
	
    app = new gxp.Viewer({
        proxy: "proxy.php?url=",
        
        //this is the page layout 
        portalConfig: {
            id:"MapLayout",
            layout: "border", //
			//align: "stretch",
			//width:  1000,
		    //height: 800,
		
		    //Define 
		    //Insert a header
            items: [
               { 	
               	region: "north",
               	id: "header",
				bodyStyle:"background-image:url('./bootstrap/img/hero_background.jpg');",
				bodyCssClass:"x-plain",
             	height: 60,
				border: true,
	           contentEl:'Head_html'
			//Insert main panel with tabs                
                },{
                region: "center",
                id: "mappanel",
                border: "true",
                xtype: "tabpanel",
                activeTab: 0, // choose tab 0 (map) to be visible on initialization
                border: true,
                items: ["mymap", 
					{title: "Help",padding:15,contentEl:'Help'},  
					]
                },{
				//container for the Production systems information
                region: "east",
                id: "data",
				title: "Production system details",
                layout:'accordion',
				collapsible: true,
            	collapseMode: "mini",
            	collapsed: false,
            	border: true,
               	width: 350,
				//add a "add" button to the topbar of this panel
            	 tbar: {
					items: [
						"->",
						{
							xtype:"button",
							hidden: true,//hidden by default
							id:"btAddPS",
							text: "Add",
							tooltip: "Add production system",
							iconCls: "add",
							handler: function(){
								if (!curArea > 0) {
									alert('Select a production region first')
								} else {
									//add to database and refresh panel
									Ext.Ajax.request({
										url:"createPS.php?area_id="+curArea,
										method:"GET",
										success : function(result){
											try {
												var resp = Ext.util.JSON.decode(result.responseText);
												if (resp.status=='true'){
													fillPanel(curArea);
												} else if (resp.message.indexOf("duplicate key") !=-1) {
													alert('Failed, another production system exists with empty cultivar-type/association. Correct it before continuing.');
												} else {
													alert('Failed: '+ resp.message);
												}
											} catch (e) {
												alert(e.message);
											}
									   },
									   failure : function(response, options){ 
										   alert('Insert failed.');
									   }

									})
									
								}
							},
							scope: this
						}
					]}        	
            	},{
            	// container for the layers in the map
            	region: "west",
             	id: "westcontainer",		
             	border: true,
             	xtype: "panel",
             	collapsible: true,
                collapseMode: "mini",
            	collapsed: false,
                width: 200,
                // Listener to add tooltips on filters. First created tooltips to the gxpviewer.app ready event (see line ~640), but this stopped working for some reason.
                items: [
                	{
                	title: "Map layers",
                	id:"layerlegend",
                	xtype: "panel",	
                	collapsible:true,
                	 width: 200,
                	collapseMode: 'mini',
					defaults: {
                                width: "100%",
                                layout: "fit"
               		},
					items: [
						{
                		id: "treepanel",
						defaults: {
							//autoHeight:true,		//try to fit height to content
							autoScroll:true
							},
						
						height: 175,
                		border: false,
                		
						}
						]
					}
					,
                	{
                	title: "Search",
                	id: "searchpanel",
					 width: 200,
					 height: 360,
					 autoScroll:true,
                	border: false,
                	collapsible:true,
                	collapsed: true,
                	collapseMode: 'mini',
                	items:
                	[
                	{
        			 border: false,
        			 
        			 id: 'search',
        			 items: [
                	
						{
							title: "Countries",
							id: "countryfilter",
							xtype: "checkboxcombo"	,
							width: 196,
							forceSelection: false,
							emptyText:'Countries',
							allowBlank: true,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: countryLookup ['countries']              		
								}),
							listeners: {
    							blur	: function() {
    							
    							var combo= Ext.getCmp("countryfilter");
    							var countrylist= combo.getValue();
    							var countries = countrylist.split(",");
    							
    							
    							countries.forEach(function(item){
    								if (item=="All countries" | item==""){
    									Ext.getCmp("countryfilter").setValue("All countries");
    								}
    							});
    							}
  							}
						},
						{
							title: "Regions",
							id: "regionfilter",
							xtype: "checkboxcombo"	,
							width: 196,
							forceSelection: false,
							emptyText:'Regions',
							allowBlank: true,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: countryLookup ['regions']              		
								}),
							listeners: {
							blur	: function() {
							var combo= Ext.getCmp("regionfilter");
							var regionlist= combo.getValue();
							var regions = regionlist.split(",");
							regions.forEach(function(item){
								if (item=="All regions" | item==""){
									Ext.getCmp("regionfilter").setValue("All regions");
								}
							});
						}}},
						{
							title: "Cultivar Type",
							id: "cultivarfilter",
							xtype: "checkboxcombo",
							width: 196,
							forceSelection: false,
							emptyText:'Cultivars',
							allowBlank: true,
							valueField: 'id',
							displayField: 'label' ,

							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data : lookupsCombo['cultivar_type'],						
							}),
							listeners: {
							blur	: function() {
							
							var combo= Ext.getCmp("cultivarfilter");
							var cultlist= combo.getValue();
							var cults = cultlist.split(",");
							
							
							cults.forEach(function(item){
								if (item=="All cultivars" | item==""){
									Ext.getCmp("cultivarfilter").setValue("All cultivars");
								}
							});
					
						}}
						}            	,
						{
							xtype: 'checkboxcombo',
							id: "pestsfilter",
							hiddenName: 'field_name',
						    width: 196,
							fieldLabel: 'Field Label',
							store:new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data : pestsLookups['pest_diseases']
							}) ,
							valueField: 'id',
							displayField: 'label',
							allowBlank: true,
							emptyText: 'Pests and diseases',
							listeners: {
							blur	: function() {
							
							var combo= Ext.getCmp("pestsfilter");
							var pestslist= combo.getValue();
							var pests = pestslist.split(",");
				
							pests.forEach(function(item){
								if (item=="No pests and diseases" | item==""){
									Ext.getCmp("pestsfilter").setValue("No pests and diseases");
								}
							});
						}}
						}
						
        			,
						 {
							title: "Yield tendency (past 5 years)",
							id: "yieldtendency",
							xtype: "combo"	,
							width: 196,	
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'Yield tendency',
							selectOnFocus:true,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookupsCombo ['yield_tendency5']              		
								}),
							listeners: {
							blur	: function() {
							
							var combo= Ext.getCmp("yieldtendency");
							var value= combo.getValue();
							if (value=="*"){
							combo.reset();
							}
							}
							}	
							
								
				
						},
						{
							title: "Production tendency (past 5 years)",
							id: "productiontendency",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'Production tendency',
							selectOnFocus:true,
							width: 196,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookupsCombo ['production_tendency5']              		
								}),
								listeners: {
							blur	: function() {
							
							var combo= Ext.getCmp("productiontendency");
							var value= combo.getValue();
							if (value=="*"){
							combo.reset();
							}
							}
							}
						},
						{
							title: "Primary use Musa",
							id: "primaryusemusa",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'Primary use Musa',
							selectOnFocus:true,
							width: 196,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookupsCombo ['use']              		
								}),
							listeners: {
							blur	: function() {
							
							var combo= Ext.getCmp("primaryusemusa");
							var value= combo.getValue();
							if (value=="*"){
							combo.reset();
							}
							}
							}
						},
						{
							title: "Use of irrigation",
							id: "irrigation",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'Use of irrigation',
							selectOnFocus:true,
							width: 196,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookupsCombo ['irrigation']              		
								}),
							listeners: {
							blur	: function() {
							var combo= Ext.getCmp("irrigation");
							var value= combo.getValue();
							if (value=="*"){
							combo.reset();
							}
							}
							}
						},
						{
							title: "Use of herbicides",
							id: "herbicides",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'Use of herbicides',
							selectOnFocus:true,
							width: 196,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookupsCombo ['herbicides']              		
								}),
							listeners: {
							blur	: function() {
							var combo= Ext.getCmp("herbicides");
							var value= combo.getValue();
							if (value=="*"){
							combo.reset();
							}
							}
							}
						}
						,
						{
							title: "Use of fungicides",
							id: "fungicides",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'Use of fungicides',
							selectOnFocus:true,
							width: 196,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookupsCombo ['fungicides']              		
								}),
							listeners: {
							blur	: function() {
							var combo= Ext.getCmp("fungicides");
							var value= combo.getValue();
							if (value=="*"){
							combo.reset();
							}
							}
							}
						}, {
        			 xtype: 'panel',
        			 id: 'productionfilter',
        			 border: false,
        			 width: '100%',
        			 items: [
							{
							xtype: 'label', 
							text: 'Production minimum (ton)',
							style: 'font-size:11px; padding:5px;',
							border: false,
							width: 196
							},
							{
								title: "Production Minimum",
								id: "productionmin",
								xtype: "textfield",
								border: false,
								value: totalprodMin,
								width: 196,

								regex:/^([0-9])/,
								validator: function(v) {
									return true;
								}
							},
							{
							xtype: 'label', 
							width: 196,
							border: false,
							text: 'Production maximum (ton)',
							style: 'font-size:11px; padding:5px;'
							},
							{
								title: "Production Maximum",
								id: "productionmax",
								xtype: "textfield",
								value: totalprodMax,
								border: false,
								width: 196,
								regex:/^([0-9])/,
								validator: function(v) {					
									return true;
								}
							}]}
        			 ]     			
        			},
        			{
        			 xtype: 'panel',
        			 id: 'applyfilters',
        			 
        			 border: false,
        			 width: '100%',
        			 id: 'applyfilters',
        			 items: [
        			{
                		buttons: [{
                		tooltip: 'Apply filters to layer "Production Systems"',
                			id: 'applyfilter',
							text: 'Apply',
							width:55,
							handler: function()
								{
									production_systemfilter="";
									var comboCult = Ext.getCmp("cultivarfilter");
									processCultivarFilter(comboCult);
									var comboCountry = Ext.getCmp("countryfilter");
									processCountryFilter(comboCountry);									
									var comboRegion = Ext.getCmp("regionfilter");
									processRegionFilter(comboRegion);		
									var comboPests = Ext.getCmp("pestsfilter");
									processPestsFilter(	comboPests);
									var comboYield = Ext.getCmp("yieldtendency");
									processYieldFilter(comboYield);
									var comboProduction = Ext.getCmp("productiontendency");
									processProductFilter(comboProduction);
									var comboUse = Ext.getCmp("primaryusemusa");
									processUseFilter(comboUse);
									var comboIrrigation = Ext.getCmp("irrigation");
									processIrrigationFilter(comboIrrigation);	
									var comboHerbicides = Ext.getCmp("herbicides");
									processHerbicidesFilter(comboHerbicides);
									var comboFungicides = Ext.getCmp("fungicides");
									processFungicidesFilter (comboFungicides);
									var fieldmin = Ext.getCmp("productionmin");
									var fieldmax = Ext.getCmp("productionmax");
									processTotalProd(fieldmin, fieldmax);
									applyFilter();
									// clear filter
									
		            			}
       						},{
            			text: 'Reset',
            			tooltip: 'Reset all filters',
            			width: 55,
						handler: function()
						{
							production_systemfilter="";
							Ext.getCmp("regionfilter").reset();
							Ext.getCmp("pestsfilter").reset();
							Ext.getCmp("countryfilter").reset();
							Ext.getCmp("cultivarfilter").reset();
							Ext.getCmp("fungicides").reset();
							Ext.getCmp("herbicides").reset();
							Ext.getCmp("irrigation").reset();
							Ext.getCmp("primaryusemusa").reset();
							Ext.getCmp("productiontendency").reset();
							Ext.getCmp("yieldtendency").reset();
							applyFilter();
						}
        				}
        				,{
        				id: 'downloadselection',
						text: 'Download',
						tooltip: 'Download data from layer "Production Systems" for offline use',
						width: 55,
						handler: function(){
							/*var config = 
							{
            
        };
   							var win = Ext.ComponentMgr.create(config);
    						win.show();*/
    						var window = Ext.getCmp('downloadWindow');
    						
    						if (window == null)
    						{
    						   						
    						 var win = new Ext.Window(downloadWindowConfig);
						    win.show();
    }
    						
						}
        				}
        				]
        			}]}		
                	]
                	
                
						
						}
						,
					{
                		title: "Legend",
                		id:"legendpanel",
                		collapsible:true,
                		collapsed: true,
                		xtype: 'panel',
                		 width: 200,
                		 height: 300, 
                		 
                	    collapseMode: 'mini',
                        defaults: {
							autoScroll:true
							},
                		border: false,
                		
						}
						]
                },{
//Insert a footer						
                id: "footer",
             	height: 200,
             	region: "south",
                xtype: "panel",
				collapsible: true,
            	collapseMode: "mini",
            	collapsed: true,
				title:'Search results',
                border: true
            }],
            bbar: {id: "mybbar",
            	xtype: "container",
            	region: "south",
            	height: 150
            }
			},
        
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
           actionTarget: "tree.tbar"
         },
         {
           ptype: "gxp_removelayer",
           actionTarget: ["tree.tbar", "tree.contextMenu"] //add button 'remove layer' to the tree.tbar to remove in tree selected layer
         },{
           ptype: "gxp_layerproperties",
           actionTarget: ["tree.tbar", "tree.contextMenu"] //add button 'layer properties' to the tree.tbar       
        },{	
		   ptype: "gxp_zoomtoextent",
           actionTarget: "map.tbar",//add button 'zoom to extent' to the map.tbar
           index: 1
        },
		{
           ptype: "gxp_zoom",
           actionTarget: "map.tbar"    //add buttons 'zoom out' and 'zoom in' to the map.tbar
        },{
            ptype: "gxp_legend",
			outputTarget: "legendpanel"
		},
		{	
           ptype: "gxp_measure", 	//add button to measure length and area
           toggleGroup: "layertools",
           controlOptions: {immediate: true},
           showButtonText: false,
           actionTarget: "map.tbar"
        },{  	
		   ptype: "gxp_wmsgetfeatureinfo",	//add button to get info of feature pointed at
            actionTarget: "map.tbar",
            defaultAction: 4,
			autoActivate: false,			//ToDo at startup this function needs to be on!
			format: "grid",
            outputConfig: {
                width: 350,
                height: 150
            	},
            itemConfig: {
            		
					//replace field area_id with a link to view production systems
            		customRenderers: {
						area_id:function(v) { 
							return '<a href="javascript:void(fillPanel(\''+v+'\'))">View production systems</a>'
						}
					}
				},
            toggleGroup: "layertools",
            highlightFeatures: true,
			listeners: {
				render: function (title, feature, config){
					addHighlight(feature);
				}
				
			}
        },{
        	//define snapping agent to snap new feature borders to existing borders 
        	ptype: "gxp_snappingagent",
    		id: "snapping-agent",
    		targets: [{
        		source: "bioversity",
        		name: gs_workspace+":banana_areas"
    				 }]	
      
        },{  	
        // shared FeatureManager for feature editing, grid and querying
            ptype: "gxp_featuremanager",
            id: "featuremanager",
            maxFeatures: 50,
			geometryType:'Geometry',
            paging: true
          
         },{
    		ptype: "gxp_featureeditor",
            featureManager: "featuremanager",
            snappingAgent: "snapping-agent",
			autoLoadFeature: true,
            //supportAbstractGeometry: true,  //only necessary to be able to add point and lines
            outputConfig: {panIn: true,
            			   width:250,
            			   height:200},
            closeOnSave: true,
            readOnly: false,
			modifyOnly: false,
            toggleGroup: "layertools",
			itemConfig: {
					customRenderers: {
						area_id:function(v) { 
							return '<a href="javascript:void(fillPanel(\''+v+'\'))">View production systems</a>'
						}
					},
					customEditors: {
						area_id:function(v) { 
							return new Ext.grid.GridEditor(new Ext.form.TextField ({disabled : true}));
						}
					}
			}
         },{               	
            ptype: "gxp_featuregrid",
            featureManager: "featuremanager",
            autoLoadFeature: true,
            showTotalResults: true,
            alwaysDisplayOnMap: false,
            displayMode: "all",
            outputConfig: {
                id: "featuregrid",
                height: 175
				},
            outputTarget: "footer"
         },{
       		ptype: "gxp_print",															
            //customParams: {outputFilename: 'BananaMapper-Print'},
            printService: gs_url + "/pdf/",	
            actionTarget: "map.tbar",
            notAllNotPrintableText: "Not All Layers Can Be Printed",
            includeLegend: true,
            sourceMap: OpenLayers.Map
		},{
            ptype: "downloadtool",
            actionTarget: ["tree.contextMenu"]
        },
        
        /*{
        ptype:"gxp_zoomtolayerextent",
        actionTarget: ["map.tbar", "tree.contextMenu"],
        featureManager: "featuremanager",
        autoActivate: true
        
        },*/
        
		{
       	    ptype: "gxp_queryform",
            featureManager: "featuremanager",
            outputConfig: {
                title: "Query",
                width: 320
				},  
            //actionTarget: ["map.tbar", "tree.contextMenu"],  			// icon in map.tbar
            actionTarget: ["featuregrid.bbar", "tree.contextMenu"],		//icon below        
            appendActions: true
        }
		],
        
        // Define sources (map servers that publish WMS/WFS) that are referred to when layers are added
        defaultSourceType: "gxp_wmssource",
        
		sources: {
			bioversity: {
				url: gs_url + "/wms",	//links to config.inc	
				version:  "1.1.1"
			},
			sedac_p: {
				url: "http://sedac.ciesin.columbia.edu/geoserver/povmap/wms",
				version:  "1.1.1"
			},
			sedac_g: {
				url: "http://sedac.ciesin.columbia.edu/geoserver/gpw-v3/wms",
				version:  "1.1.1"
			},
			mapquest: {
				ptype: "gxp_mapquestsource"
			},
			ol: {
				ptype: "gxp_olsource"
			},
			google: {
				ptype: "gxp_googlesource"
			}
		},
				
        // define the map window
        map: {
            id: "mymap", // id needed to reference map in portalConfig above
            title: "Map",
            projection: "EPSG:900913",
            units: "m",
            maxExtent: [-20037508, -20037508, 20037508, 20037508], 
            //	center: [-9264594.758211, 1123072.3184791 ], zoom: 8,           //Costa Rica
            //	center: [3000000, 2000000 ], zoom: 3,							//world
			  center: [-800000, -800000 ], zoom: 3,                             	
			//  center: [13000000, 2700000 ], zoom: 8,                           //Taiwan	
           	//  center: [13000000, 2000000 ], zoom: 3,                          	//Indonesia
		   
		   // specific map-layers from any of the already defined servers that are added to map when loaded	
            layers: [{
			/*
			//add pop density layer
                source: "sedac_g",
                name: "gpw-v3:gpw-v3-population-density_2000",
                title: "Population density",
                type: "OpenLayers.Layer",
                args: ["Blank"],
                visibility: false
            },{
		    add poverty layer
                source: "sedac_p",
                name: "povmap:povmap-global-subnational-infant-mortality-rates_2000",
                title: "Child Mortality",
                type: "OpenLayers.Layer",
                args: ["Blank"],
                visibility: false
			},{*/
			    source: "bioversity",
                name: gs_workspace+":country_boundaries", //from Geoserver
                title: "Country Boundaries",
				group: "background",
				projection: "EPSG:4326",
				tiled:false,
                queryable: false,
				opacity: 0.5,
				visibility: false
			},{	
			//add production areas (editable features)
                source: "bioversity",
               	name: gs_workspace+":banana_areas", //from PostGIS database new variables
                title: "Production Areas",
                projection: "EPSG:4326",
				tiled:false,
                queryable: false,
				opacity: 0.6,
				visibility: true,
				select:true
            },{   
			//add production areas variables to view (for lookup and export functionality)
                source: "bioversity",
               	name: gs_workspace+":banana_systems", //om PostGIS database new variables
                title: "Production Systems",
                projection: "EPSG:4326",
				tiled:false,
                queryable: false,
				//opacity: 0.5,
				visibility: true
            },{
			//add production areas variables to view (for lookup and export functionality)
            /*    source: "bioversity",
               	name: gs_workspace+":System variables", //om PostGIS database new variables
                title: "System Variables",
                projection: "EPSG:4326",
				tiled:false,
                queryable: false,
				opacity: 0.5,
				visibility: true
            },{*/
				source: "google",
				name: "ROADMAP",
				group: "background",
				visibility: false
            },{
				source: "google",
				name: "SATELLITE",
				group: "background",
				visibility: false
			},{
			//	Nice background map similar to Google but open source. Cant get it to be printed though, so removed
                source: "mapquest",
                name: "osm",
                 title: "Open Street Map",
                group: "background",
				projection:   "EPSG:900913"
			}],
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }]
        },listeners: {
                ready: function () {
                    //add higlight layer
                    app.mapPanel.map.addLayer(new OpenLayers.Layer.Vector("highlightLayer", { styleMap: featureInfoStyle, displayInLayerSwitcher: false }));
					//Ext.QuickTips.register({ target: Ext.getCmp('pestsfilter').getEl(), text: 'Choose the active layer for search and query' }); 
					Ext.QuickTips.register({ target: Ext.getCmp('pestsfilter').getEl(), text: 'Search for systems with occurring diseases' }); 
							Ext.QuickTips.register({ target: Ext.getCmp('regionfilter').getEl(), text: 'Search for systems within regions' }); 
							Ext.QuickTips.register({ target: Ext.getCmp('countryfilter').getEl(), text: 'Search for systems within countries' }); 
							Ext.QuickTips.register({ target: Ext.getCmp('cultivarfilter').getEl(), text: 'Search for systems based on cultivar' }); 
       						Ext.QuickTips.register({ target: Ext.getCmp('yieldtendency').getEl(), text: 'Search for systems based on tendency in yield in past 5 years' }); 
     						Ext.QuickTips.register({ target: Ext.getCmp('productiontendency').getEl(), text: 'Search for systems based on tendency in production area in past 5 years' }); 
     						Ext.QuickTips.register({ target: Ext.getCmp('primaryusemusa').getEl(), text: 'Search for systems based use of the crops' }); 
     						Ext.QuickTips.register({ target: Ext.getCmp('fungicides').getEl(), text: 'Search for systems based on use of fungicides' }); 
     						Ext.QuickTips.register({ target: Ext.getCmp('herbicides').getEl(), text: 'Search for systems based on use of herbicides' }); 
     						Ext.QuickTips.register({ target: Ext.getCmp('irrigation').getEl(), text: 'Search for systems based on user of irrigation' }); 
					     	Ext.QuickTips.register({ target: Ext.getCmp('productionmin').getEl(), text: 'Enter lower limit for production in ton \'s' }); 
					     	Ext.QuickTips.register({ target: Ext.getCmp('productionmax').getEl(), text: 'Enter upper limit for production in ton \'s' });	
							Ext.getCmp('featureinfobutton')
					}
				}
    });
});    
  
var store;
var currentAreaFilter = "";
Ext.onReady(function(){
 
 
 
 
//The datarecord to hold prodsys, used by reader 
 var Area = Ext.data.Record.create([
		{name: 'area_id'}, 
		{name:'cultivar_type',type: 'string'}, 
		{name:'cultivar_name',type: 'string'}, 
		{name:'area_product',type: 'string'}, 
		{name:'yield',type: 'string'}, 
		{name:'density',type: 'string'}, 
		{name:'use',type: 'string'}, 
		{name:'association',type: 'string'}, 
		{name:'other_cult',type: 'string'}, 
		{name:'number_hh',type: 'string'}, 
		{name:'inputs',type: 'string'}, 
		{name:'irrigation',type: 'string'}, 
		{name:'chem_fert',type: 'string'}, 
		{name:'org_fert',type: 'string'}, 
		{name:'herbicides',type: 'string'}, 
		{name:'fungicides',type: 'string'}, 
		{name:'nematicides',type: 'string'}, 
		{name:'insecticides',type: 'string'}, 
		{name:'p_goodeyi',type: 'string'}, 
		{name:'p_coffea',type: 'string'}, 
		{name:'r_similis',type: 'string'}, 
		{name:'meloidogyne',type: 'string'}, 
		{name:'h_multici',type: 'string'}, 
		{name:'moko_bugtok',type: 'string'}, 
		{name:'bxw',type: 'string'}, 
		{name:'blood_disease',type: 'string'}, 
		{name:'erwinia',type: 'string'}, 
		{name:'other_bac_dis',type: 'string'}, 
		{name:'oth_bacdis_im',type: 'string'},
		{name:'stem_weevil',type: 'string'},
		{name:'corm_weevil',type: 'string'},
		{name:'black_streak',type: 'string'}, 
		{name:'yel_sigatoka',type: 'string'}, 
		{name:'other_leaf_dis',type: 'string'}, 
		{name:'oth_leafdis_im',type: 'string'}, 
		{name:'fus_race1',type: 'string'}, 
		{name:'fus_race2',type: 'string'}, 
		{name:'fus_race4',type: 'string'}, 
		{name:'fus_subtrop4',type: 'string'}, 
		{name:'other_fungal',type: 'string'},
		{name:'oth_fungal_im',type: 'string'},
		{name:'bbtv',type: 'string'}, 
		{name:'bsv',type: 'string'}, 
		{name:'other_virus',type: 'string'},
		{name:'oth_virus_im',type: 'string'}
		
		
		
		
]);
	
	
	//Reader to get prod sys from json
	var dReader = new Ext.data.JsonReader({
	totalProperty: 'total',
	successProperty: 'success',
	idProperty: 'id',
	root: 'areas',
	messageProperty: 'message'  
	},
	Area); 
	
	//The new DataWriter component, don't think is used
   var dWriter = new Ext.data.JsonWriter({
       encode: true,
       writeAllFields: true
   });

   //which file to call, of what type
	var dProxy = new Ext.data.HttpProxy({
		api: {
		read : 'AreasShapeToVariables.php'
		//create : 'CreatePS.php'
		//update: 'UpdatePS.php'
		//destroy: 'DeletePS.php'
		}
	});
 
 //actual store to store retrieved prodsys
 store = new Ext.data.JsonStore({
    // store configs
    autoDestroy: true,
	autoLoad: false, 
	sortInfo: false,
	proxy: dProxy,
	reader: dReader,
	writer: dWriter, 
    root: 'areas',
    fields: [
			'id','area_id','cultivar_type','cultivar_name','association','other_cult','area_product','yield','total_prod','density','number_hh','use','production_tendency5','yield_tendency5','inputs','irrigation','chem_fert','org_fert','herbicides','fungicides','nematicides','insecticides','p_goodeyi','p_coffea','r_similis','meloidogyne','h_multici','moko_bugtok','bxw','blood_disease','erwinia','other_bac_dis','oth_bacdis_im','stem_weevil','corm_weevil','black_streak','yel_sigatoka','eumusae','other_leaf_dis','oth_leafdis_im','fus_race1','fus_race2','fus_race4','fus_subtrop4','other_fungal','oth_fungal_im','bbtv','bsv','other_virus','oth_virus_im'
			],
			listeners: {
				load: {
					fn: function(store, records, options){
					//remove exisiting panels form data
					Ext.getCmp("data").removeAll();		
					if (store.data.items.length == 0){
						Ext.getCmp("data").add({html:'No production systems found',padding:"10"});
						Ext.getCmp("data").doLayout();
					} else {		
					  store.each(
						function(record){
							  var grid = new gxp.AreaPropertyGrid({
								//these are set as comboboxes
								customRenderers: {
									'cultivar_type': function(v){ return getLookup("cultivar_type",v) },
									'association': function(v){ return getLookup("association",v) },
									'use': function(v){ return getLookup("use",v) },
									'inputs': function(v){ return getLookup("inputs",v) },
									'irrigation': function(v){ return getLookup("irrigation",v) },
									'herbicides': function(v){ return getLookup("herbicides",v) },
									'fungicides': function(v){ return getLookup("fungicides",v) },
									'nematicides': function(v){ return getLookup("nematicides",v) },
									'insecticides': function(v){ return getLookup("insecticides",v) },
									'p_goodeyi': function(v){ return getLookup("p_goodeyi",v) },
									'p_coffea': function(v){ return getLookup("p_coffea",v) },
									'r_similis': function(v){ return getLookup("r_similis",v) },
									'meloidogyne': function(v){ return getLookup("meloidogyne",v) },
									'h_multici': function(v){ return getLookup("h_multici",v) },
									'moko_bugtok': function(v){ return getLookup("moko_bugtok",v) },
									'bxw': function(v){ return getLookup("bxw",v) },
									'blood_disease': function(v){ return getLookup("blood_disease",v) },
									'erwinia': function(v){ return getLookup("erwinia",v) },
									'oth_bacdis_im': function(v){ return getLookup("oth_bacdis_im",v) },
									'stem_weevil': function(v){ return getLookup("stem_weevil",v) },
									'corm_weevil': function(v){ return getLookup("corm_weevil",v) },								
									'black_streak': function(v){ return getLookup("black_streak",v) },
									'yel_sigatoka': function(v){ return getLookup("yel_sigatoka",v) },
									'eumusae': function(v){ return getLookup("eumusae",v) },
									'oth_leafdis_im': function(v){ return getLookup("oth_leafdis_im",v) },
									'fus_race1': function(v){ return getLookup("fus_race1",v) },
									'fus_race2': function(v){ return getLookup("fus_race2",v) },
									'fus_race4': function(v){ return getLookup("fus_race4",v) },
									'fus_subtrop4': function(v){ return getLookup("fus_subtrop4",v) },
									'oth_fungal_im': function(v){ return getLookup("oth_fungal_im",v) },
									'bbtv': function(v){ return getLookup("bbtv",v) },
									'bsv': function(v){ return getLookup("bsv",v) },
									'yield_tendency5': function(v){ return getLookup("yield_tendency5",v) },
									'production_tendency5': function(v){ return getLookup("production_tendency5",v) },
									'oth_virus_im': function(v){ return getLookup("oth_virus_im",v) }
									
								},
								customEditors: {
									'area_id': new Ext.grid.GridEditor(new Ext.form.TextField ({disabled : true})),
									'cultivar_type': getEditor('cultivar_type'),
									'association': getEditor('association'),
									'use': getEditor('use'),
									'inputs': getEditor('inputs'),
									'irrigation': getEditor('irrigation'),
									'herbicides': getEditor('herbicides'),
									'fungicides': getEditor('fungicides'),
									'nematicides': getEditor('nematicides'),
									'insecticides': getEditor('insecticides'),
									'p_goodeyi': getEditor('p_goodeyi'),
									'p_coffea': getEditor('p_coffea'),
									'r_similis': getEditor('r_similis'),
									'meloidogyne': getEditor('meloidogyne'),
									'h_multici': getEditor('h_multici'),
									'moko_bugtok': getEditor('moko_bugtok'),
									'bxw': getEditor('bxw'),
									'blood_disease': getEditor('blood_disease'),
									'erwinia': getEditor('erwinia'),
									'oth_bacdis_im': getEditor('oth_bacdis_im'),
									'stem_weevil': getEditor('stem_weevil'),
									'corm_weevil': getEditor('corm_weevil'),
									'black_streak': getEditor('black_streak'),
									'yel_sigatoka': getEditor('yel_sigatoka'),
									'eumusae': getEditor('eumusae'),
									'oth_leafdis_im': getEditor('oth_leafdis_im'),
									'fus_race1': getEditor('fus_race1'),
									'fus_race2': getEditor('fus_race2'),
									'fus_race4': getEditor('fus_race4'),
									'fus_subtrop4': getEditor('fus_subtrop4'),
									'oth_fungal_im': getEditor('oth_fungal_im'),
									'bbtv': getEditor('bbtv'),
									'bsv': getEditor('bsv'),
									'yield_tendency5': getEditor('yield_tendency5'),
									'production_tendency5': getEditor('production_tendency5') ,
									'oth_virus_im': getEditor('oth_virus_im')
								},
								//custom field headers
								propertyNames: {
									'cultivar_name':	'Cultivar name',
									'cultivar_type':	'Cultivar type',
									'area_product':		'Area in production (ha)',
									'yield':			'Production per hectare',
									'density':			'Musa density (mats/ha)',
									'total_prod': 		'Total Production (Area(ha) * yield (tons/ha)',
									'use':				'Primary use of Musa',
									'association':		'Crop Association',
									'other_cult':		'Other Musa cultivars',
									'number_hh':		'Number households',
									'inputs':			'Use purchased units',
									'irrigation':		'Use of irrigation',
									'chem_fert':		'Chemical fertilizer (kg N/ha/yr)',
									'org_fert':			'Organic fertilizer (kg N/ha/yr)',
									'herbicides':		'Use of herbicides',
									'fungicides':		'Use of fungicides',
									'nematicides':		'Use of nematicides',
									'insecticides':		'Use of insecticides',
									'p_goodeyi':		'Importance P. goodeyi',
									'p_coffea':			'Importance P. coffea',
									'r_similis':		'Importance R. similis',
									'meloidogyne':		'Importance Meloidogyne spp.',
									'h_multici':		'Importance H. multicinctus',
									'moko_bugtok':		'Importance Moko/Bugtok',
									'bxw':				'Importance BXW',
									'blood_disease':	'Importance Blood Disease',
									'erwinia':			'Importance Erwinia',
									'other_bac_dis':	'Name other bacterial diseases',
									'oth_bacdis_im':	'Impact other bacterial diseases',
									'stem_weevil':		'Importance of stem weevil',
									'corm_weevil':		'Importance of corm weevil',
									'black_streak':		'Importance black leaf streak',
									'yel_sigatoka':		'Importance yellow sigatoka',
									'eumusae':			'Importance eumusae leaf streak',
									'other_leaf_dis':	'Name other leaf diseases',
									'oth_leafdis_im':	'Impact other leaf diseases',
									'fus_race1':		'Importance Foc R 1',
									'fus_race2':		'Importance Foc R 2',
									'fus_race4':		'Importance Foc TR 4',
									'fus_subtrop4':		'Importance Foc STR 4',
									'other_fungal':		'Name other fungal diseases',	
									'oth_fungal_im':  	'Impact other fungal diseases',
									'bbtv':				'Importance BBTV',
									'bsv':				'Importance BSV',
									'other_virus':		'Name other virus',
									'oth_virus_im':		'Impact other virus',
									'yield_tendency5':  'Yield tendency past 5 years',
									'production_tendency5': 'Production tendency past 5 years'
									
								}
							});
						 
							//add here if cult==0 -> edit= false for association and cultivar_type
							delete grid.getStore().sortInfo; // Remove default sorting
							grid.getColumnModel().getColumnById('name').sortable = false; // set sorting of first column to false
							grid.setSource(record.data); // Now load data
							grid.title = getLookup("cultivar_type",record.data["cultivar_type"]) + ' ' + getLookup("association",record.data["association"]);
							Ext.getCmp("data").add(	grid );
						});
						Ext.getCmp("data").doLayout();
					}
                }
			}
		}
	});
	
});

//function called from area-featureinfo panel
function fillPanel(area){
	store.load({params:{area_id:area}});
	if (user) Ext.getCmp("btAddPS").show(); //user can be logged in right now
	curArea = area;
}

//this creates a combo editor to be used in propertygrid
function getEditor(type){
	return new Ext.grid.GridEditor(new Ext.form.ComboBox({
						store: new Ext.data.ArrayStore({
						fields: ['id', 'label'],
						data : lookups[type] 
					}),
					typeAhead: true,
					mode: 'local',
					forceSelection: true,
					triggerAction: 'all',
					emptyText:'Select a '+type+'...',
					selectOnFocus:true,
					editable: false,
					allowBlank: false,
					valueField: 'id',
					displayField: 'label'
				}
			)
		)
}
    
function getLookup(type,id){
	var store = new Ext.data.ArrayStore({fields: ["id", "label"],data : lookups[type] });
	try {
		if (store.find('id',id)==-1) return "No data";
		else return store.getAt(store.find('id',id)).get('label');
	} catch (e) {
		return "No data";
	}
}

function doLogin(){

Ext.Ajax.request({
	//url aanpassen, alles via apache proxy laten lopen
   url: "/geoserver/wms?request=getmap&layers="+SECURED_LAYER+"&width=5&height=5&srs=epsg:4326&bbox=0,0,1,1&format=image/png",
   success: function(){
	//todo: check if is text en contains exception (layer can not exist, or server offline)
	
	
	Ext.Msg.alert('Login', 'Login succesfull');
	user=true;
	Ext.Ajax.request({ url:"user.php" });
	Ext.getCmp("MapLayout").doLayout();
	//location.href='index.php';
		//en nu? knopjes tonen oid? ook vrij makkelijk te hacken dit, maar ja, kunnen ze vervolgens nog geen wfs-requests sturen want die authenticeren niet tegen geoserver 
		//wel de php requests, die zouden nog gevalideerd moeten worden op user, maar hoe sync je de userdatabase?
		//en wat na een page reload, opnieuw inloggen? of tegen php zeggen dat er een succesvolle inlog was
		//en hoe uitloggen?
	},
   failure: function(){Ext.Msg.alert('Login', 'Login failed');},
   method: 'GET'
});

}	

//add highlight of identified object to map, called from feature-info render-event, configured in userconfig.ashx (from database))
function addHighlight(feature) {
    //add feature to map
    var vectors = app.mapPanel.map.getLayersByName("highlightLayer")[0];
	try {
	vectors.removeAllFeatures();
    //reproject feature to mapProj (considering all overlays are in epsg:4326)
    if (app.mapPanel.map.baseLayer.projection.projCode != 'EPSG:4326') {
        var geom = feature.geometry.transform(new OpenLayers.Projection('EPSG:4326'), app.mapPanel.map.baseLayer.projection);
        feature = new OpenLayers.Feature.Vector(geom);
    }
    vectors.addFeatures([feature]);
	} catch (exp) {}
}

// Functions for processing filters
function processCultivarFilter(comboBox){
	var cultval = comboBox.getValue();
		if (cultval != "All cultivars" && cultval != ""){
			var cults = cultval.split(",");
			var filters="cultivar_type IN(";
			var first = true;
			cults.forEach(function(item){			
				if (!first){
					filters += ",";
				}
				first = false;
				filters+= "'" + item + "'";
			});
			filters += ")"
			if (production_systemfilter !=""){
				production_systemfilter += " AND ";
			}
			production_systemfilter += filters;
}}

function processCountryFilter(comboBox){
		var countryVal = comboBox.getValue();
		if (countryVal != "All countries" && countryVal != ""){
			var countries = countryVal.split(",");
			var filters="country IN(";
			var first = true;
			countries.forEach(function(item){			
				if (!first){
					filters += ",";
				}
				first = false;
				filters+= "'" + item + "'";
			});
			filters += ")"
			if (production_systemfilter !=""){
				production_systemfilter += " AND ";
			}
			production_systemfilter += filters;
		}												
}

function processRegionFilter(comboBox){
	var regionval = comboBox.getValue();
		if (regionval != "All regions" && regionval != ""){
			var regions = regionval.split(",");
			var filters="region IN(";
			var first = true;
			regions.forEach(function(item){			
				if (!first){
					filters += ",";
				}
				first = false;
				filters+= "'" + item + "'";
			});
			filters += ")"
			if (production_systemfilter !=""){
				production_systemfilter += " AND ";
			}
			production_systemfilter += filters;
		}				
}

function processPestsFilter(comboBox){
	var pestsVal = comboBox.getValue();	
	if (pestsVal!="" && pestsVal != "No pests and diseases"){
	
		var pestsArray = pestsVal.split(",");
		var filter=""
		var first = true
		pestsArray.forEach(function(item){
			if(!first){
				
				filter+=" AND ";
				
			}
			first=false;
			filter+=item+">0 AND "+item+"<5"
		});
		if (production_systemfilter !=""){
			production_systemfilter += " AND ";
		}			
		production_systemfilter += filter;
	}
}


function processYieldFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" && comboVal!="*"){
		if (comboVal==2){comboVal=0;}
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "yield_tendency5='" + comboVal + "'";
	}
}

function processProductFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" && comboVal!="*"){
		if (comboVal==3){comboVal=0;}
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "production_tendency5='" + comboVal + "'";
	}
}

function processUseFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" && comboVal!="*"){
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "use='" + comboVal + "'";
	}
}

function processIrrigationFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" && comboVal!="*"){
		if (comboVal!=-9999){comboVal --;}
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "irrigation='" + comboVal + "'";
	}
}

function processHerbicidesFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" && comboVal!="*"){
		if (comboVal!=-9999){comboVal --;}
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "herbicides='" + comboVal + "'";
	}
}

function processFungicidesFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" && comboVal!="*"){
		if (comboVal!=-9999){comboVal --;}
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "fungicides='" + comboVal + "'";
	}
}



function processTotalProd(textfieldMin, textfieldMax){
	var max = textfieldMax.getValue();
	var min = textfieldMin.getValue();
	
	
	
	if (min!=totalprodMin | max!=totalprodMax){
	if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
	production_systemfilter += "total_prod > " + min + " AND total_prod < "+max;
	}
	
	
}



function applyFilter() {
    var cqlFilterBase = production_systemfilter
    var cqlFilter = cqlFilterBase;
    var layer;
	app.mapPanel.map.layers.forEach(function(entry){
    	if (entry.name=="Production Systems"){
        	layer=entry;
    	}
	});	
	if (layer && layer.mergeNewParams) {
		if (cqlFilter !=""){			
    		layer.mergeNewParams({ cql_filter: cqlFilter });
        }            
    	else{
    		layer.mergeNewParams({ cql_filter: null });
    	}
    }
}


var downloadWindowConfig = {
    	width:400,
    	height: 200,
    	title: 'Download',
    	xtype: 'panel',
         id:'downloadWindow',
            ascending: false,
            border: false,
            padding: 10,
			items: [{
				xtype:"form",
				labelWidth:90,
				bodyStyle:'padding:10px',
				border:false,
				frame:true,
				items:[
						{
						xtype:'combo',
						id:'downloadFormatCombo',
						fieldLabel:'Download as',
						forceSelection: true,
						triggerAction: 'all',
						selectOnFocus:true,
						editable: false,
						allowBlank: false,
						valueField: 'value',
						mode: 'local',
						displayField: 'label',
						store: new Ext.data.ArrayStore({
						fields: ['label','value'],
						data: [['Esri Shapefile','SHAPE-ZIP'],['Pdf','application/pdf'],['GeoTiff','image/geotiff'],['KML','KML'],['CSV','CSV']]
						})
						},{
						xtype:'combo',
						id:'downloadBoundsCombo',
						fieldLabel:'Area of interest',
						typeAhead: true,
						mode: 'local',
						forceSelection: true,
						triggerAction: 'all',
						selectOnFocus:true,
						editable: false,
						allowBlank: false,
						valueField: 'value',
						displayField: 'label',
						store: new Ext.data.ArrayStore({
						fields: ['label','value'],
						data: [['Current viewport','current'],['World',"-180,-90,180,90"],['Africa',"-10,-20,70,20"],['Azia',"70,-20,150,20"],['Central America',"-80,-20,-30,20"]]
						})
						}],
				buttons:[{
						text:'Save',
						handler: function (frm,a) 
							{
							//TODO: apply app-filter
							var frmt=Ext.getCmp('downloadFormatCombo').getValue();
							var vbox=Ext.getCmp('downloadBoundsCombo').getValue();
							if (vbox=="current"){
							vbox = app.mapPanel.map.getExtent().transform("EPSG:3857","EPSG:4326").toString();
							}
							if (vbox == "") vbox="-180,-90,180,90";
							if (frmt != ""){
								if (frmt=='SHAPE-ZIP'||frmt=='CSV'){ //these are wfs-formats, others wms
    								if (production_systemfilter!=""){
    								location.href = gs_url + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+gs_workspace+':'+DOWNLOAD_LAYER+'&bbox='+vbox+"&cql_filter="+production_systemfilter+'&maxFeatures=2500&outputFormat='+frmt;
    								} else{
    								location.href = gs_url + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+gs_workspace+':'+DOWNLOAD_LAYER+'&bbox='+vbox+'&maxFeatures=2500&outputFormat='+frmt;
    								}
									} else {
									//should recalculate image size to bounds size
									var bnds = vbox.split(',');
									var hght = Math.floor(2000/(bnds[2]-bnds[0])*(bnds[3]-bnds[1]));
									if (production_systemfilter!=""){
									location.href = gs_url + '/ows?service=WMS&version=1.1.0&request=GetMap&layers='+gs_workspace+':'+DOWNLOAD_LAYER+'&bbox='+vbox+'&width=2000&height='+hght+"&cql_filter="+production_systemfilter+'&srs=EPSG:4326&format='+frmt;
									} else{
									location.href = gs_url + '/ows?service=WMS&version=1.1.0&request=GetMap&layers='+gs_workspace+':'+DOWNLOAD_LAYER+'&bbox='+vbox+'&width=2000&height='+hght+'&srs=EPSG:4326&format='+frmt;
									}
								}
								var window = Ext.getCmp('downloadWindow');
							window.destroy();
							} else alert('Select a download format first');
							}
						},{
						text:'Cancel',
						handler: function(form,action){
							var window = Ext.getCmp('downloadWindow');
							window.destroy();
							}
						}]
				}],
            hideMode: "offsets",
           
            defaults: { cls: 'gxp-legend-item', autoScroll: true }
    };




