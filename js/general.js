
////////////////////////////////general mobile/////////////////////////////////////////////////
// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'tracking code']);

 $(document).bind("mobileinit", function(){
	// español
	$.mobile.loadingMessage = 'Cargando';
	$.mobile.pageLoadErrorMessage = 'Error en cargar';
	$.mobile.page.prototype.options.backBtnText = 'Volver';
	$.mobile.dialog.prototype.options.closeBtnText = 'Cerrar';
	$.mobile.selectmenu.prototype.options.closeText= 'Cerrar';
	$.mobile.listview.prototype.options.filterPlaceholder = 'Buscar';
	$.support.cors='true';
	$.mobile.allowCrossDomainPages='true';//crossDomain-PhoneGap
	$.mobile.getMaxScrollForTransition='5';//Calcula altura de paginas con scroll

	// Boton volver
	$.mobile.page.prototype.options.addBackBtn = true;	
		

	// page tracking
	$(':jqmData(role="page")').live('pageshow', function (event, ui) {
		_gaq.push(['_trackPageview', $.mobile.activePage.jqmData('url')]);
	});

});//end bind

$(document).ready(function(){
	// home boton
	$(':jqmData(role=page)').live("pagebeforecreate", function(evt){
		var page = $(this),
			home = $.mobile.firstPage;
			if ( page.attr('id') != home.attr('id')) {
				page.find(':jqmData(role="header")').append(
					$('<a href="#' + home.attr('id') + '"' + ' ' + 'data-transition="slideup"'
					+ ' ' + 'data-role="button"' + 'data-icon="home"' + ' ' + 'data-iconpos="notext"'
					+ ' ' + 'class="ui-btn-right"' + '>' + '</a>')
//<a href="#home" data-transition="slideup" data-role="button" data-icon="home"//
//data-iconpos="notext" class="ui-btn-right"></a>//			
			);
		}		
	});
/////////////////////////////end Genral mobile//////////////////////////////////////////////////	
	// mapa-empresa
	$('#empresa').bind('pageshow', function(){
		var TITLE = 'La oficina de TITANIC Pro.',
		LAT = 38.93493,
		LNG = -0.24965,
		MAP_ID = 'map';

		//construir mapa
		var infowindow = new google.maps.InfoWindow(),
		latLng = new google.maps.LatLng(LAT, LNG),
		map = new google.maps.Map(document.getElementById(MAP_ID), {
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}),
		marker = new google.maps.Marker({
			title: TITLE,
			position: latLng,
			map: map
		});

		//mostrar mapa
		map.setCenter(latLng);
		infowindow.open(map);
	});
//////////////////////////////end Empresa////////////////////////////////////////////////////////
	// leer Google Analytics
	var ga = document.createElement('script'); ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
    //Boton up
	$(".upBoton a.upScroll").click(function(){
		         $("body").animate({scrollTop:0},2000); 
		       });
///////////////////////////Cinco fotos aprecen-Perfil////////////////////////////////////////////////
	 $('#masahiroPerfil').live("pageinit",function(){
function playSlide(){
$("#cincoFotosAparecen img").hide();//5 fotos puestas una por encima de otra
$(".botonReplay").hide();
$("img.primera").fadeIn(1000).delay(5000).fadeOut(1000,function(){//callback y empieza la siguiente
$("img.segunda").fadeIn(1000).delay(5000).fadeOut(1000,function(){
$("img.tercera").fadeIn(1000).delay(5000).fadeOut(1000,function(){
$("img.cuarta").fadeIn(1000).delay(5000).fadeOut(1000,function(){
$("img.quinta").fadeIn(1000).delay(5000).fadeOut(1000,function(){
$("img.primera").fadeIn(1000,function(){//Con la primera se para
    $('.botonReplay').fadeIn(1000);//...Y aparece el boton
});//primera
});//quienta
});//cuarta
});//tercera
});//segunda
});//primera
}//function playSlide()
playSlide();//replay al pulsar el boton
$('.botonReplay button').click(function(){
playSlide();
});//click
 });//live
/////////////////////////////end Perfil//////////////////////////////////////////////////
//Mapas-actuacionMap

		var map;
		var boloLat;//latituc que hay que encontrar en Google
		var boloLng;//longitud que hay que encontrar en Google
		var bolo;//Donde va el marcador de mapa
        var boloName;//nombre del pueblo
		var currentPosition;//gps
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService();
		
$('#titanicActuaciones').live('pageinit' ,function(){
		
        $('td.mapas a').click(function() {//Link "mapas"		
        boloLat=$(this).find('p.boloLat').text();
		alert(boloLat);      //latitud longitud que esta escondido en html anchor invisible		
		boloLng=$(this).find('p.boloLng').text();
		alert(boloLng);       
		boloName=$(this).find('.boloName').text();
		alert(boloName);//Nombre del pueblo invisible				
        }); //click function		
        
 });//live pageinit
			
function initialize(boloLat,boloLng) {//function input#from inserted text
				
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
		
	 			 						 
	        var content = '<div id="infoWindow">' +//dialog content
	                      '<h1>Destino:' + boloName + '</h1>' + //Nombre del pueblo
                          '<p>Estaremos aquí! Buen viaje.<br>' +
	                      '<a href="http://www.titanicproducciones.com"<span>WEB</span></a></p>' +
	                      '</div>';
	 
	        var infowindow = new google.maps.InfoWindow({
	                   content: content
	                   });//infowindow
	  
	  
	       google.maps.event.addListener(marker, 'mouseover', function() {// mouseover-aparece dialog
	                      infowindow.open(map, marker);
	                    });
	   
	       google.maps.event.addListener(marker, 'mouseout', function() {
	                      infowindow.close(map, marker);//hover-out
	                    });			
				 
	 }//end function initialize

		
function initializeCurrent(lat, lon){//GPS
         
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

                var infowindowCurrent = new google.maps.InfoWindow();
                google.maps.event.addListener(currentPositionMarker, 'click', function() {
                    infowindowCurrent.setContent("Estás aquí " );
                    infowindowCurrent.open(map, currentPositionMarker);
                });
								
				directionsDisplay.setMap(map);                                
            }//end current function
           
		    function locError(error) 
            {
                alert("No ha sido posible buscarte por GPS");
            }

            function locSuccess(position) 
            {
                initializeCurrent(position.coords.latitude, position.coords.longitude);
				//pasa arguments a parameters
            }
			
			function calcRoute(start, bolo, mode) {//Calcula la distancia entre origen y destino
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
				
		}//end function calcRoute

    
	
	 $('#actuacionMap').live('pageshow', function(){//pagina siguiente
		 
		 bolo=new google.maps.LatLng(boloLat,boloLng);
		 $('#actuacionMap h1').text(boloName);//nombre del pueblo en header
		 var boloDestino=' ' + 'a' + ' ' + boloName;//Escribe el destino encima del mapa		 
		 $('p.boloDestino').text(boloDestino);
         initialize();//inicia function initalize()
		$('#from').focus(function(){
				$(this).val('');//vaciar input
				}); 
	
	    $('#driveit').click(function(){//Text en #from		        
				var srcAddr = jQuery('#from').val();//origen=input value
				var destAddr = bolo;//destino
				var mode = jQuery('#mode').val();				
				calcRoute(srcAddr, destAddr, mode);
				directionsDisplay.setMap(map);//mostrar mapa
				directionsDisplay.setPanel(document.getElementById("directions"));//set pnel de indicaciones							
				alert(srcAddr);
				
				var desdeText='Desde' + ' ' + srcAddr;
				$("p.boloDestino").prepend(desdeText);//añade el origen 
				var defaultText='¿De donde vienes?';				
				$('#from').val(defaultText);//click y input value=default
				var mapPos = $('#actuacionMap #map_area').offset();//offset hasta el mapa
				var mapPosTop=mapPos.top;
				alert(mapPosTop);
				$("body").animate({scrollTop:mapPosTop-120},2000); //scroll down hasta nombres de pueblo			
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
				var desdeTextCurrent='Desde tu ubicación actual';
				$("p.boloDestino").prepend(desdeTextCurrent);
				var mapPos = $('#actuacionMap #map_area').offset();
				var mapPosTop=mapPos.top;
				var mapPos = $('#actuacionMap #map_area').offset();
				var mapPosTop=mapPos.top;
				alert(mapPosTop);
				 $("body").animate({scrollTop:mapPosTop-120},2000); 
                   
                }); 
		 
	  });//live
	   
/////////////////////////////end actuacionMap////////////////////////////////////////////////





});// JavaScript Document