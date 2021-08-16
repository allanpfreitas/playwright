const expect = require ('expect');
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
    expect(logoText).toBe('conduit')

    const logoURL = await page.$eval('.navbar-brand',el => el.href)
    expect(logoURL).toBeDefined()

    const tagsCount = await page.waitForSelector('.tag-default', {
        state: 'visible'
    }, el => el.length)

    //const count = await tagsCount.length

    console.log(tagsCount)

    //const tagsCount = await page.$$eval('.tag-default',el => el.length)
    expect(tagsCount).toBeGreaterThanOrEqual(5)
    expect(tagsCount).toBeLessThan(30)
    expect(tagsCount).toEqual(20)

    //default methods to get values from the elements

    const content = await page.textContent('.navbar-brand')
    console.log('content: ' + content)

    const text = await page.innerText('.navbar-brand')
    console.log('text: ' + text)

    const html = await page.innerHTML('.feed-toggle')
    expect(html).toMatch('Your Feed')
    expect(html).toMatch('Global Feed')

    const href = await page.getAttribute('.navbar-brand', 'href')
    expect(href).not.toMatch('https://react-redux.realworld.io/#/login')


    await page.screenshot({
        path: `04extractingelements.png`
    }) 
    await browser.close()
}) ()