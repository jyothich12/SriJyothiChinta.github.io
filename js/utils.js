$(document).ready(function(){

 /*   $(".nav").click(function () {

    	$(".nav").removeClass("active");
    	$(this).addClass("active");
    });*/

  var modal = $("#myModal");
  var thumbnail = $("#anchrTech")[0];
  var video = modal.find("video")[0];
  var span = $("#btnClose")[0];
  
  thumbnail.onclick = function() {
    modal[0].style.display = "block";
    video.currentTime = 0;
    video.play();

    $("Audio").get(0).pause()
  }
  
  span.onclick = function() {
    modal[0].style.display = "none";
    video.pause();
  }
  
  window.onclick = function(event) {
    if (event.target == modal[0]) {
      modal[0].style.display = "none";
      video.pause();
    }
  }
});

function toogleAudioPlay(e){
    var myAudio = $(e).find("Audio").get(0);
    return myAudio.paused ? myAudio.play() : myAudio.pause();
}