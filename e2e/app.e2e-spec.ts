import { TicketsSpaPage } from './app.po';

describe('tickets-spa App', () => {
  let page: TicketsSpaPage;

  beforeEach(() => {
    page = new TicketsSpaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
