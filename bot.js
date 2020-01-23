"use strict"
const Twit = require('twit');
const config = require('./config.js');
const Twitter = new Twit(config);

const params = {
    q: '#RCB',
    result_type: 'recent',
    lang: 'en'
}

function retweet() {
    Twitter.get('search/tweets', params, function (error, data) {
        if (!error) {
            const tweets = data.statuses[0].id_str;
            Twitter.post('statuses/retweet', { id: tweets }, function (error, data) {
                if (!error) {
                    console.log("Retweet Successful");
                } else {
                    console.error("ERROR: ", error);
                }
            })
        } else {
            console.error("ERROR:",error);
        }
    })
}

retweet();
setInterval(retweet, 100000);