# language: es
Característica: Búsqueda de vuelos en la home
  Como usuario de Aeroméxico
  Quiero buscar vuelos desde la página principal
  Para encontrar opciones de viaje

  Antecedentes:
    Dado que estoy en la página principal

  Escenario: La página carga con el título correcto
    Entonces el título de la página contiene "Aeroméxico"

  Escenario: El formulario muestra sus campos principales
    Entonces el campo de origen es visible
    Y el campo de destino es visible
    Y el botón de búsqueda es visible

  Escenario: El botón Buscar está deshabilitado sin completar el formulario
    Entonces el botón de búsqueda está deshabilitado

  Escenario: Completar el formulario habilita el botón Buscar
    Cuando completo origen "Ciudad de México", destino "Guadalajara" y selecciono una fecha
    Entonces el botón de búsqueda está habilitado

  Escenario: Buscar vuelos con el formulario completo
    Cuando completo origen "Ciudad de México", destino "Guadalajara" y selecciono una fecha
    Y presiono el botón de búsqueda
    Entonces se dispara la búsqueda de vuelos
