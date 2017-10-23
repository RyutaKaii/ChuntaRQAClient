/** ユーザー名 */
var user;
/** パスワード */
var pass;

function doLogout() {
    user = "";
    pass = "";
    
    window.location.href = 'index.html';
}

/**
 * 画面からリクエストパラメータを取得してリクエストを送信、結果を表示する.<br>
 * 取得できないパラメータは空文字を設定する.
 * @param {type} url
 * @param {type} resultTyoe
 * @returns {undefined}
 */
function doRequest(url, resultTyoe) {
    var paramArray = getRequestParameterAll();
    var jsonObject = createJsonObject(paramArray);
    var jsonStr = createJsonStrFromObject(jsonObject);
    
    requestServer(url, jsonStr, resultTyoe);
}

/**
 * 画面から全てのリクエストパラメータを取得し連想配列を返却する.<br>
 * 取得できないパラメータは空文字とする.
 * @returns {getParameterAll.paramArray|Element}
 */
function getRequestParameterAll() {
    var paramArray =
            {
                "input_user": "",
                "input_pass": "",
                "input_mail": "",
                "input_response": "",
                "input_no": "",
                "input_question": "",
                "input_title": "",
                "input_mail2": "",
                "input_answer": "",
                "input_lastupdate": "",
                "input_user2": "",
                "input_no2": "",
                "input_error": ""
            };

    for (key in paramArray) {
        if (document.getElementById(key) !== null) {
            paramArray[key] = document.getElementById(key).value;
        }
    }

    return paramArray;
}

/**
 * 結果を出力する.
 * @param {type} resultObject
 * @param {type} resultTyoe
 * @returns {undefined}
 */
function viewResult(resultObject, resultTyoe) {
    // レスポンスオブジェクトから各オブジェクトを取得
    var userTableList = resultObject["userTableList"];
    var qaTableList = resultObject["qaTableList"];
    var errorTableList = resultObject["errorTableList"];
    
    // 出力する変数
    var txt = "";
    
    // エラーが返却された場合は戻るボタンとエラー情報のみ出力
    if (isExistError(errorTableList)) {
        txt = txt + "<input type=\"button\" id=\"logout\" value=\"戻る\" class=\"btn btn-default\" onclick=\"doLogout();\" /><br />";
        txt = viewError(txt, errorTableList);
        document.getElementById("erea_result").innerHTML = txt;
        
        return;
    }
    
    // 認証情報を取得
    getAuthInfo(userTableList);
    
    // ヘッダ出力
    txt = viewHeadder(txt);

    // コンテンツ出力
    if (resultTyoe === 1) {
        txt = viewUpdateForm(txt, qaTableList);
    } else if(resultTyoe === 0) {
        txt = viewList(txt, qaTableList);
    } else if(resultTyoe === 2) {
        txt = viewModifyComplete(txt);
    }
    
    // hiddenタグ出力
    txt = viewHidden(txt);
    
    // 出力エリアに設定
    document.getElementById("erea_result").innerHTML = txt;
}

/**
 * ヘッダを出力する.
 * @param {type} txt
 * @returns {String}
 */
function viewHeadder(txt) {
    txt = txt + "<input type=\"button\" id=\"logout\" value=\"ログアウト\" class=\"btn btn-default\" onclick=\"doLogout();\" />";
    txt = txt + "<input type=\"button\" id=\"select\" value=\"一覧表示\" class=\"btn btn-default\" onclick=\"doRequest(\'selectList\', 0);\" />";
    
    return txt;
}

/**
 * 認証情報を設定する.
 * @param {type} userTableList
 * @returns {undefined}
 */
function getAuthInfo(userTableList) {
    for (key in userTableList) {
        user = userTableList[key].user;
        pass = userTableList[key].pass;
    }
}

/**
 * 一覧を表示する.
 * @param {type} txt
 * @param {type} qaTableList
 * @returns {String|@var;txt}
 */
function viewList(txt, qaTableList) {
    txt = txt + "<input type=\"submit\" value=\"新規登録\" class=\"btn btn-default\" onclick=\"viewInsertForm();\" />";

    for (key in qaTableList) {
        txt = txt + "<p><span class=\"label label-default\">No.";
        txt = txt + convertNToBrTag(qaTableList[key].no);
        txt = txt + "</span></p>";
        txt = txt + "<p><span class=\"label label-default\">タイトル</span></p>";
        txt = txt + "<p class=\"well\">";
        txt = txt + convertNToBrTag(qaTableList[key].title);
        txt = txt + "</p>";
        txt = txt + "<p><span class=\"label label-default\">問題</span></p>";
        txt = txt + "<p class=\"well\">";
        txt = txt + convertNToBrTag(qaTableList[key].question);
        txt = txt + "</p>";
        txt = txt + "<p><span class=\"label label-default\">答え</span></p>";
        txt = txt + "<p class=\"well\">";
        txt = txt + convertNToBrTag(qaTableList[key].answer);
        txt = txt + "</p>";
        txt = txt + "<p>";
        txt = txt + "作成者：";
        txt = txt + qaTableList[key].user;
        txt = txt + "     更新日：";
        txt = txt + qaTableList[key].lastupdate;
        txt = txt + "</p>";
        txt = txt + "<p>";
        txt = txt + "<input type=\"button\" value=\"更新\" class=\"btn btn-default\" onclick=\"doRequest(\'selectQaOne?no=" + qaTableList[key].no + "\', 1);\" />";
        txt = txt + "<input type=\"button\" value=\"削除\" class=\"btn btn-default\" onclick=\"doRequest(\'deleteQa?no=" + qaTableList[key].no + "\', 2);\" />";
        txt = txt + "</p>";
        txt = txt + "<hr />";
    }
    
    return txt;
}

