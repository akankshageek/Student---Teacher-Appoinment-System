$(function(){
    $('.mdb-select').material_select();
    $('.datepicker').pickadate();
    $('.timepicker').pickatime({
        twelvehour: false,
        darktheme: false
    });
            
    $('.left-toggle').hover(function(){
        $('#boxx').css("width","880px");
        $('#container-left').css("width","62%");
        $('#container-right').css("width","38%");
        $('.appointment-title').css("width","62%");
        $('.appointment-content .card').css("animation-play-state","running");
        $('.appointment-form').css("animation-play-state","running");
        $('.appointment-title').css("display","block");
        setTimeout(function(){
            $('.appointment-content .card').css("animation-delay","0s");
        }, 5500);
    });
    
    //Add Appointment Toggle
    var add = false;
    $('.add-appointment').on('click',function(){
        if(add === true){
            $(this).css("-webkit-transform","rotate(0deg)");
            $(this).css("transform","rotate(0deg)");
            $('.appointment-form').css("display","none");
            $('.appointment-content').css("display","block");
            add = false;
        }
        else if(add === false){
            $(this).css("-webkit-transform","rotate(45deg)");
            $(this).css("transform","rotate(45deg)");
            $('.appointment-form').css("display","block");
            $('.appointment-content').css("display","none");
            add = true;
        }
    });
    //Save Appointment
    $('.save-btn').on('click',function(){
        var appdate = $('#date-picker').val();
        var apptime = $('#time-picker').val();
        var apptype = $('#app-type option:selected').text();
        var apptitle = $('#app-title').val();
        var appdesc = $('#app-desc').val();
        if(appdate == "" || apptime == "" || apptitle == "" || apptype == "Select a option")
            toastr.error('Please fill complete details');
        else{
            $apptemplate = $('.appointment-content .card').clone();
            $apptemplate.find('.app-time').html('<b>' + apptime + '</b>');
            $apptemplate.find('.app-title').html('<b>' + apptitle + '</b>');
            $apptemplate.find('.app-date').html(appdate);
            $apptemplate.find('.app-desc').html(appdesc);
            $('.appointment-content').append($apptemplate);
            toastr.success('Appointment Added!');
            $('#date-picker').val("");
            $('#time-picker').val("");
            $('#app-title').val("");
            $('#app-desc').val("");

        }
    });
    //Message Window Toggle
    var chat = false;
    $('.chat-btn-wrapper').on('click',function(){        
        if(chat === true){
            $('.profile-info').css("display","block");
            if($(window).width()<700)
                $('.profile-pic img').css("display","block");
            else{
                $('.profile-pic img').css("top","18%");
                $('.profile-pic img').css("border","none");
            }
            $('.profile-header').css("background-color","#fff");
            $('.profile-header .pad .left-toggle').css("background-color","#fd5f78");
            $('.profile-header .pad .left-toggle').css("color","#fff");
            $('.user-name').css("color","#fd5f78");
            $('.chat-screen').css("animation-play-state","paused");
            $('.chat-screen').css("display","none");
            $('.chat-toggle-btn').html('MESSAGES');
            $('.chat-toggle-btn').addClass("chat-btn");
            $('.chat-toggle-btn').removeClass("close-btn");
            chat = false;
        }
        else if(chat === false){
            $('.profile-info').css("display","none");
            if($(window).width()<700)
                $('.profile-pic img').css("display","none");
            else{
                $('.profile-pic img').css("top","1%");
                $('.profile-pic img').css("border","solid 3px #fff");
            }
            $('.profile-header').css("background-color","#fd5f78");
            $('.profile-header .pad .left-toggle').css("background-color","#fff");
            $('.profile-header .pad .left-toggle').css("color","#fd5f78");
            $('.user-name').css("color","#fff");
            $('.chat-screen').css("display","block");
            $('.chat-screen').css("animation-play-state","running");
            $('.message_input').on('focus',function(){
                $('.message_input_wrapper').css("border-color","#fd5f78");
            });
            $('.chat-toggle-btn').html('CLOSE');
            $('.chat-toggle-btn').addClass("close-btn");
            $('.chat-toggle-btn').removeClass("chat-btn");
            chat = true;
        }
    });
    //Message Window
    (function () {
        var Message;
        Message = function (arg) {
            this.text = arg.text, this.message_side = arg.message_side;
            this.draw = function (_this) {
                return function () {
                    var $message;
                    $message = $($('.message_template').clone().html());
                    $message.addClass(_this.message_side).find('.text').html(_this.text);
                    $('.messages').append($message);
                    return setTimeout(function () {
                        return $message.addClass('appeared');
                    }, 0);
                };
            }(this);
            return this;
        };
        $(function () {
            var getMessageText, message_side, sendMessage;
            message_side = 'right';
            getMessageText = function () {
                var $message_input;
                $message_input = $('.message_input');
                return $message_input.val();
            };
            sendMessage = function (text) {
                var $messages, message;
                if (text.trim() === '') {
                    return;
                }
                $('.message_input').val('');
                $messages = $('.messages');
                message_side = message_side === 'left' ? 'right' : 'left';
                message = new Message({
                    text: text,
                    message_side: message_side
                });
                message.draw();
                return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
            };
            $('.send_message').click(function (e) {
                return sendMessage(getMessageText());
            });
            $('.message_input').keyup(function (e) {
                if (e.which === 13) {
                    return sendMessage(getMessageText());
                }
            });
            sendMessage('Hello Manoj! :)');
            setTimeout(function () {
                return sendMessage('Hi Chetan! How are you?');
            }, 1000);
            return setTimeout(function () {
                return sendMessage('I\'m fine, thank you!');
            }, 2000);
        });
    }.call(this));
});