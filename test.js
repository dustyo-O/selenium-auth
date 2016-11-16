var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var assert = require('assert');
function check() {

    var browser;

    browser = webdriverio
        .remote(options)
        .init();

    browser.timeouts('implicit', 10000);

    return browser.url('https://www.yandex.ru/')
        .waitForVisible('body',10000)
        .getTitle()
        .then(title => {return title;});

}

var http = require("http");
var url = require("url");


http.createServer(function(request, response) {


    response.writeHead(200, {"Content-Type": "text/plain"});
    check().then(
        check => {
            response.write(check);
            response.end();
        }
    );
}).listen(3000);



