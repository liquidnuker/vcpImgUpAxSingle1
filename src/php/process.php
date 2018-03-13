<?php 
// var_dump($_FILES);
// echo $_FILES['f_file']['name']; 

if(!empty($_FILES['f_file'])) {
  $path = "./uploads/";
  $path = $path . basename( $_FILES['f_file']['name']);
  if(move_uploaded_file($_FILES['f_file']['tmp_name'], $path)) {
    echo "The file ".  basename( $_FILES['f_file']['name']).
    " has been uploaded";

    // dimensions
    $dimensions = getimagesize($path);
    echo "width" . $dimensions[0] . "height" . $dimensions[1]; 

    // size
    echo filesize($path); // ok
    // echo FileSizeConvert(filesize($path)); 

  } else {
    echo "There was an error uploading the file";
  }
}





?>