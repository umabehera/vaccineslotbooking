$(document).ready(function(){
    $(".addtolistbutton").click(function(){
       var toadd = $('.toadd').val();
       let myList = JSON.parse(localStorage.getItem("myList", "[]")) || [];
  myList.push(toadd);
  localStorage.setItem("myList", JSON.stringify(myList));
  update_list();
  $('.toadd').val('');
    });
    function update_list(){
    var i=0;
        let myList = JSON.parse(localStorage.getItem("myList", "[]")) || [];
        $('.todolist').empty();

        myList.forEach(element => {
            // console.log(element);
            $('.todolist').append(`<li> <input id="${i}" class="currenttodoitem" type="text" value="${element}"> <button class="delete_item"><i class="fa fa-trash"></i></button></li> `);
            i++;
            
            
        });
    }
    update_list();
    
//     $('.delete_item').on('click',function(){
//         console.log('working');
// //         let myList = JSON.parse(localStorage.getItem("myList", "[]"));
// //         myList.push(toadd);
// //   localStorage.setItem("myList", JSON.stringify(myList));
//        console.log($(this).siblings('input').val());
//     update_list();
        
//     });

$(document).delegate('.delete_item', 'click', function(){
    console.log('working');
        let myList = JSON.parse(localStorage.getItem("myList", "[]"));
        // myList.push(toadd);
        myList.splice(myList.indexOf($(this).siblings('input').val()), 1);
  localStorage.setItem("myList", JSON.stringify(myList));
       console.log($(this).siblings('input').val());
    update_list();
    //etc
});
$(document).delegate('.currenttodoitem', 'keyup', function(){
    var id =$(this).attr('id');
    let myList = JSON.parse(localStorage.getItem("myList", "[]"));
    myList[id]=$(this).val();
    localStorage.setItem("myList", JSON.stringify(myList));

        // console.log($(this).val());
});
});