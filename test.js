var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

/*    .url('')
    .waitUntil(
        () => {
            console.log('1');
            return false;
        }
    );*/

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

        /*.waitUntil(
            () => {

                browser.alertText().then(text => {
                    if (text) {
                        console.log('text:' + text);
                        browser.alertAccept();
                    }
                });


                return browser.isVisible('#userName').then(function(isVisible) {

                    console.log(isVisible);
                    return isVisible;
                });
            }
        )*/
            .call(done);

    }, 10000);

    afterEach(function(done) {
        done();
    });
});


//client.findElement(By.id('userName')).sendKeys('Бабенышева Анастасия Николаевна');
//userName.sendKeys('Бабенышева Анастасия Николаевна');

/*client.get(URL)
    .then(function() {
        client.wait(until.elementLocated(By.id('userName')), 30000).then(
            function()
            {
                client.findElement(By.id('userName')).sendKeys('Бабенышева Анастасия Николаевна');
                client.findElement(By.id('userPassword')).sendKeys('NNU330V1');
                client.findElement(By.id('okButton')).click();

                client.quit();
            }
        );

});*/
