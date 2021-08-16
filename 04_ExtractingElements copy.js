const {chromium} = require ('playwright');

(async() => {
    const browser = await chromium.launch({
        headless: false,
    })
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://react-redux.realworld.io/#/login', {
        waitUntil: 'networkidle'
    })
    
    await page.fill('input[type="email"]', 'qacamp.acad@gmail.com')
    await page.press('input[type="email"]', 'Tab')
    await page.type('input[type="password"]', 'test12345')
    await page.click('form >> "Sign in"')    

    await page.waitForTimeout(5000)

    const logoText = await page.$eval('.navbar-brand',el => el.innerText)
    console.log('logoText: ' + logoText)

    const logoURL = await page.$eval('.navbar-brand',el => el.href)
    console.log('logoURL: ' + logoURL)

    const tagsCount = await page.$$eval('.tag-default',el => el.length)
    console.log('Popular tags count: ' + tagsCount)

    //default methods to get values from the elements

    const content = await page.textContent('.navbar-brand')
    console.log('content: ' + content)

    const text = await page.innerText('.navbar-brand')
    console.log('text: ' + text)

    const html = await page.innerHTML('.feed-toggle')
    console.log('html: ' + html)

    const href = await page.getAttribute('.navbar-brand', 'href')
    console.log('href: ' + href)

    
    await page.screenshot({
        path: `04extractingelements.png`
    }) 
    await browser.close()
}) ()