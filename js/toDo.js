var template = Handlebars.compile($("#list").html());

$(document).ready(function(){
  refreshList();

  $('#saveToDo').on('click', function (){
    var $newTodo = $("#newToDo").val();
    $("#newToDo").val("");
    if (!$("#private").is(":checked")) {
      localStorage.setItem("todo: "+ $newTodo, "");
      refreshList();
    } else {
      sessionStorage.setItem("todo: "+ $newTodo, "");
      refreshList();
    }
  })

  $('#clearDone').on('click', function (){
    var checkedBoxes = $("input:checked").parents(".checkboxes");
    checkedBoxes.remove();
    for (var i = 0; i < checkedBoxes.length; i++) {
      var $id = $(checkedBoxes[i]).find("input").data("id");
      localStorage.removeItem("todo: "+$id);
      sessionStorage.removeItem("todo: "+$id);
    }
  })

  $('.main').on('click', 'input', function () {
    var $id = $(this).data("id");
    var $isChecked = $(this).prop("checked");
    console.log("todo: "+$id, $isChecked)
    if ($isChecked) {
      localStorage.setItem("todo: "+$id, "checked");  
    } else {
      localStorage.setItem("todo: "+$id, "");  
    }
  })
})


var refreshList = function () {
  var getMatches = function (k, storage) {
    if (k.match(/^todo: /)) {
      var displayName = k.slice(k.indexOf(": ")+2, k.length);
      var done = storage[k];
      dataArray.push({
        done: done,
        item: displayName
      })
    }
  }
  
  $('.main').html("")
  var dataArray = []
  for(var k in localStorage) {
    getMatches(k, localStorage);
  }
  for(var k in sessionStorage) {
    getMatches(k, sessionStorage)
  }
  var data = {todos: dataArray}
  $('.main').append(template(data));
}

