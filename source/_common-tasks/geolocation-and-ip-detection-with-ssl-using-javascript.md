---
title: Geolocation and IP detection with SSL using JavaScript
filename: source/_common-tasks/geolocation-and-ip-detection-with-ssl-using-javascript.md
---

When using SSL on Pantheon, the client's IP is not reliably available via PHP, which in turn makes Geolocation impossible. Instead, client-side JavaScript can be used to reliably determine both the client's IP and their location - even with a reverse proxy like CloudFlare and SSL.

As an example, the [MaxMind GeoIP2 JavaScript API](http://www.maxmind.com/en/javascript), a free JavaScript service with attribution can be used to determine both the ISO country code and IP of the visitor via the [W3c Geolocation API](http://dev.w3.org/geo/api/spec-source.html).

This code is only for demonstration purposes; if you were to develop your own custom functionality, **executable code should only reside in the codebase, not the database** .

- First, Sign Up for [MadMind's Free Service](http://www.maxmind.com/en/javascript)
- Next, add your dev, test and live domains to GeoIP JavaScript Domains.
- Finally, add a block to your site as Full HTML with the following content:  
<textarea cols="80" rows="25">&lt;script type="text/javascript" src="//j.maxmind.com/js/apis/geoip2/v2.0/geoip2.js"&gt;&lt;/script&gt;


&lt;script type="text/javascript"&gt;
// Adapted from http://dev.maxmind.com/geoip/geoip2/javascript/
var onSuccess = function(location){
    alert(
        "Country: " + location.country.iso_code
        + "nIP: " + location.traits.ip_address
    );
};


var onError = function(error){
    alert(
        "Error:nn"
        + JSON.stringify(error, undefined, 4)
    );
};


geoip2.city(onSuccess, onError);


&lt;/script&gt;
This website uses &lt;a href="http://www.maxmind.com/en/javascript"&gt;GeoIP2 JavaScript from MaxMind&lt;/a&gt;.</textarea>
