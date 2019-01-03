

function getMainStreamerFeedsDefault(streamerId, region) {
	$('#search_keyword').val('');
	getMainStreamerFeeds(0, 15, '',streamerId, region);
}

function getMainStreamerFeeds(pageNumber, pageLimit, searchKeyword, streamerId, region) {

	var targetPaginationId = '#main-streamer-feeds-pagination';
	
	var targetStr = '<tr class="board-list-tr">\
		<td class="align-middle text-center mt-3 mb-3" colspan="7"> <div class="loader"></div> </td>\
		</tr>';
	$('#main-streamer-feeds-tbody').html(targetStr);
	
	searchKeyword = new String(searchKeyword);
	if(searchKeyword == 'undefined') {
		searchKeyword = '';
	}
	if(streamerId == 'undefined') {
		streamerId = '';
	}
	if(region == 'undefined') {
		region = '';
	}
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			searchKeyword : searchKeyword,
			streamerId : streamerId,
			region : region
			},
		url: 'process/streamer_feeds_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
// 				alert('test');
				$('#main-streamer-feeds-tbody').html('');
				$(targetPaginationId).html('');
				var tbodyStr = "";
				var paginationStr = "";
			if(data == 'empty') {
				tbodyStr = tbodyStr+'<tr class="board-list-tr">';
				tbodyStr = tbodyStr+'<td class="align-middle" colspan="6"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				tbodyStr = tbodyStr+'</tr>';
			} else {

				var totalCount = data.totalCount;
				
				var favoriteStr = new String(data.favoriteStr);
				var favoriteArray = new Array();
				if(favoriteStr != '' && favoriteStr.length>0) {
					 var favoriteArray = favoriteStr.split(';');
				 }
				
				if(!isLogged) {
					var favoriteCookieName = 'tos_favorite_media';
					favoriteStr = getCookie(favoriteCookieName);

					if(favoriteStr != null) { 
						favoriteArray = favoriteStr.split(',');
					}
				}

				 $.each(data.infoArray, function(key, val) {
					 
					 var favoriteBtnStyle = 'btn-outline-warning';
					 if(favoriteArray.indexOf(val.document_srl) != -1) {
						 favoriteBtnStyle = 'btn-warning';
					 }

					 var platformName = "";
					 if(val.media_url.indexOf('youtu') != -1 || val.media_url.indexOf('youtube') != -1) {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.media_url.indexOf('twitch') != -1) {
						 platformName = STRING_TWITCH;
					 }
					 
					 var settingDate = new Date();
					 settingDate.setDate(settingDate.getDate()-1);
					 var prevDate = settingDate.toISOString().slice(0,19).replace(/-/gi, "").replace(/T/gi, "").replace(/:/gi, "");


					 tbodyStr = tbodyStr+'<tr class="board-list-tr" style="font-size: 14px;">';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" style="font-weight: bold;"> '+val.document_srl+' </td>';
					 tbodyStr = tbodyStr+'<td class="d-none d-md-table-cell" style="overflow: hidden;text-overflow: ellipsis;">';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" class="tile tile-img mr-1" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+')">';
					 tbodyStr = tbodyStr+'<img class="img-fluid" src="'+val.thumbnail_url+'" alt="Card image cap">';
					 tbodyStr = tbodyStr+'</a>';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+');">'+val.title+'</a>';
					 if(val.reg_date >= prevDate) {
						 tbodyStr = tbodyStr+'<span class="badge badge-subtle badge-warning ml-1">NEW</span>';
					 }
					 tbodyStr = tbodyStr+'</td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�ㅽ듃由щ㉧"><a href="streamer_detail.php?sid='+val.streamer_id+'"> '+val.streamer_name+' </a></td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�뚮옯��"> '+platformName+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="議고쉶"> '+val.readed_count+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�좎쭨"> '+val.reg_date.substr(0,4)+'.'+val.reg_date.substr(4,2)+'.'+val.reg_date.substr(6,2)+' </td>';
					 
					 
					 
					// sm,xs �� td
					 tbodyStr = tbodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 tbodyStr = tbodyStr+'<div >';
					 tbodyStr = tbodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" class="tile tile-img mr-1" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+')">';
					 tbodyStr = tbodyStr+'<img class="img-fluid" src="'+val.thumbnail_url+'" alt="Card image cap">';
					 tbodyStr = tbodyStr+'</a>';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+');">'+val.title+'</a>';
					 if(val.reg_date >= prevDate) {
						 tbodyStr = tbodyStr+'<span class="badge badge-subtle badge-warning ml-1">N</span>';
					 }
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 tbodyStr = tbodyStr+'<span style="font-size: 12px;"> <a href="streamer_detail.php?sid='+val.streamer_id+'"> '+val.streamer_name+' </a> | '+platformName+' | '+val.reg_date.substr(0,4)+'.'+val.reg_date.substr(4,2)+'.'+val.reg_date.substr(6,2)+'</span>';
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 tbodyStr = tbodyStr+'<td class="align-middle" id="favorite-media-id-'+val.document_srl+'">';
					 tbodyStr = tbodyStr+'<a href="javascript:registFavorite('+val.document_srl+',\'media\')" class="btn btn-sm '+favoriteBtnStyle+'">';
					 tbodyStr = tbodyStr+'<i class="far fa-star"></i>';
					 tbodyStr = tbodyStr+'</a>';
					 tbodyStr = tbodyStr+'</td>';
					 
					 tbodyStr = tbodyStr+'</tr>';
				 });


				 var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeeds('+(pageNumber-1)+', '+pageLimit+', \''+searchKeyword+'\',\''+streamerId+'\', \''+region+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">1</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeeds(0, '+pageLimit+', \''+searchKeyword+'\',\''+streamerId+'\', \''+region+'\')">1</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeeds('+(page)+', '+pageLimit+', \''+searchKeyword+'\',\''+streamerId+'\', \''+region+'\')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeeds('+(page)+', '+pageLimit+', \''+searchKeyword+'\',\''+streamerId+'\', \''+region+'\')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(totalPageCount)+'</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeeds('+(totalPageCount-1)+', '+pageLimit+', \''+searchKeyword+'\',\''+streamerId+'\', \''+region+'\')">'+(totalPageCount)+'</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeeds('+(pageNumber+1)+', '+pageLimit+', \''+searchKeyword+'\',\''+streamerId+'\', \''+region+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 $(targetPaginationId).html(paginationStr);
				
			}
			
			$('#main-streamer-feeds-tbody').html(tbodyStr);
			
			var currentUrl = document.location.href;

			var headerMoreStr = '<a href="#" style="vertical-align: middle;align-items: center;"><button type="button" class="btn btn-outline-primary btn-sm"><strong> '+STRING_MORE_DETAIL+' </strong></button></a>';
			if(searchKeyword!='undefined' && searchKeyword.length>1) {
				headerMoreStr = '<span class="badge badge-subtle badge-info mr-2" style="font-size: 0.9em;padding-top: 0.4em;padding-bottom: 0.4em;padding-left: 0.6em;padding-right: 0.6em;"> '+searchKeyword+' </span>'+STRING_SEARCH_RESULT_POSTFIX;
			}
			else if (streamerId!='undefined' && streamerId > 0 && currentUrl.indexOf('streamer_detail.php') != -1) {
				headerMoreStr = '<a href="streamer_detail_board.php?sid='+streamerId+'" style="vertical-align: middle;align-items: center;"><button type="button" class="btn btn-outline-primary btn-sm"><strong> '+STRING_MORE_DETAIL+' </strong></button></a>';
			}
			else if (currentUrl.indexOf('feeds.php') != -1) {
				headerMoreStr = '<a href="feeds_board.php" style="vertical-align: middle;align-items: center;"><button type="button" class="btn btn-outline-primary btn-sm"><strong> '+STRING_MORE_DETAIL+' </strong></button></a>';
			}
			if((currentUrl.indexOf('streamer_detail_board.php') != -1 || currentUrl.indexOf('feeds_board.php') != -1) && (searchKeyword == 'undefined' || searchKeyword.length < 1)) {
				headerMoreStr = '';
			}
			
			$('#main-streamer-feeds-header-more').html(headerMoreStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function getMainStreamerFeedsSearch(streamerId) {
	var searchKeyword = $('#search_keyword').val();
	var selectedFeedsCountry = $('#select-feeds-country option:selected').val();
	var selectedFeedsCountryCondition = '';
	switch(selectedFeedsCountry) {
	case '1':
		selectedFeedsCountryCondition = '';
		break;
	case '2':
		selectedFeedsCountryCondition = 'kr';
		break;
	case '3':
		selectedFeedsCountryCondition = 'us';
		break;
	case '4':
		selectedFeedsCountryCondition = 'etc';
		break;
	default:
		selectedFeedsCountryCondition = '';
		break;
	}
	if(searchKeyword.length > 1) {
		getMainStreamerFeeds(0, 15, searchKeyword, streamerId, selectedFeedsCountryCondition);	
	} else {
		alert(STRING_ALERT_SEARCH_MIN_LENGTH);
	}
	
}

function getMainStreamerFeedsBest(pageNumber, pageLimit, conditionPeriod, region) {

	var targetId = '#main-streamer-monthly-feeds-group';
	if(conditionPeriod == 'weekly') {
		targetId = '#main-streamer-weekly-feeds-group';
	}
	else if(conditionPeriod == 'daily') {
		targetId = '#main-streamer-daily-feeds-group';
	}

	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			conditionPeriod : conditionPeriod,
			region : region
			},
		url: 'process/streamer_feeds_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
// 				alert('test');
// 				$(targetId).html('');
				var bodyStr = "";
				
			if(data == 'empty') {
//				alert('由ъ뒪�멸� �놁뒿�덈떎.');
				bodyStr = '<h4 class="text-center">'+STRING_NODATA+'</h4>';
			} else {

				var totalCount = data.totalCount;

				 $.each(data.infoArray, function(key, val) {

					 var platformName = "";
					 if(val.media_url.indexOf('youtu') != -1 || val.media_url.indexOf('youtube') != -1) {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.media_url.indexOf('twitch') != -1) {
						 platformName = STRING_TWITCH;
					 }

					 bodyStr = bodyStr+'<a href="'+val.media_url+'" class="list-group-item list-group-item-action" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+')">';
					 bodyStr = bodyStr+'<div class="list-group-item-figure rounded-left">';
					 bodyStr = bodyStr+'<img src="'+val.thumbnail_url+'" alt="placeholder image"> </div>';
					 bodyStr = bodyStr+'<div class="list-group-item-body">';
					 bodyStr = bodyStr+'<h4 class="list-group-item-title main-list-group-media-body-title"> '+val.title+' </h4>';
					 bodyStr = bodyStr+'<p class="list-group-item-text main-list-group-media-body-text"><object><a href="streamer_detail.php?sid='+val.streamer_id+'"> '+val.streamer_name+' </a></object><span class="badge badge-subtle badge-dark" style="font-size: 0.8em;"> '+platformName+' </span> </p>';
					 bodyStr = bodyStr+'</div>';
					 bodyStr = bodyStr+'</a>';
				 });


			}
			
			$(targetId).html(bodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function updateDocumentReadedCount(docSrl) {
	if(docSrl == 'undefined' || parseInt(docSrl) < 1) {
		return;
	}
	
	$.ajax({
		type : 'post',
		data: {
			docSrl : docSrl,
			},
		url: 'process/document_update_readed_count.php',
		dataType: 'json',
		success:function(data) {
			
				
			if(data == 'empty') {
			} else {
			}
			
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
	
	registViewLogCookie(docSrl);
}


function getMainStreamerDetail(streamer_id) {
	
	var favoriteCookieName = 'tos_favorite_streamer';
	var favoriteStr = getCookie(favoriteCookieName);
	
	$.ajax({
		type : 'post',
		data: {
			streamer_id : streamer_id,
			},
		url: 'process/streamer_info_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
// 				alert('test');
// 				$('#main-streamer-ranking-tbody').html('');
// 				var rankingTbodyStr = "";
			if(data == 'empty') {
// 				alert('由ъ뒪�멸� �놁뒿�덈떎.');
// 				rankingTbodyStr = "<center>�곗씠�곌� �놁뒿�덈떎.</center>";
			} else {
				
				if(data.favoriteStr != null && data.favoriteStr!= 'undefined' && data.favoriteStr != '') {
					favoriteStr = new String(data.favoriteStr);
				}
				var favoriteArray = new Array();
				if(favoriteStr != null && favoriteStr != '' && favoriteStr.length>0) {
					 var favoriteArray = favoriteStr.split(';');
					 if(favoriteStr.indexOf(',') != -1) {
						 favoriteArray = favoriteStr.split(',');
					 }
				 }

				 $.each(data.infoArray, function(key, val) {
					 
					 var iconUrlSm = val.icon_url_sm;
					 
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 $('#streamer-detail-name-tile').css('display','none');
						 $('#streamer-detail-image-tile').css('display','');
						 
						 var imageTileStr = '<a href="'+val.home_url+'" target="_blank"><img src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
						 $('#streamer-detail-image-tile').html(imageTileStr);
						 
					 } else {
						 $('#streamer-detail-name-tile').html('<a href="'+val.home_url+'" target="_blank">'+val.name.substring(0,2)+'</a>');
						 $('#streamer-detail-image-tile').css('display','none');
					 }
					 
					 $('#streamer-detail-name-full').html(val.name);
					 
					 if(val.status_live == 'on') {
						 var statusStr = '<a href="'+val.home_url+'" target="_blank"><span class="badge badge-danger ml-2 mb-1 align-middle" style="font-size:14px;">LIVE</span></a>';
						 $('#streamer-detail-name-full').append(statusStr);
					 }
					 
					 $('#streamer-detail-intro').html(val.intro);
					 $('#streamer-detail-cover-follower-count').html(STRING_FOLLOWER+' '+numberWithCommas(val.follower_count));

					 var coverSnsStr = '';
					 if(val.home_url.indexOf('youtube') != -1) {
						 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+val.home_url+'" target="_blank">'+STRING_YOUTUBE+'</a>';
					 }
					 var snsAddressArray = val.sns_address.split(';');
					 
					 

					 for(var i in snsAddressArray) {
						 if(snsAddressArray[i].indexOf('youtube') != -1) {
							 if(snsAddressArray[i].indexOf('sub_confirmation') != -1) {
								 continue;
							 }
							 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+snsAddressArray[i]+'" target="_blank">'+STRING_YOUTUBE+'</a>';
						 }
						 else if(snsAddressArray[i].indexOf('twitch') != -1) {
							 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+snsAddressArray[i]+'" target="_blank">'+STRING_TWITCH+'</a>';
						 }
						 else if(snsAddressArray[i].indexOf('instagram') != -1) {
							 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+snsAddressArray[i]+'" target="_blank">'+STRING_INSTAGRAM+'</a>';
						 }
						 else if(snsAddressArray[i].indexOf('facebook') != -1) {
							 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+snsAddressArray[i]+'" target="_blank">'+STRING_FACEBOOK+'</a>';
						 }
						 else if(snsAddressArray[i].indexOf('twitter') != -1) {
							 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+snsAddressArray[i]+'" target="_blank">'+STRING_TWITTER+'</a>';
						 }
						 else if(snsAddressArray[i].indexOf('plus.google.com') != -1) {
							 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+snsAddressArray[i]+'" target="_blank">'+STRING_GOOGLEPLUS+'</a>';
						 }
						 else if(snsAddressArray[i].length > 1) {
							 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+snsAddressArray[i]+'" target="_blank">'+STRING_HOMEPAGE+'</a>';
						 }
					 }
					 
					 
//					 if(val.status_live == 'on' && val.platform == 'TWITCH') {
					 if(val.platform == 'TWITCH') {
						 var twitchLiveAreaStr = '';
						 twitchLiveAreaStr = twitchLiveAreaStr+'<div id="twitch-embed"></div>';
						 twitchLiveAreaStr = twitchLiveAreaStr+'<script type="text/javascript">\
					      new Twitch.Embed("twitch-embed", {\
					        width: 854,\
					        height: 600,\
					        channel: "'+val.platform_id+'"\
					      });\
					      </script>';
						 
						 $('#live-area').html(twitchLiveAreaStr);
					 }
					 else if(val.status_live == 'on' && val.platform == 'YOUTUBE') {
						 var twitchLiveAreaStr = '';
						 twitchLiveAreaStr = twitchLiveAreaStr + '<iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/live_stream?channel='+val.channel_id+'" frameborder="0" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>';
						 $('#live-area').html(twitchLiveAreaStr);
					 }

					 $('#streamer-detail-cover-sns-nav-tabs').html(coverSnsStr);

					
					 $('#streamer-detail-stats-rank').html(val.rank);
					 $('#streamer-detail-stats-media-count').html(numberWithCommasWithK(val.media_count));
					 $('#streamer-detail-stats-view-count').html(numberWithCommasWithK(val.view_count));
					 $('#streamer-detail-stats-media-today').html(numberWithCommasWithK(val.media_count_today));

					 $('#breadcrumb-streamer-detail').html(val.name+' '+STRING_PAGE);
					 
					 
					 var categoryStr = '';
					 var categoryArray = val.category.split(',');
					 for(var i in categoryArray) {
						 
						 categoryStr = categoryStr+'<span class="badge badge-subtle badge-primary mr-1" style="padding-bottom: 0.5em;padding-top: 0.5em;font-size: 1em;"> '+convertCategoryName(categoryArray[i])+' </span>';
						 
					 }
					 $('#streamer-detail-category-group').html(categoryStr);
					 
					 
					 var favoriteBtnStyle = 'btn-outline-warning';
					 if(favoriteArray.indexOf(streamer_id) != -1) {
						 favoriteBtnStyle = 'btn-warning';
					 }
					 
					 var favoriteBtnStr = '';
					 favoriteBtnStr = favoriteBtnStr+'<a href="javascript:registFavorite('+streamer_id+',\'streamer\');" class="btn btn-sm '+favoriteBtnStyle+'">';
					 favoriteBtnStr = favoriteBtnStr+'<i class="far fa-star"></i>';
					 favoriteBtnStr = favoriteBtnStr+'</a>';
					 $('#favorite-streamer-id-'+streamer_id).html(favoriteBtnStr);

// 					 <div class="nav nav-center nav-tabs" id="streamer-detail-cover-sns-nav-tabs">
// 	                  <a class="nav-link" href="user-activities.html">�좏뒠釉�</a>
					 

// 					 rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr">';
// 					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle"> '+val.rank+' </td>';
// 					 rankingTbodyStr = rankingTbodyStr+'<td>';
// 					 rankingTbodyStr = rankingTbodyStr+'<a href="#" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
// 					 rankingTbodyStr = rankingTbodyStr+'<a href="#">'+val.name+'</a>';
// 					 rankingTbodyStr = rankingTbodyStr+'</td>';
// 					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle"> '+numberWithCommas(val.follower_count)+' </td>';
// 					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle"> '+val.platform+' </td>';
// 					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle"> '+numberWithCommas(val.media_count)+' </td>';
// 					 rankingTbodyStr = rankingTbodyStr+'</tr>';
				 });
				
			}
			
// 			$('#main-streamer-ranking-tbody').html(rankingTbodyStr);
			
		},
		error:function(data) {
			console.log(STRING_ALERT_FAIL_GET_STREAMER_INFO);
		},
		complete:function() {
		}
	
		});
}

function getMainStreamerPanpage(pageNumber, pageLimit, streamer_id) {


	var targetIdHeader = '#main-streamer-panpage-header';
	var targetIdPostBody = '#main-streamer-panpage-post-body';
	var targetIdPostLikeCount = '#main-streamer-panpage-post-like-count';
	var targetIdPostCommentCount = '#main-streamer-panpage-post-comment-count';

	var targetIdDocumentLikeButton = '#panpage-document-like-button';

	$(targetIdHeader).html('');
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			streamer_id : streamer_id,
			},
		url: 'process/streamer_pan_page_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);

			var headerStr = '';
			var postBodyStr = '';
			var postLikeCountStr = '';
			var postCommentCountStr = '';

			var documentLikeButtonStr = '';
			
			if(data == 'empty-page') {
// 				alert('由ъ뒪�멸� �놁뒿�덈떎.');
// 				rankingTbodyStr = "<center>�곗씠�곌� �놁뒿�덈떎.</center>";
			} else {

				var varStreamerName = data.streamer_name+'';
				
				var iconUrlSm = data.icon_url_sm;
				
				headerStr = headerStr+'<span class="btn-account" role="button">';
				if(iconUrlSm != null && (''+iconUrlSm).length >0) {
					headerStr = headerStr+'<div class="user-avatar user-avatar-lg"><img src="'+iconUrlSm+'" alt="'+varStreamerName+'"> </div>';
				} else {
					headerStr = headerStr+'<span class="tile bg-primary tile-circle">'+varStreamerName.substring(0,2)+'</span>';	
				}
				
				headerStr = headerStr+'<div class="account-summary">';
				headerStr = headerStr+'<p class="account-name"> '+STRING_FANPAGE+' </p>';
				headerStr = headerStr+'<p class="account-description"> '+varStreamerName+' </p>';
				headerStr = headerStr+'</div>';
				headerStr = headerStr+'</span>';
//				headerStr = headerStr+'<div class="dropdown align-self-start ml-auto">';
//				headerStr = headerStr+'<button class="btn btn-reset text-muted" data-toggle="dropdown">';
//				headerStr = headerStr+'<i class="fa fa-fw fa-ellipsis-v"></i>';
//				headerStr = headerStr+'</button>';
//				headerStr = headerStr+'<div class="dropdown-arrow"></div>';
//				headerStr = headerStr+'<div class="dropdown-menu dropdown-menu-right">';
//				headerStr = headerStr+'<a href="#" class="dropdown-item">�먯꽭�� 蹂닿린</a>';
//				headerStr = headerStr+'</div>';
//				headerStr = headerStr+'</div>';


//				postBodyStr = postBodyStr+data.content;
				postBodyStr = postBodyStr+STRING_FAN_PAGE_CONTENT;
				postLikeCountStr = postLikeCountStr+STRING_LIKE+' <span id="panpage-document-like-count-'+streamer_id+'">'+data.voted_count+'</span>';
				postCommentCountStr = postCommentCountStr+STRING_COMMENT+' '+data.comment_count;
				
				if(data.isVoted) {
					documentLikeButtonStr = documentLikeButtonStr + '<button type="button" class="btn btn-reset" style="color:#346cb0" onclick="alert(\''+STRING_ALERT_ALREADY_VOTEUP_DOCUMENT+'\')">';
					documentLikeButtonStr = documentLikeButtonStr + '<i class="fa fa-fw fa-thumbs-up"></i> '+STRING_LIKE+'</button>';
				} else {
					documentLikeButtonStr = documentLikeButtonStr + '<button type="button" class="btn btn-reset text-muted" onclick="likePanpageDocument('+streamer_id+');">';
					documentLikeButtonStr = documentLikeButtonStr + '<i class="fa fa-fw fa-thumbs-up"></i> '+STRING_LIKE+'</button>';
				}


				getMainStreamerPanpageComment(pageNumber, pageLimit, streamer_id);

				
			}
			
			$(targetIdHeader).html(headerStr);
			$(targetIdPostBody).html(postBodyStr);
			$(targetIdPostLikeCount).html(postLikeCountStr);
			$(targetIdPostCommentCount).html(postCommentCountStr);

			$(targetIdDocumentLikeButton).html(documentLikeButtonStr);
			
			
			
		},
		error:function(data) {
			console.log(STRING_ALERT_FAIL_GET_STREAMER_INFO);
		},
		complete:function() {
		}
	
		});
}

function getMainStreamerPanpageComment(pageNumber, pageLimit, streamer_id) {
	var targetIdCommentBest = '#main-streamer-panpage-comment-best';

	var targetIdCommentList = '#main-streamer-panpage-comment-list';

	var targetPaginationId = '#main-streamer-comment-pagination';

	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			streamer_id : streamer_id,
			},
		url: 'process/streamer_pan_page_comment_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);


			var commentBestStr = '';
			var commentListStr = '';

			var paginationStr = "";
			
			if(data == 'empty-page') {
// 				alert('由ъ뒪�멸� �놁뒿�덈떎.');
// 				rankingTbodyStr = "<center>�곗씠�곌� �놁뒿�덈떎.</center>";
			} else {

				var varStreamerName = data.streamer_name+'';
				

				$.each(data.bestArray, function(key, val) {

					commentBestStr = commentBestStr+'<li class="conversation-inbound">';
					commentBestStr = commentBestStr+'<div class="conversation-avatar">';
					commentBestStr = commentBestStr+'<h6><span class="badge badge-warning mr-2">BEST</span></h6>';
					commentBestStr = commentBestStr+'</div>';
					commentBestStr = commentBestStr+'<div class="conversation-message">';
					commentBestStr = commentBestStr+'<div class="conversation-meta">';
					commentBestStr = commentBestStr+'<span class="mr-2">';
					commentBestStr = commentBestStr+'<strong>'+val.nick_name+'</strong>';
					commentBestStr = commentBestStr+'</span>';

// 					if(val.user_id == val.user_id) {
// 						commentBestStr = commentBestStr+'<span class="badge badge-subtle badge-primary mr-2">�묒꽦��</span>';
// 					}		
					
					commentBestStr = commentBestStr+'<span class="time">'+transferTime(val.regdate)+'</span>';
					commentBestStr = commentBestStr+'</div>';
					commentBestStr = commentBestStr+'<div class="conversation-message-text"> '+val.content+' </div>';
					commentBestStr = commentBestStr+'<div class="conversation-meta">';
					commentBestStr = commentBestStr+'<a href="javascript:likeComment('+val.comment_srl+');">'+STRING_LIKE+'</a> <span class="badge badge-info" id="comment-like-'+val.comment_srl+'">'+val.voted_count+'</span>';
					commentBestStr = commentBestStr+'</div>';
					commentBestStr = commentBestStr+'</div>';
					commentBestStr = commentBestStr+'</li>';

				});



				commentListStr = commentListStr + '<!-- �볤��묒꽦�� �쒖옉 -->\
    					<li class="conversation-action mt-3">\
    				<div class="media">\
    				<figure class="mt-1 mr-2">\
    				';
    				if(isLogged) {
    					commentListStr = commentListStr + '<span class="tile bg-primary tile-circle">'+global_nick_name_substr2+'</span>';
    				} else {
    					commentListStr = commentListStr + '<span class="tile bg-primary tile-circle">-</span>';
    				}
    				
    			commentListStr = commentListStr + '</figure>\
    				<div class="media-body">\
    				<div class="publisher publisher-alt">\
    				<div class="publisher-input">\
    				';

    				if(isLogged) {
    					commentListStr = commentListStr + '<textarea id="comment-textarea" class="form-control" placeholder="'+STRING_COMMENT_PLACE_HOLDER_WRITE_COMMENT+'"></textarea>';
    					commentListStr = commentListStr + '</div>\
        				<div class="publisher-actions">\
        				<div class="publisher-tools mr-auto">\
        				</div>\
        				<button class="btn btn-primary" onclick="registComment(\'comment-textarea\', '+data.module_srl+', '+data.document_srl+', \'\', '+pageNumber+');">'+STRING_SUBMIT+'</button>\
        				</div>\
        				</div>\
        				</div>\
        				</div>\
        				</li>\
        				<!-- /�볤��묒꽦�� -->';
    				} else {
//    					commentListStr = commentListStr + '<textarea id="comment-textarea" class="form-control" placeholder="'+STRING_COMMENT_PLACE_HOLDER_WRITE_COMMENT_AFTER_SIGNIN+'" disabled></textarea>';
    					commentListStr = commentListStr + '<textarea id="comment-textarea" class="form-control" placeholder="'+STRING_COMMENT_PLACE_HOLDER_WRITE_COMMENT+'"></textarea>';
    					commentListStr = commentListStr + '</div>\
        				<div class="publisher-actions">\
        				<div class="publisher-tools mr-auto">\
        				</div>';
    					
    					commentListStr = commentListStr + '<div class="input-group align-middle mr-1">\
    				    <div class="input-group-prepend">\
    				    <span class="input-group-text">\
    				    <strong>'+STRING_STREAMER_DETAIL_NICKNAME+'</strong>\
    				    </span>\
    				    </div>\
    				    <input type="text" class="form-control" placeholder="" id="comment_nosign_nickname" maxlength="10" onkeyup="">'; 
    					commentListStr = commentListStr + '</div>';
    					commentListStr = commentListStr + '<div class="input-group align-middle mr-1">\
    				    <div class="input-group-prepend">\
    				    <span class="input-group-text">\
    				    <strong>'+STRING_STREAMER_DETAIL_PASSWORD+'</strong>\
    				    </span>\
    				    </div>\
    				    <input type="password" class="form-control" placeholder="" id="comment_nosign_pw" maxlength="8" onkeyup="">'; 
    					commentListStr = commentListStr + '</div>';
    					
    					commentListStr = commentListStr + '<button class="btn btn-primary" onclick="registComment(\'comment-textarea\', '+data.module_srl+', '+data.document_srl+', \'\', '+pageNumber+');">'+STRING_SUBMIT+'</button>\
        				</div>\
        				</div>\
        				</div>\
        				</div>\
        				</li>\
        				<!-- /�볤��묒꽦�� -->';
    					
    					
    				}
    				
//    			commentListStr = commentListStr + '</div>\
//    				<div class="publisher-actions">\
//    				<div class="publisher-tools mr-auto">\
//    				</div>\
//    				<button class="btn btn-primary" onclick="registComment(\'comment-textarea\', '+data.module_srl+', '+data.document_srl+', \'\', '+pageNumber+');">'+STRING_SUBMIT+'</button>\
//    				</div>\
//    				</div>\
//    				</div>\
//    				</div>\
//    				</li>\
//    				<!-- /�볤��묒꽦�� -->';
				
				if(data.commentArray.length < 1) {
					commentListStr = commentListStr + '<h5 class="text-center mt-3">'+STRING_COMMENT_NO_DATA_DESCRIPTION+'</h5>';
				}
				$.each(data.commentArray, function(key, val) {

					var varNickName = val.nick_name+'';
					
					commentListStr = commentListStr+'<li class="conversation-inbound">\
					<div class="conversation-avatar">\
					<span class="tile bg-primary tile-circle tile-sm">'+varNickName.substring(0,2)+'</span>\
					</div>\
					<div class="conversation-message col">\
					<div class="conversation-meta">\
					<a href="#" class="mr-2">\
					<strong>'+varNickName+'</strong>\
					</a>';
// 					if(val.user_id == val.user_id) {
// 						commentListStr = commentListStr+'<span class="badge badge-subtle badge-primary mr-2">�묒꽦��</span>';
// 					}
					commentListStr = commentListStr+'<span class="time">'+transferTime(val.regdate)+'</span>\
					</div>\
					<div class="conversation-message-text" id="comment-content-'+val.comment_srl+'"> '+val.content+' </div>\
					<div class="conversation-meta">\
					<a href="javascript:likeComment('+val.comment_srl+');">'+STRING_LIKE+'</a> <span class="badge badge-info" id="comment-like-'+val.comment_srl+'">'+val.voted_count+'</span> 쨌\
					<a href="javascript:expandReplyForm('+val.comment_srl+','+data.module_srl+','+data.document_srl+','+pageNumber+');">'+STRING_COMMENT+'</a>';
					
					if(isLogged && val.member_srl == memberSrl) {
						commentListStr = commentListStr+' 쨌 ';
						commentListStr = commentListStr+'<a href="javascript:modifyCommentForm('+val.comment_srl+')">'+STRING_MODIFY+'</a> 쨌 ';
	 					commentListStr = commentListStr+'<a href="javascript:showDeleteCommentModal('+val.comment_srl+','+pageNumber+')">'+STRING_DELETE+'</a>';
					}
					if(val.user_id == 'NOSIGN') {
						commentListStr = commentListStr+' 쨌 ';
	 					commentListStr = commentListStr+'<a href="javascript:showDeleteCommentForNosignModal('+val.comment_srl+','+pageNumber+')">'+STRING_DELETE+'</a>';
					}
					commentListStr = commentListStr+'</div>';


// 					if(val.replyArray.length > 0) {
						commentListStr = commentListStr + '<ul class="conversation-list" id="comment-'+val.comment_srl+'">';
// 					}
					$.each(val.replyArray, function(key2, val2) {

						var varNickNameReply = val2.reply_nick_name+'';
						
						commentListStr = commentListStr+'<li class="conversation-inbound">\
						<div class="conversation-avatar">\
						<span class="tile bg-primary tile-circle tile-sm">'+varNickNameReply.substring(0,2)+'</span>\
						</div>\
						<div class="conversation-message col">\
						<div class="conversation-meta">\
						<a href="#" class="mr-2">\
						<strong>'+varNickNameReply+'</strong>\
						</a>\
						<span class="time">'+transferTime(val2.reply_regdate)+'</span>\
						</div>\
						<div class="conversation-message-text" id="comment-content-'+val2.reply_comment_srl+'"> '+val2.reply_content+' </div>\
						<div class="conversation-meta">\
						<a href="javascript:likeComment('+val.comment_srl+');">'+STRING_LIKE+'</a> <span class="badge badge-info" id="comment-like-'+val2.reply_comment_srl+'">'+val2.reply_voted_count+'</span>';

						if(isLogged && val2.reply_member_srl == memberSrl) {
							commentListStr = commentListStr+' 쨌 ';
							commentListStr = commentListStr+'<a href="javascript:modifyCommentForm('+val2.reply_comment_srl+')">'+STRING_MODIFY+'</a> 쨌 ';
		 					commentListStr = commentListStr+'<a href="javascript:showDeleteCommentModal('+val2.reply_comment_srl+','+pageNumber+')">'+STRING_DELETE+'</a>';
						}
						if(val2.reply_user_id == 'NOSIGN') {
							commentListStr = commentListStr+' 쨌 ';
							commentListStr = commentListStr+'<a href="javascript:showDeleteCommentForNosignModal('+val2.reply_comment_srl+','+pageNumber+')">'+STRING_DELETE+'</a>';
						}
						
						commentListStr = commentListStr+'</div>\
						</div>\
						</li>';
						
					});
// 					if(val.replyArray.length > 0) {
						commentListStr = commentListStr + '</ul>';
// 					}


					commentListStr = commentListStr+'</div>\
					</li>';










					
				});


				
				var totalCount = data.totalCount;

				var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerPanpageComment('+(pageNumber-1)+', '+pageLimit+', '+streamer_id+')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">1</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerPanpageComment(0, '+pageLimit+', '+streamer_id+')">1</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerPanpageComment('+(page)+', '+pageLimit+', '+streamer_id+')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerPanpageComment('+(page)+', '+pageLimit+', '+streamer_id+')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(totalPageCount)+'</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerPanpageComment('+(totalPageCount-1)+', '+pageLimit+', '+streamer_id+')">'+(totalPageCount)+'</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerPanpageComment('+(pageNumber+1)+', '+pageLimit+', '+streamer_id+')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 
				 $(targetPaginationId).html(paginationStr);
				
				
			}
			

			$(targetIdCommentBest).html(commentBestStr);
			$(targetIdCommentList).html(commentListStr);

			
			
			
		},
		error:function(data) {
			console.log(STRING_ALERT_FAIL_GET_STREAMER_INFO);
		},
		complete:function() {
		}
	
		});
}