/**
 * 更新用フォームを表示する.
 * @param {type} txt
 * @param {type} qaTableList
 * @returns {String}
 */
function viewUpdateForm(txt, qaTableList) {
    for (key in qaTableList) {
        txt = txt + "<br /><br />";
        txt = txt + "<h1><span class=\"label label-default\">更新</span></h1>";
        txt = txt + "<p><span class=\"label label-default\">No</span></p>";
        txt = txt + "<p>" + qaTableList[key].no + "</p>";
        txt = txt + "<p><span class=\"label label-default\">タイトル</span></p>";
        txt = txt + "<textarea rows=\"5\"  id=\"input_title\" class=\"form-control\">" + qaTableList[key].title + "</textarea><br />";
        txt = txt + "<p><span class=\"label label-default\">問題</span></p>";
        txt = txt + "<textarea rows=\"5\" id=\"input_question\" class=\"form-control\">" + qaTableList[key].question + "</textarea><br />";
        txt = txt + "<p><span class=\"label label-default\">答え</span></p>";
        txt = txt + "<textarea rows=\"5\" id=\"input_answer\" class=\"form-control\">" + qaTableList[key].answer + "</textarea><br />";
        txt = txt + "<input type=\"button\" value=\"更新\" class=\"btn btn-default\" onclick=\"doRequest(\'updateQa\', 2);\" /><br />";
        
        txt = txt + "<input type=\"hidden\" id=\"input_no\" value=\"" + qaTableList[key].no + "\" />";
    }
    
    return txt;
}

/**
 * 処理完了画面を表示する.
 * @param {type} txt
 * @returns {String|@var;txt}
 */
function viewModifyComplete(txt) {
    txt = txt + "<br /><br /><p class=\"well\">処理が完了しました。</p>";
    
    return txt;
}

/**
 * エラー情報を表示する.
 * @param {type} txt
 * @param {type} errorTableList
 * @returns {String}
 */
function viewError(txt, errorTableList) {
    for (key in errorTableList) {
        if (errorTableList[key].no !== '0') {
            txt = txt + "<h1><span class=\"label label-default\">エラー情報</span></h1>";
            txt = txt + "<p class=\"well\">";
            txt = txt + "NO:" + errorTableList[key].no + "  " + errorTableList[key].error;
            txt = txt + "</p>";
        }
    }
    
    return txt;
}

/**
 * 入力フォームを出力する.
 * @returns {undefined}
 */
function viewInsertForm() {
    var txt = "";
    
    txt = viewHeadder(txt);
    
    txt = txt + "<h1><span class=\"label label-default\">新規登録</span></h1>";
    txt = txt + "<p><span class=\"label label-default\">タイトル</span></p>";
    txt = txt + "<textarea rows=\"5\" id=\"input_title\" class=\"form-control\"></textarea><br />";
    txt = txt + "<p><span class=\"label label-default\">問題</span></p>";
    txt = txt + "<textarea rows=\"5\" id=\"input_question\" class=\"form-control\"></textarea><br />";
    txt = txt + "<p><span class=\"label label-default\">答え</span></p>";
    txt = txt + "<textarea rows=\"5\" id=\"input_answer\" class=\"form-control\"></textarea><br />";
    txt = txt + "<input type=\"button\" value=\"登録\" class=\"btn btn-default\" onclick=\"doRequest(\'insertQa\', 2);\" /><br />";
    
    txt = viewHidden(txt);
        
    document.getElementById("erea_result").innerHTML = txt;
}

/**
 * グローバル変数から取得した認証情報を埋め込んだhtmlを表示する.
 * @param {type} txt
 * @returns {String|type}
 */
function viewHidden(txt) {
    // グローバル変数から取得した認証情報の埋め込み
    txt = txt + "<input type=\"hidden\" id=\"input_user\" value=\"" + user + "\" />";
    txt = txt + "<input type=\"hidden\" id=\"input_pass\" value=\"" + pass + "\" />";
    
    return txt;
}

/**
 * \n → brタグ変換
 * @param {type} str
 * @returns {unresolved}
 */
function convertNToBrTag(str) {
    str = str.replace( /\n/g , "<br />" ) ;
    return str;
}

/**
 * エラー情報が存在するか判定する.
 * @param {type} errorTableList
 * @returns {boolean}
 */
function isExistError(errorTableList) {
    for (key in errorTableList) {
        if (errorTableList[key].no !== '0') {
            return true;
        }
    }
    
    return false;
}

/**
 * 通信エラー画面を出力する.
 * @returns {undefined}
 */
function viewTranseError() {
    // 出力する変数
    var txt = "";
    
    txt = txt + "<h1><span class=\"label label-default\">エラー情報</span></h1>";
    txt = txt + "<p class=\"well\">";
    txt = txt + "通信エラーが発生しました。お手数ですがしばらく経ってから再度アクセスしてください。";
    txt = txt + "</p>";
    
    // 出力エリアに設定
    document.getElementById("erea_result").innerHTML = txt;
}