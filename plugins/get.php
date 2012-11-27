<?php
header("Content-type: text/javascript");

require_once("app/classes/compiler.class.php");
require_once("app/classes/plugin.class.php");

if(!isset($_GET['p'])) exit;

$r = isset($_GET['r']) ? true : false;


try {

	$c = new compiler();
	
	$plugins = explode(",", $_GET['p']);
	
	sort($plugins);
	
	if(count($plugins) > 1){
		$c->setOutput("combined/" . sha1(implode(",", $plugins)));
	} else {
		$c->setOutput($plugins[0]);
	}

	// Regenerate
	if($r) unlink("dist/" . $c->outputFile());
	
	if( $c->outputExists() ){
		$path =  $_SERVER["HTTP_HOST"] . rtrim(dirname($_SERVER['REQUEST_URI']), "/");

		if(empty($_SERVER['HTTPS'])){
			$path = "http://" . $path;
		} else {
			$path = "https://" . $path;
		}
		$path .= "/dist/" . $c->outputFile();
		//echo $path;

		header("Location: {$path}" );
		exit;
	}
	
	foreach($plugins as $plugin){
		$c->addPlugin($plugin);
	}
	
	$c->compile();

	if($r){
		echo "Plugin regenerated to " . $c->outputFile();
		exit;
	}
	
	echo $c->getOutput();

}
catch(Exception $e){
	echo $e->getMessage();
}

?>
