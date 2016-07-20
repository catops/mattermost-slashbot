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

function resolveResponse(commandObj, text){
  clearTimeout(commandObj.timeout);
  if(commandObj.res){
    commandObj.res.end(JSON.stringify({response_type: 'in_channel', text: text}));
  }
}

module.exports = function(robot){
  robot.router.use(bodyParser.urlencoded({extended: false}));

  robot.responseMiddleware(function(context, next, done){
    var command = context.response.message.slashCommand;
    if(command){
      delete context.response.message.slashCommand
      resolveResponse(command, context.strings.join('\n'));
      context.strings = [];
    }
    next(done);
  });

  robot.router.post('/hubot/command', function(req, res){
    if(!req.body.command) return res.status(422).end();
    var user = new hubot.User(req.body.user_id, {room: req.body.channel_id, name:req.body.user_name});
    var msg = new hubot.TextMessage(user, robot.name + ' ' + req.body.text)

    msg.slashCommand = {
      res: res,
      timeout: setTimeout(function(){
        res.end();
        msg.slashCommand = null;
      }, 3000)
    };

    robot.receive(msg);
  });

};