function expandReplyForm(comment_srl,module_srl,document_srl,pageNumber) {

	var commentReplyList = $('#comment-'+comment_srl).html();
	if(commentReplyList.indexOf('reply-write-form') != -1) {
		return;
	}
	
	var commentForm = '';
	if(isLogged) {
		commentForm = commentForm+'\
		<!-- ���볤� �묒꽦 �� -->\
		<li class="conversation-action mt-3" id="reply-write-form">\
		<div class="media">\
		<figure class="mt-1 mr-2">\
		<span class="tile bg-primary tile-circle tile-sm">'+global_nick_name_substr2+'</span> </figure>\
		<div class="media-body">\
		<div class="publisher publisher-alt">\
		<div class="publisher-input">\
		<textarea id="reply-textarea-'+comment_srl+'" class="form-control" placeholder="'+STRING_COMMENT_PLACE_HOLDER_WRITE_COMMENT+'"></textarea>\
		</div>\
		<div class="publisher-actions">\
		<div class="publisher-tools mr-auto">\
		</div>\
		<button class="btn btn-primary" onclick="registComment(\'reply-textarea-'+comment_srl+'\', '+module_srl+', '+document_srl+', '+comment_srl+', '+pageNumber+');">'+STRING_SUBMIT+'</button>\
		</div>\
		</div>\
		</div>\
		</div>\
		</li>\
		<!-- /���볤� �묒꽦 �� �� -->';
	} else {
//		commentForm = commentForm+'\
//		<!-- ���볤� �묒꽦 �� -->\
//		<li class="conversation-action mt-3" id="reply-write-form">\
//		<div class="media">\
//		<figure class="mt-1 mr-2">\
//		<span class="tile bg-primary tile-circle tile-sm"> - </span> </figure>\
//		<div class="media-body">\
//		<div class="publisher publisher-alt">\
//		<div class="publisher-input">\
//		<textarea id="publisherInput1" class="form-control" placeholder="'+STRING_COMMENT_PLACE_HOLDER_WRITE_COMMENT_AFTER_SIGNIN+'" disabled></textarea>\
//		</div>\
//		<div class="publisher-actions">\
//		<div class="publisher-tools mr-auto">\
//		</div>\
//		<button class="btn btn-primary">'+STRING_SUBMIT+'</button>\
//		</div>\
//		</div>\
//		</div>\
//		</div>\
//		</li>\
//		<!-- /���볤� �묒꽦 �� �� -->';
		commentForm = commentForm+'\
		<!-- ���볤� �묒꽦 �� -->\
		<li class="conversation-action mt-3" id="reply-write-form">\
		<div class="media">\
		<figure class="mt-1 mr-2">\
		<span class="tile bg-primary tile-circle tile-sm"> - </span> </figure>\
		<div class="media-body">\
		<div class="publisher publisher-alt">\
		<div class="publisher-input">\
		<textarea id="reply-textarea-'+comment_srl+'" class="form-control" placeholder="'+STRING_COMMENT_PLACE_HOLDER_WRITE_COMMENT+'"></textarea>\
		</div>\
		<div class="publisher-actions">\
		<div class="publisher-tools mr-auto">\
		</div>';
		
		commentForm = commentForm + '<div class="input-group align-middle mr-1">\
	    <div class="input-group-prepend">\
	    <span class="input-group-text">\
	    <strong>'+STRING_BOARD_REGIST_NICKNAME+'</strong>\
	    </span>\
	    </div>\
	    <input type="text" class="form-control" placeholder="" id="comment_nosign_nickname_'+comment_srl+'" maxlength="10" onkeyup="">'; 
		commentForm = commentForm + '</div>';
		commentForm = commentForm + '<div class="input-group align-middle mr-1">\
	    <div class="input-group-prepend">\
	    <span class="input-group-text">\
	    <strong>'+STRING_BOARD_REGIST_PASSWORD+'</strong>\
	    </span>\
	    </div>\
	    <input type="password" class="form-control" placeholder="" id="comment_nosign_pw_'+comment_srl+'" maxlength="8" onkeyup="">'; 
		commentForm = commentForm+'</div>';
		
		commentForm = commentForm+'<button class="btn btn-primary" onclick="registComment(\'reply-textarea-'+comment_srl+'\', '+module_srl+', '+document_srl+', '+comment_srl+', '+pageNumber+');">'+STRING_SUBMIT+'</button>\
		</div>\
		</div>\
		</div>\
		</div>\
		</li>\
		<!-- /���볤� �묒꽦 �� �� -->';
	}

	$('#comment-'+comment_srl).append(commentForm);
}

function registComment(formId, module_srl, document_srl, parent_comment_srl, pageNumber) {

	if(global_Processing) {
		return;
	}

	var commentContent = $('#'+formId).val();

	var nick_name = global_nick_name;

	var signin_code = 1;
	var password;
	if(!isLogged) {
		signin_code = 0;
		nick_name = $('#comment_nosign_nickname').val();
		password = $('#comment_nosign_pw').val();
		
		if(formId.indexOf('reply-textarea-') != -1) {
			nick_name = $('#comment_nosign_nickname_'+parent_comment_srl).val();
			password = $('#comment_nosign_pw_'+parent_comment_srl).val();
		}
		
		if(nick_name == '' || nick_name.length < 2) {
	    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_NICKNAME_MIN_LENGTH);
	    	return;
	    }
		if(password == '' || password.length < 4) {
	    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_PASSWORD_MIN_LENGTH);
	    	return;
	    }
	}

	if(commentContent == '' || commentContent.length < 2) {
		alert(STRING_ALERT_COMMENT_MIN_LENGTH);
		return;
	}
	if(commentContent.length > 150) {
		alert(STRING_ALERT_COMMENT_MAX_LENGTH);
		return;
	}
	
	commentContent = commentContent.replace(/\n/gi,"<br>");

	global_Processing = true;
	$('#waitingModal').modal('show');
	
	$.ajax({
		type : 'post',
		data: {
			module_srl : module_srl,
			nick_name : nick_name,
			member_srl : memberSrl,
			content : commentContent,
			document_srl : document_srl,
			parent_comment_srl : parent_comment_srl,
			password : password,
			signin_code : signin_code
			},
		url: 'process/comment_regist.php',
		dataType: 'json',
		success:function(data) {
// 			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_COMMENT_FAILED_REGIST);
			}
			else if(data == 'success') {
				
				var currentUrl = document.location.href;
				
				if(currentUrl.indexOf('streamer_detail.php') != -1) {
					if(parent_comment_srl == 'undefined' || parent_comment_srl+0 < 1)
						getMainStreamerPanpageComment(0,5,global_streamerId);
					else
						getMainStreamerPanpageComment(pageNumber,5,global_streamerId);
				} else {
					if(parent_comment_srl == 'undefined' || parent_comment_srl+0 < 1)
						getDocumentComment(0,5,global_docSrl);
					else
						getDocumentComment(pageNumber,5,global_docSrl);
				}
			} 

		},
		error:function(data) {
		},
		complete:function() {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				global_Processing = false;
				}, 500);
			
		}
		});
}

function deleteComment(comment_srl, pageNumber) {

	if(global_Processing) {
		return;
	}

	global_Processing = true;
	$('#waitingModal').modal('show');

	$.ajax({
		type : 'post',
		data: {
			comment_srl : comment_srl
			},
		url: 'process/comment_delete.php',
		dataType: 'json',
		success:function(data) {
// 			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_COMMENT_FAILED_DELETE);
			}
			else if(data == 'success') {
				var currentUrl = document.location.href;
				
				if(currentUrl.indexOf('streamer_detail.php') != -1) {
					getMainStreamerPanpageComment(0,5,global_streamerId);
				} else {
					getDocumentComment(0,5,global_docSrl);
				}
				setTimeout(function(){
					$('#deleteCommentModal').modal('hide');
					}, 100);
			} 
			
		},
		error:function(data) {
		},
		complete:function() {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				global_Processing = false;
				}, 500);
		}
	
		});
}
function deleteCommentForNosign(comment_srl, pageNumber) {

	if(global_Processing) {
		return;
	}
	
	var password = $('#modal_comment_nosign_pw').val();
	if(password == '' || password.length < 4) {
    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_PASSWORD_MIN_LENGTH);
    	return;
    }

	global_Processing = true;
	$('#waitingModal').modal('show');

	$.ajax({
		type : 'post',
		data: {
			comment_srl : comment_srl,
			password : password
			},
		url: 'process/comment_delete_nosign.php',
		dataType: 'json',
		success:function(data) {
// 			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_COMMENT_FAILED_DELETE);
			}
			else if(data == 'success') {
				var currentUrl = document.location.href;
				
				if(currentUrl.indexOf('streamer_detail.php') != -1) {
					getMainStreamerPanpageComment(0,5,global_streamerId);
				} else {
					getDocumentComment(0,5,global_docSrl);
				}
				$('#modal_comment_nosign_pw').val('');
				setTimeout(function(){
					$('#deleteCommentForNosignModal').modal('hide');
					}, 100);
			} 
			else if(data == 'password incorrect') {
				alert(STRING_ALERT_FAILED_DELETE_DOCUMENT_PASSWORD_INCORRECT);
			}
			
		},
		error:function(data) {
		},
		complete:function() {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				global_Processing = false;
				}, 500);
		}
	
		});
}

function updateComment(comment_srl) {

	if(global_Processing) {
		return;
	}

	var commentContent = $('#comment-modify-textarea-'+comment_srl).val();

	if(commentContent == '' || commentContent.length < 1) {
		alert(STRING_ALERT_COMMENT_MIN_LENGTH);
		return;
	}
	if(commentContent.length > 150) {
		alert(STRING_ALERT_COMMENT_MAX_LENGTH);
		return;
	}

	commentContent = commentContent.replace(/\n/gi,"<br>");

	global_Processing = true;
	$('#waitingModal').modal('show');
	
	$.ajax({
		type : 'post',
		data: {
			comment_srl : comment_srl,
			content : commentContent
			},
		url: 'process/comment_update.php',
		dataType: 'json',
		success:function(data) {
// 			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_COMMENT_FAILED_MODIFY);
			}
			else if(data == 'success') {
				$('#comment-content-'+comment_srl).html(commentContent);
			} 
			
		},
		error:function(data) {
		},
		complete:function() {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				global_Processing = false;
				}, 500);
		}
	
		});
}

function likeComment(comment_srl) {
	
	if(!isLogged) {
		alert(STRING_ALERT_LIKE_COMMENT_AFTER_SIGNIN);
		return;		
	}

	var currentLikeCount = $('#comment-like-'+comment_srl).html();

	$.ajax({
		type : 'post',
		data: {
			comment_srl : comment_srl,
			},
		url: 'process/comment_voteup.php',
		dataType: 'json',
		success:function(data) {
//			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_LIKE_COMMENT_RETRY);
				return;
			}
			else if(data == 'success') {
// 				$('#comment-content-'+comment_srl).html(commentContent);
				$('#comment-like-'+comment_srl).html(parseInt(currentLikeCount)+1);
				return;
			} else {
				alert(data[0].message);
			}
			
		},
		error:function(data) {
		},
		complete:function() {
		}
	
		});
}

function modifyCommentForm(comment_srl) {

	var targetIdCommentContent = '#comment-content-'+comment_srl;
	var commentContent = $(targetIdCommentContent).html();
	
	commentContent = commentContent.replace(/<br>/gi,"\n");
	
	var targetIdCommentContentStr = $(targetIdCommentContent).html();
	if(targetIdCommentContentStr.indexOf('comment-modify-textarea-') != -1) {
// 		var commentContentOriginal = $('#comment-content-original-'+comment_srl).html();
		modifyCommentCancel(comment_srl);
		return;
	}
	
	var commentContentStr = '';

	commentContentStr = commentContentStr + '<div id="comment-content-original-'+comment_srl+'" style="display:none;">'+commentContent+'</div>';
	commentContentStr = commentContentStr + '<div class="publisher publisher-alt">\
	<div class="publisher-input">';

	commentContentStr = commentContentStr + '<textarea id="comment-modify-textarea-'+comment_srl+'" class="form-control">'+commentContent+'</textarea>';
	commentContentStr = commentContentStr + '</div>';

	commentContentStr = commentContentStr + '<div class="publisher-actions">\
    	<div class="publisher-tools mr-auto">\
    	</div>\
    	<button class="btn btn-light mr-2" onclick="modifyCommentCancel('+comment_srl+');">'+STRING_CANCEL+'</button>\
    	<button class="btn btn-primary" onclick="updateComment('+comment_srl+');">'+STRING_MODIFY_COMPLETE+'</button>\
    	</div>\
    	</div>';
	
	$(targetIdCommentContent).html(commentContentStr);
	
}
function modifyCommentCancel(comment_srl) {
	var commentContentOriginal = $('#comment-content-original-'+comment_srl).html();
	$('#comment-content-'+comment_srl).html(commentContentOriginal);
}

function showDeleteCommentModal(comment_srl, pageNumber) {
	var deleteCommentModalButtonStr = '';
	deleteCommentModalButtonStr = deleteCommentModalButtonStr + '<button type="button" class="btn btn-primary" onclick="deleteComment('+comment_srl+','+pageNumber+');">'+STRING_DELETE+'</button>';
	deleteCommentModalButtonStr = deleteCommentModalButtonStr + '<button type="button" class="btn btn-light" data-dismiss="modal">'+STRING_CANCEL+'</button>';
	$('#deleteCommentModal-button').html(deleteCommentModalButtonStr);

	$('#deleteCommentModal').modal('show');
	  
}
function showDeleteCommentForNosignModal(comment_srl, pageNumber) {
	var deleteCommentModalButtonStr = '';
	deleteCommentModalButtonStr = deleteCommentModalButtonStr + '<button type="button" class="btn btn-primary" onclick="deleteCommentForNosign('+comment_srl+','+pageNumber+');">'+STRING_DELETE+'</button>';
	deleteCommentModalButtonStr = deleteCommentModalButtonStr + '<button type="button" class="btn btn-light" data-dismiss="modal">'+STRING_CANCEL+'</button>';
	$('#deleteCommentForNosignModal-button').html(deleteCommentModalButtonStr);

	$('#deleteCommentForNosignModal').modal('show');
	  
}

