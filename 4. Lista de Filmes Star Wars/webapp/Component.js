sap.ui.define([
    "sap/ui/core/UIComponent",
    "mod2projeto/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("mod2projeto.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // enable routing
            this.getRouter().initialize();
            
            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            this.setModel(models.createGlobalModel(),); // Model Global

        }
    });
});