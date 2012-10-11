<?php
class compiler {

	private $command;
	private $cwd;

	private $plugins = array();

	private $outputFile;
	private $pluginPaths;

	public function __construct(){
		$this->cwd = realpath(dirname(__FILE__) . "/../../");

		$this->command = "java -jar {$this->cwd}/app/bin/compiler.jar ";
	}

	public function addPlugin($plugin){
		array_push($this->plugins, new plugin($plugin));
	}

	public function setOutput($output){
		$this->outputFile = $output;
	}

	public function compile(){

		if($this->outputFile == "") throw new Exception("Output file not set");

		foreach($this->plugins as $plugin){
			$this->pluginPaths .= "--js " . $plugin->getPath() . " ";
		}


		$this->command .= $this->pluginPaths . "--js_output_file {$this->cwd}/dist/{$this->outputFile}.js";
		//echo $this->command;
		$output = shell_exec($this->command);
	}

	public function outputExists(){
		return file_exists("{$this->cwd}/dist/{$this->outputFile}.js");
	}

	public function outputFile(){
		return "{$this->outputFile}.js";
	}

	public function getOutput(){
		return file_get_contents("{$this->cwd}/dist/{$this->outputFile}.js");
	}


}

?>
