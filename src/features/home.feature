# language: es
Característica: Búsqueda de vuelos en la página principal
  Como viajero de Aeroméxico
  Quiero buscar vuelos disponibles según mis criterios de viaje
  Para encontrar y seleccionar las mejores opciones para mi itinerario

  Antecedentes:
    Dado que el usuario se encuentra en la página principal de Aeroméxico

  Escenario: Carga inicial de la página y estado del formulario
    Entonces el título de la página debe contener "Aeroméxico"
    Y el formulario de búsqueda debe estar disponible con la opción de búsqueda deshabilitada

  Escenario: Habilitación de la búsqueda al completar datos obligatorios
    Cuando el usuario ingresa el origen "Ciudad de México", el destino "Guadalajara" y una fecha válida
    Entonces la opción para realizar la búsqueda debe estar habilitada

  Escenario: Búsqueda exitosa de vuelos con formulario completo
    Cuando el usuario busca un vuelo desde "Ciudad de México" hacia "Guadalajara" para una fecha válida
    Entonces el sistema debe procesar la solicitud y mostrar los vuelos disponibles para la ruta seleccionada
