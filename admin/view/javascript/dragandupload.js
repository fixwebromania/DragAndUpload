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

		var table=$("#file-list");
		
		table.html('');
		
		var html='';
		
        var files = e.originalEvent.dataTransfer.files;
        var fd = new FormData();
		
		for(i=0;i<files.length;i++)
		{
			var file=files[i];
			
			html+='<tr class="paginate-show"><td><a href="#" target="_blank">'+file.name+'</a></td><td>October 31 2019, 11:52:25</td><td>38.25MB</td></tr>';
			
			fd.append('file', file);
		}
		
		table.html(html);
	
        uploadData(fd);
    });

    // file selected
    $("#file").change(function(){
        var fd = new FormData();

        var files = $('#file')[0].files[0];

        fd.append('file',files);

        uploadData(fd);
    });
});

function uploadData(formdata){

    $.ajax({
        url: 'index.php?route=catalog/dragandupload&user_token='+user_token,
        type: 'post',
        data: formdata,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(response){
            alert(response);
        }
    });
}
