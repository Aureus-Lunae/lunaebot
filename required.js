const isbroadcaster = function(user, channel){
	if (user.username === channel)
	{
		broadcaster = true;
	} else {
		broadcaster = false;
	}
}

exports.haspermission = function (user, channel){
	let broadcaster;
	isbroadcaster(user, channel);
	if (user.mod === false && broadcaster === false) {
		return false;
	} else {
		return true;
	}
}

exports.addexclamationmarkifnotpresent = function(exclamation)
{
	if (exclamation.charAt(0) !== `!`)
	{
		return `!${exclamation}`;
	} else {
		return `${exclamation}`;
	}
}

exports.hasenoughparameters = function(parameters, lengthrequired, maxlength)
{
	if (parameters.length < lengthrequired || (parameters.length > maxlength && maxlength != 0)){
		return false;
	} else {
		return true;
	}

}