function getMainBoardDocuments(pageNumber, pageLimit, mid, searchKeyword) {

	var targetId = '#main-board-documents-tbody';
	var targetPaginationId = '#main-board-documents-pagination';
	
	var targetStr = '<tr class="board-list-tr">\
		<td class="align-middle text-center mt-3 mb-3" colspan="6"> <div class="loader"></div> </td>\
		</tr>';
	$(targetId).html(targetStr);

	searchKeyword = new String(searchKeyword);
	if(searchKeyword == 'undefined') {
		searchKeyword = '';
	}
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			mid : mid,
			searchKeyword : searchKeyword,
			},
		url: 'process/board_documents_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);

				$(targetId).html('');
				$(targetPaginationId).html('');
				var bodyStr = "";
				var paginationStr = "";
				
			if(data == 'empty') {
				bodyStr = bodyStr+'<tr class="board-list-tr">';
				bodyStr = bodyStr+'<td class="align-middle" colspan="6"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				bodyStr = bodyStr+'</tr>';
			} else {

				var totalCount = data.totalCount;

				 $.each(data.infoArray, function(key, val) {

					var regdate = val.regdate+'';

					var currentUrl = document.location.href;
					
					if(currentUrl.indexOf('/board_content.php') != -1 && global_docSrl == val.document_srl) {
						bodyStr = bodyStr+'<tr class="board-list-tr" style="font-size: 14px;background-color:#eaeaea;">';
					} else {
						bodyStr = bodyStr+'<tr class="board-list-tr" style="font-size: 14px;">';
					}
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell" style="font-weight: bold;"> '+val.document_srl+' </td>';
					 bodyStr = bodyStr+'<td class="d-none d-md-table-cell" style="max-width: 300px;white-space:nowrap; overflow: hidden;text-overflow:ellipsis">';
					 var ellipsisTitle = val.title;
					 if(ellipsisTitle.length > 30) {
						 ellipsisTitle = val.title.substr(0,30)+"...";
					 }
					 if(val.comment_count!= null && parseInt(val.comment_count) > 0) {
						 bodyStr = bodyStr+'<a href="board_content.php?mid='+mid+'&doc='+val.document_srl+'&page='+pageNumber+'">'+ellipsisTitle+' ['+val.comment_count+']</a>';
					 } else {
						 bodyStr = bodyStr+'<a href="board_content.php?mid='+mid+'&doc='+val.document_srl+'&page='+pageNumber+'">'+ellipsisTitle+'</a>';
					 }
					 bodyStr = bodyStr+'</td>';
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�묒꽦��"> '+val.nick_name+' </td>';
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="異붿쿇"> '+val.voted_count+' </td>';
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="議고쉶"> '+val.readed_count+' </td>';
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�좎쭨"> '+getDocRegTime(regdate)+' </td>';
					 
					 
					// sm,xs �� td
					 bodyStr = bodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 bodyStr = bodyStr+'<div >';
					 bodyStr = bodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;max-width: 270px;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">';
					 
					 var ellipsisTitle = val.title;
//					 if(ellipsisTitle.length > 20) {
//						 ellipsisTitle = val.title.substr(0,20)+"...";
//					 }
					 var titleMaxWidth = screen.availWidth * 0.6;
					 if(val.comment_count!= null && parseInt(val.comment_count) > 0) {
						 bodyStr = bodyStr+'<a href="board_content.php?mid='+mid+'&doc='+val.document_srl+'&page='+pageNumber+'"><span style="max-width:'+titleMaxWidth+'px;display: inline-block;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;vertical-align:middle;">'+ellipsisTitle+'</span> ['+val.comment_count+']</a>';
					 } else {
						 bodyStr = bodyStr+'<a href="board_content.php?mid='+mid+'&doc='+val.document_srl+'&page='+pageNumber+'">'+ellipsisTitle+'</a>';
					 }
					 bodyStr = bodyStr+'</p>';
					 bodyStr = bodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 bodyStr = bodyStr+'<span style="font-size: 12px;"> '+val.nick_name+' | '+STRING_VOTE+' '+val.voted_count+' | '+STRING_READED+' '+val.readed_count+' | '+getDocRegTime(regdate)+'</span>';
					 bodyStr = bodyStr+'</p>';
					 bodyStr = bodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 bodyStr = bodyStr+'</tr>';
				 });


				 var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainBoardDocuments('+(pageNumber-1)+', '+pageLimit+', \''+mid+'\',\''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">1</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getMainBoardDocuments(0, '+pageLimit+', \''+mid+'\',\''+searchKeyword+'\')">1</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getMainBoardDocuments('+(page)+', '+pageLimit+', \''+mid+'\',\''+searchKeyword+'\')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getMainBoardDocuments('+(page)+', '+pageLimit+', \''+mid+'\',\''+searchKeyword+'\')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(totalPageCount)+'</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getMainBoardDocuments('+(totalPageCount-1)+', '+pageLimit+', \''+mid+'\',\''+searchKeyword+'\')">'+(totalPageCount)+'</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainBoardDocuments('+(pageNumber+1)+', '+pageLimit+', \''+mid+'\',\''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 $(targetPaginationId).html(paginationStr);

			}
			
			$(targetId).html(bodyStr);

			var currentUrl = document.location.href;

			var headerMoreStr = '';
			
			if(searchKeyword!='undefined' && searchKeyword.length>1) {
				headerMoreStr = '<span class="badge badge-subtle badge-info mr-2" style="font-size: 0.9em;padding-top: 0.4em;padding-bottom: 0.4em;padding-left: 0.6em;padding-right: 0.6em;"> '+searchKeyword+' </span>'+STRING_SEARCH_RESULT_POSTFIX;
			}
			
			$('#main-board-documents-header-more').html(headerMoreStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function getMainBoardDocumentsSearch(mid) {
	var searchKeyword = $('#search_keyword').val();
	if(searchKeyword.length > 1) {
		getMainBoardDocuments(0, 15, mid, searchKeyword);	
	} else {
		alert(STRING_ALERT_SEARCH_MIN_LENGTH);
	}
	
}

function getDocumentContent(pageNumber, pageLimit, docSrl) {


	var targetIdHeader = '#main-streamer-panpage-header';
	var targetIdPostBody = '#main-streamer-panpage-post-body';
	var targetIdPostLikeCount = '#main-streamer-panpage-post-like-count';
	var targetIdPostCommentCount = '#main-streamer-panpage-post-comment-count';

	var targetIdDocumentLikeButton = '#document-like-button';

	$(targetIdHeader).html('');
	
	$.ajax({
		type : 'post',
		data: {
			docSrl : docSrl
			},
		url: 'process/document_content_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);

			var headerStr = '';
			var postBodyStr = '';
			var postLikeCountStr = '';
			var postCommentCountStr = '';

			var documentLikeButtonStr = '';
			
			if(data == 'empty-page') {
// 				alert('由ъ뒪�멸� �놁뒿�덈떎.');
// 				rankingTbodyStr = "<center>�곗씠�곌� �놁뒿�덈떎.</center>";
			} else {

				var varWriterName = data.nick_name+'';
				
				headerStr = headerStr+'<span class="btn-account" role="button">';
				headerStr = headerStr+'<span class="tile bg-primary tile-circle">'+varWriterName.substring(0,2)+'</span>';
				headerStr = headerStr+'<div class="account-summary">';
				headerStr = headerStr+'<p class="account-name" style="word-break: break-all;white-space: normal;"> '+data.title+' </p>';
				headerStr = headerStr+'<p class="account-description"> '+varWriterName+'  쨌  '+transferTime(data.regdate)+' </p>';
				headerStr = headerStr+'</div>';
				headerStr = headerStr+'</span>';

				if(isLogged && data.member_srl == memberSrl) {
				headerStr = headerStr+'<div class="dropdown align-self-start ml-auto">';
				headerStr = headerStr+'<button class="btn btn-reset text-muted" data-toggle="dropdown">';
				headerStr = headerStr+'<i class="fa fa-fw fa-ellipsis-v"></i>';
				headerStr = headerStr+'</button>';
				headerStr = headerStr+'<div class="dropdown-arrow"></div>';
				headerStr = headerStr+'<div class="dropdown-menu dropdown-menu-right">';
				headerStr = headerStr+'<a href="board_modify.php?mid='+global_mid+'&doc='+docSrl+'" class="dropdown-item">'+STRING_MODIFY+'</a>';
				headerStr = headerStr+'<a href="javascript:showDeleteDocumentModal('+docSrl+');" class="dropdown-item">'+STRING_DELETE+'</a>';
				headerStr = headerStr+'</div>';
				headerStr = headerStr+'</div>';
				}
				
				if(data.user_id == 'NOSIGN') {
					headerStr = headerStr+'<div class="dropdown align-self-start ml-auto">';
					headerStr = headerStr+'<button class="btn btn-reset text-muted" data-toggle="dropdown">';
					headerStr = headerStr+'<i class="fa fa-fw fa-ellipsis-v"></i>';
					headerStr = headerStr+'</button>';
					headerStr = headerStr+'<div class="dropdown-arrow"></div>';
					headerStr = headerStr+'<div class="dropdown-menu dropdown-menu-right">';
//					headerStr = headerStr+'<a href="board_modify.php?mid='+global_mid+'&doc='+docSrl+'" class="dropdown-item">'+STRING_MODIFY+'</a>';
					headerStr = headerStr+'<a href="javascript:showDeleteDocumentForNosignModal('+docSrl+');" class="dropdown-item">'+STRING_DELETE+'</a>';
					headerStr = headerStr+'</div>';
					headerStr = headerStr+'</div>';
				}
				
				$.each(data.infoArray, function(key, val) {
					
					if(val.eid == 'link_url') {
						postBodyStr = postBodyStr + '<div class="row text-left ml-1 mr-1 mb-3" style="word-break:break-all;overflow: hidden;text-overflow: ellipsis;"><a href="'+val.value+'" target="_blank"><button type="button" class="btn btn-outline-primary btn-sm mr-2"><strong> '+STRING_LINK_URL+' </strong></button><span class="align-middle">'+val.value+'</span></a></div>';
					}
					else if(val.eid == 'with_streamer') {
						
						
						var withStreamerArray = val.value.split(';@;');
						
						postBodyStr = postBodyStr + '<div class="row text-left ml-1 mr-1 mb-3" style="word-break:break-all;overflow: hidden;text-overflow: ellipsis;">';
						postBodyStr = postBodyStr + '<button type="button" class="btn btn-outline-primary btn-sm mr-2"><strong> '+STRING_WITH_STREAMER+' </strong></button>';
						for(var count=0;count<withStreamerArray.length;count++) {
							
							var eachStreamerArray = withStreamerArray[count].split('/@/');
							var eachStreamerId = eachStreamerArray[0];
							var eachStreamerName = eachStreamerArray[1];
							
							postBodyStr = postBodyStr + '<a href="streamer_detail.php?sid='+eachStreamerId+'"><span class="badge badge-subtle badge-info ml-1 align-middle" style="padding:1em;align-items: center;">'+eachStreamerName+'</span></a>';
						}
						postBodyStr = postBodyStr + '</div>';
					}
					else if(val.eid == 'embed_url') {
						postBodyStr = postBodyStr + '<iframe allowFullScreen="allowFullScreen" src="'+val.value+'" frameborder="0" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>';
					}
				});


				postBodyStr = postBodyStr+data.content;
				postLikeCountStr = postLikeCountStr+STRING_LIKE+' <span id="document-like-count-'+docSrl+'">'+data.voted_count+'</span>';
				postCommentCountStr = postCommentCountStr+STRING_COMMENT+' '+data.comment_count;
				
				if(data.isVoted) {
					documentLikeButtonStr = documentLikeButtonStr + '<button type="button" class="btn btn-reset" style="color:#346cb0" onclick="alert(\''+STRING_ALERT_ALREADY_VOTEUP_DOCUMENT+'\')">';
					documentLikeButtonStr = documentLikeButtonStr + '<i class="fa fa-fw fa-thumbs-up"></i> '+STRING_LIKE+'</button>';
				} else {
					documentLikeButtonStr = documentLikeButtonStr + '<button type="button" class="btn btn-reset text-muted" onclick="likeDocument('+docSrl+');">';
					documentLikeButtonStr = documentLikeButtonStr + '<i class="fa fa-fw fa-thumbs-up"></i> '+STRING_LIKE+'</button>';
				}
				

				getDocumentComment(pageNumber, pageLimit, docSrl);

				
			}
			
			$(targetIdHeader).html(headerStr);
			$(targetIdPostBody).html(postBodyStr);
			$(targetIdPostLikeCount).html(postLikeCountStr);
			$(targetIdPostCommentCount).html(postCommentCountStr);
			
			$(targetIdDocumentLikeButton).html(documentLikeButtonStr);


//			$(targetIdPostBody+", img").attr('onclick','doImgPop(\''+$(this).attr('src')+'\')');
			$(targetIdPostBody+" img").click(function(event) {
//				doImgPop($(this).attr('src'));
				
				var imgUrl = $(this).attr('src');
				var imgStr = "<img src="+imgUrl+" style='cursor:pointer;overflow::auto;' title ='"+STRING_IMAGE_MODAL_CLOSE_WINDOW+"'>";
				$('#image-modal-body').html(imgStr);
				$('#imageModal').modal('show');
			});
			
			
		},
		error:function(data) {
			console.log(STRING_LOG_FAILED_GET_DOCUMENT_INFO);
		},
		complete:function() {
		}
	
		});
}

function getDocumentComment(pageNumber, pageLimit, docSrl) {
	var targetIdCommentBest = '#main-streamer-panpage-comment-best';

	var targetIdCommentList = '#main-streamer-panpage-comment-list';

	var targetPaginationId = '#main-streamer-comment-pagination';

	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			docSrl : docSrl
			},
		url: 'process/document_comment_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);


			var commentBestStr = '';
			var commentListStr = '';

			var paginationStr = "";
			
			if(data == 'empty-page') {
// 				alert('由ъ뒪�멸� �놁뒿�덈떎.');
// 				rankingTbodyStr = "<center>�곗씠�곌� �놁뒿�덈떎.</center>";
			} else {
				

				$.each(data.bestArray, function(key, val) {

					commentBestStr = commentBestStr+'<li class="conversation-inbound">';
					commentBestStr = commentBestStr+'<div class="conversation-avatar">';
					commentBestStr = commentBestStr+'<h6><span class="badge badge-warning mr-2">BEST</span></h6>';
					commentBestStr = commentBestStr+'</div>';
					commentBestStr = commentBestStr+'<div class="conversation-message">';
					commentBestStr = commentBestStr+'<div class="conversation-meta">';
					commentBestStr = commentBestStr+'<span class="mr-2">';
					commentBestStr = commentBestStr+'<strong>'+val.nick_name+'</strong>';
					commentBestStr = commentBestStr+'</span>';

// 					if(val.user_id == val.user_id) {
// 						commentBestStr = commentBestStr+'<span class="badge badge-subtle badge-primary mr-2">�묒꽦��</span>';
// 					}		
					
					commentBestStr = commentBestStr+'<span class="time">'+transferTime(val.regdate)+'</span>';
					commentBestStr = commentBestStr+'</div>';
					commentBestStr = commentBestStr+'<div class="conversation-message-text"> '+val.content+' </div>';
					commentBestStr = commentBestStr+'<div class="conversation-meta">';
					commentBestStr = commentBestStr+'<a href="javascript:likeComment('+val.comment_srl+');">'+STRING_LIKE+'</a> <span class="badge badge-info" id="comment-like-'+val.comment_srl+'">'+val.voted_count+'</span>';
					commentBestStr = commentBestStr+'</div>';
					commentBestStr = commentBestStr+'</div>';
					commentBestStr = commentBestStr+'</li>';

				});



				commentListStr = commentListStr + '<!-- �볤��묒꽦�� �쒖옉 -->\
    					<li class="conversation-action mt-3">\
    				<div class="media">\
    				<figure class="mt-1 mr-2">\
    				';
    				if(isLogged) {
    					commentListStr = commentListStr + '<span class="tile bg-primary tile-circle">'+global_nick_name_substr2+'</span>';
    				} else {
    					commentListStr = commentListStr + '<span class="tile bg-primary tile-circle">-</span>';
    				}
    				
    			commentListStr = commentListStr + '</figure>\
    				<div class="media-body">\
    				<div class="publisher publisher-alt">\
    				<div class="publisher-input">\
    				';

    				if(isLogged) {
    					commentListStr = commentListStr + '<textarea id="comment-textarea" class="form-control" placeholder="'+STRING_COMMENT_PLACE_HOLDER_WRITE_COMMENT+'"></textarea>';
    					commentListStr = commentListStr + '</div>\
        				<div class="publisher-actions">\
        				<div class="publisher-tools mr-auto">\
        				</div>\
        				<button class="btn btn-primary" onclick="registComment(\'comment-textarea\', '+data.module_srl+', '+data.document_srl+', \'\', '+pageNumber+');">'+STRING_SUBMIT+'</button>\
        				</div>\
        				</div>\
        				</div>\
        				</div>\
        				</li>\
        				<!-- /�볤��묒꽦�� -->';
    				} else {
//    					commentListStr = commentListStr + '<textarea id="comment-textarea" class="form-control" placeholder="'+STRING_COMMENT_PLACE_HOLDER_WRITE_COMMENT_AFTER_SIGNIN+'" disabled></textarea>';
    					commentListStr = commentListStr + '<textarea id="comment-textarea" class="form-control" placeholder="'+STRING_COMMENT_PLACE_HOLDER_WRITE_COMMENT+'"></textarea>';
    					commentListStr = commentListStr + '</div>\
        				<div class="publisher-actions">\
        				<div class="publisher-tools mr-auto">';
        				
    					
    					commentListStr = commentListStr + '</div>';
    					
    					commentListStr = commentListStr + '<div class="input-group align-middle mr-1">\
    				    <div class="input-group-prepend">\
    				    <span class="input-group-text">\
    				    <strong>'+STRING_BOARD_REGIST_NICKNAME+'</strong>\
    				    </span>\
    				    </div>\
    				    <input type="text" class="form-control" placeholder="" id="comment_nosign_nickname" maxlength="10" onkeyup="">'; 
    					commentListStr = commentListStr + '</div>';
    					commentListStr = commentListStr + '<div class="input-group align-middle mr-1">\
    				    <div class="input-group-prepend">\
    				    <span class="input-group-text">\
    				    <strong>'+STRING_BOARD_REGIST_PASSWORD+'</strong>\
    				    </span>\
    				    </div>\
    				    <input type="password" class="form-control" placeholder="" id="comment_nosign_pw" maxlength="8" onkeyup="">'; 
    					commentListStr = commentListStr + '</div>';
    					
    					commentListStr = commentListStr + '<button class="btn btn-primary" onclick="registComment(\'comment-textarea\', '+data.module_srl+', '+data.document_srl+', \'\', '+pageNumber+');">'+STRING_SUBMIT+'</button>\
        				</div>\
        				</div>\
        				</div>\
        				</div>\
        				</li>\
        				<!-- /�볤��묒꽦�� -->';
    				}
    				
//    			commentListStr = commentListStr + '</div>\
//    				<div class="publisher-actions">\
//    				<div class="publisher-tools mr-auto">\
//    				</div>\
//    				<button class="btn btn-primary" onclick="registComment(\'comment-textarea\', '+data.module_srl+', '+data.document_srl+', \'\', '+pageNumber+');">'+STRING_SUBMIT+'</button>\
//    				</div>\
//    				</div>\
//    				</div>\
//    				</div>\
//    				</li>\
//    				<!-- /�볤��묒꽦�� -->';
				
				if(data.commentArray.length < 1) {
					commentListStr = commentListStr + '<h5 class="text-center mt-3">'+STRING_COMMENT_NO_DATA_DESCRIPTION+'</h5>';
				}
				$.each(data.commentArray, function(key, val) {

					var varNickName = val.nick_name+'';
					
					commentListStr = commentListStr+'<li class="conversation-inbound">\
					<div class="conversation-avatar">\
					<span class="tile bg-primary tile-circle tile-sm">'+varNickName.substring(0,2)+'</span>\
					</div>\
					<div class="conversation-message col">\
					<div class="conversation-meta">\
					<a class="mr-2">\
					<strong>'+varNickName+'</strong>\
					</a>';
// 					if(val.user_id == val.user_id) {
// 						commentListStr = commentListStr+'<span class="badge badge-subtle badge-primary mr-2">�묒꽦��</span>';
// 					}
					commentListStr = commentListStr+'<span class="time">'+transferTime(val.regdate)+'</span>\
					</div>\
					<div class="conversation-message-text" id="comment-content-'+val.comment_srl+'"> '+val.content+' </div>\
					<div class="conversation-meta">\
					<a href="javascript:likeComment('+val.comment_srl+');">'+STRING_LIKE+'</a> <span class="badge badge-info" id="comment-like-'+val.comment_srl+'">'+val.voted_count+'</span> 쨌\
					<a href="javascript:expandReplyForm('+val.comment_srl+','+data.module_srl+','+data.document_srl+','+pageNumber+');">'+STRING_COMMENT+'</a>';
					
					if(isLogged && val.member_srl == memberSrl) {
						commentListStr = commentListStr+' 쨌 ';
						commentListStr = commentListStr+'<a href="javascript:modifyCommentForm('+val.comment_srl+')">'+STRING_MODIFY+'</a> 쨌 ';
	 					commentListStr = commentListStr+'<a href="javascript:showDeleteCommentModal('+val.comment_srl+','+pageNumber+')">'+STRING_DELETE+'</a>';
					}
					if(val.user_id == 'NOSIGN') {
						commentListStr = commentListStr+' 쨌 ';
	 					commentListStr = commentListStr+'<a href="javascript:showDeleteCommentForNosignModal('+val.comment_srl+','+pageNumber+')">'+STRING_DELETE+'</a>';
					}
					commentListStr = commentListStr+'</div>';


// 					if(val.replyArray.length > 0) {
						commentListStr = commentListStr + '<ul class="conversation-list" id="comment-'+val.comment_srl+'">';
// 					}
					$.each(val.replyArray, function(key2, val2) {

						var varNickNameReply = val2.reply_nick_name+'';
						
						commentListStr = commentListStr+'<li class="conversation-inbound">\
						<div class="conversation-avatar">\
						<span class="tile bg-primary tile-circle tile-sm">'+varNickNameReply.substring(0,2)+'</span>\
						</div>\
						<div class="conversation-message col">\
						<div class="conversation-meta">\
						<a class="mr-2">\
						<strong>'+varNickNameReply+'</strong>\
						</a>\
						<span class="time">'+transferTime(val2.reply_regdate)+'</span>\
						</div>\
						<div class="conversation-message-text" id="comment-content-'+val2.reply_comment_srl+'"> '+val2.reply_content+' </div>\
						<div class="conversation-meta">\
						<a href="javascript:likeComment('+val.comment_srl+');">'+STRING_LIKE+'</a> <span class="badge badge-info" id="comment-like-'+val2.reply_comment_srl+'">'+val2.reply_voted_count+'</span>';

						if(isLogged && val2.reply_member_srl == memberSrl) {
							commentListStr = commentListStr+' 쨌 ';
							commentListStr = commentListStr+'<a href="javascript:modifyCommentForm('+val2.reply_comment_srl+')">'+STRING_MODIFY+'</a> 쨌 ';
		 					commentListStr = commentListStr+'<a href="javascript:showDeleteCommentModal('+val2.reply_comment_srl+','+pageNumber+')">'+STRING_DELETE+'</a>';
						}
						if(val2.reply_user_id == 'NOSIGN') {
							commentListStr = commentListStr+' 쨌 ';
							commentListStr = commentListStr+'<a href="javascript:showDeleteCommentForNosignModal('+val2.reply_comment_srl+','+pageNumber+')">'+STRING_DELETE+'</a>';
						}
						commentListStr = commentListStr+'</div>\
						</div>\
						</li>';
						
					});
// 					if(val.replyArray.length > 0) {
						commentListStr = commentListStr + '</ul>';
// 					}


					commentListStr = commentListStr+'</div>\
					</li>';










					
				});


				
				var totalCount = data.totalCount;

				var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getDocumentComment('+(pageNumber-1)+', '+pageLimit+', '+docSrl+')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">1</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getDocumentComment(0, '+pageLimit+', '+docSrl+')">1</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getDocumentComment('+(page)+', '+pageLimit+', '+docSrl+')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getDocumentComment('+(page)+', '+pageLimit+', '+docSrl+')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(totalPageCount)+'</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getDocumentComment('+(totalPageCount-1)+', '+pageLimit+', '+docSrl+')">'+(totalPageCount)+'</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getDocumentComment('+(pageNumber+1)+', '+pageLimit+', '+docSrl+')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 
				 $(targetPaginationId).html(paginationStr);
				
				
			}
			

			$(targetIdCommentBest).html(commentBestStr);
			$(targetIdCommentList).html(commentListStr);

			
			
			
		},
		error:function(data) {
			console.log(STRING_LOG_FAILED_GET_DOCUMENT_COMMENT);
		},
		complete:function() {
		}
	
		});
}

