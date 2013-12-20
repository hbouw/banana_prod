//This is the Banana Mapper. It is based on viewer.js and was edited from there

 


var app,combo,curArea;
var login=false;
var production_systemfilter="";
var init = 0;

//style for featureInfo highlight
var featureInfoStyle = new OpenLayers.StyleMap({
	pointRadius: 8,
	graphicName: "circle",
	fillOpacity: 0.4,
	fillColor: "#ccccff",
	strokeWidth: 2,
	strokeColor: "#9999ff"
});

Ext.onReady(function() {
	lookups['cultivar_type'].push(["","All cultivars"]);
	countryLookup['countries'].push(["",'All countries']);
	countryLookup['regions'].push(["",'All regions']);
	lookups['yield_tendency5'].push(["-9999","No data"]);	
	lookups['production_tendency5'].push(["-9999","No data"]);	
	lookups['production_tendency5'].push(["*","All selected"]);	
	lookups['yield_tendency5'].push(["*","All selected"]);	
	lookups['use'].push(["-9999","No data"]);
	lookups['use'].push(["*","All selected"]);
	lookups['irrigation'].forEach(function(item){
			item[0]++;
	});
	lookups['herbicides'].forEach(function(item){
			item[0]++;
	});
	lookups['fungicides'].forEach(function(item){
			item[0]++;
	});
	lookups['irrigation'].push(["-9999","No data"]);
	lookups['irrigation'].push(["","All selected"]);
	lookups['herbicides'].push(["-9999","No data"]);
	lookups['herbicides'].push(["","All selected"]);
	lookups['fungicides'].push(["-9999","No data"]);
	lookups['fungicides'].push(["","All selected"]);
	// change 0 value into 2, otherwise causes problems with default value combobox
	lookups['yield_tendency5'][1][0]=2;
	lookups['production_tendency5'][1][0]=2;
	


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
				bodyStyle:"background-color:#d7ec9B",
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
				collapsible: false,
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
             	xtype: "tabpanel",
             	activeTab: 0,
                collapsible: false,
                collapseMode: "mini",
            	collapsed: false,
                width: 200,
                // Listener to add tooltips on filters. First created tooltips to the gxpviewer.app ready event (see line ~640), but this stopped working for some reason.
                listeners: {
                	'tabchange': function(tabPanel, tab){
                			if (init<2){
     						Ext.QuickTips.register({ target: Ext.getCmp('pestsfilter').getEl(), text: 'Search for systems with occurring diseases' }); 
							Ext.QuickTips.register({ target: Ext.getCmp('regionfilter').getEl(), text: 'Search for systems within regions' }); 
							Ext.QuickTips.register({ target: Ext.getCmp('countryfilter').getEl(), text: 'Search for systems within countries' }); 
							Ext.QuickTips.register({ target: Ext.getCmp('cultivarfilter').getEl(), text: 'Search for systems based on cultivar' }); 
     						init ++;
                			}
                		}
                	},
                items: [
                	{
                	title: "Layers",
                	id:"layerlegend",
                	layout: "vbox",
					defaults: {
                                width: "100%",
                                layout: "fit"
               		},
					items: [
						{
                		id: "treepanel",
						defaults: {
							autoScroll:true
							},
                		border: false,
                		flex: 1
						},
						{
                		id:"legendpanel",
                        defaults: {
        	                autoScroll:true,
                            },
                        flex: 1,
                        border:false
						}]
					}
					,
                	{
                	title: "Search",
                	id: "searchpanel",
					layout: "vbox",
					/*layoutConfig: {
					titleCollapse: false,
        			animate: true,
        			activeOnTop: true,
			        multi: true
					},*/
					defaults: {
					autoScroll:true
					},
                	border: false,
                	items:
                	[
                	{
        			 title: "Simple search",
        			 xtype: 'panel',
        			 width:'100%',
        			 collapsible: false,
        			 id: 'search',
        			 items: [
                	
						{
							title: "Countries",
							id: "countryfilter",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							width: 196,
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'All countries',
							selectOnFocus:true,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: countryLookup ['countries']              		
								})
					
						},
						{
							title: "Regions",
							id: "regionfilter",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							width: 196,
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'All regions',
							selectOnFocus:true,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: countryLookup ['regions']              		
								})
					
						},
						{
							title: "Cultivar Type",
							id: "cultivarfilter",
							xtype: "combo",
							width: 196,

							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data : lookups['cultivar_type'],						
							}),
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'All cultivars',
							selectOnFocus:true,
							editable: false,
							valueField: 'id',
							displayField: 'label' 
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
							emptyText: 'No pests and diseases'
						}	
						]
        			},
        			{
        			 title: "More search options",
        			 xtype: 'panel',
        			 collapsible: false,
        			 width: '100%',
        			 layout: 'fit',
        			 id: 'moresearch',
        			 items: [
						 {
							title: "Yield tendency (past 5 years)",
							id: "yieldtendency",
							xtype: "combo"	,
							width: 196,	
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'All selected',
							selectOnFocus:true,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookups ['yield_tendency5']              		
								}),
								
				
						},
						{
							title: "Production tendency (past 5 years)",
							id: "productiontendency",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'All selected',
							selectOnFocus:true,
							width: 196,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookups ['production_tendency5']              		
								})
						},
						{
							title: "Primary use Musa",
							id: "primaryusemusa",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'All selected',
							selectOnFocus:true,
							width: 196,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookups ['use']              		
								})
						},
						{
							title: "Use of irrigation",
							id: "irrigation",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'All selected',
							selectOnFocus:true,
							width: 196,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookups ['irrigation']              		
								})
						},
						{
							title: "Use of herbicides",
							id: "herbicides",
							xtype: "combo"	,
							typeAhead: true,
							mode: 'local',
							forceSelection: false,
							triggerAction: 'all',
							emptyText:'All selected',
							selectOnFocus:true,
							width: 196,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookups ['herbicides']              		
								})
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
							emptyText:'All selected',
							selectOnFocus:true,
							width: 196,
							editable: false,
							valueField: 'id',
							displayField: 'label' ,
							store: new Ext.data.ArrayStore({
								fields: ['id', 'label'],
								data: lookups ['fungicides']              		
								})
						},
						/*{
						xtype: 'label', 
                        text: 'Musa density (mats/ha)',
                        style: 'font-size:12px; font-weight:bold; padding:5px;'
						},
						{
							title: "Density",
							id: "densityfilter",
							xtype: "multislider",
							minvalue: 0,
							maxvalue: 100,
							increment: 10,
							values: [20,80],
							fieldlabel: "Musa density (mats/ha)",
							plugins : tip
							
						},
						{
						xtype: 'label', 
                        text: 'Total production (ton/ha)',
                        style: 'font-size:12px; font-weight:bold; padding:5px;'
						},
						{
							title: "Production",
							id: "productionfilter",
							xtype: "multislider",
							minvalue: 0,
							maxvalue: 100,
							increment: 10,
							values: [1000, 5000],
							plugins : tip
							
						},*/
						
						
							{
							xtype: 'label', 
							text: 'Production minimum (ton)',
							style: 'font-size:12px; font-weight:bold; padding:5px;',
							width: 196
							},
							{
								title: "Production Minimum",
								id: "productionmin",
								xtype: "textfield",
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

							text: 'Production maximum (ton)',
							style: 'font-size:12px; font-weight:bold; padding:5px;'
							},
							{
								title: "Production Maximum",
								id: "productionmax",
								xtype: "textfield",
								value: totalprodMax,
								width: 196,

								regex:/^([0-9])/,
								validator: function(v) {
															
									return true;
								
								}
							}
						
						
						
						

        			 
        			 ]
        			       			
        			
        			},
        			{
        			 title: "Apply filters",
        			 xtype: 'panel',
        			 collapsible: false,
        			 width: '100%',
        			 id: 'applyfilters',
        			 items: [
        			{
                		buttons: [{
                			id: 'applyfilter',
							text: 'Apply',
							handler: function()
								{
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
									console.log(fieldmin);
									processTotalProd(fieldmin, fieldmax);
//									console.log(production_systemfilter);
									applyFilter();
									// clear filter
									production_systemfilter="";
		            			}
       						},{
            			text: 'Reset',
						handler: function()
						{
							production_systemfilter="";
							Ext.getCmp("regionfilter").reset();
							Ext.getCmp("pestsfilter").reset();
							Ext.getCmp("countryfilter").reset();
							Ext.getCmp("cultivarfilter").reset();
							applyFilter();
						}
        				}]
        			}]}
        			
        			
        			
        			
        			
        			
        			    			
                	]
                	
                
						
						}]
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
			
        },{	
           ptype: "gxp_measure", 	//add button to measure length and area
           toggleGroup: "layertools",
           controlOptions: {immediate: true},
           showButtonText: false,
           actionTarget: "map.tbar"
        },{  	
		   ptype: "gxp_wmsgetfeatureinfo",	//add button to get info of feature pointed at
            actionTarget: "map.tbar",
			//autoActivate: true,			//ToDo at startup this function needs to be on!
			format: "grid",
            outputConfig: {
                width: 350,
                height: 200,

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
            actionTarget: "tree.contextMenu"
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
		{name:'other_fungal_im',type: 'string'},
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
			'area_id','cultivar_type','cultivar_name','association','other_cult','area_product','yield','total_prod','density','number_hh','use','production_tendency5','yield_tendency5','inputs','irrigation','chem_fert','org_fert','herbicides','fungicides','nematicides','insecticides','p_goodeyi','p_coffea','r_similis','meloidogyne','h_multici','moko_bugtok','bxw','blood_disease','erwinia','other_bac_dis','oth_bacdis_im','stem_weevil','corm_weevil','black_streak','yel_sigatoka','eumusae','other_leaf_dis','oth_leafdis_im','fus_race1','fus_race2','fus_race4','fus_subtrop4','other_fungal','other_fungal_im','bbtv','bsv','other_virus','oth_virus_im'
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
									'other_fungal_im': function(v){ return getLookup("other_fungal_im",v) },
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
									'other_fungal_im': getEditor('other_fungal_im'),
									'bbtv': getEditor('bbtv'),
									'bsv': getEditor('bsv'),
									'yield_tendency5': getEditor("yield_tendency5"),
									'production_tendency5': getEditor("production_tendency5") ,
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
									'other_fungal_im':  'Impact other fungal diseases',
									'bbtv':				'Importance BBTV',
									'bsv':				'Importance BSV',
									'other_virus':		'Name other virus',
									'oth_virus_im':		'Impact other virus',
									'yield_tendency5':  'Tendency in yield in past 5 years',
									'production_tendency5': 'Tendency in production area in past 5 years'
									
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
		if (store.find('id',id)==-1) return "-";
		else return store.getAt(store.find('id',id)).get('label');
	} catch (e) {
		return "-";
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
	var cultVal = comboBox.getValue();								
	if (cultVal!="" | cultVal != 0){
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}
		production_systemfilter += "cultivar_type=" + cultVal.toString();
										
	}
}

