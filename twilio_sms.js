/*
*    Copyright 2019 Misty Robotics, Inc.
*    Licensed under the Apache License, Version 2.0 (the "License");
*    you may not use this file except in compliance with the License.
*    You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
*    Unless required by applicable law or agreed to in writing, software
*    distributed under the License is distributed on an "AS IS" BASIS,
*    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*    See the License for the specific language governing permissions and
*    limitations under the License.
*/

var from_number = "+1XXXXXXXXXX" //number you own in Twilio
var to_number = "+1XXXXXXXXXX"  //number you want to send to
var account_id = "AC################################"; //account_id you get from Twilio
var auth_token = "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"; //auth_token you get from Twilio
var message = "This is the message you want to send"

var jsonBody = 
{
    'Body' : message,
    'From' : from_number,
    'To'   : to_number
};

var credentials = btoa(account_id + ":" + auth_token);


misty.SendExternalRequest("POST", "https://api.twilio.com/2010-04-01/Accounts/AC30759de56173ac654255f91d4cd86f31/Messages.json", "Basic", credentials, JSON.stringify(jsonBody), false, false, "", "application/x-www-form-urlencoded");

function _SendExternalRequest(data)
{
      misty.Debug("In the Twilio Response Callback");
      misty.Debug(JSON.stringify(data));
}

//------------------------------

function btoa(input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    input = utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        keyStr.charAt(enc1) + keyStr.charAt(enc2) +
        keyStr.charAt(enc3) + keyStr.charAt(enc4);

    }

    return output;
}

function utf8_encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
}
