function getDate(dateObj){
    dateObj = new Date(dateObj);
    if(dateObj instanceof Date)
        return dateObj.getFullYear() + "-" + get2digits(dateObj.getMonth()+1)+ "-" + get2digits(dateObj.getDate());
}

function get2digits (num){
 return ("0" + num).slice(-2);
}

function getBoardList(division,page){
    var targetId = '#main-board-documents-tbody';
    var targetPaginationId = '#main-board-documents-pagination';
    
    var targetStr  = '<tr class="board-list-tr">'
        targetStr += 'asdf<td class="align-middle text-center mt-3 mb-3" colspan="4"><div class="loader"></div></td></tr>';
	$(targetId).html(targetStr);

    $.ajax({
        type : 'post',
		data: {
			'division' : division,
			'page'     : page
			},
		url: division + '/get_board_list',
		dataType: 'json',
		success:function(data) {
            $(targetId).html('');
			$(targetPaginationId).html('');
			
			var bodyStr = "";
			var paginationStr = "";
			
			if(data.length == 0) {
				bodyStr = bodyStr+'<tr class="board-list-tr">';
				bodyStr = bodyStr+'<td class="align-middle" colspan="6"> <h4 class="text-center">데이터가 없습니다 :)</h4> </td>';
				bodyStr = bodyStr+'</tr>';
			}else{
			    $.each(data.posts, function(key, val) {
			        bodyStr = bodyStr+'<tr class="board-list-tr" style="font-size: 14px;">';
			        bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell" style="color:#959595;"> '+ val.id +' </td>';
				    bodyStr = bodyStr+'<td class="d-none d-md-table-cell" style="max-width: 300px;white-space:nowrap; overflow: hidden;text-overflow:ellipsis">';
				    
				    var ellipsisTitle = val.title;
					 if(ellipsisTitle.length > 30) {
						 ellipsisTitle = val.title.substr(0,30)+"...";
					 }
					 bodyStr = bodyStr+'<a href="/notice/' + val.id + '"style= "color: #333;">' + ellipsisTitle + '</a>';
					 bodyStr = bodyStr+'</td>';
					 var nickname = '';
					 if(val.author){
					     nickname = val.author.nickname;
					 }
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell">'+ nickname +' </td>';
					 bodyStr = bodyStr+'<td class="align-middle d-none d-md-table-cell"> '+ getDate(val.createdAt) +' </td>';
					 bodyStr = bodyStr+'<td class="align-middle d-table-cell d-md-none ml-0 mr-0 pl-0 pr-0">';
					 bodyStr = bodyStr+'<div >';
					 bodyStr = bodyStr+'<p class="mb-2 mt-1" style="font-size: 14px;max-width: 270px;white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">';
                     bodyStr = bodyStr+'<a href="/notice/" + val.id style= "color: #333;">' + ellipsisTitle + '</a>';
                     bodyStr = bodyStr+'</p>';
					 bodyStr = bodyStr+'<p class="text-muted row mb-1" style="align-items:center;margin-left:0px;">';						
					 bodyStr = bodyStr+'<span style="font-size: 12px;"> '+nickname+' | '+getDate(val.createdAt)+'</span>';
					 bodyStr = bodyStr+'</p>';
					 bodyStr = bodyStr+'</div> </td>';
					 bodyStr = bodyStr+'</tr>';
			    });
			    var offset = 3;
			    var maxPage = data.maxPage;
			    var page = data.page;
			    
			    var disabled_left_tag = "";
			    var disabled_right_tag = "";
			    
			    if(page == 1){
			        disabled_left_tag = "disabled";
			    }
			    
			    if(page == maxPage){
			        disabled_right_tag = "disabled";
			    }
			    paginationStr += '<li class="page-item ' + disabled_left_tag + '">';
			    paginationStr += '<a href="/notice?page=' + Number(page-1) + '" class="page-link>';
			    paginationStr += '<i class="fa fa-lg fa-angle-left"></i>';
			    paginationStr += '</a>';
			    paginationStr += '</li>';
			    var i = 1;
			    for(i = 1; i <= maxPage; i ++){
			        var active ;
			        if(i===page) active = "active";
			        if(i <= offset || i > maxPage-offset || (i >= page-(offset-1) && i <= page+(offset-1))){
			            paginationStr += '<li class="page-item ' + active + '">';
			            paginationStr += '<a class="page-link" href="/notice?page=' + i + '">' + i + '</a>';
			            paginationStr += '</li>';
			        }else if(i == offset+1 || i == maxPage-offset){
			            paginationStr += '...';
			            
			        }
			    }
			    paginationStr += '<li class="page-item ' + disabled_right_tag + '">';
			    paginationStr += '<a href="/notice?page=' + Number(page+1) + '" class="page-link>';
			    paginationStr += '<i class="fa fa-lg fa-angle-right"></i>';
			    paginationStr += '</a>';
			    paginationStr += '</li>';
			    
			    $(targetPaginationId).html(paginationStr);
			}
			$(targetId).html(bodyStr);
		}
    });
}