const puppeteer = require('puppeteer');
const fs        = require('fs');

function delay (time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

let USERNAME = ''
let PASSWORD = ''
let USE_PROXY = false

const TWT_LOGIN = 'https://twitter.com/i/flow/login'
const USR_TAG = 'input.r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-1dz5y72.r-fdjqy7.r-13qz1uu'
const NEXT_TAG = 'div[role=button].css-18t94o4.css-1dbjc4n.r-sdzlij.r-1phboty.r-rs99b7.r-ywje51.r-usiww2.r-2yi16.r-1qi8awa.r-1ny4l3l.r-ymttw5.r-o7ynqc.r-6416eg.r-lrvibr.r-13qz1uu'
const PSW_TAG  = 'input[name=password]'
const LGN_TAG  = 'div[role=button].css-18t94o4.css-1dbjc4n.r-sdzlij.r-1phboty.r-rs99b7.r-19yznuf.r-64el8z.r-1ny4l3l.r-1dye5f7.r-o7ynqc.r-6416eg.r-lrvibr';

console.log("process: ", process.argv);

if(process.argv[2]){
    USERNAME = process.argv[2]
    PASSWORD = process.argv[3]
    USE_PROXY = process.argv[4]
}

(async () => {
    
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
        args: [USE_PROXY ? `--proxy-server=${USE_PROXY}` : '']
    });
    
    const page = await browser.newPage();
    // open twitter
    await page.goto(TWT_LOGIN, {waitUntil: 'networkidle2'})
    console.log("success :: ")
    await page.type(USR_TAG, USERNAME);
    await page.click(NEXT_TAG)
    await page.type(PSW_TAG, PASSWORD)
    await delay(400)
    await page.click(LGN_TAG)
    await delay(5000)
    const cookies = await page.cookies()
    let arr = ``
    cookies.forEach( item => {
        if(item.name == 'auth_token'){
            arr += `${USERNAME} ${item.value}\n`
        }
    })
    fs.appendFileSync('out.txt', arr);
    await browser.close();
})();