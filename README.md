# demo-bank-tests

# Test Automation training form jaktestowac.pl 

## Links

- course <https://jaktestowac.pl/course/playwright-wprowadzenie/>
- test site <https://demo-bank.vercel.app/>  
if link broken check <https://jaktestowac.pl/lesson/pw1s01l01/>

- code repository <https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie>

## Commands

- check `NodeJS` version  
`node -v`
- new project with Playwright  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
`npx playwright test`
- run tests with browser GUI  
`npx playwright test --headed`
- view report  
`npx playwright show-report`
- run Trace Viewer on zip file
`npx playwright show-trace trace.zip`

// npx palwright test  - puszczanie testu (testy z głownego katalogu , bo config.ts)
// npx playwright show-reprt
// npx playwright test --headed uruchomi testy z wyświetleniem przeglądarki

### Updating Playwright

- check if Playwright should be updated  
`npm outdated @playwright/test`
- update Playwright  
`npm i @playwright/test`
- update browsers  
`npx playwright install`
- verify Playwright version  
`npx @playwright/test --version`

## Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox  

    ```json
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```

## Visual Studio Code
- Preview: for README.md
- Auto Save: in File -> Auto Save
- Open Timeline: file context menu

## Playwright snippets
- test.describe (group of tests)
- blur()
- running one test: 'test.only'
- fill() focus on element (without click)