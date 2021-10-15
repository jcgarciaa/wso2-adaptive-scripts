var optBasic = {authenticationOptions:[{authenticator:"basic"}]};
var optIWA = {authenticationOptions:[{idp:"ActiveDirectoryIWA"}]};

var winClients = [
  {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
  {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
  {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
  {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
  {s:'Windows Vista', r:/Windows NT 6.0/},
  {s:'Windows Server 2003', r:/Windows NT 5.2/},
  {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
  {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
  {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
  {s:'Windows 98', r:/(Windows 98|Win98)/},
  {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
  {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
  {s:'Windows CE', r:/Windows CE/},
  {s:'Windows 3.11', r:/Win16/}
];

function isWindowsClient(agent) {
  for (var i = 0; i < winClients.length; i++) {
	var cs = winClients[i];
	if (cs.r.test(agent)) {
	  return true;
	}
  }
  return false;
}

function onLoginRequest(context) {
  var userAgent = context.request.headers["user-agent"];
  if (isWindowsClient(userAgent)) {
	Log.debug("Request from Windows client. Using IWA authentication");
	executeStep(1, optIWA, {});
  } else {
	Log.debug("Request from non-Windows client. Using Basic authentication");
	executeStep(1, optBasic, {});
  }
}

