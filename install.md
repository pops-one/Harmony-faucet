

# Faucet has 3 components

 1. Smart Contract 
 2. Backend  
 3. Frontend

## Installation Steps on Ubuntu 18.04 LTS

*Pre-requisites* 

 1. Make sure ports 80,443 are open 
 2. Do install git, tmux, nano
 `sudo apt-get install -y git tmux nano`
	 
 3. Check out this github repo
 `git clone https://github.com/pops-one/Harmony-faucet.git`
 
 4. Install node version v12.13.1+

	NVM is a node version manager which lets us get a specific version of node easily
	Refer nvm github repo to find latest version of nvm
	e.g to install v0.35.3
	`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`

	Now, to install node v12.13.1, do
	`nvm install v12.13.1`

 5. Smart Contract Installation

	Navigate to faucet-contract folder
	a) Add a `.env` file . refer the same `.env.sample` file.
	Sample contents
	

        GAS_LIMIT=3321900
    	GAS_PRICE=1000000000
    
    	//Address onexxxxxxxxxxxxxxxxxxxxxxxxxxxx
    	TESTNET_PRIVATE_KEY='0xYOURPRIVATEKEY'
    	TESTNET_MNEMONIC='YOUR MNEMONIC'

	Note: This address will be the smart contract owner and will be used to disperse the funds from faucet.

	b) Edit the network.js file to have the relevant network details.
	Following is the example for testnet.
		
	    lrtn_testnet: {
	    	      network_id: '2',
	    	      provider: () => {
	    	        const truffleProvider = new TruffleProvider(
	    	          'https://api.s0.b.hmny.io/',
	    	          { menmonic: process.env.TESTNET_MNEMONIC },
	    	          { shardID: 0, chainId: 2 },
	    	          { gasLimit: gasLimit, gasPrice: gasPrice},
	    	        );
	    	        const newAcc = truffleProvider.addByPrivateKey(process.env.TESTNET_PRIVATE_KEY);
	    	        truffleProvider.setSigner(newAcc);
	    	        return truffleProvider;
	    	      },
	    	    },
	    	

	c) Install openzeppelin
	`npm i @openzeppelin/cli -g`
	
	`npx oz init`

	c) Go to Harmony-faucet folder and run the following command to install all dependencies
	`npm install`

	e) Go to faucet-contract folder and run the following command to deploy th smart contract
	`npx oz deploy`

	When prompted, select deployment type as regular, network as lrtn_testnet, and name of contract 	HarmonyFaucet

	Sample output
	    Nothing to compile, all contracts are up to date.
	    ? Choose the kind of deployment regular
	    ? Pick a network lrtn_testnet
	    ? Pick a contract to deploy HarmonyFaucet
	    ✓ Deployed instance of HarmonyFaucet
	    0xB7bF95f851398732310B1412df2075C517F7a5e7

	Make a note of the contract address
	Also, find the corresponding bech32 wallet format (e.g. one.....) of the contract by using 
	`./hmy utility addr-to-bech32 CONTRACT_ADDRESS_IN_0x_FORMAT`
	Sample output
	`one1k7let7z38xrnyvgtzsfd7gr4c5tl0f08ycysxh`

	4) Domain configurations.
	a) Configure a sub-domain which will be used for the faucet.
	e.g. add an A record as faucet.pops.one with the IP address 

	b) Go to https://www.google.com/recaptcha/admin/create and create a recaptchaV3 for the sub-domain, add localhost too if you are testing.
	Note down the API key + secret

	5) Backend
	Navigate to faucet-backend folder.
	a) Add a .env file similar to .env.sample given
	Change the CAPTCHA_SECRET to the one obtained in step 4b.

	b) navigate to faucet-backed/config folder and create a config.json file similar to config-sample.json
	Sample contents as follows

	

	    {
	        	    "networks": [
	        	    {
	        	        "id": "2",
	        	        "network": 0,
	        	        "chainId": "0x2",
	        	        "name": "Testnet",
	        	        "url": "https://api.s0.b.hmny.io",
	        	        "explorerUrl": "https://explorer.pops.one/#/tx/",
	        	        "contractAddress": "CONTRACT_ADDRESS_IN_one...FORMAT",
	        	        "privateKey": "PRIVATEKEY_OF_SMARTCONTRACT_OWNER_CONFIGURED_IN_.env_OF_faucet-contract folder",
	        	        "mnemonic": "MNEMONIC_OF_SMARTCONTRACT_OWNER_CONFIGURED_IN_.env_OF_faucet-contract folder"
	        	      }
	        	    ],
	        	    "gasPrice": 1,
	        	    "gasLimit": 3321900
	        	}
		
	c) Navigate to the root folder (Harmony-faucet) and run
	`npm run copy`

	This will copy the HarmonyFaucet.json from faucet-contract/build/contracts folder to faucet-backend/config

	d) Open a tmux session and start the backend service
	`tmux new-session -s faucet-backend`
	`npm start`
	You should see a message - Server listening on port 5000...
	press `CTRL-B` and then `d` to detach from the tmux session

	Note: Not an ideal way to run back-end. Was facing compatibility issues with pm2 (node proces manager to run as service). Hence, temporarily running in tmux

	6) Frontend
	Navigate to faucet-frontend
	a) Add a .env file similar to .env.sample
	Sample

	`
	REACT_APP_HOST_API=https://faucet.pops.one/api
	REACT_APP_RECAPTCHA_KEY=YOUR_GOOGLE_RECAPTCHA_KEY_OBTAINED_IN_STEP_4b
	`

	b) Build a production version of frontend by issuing the following command
	`npm run build`

	c) Setup ngnix and certbot.
	`sudo apt-get install nginx -y`
	
	`sudo mkdir -p /var/www/faucet.pops.one/`
	
	`sudo chown -R $USER:$USER /var/www/faucet.pops.one/`
	
	`sudo chmod -R 755 /var/www/faucet.pops.one`

	Copy all the contents of the faucent-frontend/build folder to the html folder
	e.g.
	`cp -R faucet-frontend/build/* /var/www/faucet.pops.one/`

	d) Edit this file
	`sudo nano /etc/nginx/nginx.conf`
	Uncomment the following line (Remove the preceeding # symbol)
	server_names_hash_bucket_size 64;

	e) Create a file /etc/nginx/sites-available/faucet.pops.one with contents as follows
	
	    server {
	        listen 80;
	        listen [::]:80;
	        server_name faucet.pops.one;
	        root /var/www/faucet.pops.one;
	        index index.html;
	        location / {
	             try_files $uri.html $uri $uri/ =404;
	        }
	        location /api/ {
	        proxy_pass  http://127.0.0.1:5000;
	        }
	    }

	f) Enable the site
	`sudo ln -s /etc/nginx/sites-available/faucet.pops.one /etc/nginx/sites-enabled/`

	g) Verify all is okay. You should get an OK response
	`sudo nginx -t`

	h) Restart nginx
	`sudo systemctl restart nginx`

	i) Install certbot
	`sudo apt-get install certbot -y`
	`sudo certbot --nginx`

	After going through the prompts and accepting Option 3) redirect all http traffic to https the site should be accessible
	e.g. https://faucet.pops.one


