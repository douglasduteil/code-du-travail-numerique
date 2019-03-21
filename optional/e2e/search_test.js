Feature("Search");

Scenario("Rupture conventionnelle", I => {
  I.amOnPage("/");
  I.fillField("Recherche", "Rupture conventionnelle");
  I.pressKey("Enter");

  I.waitInUrl("/recherche");
  I.see("Service Public | Rupture conventionnelle");
});
