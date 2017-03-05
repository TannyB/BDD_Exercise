'use strict';

require('selenium-webdriver/lib/until.js');
const _ = require('lodash');
const assert = require('assert');
var expect = require('chai').expect;
var webdriver = require('selenium-webdriver');
var until = webdriver.until;

var path = require('path'),browser;
process.env.PATH += ';' + path.dirname(require('chromedriver').path);

var browser = new webdriver.Builder().forBrowser('chrome').build();

 var getDriver = function() {
          return browser;
      }

var Url = "http://www.qaworks.com/";
// function waitForElement(locator, timeout) {
//     return this.wait(until.elementLocated(locator), timeout);
// }

module.exports = function () {

//UI step definitions

  this.Given(/^I am on the QAWorks Site$/, function (callback) {         
        browser.get(Url).then(callback);          
  });

  this.When(/^I click on "(.*)"$/, function (contact,callback) {
        var element = browser.findElement(webdriver.By.linkText(contact));
        element.click().then(callback);
       });

  this.Then(/^I should be able to contact QAWorks with the following information$/, function (list
  ) {
        var nameElement = browser.findElement(webdriver.By.id('ctl00_MainContent_NameBox'));
        var mailElement = browser.findElement(webdriver.By.id('ctl00_MainContent_EmailBox'));
        var msgElement = browser.findElement(webdriver.By.id('ctl00_MainContent_MessageBox'));
        var sendButton =  browser.findElement(webdriver.By.id('ctl00_MainContent_SendButton'));
         
         var data = list.raw();
         var myName = data[0].splice(1,1).toString();
         var myEmail = data[1].splice(1,1).toString();
         var myMsg = data[2].splice(1,1).toString();

      nameElement.sendKeys(myName);
      mailElement.sendKeys(myEmail);
      msgElement.sendKeys(myMsg)
      sendButton.click();

      expect(browser.getCurrentUrl()).toEqual(requestedPage);
      expect (nameElement.getText()).to.be.null;

       });

};

