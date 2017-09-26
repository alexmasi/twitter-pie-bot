console.log('@BickleyBot is now starting...\n');

const Twit = require('twit')
const config = require('./config')
const pies = require('./pies').pies
const bot = new Twit(config)

tweetListen('1405110913');

function tweetReply(text, originalTweet) {
  const tweet = {
    status: text,
    in_reply_to_status_id: originalTweet.id_str
  }
  bot.post('statuses/update', tweet, tweeted);
  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully tweeted: ' + tweet.status + '\n');
    }
  }
}

function tweetListen(userID) {
  console.log('Looking for tweets from user with ID: ' + userID);
  const stream = bot.stream('statuses/filter', {follow: userID});
  stream.on('tweet', tweetEvent);
  function tweetEvent(tweet) {
    if (tweet.user.screen_name == 'a3masi') {
      console.log('User tweeted: \n');
      console.log('UserID:' + tweet.user.id + '\t UserName:' + tweet.user.name + '\t ScreenName:' + tweet.user.screen_name + '\t' + tweet.text + '\n');
      var number = Math.floor(Math.random() * 31);
      var replyTo = tweet.user.screen_name;
      var replyText = '@' + replyTo + ' Might I recommend making this pie! ' + pies[number] + '\nI\'m sure your friends would love it!';
      console.log(replyText);
      tweetReply(replyText, tweet);
    }
  }
}
