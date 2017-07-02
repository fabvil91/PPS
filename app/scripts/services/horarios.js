angular
  .module('cine')
  .factory('Horarios', [function(){
    
    function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
    }

    function generar(pelicula, complejo) {
      var horarios = [];
      var horaAcumulada = new Date(2017,6,07,9,0,0,0);//complejo.horaApertura;
      var horaCierre = new Date(2017,6,07,23,40,0,0);//complejo.horaCierre;

      while(horaAcumulada.getTime() <= horaCierre.getTime()){
        horaAcumulada = addMinutes(horaAcumulada, complejo.duracionPublicidad);
        horaAcumulada = addMinutes(horaAcumulada, pelicula.duracion);
        horarios.push(horaAcumulada);
        horaAcumulada = addMinutes(horaAcumulada, complejo.duracionEntreFunciones);
      }

      return horarios;
    }

    return {
      generar : generar     
    }
   
  }]);
