// Copyright (c) 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("btn-detect").addEventListener("click", function() {
    var inputText = document.getElementById("text").value;
    var enc_word = encodeURIComponent(inputText);
    var url = "http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EJdict&Word=" + enc_word +
      "&Scope=HEADWORD&Match=EXACT&Merge=OR&Prof=XHTML&PageSize=20&PageIndex=0";

    //console.log(inputText);
    //document.getElementById("text").value = url;

    var xhttp_itemID = new XMLHttpRequest();
    xhttp_itemID.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:


           var xmlDoc = $.parseXML(xhttp_itemID.responseText);
           var $xml = $( xmlDoc );
           var itemID = $xml.find( "ItemID" );

           // XMLのDOMをパースする
          //  var parser = new DOMParser();
          //  var dom = parser.parseFromString(xhttp_itemID.responseText, 'text/xml');
          //  var itemID = dom.getElementsByTagName("ItemID");


           url = "http://public.dejizo.jp/NetDicV09.asmx/GetDicItemLite?Dic=EJdict&Item=" + itemID.text() + "&Loc=&Prof=XHTML"

           //document.getElementById("text").value = url;

           var xhttp_translate = new XMLHttpRequest();
           xhttp_translate.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                 xmlDoc = $.parseXML(xhttp_translate.responseText);
                 $xml = $( xmlDoc );
                 body = $xml.find("Body").find("div").find("div").text();
                 var result = body.split('\t');
                 for(var i=0; i<result.length; i++){
                    //対象データへのアクセスは data[i] の様な形式
                    document.getElementById("text").value = document.getElementById("text").value + '\r' + result[i];
                 }
                //  $.each(result, function(index, val){
                //    document.getElementById("text").value = document.getElementById("text").value + <br> + val;
                //  });

               }
           };
           xhttp_translate.open("GET", url, true);
           xhttp_translate.send();
        }
    };
    xhttp_itemID.open("GET", url, true);
    xhttp_itemID.send();


    // $.ajax({
    //     type: "GET",
    //     url: "http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EdictJE&Word=" + enc_word +
    //       "&Scope=HEADWORD&Match=EXACT&Merge=OR&Prof=XHTML&PageSize=20&PageIndex=0",
    //     dataType: "xml",
    //     success: function(xml) {
    //        //do work here if success
    //        document.getElementById("text").value = xml
    //     }
    // });
    // chrome.i18n.detectLanguage(inputText, function(result) {
    //     var languages =  "Languages: \n";
    //     for (var i = 0; i < result.languages.length; i++) {
    //        languages += result.languages[i].language + " ";
    //        languages += result.languages[i].percentage + "\n";
    //     }
    //
    //     var is_reliable = "\nReliable? \n" + result.isReliable + "\n";
    //     alert(languages + is_reliable);
    // });
  });
});


//"http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EdictJE&Word=%E3%81%8A%E8%8C%B6&Scope=HEADWORD&Match=EXACT&Merge=OR&Prof=XHTML&PageSize=20&PageIndex=0"
//EJdict
