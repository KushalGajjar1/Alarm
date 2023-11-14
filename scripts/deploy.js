const hre = require("hardhat");
const path = require("path");
async function main() {
  const alarm = await hre.ethers.getContractFactory("Alarm");
  const contract = await alarm.deploy();

  await contract.deployed();
  console.log("Address of contract:", contract.address);
  saveFrontendFiles(contract);
}

function saveFrontendFiles(contract) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "client", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: contract.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Alarm");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
