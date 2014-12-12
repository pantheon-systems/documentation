---
title: Search Results
layout: default
---
<div id='cse' style='width: 100%;'>Loading</div>
<script src='//www.google.com/jsapi' type='text/javascript'></script>
<script type='text/javascript'>
google.load('search', '1', {language: 'en', style: google.loader.themes.V2_DEFAULT});
google.setOnLoadCallback(function() {
  var customSearchOptions = {};
    var orderByOptions = {};
      orderByOptions['keys'] = [{label: 'Relevance', key: ''} , {label: 'Date', key: 'date'}];
      customSearchOptions['enableOrderBy'] = true;
      customSearchOptions['orderByOptions'] = orderByOptions;
      var imageSearchOptions = {};
        imageSearchOptions['layout'] = 'google.search.ImageSearch.LAYOUT_POPUP';
        customSearchOptions['enableImageSearch'] = true;
        var customSearchControl =   new google.search.CustomSearchControl('017416971424255486898:moj1j4obfwm', customSearchOptions);
        customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
        var options = new google.search.DrawOptions();
        options.enableSearchResultsOnly();
        options.setAutoComplete(true);
        customSearchControl.draw('cse', options);
        function parseParamsFromUrl() {
          var params = {};
            var parts = window.location.search.substr(1).split('&');
            for (var i = 0; i < parts.length; i++) {
              var keyValuePair = parts[i].split('=');
              var key = decodeURIComponent(keyValuePair[0]);
              params[key] = keyValuePair[1] ?
              decodeURIComponent(keyValuePair[1].replace(/\+/g, ' ')) :
              keyValuePair[1];
            }
            return params;
          }
          var urlParams = parseParamsFromUrl();
          var queryParamName = 'q';
          if (urlParams[queryParamName]) {
            customSearchControl.execute(urlParams[queryParamName]);
          }
          }, true);
          </script>
          <style type='text/css'>
          .gsc-control-cse {
            font-family: Arial, sans-serif;
            border-color: #FFFFFF;
            background-color: #FFFFFF;
          }
          .gsc-control-cse .gsc-table-result {
            font-family: Arial, sans-serif;
          }
          input.gsc-input, .gsc-input-box, .gsc-input-box-hover, .gsc-input-box-focus {
            border-color: #D9D9D9;
          }
          input.gsc-search-button, input.gsc-search-button:hover, input.gsc-search-button:focus {
            border-color: #000000;
            background-color: #000000;
            background-image: none;
            filter: none;

          }
          .gsc-tabHeader.gsc-tabhInactive {
            border-color: #999999;
            background-color: #FFFFFF;
          }
          .gsc-tabHeader.gsc-tabhActive {
            border-color: #CCCCCC;
            background-color: #EEEEEE;
            border-bottom-color: #999999
          }
          .gsc-tabsArea {
            border-color: #999999;
          }
          .gsc-webResult.gsc-result, .gsc-results .gsc-imageResult {
            border-color: #FFFFFF;
            background-color: #FFFFFF;
          }
          .gsc-webResult.gsc-result:hover, .gsc-imageResult:hover {
            border-color: #FFFFFF;
            background-color: #FFFFFF;
          }
          .gs-webResult.gs-result a.gs-title:link, .gs-webResult.gs-result a.gs-title:link b, .gs-imageResult a.gs-title:link, .gs-imageResult a.gs-title:link b  {
            color: #0000CC;
          }
          .gs-webResult.gs-result a.gs-title:visited, .gs-webResult.gs-result a.gs-title:visited b, .gs-imageResult a.gs-title:visited, .gs-imageResult a.gs-title:visited b {
            color: #0000CC;
          }
          .gs-webResult.gs-result a.gs-title:hover, .gs-webResult.gs-result a.gs-title:hover b, .gs-imageResult a.gs-title:hover, .gs-imageResult a.gs-title:hover b {
            color: #0000CC;
          }
          .gs-webResult.gs-result a.gs-title:active, .gs-webResult.gs-result a.gs-title:active b, .gs-imageResult a.gs-title:active, .gs-imageResult a.gs-title:active b {
            color: #0000CC;
          }
          .gsc-cursor-page {
            color: #0000CC;
          }
          a.gsc-trailing-more-results:link {
            color: #0000CC;
          }
          .gs-webResult .gs-snippet, .gs-imageResult .gs-snippet, .gs-fileFormatType {
            color: #000000;
          }
          .gs-webResult div.gs-visibleUrl, .gs-imageResult div.gs-visibleUrl {
            color: #008000;
          }
          .gs-webResult div.gs-visibleUrl-short {
            color: #008000;
          }
          .gs-webResult div.gs-visibleUrl-short  {
            display: none;
          }
          .gs-webResult div.gs-visibleUrl-long {
            display: block;
          }
          .gs-promotion div.gs-visibleUrl-short {
            display: none;
          }
          .gs-promotion div.gs-visibleUrl-long  {
            display: block;
          }
          .gsc-cursor-box {
            border-color: #FFFFFF;
          }
          .gsc-results .gsc-cursor-box .gsc-cursor-page {
            border-color: #CCCCCC;
            background-color: #FFFFFF;
            color: #0000CC;
          }
          .gsc-results .gsc-cursor-box .gsc-cursor-current-page {
            border-color: #999999;
            background-color: #FFFFFF;
            color: #0000CC;
          }
          .gsc-webResult.gsc-result.gsc-promotion {
            border-color: #336699;
            background-color: #FFFFFF;
          }
          .gsc-completion-title {
            color: #0000CC;
          }
          .gsc-completion-snippet {
            color: #000000;
          }
          .gs-promotion a.gs-title:link,.gs-promotion a.gs-title:link *,.gs-promotion .gs-snippet a:link  {
            color: #0000CC;
          }
          .gs-promotion a.gs-title:visited,.gs-promotion a.gs-title:visited *,.gs-promotion .gs-snippet a:visited {
            color: #0000CC;
          }
          .gs-promotion a.gs-title:hover,.gs-promotion a.gs-title:hover *,.gs-promotion .gs-snippet a:hover  {
            color: #0000CC;
          }
          .gs-promotion a.gs-title:active,.gs-promotion a.gs-title:active *,.gs-promotion .gs-snippet a:active {
            color: #0000CC;
          }
          .gs-promotion .gs-snippet, .gs-promotion .gs-title .gs-promotion-title-right, .gs-promotion .gs-title .gs-promotion-title-right * {
            color: #000000;
          }
          .gs-promotion .gs-visibleUrl,.gs-promotion .gs-visibleUrl-short  {
            color: #008000;
          }
          </style>
