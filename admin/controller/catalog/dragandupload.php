<?php
class ControllerCatalogDragAndUpload extends Controller
{
	public function index()
	{ 
		var_dump($this->request->files);
	} 
}
?>