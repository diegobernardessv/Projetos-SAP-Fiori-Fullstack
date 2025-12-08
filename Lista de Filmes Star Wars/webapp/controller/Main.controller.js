sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller) => {
    "use strict";

    return Controller.extend("mod2projeto.controller.Main", {
        onInit: function () {
            let oModelGlobal = this.getOwnerComponent().getModel();
            oModelGlobal.loadData("https://swapi.dev/api/films/");
        }
    });
});

