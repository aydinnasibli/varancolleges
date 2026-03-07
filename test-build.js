const { MongoMemoryServer } = require('mongodb-memory-server');
const { execSync } = require('child_process');

async function main() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  process.env.MONGODB_URL = uri;

  console.log(`Started in-memory MongoDB at ${uri}`);

  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log("Build successful!");
  } catch (error) {
    console.error("Build failed:", error);
  } finally {
    await mongod.stop();
  }
}

main();
