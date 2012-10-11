<?php
$cachedObjects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator("dist"), RecursiveIteratorIterator::SELF_FIRST);
$repoObjects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator("repo"), RecursiveIteratorIterator::SELF_FIRST);

$cachedCount = 0;
$cachedBytes = 0;
$cachedCombinedCount = 0;
$cachedCombinedBytes = 0;

foreach($cachedObjects as $name => $object){
	if($object->getPath() == "dist/combined"){
		$cachedCombinedCount++;
		$cachedCombinedBytes += $object->getSize();
	} else {
		$cachedCount++;
		$cachedBytes += $object->getSize();
	}
}

$repoCount = 0;
$repoBytes = 0;
foreach($repoObjects as $name => $object){
	$repoCount++;
	$repoBytes += $object->getSize();
}

echo "$repoCount repository plugins taking up " . formatBytes($repoBytes);
echo "<br /><br />";

echo "$cachedCount cached minified plugins taking up " . formatBytes($cachedBytes);
echo "<br />";

echo "$cachedCombinedCount cached minified pluginbundles taking up " . formatBytes($cachedCombinedBytes);
echo "<br />";







function formatBytes($bytes, $precision = 2) {
    $units = array('B', 'KB', 'MB', 'GB', 'TB');

    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);

    // Uncomment one of the following alternatives
     $bytes /= pow(1024, $pow);
    // $bytes /= (1 << (10 * $pow));

    return round($bytes, $precision) . ' ' . $units[$pow];
}

?>
