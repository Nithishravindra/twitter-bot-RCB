"use strict"
const Twit = require('twit');
const config = require('./config.js');
const dateTime = require('node-datetime');
const Twitter = new Twit(config);

const params = {
    q: '#RCB',
    result_type: 'recent',
    lang: 'en'
}

let noOfTweets = 0;
function retweet() {
    Twitter.get('search/tweets', params, function (error, data) {
        if (!error) {
            const tweets = data.statuses[0].id_str;
            const dt = dateTime.create();
            const format = dt.format('Y-m-d H:M:S');
            Twitter.post('statuses/retweet', { id: tweets }, function (error, data) {
                if (!error) {
                    noOfTweets++;
                    console.log("Retweet successful on  " + format);
                    console.log("Total number of tweets = " + noOfTweets);
                } else {
                    console.error(error + " at " + format);
                }
            })
        } else {
            console.error("ERROR:", error);
        }
    })
}

retweet();
setInterval(retweet, 90000*10);