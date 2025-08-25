sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/m/MessagePopover",
  "sap/m/MessageItem",
  "sap/ui/core/library",
  "sap/ui/core/UIComponent",
  "sap/m/SelectDialog",
  "sap/m/StandardListItem"
], function (Controller, JSONModel, MessageToast, MessageBox, MessagePopover, MessageItem, coreLibrary, UIComponent, SelectDialog, StandardListItem) {
  "use strict";

  // Shortcut for sap.ui.core.MessageType
  var MessageType = coreLibrary.MessageType;

  /**
   * @name converted.podisplayview.controller.PODisplayView
   * @class Controller for the PO Display View.
   * @extends sap.ui.core.mvc.Controller
   */
  return Controller.extend("converted.podisplayview.controller.PODisplayView", {

    /**
     * Called when the view is initialized.
     * Sets up the data models and message model.
     * @public
     */
    onInit: function () {
      // Load customer data from mock data
      var oCustomerModel = new JSONModel();
      oCustomerModel.loadData("model/mockData/customers.json");
      this.getView().setModel(oCustomerModel, "customers");
      
      // Load product data from mock data  
      var oProductModel = new JSONModel();
      oProductModel.loadData("model/mockData/products.json");
      this.getView().setModel(oProductModel, "products");
      
      // Load any additional mock data as needed
      var oOrderModel = new JSONModel();
      oOrderModel.loadData("model/mockData/orders.json");
      this.getView().setModel(oOrderModel, "orders");

      // Initialize the main model for PO data
      var oModel = new JSONModel({
        poData: {
          poNumber: "4500017100",
          createdBy: "ZECHA",
          documentType: "NB",
          vendor: "1000",
          documentDate: "2023-10-27",
          paymentTerms: "0001",
          incoterms: "FOB",
          grMessage: true,
          currency: "EUR",
          exchangeRate: "1.00000",
          exchangeRateFixed: false
        }
      });
      this.getView().setModel(oModel);

      // Initialize message model for MessageArea/MessagePopover
      var oMessageModel = new JSONModel({
        messages: [{
          type: MessageType.Success,
          title: "System Information",
          description: "Application converted successfully, Use AI optimize for better result",
          subtitle: "Conversion complete",
          counter: 1
        }]
      });
      this.getView().setModel(oMessageModel, "messages");

      // Log the initialization
      console.log("PODisplayView controller initialized");
    },

    /**
     * Called before the view is rendered.
     * Can be used to prepare data or modify the UI.
     * @public
     */
    onBeforeRendering: function () {
      // Log before rendering
      console.log("PODisplayView before rendering");
    },

    /**
     * Called after the view has been rendered.
     * Can be used to adjust the UI or perform other tasks.
     * @public
     */
    onAfterRendering: function () {
      // Log after rendering
      console.log("PODisplayView after rendering");
    },

    /**
     * Handle value help request (for ValueHelp / F4 elements)
     * @param {sap.ui.base.Event} oEvent The event object
     */
    handleValueHelp: function (oEvent) {
      var oSource = oEvent.getSource();

      // Create value help dialog if it doesn't exist
      if (!this._valueHelpDialog) {
        this._valueHelpDialog = new SelectDialog({
          title: "Select Value",
          confirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
              oSource.setValue(oSelectedItem.getTitle());
            }
          },
          cancel: function () {
            // Handle cancel event
          }
        });

        // Sample items - would be filled with actual data in a real app
        var oDialogModel = new JSONModel({
          items: [{
              title: "Item 1",
              description: "Description 1"
            },
            {
              title: "Item 2",
              description: "Description 2"
            },
            {
              title: "Item 3",
              description: "Description 3"
            }
          ]
        });

        this._valueHelpDialog.setModel(oDialogModel);
        this._valueHelpDialog.bindAggregation("items", {
          path: "/items",
          template: new StandardListItem({
            title: "{title}",
            description: "{description}"
          })
        });
      }

      // Open the dialog
      this._valueHelpDialog.open();
    },

    /**
     * Handle file download requests (for FileDownload elements)
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onFileDownload: function (oEvent) {
      // In a real application, this would be connected to a backend service
      // For now, we'll show a message
      MessageToast.show("File download initiated");

      // Sample approach to download a file:
      // var sUrl = "/api/downloadFile?id=123";
      // var link = document.createElement("a");
      // link.href = sUrl;
      // link.download = "filename.pdf";
      // link.click();
    },

    /**
     * Open message popover (for MessageArea elements)
     * @param {sap.ui.base.Event} oEvent The event object
     */
    handleMessagePopoverPress: function (oEvent) {
      if (!this._messagePopover) {
        this._messagePopover = new MessagePopover({
          items: {
            path: "messages>/messages",
            template: new MessageItem({
              type: "{messages>type}",
              title: "{messages>title}",
              description: "{messages>description}",
              subtitle: "{messages>subtitle}",
              counter: "{messages>counter}"
            })
          }
        });

        this.getView().byId("messagePopoverBtn").addDependent(this._messagePopover);
      }

      this._messagePopover.toggle(oEvent.getSource());
    },

    /**
     * Handle navigation link press events
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onNavigationLinkPress: function (oEvent) {
      var oSource = oEvent.getSource();
      var sHref = oSource.getHref();

      if (sHref) {
        // If href is set, let the default behavior handle it
        return;
      }

      // Otherwise, handle the navigation programmatically
      var sNavTarget = oSource.data("navTarget");
      if (sNavTarget) {
        MessageToast.show("Navigating to: " + sNavTarget);
        // In a real application, this would navigate to the appropriate view or application
        // using the router
      }
    },

    /**
     * Handle office control rendering
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onOfficeControlRendered: function (oEvent) {
      // This would normally integrate with MS Office API or similar
      // In a converted application, this would be replaced by a more appropriate solution
      console.log("Office control container rendered");

      var oSource = oEvent.getSource();
      var sDomRef = oSource.getDomRef();
      if (sDomRef) {
        sDomRef.innerHTML = '<div class="sapUiMediumMargin">' +
          '<div class="sapUiMediumMarginBottom">' +
          '<span class="sapUiIcon sapUiIconMirrorInRTL" style="font-family:SAP-icons;color:#0854a0;font-size:2.5rem">&#xe0ef;</span>' +
          '</div>' +
          '<div class="sapMText">' +
          '<p>Office document integration would be configured here.</p>' +
          '<p>In SAPUI5, this typically uses OData services with MS Graph API integration.</p>' +
          '</div>' +
          '</div>';
      }
    },

    /**
     * Open dialog
     * This is a generic handler for WebDynpro dialog elements
     * @param {sap.ui.base.Event} oEvent The event object
     */
    openDialog: function (oEvent) {
      // Get the dialog ID from the source control
      var oSource = oEvent.getSource();
      var sDialogId = oSource.data("dialogId") || "confirmDialog";

      // Find the dialog in the view
      var oDialog = this.getView().byId(sDialogId);
      if (oDialog) {
        oDialog.open();
      } else {
        MessageToast.show("Dialog with ID '" + sDialogId + "' not found");
      }
    },

    /**
     * Close dialog
     * @param {sap.ui.base.Event} oEvent The event object
     */
    closeDialog: function (oEvent) {
      var oDialog = oEvent.getSource().getParent();
      oDialog.close();
    },

    /**
     * Handle dialog confirm button press
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onDialogConfirm: function (oEvent) {
      // Handle dialog confirmation logic
      MessageToast.show("Dialog confirmed");
      this.closeDialog(oEvent);
    },

    /**
     * Handle dialog cancel button press
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onDialogCancel: function (oEvent) {
      // Handle dialog cancellation
      this.closeDialog(oEvent);
    },

    /**
     * Navigate to SecondView
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onNextPress: function (oEvent) {
      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Navigate to the 'second' route
      oRouter.navTo("second");
    },

    /**
     * Navigate back to main view
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onBackPress: function (oEvent) {
      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Navigate to the 'main' route
      oRouter.navTo("main");
    },

    /**
     * Navigate to a specific route
     * @param {string} sRoute The route name to navigate to
     */
    navTo: function (sRoute) {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo(sRoute);
    },

    /**
     * Handles the press event of the "Add Planning" button.
     * @param {sap.ui.base.Event} oEvent The button press event.
     */
    onAddPlanningPress: function (oEvent) {
      MessageToast.show("Add Planning button pressed.");
    },

    /**
     * Handles the press event of the "Document Overview" button.
     * @param {sap.ui.base.Event} oEvent The button press event.
     */
    onDocumentOverviewPress: function (oEvent) {
      MessageToast.show("Document Overview button pressed.");
    },

    /**
     * Handles the press event of the "Print Preview" button.
     * @param {sap.ui.base.Event} oEvent The button press event.
     */
    onPrintPreviewPress: function (oEvent) {
      MessageToast.show("Print Preview button pressed.");
    },

    /**
     * Handles the press event of the "Messages" button.
     * @param {sap.ui.base.Event} oEvent The button press event.
     */
    onMessagesPress: function (oEvent) {
      MessageToast.show("Messages button pressed.");
    },

    /**
     * Handles the press event of the "Personal Setting" button.
     * @param {sap.ui.base.Event} oEvent The button press event.
     */
    onPersonalSettingPress: function (oEvent) {
      MessageToast.show("Personal Setting button pressed.");
    },

    /**
     * Handles the press event of the "Cancel" button.
     * @param {sap.ui.base.Event} oEvent The button press event.
     */
    onCancelPress: function (oEvent) {
      MessageToast.show("Cancel button pressed.");
    },

    /**
     * Handles the press event of the "Exit" button.
     * @param {sap.ui.base.Event} oEvent The button press event.
     */
    onExitPress: function (oEvent) {
      MessageToast.show("Exit button pressed.");
    }
  });
});