function deleteDocument(docSrl) {

	if(global_Processing) {
		return;
	}

	global_Processing = true;
	$('#waitingModal').modal('show');

	$.ajax({
		type : 'post',
		data: {
			docSrl : docSrl
			},
		url: 'process/document_delete.php',
		dataType: 'json',
		success:function(data) {
// 			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_FAILED_DELETE_DOCUMENT);
			}
			else if(data == 'success') {

				setTimeout(function(){
					$('#deleteDocumentModal').modal('hide');
					}, 100);

				window.location.href="board.php?mid="+global_mid;
			} 
			
		},
		error:function(data) {
		},
		complete:function() {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				global_Processing = false;
				}, 500);
		}
	
		});
}
function deleteDocumentForNosign(docSrl) {

	if(global_Processing) {
		return;
	}
	
	var password = $('#modal_nosign_pw').val();
	if(password == '' || password.length < 4) {
    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_PASSWORD_MIN_LENGTH);
    	return;
    }

	global_Processing = true;
	$('#waitingModal').modal('show');

	$.ajax({
		type : 'post',
		data: {
			docSrl : docSrl,
			password : password
			},
		url: 'process/document_delete_nosign.php',
		dataType: 'json',
		success:function(data) {
// 			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_FAILED_DELETE_DOCUMENT);
			}
			else if(data == 'success') {

				$('#modal_nosign_pw').val('');
				setTimeout(function(){
					$('#deleteDocumentForNosignModal').modal('hide');
					}, 100);

				window.location.href="board.php?mid="+global_mid;
			}
			else if(data == 'password incorrect') {
				alert(STRING_ALERT_FAILED_DELETE_DOCUMENT_PASSWORD_INCORRECT);
			}
			
		},
		error:function(data) {
		},
		complete:function() {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				global_Processing = false;
				}, 500);
		}
	
		});
}

function showDeleteDocumentModal(docSrl) {
	var deleteDocumentModalButtonStr = '';
	deleteDocumentModalButtonStr = deleteDocumentModalButtonStr + '<button type="button" class="btn btn-primary" onclick="deleteDocument('+docSrl+');">'+STRING_DELETE+'</button>';
	deleteDocumentModalButtonStr = deleteDocumentModalButtonStr + '<button type="button" class="btn btn-light" data-dismiss="modal">'+STRING_CANCEL+'</button>';
	$('#deleteDocumentModal-button').html(deleteDocumentModalButtonStr);

	$('#deleteDocumentModal').modal('show');
	  
}
function showDeleteDocumentForNosignModal(docSrl) {
	var deleteDocumentModalButtonStr = '';
	deleteDocumentModalButtonStr = deleteDocumentModalButtonStr + '<button type="button" class="btn btn-primary" onclick="deleteDocumentForNosign('+docSrl+');">'+STRING_DELETE+'</button>';
	deleteDocumentModalButtonStr = deleteDocumentModalButtonStr + '<button type="button" class="btn btn-light" data-dismiss="modal">'+STRING_CANCEL+'</button>';
	$('#deleteDocumentForNosignModal-button').html(deleteDocumentModalButtonStr);

	$('#deleteDocumentForNosignModal').modal('show');
	  
}

function showRegistConfirmModal() {
// 	var content = $('#quillEditor').html();

var title = $('#document_title').val();
// var content = editor.getContents();
// var contentLength = editor.getLength();


// var content = editor.container.firstChild.innerHTML;
var content = CKEDITOR.instances.writeEditor.getData();
var contentLength = content.length;

// console.log(content);
// alert(content);
// return;
    if(title == '' || title.length < 2) {
    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_TITLE_MIN_LENGTH);
    	return;
    }
	if(content == '' || content.length < 10) {
		alert(STRING_ALERT_REGIST_CONFIRM_MODAL_CONTENT_MIN_LENGTH);
		return;
	}
	if(contentLength > 5000) {
		alert(STRING_ALERT_REGIST_CONFIRM_MODAL_CONTENT_MAX_LENGTH+contentLength);
		return;
	}
	
	if(!isLogged || parseInt(memberSrl) < 1) {
		var nickName = $('#document_nosign_nick').val();
		var password = $('#document_nosign_pw').val();
		if(nickName == '' || nickName.length < 2) {
	    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_NICKNAME_MIN_LENGTH);
	    	return;
	    }
		if(password == '' || password.length < 4) {
	    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_PASSWORD_MIN_LENGTH);
	    	return;
	    }
	}
	
	
	$('#registConfirmModal').modal('show');
}
function registDocument(mid) {

	if(mid == 'undefined' || mid == '') {
		alert(STRING_ALERT_REGIST_DOCUMENT_INVALID_BOARD_PATH);
    	return;
	}

	if(global_Processing) {
		return;
	}

	var title = $('#document_title').val();
// 	var content = editor.getText();
// 	var contentLength = editor.getLength();
// var content = editor.container.firstChild.innerHTML;
var content = CKEDITOR.instances.writeEditor.getData();
var contentLength = content.length;

	var nick_name = global_nick_name;

	if(title == '' || title.length < 2) {
    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_TITLE_MIN_LENGTH);
    	return;
    }
	if(content == '' || content.length < 10) {
		alert(STRING_ALERT_REGIST_CONFIRM_MODAL_CONTENT_MIN_LENGTH);
		return;
	}
	if(contentLength > 5000) {
		alert(STRING_ALERT_REGIST_CONFIRM_MODAL_CONTENT_MAX_LENGTH+contentLength);
		return;
	}
	
	var signin_code = 1;
	var password = '';
	if(!isLogged || parseInt(memberSrl) < 1) {
		signin_code = 0;
		nick_name = $('#document_nosign_nick').val();
		password = $('#document_nosign_pw').val();
		if(nick_name == '' || nick_name.length < 2) {
	    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_NICKNAME_MIN_LENGTH);
	    	return;
	    }
		if(password == '' || password.length < 4) {
	    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_PASSWORD_MIN_LENGTH);
	    	return;
	    }
	}


	var extra_values_array = [];
	if(global_extra_array.length > 0) {

		for(var i=0;i<global_extra_array.length;i++) {
			var eachExtraArray = global_extra_array[i].split(';');
			var eachExtraName = eachExtraArray[0];
			var eachExtraEid = eachExtraArray[1];
			var eachExtraIsRequired = eachExtraArray[2];
			var eachExtraIdx = eachExtraArray[3];
			var eachExtraType = eachExtraArray[4];
			var eachExtraValue = $('#'+eachExtraEid).val();

			if(eachExtraEid == 'embed_url') {
				if(eachExtraValue.indexOf('youtu.be/') != -1) {
					var eachExtraValueArray = eachExtraValue.split('youtu.be/');
					eachExtraValueArray = eachExtraValueArray[1].split('/');
					var youtubeId = eachExtraValueArray[0];
					if(youtubeId.indexOf('?') != -1) {
						youtubeId = youtubeId.split('?')[0];
					}
					eachExtraValue = "https://www.youtube.com/embed/"+youtubeId;
				}
				else if(eachExtraValue.indexOf('youtube.com/watch?v=') != -1) {
					var eachExtraValueArray = eachExtraValue.split('youtube.com/watch?v=');
					eachExtraValueArray = eachExtraValueArray[1].split('&');
					var youtubeId = eachExtraValueArray[0];
					if(youtubeId.indexOf('/') != -1) {
						youtubeId = youtubeId.split('/')[0];
					}
					eachExtraValue = "https://www.youtube.com/embed/"+youtubeId;
				}
				else if(eachExtraValue.indexOf('twitch.tv/videos/') != -1) {
					var eachExtraValueArray = eachExtraValue.split('twitch.tv/videos/');
					eachExtraValueArray = eachExtraValueArray[1].split('/');
					var vodId = eachExtraValueArray[0];
					if(vodId.indexOf('?') != -1) {
						vodId = vodId.split('?/')[0];
					}
					eachExtraValue = "https://player.twitch.tv/?video="+vodId+"&autoplay=false";
				}
			}
			
			if(eachExtraEid == 'with_streamer') {
				eachExtraValue = global_with_streamer_array.join(';@;');
			}
			
			if(eachExtraEid == 'uploaded_file_url') {
				eachExtraValue = global_attach_file_array.join(';');
			}
			
			extra_values_array[eachExtraIdx] = eachExtraValue;

			if(eachExtraIsRequired == 'Y') {
				if(eachExtraValue == '' || eachExtraValue.length<2) {
					alert(eachExtraName+STRING_ALERT_REGIST_DOCUMENT_MANDATORY_VALUE);
					return;
				}
			}
			if(eachExtraValue!='' && eachExtraValue.length>1 && eachExtraType == 'homepage') {
				if(eachExtraValue.indexOf('http') == -1) {
					alert(eachExtraName+STRING_ALERT_REGIST_DOCUMENT_INVALID_TYPE);
					return;
				}
			}
			
			
		}
		
	}
	
	global_Processing = true;
	$('#waitingModal').modal('show');
	
	$.ajax({
		type : 'post',
		data: {
			mid : mid,
			nick_name : nick_name,
			title : title,
			content : content,
			extra_values_array : extra_values_array,
			password : password,
			signin_code : signin_code
			},
		url: 'process/document_regist.php',
		dataType: 'json',
		success:function(data) {
//			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_FAILED_REGIST_DOCUMENT);
			}
			else if(data == 'success') {
				global_attach_file_array = [];
				window.location.href = 'board.php?mid='+mid;
			} 

		},
		error:function(data) {
		},
		complete:function() {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				$('#registConfirmModal').modal('hide');
				global_Processing = false;
				}, 500);
			
		}
		});
}
function getBoardInfo(mid) {
	if(mid == 'undefined' || mid == '') {
		alert(STRING_ALERT_REGIST_DOCUMENT_INVALID_BOARD_PATH);
    	return;
	}

	var targetId = '#board-regist-title-form-group';
	var extraStr = '';
	 
$('#waitingModal').modal('show');
	
	$.ajax({
		type : 'post',
		data: {
			mid : mid
			},
		url: 'process/board_info_get.php',
		dataType: 'json',
		success:function(data) {
//			console.log(data);
			if(data == 'empty') {
			}
			else {
				
				if(!isLogged || parseInt(memberSrl) < 1) {
					extraStr = extraStr + '<div class="input-group input-group-alt mt-2">\
				    <div class="input-group">\
				    <div class="input-group-prepend">\
				    <span class="input-group-text">\
				    <strong>'+STRING_BOARD_REGIST_NICKNAME+'</strong><em style="color:#e67e22;">*</em>\
				    </span>\
				    </div>\
				    <input type="text" class="form-control" placeholder="" id="document_nosign_nick" maxlength="15" onkeyup="">';
					extraStr = extraStr + '</div>\
				    <div class="input-group">\
				    <div class="input-group-prepend">\
				    <span class="input-group-text">\
				    <strong>'+STRING_BOARD_REGIST_PASSWORD+'</strong><em style="color:#e67e22;">*</em>\
				    </span>\
				    </div>\
				    <input type="password" class="form-control" placeholder="" id="document_nosign_pw" maxlength="8" onkeyup="">';
					extraStr = extraStr + '</div>\
				    </div>';
				}
				
				$.each(data.infoArray, function(key, val) {
					
					if(val.eid == 'uploaded_file_url') {
						extraStr = extraStr + '<div class="input-group input-group-alt mt-2" style="display: none;">';
					}
					else {
						extraStr = extraStr + '<div class="input-group input-group-alt mt-2">';
					}
					extraStr = extraStr + '<div class="input-group">\
				    <div class="input-group-prepend">\
				    <span class="input-group-text">\
				    <strong>'+val.var_name+'</strong>';
				    if(val.var_is_required == 'Y') {
				    	extraStr = extraStr + '<em style="color:#e67e22;">*</em>';
				    }
				    extraStr = extraStr + '</span>\
				    </div>\
				    <input type="text" class="form-control" id="'+val.eid+'"';
					if(val.var_type == 'homepage') {
						extraStr = extraStr + ' placeholder="http://" ';
					}
//					if(!isLogged || parseInt(memberSrl) < 1) {
//						extraStr = extraStr + ' disabled ';
//					}
					if(val.eid == 'with_streamer') {
						extraStr = extraStr + ' placeholder="'+STRING_WITH_STREAMER_INPUT_PLACEHOLDER+'" ';
						extraStr = extraStr + ' disabled ';
					}
					extraStr = extraStr + '>';
					if(val.eid == 'with_streamer') {
						extraStr = extraStr + '<div class="input-group-append">\
						<button type="button" class="btn btn-secondary" data-toggle="" id="delete_with_streamer_button" onclick="deleteWithStreamer();">'+STRING_DELETE+'</button>\
						<button type="button" class="btn btn-secondary" data-toggle="" id="search_with_streamer_button" onclick="$(\'#searchWithStreamerModal\').modal(\'show\');">\
						<i class="fas fa-search"></i> '+STRING_WITH_STREAMER_BUTTON_SEARCH_STREAMER+'\
						</button>\
						</div>';
					}
					extraStr = extraStr + '</div>';
					extraStr = extraStr + '</div>';

					global_extra_array.push(val.var_name+';'+val.eid+';'+val.var_is_required+';'+val.var_idx+';'+val.var_type);
				});
				
				$(targetId).append(extraStr);
			}

			setTimeout(function(){
				$('#waitingModal').modal('hide');
				}, 500);


		},
		error:function(data) {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				}, 500);
		},
		complete:function() {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				}, 500);
		}
		});
}

function registFavorite(favorite_id, target) {
	
	if(!isLogged) {
		registFavoriteCookie(favorite_id, target);
		return;
	}

	var targetId = '#favorite-'+target+'-id-'+favorite_id; 

	if(global_Processing) {
		return;
	}
	if(target == 'undefined' || target == '' || favorite_id == 'undefined' || favorite_id == '') {
		return;
	}


	global_Processing = true;
	$('#waitingModal').modal('show');

	
	$.ajax({
		type : 'post',
		data: {
			memberSrl : memberSrl,
			favorite_id : favorite_id,
			target : target
			},
		url: 'process/favorite_regist.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
// 				alert('test');
				var bodyStr = "";
			if(data == 'failed') {
				
			}
			else if(data == 'regist') {
				bodyStr = bodyStr+'<a href="javascript:registFavorite('+favorite_id+',\''+target+'\')" class="btn btn-sm btn-warning">';
				bodyStr = bodyStr+'<i class="far fa-star"></i>';
				bodyStr = bodyStr+'</a>';

				$(targetId).html(bodyStr);
			}  
			else if(data == 'unset') {
				bodyStr = bodyStr+'<a href="javascript:registFavorite('+favorite_id+',\''+target+'\')" class="btn btn-sm btn-outline-warning">';
				bodyStr = bodyStr+'<i class="far fa-star"></i>';
				bodyStr = bodyStr+'</a>';
				
				$(targetId).html(bodyStr);
			} 
			
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				global_Processing = false;
				}, 500);
		},
		error:function(data) {
		},
		complete:function() {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				global_Processing = false;
				}, 500);
		}
	
		});
}
function registFavoriteCookie(favorite_id, target) {

	var targetId = '#favorite-'+target+'-id-'+favorite_id; 
	
	var favoriteCookieName = 'tos_favorite_'+target;
	var favoriteStr = getCookie(favoriteCookieName);

	var isUnset = false;

	if(favoriteStr == null || favoriteStr == 'undefined' || favoriteStr == '') {
		setCookie(favoriteCookieName,favorite_id,365);
	} else {
		var favoriteArray = favoriteStr.split(',').map( Number );
		if(favoriteArray.indexOf(favorite_id) != -1) {
			favoriteArray.splice(favoriteArray.indexOf(favorite_id),1);
			favoriteArray = favoriteArray.filter(function(e) {
			    return e === 0 ? '0' : e
			})
			isUnset = true;
		 } else {
			 favoriteArray.push(favorite_id);
		 }
		var favoriteResultStr = favoriteArray.join(',');

		setCookie(favoriteCookieName,favoriteResultStr,365);
	}

	var favoriteBtnStyle = 'btn-warning';
	if(isUnset) {
		favoriteBtnStyle = 'btn-outline-warning';
	} 

	var bodyStr = '';
	bodyStr = bodyStr+'<a href="javascript:registFavorite('+favorite_id+',\''+target+'\')" class="btn btn-sm '+favoriteBtnStyle+'">';
	bodyStr = bodyStr+'<i class="far fa-star"></i>';
	bodyStr = bodyStr+'</a>';

	$(targetId).html(bodyStr);

}

function registSuggestion() {


	var content = $('#suggestion-textarea').val();
	
	if(content == '' || content.length < 2) {
		alert(STRING_ALERT_SUGGESTION_CONTENT_MIN_LENGTH);
		return;
	}
	if(content > 5000) {
		alert(STRING_ALERT_SUGGESTION_CONTENT_MAX_LENGTH);
		return;
	}

	
	$.ajax({
		type : 'post',
		data: {
			content : content,
			},
		url: 'process/suggestion_regist.php',
		dataType: 'json',
		success:function(data) {
//			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_FAILED_REGIST_SUGGESTION);
			}
			else if(data == 'success') {
				alert(STRING_ALERT_SUCCESS_REGIST_SUGGESTION);
			} 

			setTimeout(function(){
				$('#suggestionModal').modal('hide');
				}, 100);
		},
		error:function(data) {
		},
		complete:function() {
			setTimeout(function(){
				$('#suggestionModal').modal('hide');
				}, 100);
		}
		});
}

var setCookie = function(name, value, exp) {
	  var date = new Date();
	  date.setTime(date.getTime() + exp*24*60*60*1000);
	  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};
var getCookie = function(name) {
	  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	  return value? value[2] : null;
};

function userLogin(email,uniqId,platform) {
	$.ajax({
		type : 'post',
		data: {
			email : email,
			uniqId : uniqId,
			platform : platform
			},
		url: 'process/user_login.php',
		dataType: 'json',
		success:function(data) {
//			console.log(data);
			if(data == 'empty') {
// 				location.href="signup.php?email="+email;
				$("#email").val(email);
				$("#uniqId").val(uniqId);
				$("#platform").val(platform);
				$('#callback-signup-hidden-form').submit();
				return;
			}
			else if(data == 'failed') {
// 				location.href="signup.php?email="+email;
				$("#email").val(email);
				$("#uniqId").val(uniqId);
				$("#platform").val(platform);
				$('#callback-signup-hidden-form').submit();
				return;
			} 
			else {

				location.href="./";
				
			}
			
		},
		error:function(data) {
		},
		complete:function() {
		}
	
		});
}

function checkLoginStateFB() {
    FB.getLoginStatus(function(response) {
      fbStatusChangeCallback(response);
    });
  }

  function fbStatusChangeCallback(response) {
// 	    console.log('statusChangeCallback');
// 	    console.log(response.authResponse);
	    if (response.status === 'connected') {
// 	      FB.logout(function(response) {
// 		   alert('濡쒓렇�꾩썐�섏뿀�듬땲��');
// 		});
	    	FB.api('/me', {fields:'email,name'}, function(res) {
// 				console.log("Success Login : " + res.name);
// 				console.log("Success Login : " + res.email);
// 				console.log("Success Login : " + res.id);

				if(res.email != "undefined" && res.email != null && res.id != "undefined" && res.id != null) {
					userLogin(res.email,res.id,'fb');
				} else {
					alert(STRING_ALERT_CALLBACK_FACEBOOK_AGREE_EMAIL);
				}
				
			});
	    } else {
	      // The person is not logged into your app or we are unable to tell.
// 	      document.getElementById('status').innerHTML = 'Please log ' +
// 	        'into this app.';
	      alert(STRING_ALERT_CALLBACK_FACEBOOK_SIGNIN);
	    }
	  }
  function onSuccessGoogleSignIn(googleUser) {
	  var profile = googleUser.getBasicProfile();
	  if(profile.getEmail() != "undefined" && profile.getEmail() != null && profile.getId() != "undefined" && profile.getId() != null) {
		  userLogin(profile.getEmail(),profile.getId(),'google');
//		  alert('userLogin');

	  } else {
		  alert(STRING_ALERT_CALLBACK_GOOGLE_AGREE_EMAIL);
	  }
  }
  function onFailureGoogleSignIn(error) {
	  console.log(error);
  }

function copyToClipboard(val) {

	prompt(STRING_PROMPT_COPY_CLIPBOARD, val);

}

function setViewPortCookie(enable) {
	var tosVpCookieName = 'tos_vp';
	if(enable != 'undefined' && enable != '' && enable == 'Y') {
		setCookie(tosVpCookieName,'Y',30);
	} else {
		setCookie(tosVpCookieName,'N',-30);
	}
	
//	window.location.href = document.location.href;
	window.location.reload();
}
function setLanguageCookie(lang) {
	var tosCookieName = 'tos_lang';
	if(lang != 'undefined' && lang != '') {
		setCookie(tosCookieName,lang,10000);
	} else {
		setCookie(tosCookieName,lang,-30);
	}
	window.location.reload();
}

function registViewLogCookie(view_id) {

	var targetCookieName = 'tos_view_log';
	var targetCookieStr = getCookie(targetCookieName);

	var isUnset = false;

	if(targetCookieStr == null || targetCookieStr == 'undefined' || targetCookieStr == '') {
		setCookie(targetCookieName,view_id,365);
	} else {
		var cookieArray = targetCookieStr.split(',').map( Number );
		if(cookieArray.indexOf(view_id) != -1) {
			cookieArray.splice(cookieArray.indexOf(view_id),1);
			cookieArray = cookieArray.filter(function(e) {
			    return e === 0 ? '0' : e
			})
			 cookieArray.push(view_id);
			isUnset = true;
		 } else {
			 cookieArray.push(view_id);
		 }
		if(cookieArray.length > 30) {
			cookieArray = cookieArray.slice(1,cookieArray.length);
		}
		var cookieResultStr = cookieArray.join(',');

		setCookie(targetCookieName,cookieResultStr,365);
	}

}

function initViewLog() {

	var targetCookieName = 'tos_view_log';
	
	setCookie(targetCookieName,'',-1);
	
	var currentUrl = document.location.href;
	
	window.location.href = currentUrl;

}