function processCountryFilter(comboBox){
	var countryVal = comboBox.getValue();								
	if (countryVal!="" | countryVal != 0){
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}
		production_systemfilter += "country='" + countryVal + "'";
										
	}
}

function processRegionFilter(comboBox){
	var regionVal = comboBox.getValue();								
	if (regionVal!="" | regionVal != 0){
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "region='" + regionVal + "'";
				
	}
}

function processPestsFilter(comboBox){
	var pestsVal = comboBox.getValue();	
	if (pestsVal!="" | pestsVal != 0){
	
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
		console.log(production_systemfilter);
	}
}


function processYieldFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" | comboVal!=0){
		if (comboVal==2){comboVal=0;}
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "yield_tendency5='" + comboVal + "'";
	}
}

function processProductFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" | comboVal!=0){
		if (comboVal==2){comboVal=0;}
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "production_tendency5='" + comboVal + "'";
	}
}

function processUseFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" | comboVal!=0){
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "use='" + comboVal + "'";
	}
}

function processIrrigationFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" | comboVal!=0){
		if (comboVal!=-9999){comboVal --;}
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "use='" + comboVal + "'";
	}
}

function processHerbicidesFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" | comboVal!=0){
		if (comboVal!=-9999){comboVal --;}
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "use='" + comboVal + "'";
	}
}

function processFungicidesFilter(comboBox){
	var comboVal = comboBox.getValue();	
	if (comboVal!="" | comboVal!=0){
		if (comboVal!=-9999){comboVal --;}
		if (production_systemfilter !=""){
			production_systemfilter += " and ";
		}		
		production_systemfilter += "use='" + comboVal + "'";
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
	
	console.log(production_systemfilter);
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



