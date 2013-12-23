
// FilterTool ------------------------------------------

/** api: constructor
 *  .. class:: FilterTool(config)
 *
 *    Provides an action to define a CQL filter to a layer.
 */
Ext.ux.DownloadTool = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = downloadtool */
    ptype: "downloadtool",

    /** api: config[menuText]
     *  ``String``
     *  Text for filter menu item (i18n).
     */
    menuText: "Download",
	
    /** api: config[tooltip]
     *  ``String``
     *  Text for filter action tooltip (i18n).
     */
    tooltip: "Download data from this layer for offline use",

    /** api: config[actionTarget]
     *  ``Object`` or ``String`` or ``Array`` Where to place the tool's actions
     *  (e.g. buttons or menus)? Use null as the default since our tool has both 
     *  output and action(s).
     */
    actionTarget: null,

    /** private: method[constructor]
     */
    constructor: function (config) {
        Ext.ux.DownloadTool.superclass.constructor.apply(this, arguments);

        if (!this.outputConfig) {
            this.outputConfig = {
                width: 400,
                height: 200
            };
        }
        Ext.applyIf(this.outputConfig, { title: this.menuText });
    },

    /** api: method[addActions]
     */
    addActions: function () {
        var arguments = [{
            menuText: this.menuText,
            iconCls: "gxp-icon-filebrowse",
            tooltip: this.tooltip,
            handler: function () {
                this.removeOutput();
                this.addOutput();
            },
            scope: this
        }];


        var actions = Ext.ux.DownloadTool.superclass.addActions.apply(this, [arguments]);
        actions[0].disable();

        this.target.on("layerselectionchange", function (record) {
            var isNotLayer = !record || !record.get("layer");
            var disableTool = true;

            if (!isNotLayer) {
				/** Specify on what layer the download function is enabled
				*/
				if (record.get("layer").name == "Production Systems") disableTool = false;
                
                if (disableTool) {
                    SelectedLayerConfig = null;
                    ASpecFilter = "";
                }
            }

            actions[0].setDisabled(disableTool);
        }, this);

        return actions;
    },
	
    /** private: method[addOutput]
     *  :arg config: ``Object``
     */
    addOutput: function (config) {
        var ttl = this.target.selectedLayer.data.title;

        return Ext.ux.DownloadTool.superclass.addOutput.call(this, Ext.apply({
            xtype: 'panel',
            ascending: false,
            border: false,
            filter: function (record) {
                if (record.data.title == ttl) return true;
                return false;
            },
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
							console.log("#######");
							console.log(production_systemfilter);
							var frmt=Ext.getCmp('downloadFormatCombo').getValue();
							var vbox=Ext.getCmp('downloadBoundsCombo').getValue();
							if (vbox=="current") vbox = app.mapPanel.map.getExtent().toString();
							if (vbox == "") vbox="-180,-90,180,90";
							if (frmt != ""){
								if (frmt=='SHAPE-ZIP'||frmt=='CSV'){ //these are wfs-formats, others wms
    								if (production_systemfilter!=""){
    								location.href = gs_url + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+gs_workspace+':'+DOWNLOAD_LAYER+"&cql_filter="+production_systemfilter+'&maxFeatures=2500&outputFormat='+frmt;
    								} else{
    								location.href = gs_url + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+gs_workspace+':'+DOWNLOAD_LAYER+'&maxFeatures=2500&outputFormat='+frmt;
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
								Ext.get(Ext.query(".x-window")[1]).hide();
							} else alert('Select a download format first');
							}
						},{
						text:'Cancel',
						handler: function(form,action){
							Ext.get(Ext.query(".x-window")[1]).hide(); //0 is page itself todo: get proper handle and close it
							}
						}]
				}],
            hideMode: "offsets",
            layerStore: this.target.mapPanel.layers,
            defaults: { cls: 'gxp-legend-item', autoScroll: true }
        }, config));
    }

});

Ext.preg(Ext.ux.DownloadTool.prototype.ptype, Ext.ux.DownloadTool);