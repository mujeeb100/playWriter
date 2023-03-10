import { test, expect } from "@playwright/test";
// test cases for Application Create, Update, Delete
export default function applicationTests() {
  test.describe("Application", () => {
    // test case for welcome screen NTC_07 start
    test("NTC_07 › Welcome screen", async ({ page }) => {
      // go to application listing page
      await page.goto(`${process.env.PLAYWRIGHT_BASE_URL}/applications`);
      // setup btn click
      const setupPlatformBtn = page.locator("#setup-platform");
      // check is visible
      // TC_01
      await expect(setupPlatformBtn).toBeVisible();
      // check button have setup Platform text
      await expect(setupPlatformBtn).toHaveText("Setup Platform");
      // click on setup platform button
      // TC_02
      await setupPlatformBtn.click();
      return null;
    });
    // test case for welcome screen NTC_07 end
    // test case for application creation NTC_1 start
    test("NTC_1 › Application creation", async ({ page }) => {
      // go to application creation page
      // TC_01
      await page.goto(
        `${process.env.PLAYWRIGHT_BASE_URL}/applications/new/edit`
      );
      // store element
      const addNewApp = page.locator("#add-new-application");
      // check is visible
      await expect(addNewApp).toBeVisible();
      // button have Add new application text
      // TC_01
      await expect(addNewApp).toHaveText("Add new application");
      // input placeholder Enter Application name is visible
      await expect(
        page.locator("[placeholder='Enter Application name']")
      ).toBeVisible();
      // store element
      const addUpadteBtn = page.locator("#add-update-application");
      // check is visible
      await expect(addUpadteBtn).toBeVisible();
      // button to be disabled
      // TC_02
      await expect(addUpadteBtn).toBeDisabled();
      // application name input is visible
      await expect(page.locator("#new-application-name")).toBeVisible();
      // fill application name input
      await page.fill("input#new-application-name", "Test");
      // unfill application name input
      await page.fill("input#new-application-name", "");
      const applicationInputError = page.locator("#new-application-name-error");
      // check is visible
      await expect(applicationInputError).toBeVisible();
      // if input empty display error msg
      await expect(applicationInputError).toHaveText("This field is required");
      // fill application name input
      await page.fill("input#new-application-name", "Test app");
      // button to be enabled
      // TC_03
      await expect(addUpadteBtn).toBeEnabled();
      // create application api intercept request
      // TC_04 && TC_05
      try {
        await Promise.all([
          page.waitForResponse(
            (response) =>
              response.url().includes("/api/verticals") &&
              response.status() === 200
          ),
          // done button click
          await page.locator("#add-update-application").click(),
        ]);
      } catch (e) {
        console.error(e);
      }
      return null;
    });
    // test case for application creation NTC_1 end
  });
}
