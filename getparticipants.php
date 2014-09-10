<?php /*include 'meetup.php';
			include 'meetupapirequest.class.php';
			include 'meetupapiresponse.class.php';
			include 'meetupconnection.class.php';
			include 'meetupcheckins.class.php';
			$meetup_api_key = '3761f12523a3c10134a16b4912936';
			$connection = new MeetupKeyAuthConnection($meetup_api_key);
			$m = new MeetupCheckins($connection);
			$events = $m->getCheckins( array( 'event_id' => '1188322' ) ); echo '123 '; print_r( $events);*/
			//$m = new MeetupCheckins('1188322', '', '153168202');
			//$checkins = $m->getCheckins('1188322', '', '153168202');

		/*include 'meetup_api-master/customApiAttendance.php';
		$test_key = '3761f12523a3c10134a16b4912936';
		$muApi = new MeetupAPIAttendance($test_key);
		$muApi->setQuery( array('urlname' => 'dribbble', 'id' => '1188322') );
		set_time_limit(0);
		$muApi->setPageSize(200);
		$response = $muApi->getResponse();
		print_r($response); */

		$eventUrl = 'http://www.meetup.com/dribbble/Buenos-Aires-AR/1188322/';
		//$content = file_get_contents($eventUrl);
		//$x = new SimpleXmlElement($content);
		//print_r($x);
		
		$ch = curl_init();
		$timeout = 5;
		curl_setopt($ch, CURLOPT_URL, $eventUrl); curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$html = curl_exec($ch); curl_close($ch);
		$dom = new DOMDocument();
		@$dom->loadHTML($html);
		foreach($dom->getElementsByTagName('span') as $element) {
			if ($element->getAttribute('class') == 'rsvp-count-number rsvp-count-attending')
			$going = $element->textContent;
		}
		$avatars = substr($html, strpos($html, 'rsvp-list')-8);
		$avatars = substr($avatars, 0, strpos($avatars, '/ul')+4);
		$avatars = preg_replace("/[\r\n]+/", "\n", $avatars);

		$initialavailable = 100;

		$percentualGoing = floor(($going*100)/$initialavailable);
		echo $percentualGoing.'__[cc]__'.$going.'__[cc]__'.$avatars;
?>