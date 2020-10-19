const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { connectToDatabase } = require('./utils/database');
const { startServer } = require('./server');
const { createTestConfig, createResult } = require('./controllers/resultsController');
const { getJSONLighthouseReport } = require('./scripts/runTest');

const argv = yargs(hideBin(process.argv))
    .demandCommand(1)
    .command('server', 'Start the server', () => {}, async () => {
        await connectToDatabase();
        startServer();
    })
    .command('runTest', 'Run a single test', (yargs) => {
        return yargs.options({
            'url': {
                alias: 'u',
                describe: 'the URL to run the test on',
                demandOption: true,
                type: 'string'
            },
            'file': {
                alias: ['f', 'config', 'configFile'],
                describe: 'path to the config file',
                type: 'string',
                normalize: true
            },
            'categories': {
                alias: 'c',
                describe: 'the categories to test, if omitted all categories will be tested',
                type: 'array',
                choices: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa']
            },
            'mobile': {
                alias: 'm',
                describe: 'emulate mobile device',
                type: 'boolean'
            },
            'speed': {
                alias: 's',
                describe: 'mobile data speed to emulate',
                type: 'string',
                choices: ['2g', '3g', '4g']
            },
            'cookies': {
                describe: 'cookies to set on the page before running the test, they must be formatted like this: name=value',
                type: 'array'
            }
    }).help()
    }, async (argv) => {
        await connectToDatabase();
        console.log(argv);
        const cookies = !!argv.cookies ? argv.cookies.map(cookie => {
            const nameValArr = cookie.split('=');
            return {
                name: nameValArr[0],
                value: nameValArr[1]
            };
        }) : [];
        const categories = !!argv.categories ? argv.categories : [];
        const mobile = !!argv.mobile ? argv.mobile : false;
        const speed = !!argv.speed ? argv.speed : 'none'
        const config = createTestConfig(categories, mobile, speed);
        try {
            console.log('Running the test...');
            const report = await getJSONLighthouseReport(argv.url, config, cookies);
            console.log('Parsing the result...');
            const parsedReport = JSON.parse(report);
            console.log('Saving the result...');
            await createResult(parsedReport);
            console.log('Done')
        } catch (error) {
            console.error('There was an error while running the test...');
            console.error(error);
            process.exit(1);
        }
        process.exit(0);
    })
    .help()
    .argv;
