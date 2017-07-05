angular
  .module('cine')
  .factory('Horarios', [function(){
    
    function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
    }

    function generar(pelicula, complejo) {
      console.log(complejo);
      var horarios = [];
      var horaAcumulada = complejo.horaApertura; //new Date(2017,6,07,9,0,0,0);
      var horaCierre = complejo.horaCierre; //new Date(2017,6,07,23,40,0,0);

      while(addMinutes(horaAcumulada,complejo.duracionPublicidad+pelicula.duracion).getTime() <= addMinutes(horaCierre,complejo.duracionToleranciaUltimaFuncion).getTime()){
        horarios.push(horaAcumulada);
        horaAcumulada = addMinutes(horaAcumulada, complejo.duracionPublicidad);
        horaAcumulada = addMinutes(horaAcumulada, pelicula.duracion);
        horaAcumulada = addMinutes(horaAcumulada, complejo.duracionEntreFunciones);                             
      }

      return horarios;
    }

    return {
      generar : generar     
    }
   
  }]);