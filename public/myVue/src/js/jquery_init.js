/**
 * Created by chenjie on 2017/7/21.
 */
$(function(){
  $(window).resize(function(){
    var offset_left = ($('body').width()-1366)/2;
    offset_left<0?$('.container').css('left','0px'):$('.container').css('left',($('body').width()-1366)/2+'px');
  }).resize();
});
