// Controllerutil.js

module.exports = function() {
	return {
		setParams: function(required_params, data) {
			for (var i = 0; i < required_params.length; i++) {
				var paramsobj {};
				paramsobj[required_params[i]] = data.required_params[i];
			}

			return paramsobj;
		}
	}
}