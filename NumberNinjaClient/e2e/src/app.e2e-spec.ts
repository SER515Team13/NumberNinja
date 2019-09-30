import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

<<<<<<< HEAD:e2e/src/app.e2e-spec.ts
=======
  // This is not a valid test anymore
>>>>>>> develop:NumberNinjaClient/e2e/src/app.e2e-spec.ts
  xit('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('NumberNinja app is running!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
