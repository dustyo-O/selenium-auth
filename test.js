var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var assert = require('assert');
describe('webdriver.io page', function() {
    this.timeout(40000);
    var browser;

    beforeEach(function(done) {
        browser = webdriverio
            .remote(options)
            .init();
        done();
    });

    it('should have the right title', function (done) {

        const checkNumber = '14903891079';
        const formattedNumber = checkNumber.substr(0,3) + '-' + checkNumber.substr(3,3) + '-' + checkNumber.substr(6,3) + ' ' + checkNumber.substr(9);



        browser.url('http://msk.npfdoverie.ru:9285/fo_crm/ru_RU/')
            .waitForVisible('#splash',10000)
            .waitUntil(
                () => {
                    try {
                        var text = browser.alertText();

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
            .click('#form1_СтраховойНомер_i0')
            .keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008")
            .keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008").keys("\u0008")
            .keys(checkNumber)
            .click("#form1_Фамилия_i0")
            .waitForVisible(".baloonWindow", 10000)
            .then(() => {
                //console.log('дубль');
            })
            .catch(() => {
                console.log(`{ "status": 0 }`);
            })
            .getText(".baloonWindow span")
            .then(text => {
                if (text === 'Дубль сверки.')
                {
                    console.log(`{ "status": 1 }`);
                }
                else
                {
                    console.log(`{ "status": -1 }`);
                }
            })
            .call(done);

    }, 40000);

    afterEach(function(done) {
        done();
    });
});

