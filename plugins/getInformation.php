<?php
header("Content-type: text/javascript");

require_once("app/classes/plugin.class.php");

if(!isset($_GET['p'])) exit;

try {
        $p = new plugin($_GET['p']);

	$output = array();

        $output['languages'] = $p->getSupportedLanguages();

	echo json_encode($output);

} catch(Exception $e){
        echo $e->getMessage();
}
?>
