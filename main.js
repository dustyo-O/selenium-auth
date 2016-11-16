var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var assert = require('assert');
function check(checkNumber) {

    var browser;

    browser = webdriverio
        .remote(options)
        .init();

    browser.timeouts('implicit', 10000);

    return browser.url('http://msk.npfdoverie.ru:9285/fo_crm/ru_RU/')
        .waitForVisible('#splash',10000)
        .waitUntil(
            () => {
                try {
                    var text = browser.alertText();

                    return text.then(text => { return true }).catch(
                        () => {
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
            return `{ "status": 0 }`;
        })
        .getText(".baloonWindow span")
        .then(text => {
            if (text === 'Дубль сверки.')
            {
                return `{ "status": 1 }`;
            }
            else
            {
                return `{ "status": -1 }`;
            }
        });

}

var http = require("http");
var url = require("url");


http.createServer(function(request, response) {
    var q = url.parse(request.url).query;
    const id = q.split('=')[1];

    response.writeHead(200, {"Content-Type": "text/plain"});
    check(id).then(
        check => {
            response.write(check);
            response.end();
        }
    );
}).listen(3000);



