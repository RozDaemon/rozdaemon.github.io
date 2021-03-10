require('babel-register')
require('babel-polyfill')

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*" //Match any network id
		},
		rinkeby: {
			host: "localhost",
			port: 7545,
			from: "0x7ccDA8d7D7Fdb288BFfF465111212C6dD7065474",
			network_id: "*",
			gas: 4612388 //Gas limit used for deploys
		},
	},
	contracts_directory: './src/contracts/',
	contracts_build_directory: './src/abis/',
	compilers: {
		solc: {
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	}
}
