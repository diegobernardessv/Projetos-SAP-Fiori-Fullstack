sap.ui.define([
    "sap/ui/core/UIComponent",
    "megaacademy/mod3projeto/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("megaacademy.mod3projeto.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});