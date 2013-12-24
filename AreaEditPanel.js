/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */



/** api: constructor
 *  .. class:: FeatureEditPopup(config)
 *
 *      Create a new panel which displays the attributes of a feature and can be used to edit
 */
Ext.namespace("gxp");
gxp.AreaPropertyGrid = Ext.extend(Ext.grid.PropertyGrid, {
    
    /** private: property[cancelButton]
     *  ``Ext.Button``
     */
    cancelButton: null,
    
    /** private: property[saveButton]
     *  ``Ext.Button``
     */
    saveButton: null,
    
    /** private: property[editButton]
     *  ``Ext.Button``
     */
    editButton: null,
    
    /** private: property[deleteButton]
     *  ``Ext.Button``
     */
    deleteButton: null,
    
	readOnly: false,
	
	Editable: false,
	
	clicksToEdit: 0,
	
	sortable: false,
	
    /** private: method[initComponent]
     */
    initComponent: function() {
        this.addEvents(

            /** api: events[startedit]
             *  Fires when editing starts.
             *
             *  Listener arguments:
             *  * panel - :class:`gxp.FeatureEditPopup` This popup.
             */
            "startedit",

            /** api: events[stopedit]
             *  Fires when editing stops.
             *
             *  Listener arguments:
             *  * panel - :class:`gxp.FeatureEditPopup` This popup.
             */
            "stopedit",

            /** api: events[beforefeaturemodified]
             *  Fires before the feature associated with this popup has been
             *  modified (i.e. when the user clicks "Save" on the popup).
             *
             *  Listener arguments:
             *  * panel - :class:`gxp.FeatureEditPopup` This popup.
             *  * feature - ``OpenLayers.Feature`` The modified feature.
             */
            "beforefeaturemodified",

            /** api: events[featuremodified]
             *  Fires when the feature associated with this popup has been
             *  modified (i.e. when the user clicks "Save" on the popup) or
             *  deleted (i.e. when the user clicks "Delete" on the popup).
             *
             *  Listener arguments:
             *  * panel - :class:`gxp.FeatureEditPopup` This popup.
             *  * feature - ``OpenLayers.Feature`` The modified feature.
             */
            "featuremodified",
            
            /** api: events[canceledit]
             *  Fires when the user exits the editing mode by pressing the
             *  "Cancel" button or selecting "No" in the popup's close dialog.
             *  
             *  Listener arguments:
             *  * panel - :class:`gxp.FeatureEditPopup` This popup.
             *  * feature - ``OpenLayers.Feature`` The feature. Will be null
             *    if editing of a feature that was just inserted was cancelled.
             */
            "canceledit",
            
            /** api: events[cancelclose]
             *  Fires when the user answers "Cancel" to the dialog that
             *  appears when a popup with unsaved changes is closed.
             *  
             *  Listener arguments:
             *  * panel - :class:`gxp.FeatureEditPopup` This popup.
             */
            "cancelclose"
        );
        
	   this.readOnly=true;

        this.editButton = new Ext.Button({
            text: "Edit",
            tooltip: "Edit area",
            iconCls: "edit",
            handler: this.hideButtonsStartEditing,
            scope: this
        });
        
        this.deleteButton = new Ext.Button({
            text: "Delete",
            tooltip: "Delete Area",
            iconCls: "delete",
            handler: this.deleteFeature,
            scope: this
        });
        
        this.cancelButton = new Ext.Button({
            text: "Cancel",
            tooltip: "",
            iconCls: "cancel",
            hidden: true,
            handler: function() {
                this.showButtonsStopEditing(false);
            },
            scope: this
        });
        
        this.saveButton = new Ext.Button({
            text: "Save",
            tooltip: "Save area",
            iconCls: "save",
            hidden: true,
            handler: function() {
                this.showButtonsStopEditing(true);
            },
            scope: this
        });
        
        this.tbar = new Ext.Toolbar({
            hidden: !user,
            items: [
                this.editButton,
                this.deleteButton,
                this.saveButton,
                this.cancelButton
            ]
        });
        
		
        gxp.AreaPropertyGrid.superclass.initComponent.call(this);
        
		
        this.on({
			"beforeedit": function() {
                if(!this.readOnly) {
                    return true;
                } else {
					return false;
				}
            },
            scope: this
        }
		
		);
    },

    /** private: method[getDirtyState]
     *  Get the appropriate OpenLayers.State value to indicate a dirty feature.
     *  We don't cache this value because the popup may remain open through
     *  several state changes.
     */
    getDirtyState: function() {
        //return this.feature.state === OpenLayers.State.INSERT ?
        //    this.feature.state : OpenLayers.State.UPDATE;
    },
    
	/** don't override startediting, because then does not work anymore */
	hideButtonsStartEditing	: function() {	
			this.editButton.hide();
            this.deleteButton.hide();
            this.saveButton.show();
            this.cancelButton.show();
			this.readOnly = false;
			this.startEditing();
			this.clicksToEdit=1;
	},
	
    /** private: method[stopEditing]
     *  :arg save: ``Boolean`` If set to true, changes will be saved and the
     *      ``featuremodified`` event will be fired.
     */
    showButtonsStopEditing: function(save) {
	
			//if (save) - put in store else cancel		
            if (!this.isDestroyed) {
                this.cancelButton.hide();
                this.saveButton.hide();
				this.editButton.show();
                this.deleteButton.show();
            }
			
			if (save){
                     var source = this.getSource();  
					 
                     var jsonDataStr = null;  

						jsonDataStr = Ext.encode(source);  
					 
						 Ext.Ajax.request({  
                             url : 'UpdatePS.php',  
                             method : 'post',  
                             params : {  
                                 config : jsonDataStr , xaction : 'update'
                             },  
                             timeout : 10000,  
                             success : function(result){
							try {
								var resp = Ext.util.JSON.decode(result.responseText);
								if (resp.status=='true')
									Ext.Msg.alert('Update succesfull');
								else
									Ext.Msg.alert('Failed: '+ resp.message);
								} catch (e) {
									Ext.Msg.alert(e.message);
								}
							},
							failure : function(response, options){ 
								Ext.Msg.alert('Update failed.');
							}
						});
			}
			this.readOnly = true;
			this.fireEvent("stopedit", this);
            
    },
    
    deleteFeature: function() {
        Ext.Msg.show({
            title: "Delete production system",
            msg: "Are you sure you want to remove this production system?",
            buttons: Ext.Msg.YESNO,
            fn: function(button) {
					Ext.Ajax.request({
						url:"DeletePS.php",
						params: {
							area_id: this.getSource().area_id,
							association: this.getSource().association,
							cultivar_type: this.getSource().cultivar_type
						},
						method:"POST",
						success : function(result){
							try {
							var resp = Ext.util.JSON.decode(result.responseText);
							if (!resp.status=='true') {
								Ext.Msg.alert('Failed: '+ resp.message);
							}
							} catch (e) {
								Ext.Msg.alert(e.message);
							}
					   },
					   failure : function(response, options){ 
						   Ext.Msg.alert('Remove failed.');
					   }
					});
					this.destroy();
                }
            },
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            animEl: this.getEl()
        });
    }
});

/** api: xtype = gxp_featureeditpopup */
Ext.reg('gxp_areapropertygrid', gxp.AreaPropertyGrid);
