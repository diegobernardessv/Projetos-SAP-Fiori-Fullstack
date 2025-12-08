/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["mod2projeto/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
