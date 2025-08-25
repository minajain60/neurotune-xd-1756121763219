sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
  "use strict";

  /**
   * @name converted.podisplayview.controller.App
   * @class The main application controller
   * @extends sap.ui.core.mvc.Controller
   */
  return Controller.extend("converted.podisplayview.controller.App", {
    /**
     * Called when the app controller is initialized.
     * Sets up the router and handles initial navigation.
     * @public
     */
    onInit: function () {
      // Log the initialization
      console.log("App controller initialized");

      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Check if the router exists
      if (oRouter) {
        // Log that the router was found
        console.log("Router found, initializing navigation");

        // Attach a handler for bypassed routes (errors in routing)
        oRouter.attachBypassed(function (oEvent) {
          console.log("Route bypassed:", oEvent.getParameter("hash"));
        });

        // Navigate to the main route if no hash is present (first load)
        if (!window.location.hash || window.location.hash === "#") {
          // Log navigation to the main route
          console.log("No hash found, navigating to main route");

          // Use a timeout to ensure the App view is fully initialized before navigation
          setTimeout(function () {
            oRouter.navTo("RouteMain");
          }, 100);
        }
      } else {
        // Log an error if the router is not found
        console.error("Router not found in App controller");
      }
    }
  });
});
