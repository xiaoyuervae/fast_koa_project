var Comment = require('../models').Comment ; 

// 添加一条评论
exports.addComment = function(data) {
	return Comment.create(data) ;
} ;

// 根据ID获取相应评论
exports.getCommentsByTopicId = function(id) {
	return Comment.find({topic_id: id})
		.sort('update_at')
		.exec() ;
} ;