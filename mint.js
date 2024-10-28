// 文件: mint.js
require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');

// 从环境变量中获取配置
const providerUrl = 'https://developer-access-mainnet.base.org';
const contractAddress = '0x2f16386bb37709016023232523ff6d9daf444be3';
const contractAbi = [
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// 读取base_wallets.json文件
const wallets = JSON.parse(fs.readFileSync('base_wallets.json', 'utf8'));
// console.log('Wallets:', wallets);

// 初始化提供者
const provider = new ethers.JsonRpcProvider(providerUrl);

async function mintTokens(privateKey) {
  let wallet;
  try {
    // 初始化钱包和合约实例
    wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

    // 调用合约的mint方法
    const tx = await contract.mint();
    console.log(`Transaction hash for wallet ${wallet.address}:`, tx.hash);

    // 等待交易被确认
    const receipt = await tx.wait();
    console.log(`Transaction for wallet ${wallet.address} was mined in block`, receipt.blockNumber);
  } catch (error) {
    console.error(`Error minting tokens for wallet ${wallet.address}:`, error.reason || error.message);
  }
}

function startMinting() {
  // 执行mint方法，每次调用之间添加延迟
  wallets.forEach((privateKey, index) => {
    setTimeout(() => {
      mintTokens(privateKey);
    }, index * 10000); // 每次调用之间延迟10秒
  });

  // 显示下一轮任务执行的倒计时
  let countdown = 5 * 60; // 3分钟倒计时
  const countdownInterval = setInterval(() => {
    if (countdown > 0) {
      process.stdout.write(`\r下一轮任务将在 ${countdown} 秒后执行`);
      countdown--;
    } else {
      clearInterval(countdownInterval);
      console.log('\n开始下一轮任务...');
      startMinting(); // 倒计时结束后启动下一轮任务
    }
  }, 1000); // 每秒更新一次倒计时
}

// 立即执行一次
startMinting();