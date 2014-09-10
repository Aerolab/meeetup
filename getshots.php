<?	require_once 'src/dribbble/api/client.php';
		$client = new Client();

		$ar_shots = Array();

		if (1 == 1) {
			$shots = $client->getPlayerShots('aerolab', 1, 3);
			$first_shots = array_slice($shots->shots, 0, 3);

			$ar_positions = Array(0, 2, 4);
			$count = 0;
			foreach ($first_shots as $shot) {
				$ar_shots[$ar_positions[$count]] = '<div><a href="'.$shot->url.'"><img src="'.$shot->image_url.'" alt="'.$shot->title.'"/></a></div>';
				$count++;
			}
		}

		$shots = $client->getPlayerShots('indicius', 1, 3);
		$first_shots = array_slice($shots->shots, 0, 3);

		$ar_positions = Array(1, 3, 5);
		$count = 0;
		foreach ($first_shots as $shot) {
			$ar_shots[$ar_positions[$count]] = '<div><a href="'.$shot->url.'"><img src="'.$shot->image_url.'" alt="'.$shot->title.'"/></a></div>';
			$count++;
		}

		echo implode("\n", $ar_shots);