function getWithStreamerSearch() {
	var searchKeyword = $('#search_keyword_with_streamer').val();
	if(searchKeyword.length > 1) {
		getWithStreamer(0, 10, searchKeyword);	
	} else {
		alert(STRING_ALERT_SEARCH_MIN_LENGTH);
	}
}
function getWithStreamer(pageNumber, pageLimit, searchKeyword) {

	var targetId = '#board-search-with-streamer-modal-body'; 
	var targetPaginationId = '#board-search-with-streamer-modal-pagination';

	var targetStr = '<tr class="board-list-tr">\
		<td class="align-middle text-center mt-3 mb-3" colspan="4"> <div class="loader"></div> </td>\
		</tr>';
	$(targetId).html(targetStr);

	if(searchKeyword == 'undefined') {
		searchKeyword = '';
	}
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			searchKeyword : searchKeyword
			},
		url: 'process/streamer_ranking_get.php',
		dataType: 'json',
		success:function(data) {
			
				$(targetId).html('');
				$(targetPaginationId).html('');
				var rankingTbodyStr = "";
				var paginationStr = "";
			if(data == 'empty') {
				rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr">';
				rankingTbodyStr = rankingTbodyStr+'<td class="align-middle" colspan="4"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				rankingTbodyStr = rankingTbodyStr+'</tr>';
				
			} else {

				var totalCount = data.totalCount;

				var favoriteStr = new String(data.favoriteStr);
				var favoriteArray = new Array();
				if(favoriteStr != '' && favoriteStr.length>0) {
					 var favoriteArray = favoriteStr.split(';');
				 }

				if(!isLogged) {
					var favoriteCookieName = 'tos_favorite_streamer';
					favoriteStr = getCookie(favoriteCookieName);

					if(favoriteStr != null) { 
						favoriteArray = favoriteStr.split(',');
					}
				}

				 var localRankNum = pageNumber*pageLimit +1;

				 $.each(data.infoArray, function(key, val) {

					 var favoriteBtnStyle = 'btn-outline-warning';
					 if(favoriteArray.indexOf(val.streamer_id) != -1) {
						 favoriteBtnStyle = 'btn-warning';
					 }

					 var iconUrlSm = val.icon_url_sm;

					 rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr">';
					 rankingTbodyStr = rankingTbodyStr+'<td>';

					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 rankingTbodyStr = rankingTbodyStr+'<a href="javascript:selectWithStreamer('+val.streamer_id+', \''+val.name+'\');" class="tile tile-img mr-1" target="_blank"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 rankingTbodyStr = rankingTbodyStr+'<a href="javascript:selectWithStreamer('+val.streamer_id+', \''+val.name+'\');" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }

					 var platformName = val.platform;
					 if(val.platform == 'YOUTUBE') {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.platform == 'TWITCH') {
						 platformName = STRING_TWITCH;
					 } 
					 
					 rankingTbodyStr = rankingTbodyStr+'<a href="javascript:selectWithStreamer('+val.streamer_id+', \''+val.name+'\');">'+val.name+'</a>';
// 					 if(val.status_live == 'on') {
// 						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
// 					 }
// 					 else if(val.media_count_today>0) {
// 						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-subtle badge-warning ml-1">NEW</span>';
// 					 }
// 					 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 rankingTbodyStr = rankingTbodyStr+'</td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle" data-th="�붾줈��"> '+numberWithCommas(val.follower_count)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle" data-th="�뚮옯��"> '+platformName+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle" style="overflow: auto;white-space: nowrap;" data-th="遺꾨쪟"> '+convertCategoryName(val.category)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'</tr>';

					 localRankNum = localRankNum+1;
				 });


				 var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getWithStreamer('+(pageNumber-1)+', '+pageLimit+', \''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getWithStreamer(0, '+pageLimit+', \''+searchKeyword+'\')">1</a>';
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
						 }
						 paginationStr = paginationStr+'<a class="page-link" onclick="getWithStreamer('+(page)+', '+pageLimit+', \''+searchKeyword+'\')">'+(page+1)+'</a>';
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
						 }
						 paginationStr = paginationStr+'<a class="page-link" onclick="getWithStreamer('+(page)+', '+pageLimit+', \''+searchKeyword+'\')">'+(page+1)+'</a>';
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getWithStreamer('+(totalPageCount-1)+', '+pageLimit+', \''+searchKeyword+'\')">'+(totalPageCount)+'</a>';
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getWithStreamer('+(pageNumber+1)+', '+pageLimit+', \''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 $(targetPaginationId).html(paginationStr);
				
			}
			
			$(targetId).html(rankingTbodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function selectWithStreamer(streamer_id, streamer_name) {
	$('#searchWithStreamerModal').modal('hide');
	for(var count=0;count<global_with_streamer_array.length;count++) {
		if(global_with_streamer_array[count].indexOf(streamer_id+'/@/') != -1) {
			return;
		}
	}
	
	var withStreamerStr = $('#with_streamer').val();
	withStreamerStr = withStreamerStr+'['+streamer_name+'];';
	global_with_streamer_array.push(streamer_id+'/@/'+streamer_name);
	$('#with_streamer').val(withStreamerStr);
}

function deleteWithStreamer() {
	$('#searchWithStreamerModal').modal('hide');
	$('#with_streamer').val('');
	global_with_streamer_array = [];
}

function getHomeStreamerRanking(pageNumber, pageLimit, platformSelected, categorySelected, countrySelected, liveSelected) {
	
// 	alert('test');
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			platformSelected : platformSelected,
			categorySelected : categorySelected,
			countrySelected : countrySelected,
			liveSelected : liveSelected
			},
		url: 'process/streamer_ranking_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
// 				alert('test');
				$('#main-streamer-ranking-tbody').html('');
				var rankingTbodyStr = "";
			if(data == 'empty') {
				rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr">';
				rankingTbodyStr = rankingTbodyStr+'<td class="align-middle" colspan="5"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				rankingTbodyStr = rankingTbodyStr+'</tr>';
				
			} else {

				var localRankNum = pageNumber*pageLimit +1;
				
				 $.each(data.infoArray, function(key, val) {

					 var iconUrlSm = val.icon_url_sm;

					 var platformName = val.platform;
					 if(val.platform == 'YOUTUBE') {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.platform == 'TWITCH') {
						 platformName = STRING_TWITCH;
					 } 

					 rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr" style="font-size: 14px;">';
// 					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle"> '+val.rank+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" style="font-weight: bold;"> '+localRankNum+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="d-none d-md-table-cell">';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-subtle badge-warning ml-1">NEW</span>';
					 }
					 rankingTbodyStr = rankingTbodyStr+'</td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�붾줈��"> '+numberWithCommas(val.follower_count)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�뚮옯��"> '+platformName+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�곸긽 ��"> '+numberWithCommas(val.media_count)+' </td>';


					 // sm,xs �� td
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 rankingTbodyStr = rankingTbodyStr+'<div >';
					 rankingTbodyStr = rankingTbodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">'+localRankNum+'. ';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1 ml-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1 ml-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-subtle badge-warning ml-1">N</span>';
					 }
					 rankingTbodyStr = rankingTbodyStr+'</p>';
					 rankingTbodyStr = rankingTbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 rankingTbodyStr = rankingTbodyStr+'<span style="font-size: 12px;"> '+STRING_STREAMER_RANKING_FOLLOWER+' '+numberWithCommasWithK(val.follower_count)+' | '+platformName+' | '+STRING_STREAMER_RANKING_VIDEO+' '+numberWithCommas(val.media_count)+'</span>';
					 rankingTbodyStr = rankingTbodyStr+'</p>';
					 rankingTbodyStr = rankingTbodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 rankingTbodyStr = rankingTbodyStr+'</tr>';

					 localRankNum = localRankNum+1;
				 });
				
			}
			
			$('#main-streamer-ranking-tbody').html(rankingTbodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function getHomeStreamerFeedsBest(pageNumber, pageLimit, conditionPeriod, region) {

	var targetId = '#home-streamer-feeds-group';

	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			conditionPeriod : conditionPeriod,
			region : region
			},
		url: 'process/streamer_feeds_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
// 				alert('test');
// 				$(targetId).html('');
				var bodyStr = "";
				
			if(data == 'empty') {
//				alert('由ъ뒪�멸� �놁뒿�덈떎.');
				bodyStr = '<h4 class="text-center">�곗씠�곌� �놁뒿�덈떎.</h4>';
			} else {

				var totalCount = data.totalCount;

				 $.each(data.infoArray, function(key, val) {

					 var platformName = "";
					 if(val.media_url.indexOf('youtu') != -1 || val.media_url.indexOf('youtube') != -1) {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.media_url.indexOf('twitch') != -1) {
						 platformName = STRING_TWITCH;
					 }

					 bodyStr = bodyStr+'<a href="'+val.media_url+'" class="list-group-item list-group-item-action" target="_blank" onclick="updateDocumentReadedCount('+val.streamer_id+')">';
					 bodyStr = bodyStr+'<div class="list-group-item-figure rounded-left">';
					 bodyStr = bodyStr+'<img src="'+val.thumbnail_url+'" alt="placeholder image"> </div>';
					 bodyStr = bodyStr+'<div class="list-group-item-body">';
					 bodyStr = bodyStr+'<h4 class="list-group-item-title main-list-group-media-body-title"> '+val.title+' </h4>';
					 bodyStr = bodyStr+'<p class="list-group-item-text main-list-group-media-body-text"><object><a href="streamer_detail.php?sid='+val.streamer_id+'"> '+val.streamer_name+' </a></object><span class="badge badge-subtle badge-dark" style="font-size: 0.8em;"> '+platformName+' </span> </p>';
					 bodyStr = bodyStr+'</div>';
					 bodyStr = bodyStr+'</a>';
				 });


			}
			
			$(targetId).html(bodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function getHomeStreamerSearch(streamerId) {
	var searchKeyword = $('#search_keyword').val();
	if(searchKeyword.length > 1) {
		window.location.href = 'streamer.php?sp='+searchKeyword+'&region=1';
	} else {
		alert(STRING_ALERT_SEARCH_STREAMER_MIN_LENGTH);
	}
	
}

function getHomeStreamerSoar(pageNumber, pageLimit, platformSelected, categorySelected, countrySelected, liveSelected) {

	var targetId = '#main-streamer-soar-tbody';
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			platformSelected : platformSelected,
			categorySelected : categorySelected,
			countrySelected : countrySelected,
			liveSelected : liveSelected
			},
		url: 'process/streamer_soar_get.php',
		dataType: 'json',
		success:function(data) {
			
// 				console.log(data);
// 				alert('test');
				$(targetId).html('');
				var tbodyStr = "";
			if(data == 'empty') {
				tbodyStr = tbodyStr+'<tr class="board-list-tr">';
				tbodyStr = tbodyStr+'<td class="align-middle" colspan="5"> <h4 class="text-center">�곗씠�곌� �놁뒿�덈떎.</h4> </td>';
				tbodyStr = tbodyStr+'</tr>';
				
			} else {

				var localRankNum = pageNumber*pageLimit +1;
				
				 $.each(data.infoArray, function(key, val) {
					 var iconUrlSm = val.icon_url_sm;

					 var platformName = val.platform;
					 if(val.platform == 'YOUTUBE') {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.platform == 'TWITCH') {
						 platformName = STRING_TWITCH;
					 } 

					 tbodyStr = tbodyStr+'<tr class="board-list-tr" style="font-size: 14px;">';
// 					 tbodyStr = tbodyStr+'<td class="align-middle"> '+val.rownum+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" style="font-weight: bold;"> '+localRankNum+' </td>';
					 tbodyStr = tbodyStr+'<td class="d-none d-md-table-cell">';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 tbodyStr = tbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 tbodyStr = tbodyStr+'<span class="badge badge-subtle badge-warning ml-1">NEW</span>';
					 }
					 tbodyStr = tbodyStr+'</td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�붾줈��"> '+numberWithCommas(val.follower_count)+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�뚮옯��"> '+platformName+' </td>';

					 
					// sm,xs �� td
					 tbodyStr = tbodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 tbodyStr = tbodyStr+'<div >';
					 tbodyStr = tbodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">'+localRankNum+'. ';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1 ml-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1 ml-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 tbodyStr = tbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 tbodyStr = tbodyStr+'<span class="badge badge-subtle badge-warning ml-1">N</span>';
					 }
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 tbodyStr = tbodyStr+'<span style="font-size: 12px;"> '+STRING_STREAMER_RANKING_FOLLOWER+' '+numberWithCommasWithK(val.follower_count)+' | '+platformName+' | '+STRING_STREAMER_RANKING_VIDEO+' '+numberWithCommas(val.media_count)+'</span>';
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 tbodyStr = tbodyStr+'</tr>';

					 localRankNum = localRankNum+1;
				 });
				
			}
			
			$(targetId).html(tbodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function getHomeStreamerAllStats() {

	$.ajax({
		type : 'post',
		url: 'process/streamer_all_stats_get.php',
		dataType: 'json',
		success:function(data) {
			if(data == 'empty') {
				return;
			} else {

				$('#home-streamer-stats-streamer-count').html(numberWithCommasWithK(data.streamer_count_all));
				$('#home-streamer-stats-follower-count').html(numberWithCommasWithK(data.follower_count_all));
				$('#home-streamer-stats-media-count').html(numberWithCommasWithK(data.media_count_all));
				$('#home-streamer-stats-media-count-today').html(numberWithCommasWithK(data.media_count_today_all));
				
			}
			
		},
		error:function(data) {
		},
		complete:function() {
		}
	
		});
}
function getHomeDocumentsBest(pageNumber, pageLimit) {

	var targetId = '#home-document-best-group';
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit
			},
		url: 'process/board_documents_best_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);

				$(targetId).html('');
				var bodyStr = "";
				
			if(data == 'empty') {
				bodyStr = bodyStr+'<div class="list-group-item-body mt-2"> ';
				bodyStr = bodyStr+'<span class="text-center"> <h5 class="text-center">'+STRING_NODATA+'</h5> </span>';
				bodyStr = bodyStr+'</div>';
			} else {

				var totalCount = data.totalCount;

				 $.each(data.infoArray, function(key, val) {

					var regdate = val.regdate+'';

					 bodyStr = bodyStr+'<a href="board_content.php?mid='+val.mid+'&doc='+val.document_srl+'" class="list-group-item list-group-item-action board-main-list-item">\
						<div class="list-group-item-body">';

// 						if(val.comment_count!= null && parseInt(val.comment_count) > 0) {
// 							 bodyStr = bodyStr+'<p class="card-title mb-3 mt-1" style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">'+val.title+' ['+val.comment_count+']</p>';
// 						 } else {
							 bodyStr = bodyStr+'<p class="card-title mb-3 mt-1" style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">'+val.title+'</p>';
// 						 }
						
						bodyStr = bodyStr+'<p class="card-subtitle text-muted row mb-2" style="align-items:center;">\
						<span class="list-badge-text ml-2" style="font-size: 13px;">'+val.nick_name+'</span>\
						<span class="list-badge-text ml-2" style="font-size: 13px;align-items: center;">'+transferTime(regdate)+'</span>\
						<span class="list-badge-text ml-2" style="font-size: 13px;align-items: center;"><span class="fas fa-thumbs-up"></span> '+val.voted_count+'</span>';
						if(val.comment_count!= null && parseInt(val.comment_count) > 0) {
							bodyStr = bodyStr+'<span class="list-badge-text ml-2" style="font-size: 13px;align-items: center;"><span class="fas fa-comments"></span> '+val.comment_count+'</span>';
						}
						bodyStr = bodyStr+'</p> \
						</div>\
						</a>';
				 });


			}
			
			$(targetId).html(bodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function getStreamerRanking(pageNumber, pageLimit, searchKeyword, platformSelected, categorySelected, countrySelected, rankSelected, liveSelected) {

	var targetId = '#main-streamer-ranking-tbody'; 
	var targetPaginationId = '#main-streamer-ranking-pagination';

	var targetStr = '<tr class="board-list-tr">\
		<td class="align-middle text-center mt-3 mb-3" colspan="8"> <div class="loader"></div> </td>\
		</tr>';
	$(targetId).html(targetStr);

	if(searchKeyword == 'undefined') {
		searchKeyword = '';
	}
	if(platformSelected == 'undefined') {
		platformSelected = '';
	}
	if(categorySelected == 'undefined') {
		categorySelected = '';
	}
	if(countrySelected == 'undefined') {
		countrySelected = '';
	}
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			searchKeyword : searchKeyword,
			platformSelected : platformSelected,
			categorySelected : categorySelected,
			countrySelected : countrySelected,
			rankSelected : rankSelected,
			liveSelected : liveSelected
			},
		url: 'process/streamer_ranking_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
// 				alert('test');
				$(targetId).html('');
				$(targetPaginationId).html('');
				var rankingTbodyStr = "";
				var paginationStr = "";
			if(data == 'empty') {
				rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr">';
				rankingTbodyStr = rankingTbodyStr+'<td class="align-middle" colspan="8"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				rankingTbodyStr = rankingTbodyStr+'</tr>';
				
			} else {

				var totalCount = data.totalCount;

				var favoriteStr = new String(data.favoriteStr);
				var favoriteArray = new Array();
				if(favoriteStr != '' && favoriteStr.length>0) {
					 var favoriteArray = favoriteStr.split(';');
				 }

				if(!isLogged) {
					var favoriteCookieName = 'tos_favorite_streamer';
					favoriteStr = getCookie(favoriteCookieName);

					if(favoriteStr != null) { 
						favoriteArray = favoriteStr.split(',');
					}
				}

				 var localRankNum = pageNumber*pageLimit +1;

				 $.each(data.infoArray, function(key, val) {

					 var favoriteBtnStyle = 'btn-outline-warning';
					 if(favoriteArray.indexOf(val.streamer_id) != -1) {
						 favoriteBtnStyle = 'btn-warning';
					 }

					 var iconUrlSm = val.icon_url_sm;

					 rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr align-middle" style="font-size: 14px;border-bottom: 0px solid #aaaaaa;">';
// 					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle"> '+val.rank+' </td>';
					 if(searchKeyword != null && searchKeyword != 'undifined' && searchKeyword.length > 1) {
						 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" style="font-weight: bold;"> '+val.rank+' </td>';
					 } else {
						 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" style="font-weight: bold;"> '+localRankNum+' </td>';
					 }
					 
					 rankingTbodyStr = rankingTbodyStr+'<td class="d-none d-md-table-cell">';

					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }

					 var platformName = val.platform;
					 if(val.platform == 'YOUTUBE') {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.platform == 'TWITCH') {
						 platformName = STRING_TWITCH;
					 } 
					 
					 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-subtle badge-warning ml-1">NEW</span>';
					 }
// 					 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 rankingTbodyStr = rankingTbodyStr+'</td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�붾줈��"> '+numberWithCommas(val.follower_count)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="酉곗뭅�댄듃"> '+numberWithCommasWithK(val.view_count)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�곸긽 ��"> '+numberWithCommas(val.media_count)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�뚮옯��"> '+platformName+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" style="max-width:50px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" data-th="遺꾨쪟"> '+convertCategoryName(val.category)+' </td>';

					 
					// sm,xs �� td
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 rankingTbodyStr = rankingTbodyStr+'<div >';
					 rankingTbodyStr = rankingTbodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">'+localRankNum+'. ';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-subtle badge-warning ml-1">N</span>';
					 }
					 rankingTbodyStr = rankingTbodyStr+'</p>';
					 rankingTbodyStr = rankingTbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 rankingTbodyStr = rankingTbodyStr+'<span style="font-size: 12px;"> '+STRING_STREAMER_RANKING_FOLLOWER+' '+numberWithCommasWithK(val.follower_count)+' | '+platformName+' | '+STRING_STREAMER_RANKING_VIDEO+' '+numberWithCommas(val.media_count)+'</span>';
					 rankingTbodyStr = rankingTbodyStr+'</p>';
					 rankingTbodyStr = rankingTbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 rankingTbodyStr = rankingTbodyStr+'<span style="font-size: 12px;"> '+STRING_STREAMER_RANKING_VIEWCOUNT+' '+numberWithCommasWithK(val.view_count)+' | '+convertCategoryName(val.category)+' </span>';
					 rankingTbodyStr = rankingTbodyStr+'</p>';
					 rankingTbodyStr = rankingTbodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle" id="favorite-streamer-id-'+val.streamer_id+'">';
					 rankingTbodyStr = rankingTbodyStr+'<a href="javascript:registFavorite('+val.streamer_id+',\'streamer\')" class="btn btn-sm '+favoriteBtnStyle+'">';
					 rankingTbodyStr = rankingTbodyStr+'<i class="far fa-star"></i>';
					 rankingTbodyStr = rankingTbodyStr+'</a>';
					 rankingTbodyStr = rankingTbodyStr+'</td>';
					 
					 rankingTbodyStr = rankingTbodyStr+'</tr>';

					 localRankNum = localRankNum+1;
				 });


				 var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerRanking('+(pageNumber-1)+', '+pageLimit+', \''+searchKeyword+'\',\''+platformSelected+'\', \''+categorySelected+'\', \''+countrySelected+'\', \''+rankSelected+'\', \''+liveSelected+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">1</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerRanking(0, '+pageLimit+', \''+searchKeyword+'\',\''+platformSelected+'\', \''+categorySelected+'\', \''+countrySelected+'\', \''+rankSelected+'\', \''+liveSelected+'\')">1</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerRanking('+(page)+', '+pageLimit+', \''+searchKeyword+'\',\''+platformSelected+'\', \''+categorySelected+'\', \''+countrySelected+'\', \''+rankSelected+'\', \''+liveSelected+'\')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerRanking('+(page)+', '+pageLimit+', \''+searchKeyword+'\',\''+platformSelected+'\', \''+categorySelected+'\', \''+countrySelected+'\', \''+rankSelected+'\', \''+liveSelected+'\')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(totalPageCount)+'</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerRanking('+(totalPageCount-1)+', '+pageLimit+', \''+searchKeyword+'\',\''+platformSelected+'\', \''+categorySelected+'\', \''+countrySelected+'\', \''+rankSelected+'\', \''+liveSelected+'\')">'+(totalPageCount)+'</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerRanking('+(pageNumber+1)+', '+pageLimit+', \''+searchKeyword+'\',\''+platformSelected+'\', \''+categorySelected+'\', \''+countrySelected+'\', \''+rankSelected+'\', \''+liveSelected+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 $(targetPaginationId).html(paginationStr);
				
			}
			
			$(targetId).html(rankingTbodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}
function getStreamerRankingSearch() {

	var selectedPlatform = $('#select-platform option:selected').val();
	var selectedCategory = $('#select-category option:selected').val();
	var selectedCountry = $('#select-country option:selected').val();
	var searchKeyword = $('#search_keyword').val();
	if(searchKeyword.length > 1) {
		getStreamerRanking(0, 50, searchKeyword, selectedPlatform, selectedCategory, selectedCountry);	
		
	} else {
		alert(STRING_ALERT_SEARCH_MIN_LENGTH);
	}
	
}

function getStreamerSoar(pageNumber, pageLimit, platformSelected, categorySelected, countrySelected) {

	var targetId = '#main-streamer-soar-tbody';
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			platformSelected : platformSelected,
			categorySelected : categorySelected,
			countrySelected : countrySelected
			},
		url: 'process/streamer_soar_get.php',
		dataType: 'json',
		success:function(data) {
			
// 				console.log(data);
// 				alert('test');
				$(targetId).html('');
				var tbodyStr = "";
			if(data == 'empty') {
				tbodyStr = tbodyStr+'<tr class="board-list-tr">';
				tbodyStr = tbodyStr+'<td class="align-middle" colspan="8"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				tbodyStr = tbodyStr+'</tr>';
				
			} else {

				var favoriteStr = new String(data.favoriteStr);
				var favoriteArray = new Array();
				if(favoriteStr != '' && favoriteStr.length>0) {
					 var favoriteArray = favoriteStr.split(';');
				 }

				if(!isLogged) {
					var favoriteCookieName = 'tos_favorite_streamer';
					favoriteStr = getCookie(favoriteCookieName);

					if(favoriteStr != null) { 
						favoriteArray = favoriteStr.split(',');
					}
				}

				var localRankNum = pageNumber*pageLimit +1;

				 $.each(data.infoArray, function(key, val) {

					 var favoriteBtnStyle = 'btn-outline-warning';
					 if(favoriteArray.indexOf(val.streamer_id) != -1) {
						 favoriteBtnStyle = 'btn-warning';
					 }

					 var iconUrlSm = val.icon_url_sm;

					 var platformName = val.platform;
					 if(val.platform == 'YOUTUBE') {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.platform == 'TWITCH') {
						 platformName = STRING_TWITCH;
					 } 

					 tbodyStr = tbodyStr+'<tr class="board-list-tr" style="font-size: 14px;">';
// 					 tbodyStr = tbodyStr+'<td class="align-middle"> '+val.rownum+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" style="font-weight: bold;"> '+localRankNum+' </td>';
					 tbodyStr = tbodyStr+'<td class="d-none d-md-table-cell">';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 tbodyStr = tbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 tbodyStr = tbodyStr+'<span class="badge badge-subtle badge-warning ml-1">NEW</span>';
					 }
					 tbodyStr = tbodyStr+'</td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�붾줈��"> '+numberWithCommas(val.follower_count)+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="酉곗뭅�댄듃"> '+numberWithCommasWithK(val.view_count)+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�곸긽 ��"> '+numberWithCommas(val.media_count)+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�뚮옯��"> '+platformName+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" style="max-width:50px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" data-th="遺꾨쪟"> '+convertCategoryName(val.category)+' </td>';
					

					// sm,xs �� td
					 tbodyStr = tbodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 tbodyStr = tbodyStr+'<div >';
					 tbodyStr = tbodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">'+localRankNum+'. ';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 tbodyStr = tbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 tbodyStr = tbodyStr+'<span class="badge badge-subtle badge-warning ml-1">N</span>';
					 }
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 tbodyStr = tbodyStr+'<span style="font-size: 12px;"> '+STRING_STREAMER_RANKING_FOLLOWER+' '+numberWithCommasWithK(val.follower_count)+' | '+platformName+' | '+STRING_STREAMER_RANKING_VIDEO+' '+numberWithCommas(val.media_count)+'</span>';
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 tbodyStr = tbodyStr+'<span style="font-size: 12px;"> '+STRING_STREAMER_RANKING_VIEWCOUNT+' '+numberWithCommasWithK(val.view_count)+' | '+convertCategoryName(val.category)+' </span>';
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 tbodyStr = tbodyStr+'<td class="align-middle" id="favorite-streamer-id-'+val.streamer_id+'">';
					 tbodyStr = tbodyStr+'<a href="javascript:registFavorite('+val.streamer_id+',\'streamer\')" class="btn btn-sm '+favoriteBtnStyle+'">';
					 tbodyStr = tbodyStr+'<i class="far fa-star"></i>';
					 tbodyStr = tbodyStr+'</a>';
					 tbodyStr = tbodyStr+'</td>';
					 
					 tbodyStr = tbodyStr+'</tr>';

					 localRankNum = localRankNum+1;

				 });
				
			}
			
			$(targetId).html(tbodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function viewRankChart(streamer_id) {

	$.ajax({
			type : 'post',
			data : {
				streamer_id : streamer_id
			},
			url: 'process/streamer_chart_stats_get.php',
			dataType: 'json',
			success:function(data) {

//				console.log(data);
//				console.log(data.dateArray);
				if(data == 'failed') {
				} else {


// 					var incomeChart = new Chart(ctx, 
// 							{
// 						"type":"line",
// 						"data":{
// 							"labels":["January","February","March","April","May","June","July"],
// 							"datasets":[{"label":"�쒖쐞",
// 								"data":[65,59,80,81,56,55,40],
// 								"fill":false,
// 								"borderColor":"rgba(255,99,132,1)",
// 								"lineTension":0.2
// 								}]
// 								},
// 							"options":{scales: {
// 							    yAxes: [{
// 							        ticks: {
// 							          reverse: true,
// 							        }
// 							      }]
// 							    }
// 							    }
// 							}
// 					);

					var dateArray = data.dateArray;
					var rankChartArray = data.rankChartArray;
					var followerChartArray = data.followerChartArray;

					var ctx = document.getElementById("chart-rank").getContext('2d');
					var rankChart = new Chart(ctx, 
							{
						"type":"line",
						"data":{
							"labels":dateArray,
							"datasets":[{
								"label":STRING_CHART_LABEL_RANK,
								"data":rankChartArray,
								"fill":false,
								"borderColor":"rgba(255,99,132,1)",
								"lineTension":0.2
								}]
								},
							"options":{
								scales: {
							        yAxes: [{
				                        ticks: {
				                        	reverse: true,
				                        }
							        }]
									}
								}
							} 
					);



// 					var ctx2 = document.getElementById("demoChart2").getContext('2d');
// 					var incomeChart = new Chart(ctx2, 
// 							{
// 						"type":"line",
// 						"data":{
// 							"labels":["January","February","March","April","May","June","July"],
// 							"datasets":[{"label":"�붾줈��",
// 								"data":[65,59,80,81,56,55,95],
// 								"fill":false,
// 								"borderColor":"rgb(118, 190, 217)",
// 								"lineTension":0.2
// 								}]
// 								},
// 							"options":{}
// 							}
// 					);
					
					var ctxVisitor = document.getElementById("chart-follower").getContext('2d');
					var followerChart = new Chart(ctxVisitor, 
							{
						"type":"line",
						"data":{
							"labels":dateArray,
							"yAxisID":STRING_CHART_FOLLOWER_Y_AXISID,
							"datasets":[{"label":STRING_CHART_LABEL_FOLLOWER,
								"data":followerChartArray,
								"fill":false,
								"borderColor":"rgb(118, 190, 217)",
								"lineTension":0.2
								}]
								},
							"options":{
								scales: {
							        yAxes: [{
				                        ticks: {
				                            callback: function(value, index, values) {
				                            	return numberWithCommasWithK(value);
				                            }
				                        }
							        }]
									}
								}
							}
					);
				} 
			},
			error:function(data) {
				alert(STRING_ALERT_FAILED_TO_LOAD_CHART);
			},
			complete:function() {
			}
		
			});
	
	
}

function likePanpageDocument(streamer_id) {

	var targetIdDocumentLikeCount = '#panpage-document-like-count-'+streamer_id;
	var currentLikeCount = $(targetIdDocumentLikeCount).html();
	$.ajax({
		type : 'post',
		data: {
			streamer_id : streamer_id,
			},
		url: 'process/streamer_pan_page_document_vote.php',
		dataType: 'json',
		success:function(data) {
//			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_LIKE_COMMENT_RETRY);
				return;
			}
			else if(data == 'success') {
// 				$('#comment-content-'+comment_srl).html(commentContent);
				$(targetIdDocumentLikeCount).html(parseInt(currentLikeCount)+1);

				var targetIdDocumentLikeButton = '#panpage-document-like-button';
				var documentLikeButtonStr = '';
				documentLikeButtonStr = documentLikeButtonStr + '<button type="button" class="btn btn-reset" style="color:#346cb0" onclick="alert(\''+STRING_ALERT_ALREADY_VOTEUP_DOCUMENT+'\')">';
				documentLikeButtonStr = documentLikeButtonStr + '<i class="fa fa-fw fa-thumbs-up"></i> '+STRING_LIKE+'</button>';
				$(targetIdDocumentLikeButton).html(documentLikeButtonStr);
				return;
			} else {
				alert(data[0].message);
			}
			
		},
		error:function(data) {
		},
		complete:function() {
		}
	
		});
}

function getMainStreamerDetailBoard(streamer_id) {
	$.ajax({
		type : 'post',
		data: {
			streamer_id : streamer_id,
			},
		url: 'process/streamer_info_get.php',
		dataType: 'json',
		success:function(data) {
			if(data == 'empty') {
// 				rankingTbodyStr = "<center>�곗씠�곌� �놁뒿�덈떎.</center>";
			} else {

				 $.each(data.infoArray, function(key, val) {

					 $('#breadcrumb-streamer-detail').html('<a href="streamer_detail.php?sid='+streamer_id+'">'+val.name+' '+STRING_PAGE+' </a>');
					 $('#breadcrumb-streamer-detail-board').html(val.name+' '+STRING_STREAMER_DETAIL_BREADCRUMB_LATEST_VIDEO);

				 });
				
			}
			
// 			$('#main-streamer-ranking-tbody').html(rankingTbodyStr);
			
		},
		error:function(data) {
			console.log(STRING_ALERT_FAIL_GET_STREAMER_INFO);
		},
		complete:function() {
		}
	
		});
}

function getMainStreamerFeedsBoardBest(pageNumber, pageLimit, conditionPeriod, region) {

	var targetId = '#main-streamer-feeds-tbody';
	var targetPaginationId = '#main-streamer-feeds-pagination';

	var targetStr = '<tr class="board-list-tr">\
		<td class="align-middle text-center mt-3 mb-3" colspan="7"> <div class="loader"></div> </td>\
		</tr>';
	$(targetId).html(targetStr);

	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			conditionPeriod : conditionPeriod,
			region : region
			},
		url: 'process/streamer_feeds_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);

				$(targetId).html('');
				$(targetPaginationId).html('');
				var bodyStr = "";
				var paginationStr = "";
				
			if(data == 'empty') {
				bodyStr = bodyStr+'<tr class="board-list-tr">';
				bodyStr = bodyStr+'<td class="align-middle" colspan="6"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				bodyStr = bodyStr+'</tr>';
			} else {

				var totalCount = data.totalCount;

				var favoriteStr = new String(data.favoriteStr);
				var favoriteArray = new Array();
				if(favoriteStr != '' && favoriteStr.length>0) {
					 var favoriteArray = favoriteStr.split(';');
				 }

				if(!isLogged) {
					var favoriteCookieName = 'tos_favorite_media';
					favoriteStr = getCookie(favoriteCookieName);

					if(favoriteStr != null) { 
						favoriteArray = favoriteStr.split(',');
					}
				}

				 $.each(data.infoArray, function(key, val) {

					 var favoriteBtnStyle = 'btn-outline-warning';
					 if(favoriteArray.indexOf(val.document_srl) != -1) {
						 favoriteBtnStyle = 'btn-warning';
					 }

					 var platformName = "";
					 if(val.media_url.indexOf('youtu') != -1 || val.media_url.indexOf('youtube') != -1) {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.media_url.indexOf('twitch') != -1) {
						 platformName = STRING_TWITCH;
					 }

					 var settingDate = new Date();
					 settingDate.setDate(settingDate.getDate()-1);
					 var prevDate = settingDate.toISOString().slice(0,19).replace(/-/gi, "").replace(/T/gi, "").replace(/:/gi, "");
					 

// 					 bodyStr = bodyStr+'<a href="'+val.media_url+'" class="list-group-item list-group-item-action" target="_blank">';
// 					 bodyStr = bodyStr+'<div class="list-group-item-figure rounded-left">';
// 					 bodyStr = bodyStr+'<img src="'+val.thumbnail_url+'" alt="placeholder image"> </div>';
// 					 bodyStr = bodyStr+'<div class="list-group-item-body">';
// 					 bodyStr = bodyStr+'<h4 class="list-group-item-title main-list-group-media-body-title"> '+val.title+' </h4>';
// 					 bodyStr = bodyStr+'<p class="list-group-item-text main-list-group-media-body-text"> '+val.streamer_name+' <span class="badge badge-subtle badge-dark" style="font-size: 0.8em;"> '+platformName+' </span> </p>';
// 					 bodyStr = bodyStr+'</div>';
// 					 bodyStr = bodyStr+'</a>';


					 bodyStr = bodyStr+'<tr class="board-list-tr" style="font-size: 14px;">';
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell"> '+val.document_srl+' </td>';
					 bodyStr = bodyStr+'<td class="d-none d-md-table-cell" style="overflow: hidden;text-overflow: ellipsis;">';
					 bodyStr = bodyStr+'<a href="'+val.media_url+'" class="tile tile-img mr-1" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+');">';
					 bodyStr = bodyStr+'<img class="img-fluid" src="'+val.thumbnail_url+'" alt="Card image cap">';
					 bodyStr = bodyStr+'</a>';
					 bodyStr = bodyStr+'<a href="'+val.media_url+'" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+');">'+val.title+'</a>';
					 if(val.reg_date >= prevDate) {
						 bodyStr = bodyStr+'<span class="badge badge-subtle badge-warning ml-1">NEW</span>';
					 }
					 bodyStr = bodyStr+'</td>';
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�ㅽ듃由щ㉧"><a href="streamer_detail.php?sid='+val.streamer_id+'"> '+val.streamer_name+' </a></td>';
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�뚮옯��"> '+platformName+' </td>';
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="議고쉶"> '+val.readed_count+' </td>';
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�좎쭨"> '+val.reg_date.substr(0,4)+'.'+val.reg_date.substr(4,2)+'.'+val.reg_date.substr(6,2)+' </td>';


					// sm,xs �� td
					 bodyStr = bodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 bodyStr = bodyStr+'<div >';
					 bodyStr = bodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">';
					 bodyStr = bodyStr+'<a href="'+val.media_url+'" class="tile tile-img mr-1" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+');">';
					 bodyStr = bodyStr+'<img class="img-fluid" src="'+val.thumbnail_url+'" alt="Card image cap">';
					 bodyStr = bodyStr+'</a>';
					 bodyStr = bodyStr+'<a href="'+val.media_url+'" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+');">'+val.title+'</a>';
					 if(val.reg_date >= prevDate) {
						 bodyStr = bodyStr+'<span class="badge badge-subtle badge-warning ml-1">N</span>';
					 }
					 bodyStr = bodyStr+'</p>';
					 bodyStr = bodyStr+'<p class="text-muted row mb-1 ml-1" style="align-items:center;">';						
					 bodyStr = bodyStr+'<span style="font-size: 12px;"> <a href="streamer_detail.php?sid='+val.streamer_id+'"> '+val.streamer_name+' </a> | '+platformName+' | '+STRING_READED+' '+val.readed_count+' | '+val.reg_date.substr(0,4)+'.'+val.reg_date.substr(4,2)+'.'+val.reg_date.substr(6,2)+'</span>';
					 bodyStr = bodyStr+'</p>';
					 bodyStr = bodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 
					 bodyStr = bodyStr+'<td class="align-middle" id="favorite-media-id-'+val.document_srl+'">';
					 bodyStr = bodyStr+'<a href="javascript:registFavorite('+val.document_srl+',\'media\')" class="btn btn-sm '+favoriteBtnStyle+'">';
					 bodyStr = bodyStr+'<i class="far fa-star"></i>';
					 bodyStr = bodyStr+'</a>';
					 bodyStr = bodyStr+'</td>';
					 
					 bodyStr = bodyStr+'</tr>';
				 });


