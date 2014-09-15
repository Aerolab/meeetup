<?php
	require_once 'src/dribbble/api/client.php';
	$client = new Client();

	$ar_shots = Array();
	$numbers = range(0, 14);
	if (1 == 1) {
		$shots = $client->getPlayerShots('aerolab', 1, 15);

		$ar_positions = Array(0, 2, 4);
		shuffle($numbers);
		for ($r = 0; $r < 3; $r++) {
			$shot = $shots->shots[$numbers[$r]];
			$ar_shots[$ar_positions[$r]] = '<div><img src="'.$shot->image_url.'" alt="'.$shot->title.'"/><a href="'.$shot->url.'" class="details"><span>'.$shot->title.'</span></a></div>';
		}
	}

	$shots = $client->getPlayerShots('indicius', 1, 15);

	$ar_positions = Array(1, 3, 5);
	shuffle($numbers);
	for ($r = 0; $r < 3; $r++) {
		$shot = $shots->shots[$numbers[$r]];
		$ar_shots[$ar_positions[$r]] = '<div><img src="'.$shot->image_url.'" alt="'.$shot->title.'"/><a href="'.$shot->url.'" class="details"><span>'.$shot->title.'</span></a></div>';
	}

	$ar_shots_sorted = Array();
	for ($r = 0; $r < 6; $r++) {
		array_push($ar_shots_sorted, $ar_shots[$r]);
	}
	echo implode("\n", $ar_shots_sorted);

