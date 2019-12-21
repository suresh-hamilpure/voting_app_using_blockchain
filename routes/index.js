// GET home page.
 
exports.index = function(req, res){
  var message = '';
  res.render('index', {message: message});	// index refers to index.ejs inside views folder
};
