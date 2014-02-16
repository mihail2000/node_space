/** 
	Logout controller

	This controller is only used to take care of logging out a.k.a deleteing the session.
*/

exports.action_index = function(req, res) {

	req.session.user = null;
	res.redirect('/');

}