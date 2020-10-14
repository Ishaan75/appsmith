const commonlocators = require("../../../locators/commonlocators.json");
const formWidgetsPage = require("../../../locators/FormWidgets.json");
const dsl = require("../../../fixtures/tableInputDsl.json");
const pages = require("../../../locators/Pages.json");
const widgetsPage = require("../../../locators/Widgets.json");
const publish = require("../../../locators/publishWidgetspage.json");
const testdata = require("../../../fixtures/testdata.json");
const dsl2 = require("../../../fixtures/displayWidgetDsl.json");
const pageid = "MyPage";

describe("Binding the multiple Widgets and validating NavigateTo Page", function() {
  before(() => {
    cy.addDsl(dsl);
  });

  it("Input widget test with default value from table widget", function() {
    cy.openPropertyPane("inputwidget");
    cy.get(widgetsPage.defaultInput).type(testdata.defaultInputWidget);
    cy.get(".t--open-dropdown-Select-Action").click();
    cy.get(commonlocators.chooseAction)
      .children()
      .contains("Navigate To")
      .click();
    cy.enterActionValue(pageid);
    cy.get(commonlocators.editPropCrossButton).click();
  });

  it("Create MyPage and valdiate if its successfully created", function() {
    cy.Createpage(pageid);
    cy.addDsl(dsl2);
    cy.get(".t--entity-name:contains(MyPage)");
  });

  it("Validate NavigateTo Page functionality ", function() {
    cy.SearchEntityandOpen("Table1");
    cy.isSelectRow(1);
    cy.readTabledataPublish("1", "0").then(tabData => {
      const tabValue = tabData;
      expect(tabValue).to.be.equal("2736212");
      cy.log("the value is" + tabValue);

      cy.get(publish.inputWidget + " " + "input")
        .first()
        .invoke("attr", "value")
        .should("contain", tabValue);
      cy.get(".t--widget-chartwidget").should("not.be.visible");

      cy.get(".bp3-input-group input")
        .first()
        .clear();
      cy.get(".t--widget-chartwidget").should("be.visible");
    });
  });
});
