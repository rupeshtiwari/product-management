import { AppPage } from './app.po';
import {} from 'jasmine';

describe('multiple-apps App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
  });
});
