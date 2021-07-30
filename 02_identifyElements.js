const {chromium} = require ('playwright');

(async() => {
    const browser = await chromium.launch({headless: false})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://react-redux.realworld.io/#/login')

    //CSS select, Xpath selector, HTML Attributes, Text content
    //const signIn = await page.$('.btn') //. for class # for ids
    //const signIn = await page.$('css=button')
    //const signIn = await page.$('button') //we can skip the css
    //const signIn = await page.$('//button[@type = "submit"]') //xpath
    //const signIn = await page.$('text=Sign in') 
    //const signIn = await page.$('"Sign in"') // or we can remove the text but has to use the double quotes
    const signIn = await page.$("form >> 'Sign in'") //inside the element form pw will look and click in a element with the text sign in, rather than look in the whole page. 

    await signIn.click() 

    const input = await page.$$('.form-control') //looks for all elements in the page with the same selector
    await input[0].click() //it will click in the first input field
    await input[1].click() // it will click in the second input field

    await page.screenshot({
        path: `screenshot.png`
    })

    await browser.close()

}) ()