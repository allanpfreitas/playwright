const {chromium} = require ('playwright');

(async() => {
    const browser = await chromium.launch({
        headless: false
    })
    // const context = await browser.newContext()
    // const page = await context.newPage()
    const page = await browser.newPage()
    await page.goto('http://todomvc.com/examples/react/#/')
    
    const input = await page.$('.new-todo')
    await input.fill('Task_1')
    await input.press("Enter")
    await input.fill('Task_2')
    await input.press("Enter")

    const checks = await page.$$('.toggle')
    checks.forEach(checks => checks.check())


    await page.screenshot({
        path: `todo.png`
    }) 
    //await browser.close()
}) ()