var path = require('path') ; 

module.exports = {
	port: process.env.port || 3000 ,
	mongodb: {
		url: 'mongodb://127.0.0.1:27017/club' 
	},
	schemaConf: path.join(__dirname,'.default.scheme') ,
	staticCacheConf: path.join(__dirname , '../theme/publics') ,
	renderConf: path.join(__dirname , '../theme/config') ,
	routerConf: 'routes' ,
	routerCacheConf: {
		'/': {
			expire: 10*1000 ,
			condition: function() {
				return !this.session || !this.session.user ;
			}
		}
	}
} ; 