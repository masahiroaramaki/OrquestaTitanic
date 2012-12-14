
		var map;
		var mapCurrent;
		var boloLat;
		var boloLng;
		var bolo;
        var boloName;
		var currentPosition;
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService();
		
$('#titanicActuaciones').live('pageinit' ,function(){
		
        $('td.mapas a').click(function() {		
        boloLat=$(this).find('p.boloLat').text();
		alert(boloLat);      		
		boloLng=$(this).find('p.boloLng').text();
		alert(boloLng);       
		boloName=$(this).find('.boloName').text();
		alert(boloName);				
        }); //click function		
        
 });//live pageinit
			
function initialize(boloLat,boloLng) {//function #from inserted text
				
			var myOptions = {
					zoom:10,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					center: bolo//centro de mapa
				    }//myOptions
			
			map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				 
		
		    var marker = new google.maps.Marker({
	            position: bolo,
	                 map: map,
	               title: boloName//Nombre del pueblo
		            });//marker
		
	 			 						 
	        var content = '<div id="infoWindow">' +//fukidashi content
	                      '<h1>Destino:' + boloName + '</h1>' + //Nombre del pueblo
                          '<p>Estaremos aquí! Buen viaje.<br>' +
	                      '<a href="http://www.titanicproducciones.com"<span>WEB</span></a></p>' +
	                      '</div>';
	 
	        var infowindow = new google.maps.InfoWindow({
	                   content: content
	                   });//infowindow
	  
	  
	       google.maps.event.addListener(marker, 'mouseover', function() {//fukidashi wo mouseover de
	                      infowindow.open(map, marker);
	                    });
	   
	       google.maps.event.addListener(marker, 'mouseout', function() {
	                      infowindow.close(map, marker);
	                    });			
				 
	 }//function initialize

		
function initializeCurrent(lat, lon){
         
                currentPosition = new google.maps.LatLng(lat, lon);

                map = new google.maps.Map(document.getElementById('map_canvas'), {
                   zoom: 15,
                   center: currentPosition,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });

                var currentPositionMarker = new google.maps.Marker({
                    position: currentPosition,
                    map: map,
                    title: "Tu ubicación"
                });

                var infowindow = new google.maps.InfoWindow();
                google.maps.event.addListener(currentPositionMarker, 'click', function() {
                    infowindow.setContent("Estás aquí " );
                    infowindow.open(map, currentPositionMarker);
                });
								
				directionsDisplay.setMap(map);
                directionsDisplay.setPanel($("#directions"));                 
            }

            function locError(error) 
            {
                alert("No ha sido posible buscarte por GPS");
            }

            function locSuccess(position) 
            {
                initializeCurrent(position.coords.latitude, position.coords.longitude);
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
				
				 });//function directionService
				
		}//function calcRoute

    
	
	 $('#actuacionMap').live('pageshow', function(){
		 
		 bolo=new google.maps.LatLng(boloLat,boloLng);
		 $('#actuacionMap h1').text(boloName);
		 var boloDestino=' ' + 'a' + ' ' + boloName;		 
		 $('p.boloDestino').text(boloDestino);
         initialize();
		$('#from').focus(function(){
				$(this).val('');
				}); 
	
	    $('#driveit').click(function(){//Text en #from		        
				var srcAddr = jQuery('#from').val();
				var destAddr = bolo;
				var mode = jQuery('#mode').val();				
				calcRoute(srcAddr, destAddr, mode);
				directionsDisplay.setMap(map);
				directionsDisplay.setPanel(document.getElementById("directions"));			
		});//click drivit

         
		 $("#currentPos").click(function(){
		        navigator.geolocation.getCurrentPosition(locSuccess, locError);               
                }); 
		
		 $("#driveitCurrent").click(function(){
                var gpsAddr = currentPosition;
				var destAddr = bolo;
				var mode = jQuery('#mode').val();				
				calcRoute(gpsAddr, destAddr, mode);
				directionsDisplay.setMap(map);
				directionsDisplay.setPanel(document.getElementById("directions"));
                   
                }); 
		 
	  
	  });//live
	   