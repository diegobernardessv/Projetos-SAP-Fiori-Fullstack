sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("megaacademy.mod3projeto.controller.Main", {
        onInit() { },

        

        onAdd: function () {
            var oFragment = sap.ui.xmlfragment(this.getView().getId(), "megaacademy.mod3projeto.view.fragments.Dialog", this);
            this.oFragment = oFragment;
            this.getView().addDependent(this.oFragment);

            this.getView().byId("btnCriar").setVisible(true);
            this.getView().byId("btnEditar").setVisible(false);
            this.oFragment.open();

            this.oFragment.setEscapeHandler(function () {
                this.onFragCloseDialog();
            }.bind(this));
        },

        onFragCloseDialog: function (oEvent) {
            this.oFragment.close();
            this.oFragment.destroy();
            delete this.oFragment;
        },

        onSave: function (oEvent) {
            var body = {};
            body = {
                Codmaterial: this.getView().byId("Codmaterial").getValue(),
                Descricao: this.getView().byId("Descricao").getValue(),
                Unidade: this.getView().byId("Unidade").getValue(),
                Qtd: parseFloat(this.getView().byId("Qtd").getValue())
            };

            this.getOwnerComponent().getModel().setHeaders({
                "Content-Type": "application/json",
                "X-Requested-With": "JSONHttpRequest"
            });

            this.getOwnerComponent().getModel().create("/materiais", body, {
                success: function (oResponse) {
                    this.onFragCloseDialog();
                    MessageBox.success("Material cadastrado com sucesso!");
                }.bind(this),
                error: function (oResponse) {
                    MessageBox.error("Ocorreu um erro ao cadastrar o material!");
                }
            });
        },

        onEdit: function (oEvent) {
            var oTable = this.getView().byId("tblMateriais");
            var oSelectedItem = oTable.getSelectedItem();

            if (!oSelectedItem) {
                MessageBox.warning("Por favor, selecione um material para editar.");
                return;
            }

            var oFragment = sap.ui.xmlfragment(this.getView().getId(), "megaacademy.mod3projeto.view.fragments.Dialog", this);
            this.oFragment = oFragment;
            this.getView().addDependent(this.oFragment);

            this.getView().byId("btnCriar").setVisible(false);
            this.getView().byId("btnEditar").setVisible(true);
            this.oFragment.open();

            this.getView().byId("Codmaterial").setEditable(false);
            this.getView().byId("Codmaterial").setValue(oSelectedItem.getBindingContext().getProperty("Codmaterial"));
            this.getView().byId("Descricao").setValue(oSelectedItem.getBindingContext().getProperty("Descricao"));
            this.getView().byId("Unidade").setValue(oSelectedItem.getBindingContext().getProperty("Unidade"));
            this.getView().byId("Qtd").setValue(oSelectedItem.getBindingContext().getProperty("Qtd"));

            this.oFragment.setEscapeHandler(function () {
                this.onFragCloseDialog();
            }.bind(this));
        },

        onSaveEditar: function (oEvent) {
            var body = {};
            body = {
                Codmaterial: this.getView().byId("Codmaterial").getValue(),
                Descricao: this.getView().byId("Descricao").getValue(),
                Unidade: this.getView().byId("Unidade").getValue(),
                Qtd: parseFloat(this.getView().byId("Qtd").getValue())
            };

            this.getOwnerComponent().getModel().setHeaders({
                "Content-Type": "application/json",
                "X-Requested-With": "JSONHttpRequest"
            });

            const oModel = this.getOwnerComponent().getModel();
            const sPath = oModel.createKey("/materiais", {
                Codmaterial: this.getView().byId("Codmaterial").getValue()
            });

            oModel.update(sPath, body, {
                success: function (oResponse) {
                    this.onFragCloseDialog();
                    MessageBox.success("Material editado com sucesso!");
                }.bind(this),
                error: function (oResponse) {
                    MessageBox.error("Ocorreu um erro ao editar o material!");
                }
            });
        },

        onDelete: function (oEvent) {
            var oTable = this.getView().byId("tblMateriais");
            var oSelectedItem = oTable.getSelectedItem();
            const oModel = this.getOwnerComponent().getModel();

            if (!oSelectedItem) {
                MessageBox.warning("Por favor, selecione um material para deletar.");
                return;
            }

            const sCodMaterial = oSelectedItem.getBindingContext().getProperty("Codmaterial");
            const sPath = oModel.createKey("/materiais", {
                Codmaterial: sCodMaterial
            });

            MessageBox.confirm(`Tem certeza que deseja deletar o material ${sCodMaterial}?`, {
                title: "Confirmar Exclusão",
                onClose: (sAction) => {
                    if (sAction === MessageBox.Action.OK) {
                        oModel.remove(sPath, {
                            success: () => {
                                MessageBox.success("Material deletado com sucesso!");
                                oModel.refresh(); // Atualiza a tabela na tela
                            },
                            error: (oError) => {
                                MessageBox.error("Ocorreu um erro ao deletar o material!");
                            }
                        });
                    }
                }
            });
        },

        /**
         * Formatter function pra concatenar quantidade e unidade de medida
         */
        formatterQtdUnidade: function (fQuantidade, sUnidade) {
            // Checa se os valores existem, para evitar erros
            if (fQuantidade !== undefined && fQuantidade !== null && sUnidade) {
                // Formata a quantidade
                return Number(fQuantidade).toFixed(0) + " " + sUnidade;
            }
            return ""; // Retorna vazio, caso não tenha valor
        }
    });
});