7) How to change the default amount issued by the faucet and the cool-off period between multiple requests.

e.g. To change the default amount to say 10,1100 (Enter as 10100e18)

Navigate to faucet-contract folder
`npx oz send-tx`
? Pick a network lrtn_testnet
? Pick an instance HarmonyFaucet at 0x4B203bB02fDBd702610b4d2564beAd3af82bd7d2
? Select which function setRate(_sendAmount: uint256)
? _sendAmount: uint256: 10100e18
✓ Transaction successful. Transaction hash: 0x1027c0b30c5c584532143c7948051acd741688fe2c00c670d03da4deeb9b5b3a

e.g. Changing the default number of blocks between consecutive requests.
We can set the time to allow for each request in terms of block height. If you want to set the time of 24 hours then with the 5 sec block time it would require 17280 (86400/5) blocks. Similarly set the block number as per requirement.

`npx oz send-tx`
? Pick a network lrtn_testnet
? Pick an instance HarmonyFaucet at 0x4B203bB02fDBd702610b4d2564beAd3af82bd7d2
? Select which function setBlockHeight(_blockHeight: uint256)
? _blockHeight: uint256: 18000
✓ Transaction successful. Transaction hash: 0x9eaad5521ccbb39144b9a76842fc77ec3ad0a6531467bcfce58319aaee000c34









