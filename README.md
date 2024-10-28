### 如何运行 `mint.js` 脚本

#### 1. 克隆项目

首先，克隆你的 GitHub 项目到本地：

```sh
git clone https://github.com/terryso/based_mining_scripts.git
cd based_mining_scripts
```

#### 2. 安装 Node.js 和 npm

确保你已经安装了 Node.js 和 npm。如果没有安装，可以从 [Node.js 官网](https://nodejs.org/)下载并安装。

#### 3. 安装依赖库

在项目目录中安装所需的依赖库：

```sh
npm install ethers dotenv
```

#### 4. 创建 `base_wallets.json` 文件

在项目根目录下创建一个 `base_wallets.json` 文件，并添加你的私钥数组：

```json
[
  "0x私钥1",
  "0x私钥2",
  "0x私钥3"
]
```

将 \`0x私钥1\`、\`0x私钥2\`、\`0x私钥3\` 替换为你的实际私钥。

#### 5. 运行脚本

在项目根目录下运行以下命令来执行 `mint.js` 脚本：

```sh
node mint.js
```