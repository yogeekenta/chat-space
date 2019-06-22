$(function() {
  var preinput;
  function buildHTML(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">
                ${user.name}
                </p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">
                追加
                </div>
                </div>`
    return html;
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var input = input.split(" ");
    var input = input.join();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: ('keyword=' + input ),
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (input !== preinput && users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          console.log(user)
          html = buildHTML(user);
          $('#user-search-result').append(html)
        });
      }
      else {
        console.log("一致するユーザーはいません");
      }
      preinput = input
    })
    .fail(function(){
      alert('error');
    })
  });
});

