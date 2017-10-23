/**
 * json文字列→jsonObject.
 * @param {type} jsonStr
 * @returns {undefined}
 */
function createJsonObjectFromStr(jsonStr) {
    var jsonObject = {};
    jsonObject = JSON.parse(jsonStr);
    
    return jsonObject;
}

/**
 * jsonObject→json文字列.
 * @param {type} jsonObject
 * @returns {String}
 */
function createJsonStrFromObject(jsonObject) {
    return JSON.stringify(jsonObject);
}

/**
 * userTableList, qaTableList, errorTableListからJsonObjectを生成.
 * @param {type} userTableList
 * @param {type} qaTableList
 * @param {type} errorTableList
 * @returns {jsonObject}
 */
function getJsonObjectFromObject(userTableList, qaTableList, errorTableList) {
    jsonObject = {
        "userTableList":userTableList,
        "qaTableList":qaTableList,
        "errorTableList":errorTableList
    };
    
    return jsonObject;
}

/**
 * UserTableListオブジェクトを生成.
 * @param {type} user
 * @param {type} pass
 * @param {type} mail
 * @param {type} response
 * @returns {undefined}
 */
function createUserTableListObject(user, pass, mail, response) {
    var userTableList = {};
    
    userTableList = [
        {
            "user": user,
            "pass": pass,
            "mail": mail,
            "response": response
        }
    ];
    
    return userTableList;
}

/**
 * QaTableListオブジェクトを生成.
 * @param {type} no
 * @param {type} question
 * @param {type} title
 * @param {type} mail2
 * @param {type} answer
 * @param {type} lastupdate
 * @param {type} user2
 * @returns {Array}
 */
function createQaTableListObject(no, question, title, mail2,  answer, lastupdate, user2) {
    var qaTableList = {};
    
    qaTableList = [
        {
            "no": no,
            "question": question,
            "title": title,
            "mail": mail2,
            "answer": answer,
            "lastupdate": lastupdate,
            "user": user2
        }
    ];
    
    return qaTableList;
}

/**
 * ErrorTableオブジェクトを生成.
 * @param {type} no
 * @param {type} error
 * @returns {Array}
 */
function createErrorTableObject(no, error) {
    var errorTableList = {};
    
    errorTableList = [
        {
            "no": no,
            "error": error
        }
    ];
    
    return errorTableList;
}

/**
 * パラメータの連想配列からjsonオブジェクトを生成する.
 * @param {type} paramArray
 * @returns {jsonObject}
 */
function createJsonObject(paramArray) {
    var userTableList = createUserTableListObject(
            paramArray["input_user"],
            paramArray["input_pass"],
            paramArray["input_mail"],
            paramArray["input_response"]);
            
    var qaTableList = createQaTableListObject(
            paramArray["input_no"],
            paramArray["input_question"],
            paramArray["input_title"],
            paramArray["input_mail2"],
            paramArray["input_answer"],
            paramArray["input_lastupdate"],
            paramArray["input_user2"]);
            
    var errorTableList = createErrorTableObject(
            paramArray["input_no2"],
            paramArray["input_error"]);
            
    var jsonObject = getJsonObjectFromObject(userTableList, qaTableList, errorTableList);
    
    return jsonObject;
}