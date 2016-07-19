/*
   Description:
     A Hubot script that parses slash commands from Mattermost, forwards them to the bot, then formats the bot response to be slash command friendly.

   Dependencies:
     None 

   Author:
     Wyatt Pearsall
*/

var bodyParser = require('body-parser');
var hubot = require('hubot');

var responseStore = {};

function resolveResponse(tag, text){
  responseStore[tag].end(JSON.stringify({response_type: 'in_channel', text: text}));
  delete responseStore[tag];
}

module.exports = function(robot){
  robot.router.use(bodyParser.urlencoded({extended: false}));

  robot.responseMiddleware(function(context, next, done){
    if(context.response.message.slashCommand){
      resolveResponse(context.response.message.slashCommand, context.strings.join('\n'));
      context.strings = [];
    }
    next(done);
  });

  robot.router.post('/hubot/command', function(req, res){
    console.log('message from mattermost');
    if(!req.body.command) return res.status(422).end();
    console.log(req.body);
    var user = new hubot.User(req.body.user_id, {room: req.body.channel_id, name:req.body.user_name});
    var msg = new hubot.TextMessage(user, robot.name + ' ' + req.body.text)

    var tag = Math.ceil(Math.random() * 1e17);

    msg.slashCommand = tag;
    responseStore[tag] = res;

    robot.receive(msg);
  });

};
