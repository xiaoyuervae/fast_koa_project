var app = require('koa') ;
var logger = require('koa-logger') ; 
var bodyparser = require('koa-bodyparser') ; 
var staticCache = require('koa-static-cache') ; 
var errorhandler = require('koa-errorhandler') ; 
var session = require('koa-generic-session') ; 
var MongoStore = require('koa-generic-session-mongo') ; 
var flash = require('koa-flash') ;
var gzip = require('koa-gzip') ; 
var schema = require('koa-schema') ; 
var router = require('koa-frouter') ; 
var routerCache = require('koa-router-cache') ; 
var render = require('co-ejs') ; 
var config = require('config-lite') ; 

var merge = require('merge-descriptions') ; 
var core = require('./lib/core') ; 
var renderConf = require('config.renderConf') ; 
merge(renderConf.locals || {} , core , false) ; 

app.keys = [renderConf.locals.$app.name] ; 
app.use(errorhandler()) ;
app.use(bodyparser()) ; 
app.use(staticCache(config.staticCacheConf)) ; 
app.use(logger()) ; 
app.use(session({
	store: new MongoStore(config.mongodb) 
})) ;
app.use(flash()) ; 
app.use(schema(config.schemaConf)) ; 
app.use(routerCache(app,config.routerCacheConf)) ; 
app.use(gzip()) ; 
app.use(render(app,renderConf)) ; 
app.use(router(app,config.routerConf)) ;

app.listen(config.port , function() {
	console.log('server listening on:' , config.port) ;
})