// 				 var totalPageCount = Math.ceil(totalCount / pageLimit);

// 				 if(pageNumber > 0) {
// 					 paginationStr = paginationStr+'<li class="page-item">';
// 				 } else {
// 					 paginationStr = paginationStr+'<li class="page-item disabled">';
// 				 }
// 				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeedsBoardBest('+(pageNumber-1)+', '+pageLimit+', \''+conditionPeriod+'\')">';
// 				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
// 				 paginationStr = paginationStr+'</a>';
// 				 paginationStr = paginationStr+'</li>';

// 				 // page first
// 				 if(0 == pageNumber) {
// 					 paginationStr = paginationStr+'<li class="page-item active">';
// 					 paginationStr = paginationStr+'<a class="page-link" onclick="">1</a>';
// 				 } else {
// 					 paginationStr = paginationStr+'<li class="page-item">';
// 					 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeedsBoardBest(0, '+pageLimit+', \''+conditionPeriod+'\')">1</a>';
// 				 }
// 				 paginationStr = paginationStr+'</li>';

// 				 if(totalPageCount <= 5) {
					 
// 					 for(var page=1;page<totalPageCount-1;page++) {
// 						 if(page == pageNumber) {
// 							 paginationStr = paginationStr+'<li class="page-item active">';
// 							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
// 						 } else {
// 							 paginationStr = paginationStr+'<li class="page-item">';
// 							 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeedsBoardBest('+(page)+', '+pageLimit+', \''+conditionPeriod+'\')">'+(page+1)+'</a>';
// 						 }
// 						 paginationStr = paginationStr+'</li>';
// 					 }


// 				 } else {

// 					 paginationStr = paginationStr+'<li class="page-item disabled">';
// 					 paginationStr = paginationStr+'<a class="page-link">...</a>';
// 					 paginationStr = paginationStr+'</li>';

// 					 var startInPage = 1;
// 					 var endInPage = 4;

// 					 if(pageNumber < 3) {
// 						 startInPage = 1;
// 						 endInPage = 3;
// 					 }
// 					 else if(pageNumber > totalPageCount-1-2) {
// 						 startInPage = totalPageCount-1-3;
// 						 endInPage = totalPageCount-1-1;
// 					 } else {
// 						 startInPage = pageNumber-1;
// 						 endInPage = pageNumber+1;
// 					 }
					 
// 					 for(var page=startInPage;page<=endInPage;page++) {
// 						 if(page < 1 || page == totalPageCount-1) {
// 							 continue;
// 						 }
// 						 if(page == pageNumber) {
// 							 paginationStr = paginationStr+'<li class="page-item active">';
// 							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
// 						 } else {
// 							 paginationStr = paginationStr+'<li class="page-item">';
// 							 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeedsBoardBest('+(page)+', '+pageLimit+', \''+conditionPeriod+'\')">'+(page+1)+'</a>';
// 						 }
// 						 paginationStr = paginationStr+'</li>';
						
// 					 }

// 					 paginationStr = paginationStr+'<li class="page-item disabled">';
// 					 paginationStr = paginationStr+'<a class="page-link">...</a>';
// 					 paginationStr = paginationStr+'</li>';

					 
// 				 }


// 				// page last
// 				if(totalPageCount>1) {
// 				 if(totalPageCount-1 == pageNumber) {
// 					 paginationStr = paginationStr+'<li class="page-item active">';
// 					 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(totalPageCount)+'</a>';
// 				 } else {
// 					 paginationStr = paginationStr+'<li class="page-item">';
// 					 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeedsBoardBest('+(totalPageCount-1)+', '+pageLimit+', \''+conditionPeriod+'\')">'+(totalPageCount)+'</a>';
// 				 }
// 				 paginationStr = paginationStr+'</li>';
// 				}
				 

// 				 if(pageNumber < totalPageCount-1) {
// 					 paginationStr = paginationStr+'<li class="page-item">';
// 				 } else {
// 					 paginationStr = paginationStr+'<li class="page-item disabled">';
// 				 }
// 				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainStreamerFeedsBoardBest('+(pageNumber+1)+', '+pageLimit+', \''+conditionPeriod+'\')">';
// 				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
// 				 paginationStr = paginationStr+'</a>';
// 				 paginationStr = paginationStr+'</li>';

// 				 $(targetPaginationId).html(paginationStr);

			}
			
			$(targetId).html(bodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function getDocumentContentOnly(docSrl) {


	$.ajax({
		type : 'post',
		data: {
			docSrl : docSrl,
			isUpdate : 'Y'
			},
		url: 'process/document_content_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);

			
			if(data == 'empty-page') {
// 				alert('由ъ뒪�멸� �놁뒿�덈떎.');
// 				rankingTbodyStr = "<center>�곗씠�곌� �놁뒿�덈떎.</center>";
			} else {

				if(memberSrl != data.member_srl) {
					window.location.href='board_content.php?mid='+global_mid+'&doc='+global_docSrl;
				}

				$('#document_title').val(data.title);

// 				var htmlEntityDecodeContent = $('<textarea />').html(data.content).text();
				var htmlEntityDecodeContent = data.content;
// 				CKEDITOR.instances.writeEditor.focus();
				global_editor.focus();
				setTimeout(function(){
// 					CKEDITOR.instances["writeEditor"].setData(htmlEntityDecodeContent);
					global_editor.setData(htmlEntityDecodeContent);
					$.each(data.infoArray, function(key, val) {
						var targetIdExtra = '#'+val.eid;

						if(val.eid == 'uploaded_file_url') {
							if(val.value != null && val.value != 'undefined' && val.value.length>0) {
								global_attach_file_array = val.value.split(';');
							}
						}

						if(val.eid=='with_streamer') {
							global_with_streamer_array = val.value.split(';@;');

							var withStreamerValue = '';

							for(var count=0;count<global_with_streamer_array.length;count++) {
								var eachArray = global_with_streamer_array[count].split('/@/');
								var eachStreamerId = eachArray[0];
								var eachStreamerName = eachArray[1];

								withStreamerValue = withStreamerValue+'['+eachStreamerName+'];';
							}
							
							$(targetIdExtra).val(withStreamerValue);
						} else {
							$(targetIdExtra).val(val.value);
						}
						
					});
					}, 300);
				
// 				$('#writeEditor').val('the text I want to insert');
			}
			
			
		},
		error:function(data) {
			console.log(STRING_LOG_FAILED_GET_DOCUMENT_INFO);
		},
		complete:function() {
		}
	
		});
}
function updateDocument(docSrl) {

	if(docSrl == 'undefined' || docSrl == '') {
		alert(STRING_ALERT_INVALID_DOCUMENT_ID);
    	return;
	}

	if(global_Processing) {
		return;
	}

	var title = $('#document_title').val();
// 	var content = editor.getText();
// 	var contentLength = editor.getLength();
// var content = editor.container.firstChild.innerHTML;
var content = CKEDITOR.instances.writeEditor.getData();
var contentLength = content.length;

	var nick_name = global_nick_name;

	if(title == '' || title.length < 2) {
    	alert(STRING_ALERT_REGIST_CONFIRM_MODAL_TITLE_MIN_LENGTH);
    	return;
    }
	if(content == '' || content.length < 10) {
		alert(STRING_ALERT_REGIST_CONFIRM_MODAL_CONTENT_MIN_LENGTH);
		return;
	}
	if(contentLength > 5000) {
		alert(STRING_ALERT_REGIST_CONFIRM_MODAL_CONTENT_MAX_LENGTH+contentLength);
		return;
	}

	var extra_values_array = [];
	if(global_extra_array.length > 0) {

		for(var i=0;i<global_extra_array.length;i++) {
			var eachExtraArray = global_extra_array[i].split(';');
			var eachExtraName = eachExtraArray[0];
			var eachExtraEid = eachExtraArray[1];
			var eachExtraIsRequired = eachExtraArray[2];
			var eachExtraIdx = eachExtraArray[3];
			var eachExtraType = eachExtraArray[4];
			var eachExtraValue = $('#'+eachExtraEid).val();

			if(eachExtraEid == 'embed_url') {
				if(eachExtraValue.indexOf('youtu.be/') != -1) {
					var eachExtraValueArray = eachExtraValue.split('youtu.be/');
					eachExtraValueArray = eachExtraValueArray[1].split('/');
					var youtubeId = eachExtraValueArray[0];
					if(youtubeId.indexOf('?') != -1) {
						youtubeId = youtubeId.split('?')[0];
					}
					eachExtraValue = "https://www.youtube.com/embed/"+youtubeId;
				}
				else if(eachExtraValue.indexOf('youtube.com/watch?v=') != -1) {
					var eachExtraValueArray = eachExtraValue.split('youtube.com/watch?v=');
					eachExtraValueArray = eachExtraValueArray[1].split('&');
					var youtubeId = eachExtraValueArray[0];
					if(youtubeId.indexOf('/') != -1) {
						youtubeId = youtubeId.split('/')[0];
					}
					eachExtraValue = "https://www.youtube.com/embed/"+youtubeId;
				}
				else if(eachExtraValue.indexOf('twitch.tv/videos/') != -1) {
					var eachExtraValueArray = eachExtraValue.split('twitch.tv/videos/');
					eachExtraValueArray = eachExtraValueArray[1].split('/');
					var vodId = eachExtraValueArray[0];
					if(vodId.indexOf('?') != -1) {
						vodId = vodId.split('?/')[0];
					}
					eachExtraValue = "https://player.twitch.tv/?video="+vodId+"&autoplay=false";
				}
			}

			if(eachExtraEid == 'with_streamer') {
				eachExtraValue = global_with_streamer_array.join(';@;');
			}

			if(eachExtraEid == 'uploaded_file_url') {
				eachExtraValue = global_attach_file_array.join(';');
			}

			extra_values_array[eachExtraIdx] = eachExtraValue;

			if(eachExtraIsRequired == 'Y') {
				if(eachExtraValue == '' || eachExtraValue.length<2) {
					alert(eachExtraName+STRING_ALERT_REGIST_DOCUMENT_MANDATORY_VALUE);
					return;
				}
			}
			if(eachExtraValue!='' && eachExtraValue.length>1 && eachExtraType == 'homepage') {
				if(eachExtraValue.indexOf('http') == -1) {
					alert(eachExtraName+STRING_ALERT_REGIST_DOCUMENT_INVALID_TYPE);
					return;
				}
			}

			
		}
		
	}


	global_Processing = true;
	$('#waitingModal').modal('show');
	
	$.ajax({
		type : 'post',
		data: {
			docSrl : docSrl,
			title : title,
			content : content,
			extra_values_array : extra_values_array
			},
		url: 'process/document_update.php',
		dataType: 'json',
		success:function(data) {
//			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_FAILED_UPDATE_DOCUMENT);
			}
			else if(data == 'success') {
				global_attach_file_array_added = [];
				window.location.href = 'board_content.php?mid='+global_mid+'&doc='+docSrl;
			} 

		},
		error:function(data) {
		},
		complete:function() {
			setTimeout(function(){
				$('#waitingModal').modal('hide');
				$('#updateConfirmModal').modal('hide');
				global_Processing = false;
				}, 100);
			
		}
		});
}

function likeDocument(docSrl) {

	if(!isLogged) {
		alert(STRING_ALERT_LIKE_COMMENT_AFTER_SIGNIN);
		return;		
	}

	var targetIdDocumentLikeCount = '#document-like-count-'+docSrl;
	var currentLikeCount = $(targetIdDocumentLikeCount).html();
	$.ajax({
		type : 'post',
		data: {
			docSrl : docSrl,
			},
		url: 'process/document_vote.php',
		dataType: 'json',
		success:function(data) {
//			console.log(data);
			if(data == 'failed') {
				alert(STRING_ALERT_LIKE_COMMENT_RETRY);
				return;
			}
			else if(data == 'success') {
// 				$('#comment-content-'+comment_srl).html(commentContent);
				$(targetIdDocumentLikeCount).html(parseInt(currentLikeCount)+1);

				var targetIdDocumentLikeButton = '#document-like-button';
				var documentLikeButtonStr = '';
				documentLikeButtonStr = documentLikeButtonStr + '<button type="button" class="btn btn-reset" style="color:#346cb0" onclick="alert(\''+STRING_ALERT_ALREADY_VOTEUP_DOCUMENT+'\')">';
				documentLikeButtonStr = documentLikeButtonStr + '<i class="fa fa-fw fa-thumbs-up"></i> '+STRING_LIKE+'</button>';
				$(targetIdDocumentLikeButton).html(documentLikeButtonStr);
				return;
			} else {
				alert(data[0].message);
			}
			
		},
		error:function(data) {
		},
		complete:function() {
		}
	
		});
}

