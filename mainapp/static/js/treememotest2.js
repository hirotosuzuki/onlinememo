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

    //文字入力があるごとに保存
    memoArea.addEventListener('keyup', function(){
      let jsondata = {
  			//title: titleArea.value,
  			memo: memoArea.value
  		};
      saveMemo(titleArea.value, jsondata);
    });

  	saveBtn.addEventListener("click", function(){
  		event.preventDefault(); // buttonの機能を停止しないとブラウザがリロードされてしまう
      let key = titleArea.value;
  		let title_memo_json = {
  			title: titleArea.value,
  			memo: memoArea.value
  		};
  		saveMemo(key, title_memo_json);
      let li = document.createElement("li");
      li.className = 'list-group-item list-group-extend';
      li.id = key
      memo_list.appendChild(li);
      li.innerHTML = titleArea.value;
  	});

  	removeBtn.addEventListener("click", function(){
  		event.preventDefault();
      let key = titleArea.value;
  		removeMemo(key);
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
      });
    }

    window.onload = function(){
      displayList();
    };

  })();
}
