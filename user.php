<?php 
  $host="localhost";
  $user="root";
  $password="root";
  $con=mysql_connect($host,$user,$password);

  $user = json_decode(file_get_contents('php://input'));
/*
  	if ($user->id == '1') {
  		print "success";
  	} else {
  		print "error";
  	}
*/
  $db = mysql_select_db("stickyn_development",$con);
  mysql_query("INSERT INTO stickynotes(title,description,current) VALUES ('$user->title','$user->description','$user->id')",$con);
?>
