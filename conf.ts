import { Config, browser } from 'protractor';
import { SpecReporter } from 'jasmine-spec-reporter';
import { platform } from 'os';

export let config: Config = {
  allScriptsTimeout: 110000,
  framework: 'jasmine',
  capabilities: {
    browserName: 'firefox'
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 150000,
    print: function () { }
  },

  // Keep max browsers running to 1 because
  // multiple browsers running at once was pausing/failing for no reason
  maxSessions: 1,

  // You could set no globals to true to avoid jQuery '$' and protractor '$'
  // collisions on the global namespace.
  noGlobals: true,

  onPrepare: () => {
    // Use `jasmine-spec-reporter` as the spec result reporter
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    // Set browser window width to 1200 and height to 900px
    browser.driver.manage().window().setSize(1200, 900);
  },
  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();
    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      var HTMLReport = require('protractor-html-reporter-2');
      const testConfig = {
        reportTitle: 'Assignment Test Execution Report',
        outputPath: './tmp',
        outputFilename: 'AssignmentTestReport',
        screenshotPath: './screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from('guitest-xmloutput.xml', testConfig);
    });
  },
  params: {
    baseUrl: 'https://the-internet.herokuapp.com'
  },
  specs: ['specs/**/assignment.spec.js'],

  seleniumAddress: 'http://localhost:4444/wd/hub'
};
