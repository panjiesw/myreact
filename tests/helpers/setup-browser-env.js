const dotenv = require('dotenv-safe');
const browserEnv = require('browser-env');

dotenv.load({
	sample: `${process.cwd()}/.env.example`,
});
browserEnv(['window', 'document', 'navigator']);
