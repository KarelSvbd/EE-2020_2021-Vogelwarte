<?php
	$db = ["Bruant nain","Labbe pomarin","Locustelle luscinioïde"];

	$voice = $_POST["output"];

	foreach ($db as $val){
		$lev = levenshtein($voice,$val);

		if ($lev == 0){
			$closest = $word;
        	$shortest = 0;
        	break;
		}

		if ($lev <= $shortest || $shortest < 0) {
			$closest  = $word;
			$shortest = $lev;
		}
	}
?>