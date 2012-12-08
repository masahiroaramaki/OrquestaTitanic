
		var map;
        var boloName = $('head title').text();
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService();
		
		jQuery(document).ready(function(){
			/*Map initialization*/
			function initialize() {
				
				var myOptions = {
					zoom:10,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					center: bolo//centro de mapa
				    }
			
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				 
		
		 var marker = new google.maps.Marker({//marker
	    position: bolo,
	    map: map,
	    title: boloName//Nombre del pueblo
	    });		 
	 			 
						 
	 var content = '<div id="infoWindow">' +//fukidashi content
	    '<h1>Destino:' + boloName + '</h1>' + //Nombre del pueblo
    '<p>Estaré aquí! Buen viaje.<br>' +
	    '<a href="http://www.masahiroaramaki.com"<span>WEB</span></a></p>' +
	    '</div>';
	  var infowindow = new google.maps.InfoWindow({
	    content: content
	  });
	  
	  
	   google.maps.event.addListener(marker, 'mouseover', function() {//fukidashi wo mouseover de
	    infowindow.open(map, marker);
	  });
	   google.maps.event.addListener(marker, 'mouseout', function() {
	    infowindow.close(map, marker);
	  });
			}

			
			function calcRoute(start, bolo, mode) {
				var request = {
					origin:start,
					destination:bolo,
					travelMode: google.maps.TravelMode[mode]
				};
				directionsService.route(request, function(result, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(result);
					}
				});
				
				directionsDisplay.setMap(map);
				directionsDisplay.setPanel(document.getElementById("directions"));

			}//calcRoute

			initialize();
			$('#from').focus(function(){
				$(this).val('');
				});		
			
			jQuery('#driveit').click(function(){
				var srcAddr = jQuery('#from').val();
				var destAddr = bolo;
				var mode = jQuery('#mode').val();
				
				calcRoute(srcAddr, destAddr, mode);
			});//click
		
		});// rady function