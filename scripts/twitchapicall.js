var channels = ["playhearthstone","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
//var JSON = require('JSON');
function addrow(chan,chanpicurl) {
  var newdiv = document.createElement('div');
  var table = document.getElementById('streams-table');
  //console.log(table);
  //console.log(newdiv);
  newdiv.id = chan;
  newdiv.className = "row"; //can't use class its a reserved word, use className to update class.
  table.appendChild(newdiv);
  console.log("4. Create div and populate with channel name and logo.")
  newdiv.innerHTML = `<img src="${chanpicurl}" style="width:100px;height:100px;" \> <b> ${chan} </b>`;
}

function grabuserdata(channel) {
  var userdata = $.getJSON('https://wind-bow.gomix.me/twitch-api/users/'+channel, function(data) {
    //console.log(data);
  })
    .done(function() {
      console.log("2. Finished grabbing data, console log retrieved data:");
      //console.log(userdata);
      console.log("3. Now adding row of stream.")
      console.log(userdata.responseText);//Had to parse the responseText field!!
      var JSONObj = JSON.parse(userdata.responseText);
      console.log(JSONObj);
      addrow(channel, JSONObj.logo);
    });


}
$(document).ready(function() {

  //populate channel list.
  channels.forEach( function (channel) {   
    // var streamdata = $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/'+channel, function(data) {
    //   console.log(data);
    // });
    // var channeldata = $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/'+channel, function(data) {
    //   console.log(data);
    // });
    //});
    console.log("1. Loop through each channel id and run a request to twitch API");
    grabuserdata(channel); // CALLBACKS! printing Rows before pictures finish downloading. Need to have the picture download function run first THEN run the write row function.
  });
});

