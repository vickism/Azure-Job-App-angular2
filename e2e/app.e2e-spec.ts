import { Angular2ListPage } from './app.po';

describe('angular2-list App', function() {
  let page: Angular2ListPage;

  beforeEach(() => {
    page = new Angular2ListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
