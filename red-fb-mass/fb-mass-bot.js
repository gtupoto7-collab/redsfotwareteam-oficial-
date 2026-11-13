const puppeteer = require('puppeteer');

const FB_USER = '0878478244';
const FB_PASS = '1231234aaSS@';

// Spisuk s ID-tata ili url-tata na nai-golemite BG grupi (tuka slajsh linkovete na grupite)
const targetGroups = [
    'https://www.facebook.com/groups/obiavi.bulgaria',
    'https://www.facebook.com/groups/reklama.bulgaria',
    'https://www.facebook.com/groups/biznes.idei',
    // Moje da dobavish oshte 500 lanka tuka...
];

const REKKLAMA_TEKST = `🔥 NAIDOBRITE SOFTUERNl RESHENlA, BOT FERMI I BEZSMURTNl SAITOVE za 50€ ot Red Software Team!\n\n💳 Plastane sled 7 dni test s EasyPay!\n🌐 Vizhte poveche tuk: https://redsoftwareteam-oficial.onrender.com\n📞 Tel: 0879813928`;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runMassBot() {
    console.log('🤖 Startiram masov Facebook bot s telefon 0878478244...');

    const browser = await puppeteer.launch({
        headless: false, // Sloji na true, kogato iskash da bachka na fon bez da gledash
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    try {
        // 1. Vhod vav Facebook
        console.log('🔑 Vlizane vav Facebook...');
        await page.goto('https://www.facebook.com/login', { waitUntil: 'networkidle2' });

        await page.type('#email', FB_USER, { delay: 50 });
        await page.type('#pass', FB_PASS, { delay: 50 });
        await page.click('[name="login"]');

        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('✅ Uspeshen vhod vav Facebook!');

        // 2. Obhod na vsichki grupi ot spisaka
        for (let i = 0; i < targetGroups.length; i++) {
            const groupUrl = targetGroups[i];
            console.log(`\n🌐 [Grupa ${i + 1} ot ${targetGroups.length}] Odivam v: ${groupUrl}`);

            try {
                await page.goto(groupUrl, { waitUntil: 'networkidle2' });
                await sleep(5000);

                // Namirane na poleto za postvane v grupata
                console.log('✍️ Pisha reklamata v grupata...');
                await page.evaluate(() => {
                    const spans = Array.from(document.querySelectorAll('span'));
                    const btn = spans.find(s => s.innerText.includes('Napishete neshto') || s.innerText.includes('Write something'));
                    if (btn) btn.click();
                });

                await sleep(3000);

                // Pisane na reklemnia tekst
                const keyboard = page.keyboard;
                await keyboard.type(REKKLAMA_TEKST, { delay: 20 });
                await sleep(3000);

                // Natiskane na buton Publikuvania / Post
                await page.evaluate(() => {
                    const divs = Array.from(document.querySelectorAll('div[role="button"]'));
                    const postBtn = divs.find(d => d.innerText === 'Publikuvania' || d.innerText === 'Post');
                    if (postBtn) postBtn.click();
                });

                console.log(`✅ Uspeshno pusnat post v grupa nomer ${i + 1}!`);

                // 3. Anti-ban zabaviane (chakame 45 sekundi mezhdu grupete, za da ne ni ulovjat filterite)
                console.log('⏳ Chakame 45 sekundi predi sledvashtata grupa (Anti-Ban)...');
                await sleep(45000);

            } catch (groupErr) {
                console.error(`❌ Greshka v grupa ${groupUrl}:`, groupErr.message);
                continue; // Produljavame kam sledvashtata grupa, dori ako tazi dade greshka
            }
        }

        console.log('\n🎉 Vsiakakva reklama vuv vishki grupi zavursi uspeshno!');

    } catch (err) {
        console.error('❌ Obshta greshka v masoviia bot:', err);
    } finally {
        await browser.close();
        console.log('🔒 Brauzerat e zatvoren.');
    }
}

runMassBot();
const puppeteer = require('puppeteer');

const FB_USER = '0878478244';
const FB_PASS = '1231234aaSS@';

const targetGroups = [
    'https://www.facebook.com/groups/obiavi.bulgaria',
    'https://www.facebook.com/groups/reklama.bulgaria',
    'https://www.facebook.com/groups/biznes.idei'
];

const REKKLAMA_TEKST = `🔥 ISKATE LI BESPLATEN SERVER I BEZSMURTEN SAIT?\n\nRED SOFTWARE TEAM izrabotva profesionalni saitove, bot fermi i AI sistemi za samo 50€!\n💳 Plashtane sled 7 dni test s EasyPay!\n🌐 https://red-software-dashbord.onrender.com\n📞 +359 879 813928`;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runMassBot() {
    console.log('🤖 Startiram masov Facebook bot...');
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    try {
        console.log('🔑 Vlizane vav Facebook...');
        await page.goto('https://www.facebook.com/login', { waitUntil: 'networkidle2' });

        await page.type('#email', FB_USER, { delay: 50 });
        await page.type('#pass', FB_PASS, { delay: 50 });
        await page.click('[name="login"]');

        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('✅ Uspeshen vhod vav Facebook!');

        for (let i = 0; i < targetGroups.length; i++) {
            const groupUrl = targetGroups[i];
            console.log(`\n🌐 Odivam v grupa: ${groupUrl}`);

            try {
                await page.goto(groupUrl, { waitUntil: 'networkidle2' });
                await sleep(5000);

                console.log('✍️ Pisha reklamata...');
                await page.evaluate(() => {
                    const spans = Array.from(document.querySelectorAll('span'));
                    const btn = spans.find(s => s.innerText.includes('Napishete neshto') || s.innerText.includes('Write something'));
                    if (btn) btn.click();
                });

                await sleep(3000);

                const keyboard = page.keyboard;
                await keyboard.type(REKKLAMA_TEKST, { delay: 20 });
                await sleep(3000);

                await page.evaluate(() => {
                    const divs = Array.from(document.querySelectorAll('div[role="button"]'));
                    const postBtn = divs.find(d => d.innerText === 'Publikuvania' || d.innerText === 'Post');
                    if (postBtn) postBtn.click();
                });

                console.log(`✅ Uspeshno pusnat post!`);
                await sleep(45000); // Anti-ban pauza
            } catch (groupErr) {
                console.error(`❌ Greshka v grupata:`, groupErr.message);
            }
        }
    } catch (err) {
        console.error('❌ Greshka:', err);
    } finally {
        await browser.close();
    }
}

runMassBot();
