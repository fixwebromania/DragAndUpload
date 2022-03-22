$(document).ready(function() {

    // preventing page from redirecting
    $("html").on("dragover", function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Drag here");
    });

    $("html").on("drop", function(e) { e.preventDefault(); e.stopPropagation(); });

    // Drag enter
    $('.upload-drop-zone').on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        console.log("Drop");
    });

    // Drag over
    $('.upload-drop-zone').on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
         console.log("Drop");
    });

    // Drop
    $('.upload-drop-zone').on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
				
		var files=e.originalEvent.dataTransfer.files;
	
		
		
		for(i=0;i<files.length;i++)
		{
			var file=files[i];
			
			uploadFile(file);
		}
	
    });
});

function uploadFile(file)
{
	var data = new FormData();

	data.append('file',file);

	sendData(data);
}

function sendData(formdata){

    $.ajax({
        url: 'index.php?route=catalog/download/upload&user_token='+user_token,
        type: 'post',
        data: formdata,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(response){
            if(response.success)
			{
				addFile(response)
			}
        }
    });
}

function deleteDownload(download_id)
{
	$("#product-download"+download_id).remove();
	$("#du-"+download_id).remove();
}

function addFile(data)
{
	data['name']=data['mask'];
	
	data['download_description']={[drag_language_id]:{'name':data['mask']}};
	
	$.post('index.php?route=catalog/download/add&ajax=1&user_token='+user_token,data,function(r)
	{
		if(r.success)
		{
			var html='<div id="product-download'+r.download_id+'"><i class="fa fa-minus-circle"></i>'+data.name+'<input type="hidden" name="product_download[]" value="'+r.download_id+'"></div>';
		
			$("#product-download").append(html);
			
			html='<tr class="paginate-show" id="du-'+r.download_id+'"><td><a href="#" target="_blank">'+data.name+'</a></td><td></td><td><a href="javascript:;" onclick="deleteDownload('+r.download_id+')"><i class="fa fa-close"></i></a></td></tr>';
					
			$("#file-list").append(html);
		}
	})
}