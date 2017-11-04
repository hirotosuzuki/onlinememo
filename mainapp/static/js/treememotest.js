if (typeof sessionStorage === 'undefined') {
  window.alert("このブラウザはWeb Storage機能が実装されていません");
} else {
  window.alert("このブラウザはWeb Storage機能を実装しています");



(function(){
  // （1）Web Storageの実装確認
  'use strict';
	var titleArea = document.getElementById("titleid");
	var memoArea	= document.getElementById("memoid");
	var saveBtn		= document.getElementById("saveid");
	var removeBtn	= document.getElementById("removeid");
	var memo_list = document.getElementById("memo_list");
	var plusBtn		= document.getElementById("plusid");


    var storage = localStorage;

    // （2）localStorageへの格納
    function setlocalStorage() {

      // var key = document.getElementById("textkey").value;
      // var value = document.getElementById("textdata").value;

      // 値の入力チェック
      if (titleArea.value || memoArea.value) {
        //keyとvalueが入力されたらストレージに保存
        storage.setItem(titleArea.value, memoArea.value);
      }
      // keyとvalueを初期化
      key = "";
      value = "";

      viewStorage();
    }

    // （3）sessionStorageからのデータの取得と表示
    function viewStorage() {

      var list = document.getElementById("memo_list")
      // listの子要素に表示されているものを全て削除。初期化ってことですね
      while (list.firstChild) list.removeChild(list.firstChild);

      // localStorageすべての情報の取得
      for (var i=0; i < storage.length; i++) {
        var _key = storage.key(i);

        // localStorageのキーと値をテーブルに表示
        // var tr = document.createElement("tr");
        // var td1 = document.createElement("td");
        // var td2 = document.createElement("td");
        // list.appendChild(tr);
        // tr.appendChild(td1);
        // tr.appendChild(td2);
        // td1.innerHTML = _key;
        // td2.innerHTML = storage.getItem(_key);
        var li = document.createElement("li");
        list.appendChild(li);
        li.innerHTML = _key;
      }
    }

    // （4）localStorageから削除
    function removeStorage() {
      // var key = document.getElementById("textkey").value;
      var key = titleArea.value;
      storage.removeItem(key);
      key = "";
      viewStorage();
    }

    // （5）localStorageからすべて削除
    function removeallStorage() {
      storage.clear();
      viewStorage();
    }


    saveBtn.addEventListener('click', function(){
      event.preventDefault();
      setlocalStorage();
    });
    removeBtn.addEventListener('click', function(){
      event.preventDefault();
      removeStorage();
    });
    plusBtn.addEventListener('click', function(){

    });


})();

}