function getMainFavoriteStreamer(pageNumber, pageLimit, searchKeyword) {


	var targetId = '#main-favorite-streamer-tbody';
	var targetPaginationId = '#main-favorite-streamer-pagination';

	var targetUrl = 'process/favorite_streamer_get.php';

	searchKeyword = new String(searchKeyword);
	if(searchKeyword == 'undefined') {
		searchKeyword = '';
	}


	var favoriteCookieName = 'tos_favorite_streamer';
	var favoriteStr = getCookie(favoriteCookieName);
	
	if(!isLogged) {
    	if(favoriteStr == null) {
    		var tbodyStr = "";
    		tbodyStr = tbodyStr+'<tr class="board-list-tr mt-3">';
    		tbodyStr = tbodyStr+'<td class="align-middle" colspan="4"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
    		tbodyStr = tbodyStr+'</tr>';
    		$(targetId).html(tbodyStr);
    		return;
    	} else {
    		targetUrl = 'process/favorite_streamer_cookie_get.php';
    	}
	} 

	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			searchKeyword : searchKeyword,
			memberSrl : memberSrl,
			favoriteStr : favoriteStr
			},
		url: targetUrl,
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
				var tbodyStr = "";
				var paginationStr = "";
			if(data == 'empty') {
				tbodyStr = tbodyStr+'<tr class="board-list-tr mt-3">';
				tbodyStr = tbodyStr+'<td class="align-middle" colspan="4"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				tbodyStr = tbodyStr+'</tr>';
			}
			else if(data == 'failed') {
				tbodyStr = tbodyStr+'<tr class="board-list-tr mt-3">';
				tbodyStr = tbodyStr+'<td class="align-middle" colspan="4"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				tbodyStr = tbodyStr+'</tr>';
			} 
			else {

				var totalCount = data.totalCount;

				favoriteStr = new String(data.favoriteStr);
				var favoriteArray = new Array();
				if(favoriteStr != '' && favoriteStr.length>0) {
					 var favoriteArray = favoriteStr.split(';');
				 }

				$.each(data.infoArray, function(key, val) {

					var favoriteBtnStyle = 'btn-outline-warning';
					 if(favoriteArray.indexOf(val.streamer_id) != -1) {
						 favoriteBtnStyle = 'btn-warning';
					 }

					 var iconUrlSm = val.icon_url_sm;

					 var platformName = val.platform;
					 if(val.platform == 'YOUTUBE') {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.platform == 'TWITCH') {
						 platformName = STRING_TWITCH;
					 } 

					 tbodyStr = tbodyStr+'<tr class="board-list-tr" style="font-size: 14px;">';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" style="font-weight: bold;"> '+val.rank+' </td>';
					 tbodyStr = tbodyStr+'<td class="d-none d-md-table-cell">';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 tbodyStr = tbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 tbodyStr = tbodyStr+'<span class="badge badge-subtle badge-warning ml-1">NEW</span>';
					 }
					 tbodyStr = tbodyStr+'</td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�뚮옯��"> '+platformName+' </td>';


					// sm,xs �� td
					 tbodyStr = tbodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 tbodyStr = tbodyStr+'<div >';
					 tbodyStr = tbodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">'+val.rank+'. ';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 tbodyStr = tbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 tbodyStr = tbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 tbodyStr = tbodyStr+'<span class="badge badge-subtle badge-warning ml-1">N</span>';
					 }
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 tbodyStr = tbodyStr+'<span style="font-size: 12px;"> '+STRING_STREAMER_RANKING_FOLLOWER+' '+numberWithCommasWithK(val.follower_count)+' | '+platformName+' </span>';
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 tbodyStr = tbodyStr+'<td class="align-middle" id="favorite-streamer-id-'+val.streamer_id+'">';
					 tbodyStr = tbodyStr+'<a href="javascript:registFavorite('+val.streamer_id+',\'streamer\')" class="btn btn-sm '+favoriteBtnStyle+'">';
					 tbodyStr = tbodyStr+'<i class="far fa-star"></i>';
					 tbodyStr = tbodyStr+'</a>';
					 tbodyStr = tbodyStr+'</td>';
					 
					 tbodyStr = tbodyStr+'</tr>';
				 });


				var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteStreamer('+(pageNumber-1)+', '+pageLimit+', \''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteStreamer(0, '+pageLimit+', \''+searchKeyword+'\')">1</a>';
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
						 }
						 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteStreamer('+(page)+', '+pageLimit+', \''+searchKeyword+'\')">'+(page+1)+'</a>';
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
						 }
						 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteStreamer('+(page)+', '+pageLimit+', \''+searchKeyword+'\')">'+(page+1)+'</a>';
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteStreamer('+(totalPageCount-1)+', '+pageLimit+', \''+searchKeyword+'\')">'+(totalPageCount)+'</a>';
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteStreamer('+(pageNumber+1)+', '+pageLimit+', \''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 $(targetPaginationId).html(paginationStr);
				 
			}
			
			$(targetId).html(tbodyStr);
			
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function getMainFavoriteMedia(pageNumber, pageLimit, searchKeyword) {


	var targetId = '#main-favorite-media-tbody';
	var targetPaginationId = '#main-favorite-media-pagination';

	var targetUrl = 'process/favorite_media_get.php';

	searchKeyword = new String(searchKeyword);
	if(searchKeyword == 'undefined') {
		searchKeyword = '';
	}

	var favoriteCookieName = 'tos_favorite_media';
	var favoriteStr = getCookie(favoriteCookieName);
	
	if(!isLogged) {
    	if(favoriteStr == null) {
    		var tbodyStr = "";
    		tbodyStr = tbodyStr+'<tr class="board-list-tr mt-3">';
    		tbodyStr = tbodyStr+'<td class="align-middle" colspan="3"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
    		tbodyStr = tbodyStr+'</tr>';
    		$(targetId).html(tbodyStr);
    		return;
    	} else {
    		targetUrl = 'process/favorite_media_cookie_get.php';
    	}
	} 
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			searchKeyword : searchKeyword,
			memberSrl : memberSrl,
			favoriteStr : favoriteStr
			},
		url: targetUrl,
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
				var tbodyStr = "";
				var paginationStr = "";
			if(data == 'empty') {
				tbodyStr = tbodyStr+'<tr class="board-list-tr mt-3">';
				tbodyStr = tbodyStr+'<td class="align-middle" colspan="3"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				tbodyStr = tbodyStr+'</tr>';
			} 
			else if(data == 'failed') {
				tbodyStr = tbodyStr+'<tr class="board-list-tr mt-3">';
				tbodyStr = tbodyStr+'<td class="align-middle" colspan="3"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				tbodyStr = tbodyStr+'</tr>';
			} 
			else {

				var totalCount = data.totalCount;

				favoriteStr = new String(data.favoriteStr);
				var favoriteArray = new Array();
				if(favoriteStr != '' && favoriteStr.length>0) {
					 var favoriteArray = favoriteStr.split(';');
				 }

				 $.each(data.infoArray, function(key, val) {

					 var favoriteBtnStyle = 'btn-outline-warning';
					 if(favoriteArray.indexOf(val.document_srl) != -1) {
						 favoriteBtnStyle = 'btn-warning';
					 }

					 var platformName = "";
					 if(val.media_url.indexOf('youtu') != -1 || val.media_url.indexOf('youtube') != -1) {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.media_url.indexOf('twitch') != -1) {
						 platformName = STRING_TWITCH;
					 }

					 var settingDate = new Date();
					 settingDate.setDate(settingDate.getDate()-1);
					 var prevDate = settingDate.toISOString().slice(0,19).replace(/-/gi, "").replace(/T/gi, "").replace(/:/gi, "");
					 

					 tbodyStr = tbodyStr+'<tr class="board-list-tr" style="font-size: 14px;">';
					 tbodyStr = tbodyStr+'<td class="d-none d-md-table-cell">';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" class="tile tile-img mr-1" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+')">';
					 tbodyStr = tbodyStr+'<img class="img-fluid" src="'+val.thumbnail_url+'" alt="Card image cap">';
					 tbodyStr = tbodyStr+'</a>';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+');">'+val.title+'</a>';
					 if(val.reg_date >= prevDate) {
						 tbodyStr = tbodyStr+'<span class="badge badge-subtle badge-warning ml-1">NEW</span>';
					 }
					 tbodyStr = tbodyStr+'</td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�ㅽ듃由щ㉧"><a href="streamer_detail.php?sid='+val.streamer_id+'"> '+val.streamer_name+' </a></td>';
// 					 tbodyStr = tbodyStr+'<td class="align-middle"> '+platformName+' </td>';

					 // sm,xs �� td
					 tbodyStr = tbodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 tbodyStr = tbodyStr+'<div >';
					 tbodyStr = tbodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" class="tile tile-img mr-1" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+')">';
					 tbodyStr = tbodyStr+'<img class="img-fluid" src="'+val.thumbnail_url+'" alt="Card image cap">';
					 tbodyStr = tbodyStr+'</a>';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+');">'+val.title+'</a>';
					 if(val.reg_date >= prevDate) {
						 tbodyStr = tbodyStr+'<span class="badge badge-subtle badge-warning ml-1">N</span>';
					 }
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 tbodyStr = tbodyStr+'<span style="font-size: 12px;"> <a href="streamer_detail.php?sid='+val.streamer_id+'"> '+val.streamer_name+' </a> | '+platformName+' | '+val.reg_date.substr(0,4)+'.'+val.reg_date.substr(4,2)+'.'+val.reg_date.substr(6,2)+'</span>';
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'</div> </td>';
					 // sm,xs �� td ��

					 tbodyStr = tbodyStr+'<td class="align-middle" id="favorite-media-id-'+val.document_srl+'">';
					 tbodyStr = tbodyStr+'<a href="javascript:registFavorite('+val.document_srl+',\'media\')" class="btn btn-sm '+favoriteBtnStyle+'">';
					 tbodyStr = tbodyStr+'<i class="far fa-star"></i>';
					 tbodyStr = tbodyStr+'</a>';
					 tbodyStr = tbodyStr+'</td>';
					 tbodyStr = tbodyStr+'</tr>';
				 });


				var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteMedia('+(pageNumber-1)+', '+pageLimit+', \''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteMedia(0, '+pageLimit+', \''+searchKeyword+'\')">1</a>';
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
						 }
						 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteMedia('+(page)+', '+pageLimit+', \''+searchKeyword+'\')">'+(page+1)+'</a>';
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
						 }
						 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteMedia('+(page)+', '+pageLimit+', \''+searchKeyword+'\')">'+(page+1)+'</a>';
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteMedia('+(totalPageCount-1)+', '+pageLimit+', \''+searchKeyword+'\')">'+(totalPageCount)+'</a>';
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainFavoriteMedia('+(pageNumber+1)+', '+pageLimit+', \''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 $(targetPaginationId).html(paginationStr);
				 
			}
			
			$(targetId).html(tbodyStr);
			
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}


function getMainViewLog(pageNumber, pageLimit) {


	var targetId = '#main-view-log-tbody';
	var targetPaginationId = '#main-view-log-pagination';

	var targetStr = '<tr class="board-list-tr">\
		<td class="align-middle text-center mt-3 mb-3" colspan="5"> <div class="loader"></div> </td>\
		</tr>';
	$(targetId).html(targetStr);

	var targetUrl = 'process/view_log_cookie_get.php';


	var targetCookieName = 'tos_view_log';
	var targetCookieStr = getCookie(targetCookieName);
	
    	if(targetCookieStr == null || targetCookieStr == '') {
    		var tbodyStr = "";
    		tbodyStr = tbodyStr+'<tr class="board-list-tr mt-3">';
    		tbodyStr = tbodyStr+'<td class="align-middle" colspan="5"> <h4 class="text-center">'+STRING_NO_VIEWLOG+'</h4> </td>';
    		tbodyStr = tbodyStr+'</tr>';
    		$(targetId).html(tbodyStr);
    		return;
    	}


	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			targetCookieStr : targetCookieStr
			},
		url: targetUrl,
		dataType: 'json',
		success:function(data) {

//			console.log(data);
			
				var tbodyStr = "";
				var paginationStr = "";
			if(data == 'empty') {
				tbodyStr = tbodyStr+'<tr class="board-list-tr mt-3">';
				tbodyStr = tbodyStr+'<td class="align-middle" colspan="6"> <h4 class="text-center">'+STRING_NO_VIEWLOG+'</h4> </td>';
				tbodyStr = tbodyStr+'</tr>';
			} 
			else if(data == 'failed') {
				tbodyStr = tbodyStr+'<tr class="board-list-tr mt-3">';
				tbodyStr = tbodyStr+'<td class="align-middle" colspan="6"> <h4 class="text-center">'+STRING_NO_VIEWLOG+'</h4> </td>';
				tbodyStr = tbodyStr+'</tr>';
			} 
			else {

				var totalCount = data.totalCount;

// 				var favoriteStr = new String(data.favoriteStr);
// 				var favoriteArray = new Array();
// 				if(favoriteStr != '' && favoriteStr.length>0) {
// 					 var favoriteArray = favoriteStr.split(';');
// 				 }

				 $.each(data.infoArray, function(key, val) {

// 					 var favoriteBtnStyle = 'btn-outline-warning';
// 					 if(favoriteArray.indexOf(val.document_srl) != -1) {
// 						 favoriteBtnStyle = 'btn-warning';
// 					 }

					 var platformName = "";
					 if(val.media_url.indexOf('youtu') != -1 || val.media_url.indexOf('youtube') != -1) {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.media_url.indexOf('twitch') != -1) {
						 platformName = STRING_TWITCH;
					 }


					 tbodyStr = tbodyStr+'<tr class="board-list-tr" style="font-size: 14px;">';
					 tbodyStr = tbodyStr+'<td class="d-none d-md-table-cell" style="word-break:break-all;">';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" class="tile tile-img mr-1" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+')">';
					 tbodyStr = tbodyStr+'<img class="img-fluid" src="'+val.thumbnail_url+'" alt="Card image cap">';
					 tbodyStr = tbodyStr+'</a>';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+');">'+val.title+'</a>';
					 tbodyStr = tbodyStr+'</td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�ㅽ듃由щ㉧"><a href="streamer_detail.php?sid='+val.streamer_id+'"> '+val.streamer_name+' </a></td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�뚮옯��"> '+platformName+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="議고쉶"> '+val.readed_count+' </td>';
					 tbodyStr = tbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�좎쭨"> '+val.reg_date.substr(0,4)+'.'+val.reg_date.substr(4,2)+'.'+val.reg_date.substr(6,2)+' </td>';


					// sm,xs �� td
					 tbodyStr = tbodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 tbodyStr = tbodyStr+'<div >';
					 tbodyStr = tbodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" class="tile tile-img mr-1" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+')">';
					 tbodyStr = tbodyStr+'<img class="img-fluid" src="'+val.thumbnail_url+'" alt="Card image cap">';
					 tbodyStr = tbodyStr+'</a>';
					 tbodyStr = tbodyStr+'<a href="'+val.media_url+'" target="_blank" onclick="updateDocumentReadedCount('+val.document_srl+');">'+val.title+'</a>';
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 tbodyStr = tbodyStr+'<span style="font-size: 12px;"> <a href="streamer_detail.php?sid='+val.streamer_id+'"> '+val.streamer_name+' </a> | '+platformName+' | '+val.reg_date.substr(0,4)+'.'+val.reg_date.substr(4,2)+'.'+val.reg_date.substr(6,2)+'</span>';
					 tbodyStr = tbodyStr+'</p>';
					 tbodyStr = tbodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 tbodyStr = tbodyStr+'</tr>';
				 });


				var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainViewLog('+(pageNumber-1)+', '+pageLimit+')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainViewLog(0, '+pageLimit+')">1</a>';
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
						 }
						 paginationStr = paginationStr+'<a class="page-link" onclick="getMainViewLog('+(page)+', '+pageLimit+')">'+(page+1)+'</a>';
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
						 }
						 paginationStr = paginationStr+'<a class="page-link" onclick="getMainViewLog('+(page)+', '+pageLimit+')">'+(page+1)+'</a>';
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainViewLog('+(totalPageCount-1)+', '+pageLimit+')">'+(totalPageCount)+'</a>';
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getMainViewLog('+(pageNumber+1)+', '+pageLimit+')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 $(targetPaginationId).html(paginationStr);
				 
			}
			
			$(targetId).html(tbodyStr);
			
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function getMainCommunityDocuments(pageNumber, pageLimit, mid) {

	var targetId = '#community-document-group-'+mid;
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			mid : mid,
			},
		url: 'process/board_documents_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);

				$(targetId).html('');
				var bodyStr = "";
				
			if(data == 'empty') {
				bodyStr = bodyStr+'<div class="list-group-item-body mt-2"> ';
				bodyStr = bodyStr+'<span class="text-center"> <h5 class="text-center">'+STRING_NODATA+'</h5> </span>';
				bodyStr = bodyStr+'</div>';
			} else {

				var totalCount = data.totalCount;

				 $.each(data.infoArray, function(key, val) {

					var regdate = val.regdate+'';

					if(mid == 'tos_board_media') {
						bodyStr = bodyStr+'<a href="board_content.php?mid='+mid+'&doc='+val.document_srl+'" class="list-group-item list-group-item-action">\
						<div class="list-group-item-figure rounded-left">';
						if(val.thumbnail_url == '' || val.thumbnail_url.indexOf('http') == -1 || val.thumbnail_url.length < 1) {
							bodyStr = bodyStr+'<img src="assets/images/dummy/img-2.jpg" alt="placeholder image"> </div>';
						} else {
							bodyStr = bodyStr+'<img src="'+val.thumbnail_url+'" alt="placeholder image"> </div>';
						}
						
						bodyStr = bodyStr+'<div class="list-group-item-body">\
						<h4 class="list-group-item-title main-list-group-media-body-title"> '+val.title+' </h4>\
						<span class="list-group-item-text main-list-group-media-body-text" style="font-size: 13px;">'+val.nick_name+'</span>\
						<span class="list-badge-text ml-2" style="font-size: 13px;align-items: center;"><span class="fas fa-thumbs-up"></span> '+val.voted_count+'</span>\
						<span class="list-badge-text ml-2" style="font-size: 13px;align-items: center;"><span class="fas fa-comments"></span> '+val.comment_count+'</span>\
						</div>\
						</a>';
					}
					else {
					 bodyStr = bodyStr+'<a href="board_content.php?mid='+mid+'&doc='+val.document_srl+'" class="list-group-item list-group-item-action board-main-list-item">\
						<div class="list-group-item-body">';

// 						if(val.comment_count!= null && parseInt(val.comment_count) > 0) {
// 							 bodyStr = bodyStr+'<p class="card-title mb-3 mt-1" style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">'+val.title+' ['+val.comment_count+']</p>';
// 						 } else {
							 bodyStr = bodyStr+'<p class="card-title mb-3 mt-1" style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">'+val.title+'</p>';
// 						 }
						
						bodyStr = bodyStr+'<p class="card-subtitle text-muted row mb-2" style="align-items:center;">\
						<span class="list-badge-text ml-2" style="font-size: 13px;">'+val.nick_name+'</span>\
						<span class="list-badge-text ml-2" style="font-size: 13px;align-items: center;">'+transferTime(regdate)+'</span>\
						<span class="list-badge-text ml-2" style="font-size: 13px;align-items: center;"><span class="fas fa-thumbs-up"></span> '+val.voted_count+'</span>';
						if(val.comment_count!= null && parseInt(val.comment_count) > 0) {
							bodyStr = bodyStr+'<span class="list-badge-text ml-2" style="font-size: 13px;align-items: center;"><span class="fas fa-comments"></span> '+val.comment_count+'</span>';
						}
						bodyStr = bodyStr+'</p> \
						</div>\
						</a>';
					}
				 });


			}
			
			$(targetId).html(bodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}

function getGameRanking(pageNumber, pageLimit, searchKeyword) {

	var targetId = '#main-game-ranking-tbody'; 
	var targetPaginationId = '#main-game-ranking-pagination';

	var targetStr = '<tr class="board-list-tr">\
		<td class="align-middle text-center mt-3 mb-3" colspan="5"> <div class="loader"></div> </td>\
		</tr>';
	$(targetId).html(targetStr);

	if(searchKeyword == 'undefined') {
		searchKeyword = '';
	}
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			searchKeyword : searchKeyword
			},
		url: 'process/game_ranking_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
// 				alert('test');
				$(targetId).html('');
				$(targetPaginationId).html('');
				var rankingTbodyStr = "";
				var paginationStr = "";
			if(data == 'empty') {
				rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr">';
				rankingTbodyStr = rankingTbodyStr+'<td class="align-middle" colspan="5"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				rankingTbodyStr = rankingTbodyStr+'</tr>';
				
			} else {

				var totalCount = data.totalCount;


// 				 var localRankNum = pageNumber*pageLimit +1;

				 $.each(data.infoArray, function(key, val) {


					 var iconUrlSm = val.box_url_sm;

					 rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr align-middle" style="font-size: 14px;border-bottom: 0px solid #aaaaaa;">';
// 					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle"> '+val.rank+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" style="font-weight: bold;"> '+val.rank+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="d-none d-md-table-cell">';

					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 rankingTbodyStr = rankingTbodyStr+'<a href="game_detail.php?gid='+val.game_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 rankingTbodyStr = rankingTbodyStr+'<a href="game_detail.php?gid='+val.game_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }

					 rankingTbodyStr = rankingTbodyStr+'<a href="game_detail.php?gid='+val.game_id+'">'+val.name+'</a>';
					 rankingTbodyStr = rankingTbodyStr+'</td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�됯퇏 酉곗뼱"> '+numberWithCommasWithK(val.popularity)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="理쒓렐 酉곗뼱"> '+numberWithCommasWithK(val.viewers)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�ㅽ듃由щ㉧"> '+numberWithCommasWithK(val.streamer_count)+' </td>';

					 
					// sm,xs �� td
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 rankingTbodyStr = rankingTbodyStr+'<div >';
					 rankingTbodyStr = rankingTbodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">'+val.rank+'. ';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 rankingTbodyStr = rankingTbodyStr+'<a href="game_detail.php?gid='+val.game_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 rankingTbodyStr = rankingTbodyStr+'<a href="game_detail.php?gid='+val.game_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 rankingTbodyStr = rankingTbodyStr+'<a href="game_detail.php?gid='+val.game_id+'">'+val.name+'</a>';
					 rankingTbodyStr = rankingTbodyStr+'</p>';
					 rankingTbodyStr = rankingTbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 rankingTbodyStr = rankingTbodyStr+'<span style="font-size: 12px;"> '+STRING_AVG_VIEWER+' '+numberWithCommasWithK(val.popularity)+' | '+STRING_LATEST_VIEWER+' '+numberWithCommasWithK(val.viewers)+' | '+STRING_STREAMER+' '+numberWithCommas(val.streamer_count)+'</span>';
					 rankingTbodyStr = rankingTbodyStr+'</p>';
					 rankingTbodyStr = rankingTbodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 
					 rankingTbodyStr = rankingTbodyStr+'</tr>';

// 					 localRankNum = localRankNum+1;
				 });


				 var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getGameRanking('+(pageNumber-1)+', '+pageLimit+', \''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">1</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getGameRanking(0, '+pageLimit+', \''+searchKeyword+'\')">1</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getGameRanking('+(page)+', '+pageLimit+', \''+searchKeyword+'\')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getGameRanking('+(page)+', '+pageLimit+', \''+searchKeyword+'\')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(totalPageCount)+'</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getGameRanking('+(totalPageCount-1)+', '+pageLimit+', \''+searchKeyword+'\')">'+(totalPageCount)+'</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getGameRanking('+(pageNumber+1)+', '+pageLimit+', \''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 $(targetPaginationId).html(paginationStr);
				
			}
			
			$(targetId).html(rankingTbodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}
function getGameRankingSearch() {

	var searchKeyword = $('#search_keyword').val();
	if(searchKeyword.length > 1) {
		getGameRanking(0, 50, searchKeyword);	
		
	} else {
		alert(STRING_ALERT_SEARCH_MIN_LENGTH);
	}
	
}

function getStreamerByGame(pageNumber, pageLimit, game_id,searchKeyword) {

	var targetId = '#main-streamer-bygame-tbody'; 
	var targetPaginationId = '#main-streamer-bygame-pagination';

	var targetStr = '<tr class="board-list-tr">\
		<td class="align-middle text-center mt-3 mb-3" colspan="8"> <div class="loader"></div> </td>\
		</tr>';
	$(targetId).html(targetStr);

	if(searchKeyword == 'undefined') {
		searchKeyword = '';
	}
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			game_id : game_id,
			searchKeyword : searchKeyword,
			},
		url: 'process/streamer_bygame_get.php',
		dataType: 'json',
		success:function(data) {
			
// 				console.log(data);
// 				alert('test');
				$(targetId).html('');
				$(targetPaginationId).html('');
				var rankingTbodyStr = "";
				var paginationStr = "";
			if(data == 'empty') {
				rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr">';
				rankingTbodyStr = rankingTbodyStr+'<td class="align-middle" colspan="8"> <h4 class="text-center">'+STRING_NODATA+'</h4> </td>';
				rankingTbodyStr = rankingTbodyStr+'</tr>';
				
			} else {

				var totalCount = data.totalCount;

				var favoriteStr = new String(data.favoriteStr);
				var favoriteArray = new Array();
				if(favoriteStr != '' && favoriteStr.length>0) {
					 var favoriteArray = favoriteStr.split(';');
				 }

				if(!isLogged) {
					var favoriteCookieName = 'tos_favorite_streamer';
					favoriteStr = getCookie(favoriteCookieName);

					if(favoriteStr != null) { 
						favoriteArray = favoriteStr.split(',');
					}
				}

				 var localRankNum = pageNumber*pageLimit +1;

				 $.each(data.infoArray, function(key, val) {

					 var favoriteBtnStyle = 'btn-outline-warning';
					 if(favoriteArray.indexOf(val.streamer_id) != -1) {
						 favoriteBtnStyle = 'btn-warning';
					 }

					 var iconUrlSm = val.icon_url_sm;

					 rankingTbodyStr = rankingTbodyStr+'<tr class="board-list-tr align-middle" style="font-size: 14px;border-bottom: 0px solid #aaaaaa;">';
// 					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle"> '+val.rank+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" style="font-weight: bold;"> '+val.rank+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="d-none d-md-table-cell">';

					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }

					 var platformName = val.platform;
					 if(val.platform == 'YOUTUBE') {
						 platformName = STRING_YOUTUBE;
					 }
					 else if(val.platform == 'TWITCH') {
						 platformName = STRING_TWITCH;
					 } 
					 
					 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-subtle badge-warning ml-1">NEW</span>';
					 }
// 					 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 rankingTbodyStr = rankingTbodyStr+'</td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�붾줈��"> '+numberWithCommas(val.follower_count)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="酉곗뭅�댄듃"> '+numberWithCommasWithK(val.view_count)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�곸긽 ��"> '+numberWithCommas(val.media_count)+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" data-th="�뚮옯��"> '+platformName+' </td>';
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-none d-md-table-cell" style="max-width:50px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" data-th="遺꾨쪟"> '+convertCategoryName(val.category)+' </td>';

					 
					// sm,xs �� td
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 rankingTbodyStr = rankingTbodyStr+'<div >';
					 rankingTbodyStr = rankingTbodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;word-break:break-all;overflow: hidden;text-overflow: ellipsis;">'+val.rank+'. ';
					 if(iconUrlSm != null && (''+iconUrlSm).length >0) {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile tile-img mr-1"><img class="img-fluid" src="'+iconUrlSm+'" alt="'+val.name+'"></a>';
					 } else {
						 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'" class="tile bg-primary mr-1" style="font-size:1em;">'+val.name.substring(0,2)+'</a>';
					 }
					 rankingTbodyStr = rankingTbodyStr+'<a href="streamer_detail.php?sid='+val.streamer_id+'">'+val.name+'</a>';
					 if(val.status_live == 'on') {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-danger ml-1">LIVE</span>';
					 }
					 else if(val.media_count_today>0) {
						 rankingTbodyStr = rankingTbodyStr+'<span class="badge badge-subtle badge-warning ml-1">N</span>';
					 }
					 rankingTbodyStr = rankingTbodyStr+'</p>';
					 rankingTbodyStr = rankingTbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 rankingTbodyStr = rankingTbodyStr+'<span style="font-size: 12px;"> '+STRING_STREAMER_RANKING_FOLLOWER+' '+numberWithCommasWithK(val.follower_count)+' | '+platformName+' | '+STRING_STREAMER_RANKING_VIDEO+' '+numberWithCommas(val.media_count)+'</span>';
					 rankingTbodyStr = rankingTbodyStr+'</p>';
					 rankingTbodyStr = rankingTbodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 rankingTbodyStr = rankingTbodyStr+'<span style="font-size: 12px;"> '+STRING_STREAMER_RANKING_VIEWCOUNT+' '+numberWithCommasWithK(val.view_count)+' | '+convertCategoryName(val.category)+' </span>';
					 rankingTbodyStr = rankingTbodyStr+'</p>';
					 rankingTbodyStr = rankingTbodyStr+'</div> </td>';
					 // sm,xs �� td ��
					 
					 
					 rankingTbodyStr = rankingTbodyStr+'<td class="align-middle" id="favorite-streamer-id-'+val.streamer_id+'">';
					 rankingTbodyStr = rankingTbodyStr+'<a href="javascript:registFavorite('+val.streamer_id+',\'streamer\')" class="btn btn-sm '+favoriteBtnStyle+'">';
					 rankingTbodyStr = rankingTbodyStr+'<i class="far fa-star"></i>';
					 rankingTbodyStr = rankingTbodyStr+'</a>';
					 rankingTbodyStr = rankingTbodyStr+'</td>';
					 
					 rankingTbodyStr = rankingTbodyStr+'</tr>';

					 localRankNum = localRankNum+1;
				 });


				 var totalPageCount = Math.ceil(totalCount / pageLimit);

				 if(pageNumber > 0) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerByGame('+(pageNumber-1)+', '+pageLimit+', '+game_id+', \''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-left"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 // page first
				 if(0 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">1</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerByGame(0, '+pageLimit+', '+game_id+', \''+searchKeyword+'\')">1</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';

				 if(totalPageCount <= 5) {
					 
					 for(var page=1;page<totalPageCount-1;page++) {
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerByGame('+(page)+', '+pageLimit+', '+game_id+', \''+searchKeyword+'\')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }


				 } else {

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 var startInPage = 1;
					 var endInPage = 4;

					 if(pageNumber < 3) {
						 startInPage = 1;
						 endInPage = 3;
					 }
					 else if(pageNumber > totalPageCount-1-2) {
						 startInPage = totalPageCount-1-3;
						 endInPage = totalPageCount-1-1;
					 } else {
						 startInPage = pageNumber-1;
						 endInPage = pageNumber+1;
					 }
					 
					 for(var page=startInPage;page<=endInPage;page++) {
						 if(page < 1 || page == totalPageCount-1) {
							 continue;
						 }
						 if(page == pageNumber) {
							 paginationStr = paginationStr+'<li class="page-item active">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(page+1)+'</a>';
						 } else {
							 paginationStr = paginationStr+'<li class="page-item">';
							 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerByGame('+(page)+', '+pageLimit+', '+game_id+', \''+searchKeyword+'\')">'+(page+1)+'</a>';
						 }
						 
						 paginationStr = paginationStr+'</li>';
					 }

					 paginationStr = paginationStr+'<li class="page-item disabled">';
					 paginationStr = paginationStr+'<a class="page-link">...</a>';
					 paginationStr = paginationStr+'</li>';

					 
				 }


				// page last
				if(totalPageCount>1) {
				 if(totalPageCount-1 == pageNumber) {
					 paginationStr = paginationStr+'<li class="page-item active">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="">'+(totalPageCount)+'</a>';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item">';
					 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerByGame('+(totalPageCount-1)+', '+pageLimit+', '+game_id+', \''+searchKeyword+'\')">'+(totalPageCount)+'</a>';
				 }
				 
				 paginationStr = paginationStr+'</li>';
				}
				 

				 if(pageNumber < totalPageCount-1) {
					 paginationStr = paginationStr+'<li class="page-item">';
				 } else {
					 paginationStr = paginationStr+'<li class="page-item disabled">';
				 }
				 paginationStr = paginationStr+'<a class="page-link" onclick="getStreamerByGame('+(pageNumber+1)+', '+pageLimit+', '+game_id+', \''+searchKeyword+'\')">';
				 paginationStr = paginationStr+'<i class="fa fa-lg fa-angle-right"></i>';
				 paginationStr = paginationStr+'</a>';
				 paginationStr = paginationStr+'</li>';

				 $(targetPaginationId).html(paginationStr);
				
			}
			
			$(targetId).html(rankingTbodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}


function getStreamerByGameSearch() {

	var searchKeyword = $('#search_keyword').val();
	if(searchKeyword.length > 1) {
		getStreamerByGame(0, 50, global_gameId, searchKeyword);	
		
	} else {
		alert(STRING_ALERT_SEARCH_MIN_LENGTH);
	}
	
}
function getMainGameDetail(game_id) {
	
	
	$.ajax({
		type : 'post',
		data: {
			game_id : game_id,
			},
		url: 'process/game_info_get.php',
		dataType: 'json',
		success:function(data) {
			
// 				console.log(data);
// 				alert('test');
// 				$('#main-streamer-ranking-tbody').html('');
// 				var rankingTbodyStr = "";
			if(data == 'empty') {
// 				alert('由ъ뒪�멸� �놁뒿�덈떎.');
// 				rankingTbodyStr = "<center>�곗씠�곌� �놁뒿�덈떎.</center>";
			} else {
				

				 $.each(data.infoArray, function(key, val) {
					 
					 var iconUrlSm = val.box_url_sm;
					 var iconUrlMd = val.box_url;
					 
					 if(iconUrlMd != null && (''+iconUrlMd).length >0) {
						 $('#game-detail-name-tile').css('display','none');
						 $('#game-detail-image-tile').css('display','');
						 
						 var imageTileStr = '<img src="'+iconUrlMd+'" alt="'+val.name+'">';
						 $('#game-detail-image-tile').html(imageTileStr);
						 
					 } else {
						 $('#game-detail-name-tile').html(val.name.substring(0,2));
						 $('#game-detail-image-tile').css('display','none');
					 }
					 
					 $('#game-detail-name-full').html(val.name);
					 
					 
					 $('#game-detail-cover-viewer-count').html(STRING_AVG_VIEWER+' '+numberWithCommas(val.popularity));

					 var coverSnsStr = '';
					 var twitchUrl = 'https://www.twitch.tv/directory/game/'+val.name;
					 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+twitchUrl+'" target="_blank">'+STRING_TWITCH+'</a>';
// 					 if(val.home_url.indexOf('youtube') != -1) {
// 						 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+val.home_url+'" target="_blank">�좏뒠釉�</a>';
// 					 }
// 					 var snsAddressArray = val.sns_address.split(';');
					 
// 					 for(var i in snsAddressArray) {
// 						 if(snsAddressArray[i].indexOf('youtube') != -1) {
// 							 if(snsAddressArray[i].indexOf('sub_confirmation') != -1) {
// 								 continue;
// 							 }
// 							 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+snsAddressArray[i]+'" target="_blank">�좏뒠釉�</a>';
// 						 }
// 						 else if(snsAddressArray[i].indexOf('twitch') != -1) {
// 							 coverSnsStr = coverSnsStr+'<a class="nav-link" href="'+snsAddressArray[i]+'" target="_blank">�몄쐞移�</a>';
// 						 }
// 					 }

					 $('#game-detail-cover-sns-nav-tabs').html(coverSnsStr);

					
					 $('#game-detail-stats-rank').html(val.rank);
					 $('#game-detail-stats-popularity-count').html(numberWithCommasWithK(val.popularity));
					 $('#game-detail-stats-streamer-count').html(numberWithCommasWithK(val.streamer_count));
					 $('#game-detail-stats-viewers_latest').html(numberWithCommasWithK(val.viewers));

					 $('#breadcrumb-game-detail').html(val.name+' '+STRING_PAGE);
					 
					 
					 
					 

				 });
				
			}
			
// 			$('#main-streamer-ranking-tbody').html(rankingTbodyStr);
			
		},
		error:function(data) {
			console.log(STRING_LOG_FAILED_TO_GET_GAME_INFO);
		},
		complete:function() {
		}
	
		});
}
function viewGameStatChart(game_id) {

	$.ajax({
			type : 'post',
			data : {
				game_id : game_id
			},
			url: 'process/game_chart_stats_get.php',
			dataType: 'json',
			success:function(data) {

//				console.log(data);
//				console.log(data.dateArray);
				if(data == 'failed') {
				} else {



					var dateArray = data.dateArray;
					var rankChartArray = data.rankChartArray;
					var popoularityChartArray = data.popoularityChartArray;

					var ctx = document.getElementById("chart-rank").getContext('2d');
					var rankChart = new Chart(ctx, 
							{
						"type":"line",
						"data":{
							"labels":dateArray,
							"datasets":[{
								"label":STRING_CHART_LABEL_RANK,
								"data":rankChartArray,
								"fill":false,
								"borderColor":"rgba(255,99,132,1)",
								"lineTension":0.2
								}]
								},
							"options":{
								scales: {
							        yAxes: [{
				                        ticks: {
				                        	reverse: true,
				                        }
							        }]
									}
								}
							} 
					);



					
					var ctxVisitor = document.getElementById("chart-viewer").getContext('2d');
					var followerChart = new Chart(ctxVisitor, 
							{
						"type":"line",
						"data":{
							"labels":dateArray,
							"yAxisID":STRING_CHART_FOLLOWER_Y_AXISID,
							"datasets":[{"label":STRING_CHART_LABEL_AVG_VIEWER,
								"data":popoularityChartArray,
								"fill":false,
								"borderColor":"rgb(118, 190, 217)",
								"lineTension":0.2
								}]
								},
							"options":{
								scales: {
							        yAxes: [{
				                        ticks: {
				                            callback: function(value, index, values) {
				                            	return numberWithCommasWithK(value);
				                            }
				                        }
							        }]
									}
								}
							}
					);
				} 
			},
			error:function(data) {
				alert(STRING_ALERT_FAILED_TO_LOAD_CHART);
			},
			complete:function() {
			}
		
			});
	
	
}

function getHomeGameRanking(pageNumber, pageLimit, searchKeyword) {

	var targetId = '#home-game-ranking-group'; 

	if(searchKeyword == 'undefined') {
		searchKeyword = '';
	}
	
	$.ajax({
		type : 'post',
		data: {
			pageNumber : pageNumber,
			pageLimit : pageLimit,
			searchKeyword : searchKeyword
			},
		url: 'process/game_ranking_get.php',
		dataType: 'json',
		success:function(data) {
			
//				console.log(data);
// 				alert('test');
				$(targetId).html('');
				var rankingTbodyStr = "";
			if(data == 'empty') {
				rankingTbodyStr = '<h4 class="text-center">'+STRING_NODATA+'</h4>';
				
			} else {

				var totalCount = data.totalCount;


// 				 var localRankNum = pageNumber*pageLimit +1;

				 $.each(data.infoArray, function(key, val) {

					 var boxUrlMd = val.box_url;

					 // <a href="http://youtu.be/hbftu9c3GWk" class="list-group-item list-group-item-action" target="_blank" onclick="updateDocumentReadedCount(68)"><div class="list-group-item-figure rounded-left"><img src="https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-136x190.jpg" alt="placeholder image"> </div><div class="list-group-item-body"><h4 class="list-group-item-title main-list-group-media-body-title"> Fortnite </h4><p class="list-group-item-text main-list-group-media-body-text"><object><a href="streamer_detail.php?sid=68"> 1�� </a></object><span class="badge badge-subtle badge-dark" style="font-size: 0.8em;"> �ㅽ듃由щ㉧ 72 </span> </p></div></a>
					 
					 rankingTbodyStr = rankingTbodyStr+'<a href="game_detail.php?gid='+val.game_id+'" class="list-group-item list-group-item-action">';
					 rankingTbodyStr = rankingTbodyStr+'<div class="list-group-item-figure rounded-left">';
					 rankingTbodyStr = rankingTbodyStr+'<img src="'+boxUrlMd+'" alt="placeholder image">'; 
					 rankingTbodyStr = rankingTbodyStr+'</div>';
					 rankingTbodyStr = rankingTbodyStr+'<div class="list-group-item-body">';
					 rankingTbodyStr = rankingTbodyStr+'<h4 class="list-group-item-title main-list-group-media-body-title"> '+val.name+' </h4>';
					 rankingTbodyStr = rankingTbodyStr+'<p class="list-group-item-text main-list-group-media-body-text"><strong> '+val.rank+STRING_RANK_POSTFIX+' </strong><span class="badge badge-subtle badge-dark" style="font-size: 0.8em;"> '+STRING_AVG_VIEWER+' '+numberWithCommasWithK(val.popularity)+' </span> </p>';
					 rankingTbodyStr = rankingTbodyStr+'</div></a>';


// 					 localRankNum = localRankNum+1;
				 });
				
			}
			
			$(targetId).html(rankingTbodyStr);
			
		},
		error:function(data) {
// 			alert('由ъ뒪�� 媛��몄삤湲곗뿉 �ㅽ뙣�덉뒿�덈떎.');
		},
		complete:function() {
		}
	
		});
}
  
function getDocRegTime(time){
	 var now = new Date();
	 var sYear = time.substring(0,4);
	 var sMonth = time.substring(4,6)-1;
	 var sDay = time.substring(6,8);
	 var sHour = time.substring(8,10);
	 var sMin = time.substring(10,12);
	 var sSecond = time.substring(12,14);
	 var sc = 1000;

	 var timeDate = new Date(sYear,sMonth,sDay,sHour,sMin,sSecond);
	 //吏��섍컙 珥�
	 var pastSecond = parseInt((now-timeDate)/sc,10);

	 var date;
	 var hour;
	 var min;
	 var str = "";
	 
	 var currentDate = new Date(),
	 currentDate_month = '' + (currentDate.getMonth() + 1),
	 currentDate_day = '' + currentDate.getDate(),
	 currentDate_year = currentDate.getFullYear();
	 if (currentDate_month.length < 2) currentDate_month = '0' + currentDate_month;
	 if (currentDate_day.length < 2) currentDate_day = '0' + currentDate_day;
	 
	 if (currentDate_month.length < 2) currentDate_month = '0' + currentDate_month;
	 if (currentDate_day.length < 2) currentDate_day = '0' + currentDate_day;
	 
	 var currentDateStr = currentDate_year+currentDate_month+currentDate_day+'';
	 var targetDateStr = time.substring(0,8);
	 
	 if(currentDateStr+0 > targetDateStr+0) {
		 str = time.substring(0,4)+'.'+time.substring(4,6)+'.'+time.substring(6,8);
	 } else {
		 str = sHour+':'+sMin+':'+sSecond;
	 }

//	 var restSecond = 0;
//	 if(pastSecond > 86400){
//		 str = sYear+'.'+sMonth+'.'+sDay;
//	 }else if(pastSecond > 3600){
//		 
//		 str = sHour+':'+sMin+':'+sSecond;
//		 
//	 }else{
//		 str = sHour+':'+sMin+':'+sSecond;
//	 }

	 return str;
}
function transferTime(time){
	 var now = new Date();
	 var sYear = time.substring(0,4);
	 var sMonth = time.substring(4,6)-1;
	 var sDay = time.substring(6,8);
	 var sHour = time.substring(8,10);
	 var sMin = time.substring(10,12);
	 var sSecond = time.substring(12,14);
	 var sc = 1000;

	 var timeDate = new Date(sYear,sMonth,sDay,sHour,sMin,sSecond);
	 //吏��섍컙 珥�
	 var pastSecond = parseInt((now-timeDate)/sc,10);

	 var date;
	 var hour;
	 var min;
	 var str = "";

	 var restSecond = 0;
	 if(pastSecond > 86400){
	  date = parseInt(pastSecond / 86400,10);
	  restSecond = pastSecond % 86400;
	  hour = parseInt(restSecond / 3600,10);
	  str = date + STRING_TIME_DAYS_AGO;
	  if(hour > 0) {
		  str = date + STRING_TIME_DAYS+" "+hour+STRING_TIME_HOURS_AGO;
	  }
	  if(date > 30) {
		  str = sYear+'.'+sMonth+'.'+sDay;
	  }
// 	  if(restSecond > 3600){
// 	   hour = parseInt(restSecond / 3600,10);
// 	   restSecond = restSecond % 3600;
// 	   str = str + hour + "�쒓컙 ";
// 	   if(restSecond > 60){
// 	    min = parseInt(restSecond / 60,10);
// 	    restSecond = restSecond % 60;
// 	    str = str + min + "遺� " + restSecond + "珥� ��";
// 	   }else{
// 	    str = str + restSecond + "珥� ��";
// 	   }
// 	  }else if(restSecond > 60){
// 	   min = parseInt(restSecond / 60,10);
// 	   restSecond = restSecond % 60;
// 	   str = str + min + "遺� " + restSecond + "珥� ��";
// 	  }else{
// 	   str = str + restSecond + "珥� ��";
// 	  }
	 }else if(pastSecond > 3600){
	  hour = parseInt(pastSecond / 3600,10);
	  restSecond = pastSecond % 3600;
	  min = parseInt(restSecond / 60,10);
	  str = str + hour + STRING_TIME_HOURS_AGO;
	  if(min > 0) {
		  str = hour + STRING_TIME_HOURS+" "+min+STRING_TIME_MINUTES_AGO;
	  }
// 	  if(restSecond > 60){
// 	   min = parseInt(restSecond / 60,10);
// 	   restSecond = restSecond % 60;
// 	   str = str + min + "遺� " + restSecond + "珥� ��";
// 	  }else{
// 	   str = str + restSecond + "珥� ��";
// 	  }
	 }else if(pastSecond > 60){
	  min = parseInt(pastSecond / 60,10);
// 	  restSecond = pastSecond % 60;
// 	  str = str + min + "遺� " + restSecond + "珥� ��";
	  str = str + min + STRING_TIME_MINUTES_AGO;
	 }else{
// 	  str = pastSecond + "珥� ��";
		 str = STRING_TIME_MOMENT_AGO;
	 }

	 return str;
}

function doImgPop(img){ 
	 img1= new Image(); 
	 img1.src=(img); 
	 imgControll(img); 
} 
	  
function imgControll(img){ 
	 if((img1.width!=0)&&(img1.height!=0)){ 
	    viewImage(img); 
	  } 
	  else{ 
	     controller="imgControll('"+img+"')"; 
	     intervalID=setTimeout(controller,20); 
	  } 
}

function viewImage(img){ 
	 W=img1.width; 
	 H=img1.height; 
	 var left = (screen.availWidth - img1.width)/2;
	 var top = (screen.availHeight - img1.height)/2;
	 O="width="+W+",height="+H+",left="+left+",top="+top+",scrollbars=yes,toolbar=no,menubar=no,status=no,location=no"; 
	 imgWin=window.open("","",O); 
	 imgWin.document.write("<html><head><title>"+STRING_IMAGE_DETAIL+"</title>");
	 imgWin.document.write("</head>");
	 imgWin.document.write("<body topmargin=0 leftmargin=0>");
	 imgWin.document.write("<img src="+img+" onclick='self.close()' style='cursor:pointer;overflow::auto;' title ='"+STRING_IMAGE_MODAL_CLOSE_WINDOW+"'>");
	 imgWin.document.write("<script src=\"assets/vendor/jquery/jquery.min.js\"></script>");
	 imgWin.document.write("<script type=\"text/javascript\">");
	 imgWin.document.write("</script>");
	 imgWin.document.write("</body>");
	 imgWin.document.write("</html>");
	 imgWin.document.close();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function numberWithCommasWithK(x) {
	var nwc = numberWithCommas(x);
	var nwcMatchCount = nwc.match(/,/g);
	if(nwcMatchCount != null && nwcMatchCount.length>1) {
		nwc = nwc.substr(0,nwc.lastIndexOf(','))+'K';
	}
	return nwc;
}
function cutByLen(str, maxByte) {

	for(b=i=0;c=str.charCodeAt(i);) {

	b+=c>>7?2:1;

	if (b > maxByte)

	break;

	i++;

	}

	return str.substring(0,i);

}
function convertCategoryName(sourceCategory) {
	var finalCategoryArray = new Array();
	
	var categoryArray = sourceCategory.split(',');
	for(var i=0;i<categoryArray.length;i++) {
		var eachCategoryName = categoryArray[i];
		switch(categoryArray[i]) {
		case '寃뚯엫':
			eachCategoryName = STRING_CATEGORY_GAME;
			break;
		case '�쇱긽':
			eachCategoryName = STRING_CATEGORY_LIFESTYLE;
			break;
		case '痍⑤�':
			eachCategoryName = STRING_CATEGORY_HOBBY;
			break;
		case '�뚯븙':
			eachCategoryName = STRING_CATEGORY_MUSIC;
			break;
		case '�뚯떇':
			eachCategoryName = STRING_CATEGORY_FOOD;
			break;
		case '�뷀꽣�뚯씤癒쇳듃':
			eachCategoryName = STRING_CATEGORY_ENTERTAINMENT;
			break;
		case '�⑥뀡':
			eachCategoryName = STRING_CATEGORY_FASHION;
			break;
		case '�ㅽ룷痢�':
			eachCategoryName = STRING_CATEGORY_SPORT;
			break;
		case '�덉닠':
			eachCategoryName = STRING_CATEGORY_ARTS;
			break;
		case '�곹솕':
			eachCategoryName = STRING_CATEGORY_MOVIE;
			break;
		case '�먮룞李�':
			eachCategoryName = STRING_CATEGORY_VEHICLE;
			break;
		case '嫄닿컯':
			eachCategoryName = STRING_CATEGORY_HEALTH;
			break;
		case '湲곗닠':
			eachCategoryName = STRING_CATEGORY_TECHNOLOGY;
			break;
		case '�좊㉧':
			eachCategoryName = STRING_CATEGORY_HUMOR;
			break;
		case 'TV':
			eachCategoryName = STRING_CATEGORY_TV;
			break;
		case '�ы쉶':
			eachCategoryName = STRING_CATEGORY_SOCIETY;
			break;
		case '�뺤튂':
			eachCategoryName = STRING_CATEGORY_POLITICS;
			break;
		case '吏���':
			eachCategoryName = STRING_CATEGORY_KNOWLEDGE;
			break;
		case '�좎셿�숇Ъ':
			eachCategoryName = STRING_CATEGORY_PET;
			break;
		case '醫낃탳':
			eachCategoryName = STRING_CATEGORY_RELIGION;
			break;
		}
		
		finalCategoryArray.push(eachCategoryName);
	}
	
	
	return finalCategoryArray.join(',');
}