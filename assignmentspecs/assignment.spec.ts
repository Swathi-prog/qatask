import { browser, element, ExpectedConditions, by } from 'protractor';
import { brokenLinkPage } from '../../pages/brokenLinkPage.po';

describe('Assignment - the-internet.herokuapp.com', () => {
    let brokenLinkPg: brokenLinkPage;

    beforeEach(() => {
        brokenLinkPg = new brokenLinkPage();
        browser.waitForAngularEnabled(false);
    });

    afterEach(() => {

    });

    it('should able to get broken links', (done) => {
        brokenLinkPg.navigateTo('/broken_images');
        brokenLinkPg.image().isDisplayed().then(function (dis) {
            expect(dis).toBe(true, 'able to navigate to page');
            brokenLinkPg.images().then(function (size) {
                for (var i = 1; i <= size.length; ++i) {
                    expect(brokenLinkPg.img(i).getAttribute("naturalWidth")).not.toEqual('0', 'Element --' + i + ' is broken');
                    done();
                };
            });
        });
    });


    it('should able to login', (done) => {
        brokenLinkPg.navigateToUrl('https://admin:admin@the-internet.herokuapp.com/basic_auth');
        brokenLinkPg.header().getText().then(function (dis) {
            expect(dis).toEqual("Basic Auth", 'able to authenticate and login to app');
            done();
        });
    });

    it('should able to move slider to max & min values', (done) => {
        brokenLinkPg.navigateTo('/horizontal_slider');
        brokenLinkPg.horizontalSlider().isDisplayed().then(function (dis) {
            browser.actions().dragAndDrop(brokenLinkPg.horizontalSlider(), { x: 0, y: 100 }).perform();
            browser.sleep(1000);
            browser.actions().dragAndDrop(brokenLinkPg.horizontalSlider(), { x: 100, y: 400 }).perform();
            // expect(dis).toBe(true, 'able to navigate to page');
            brokenLinkPg.horizontalSliderText().getText().then(function (text) {
                expect(text).toEqual('5', "Slider moved to max");
            });
        });
        brokenLinkPg.horizontalSlider().isDisplayed().then(function (dis) {
            browser.actions().dragAndDrop(brokenLinkPg.horizontalSlider(), { x: 100, y: 0 }).perform();
            brokenLinkPg.horizontalSliderText().getText().then(function (text) {
                expect(text).toEqual('0', "Slider moved to min")
                done();
            });
        });
    });

    it('should able to get value on hover', (done) => {
        brokenLinkPg.navigateTo('/hovers');
        for (var i = 1; i < 3; ++i) {
            browser.actions().mouseMove(brokenLinkPg.hoverImage(i)).perform();
            expect(brokenLinkPg.hoverImageText(i).getText()).toContain("user", "User Text for image " + i);
            
            // brokenLinkPg.hoverImage(i).isDisplayed().then(function () {
            //     browser.actions().mouseMove(brokenLinkPg.hoverImage(i)).perform();
            //     brokenLinkPg.hoverImageText(i).getText().then(function (text) {
            //         expect(text).toContain("User","User Text for image "+i);
            //         done();
            //     });
            // });
        };
        done();
        browser.close();
    });

});