function check() {
  // 表示されているすべてのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) { 
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    //メモをクリックした際に行われる処理を定義
    post.addEventListener("click", () => { 
      //どのメモをクリックしたか、カスタムデータを利用して取得
      const postId = post.getAttribute("data-id");
      //Ajaxに必要なオブジェクトを生成
      const XHR = new XMLHttpRequest();
      //openメソッドでリクエスト先を指定
      XHR.open("GET", `/posts/${postId}`, true);
      //レスポンスの形式を指定
      XHR.responseType = "json";
      //リクエストを送る
      XHR.send();
      //レスポンスを受けっとた際の処理を記述
      XHR.onload = () => {
        if (XHR.status != 200) {
          //レスポンスのステータスを解析し、該当するエラーメッセージを表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          //このあとの処理を行わないために、処理から抜け出す
          return null;
        }
        //レスポンス内容を取得し、itemに代入
        const item = XHR.response.post;
        if (item.checked === true) {
          //既読状態ならcssの色を変えるため、data-checkをtrueに
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          //未読状態なら、HTMLの該当属性を削除
          post.removeAttribute("data-check");
        }
      };
    });
  });
}

setInterval(check, 1000);