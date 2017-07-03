angular
  .module('cine')
  .factory('Horarios', [function(){
    
    function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
    }

    function generar(pelicula, complejo) {
      console.log(complejo);
      var horarios = [];
      var horaAcumulada = new Date(2017,6,07,9,0,0,0);//complejo.horaApertura;
      var horaCierre = new Date(2017,6,07,23,40,0,0);//complejo.horaCierre;

      while(addMinutes(horaAcumulada,complejo.duracionPublicidad+pelicula.duracion).getTime() <= addMinutes(horaCierre,30).getTime()){//(horaAcumulada.getTime() <= horaCierre.getTime()){
        horarios.push(horaAcumulada);
        horaAcumulada = addMinutes(horaAcumulada, complejo.duracionPublicidad);
        horaAcumulada = addMinutes(horaAcumulada, pelicula.duracion);
        horaAcumulada = addMinutes(horaAcumulada, complejo.duracionEntreFunciones);        
       /* if(addMinutes(horaAcumulada,complejo.duracionPublicidad+pelicula.duracion).getTime() > addMinutes(horaCierre,30).getTime()){
          break;
        }*/              
      }

      return horarios;
    }

    return {
      generar : generar     
    }
   
  }]);
