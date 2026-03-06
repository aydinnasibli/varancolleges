const { MongoMemoryServer } = require('mongodb-memory-server');
const { execSync } = require('child_process');

async function main() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log('MongoDB running at', uri);
  try {
    execSync('npm run build', {
      env: { ...process.env, MONGODB_URL: uri },
      stdio: 'inherit'
    });
  } catch(e) {
    process.exitCode = 1;
  } finally {
    await mongod.stop();
  }
}
main();
