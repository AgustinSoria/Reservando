
var expect = chai.expect;
describe('Test de reserva de horarios', function () {
    let restaurantTest = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]);

    it('Se reserva el horario de 14:30, la longitud del array horarios disponibles disminuye de 3 a 2.', function () {
        expect(restaurantTest.horarios.length).to.eql(3);
        restaurantTest.reservarHorario("14:30");
        expect(restaurantTest.horarios.length).to.eql(2);
    })
    it('Se vuelve a reservar el horario de 14:30, como no está disponible, la longitud del array horarios disponibles se mantiene igual.', function () {
        expect(restaurantTest.horarios.length).to.eql(2);
        restaurantTest.reservarHorario("14:30");
        expect(restaurantTest.horarios.length).to.eql(2);

    })
    it('Se reserva sin pasar parámetros, la longitud del array horarios disponibles se mantiene igual.', function () {
        expect(restaurantTest.horarios.length).to.eql(2);
        restaurantTest.reservarHorario();
        expect(restaurantTest.horarios.length).to.eql(2);
    })

});


describe('Test de puntuacion', function () {


    it('Dado un restaurant con las calificaciones 9, 8, 5, 5, 9, la puntuación (que es el promedio de ellas) da 7.2.', function () {
        let restaurantTest = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]);
        expect(restaurantTest.obtenerPuntuacion()).to.eql(7.2);

    })

    it('Dado un restaurant sin calificaciones, la puntuación es 0.', function () {
        let restaurantTest = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", []);
        expect(restaurantTest.obtenerPuntuacion()).to.eql(0);
    })

    it('Dado un restaurant con las calificaciones 9, 8, 5, 5, 9, la puntuación (que es el promedio de ellas) da 7.5 luego de una nueva calificación de 9.', function () {
        let restaurantTest = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9, 9]);
        expect(restaurantTest.obtenerPuntuacion()).to.eql(7.5);

    })

})

describe('Test de calificación', function () {


    it('siendo el promedio 7,2 al agregar otra calificacion con nota superior a 10, se mantiene el promedio en 7,2.', function () {
        let restaurantTest = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]);
        restaurantTest.calificar(12);
        expect(restaurantTest.obtenerPuntuacion()).to.eql(7.2);
    })

    it('siendo el promedio 7,2 al agregar otra calificacion con nota inferior a 0, se mantiene el promedio en 7,2.', function () {
        let restaurantTest = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]);
        restaurantTest.calificar(-8);
        expect(restaurantTest.obtenerPuntuacion()).to.eql(7.2);
    })

})

describe('Test de busqueda por ID', function () {

    it('Se selecciona el restaurant con ID 13, y se espera como resultado dicho restaurant.', function () {
        let restaurantTest = listado;
        expect(restaurantTest.buscarRestaurante(13)).to.eql(restaurantTest.restaurantes[12]);
    })

    // testear un id que no este en el arreglo

})

describe('Test de obtención de restaurante por filtros', function () {


    it('Se filtra sin pasar parametros y se espera que el array se mantenga igual al orginal.', function () {
        let restaurantTest = listado.restaurantes;
        let restaurantesFiltro = listado.obtenerRestaurantes(null, null, null);
        expect(restaurantTest).to.eql(restaurantesFiltro);
    });


    it('Se filtra por rubro Asiático y se espera solamente aquellos que cumplan esta condición.', function () {
        var restaurantesFiltro = listado.obtenerRestaurantes("Asiática", null, null);
        // console.log(listado);
        let pushControl = [];
        listado.restaurantes.forEach(restaurante => {
            if ((restaurante.rubro === "Asiática")) {
                pushControl.push(restaurante);
            }

        });
        expect(restaurantesFiltro).to.eql(pushControl);
        // console.log(pushControl);
        // console.log(restaurantesFiltro);
    })

    it('Se filtra por rubro "Asiatico" más ciudad "Nueva York, se espera solamente aquellos que cumplan estas condiciones.', function () {
        var restaurantesFiltro = listado.obtenerRestaurantes("Asiática", "Nueva York", null);
        // console.log(restaurantesFiltro);
        let pushControl = [];

        listado.restaurantes.forEach(restaurante => {
            listado.restaurantes.forEach
            if ((restaurante.rubro === "Asiática") & (restaurante.ubicacion === "Nueva York")) {
                pushControl.push(restaurante);
            }

        });
        //  console.log(pushControl);
        expect(restaurantesFiltro).to.eql(pushControl);

    })

});

describe('Test de reserva y cálculo de precios base y con descuento', function () {
    it('Se calcula correctamente el precio base', function () {
        var reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        expect(reserva1.calcularPrecioBase()).to.equal(2800);
    });

    it('Se calcula correctamente el precio final', function () {
        var reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        expect(reserva1.calcularPrecioFinal()).to.equal(2450);
    });

    it('Se calcula bien el precio final con un descuento de $200', function () {
        var reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
        expect(reserva2.calcularPrecioFinal()).to.equal(100);
    });

    it('Se calcula bien el precio final con un descuento del 15%', function () {
        var reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES15");
        expect(reserva2.calcularPrecioFinal()).to.equal(255);
    });

});