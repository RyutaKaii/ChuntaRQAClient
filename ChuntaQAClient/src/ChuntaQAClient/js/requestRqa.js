// 明示的にjQueryでpostすることを宣言する
jQuery.support.cors = true;

/**
 * サーバにリクエストを送信する.
 * @param {type} url
 * @param {type} jsonStr
 * @param {type} resultTyoe
 * @returns {undefined}
 */
function requestServer(url, jsonStr, resultTyoe) {
    // 明示的にutf-8を宣言する
    document.charset = "utf-8";

    $.ajax({
        type:"post",
        url:"http://chuntaweb.dip.jp:8080/ChuntaRQAServer/" + url,
        data:jsonStr,
        contentType: 'application/JSON',
        dataType: "json",
        scriptCharset: 'utf-8',
        success: function(jsonObject) {
            viewResult(jsonObject, resultTyoe);
        },
        error: function() {
            viewTranseError();
        },
        complete: function() {
        }
    });
}
