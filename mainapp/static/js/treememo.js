(function(){
	'use strict';
	var titleArea = document.getElementById("titleid");
	var memoArea	= document.getElementById("memoid");
	var saveBtn		= document.getElementById("saveid");
	var removeBtn	= document.getElementById("removeid");
	var memo_list = document.getElementById("memo_list");

	function saveMemo_Title(){
		titleText = titleArea.value;
		memoText = memoArea.value;
		return titleText, memoText;
	};

	function sendStorage(jsondata){
		window.localStorage.setItem('data', JSON.stringify(jsondata));
	};

	function removeMemo(){
		window.localStorage.removeItem('data')
	};

	function getStorage(){
		JSON.parse(window.localStorage.getItem("data"));
	};

	saveBtn.addEventListener("click", function(){
		event.preventDefault(); // buttonの機能を停止しないとブラウザがリロードされてしまう
		var title_memo_json = {
			title: titleArea.value,
			memo: memoArea.value
		};
		sendStorage(title_memo_json);
		memo_list.textContent = titleArea.value;
	});

	removeBtn.addEventListener("click", function(){
		event.preventDefault();
		removeMemo();
	})

})();
