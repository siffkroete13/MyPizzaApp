'use strict'

let myUtil = (function() {
  let myUtilInstance = null;

  let MyUtil = function() {}
    
  MyUtil.prototype.getUrlParams = function() {
      let lets = {};
      let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
      function(m,key,value) {
        lets[key] = value;
      });
      return lets;
  }

  MyUtil.prototype.findGetParameter = function(parameterName) {
      let result = null,
          tmp = [];
      let items = location.search.substr(1).split("&");
      for (let index = 0; index < items.length; index++) {
          tmp = items[index].split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      }
      return result;
  }

  MyUtil.prototype.myLog = function(_super) {
      return function() {
          // Array für Server-Console
          let arrayForServerConsole = Array.prototype.slice.call(arguments);
          arrayForServerConsole.unshift('debug info: ');
          arrayForServerConsole.push('\n\r');
          let r = _super.apply(this, arrayForServerConsole);
          return r;
      }
  }(console.log);

  MyUtil.prototype.getText = function(el) {
    let r = '';
    if(typeof el.firstChild !== 'undefined' && el.firstChild) {
      r = el.firstChild.data;
    } else {
      r = el.value;
    }
    return r;
  }

  MyUtil.prototype.setText = function(el, text) {
    el.firstChild.data = text;
  }

  MyUtil.prototype.queryByAjax = function(dest, _data, suc, err, queryType = 'POST', dataType = 'json') {
    $.ajax({
        url: dest,       
        // dataType: dataType,
        contentType: "application/javascript; charset=utf-8",
        crossDomain: true,
        data: encodeURIComponent(JSON.stringify(_data)),  
        success: function (d) {
            suc(d);
        },
        error: function (d) {
            err(d);
        }
    }); // $.ajax({
  }

  MyUtil.prototype.isClient = function() {
    if(typeof window === 'undefined') {
      return false;
    } else {
      return true;
    }
  }

  return function() {
    if (!myUtilInstance) {
      myUtilInstance = new MyUtil();
    }
    return myUtilInstance;
  }

})();

let isClient = function() {
  if(typeof window == 'undefined') {
    return false;
  } else {
    return true;
  }
}

if(!isClient()) {
   // Das ist für Serverseitige Anwendung
    module.exports = myUtil();
}

