if(typeof localStorage === "undefined"){
  window.alert("このブラウザはローカルストレージに対応していません");
}else{
  (function(){
    'use strict';
  	var titleArea = document.getElementById("titleid");
  	var memoArea	= document.getElementById("memoid");
  	var saveBtn		= document.getElementById("saveid");
  	var removeBtn	= document.getElementById("removeid");
  	var memo_list = document.getElementById("memo_list");
  	var plusBtn		= document.getElementById("plusid");

  	function saveMemo(key, jsondata){
  		window.localStorage.setItem(key, JSON.stringify(jsondata));
  	};

  	function removeMemo(key){
  		window.localStorage.removeItem(key);
  	};

  	function getStorage(key){
      //引数のkeyに一致するメモをjson形式で返す
      let jsondata = JSON.parse(window.localStorage.getItem(key));
      return jsondata;
  	};

    function displayList(){
      //既にサイドバーに表示されているリストを消去
      let memolist = document.getElementById("memo_list")
      while (memolist.firstChild){
        memolist.removeChild(memolist.firstChild);
      }
      //ローカルストレージに保存されているデータの表示
      for(let i=0; i<localStorage.length; i++){
        let _key = localStorage.key(i);
        let li = document.createElement("li");
        li.className = 'list-group-item list-group-extend';
        li.id = _key;
        memo_list.appendChild(li);
        let jsondata = getStorage(_key)
        li.innerHTML = jsondata.title;
      }
    };

    //タイトルが重複していたらtrueを返す
    function keyIsExist(target_key){
      let key_list = new Array(localStorage.length);
      for(let i=0; i<localStorage.length; i++){
        key_list[i] = localStorage.key(i);
      }
      if(key_list.indexOf(target_key) >= 0){
        return true;
      }else{
        return false;
      }
    };

    //タイトルが重複していた時に上書き保存するかどうか確認する
    function saveCheck(key, jsondata){
      let res = confirm("同じタイトルのファイルがあります。上書きしますか？");
      if(res==true){//confirmがtrueなら、保存
        saveMemo(key, jsondata);
        displayList();
      }else{//confirmがfalseなら何もしない
        ;
      }
    };

  	saveBtn.addEventListener("click", function(){
  		event.preventDefault(); // buttonの機能を停止しないとブラウザがリロードされてしまう
      let key = titleArea.value;
  		let title_memo_json = {
  			title: titleArea.value,
  			memo: memoArea.value
  		};
      if(keyIsExist(key)){
        //タイトルが重複していたら上書きするかconfirmし、
        saveCheck(key, title_memo_json);
      }else{
    		saveMemo(key, title_memo_json);
        displayList();
      }
  	});

  	removeBtn.addEventListener("click", function(){
  		event.preventDefault();
      let key = titleArea.value;
  		removeMemo(key);
      displayList();
  	});

    //サイドバー上のリストのある項目がクリックされるとタイトルとメモが表示される
    if(document.getElementById('memo_list').hasChildNodes()){
      let list = document.getElementById('memo_list');
      list.addEventListener('click', function(){
        let target = event.target;
        let target_id = target.getAttribute('id');
        let target_key = target_id;
        let jsondata = getStorage(target_key);
        document.getElementById("titleid").textContent = jsondata.title;
        document.getElementById("memoid").textContent = jsondata.memo;
        displayList();
      });
    }

    window.onload = function(){
      displayList();
    };

  })();
}
