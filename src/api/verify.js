import isPassValid from "./passwords/getPass.cjs";
var get_cookies = function(request) {
  var cookies = {};
  if(request.headers.cookie) {
    request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
  } else {
    return {};
  }
};
function checkPass(req) {
  let cookies = get_cookies(req);
  return isPassValid(cookies["password"], req.hostname);
}

export default checkPass;