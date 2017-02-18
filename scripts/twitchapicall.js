var channels = ["playhearthstone", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
//var JSON = require('JSON');
function addrow(chan, chanpicurl) {
  var newdiv = document.createElement('div');
  var table = document.getElementById('streams-table');
  //console.log(table);
  //console.log(newdiv);
  newdiv.id = chan;
  newdiv.className = "row"; //can't use class its a reserved word, use className to update class.
  table.appendChild(newdiv);
  //console.log("4. Create div and populate with channel name and logo.")
  newdiv.innerHTML = `<div class="col-md-4"><img src="${chanpicurl}" style="width:100px;height:100px;" \></div>
                      <div class="col-md-6"><span id='${chan}-desc'><b> ${chan} </b></span><p id="${chan}-info-here"> Stream Info Here
                      </p></div>
                      <div class="col-md-2"><p id="${chan}-status">Status: Retreiving...</p>
                      </div>`;
}

function updatestatus(chan, newmsg) {
  var status = document.getElementById(chan + '-status');
  //console.log(chan + '-status');
  if (newmsg === "Status: Live") {
    status.innerHTML = `${newmsg}`;
  } else {
    status.innerHTML = newmsg;
  }
}

function addStreamInfo(chan, chanprev, chanurl, streaminfo) {
  var streaminfo = document.getElementById(chan + "-info-here");
  //console.log(`this is my stream info dom object ${streaminfo}`);
  streaminfo.innerHTML = `<a href="${chanurl}"><img src="${chanprev}" ></a> Description: <span>${streaminfo}</span> `;
  var StreamTitle = document.getElementById(chan + "-desc");
  StreamTitle.innerHTML = `${chan} - ${streaminfo}`;
}

function grabuserdata(channel) {
  var userdata = $.getJSON('https://wind-bow.gomix.me/twitch-api/users/' + channel, function (data) {
      //console.log(data);
    })
    .done(function () {
      //console.log("2. Finished grabbing data, console log retrieved data:");
      //console.log(userdata);
      //console.log("3. Now adding row of stream.")
      //console.log(userdata.responseText); //Had to parse the responseText field!!
      var JSONObj = JSON.parse(userdata.responseText);
      //console.log(JSONObj);
      addrow(channel, JSONObj.logo);
    });
  userdata.done(function () {
    var streamdata = $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + channel, function (data) {
      //console.log(data);
    }).done(function () {
      //console.log(streamdata);
      //console.log("done getting stream data");
      //console.log(streamdata.responseText);
      var StreamJSON = JSON.parse(streamdata.responseText);
      if (StreamJSON['stream'] === null) {
        updatestatus(channel, "Status: Offline");
      } else {
        console.log(StreamJSON.stream.channel.url);
        console.log(StreamJSON.stream.channel.status);
        updatestatus(channel, "Status: Live");
        addStreamInfo(channel, StreamJSON.stream.preview.large, StreamJSON.stream.channel.url, StreamJSON.stream.channel.status);
      }
    });
  });
  userdata.done(function () {
    var channeldata = $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + channel, function (data) {
      //   console.log(data);
    }).done(function () {
      //console.log(channeldata.responseText);
    });
    //});
  });


}
$(document).ready(function () {

  //populate channel list.
  channels.forEach(function (channel) {
    // var streamdata = $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/'+channel, function(data) {
    //   console.log(data);
    // });
    // var channeldata = $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/'+channel, function(data) {
    //   console.log(data);
    // });
    //});
    //console.log("1. Loop through each channel id and run a request to twitch API");
    grabuserdata(channel); // CALLBACKS! printing Rows before pictures finish downloading. Need to have the picture download function run first THEN run the write row function.
  });
});