angular
  .module('cine')
  .factory('Salas', [function(){
    var data = null;
    
    var seatProps = {
      id: 0,
      caption: 0,
      checked: false,
      booked: false,
      pasillo: false
    };

    function createSeats(rows, cols) {
      var arr = [[]];
        var seatIndex = 0;
        for (var row = 0; row < rows; row++) {
          arr[row] = [];
            for(var col=0; col < cols; col++) {
              var seat = angular.extend({}, seatProps, {
                    id: seatIndex,
                    caption: seatIndex,
                    booked: seatIndex < 5, // 0 to 5 booked
                    pasillo: col == 2 //ejemplo pasillo 2
                });
              arr[row][col] = seat;
                seatIndex++;
            }
        }
        return arr;
    }

    return {
      crear : createSeats     
    }
   
  }]);
