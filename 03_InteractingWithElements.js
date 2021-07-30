const {chromium} = require ('playwright');

(async() => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 50
    })
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://react-redux.realworld.io/#/login')
    
    await page.fill('input[type="email"]', 'qacamp.acad@gmail.com')
    await page.press('input[type="email"]', 'Tab')
    //await page.type('input[type="password"]', 'test12345', {delay: 1000}) //enter the characters one by one, and we can also control the typing speed
    await page.type('input[type="password"]', 'test12345')
    //await page.click('"Sign in"', {position: {x: 0, y:0}, button:'left', modifiers:['Shift'], force: true, timeout:45000 })
    //await page.dblclick('form >> "Sign in"') // performs a double click
    await page.focus('form >> "Sign in"')

    
    await page.screenshot({
        path: `todo.png`
    }) 
    //await browser.close()
}) ()