# N-club 使用koa快速开发一个论坛系统

- 2016-10-15 13:39:24 中间件的加载顺序十分重要，errorhandler 需要放到最上面，才能捕获下游抛出的错误。Flash中间件要放到session中间件之后，因为flash功能是基于session实现的。routerCache需要放到rouconfigter前面，而scheme需要放到routerCache前面。gzip压缩中间件需要放到routerCache之后，这样routerCache缓存的就是gzip压缩后的内容了，大大减少了内存消耗。

- 2016-10-15 15:53:24 我们尽量把在app.js中使用的配置信息放到了配置文件里面，其中*./lib/core.js*是暴露出来的核心文件，将它与模板中自定义的locals合并作为co-ejs渲染时的本地变量，模板中还自定义了一个$app变量，保存了模板的主题信息。我们规定模板目录下的publices目录用来存放静态文件，config.js保存了co-ejs的配置。我们还针对未登录的用户对主页进行了缓存，并设置10s生存期

- 2016-10-15 16:30:36 我们根据需求添加了合理的索引，比如可以通过板块名（tab) 或用户名 （user.name）按时间降序查找话题，topics集合则添加了对应的索引，最后，通过index.js到处以供其他模块调用 

- 2016-10-15 19:05:07 helpers/filter.js 保存了自定义的过滤器函数，这里我们到处了三个函数分别用于格式化时间、根据email计算gravatar头像及markdown格式转换。

- 2016-10-15 19:34:55 我们在default.schema.js里面定义了两个函数checkNotLogin和checkLogin,用于检查用户的登录状态，并规定之后非登录状态才能访问signup页或者提交注册信息。在用户提交注册信息后，koa-schema会对请求提做严格的验证，验证失败则直接返回，验证通过则对请求体做过滤和格式化（将密码md5加密）,然后请求才会传递到下一个中间件。