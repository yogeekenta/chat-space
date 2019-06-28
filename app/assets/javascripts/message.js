$(function(){
  function buildMessageHTML(message){
    
    var content = null ? ``: `<p class="lower-message__content">${message.content}</p>`;
    var img = JSON.stringify(message.image.url)
    function buildimage(img){
      return  img == "null" ? ``: `<img class="lower-message__image" src=${img}/>`;
    }
    
    var html = `<div class="message" data-message-id="${message.id}">
                        <div class="upper-message">
                          <div class="upper-message__user-name">
                          ${message.user_name}
                          </div>
                          <div class="upper-message__date">
                          ${message.created_at}
                          </div>
                        </div>
                        <div class="lower-message">
                          ${content}
                          ${buildimage(img)}
                       </div>
                      </div>`
    return  html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildMessageHTML(data);
      $('.messages').append(html)
      document.new_message.reset()
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    .always(() => {
      $(".form__submit").removeAttr("disabled");
      });
  })

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");

      $.ajax({ 
        url: "api/messages",
        type: 'get', 
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        messages.forEach(function (message) {
          var insertHTML = buildMessageHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
  });