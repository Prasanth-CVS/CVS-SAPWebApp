let  apiURL = '';
console.log(window.location.hostname, "HOST NAME")
if (window.location.hostname === 'localhost') {
  apiURL = 'http://20.197.18.80/api_s/api/';
} else if (window.location.hostname === 'covdevhana.veritycloud.com') {
  apiURL = 'http://20.197.18.80/api_s/api/';
} else {
  apiURL = 'http://20.197.18.80/api_s/api/';
}
 
export default apiURL;