var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var assert = require('assert');
describe('webdriver.io page', function() {
    this.timeout(10000);
    var browser;

    beforeEach(function(done) {
        browser = webdriverio
            .remote(options)
            .init();
        done();
    });

    it('should have the right title', function (done) {

        const checkNumber = '12776512880';
        const formattedNumber = checkNumber.substr(0,3) + '-' + checkNumber.substr(3,3) + '-' + checkNumber.substr(6,3) + ' ' + checkNumber.substr(9);

        console.log(formattedNumber);

        browser.url('http://msk.npfdoverie.ru:9285/fo_crm/ru_RU/')
            .waitForVisible('#splash',10000)
            .waitUntil(
                () => {
                    try {
                        var text = browser.alertText();

                        console.log(text);
                        return text.then(text => { console.log(text); return true }).catch(
                            () => {
                                console.log('no alert');
                                return false
                            }
                        );
                    }
                    catch (e) {
                        return false;
                    }
                }, 5000
            )
            .alertAccept()
            .waitForVisible('#userName',10000)
            .setValue('#userName', 'Бабенышева Анастасия Николаевна')
            .waitForVisible('#userPassword',10000)
            .setValue('#userPassword', 'PFR330B1')
            .click('#okButton')
            .waitForVisible('#form0_СтраховойНомер_i0',30000)
            .click('#form0_СтраховойНомер_i0')
            .keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008")
            .keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008")
            .keys(checkNumber)
            .click('#form0_КнопкаНайтиПоНомеру')


            .call(done);

    }, 10000);

    afterEach(function(done) {
        done();
    });
});

