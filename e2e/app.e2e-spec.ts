import { ModulesPage } from './app.po';

describe('modules App', () => {
  let page: ModulesPage;

  beforeEach(() => {
    page = new ModulesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
