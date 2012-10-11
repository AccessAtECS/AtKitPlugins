<?php

class plugin {

	private $name;
	private $cwd;

	private $rawPlugin = null;

	const GET_COMPILED = 1;
	const GET_ORIGINAL = 2;

	public function __construct($name){
		$this->name = $name;

		$this->cwd = realpath(dirname(__FILE__) . "/../../");

		if(!file_exists("{$this->cwd}/repo/{$name}.js")) throw new Exception("Plugin not found");
	}

	public function getSupportedLanguages(){
		if($this->rawPlugin == null) $this->rawPlugin = $this->get(plugin::GET_ORIGINAL);

		preg_match_all("/AtKit.addLocalisation(?:Map)?\(\s?[\"']([^\"']+)['\"]/i", $this->rawPlugin, $matches);

		if(count($matches[1]) > 0) return $matches[1];

		return array();
	}

	public function get($type = plugin::GET_COMPILED){

		switch($type){

			case plugin::GET_COMPILED:
				return file_get_contents("{$this->cwd}/dist/{$this->name}.js");
			break;


			case plugin::GET_ORIGINAL:
				return file_get_contents("{$this->cwd}/repo/{$this->name}.js");
			break;

		}

	}

	public function getPath(){
		return realpath("{$this->cwd}/repo/{$this->name}.js");
	}

}

?>
