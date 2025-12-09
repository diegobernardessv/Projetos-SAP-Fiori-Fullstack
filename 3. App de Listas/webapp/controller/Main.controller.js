sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("megaacademy.mod2aula2.controller.Main", {
            onInit: function () {
                //let oModelLocal = new JSONModel();
                let oModelGlobal = this.getOwnerComponent().getModel();
                oModelGlobal.loadData("https://swapi.dev/api/people/");
              // this.getView().setModel(oModelLocal);
            }
        });
    });
