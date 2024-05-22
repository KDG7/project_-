
/*input 오른쪽 x버튼임. 누르면 입력어 지움 */
var clearInput = function(obj) {
    obj.parentNode.querySelector('input').value = ""
}

/*input에 입력하고 엔터 누르면 바로 검색 button click되게 하는 거*/
function goCropsList(e){
    const txt = document.getElementById("search_region_input").value;
    const code = e.code;

    if(code == 'Enter'){
        document.getElementById("search_region_button").click();
    }
}

function intro_text_box_short(){
    document.getElementsByClassName("intro_text_box")[0].style.height="150px";
    document.getElementsByClassName("intro_text_box")[1].style.height="150px";
    document.getElementsByClassName("intro_text_box")[2].style.height="150px";
}

/*누르면 하단에 div 보이는 거*/
function showContent(content) {
    var contentA = document.getElementById("intro_res_box1");
    var contentB = document.getElementById("intro_res_box2");
    var contentC = document.getElementById("intro_res_box3");

    // 내용 숨김
    contentA.style.display = "none";
    contentB.style.display = "none";
    contentC.style.display = "none";

    // 선택한 내용 보이기
    if (content === "A") {
        intro_text_box_short()
        contentA.style.display = "block";
    } else if (content === "B") {
        intro_text_box_short()
        contentB.style.display = "block";
    } else if (content === "C") {
        intro_text_box_short()
        contentC.style.display = "block";
    }
}




