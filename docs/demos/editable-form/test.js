describe('editable-form', function() {

  beforeEach(function() {
    browser().navigateTo('../../index.html');
  });

  it('should show form by `edit` button click and close by `cancel`', function() {
    var s = '[ng-controller="EditableFormCtrl"] ';

    //edit button initially shown, form initially hidden
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(1);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(2);
    expect(element(s+'form > div > button:visible').count()).toBe(1);
    expect(element(s+'form > div > span button:visible').count()).toBe(0);
    expect(element(s+'select').count()).toBe(0);
    expect(element(s+'input[type="text"]').count()).toBe(0);

    //show form
    element(s+'form > div > button').click();

    //form shown in disabled state (loading)
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'form > div > button:visible').count()).toBe(0);
    expect(element(s+'form > div > span button:visible:disabled').count()).toBe(2);
    expect(element(s+'select:disabled:visible').count()).toBe(2);
    expect(element(s+'input[type="text"]:disabled:visible').count()).toBe(1);
    
    sleep(1);

    //form enabled when data loaded
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'form > div > button:visible').count()).toBe(0);
    expect(element(s+'form > div > span button:visible:enabled').count()).toBe(2);
    expect(element(s+'select:enabled:visible').count()).toBe(2);
    expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);

    //click cancel
    element(s+'form > div > span button[type="button"]').click();

    //form closed
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(1);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(2);
    expect(element(s+'form > div > button:visible').count()).toBe(1);
    expect(element(s+'form > div > span button:visible').count()).toBe(0);
    expect(element(s+'select').count()).toBe(0);
    expect(element(s+'input[type="text"]').count()).toBe(0);
  });

  it('should show form and save new values', function() {
    var s = '[ng-controller="EditableFormCtrl"] ';

    //show form
    element(s+'form > div > button').click();
    
    sleep(1);

    //set incorrect values
    using(s+'form > div:eq(0)').input('$data').enter('username2'); 
    element(s+'form > div > span button[type="submit"]').click();

    //error shown
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'select:enabled:visible').count()).toBe(2);
    expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);
    expect(element(s+'form > div:eq(0) .editable-error').text()).toMatch('Username should be `awesome`');

    //set correct values
    using(s+'form > div:eq(0)').input('$data').enter('awesome'); 
    using(s+'form > div:eq(1)').select('$data').option('3'); //status4
    using(s+'form > div:eq(2)').select('$data').option('0'); //user
    element(s+'form > div > span button[type="submit"]').click();

    //saving
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(0);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(0);
    expect(element(s+'form > div > button:visible').count()).toBe(0);
    expect(element(s+'form > div > span button:visible:disabled').count()).toBe(2);
    expect(element(s+'select:disabled:visible').count()).toBe(2);
    expect(element(s+'input[type="text"]:disabled:visible').count()).toBe(1);
    //no error shwn
    expect(element(s+'form > div:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(1);

    //form closed, new values shown
    expect(element(s+'form > div > span[editable-text]:visible').count()).toBe(1);
    expect(element(s+'form > div > span[editable-select]:visible').count()).toBe(2);
    expect(element(s+'form > div > span[editable-text]:visible').text()).toMatch('awesome');
    expect(element(s+'form > div > span[editable-select]:visible:eq(0)').text()).toMatch('status4');
    expect(element(s+'form > div > span[editable-select]:visible:eq(1)').text()).toMatch('user');

    expect(element(s+'form > div > button:visible').count()).toBe(1);
    expect(element(s+'form > div > span button:visible').count()).toBe(0);
    expect(element(s+'select').count()).toBe(0);
    expect(element(s+'input[type="text"]').count()).toBe(0);
  });

});