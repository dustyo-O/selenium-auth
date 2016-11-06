var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'safari'
    }
};
webdriverio
    .remote(options)
    .init()
    .url('http://msk.npfdoverie.ru:9285/fo_crm/ru_RU/')
    .waitForVisible('#userName', 5000)
    .waitForVisible('#userPassword', 5000)
    .setValue("#userName",'Бабенышева Анастасия Николаевна')
    .click('#okButton');


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