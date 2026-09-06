// ============================================================
// BANCO DE PREGUNTAS OFICIAL: TRANSPORTE DE PASAJEROS (COLECTIVO D1)
// 218 Preguntas clasificadas por las 7 categorÃ­as de la Ruleta Colectivo
// Incluye 113 imÃ¡genes reales asociadas
// ============================================================

const COLECTIVO_QUESTIONS = [
    {
        "id":  1,
        "category":  "pasajeros",
        "question":  "El riesgo en la vía pública surge como resultado de diversos factores, ¿cuáles son?",
        "options":  [
                        "A. Vehicular y Ambiental.",
                        "B. Humano y Vehicular.",
                        "C. Humano, Vehicular y Ambiental."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  2,
        "category":  "normativa",
        "question":  "¿A qué factor se deben la mayoría de los siniestros viales?",
        "options":  [
                        "A. Al humano.",
                        "B. Al vehicular.",
                        "C. Al ambiental."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  3,
        "category":  "velocidad",
        "question":  "A fin de aumentar la propia seguridad y la de los demás, ¿a qué se debería poner atención durante la circulación?",
        "options":  [
                        "A. Al estado del pavimento y al clima, en especial.",
                        "B. A las condiciones en que se encuentran: el automóvil, la infraestructura vial, las condiciones climáticas y la persona que conduce.",
                        "C. Ninguna de las anteriores."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  4,
        "category":  "pasajeros",
        "question":  "El factor ambiental es el principal factor de riesgo ya que las colisiones, en su mayoría, se deben a las condiciones meteorológicas o del camino",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  5,
        "category":  "pasajeros",
        "question":  "Por lo general, las fallas mecánicas se deben a conductas negligentes por parte de las personas que no se ocupan de la verificación del estado del vehículo:",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  6,
        "category":  "normativa",
        "question":  "¿A qué se denomina incidente de tránsito o incidente vial?",
        "options":  [
                        "A. Hecho que puede ser evitado, en el cual se produce daño a persona o cosa, en ocasión de circulación en la vía pública.",
                        "B. Hecho impredecible e inevitable en ocasión de circulación en la vía pública.",
                        "C. Hecho, evitable o no, que involucra daños a terceros."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  7,
        "category":  "prioridad",
        "question":  "Mirar hacia ambos lados al llegar a una intersección de calles de un solo sentido, ¿es un ejemplo de conducción anticipada?",
        "options":  [
                        "A. Sí, porque se está obligado por normativa.",
                        "B. No, porque se trata de una conducción eficiente.",
                        "C. Sí, porque prevé que todos podemos cometer errores."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  8,
        "category":  "pasajeros",
        "question":  "“Como usuarios de la vía pública estamos obligados a no entorpecer injustificadamente la circulación y a no causar peligro, perjuicios o molestias innecesarias a las personas o daños a los bienes.” ¿Es correcta esta premisa?",
        "options":  [
                        "A. Sí, independientemente del tipo de movilidad elegido.",
                        "B. No, los peatones son usuarios de la vía pública y no están obligados.",
                        "C. Sí pero sólo si estamos conduciendo un vehículo."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  9,
        "category":  "velocidad",
        "question":  "¿A qué se denomina conducción eficiente?",
        "options":  [
                        "A. A una conducción que disminuya los riesgos y la gravedad de los siniestros, y logre un menor consumo de combustible.",
                        "B. A una conducción que logre llegar a destino en el menor tiempo posible.",
                        "C. A una conducción que mantenga durante todo el trayecto la misma velocidad."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  10,
        "category":  "metrobus",
        "question":  "En esta situación, ¿es correcto que el vehículo avance?",
        "options":  [
                        "A. Sí, porque por allí no circulan peatones y no hay peligro.",
                        "B. No, porque aún hay peatones cruzando de un lado al otro de la arteria.",
                        "C. Sí, aunque haya peatones cruzando tiene el espacio suficiente para avanzar."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/10.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  11,
        "category":  "prioridad",
        "question":  "¿Cómo debe proceder, si al llegar a esta intersección, se desea continuar en línea recta?",
        "options":  [
                        "A. Detener el vehículo para que el peatón termine de cruzar y, antes de avanzar, hacer contacto visual con los peatones que aún no comenzaron a cruzar, aun sabiendo que obstruiré por un momento la bocacalle.",
                        "B. Avanzar porque la luz verde del semáforo  me habilita pero tocando bocina para que los peatones no se distraigan. Es importante no obstruir la bocacalle."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/11.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  12,
        "category":  "prioridad",
        "question":  "Dadas las características de esta intersección, ¿el peatón también tiene prioridad?",
        "options":  [
                        "A. No, pero si el peatón se encuentra cruzando, el conductor debe dejarlo pasar para no producir un siniestro vial.",
                        "B. Sí, siempre."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/12.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  13,
        "category":  "prioridad",
        "question":  "Frente a la siguiente situación, ¿qué actitud debe tomar usted como conductor/a?",
        "options":  [
                        "A. Hacer contacto visual con la peatona y en el caso de que comience a cruzar cederle el paso.",
                        "B. Avanzar ya que se tiene prioridad sobre la peatona por circular desde la derecha.",
                        "C. Ambas respuestas, la A y la B, son incorrectas."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/13.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  14,
        "category":  "pasajeros",
        "question":  "Si ud. conduce un vehículo, ¿qué conducta debe adoptar en la siguiente situación?",
        "options":  [
                        "A. Priorizar indefectiblemente la circulación de peatones.",
                        "B. Realizar una guiñada para advertir su preferencia de avance.",
                        "C. Completar la maniobra como sea posible, para disminuir su tiempo de permanencia sobre la vereda."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/14.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  15,
        "category":  "prioridad",
        "question":  "En esta intersección, ¿quién tiene prioridad de paso?",
        "options":  [
                        "A. La persona.",
                        "B. El taxi.",
                        "C. Es indistinto."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/15.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  16,
        "category":  "prioridad",
        "question":  "¿Qué distancia lateral debe dejar respecto de la bicicleta en caso de querer adelantarla?",
        "options":  [
                        "A. Al menos, un metro y medio.",
                        "B. Al menos, medio metro.",
                        "C. Lo suficiente para no tocarla."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/16.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  17,
        "category":  "prioridad",
        "question":  "En esta intersección sin semáforos, donde el automóvil gira a la derecha, ¿quién tiene prioridad de paso?",
        "options":  [
                        "A. El automóvil, porque circula por la mano derecha.",
                        "B. La bicicleta, porque el automóvil pierde la prioridad al querer girar.",
                        "C. La bicicleta, porque al circular por la ciclovía siempre tiene prioridad."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/17.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  18,
        "category":  "prioridad",
        "question":  "Si usted pretende cruzar esta intersección, ¿hacia qué lado debe mirar?",
        "options":  [
                        "A. Hacia la derecha.",
                        "B. Hacia la izquierda.",
                        "C. Hacia ambos lados."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/18.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  19,
        "category":  "metrobus",
        "question":  "La autoridad de tránsito ¿puede retener la licencia de conducir a quien conduzca un vehículo por este carril, si no es un colectivo o un vehículo de emergencia?",
        "options":  [
                        "A. Sí, ya que constituye una falta de tránsito que amerita esa sanción.",
                        "B. Sólo si perjudica la circulación de los colectivos.",
                        "C. Nunca, ya que la licencia de conducir es un documento personal. Sólo puede labrar un acta de infracción."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/19.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  20,
        "category":  "metrobus",
        "question":  "¿Qué vehículos pueden circular por el carril señalizado en la imagen?",
        "options":  [
                        "A. Todos los transportes de pasajeros.",
                        "B. Sólo colectivos entre las 07 h y las 21 h.",
                        "C. Colectivos autorizados y vehículos destinados al servicio de emergencia en cumplimiento de sus funciones."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/20.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  21,
        "category":  "metrobus",
        "question":  "¿Qué son los carriles exclusivos?",
        "options":  [
                        "A. Vías con un único sentido de circulación.",
                        "B. Bandas longitudinales demarcadas en la calzada, destinadas a la circulación de determinados vehículos.",
                        "C. Lugar por donde circulan ambulancias, bomberos y/o vehículos policiales, en cumplimiento o no de sus funciones."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  22,
        "category":  "prioridad",
        "question":  "El auto señalizado con un círculo rojo, ¿tiene permitido girar a la derecha en el próximo cruce?",
        "options":  [
                        "A. Sí, siempre que señalice la maniobra con anticipación.",
                        "B. No, ya que para realizarlo debería invadir los carriles exclusivos.",
                        "C. Sólo si lo realiza fuera del horario de restricción de los carriles exclusivos."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/22.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  23,
        "category":  "velocidad",
        "question":  "Frente a la siguiente situación de emergencia, ¿qué deben hacer quienes circulen en su proximidad?",
        "options":  [
                        "A. Aumentar la velocidad para no ser un obstáculo a este vehículo.",
                        "B. Avisar a otros conductores de la presencia de este vehículo, usando repetidamente la bocina.",
                        "C. Dar lugar a este vehículo, despejar el carril de emergencias y si fuera necesario detenerse."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/23.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  24,
        "category":  "metrobus",
        "question":  "El siguiente símbolo indica que se trata de un carril que debe ser liberado cuando se aproxima un vehículo en emergencia",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/24.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  25,
        "category":  "prioridad",
        "question":  "Frente a la siguiente situación de emergencia, ¿hacia qué sector es recomendable que se aparten los vehículos de la imagen para facilitar el paso a la ambulancia?",
        "options":  [
                        "A. Ambos hacia su derecha.",
                        "B. El único que debería apartarse es el auto 2 hacia su derecha.",
                        "C. El auto 1 hacia su izquierda y el 2 hacia su derecha."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/25.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  26,
        "category":  "prioridad",
        "question":  "Frente a la siguiente situación de emergencia, ¿hacia qué sector es recomendable que se aparten los vehículos de la imagen para facilitar el paso a la ambulancia?",
        "options":  [
                        "A. El único que debería apartarse es el auto 2 hacia su derecha.",
                        "B. Todos hacia su derecha.",
                        "C. El auto 1 hacia su izquierda, mientras que el 2 y 3 hacia su derecha."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/26.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  27,
        "category":  "prioridad",
        "question":  "Ud. se encuentra frente a la siguiente situación donde el/la conductor/a toca repetidamente la bocina, ¿qué debe hacer si se encuentra conduciendo en su proximidad?",
        "options":  [
                        "A. Cederle el paso, ya que está indicando que se encuentra en emergencia.",
                        "B. Brindar mi colaboración, ya que está indicando que el vehículo tiene un desperfecto mecánico.",
                        "C. Alertar a otros conductores, tocando repetidamente la bocina, que ese vehículo cruzará un semáforo en rojo."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/27.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  28,
        "category":  "prioridad",
        "question":  "En un cruce de dos calles sin semáforo, frente a la siguiente situación, ¿quién tiene prioridad de paso?",
        "options":  [
                        "A. El vehículo A, ya que está circulando por la derecha.",
                        "B.  Los vehículos B, ya que son varios los que circulan por esa calle.",
                        "C.  El vehículo A, ya que está saliendo del paso a nivel ferroviario."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/28.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  29,
        "category":  "prioridad",
        "question":  "En un cruce de dos calles sin semáforo, frente a la siguiente situación, ¿quién tiene prioridad de paso?",
        "options":  [
                        "A. El vehículo A.",
                        "B.  El vehículo B."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/29.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  30,
        "category":  "seguridad",
        "question":  "El vehículo señalado con un círculo rojo, ¿circula correctamente?",
        "options":  [
                        "A. Sí, porque en esta vía las luces deben estar encendidas.",
                        "B. Sí, ya que mantiene una distancia prudencial respecto del resto de los vehículos.",
                        "C. No, dado que está circulando por la banquina."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/30.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  31,
        "category":  "pasajeros",
        "question":  "Un vehículo podrá circular por la franja paralela a la calzada, indicada en la imagen, sólo cuando el flujo vehicular esté absolutamente congestionado.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/31.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  32,
        "category":  "prioridad",
        "question":  "El vehículo A pretende cambiar de carril hacia su derecha, ¿cuál de los dos vehículos tiene prioridad?",
        "options":  [
                        "A. El vehículo A.",
                        "B. El vehículo B."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/32.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  33,
        "category":  "prioridad",
        "question":  "Es obligatorio al finalizar un adelantamiento...",
        "options":  [
                        "A. Permanecer en el carril ocupado, independientemente de la fluidez del tránsito.",
                        "B. Incorporarse al carril derecho, si éste se encuentra libre, de forma gradual y sin obstaculizar la fluidez de tránsito.",
                        "C. Incorporarse al carril derecho, aunque ésto implique que otro vehículo deba modificar su velocidad."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  34,
        "category":  "pasajeros",
        "question":  "¿Está permitido sobrepasar a otro vehículo en este lugar?",
        "options":  [
                        "A. Sí, salvo que haya una señal que indique lo contrario.",
                        "B. No, está prohibido por normativa.",
                        "C. Sólo en el caso de que no perjudique la circulación de otros vehículos."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/34.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  35,
        "category":  "prioridad",
        "question":  "Cuando varios vehículos circulan encolumnados, ¿cuál de ellos tiene prioridad para realizar el sobrepaso?",
        "options":  [
                        "A. El que lo intente primero.",
                        "B. El último de la fila.",
                        "C. El que circula más próximo al vehículo que se desea sobrepasar."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  36,
        "category":  "prioridad",
        "question":  "Frente a esta situación de obstrucción de vía, ¿qué debe hacer el vehículo señalado?",
        "options":  [
                        "A. Debe ceder el paso al vehículo que circula en el sentido contrario.",
                        "B. Tiene prioridad de paso sobre el otro vehículo.",
                        "C. La normativa no establece prioridad de paso ante esta situación."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/36.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  37,
        "category":  "prioridad",
        "question":  "Si al llegar a una intersección sin semáforos, se encuentra que el vehículo que está delante suyo está detenido esperando poder doblar hacia la izquierda, ¿qué debe hacer si ud. desea continuar en línea recta?",
        "options":  [
                        "A. Sobrepasarlo por la derecha de manera segura, colocando luz de giro y observando por los espejos retrovisores.",
                        "B. Sobrepaso por la izquierda, colocando la luz de giro y observando por los espejos retrovisores.",
                        "C. Tocarle bocina para indicarle que debe seguir."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  38,
        "category":  "velocidad",
        "question":  "¿Qué peligro debe preverse al sobrepasar un colectivo detenido?",
        "options":  [
                        "A. Que algunas personas pudieron haber quedado ocultas tras él y éstas podrían intentar cruzar por delante o detrás del mismo.",
                        "B. Que los/las pasajeros/as bajen por la parte izquierda del colectivo detenido.",
                        "C. Ninguno, mientras no sobrepase la velocidad máxima permitida por la Ley."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  39,
        "category":  "senales",
        "question":  "¿Se puede traspasar la siguiente señal horizontal?",
        "options":  [
                        "A. Sí, porque ordena la circulación de carriles e indica que se puede sobrepasar a otro vehículo.",
                        "B. Sólo cuando la vía tiene dos carriles por sentido de circulación.",
                        "C. No, porque indica prohibición de sobrepaso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/39.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  40,
        "category":  "prioridad",
        "question":  "Como norma general, ¿dónde está prohibido el sobrepaso de un vehículo?",
        "options":  [
                        "A. Donde la delimitación de carriles es de trazo continuo.",
                        "B. En curvas, encrucijadas, pasos a nivel o puentes.",
                        "C. Ambas respuestas, A y B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  41,
        "category":  "pasajeros",
        "question":  "En este lugar, ¿está permitido sobrepasar a otro vehículo?",
        "options":  [
                        "A. Sí, salvo que haya una señal que indique lo contrario.",
                        "B. No, está prohibido por normativa.",
                        "C. Sólo si no se perjudica la circulación de otros vehículos."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/41.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  42,
        "category":  "velocidad",
        "question":  "Al advertir que está por ser sobrepasado, ¿cuál debería ser su actitud?",
        "options":  [
                        "A. Circular por la banquina.",
                        "B. Circular por la derecha de la calzada y mantenerse. En el caso de ser necesario, reducir la velocidad.",
                        "C. Ambas respuestas, A y B, son correctas."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  43,
        "category":  "prioridad",
        "question":  "El carril de sobrepaso en una autopista sirve para...",
        "options":  [
                        "A. Circular por él cuando a la derecha existe otro carril disponible.",
                        "B. Circular por él siempre que se conduzca a la mayor velocidad permitida.",
                        "C. Realizar maniobras de sobrepaso."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  44,
        "category":  "velocidad",
        "question":  "El \"carril de aceleración\" sirve para acelerar de manera gradual, hasta conseguir la velocidad adecuada, para incorporarse a una autopista o vía rápida.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  45,
        "category":  "prioridad",
        "question":  "¿Quién tiene prioridad de paso en el cruce de estas dos calles?",
        "options":  [
                        "A. Al vehículo A, ya que es un vehículo de gran porte.",
                        "B. Al vehículo B, ya que circula por la derecha.",
                        "C. Al vehículo A, ya que circula por la derecha."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/45.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  46,
        "category":  "prioridad",
        "question":  "El vehículo señalizado tiene permitido girar a la izquierda en este cruce que no tiene semáforo.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/46.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  47,
        "category":  "prioridad",
        "question":  "¿Qué vehículo tiene prioridad de paso en esta intersección sin semáforo?",
        "options":  [
                        "A. El vehículo A porque circula por una avenida.",
                        "B. El vehículo B porque circula por la derecha.",
                        "C. Es indistinto ya que es una esquina sin semáforo."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/47.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  48,
        "category":  "prioridad",
        "question":  "De acuerdo a la Ley N° 2148, ¿está permitido realizar el siguiente giro?",
        "options":  [
                        "A. No, ya que sólo está permitido hacer ese giro si existe un semáforo que lo habilita.",
                        "B. Sí, ya que es una intersección no semaforizada.",
                        "C. No, ya que es una vía de doble sentido de circulación."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/48.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  49,
        "category":  "prioridad",
        "question":  "De acuerdo a la Ley N° 2148, ¿está permitido realizar este giro?",
        "options":  [
                        "A. No, porque al ser una intersección semaforizada pero sin giro, no está permitido realizar esa maniobra.",
                        "B. Sí, ya que el semáforo está en verde.",
                        "C. No, ya que es una vía de doble sentido de circulación."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/49.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  50,
        "category":  "prioridad",
        "question":  "De acuerdo a la Ley N° 2148, en encrucijadas sin semáforos, ¿cuál es el orden de prioridad de paso según el tipo de arteria?",
        "options":  [
                        "A. 1° Pasaje - 2° Calle - 3° Avenida.",
                        "B. 1° Avenida - 2° Calle - 3° Pasaje.",
                        "C. Es indistinto, ya que el vehículo que circula por la derecha siempre tiene prioridad."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  51,
        "category":  "prioridad",
        "question":  "El vehículo con un círculo de color rojo quería girar a la derecha y, por error continuó en línea recta, de modo que:",
        "options":  [
                        "A. Puede circular marcha atrás, porque es un tramo corto el que tiene que recorrer, y efectuar el giro.",
                        "B. Puede dar la vuelta en U para tomar el sentido contrario y así efectuar el giro programado.",
                        "C. Ambas respuestas, A y B, son incorrectas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/51.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  52,
        "category":  "prioridad",
        "question":  "En la siguiente situación, ¿a quién le corresponde la prioridad de paso?",
        "options":  [
                        "A. Al vehículo A, ya que circula por la derecha.",
                        "B. Al vehículo B, ya que circula por una avenida.",
                        "C. Es indistinto."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/52.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  53,
        "category":  "prioridad",
        "question":  "¿Quién tiene prioridad de paso en una rotonda?",
        "options":  [
                        "A. El vehículo que circule por la derecha.",
                        "B. El vehículo que pretende acceder a la rotonda.",
                        "C. El vehículo que se encuentra dentro de la calzada circular."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  54,
        "category":  "prioridad",
        "question":  "El vehículo señalizado quiere incorporarse al tránsito, ¿tiene prioridad de paso sobre los otros vehículos que están circulando por esta arteria?",
        "options":  [
                        "A. No, porque los vehículos de la arteria, a la que se pretende ingresar, están circulando.",
                        "B. Sí, porque se encuentra a la derecha.",
                        "C. Sí, porque señalizó su maniobra."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/54.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  55,
        "category":  "prioridad",
        "question":  "El vehículo señalizado quiere incorporarse al tránsito, ¿tiene prioridad de paso sobre los otros vehículos que están detenidos en la arteria?",
        "options":  [
                        "A. No. La prioridad es de los otros vehículos, independientemente si están detenidos o circulando.",
                        "B. Sí, porque se encuentra el tránsito detenido y deben cederle el paso.",
                        "C. No. La Ley no menciona nada al respecto, sólo se expresa sobre las prioridades en intersecciones no semaforizadas."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/55.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  56,
        "category":  "prioridad",
        "question":  "En esta pendiente estrecha, ¿cuál de los dos vehículos tiene prioridad de paso?",
        "options":  [
                        "A. El vehículo A.",
                        "B. El vehículo B."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/56.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  57,
        "category":  "velocidad",
        "question":  "Según la Ley N° 2148, ¿cuál es la velocidad máxima permitida para un taxi, remis o automóvil de plataforma de viajes al circular por una calle de la Ciudad de Buenos Aires, salvo señalización en contrario?",
        "options":  [
                        "A. 30 km/h.",
                        "B. 40 km/h.",
                        "C. 60 km/h."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  58,
        "category":  "velocidad",
        "question":  "De acuerdo con las normas generales de la Ciudad, ¿cuál es la velocidad mínima permitida para un taxi, remis o automóvil de plataforma de viajes al circular por una calle, considerando que el límite máximo es de 40 km/h?",
        "options":  [
                        "A. 15 km/h.",
                        "B. 20 km/h.",
                        "C. 30 km/h."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  59,
        "category":  "velocidad",
        "question":  "Según la Ley N° 2148, ¿cuál es la velocidad máxima permitida para un para un taxi, remis o automóvil de plataforma de viajes al circular por las avenidas de la Ciudad de Buenos Aires, salvo señalización en contrario?",
        "options":  [
                        "A. 45 km/h.",
                        "B. 50 km/h.",
                        "C. 60 km/h."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  60,
        "category":  "velocidad",
        "question":  "Según la Ley N° 2148, ¿cuál es la velocidad mínima permitida en avenidas para taxis, remises o automóviles de plataformas de viaje?",
        "options":  [
                        "A. 40 km/h.",
                        "B. 30 km/h.",
                        "C. 20 km/h."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  61,
        "category":  "senales",
        "question":  "Al circular con un taxi, remis o automóvil de plataforma de viajes por una avenida porteña, ¿qué rango de velocidad debe mantener el conductor para cumplir con la ley si no hay cartelería específica?",
        "options":  [
                        "A. Entre 20 km/h y 40 km/h.",
                        "B. Entre 30 km/h y 60 km/h.",
                        "C. Entre 35 km/h y 70 km/h."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  62,
        "category":  "prioridad",
        "question":  "Al realizar una maniobra de sobrepaso en una vía rápida o autopista de la Ciudad, ¿está permitido exceder el límite de velocidad máxima fijado para esa arteria?",
        "options":  [
                        "A. Sí, pero solo durante el tiempo que dure el desplazamiento lateral.",
                        "B. No, la maniobra debe realizarse siempre dentro de los límites de velocidad establecidos por la ley.",
                        "C. Sí, siempre que no se ponga en riesgo a terceros."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  63,
        "category":  "velocidad",
        "question":  "¿Cuál es la velocidad máxima permitida en este tramo de calle?",
        "options":  [
                        "A. 40 km/h.",
                        "B. 20 km/h.",
                        "C. 30 km/h."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/63.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  64,
        "category":  "velocidad",
        "question":  "Al pretender abandonar una autopista o semiautopista, ¿cuándo se debe reducir la velocidad?",
        "options":  [
                        "A. Poco antes de abandonar la misma.",
                        "B. Cuando se haya entrado en el carril de desaceleración.",
                        "C. Cuando se ingresa a la nueva vía de circulación."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  65,
        "category":  "velocidad",
        "question":  "Según la Ley N° 2148, ¿cuál es la velocidad máxima a la que pueden circular los vehículos destinados al servicio de transporte de personas con movilidad reducida en una autopista?",
        "options":  [
                        "A. 60 Km/h.",
                        "B. 80 Km/h.",
                        "C. 70 Km/h."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  66,
        "category":  "velocidad",
        "question":  "Según las normas generales, ¿cuál es la velocidad máxima permitida para taxis, remises o automóviles de plataforma de viajes, al circular por las autopistas dentro de la Ciudad de Buenos Aires?",
        "options":  [
                        "A. 100 km/h.",
                        "B. 110 km/h.",
                        "C. 130 km/h."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  67,
        "category":  "velocidad",
        "question":  "De acuerdo a las normas generales de circulación en la Ciudad de Buenos Aires, ¿cómo se determinan los límites de velocidad mínima en las distintas arterias?",
        "options":  [
                        "A. Son fijos de 35 km/h para todas las avenidas.",
                        "B. Se establecen a la mitad de los límites máximos fijados para cada tipo de arteria.",
                        "C. Solo rigen en autopistas y vías rápidas."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  68,
        "category":  "velocidad",
        "question":  "¿Qué se conoce como velocidad precautoria?",
        "options":  [
                        "A. A la velocidad adecuada a las circunstancias, que permite mantener el total dominio del vehículo sin generar riesgo.",
                        "B. La circulación a la velocidad mínima establecida para una vía.",
                        "C. La circulación a no más de 30 km/h en calles y de 45 km/h en avenidas."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  69,
        "category":  "prioridad",
        "question":  "¿A qué se denomina “distancia de seguridad”?",
        "options":  [
                        "A. A la distancia mínima que se debe mantener con el vehículo que circula adelante para tener un mayor margen de reacción y en caso de frenada repentina no se colisione con él.",
                        "B. A la distancia que se debe mantener con el vehículo que circula en el carril paralelo, para realizar un sobrepaso seguro.",
                        "C. A la distancia que recorre el vehículo desde que el conductor percibe una situación de peligro hasta que acciona el freno."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  70,
        "category":  "pasajeros",
        "question":  "¿Cuál es la “distancia mínima de seguridad” a la que debe circular el vehículo A con respecto al B?",
        "options":  [
                        "A. A una diferencia de dos segundos.",
                        "B. A una distancia de 2 metros.",
                        "C. No existe una determinada. Sólo está prohibido circular inmediatamente detrás, sin dejar distancia."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/70.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  71,
        "category":  "pasajeros",
        "question":  "¿A qué se denomina “tiempo de reacción”?",
        "options":  [
                        "A. Al tiempo que pasa desde que se empieza una maniobra hasta que se termina.",
                        "B. Al tiempo que pasa desde que se enciende el vehículo hasta que se empieza a circular.",
                        "C. Al tiempo que pasa entre que se percibe una situación y se realiza una acción como respuesta."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  72,
        "category":  "pasajeros",
        "question":  "¿A qué se denomina \"distancia de reacción\"?",
        "options":  [
                        "A. A la distancia que recorre un vehículo hasta su detención.",
                        "B. A la distancia que debe guardar un vehículo, respecto de otro, para poder maniobrar.",
                        "C. A la distancia que recorre un vehículo desde que se percibe una situación y se realiza una acción como respuesta."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  73,
        "category":  "velocidad",
        "question":  "Circular por debajo del límite mínimo de velocidad puede causar incidentes.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  74,
        "category":  "velocidad",
        "question":  "¿Qué relación existe entre la velocidad y el campo visual de quien conduce?",
        "options":  [
                        "A. A mayor velocidad, menor campo visual.",
                        "B. A menor velocidad, menor campo visual.",
                        "C. A mayor velocidad, mayor campo visual."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  75,
        "category":  "velocidad",
        "question":  "Los excesos de velocidad...",
        "options":  [
                        "A. En la actualidad apenas tienen incidencia en los incidentes, debido a la seguridad de los vehículos.",
                        "B. Son responsables de la mayoría de los incidentes solamente en vías de doble sentido.",
                        "C. Son responsables de la mayoría de los incidentes fatales cualquiera sea la vía de circulación."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  76,
        "category":  "velocidad",
        "question":  "Circular a velocidad constante y dentro de los límites establecidos por la Ley, además de minimizar las posibilidades de provocar un siniestro vial, puede optimizar el consumo de combustible en un vehículo.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  77,
        "category":  "velocidad",
        "question":  "Circular a mayor velocidad de la precautoria implica que aumenten las posibilidades de que un siniestro vial sea más grave.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  78,
        "category":  "prioridad",
        "question":  "¿Cómo es recomendable proceder frente a esta circunstancia?",
        "options":  [
                        "A. Sintonizar un programa radial donde un/a locutor/a hable sin música constante, ya que colabora a contrarrestar los efectos de la fatiga y somnolencia.",
                        "B. Interrumpir el viaje y hacer una parada de descanso.",
                        "C. Ambas respuesta, la A y la B, son incorrectas. Sólo hay que poner más atención en el viaje."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/78.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  79,
        "category":  "metrobus",
        "question":  "Si se va a conducir por un largo tiempo, lo recomendable es dormir la noche anterior...",
        "options":  [
                        "A. Aproximadamente 8 horas.",
                        "B. Al menos 4 horas.",
                        "C. Algunas horas, su cantidad no influye en la conducción ya que lo importante es realizar paradas de descanso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  80,
        "category":  "pasajeros",
        "question":  "El cansancio puede verse inducido por ingerir:",
        "options":  [
                        "A. Bebidas alcohólicas.",
                        "B. Comidas abundantes.",
                        "C. Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  81,
        "category":  "pasajeros",
        "question":  "¿Cuáles de éstos son los síntomas que advierten sobre la fatiga en la conducción?",
        "options":  [
                        "A. La sensación de euforia.",
                        "B. La visión borrosa y el aumento del número y duración de parpadeos.",
                        "C. No realizar movimientos en el asiento, ni cambios de postura."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  82,
        "category":  "pasajeros",
        "question":  "¿Por qué es peligroso conducir con cansancio?",
        "options":  [
                        "A. Porque reduce la capacidad de reacción y aumenta el tiempo necesario para responder ante un estímulo.",
                        "B. Porque se circula más rápido.",
                        "C. Porque el viaje dura más."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  83,
        "category":  "pasajeros",
        "question":  "¿Qué consecuencias tiene conducir habiendo dormido pocas horas previamente?",
        "options":  [
                        "A. Reduce la capacidad de reacción y el estado de alerta.",
                        "B. Predispone a tomar malas decisiones, poniendo en riesgo la vida.",
                        "C. Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  84,
        "category":  "pasajeros",
        "question":  "¿Puede verse afectada negativamente la conducción de una persona que está discutiendo con su acompañante o con otra persona de la vía pública?",
        "options":  [
                        "A. Sólo si la discusión es con quien acompaña. Si es con otra persona, se mantiene en alerta ya que la tensión evita la somnolencia.",
                        "B. Sí, puede entorpecer su capacidad de atención al contexto, ya que las discusiones generan un estado de estrés.",
                        "C. No genera ningún efecto, siempre y cuando quien conduce se encuentre en condiciones legales para conducir."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  85,
        "category":  "pasajeros",
        "question":  "Bajo los efectos del estrés, la conducción se vuelve:",
        "options":  [
                        "A. Más temeraria.",
                        "B. Menos segura.",
                        "C. Ambas respuestas, A y B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  86,
        "category":  "pasajeros",
        "question":  "En relación al conductor, ¿qué cantidad total de distracciones están presentes en la siguiente imagen?",
        "options":  [
                        "A. Una.",
                        "B. Dos.",
                        "C. Tres."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/86.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  87,
        "category":  "pasajeros",
        "question":  "La acción que realiza el conductor en la imagen es riesgosa para la conducción.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/87.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  88,
        "category":  "pasajeros",
        "question":  "¿Cuáles de las siguientes acciones son consideradas factores de distracción cuando se conduce un vehículo?",
        "options":  [
                        "A. Las opciones A, B y C",
                        "B. Las opciones A y C.",
                        "C. Las opciones B y C."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/88.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  89,
        "category":  "pasajeros",
        "question":  "¿Cuál es el tiempo promedio desde que se percibe un peligro hasta que se reacciona, por ejemplo, accionando el freno?",
        "options":  [
                        "A. Aproximadamente 1 segundo.",
                        "B. Entre 2 y 3 segundos.",
                        "C. Es inmediato, no transcurre tiempo entre estas acciones."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  90,
        "category":  "pasajeros",
        "question":  "¿Cuál de estos sistemas de comunicación telefónica no es considerado riesgoso al momento de conducir un vehículo?",
        "options":  [
                        "A. Opción A. Ya que al utilizar un sólo auricular la audición no se encuentra afectada.",
                        "B. Opción B. Ya que al activar el manos libres las manos quedan disponibles para la conducción.",
                        "C. Ambos sistemas son riesgosos."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/90.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  91,
        "category":  "velocidad",
        "question":  "La siguiente acción del conductor, ¿es considerada un factor de riesgo?",
        "options":  [
                        "A. No, ya que el conductor no está utilizando sus manos para mantener una comunicación telefónica.",
                        "B. Sí, sólo cuando circula a altas velocidades.",
                        "C. Sí, porque interfiere en su capacidad de atención."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/91.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  92,
        "category":  "pasajeros",
        "question":  "La siguiente acción del conductor es riesgosa porque:",
        "options":  [
                        "A. Disminuye su capacidad atencional, limita el sentido de la audición y/o vista, reduce la capacidad de reacción y aumenta el tiempo necesario para responder ante un estímulo.",
                        "B. El conductor debe mantener ambas manos comprometidas en la acción de conducir y al manipularlo, reduciría su capacidad para maniobrar.",
                        "C.Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/92.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  93,
        "category":  "velocidad",
        "question":  "Si un/a conductor/a necesita realizar una llamada de urgencia con el teléfono celular, ¿qué debe hacer para no generar una situación de riesgo en la vía pública?",
        "options":  [
                        "A. Colocar balizas y detenerse en un lugar donde esté permitido.",
                        "B. Ocupar el carril derecho, para circular a baja velocidad, y utilizar las balizas.",
                        "C. Al tratarse de una llamada de urgencia, no importa donde se realice."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  94,
        "category":  "velocidad",
        "question":  "La presente conducta, ¿es riesgosa al momento de conducir?",
        "options":  [
                        "A. Sí, porque es considerado un factor de distracción y exige manipulación.",
                        "B. Únicamente si se circula a altas velocidades.",
                        "C. Al contrario, ayuda a mantener la atención en la conducción."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/94.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  95,
        "category":  "normativa",
        "question":  "Cuando se consume alcohol, ¿se pueden producir alteraciones en la visión?",
        "options":  [
                        "A. Sí.",
                        "B. No, solamente afecta a la capacidad motora.",
                        "C. Sólo cuando se tiene más de 1 gramo de alcohol por litro de sangre."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  96,
        "category":  "pasajeros",
        "question":  "Consumir cerveza influye en la conducción de un vehículo, haciendo que el conductor reduzca su capacidad de reacción y aumentando el tiempo necesario para responder ante un estímulo.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  97,
        "category":  "normativa",
        "question":  "Conducir al día siguiente de una noche de consumo excesivo de alcohol es riesgoso porque:",
        "options":  [
                        "A. Los efectos del alcohol no terminan con la ingesta, sino que se extienden hasta haberlo eliminado del organismo.",
                        "B. Conducir con resaca es equiparable, por sus efectos en el organismo, a conducir alcoholizado.",
                        "C. Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  98,
        "category":  "normativa",
        "question":  "¿La resaca tiene efectos en el organismo que puedan afectar la conducción?",
        "options":  [
                        "A. Sí, pero sólo cuando la bebida alcohólica que se ingirió tiene un alto grado de concentración.",
                        "B. No, el nivel de alcohol se ve reducido en cuestión de horas, por ello conducir con resaca no altera las percepciones.",
                        "C. Sí, puede afectar la coordinación, la atención y el tiempo de reacción."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  99,
        "category":  "prioridad",
        "question":  "Si un/a conductor/a profesional obtiene el siguiente resultado en un control de alcoholemia realizado en la Ciudad Autónoma de Buenos Aires, ¿cómo debe proceder la autoridad de control de tránsito?",
        "options":  [
                        "A. Sancionar la falta administrativa, retener la licencia de conducir y remitir el vehículo.",
                        "B. Esperar un tiempo prudencial y realizar una contraprueba, a la espera de que descienda la graduación alcohólica.",
                        "C. Darle la opción al conductor de llamar a un tercero para que se haga responsable de la conducción del vehículo."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/99.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  100,
        "category":  "normativa",
        "question":  "¿Cuál es el nivel máximo de alcoholemia admitido para un conductor profesional?",
        "options":  [
                        "A. 0,5 gramos de alcohol por litro de sangre.",
                        "B. 0,0 gramos de alcohol por litro de sangre.",
                        "C. 0,2 gramos de alcohol por litro de sangre."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  101,
        "category":  "normativa",
        "question":  "¿Consumir cuál de estas sustancias pueden afectar la capacidad para conducir?",
        "options":  [
                        "A. Las drogas ilegales y algunas legales (como el alcohol y algunos medicamentos).",
                        "B. Sólo las drogas ilegales.",
                        "C. Todo tipo de drogas (las legales e ilegales)."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  102,
        "category":  "normativa",
        "question":  "¿Cuál de estas sustancias pueden afectar negativamente la capacidad de conducir?",
        "options":  [
                        "A. Todos los medicamentos, de venta libre, que no necesitan receta.",
                        "B. Todos los medicamentos con efectos sedantes.",
                        "C. Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  103,
        "category":  "metrobus",
        "question":  "¿Es correcto estacionar el vehículo de esta manera?",
        "options":  [
                        "A. No, excepto que el garaje sea de la persona titular del vehículo.",
                        "B. Sí, siempre que se estacione paralelo al cordón los días no hábiles.",
                        "C. No. Está prohibido ya que pone en riesgo a ciclistas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/103.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  104,
        "category":  "metrobus",
        "question":  "Como norma general, frente a esta señal, ¿está permitido detenerse para el ascenso o descenso de pasajeros/as?",
        "options":  [
                        "A. No. Está prohibido estacionar y detenerse.",
                        "B. Sí. Sólo está prohibido estacionar pero no detenerse.",
                        "C. Según la hora en que quiera realizarse la detención."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/104.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  105,
        "category":  "metrobus",
        "question":  "En estas zonas, está permitido estacionar a partir de los 20 metros para cada lado.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/105.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  106,
        "category":  "metrobus",
        "question":  "La Ley Nº 2148 establece como norma general que en avenidas de este tipo, está prohibido estacionar vehículos...",
        "options":  [
                        "A. Junto a ambas aceras los días hábiles entre las 7 y las 21 horas.",
                        "B. Junto a la acera derecha los días hábiles entre las 7 y las 21 horas.",
                        "C. Junto a la acera izquierda los días hábiles entre las 7 y las 21 horas."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/106.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  107,
        "category":  "metrobus",
        "question":  "La Ley Nº 2148 establece como norma general que en avenidas de este tipo, está prohibido estacionar vehículos...",
        "options":  [
                        "A. Junto a la acera izquierda los días hábiles durante las 24 horas.",
                        "B. Junto a ambas aceras los días hábiles de 7 a 21 horas.",
                        "C. Junto a la acera derecha los días hábiles las 24 horas."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/107.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  108,
        "category":  "metrobus",
        "question":  "En el siguiente espacio, se encuentra permitido detenerse pero no estacionar.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/108.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  109,
        "category":  "metrobus",
        "question":  "En la presente situación, el vehículo señalado no se encuentra en infracción si...",
        "options":  [
                        "A. Permanece de ese modo, de 2 a 5 minutos.",
                        "B. Permanece de ese modo alrededor de 2 minutos, no abandona el vehículo y además, indica su detención con las balizas.",
                        "C. Es una detención previa a la maniobra de estacionamiento."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/109.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  110,
        "category":  "metrobus",
        "question":  "La Ley N° 2148 establece como norma general la prohibición de detenerse de la siguiente forma, excepto:",
        "options":  [
                        "A. Que se trate de una detención para el ascenso o descenso de pasajeros/as.",
                        "B. Que se trate de una detención previa a la maniobra de estacionamiento.",
                        "C. Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/110.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  111,
        "category":  "metrobus",
        "question":  "¿Está permitida la acción que se presenta en la siguiente imagen?",
        "options":  [
                        "A. Sí, porque tiene las balizas encendidas y no necesita permanecer más de 5 minutos para que descienda un/a pasajero/a.",
                        "B. Sí, porque la doble fila está permitida cuando se trata de ascenso y descenso de pasajeros/as.",
                        "C. No, ya que la doble fila está permitida sólo como detención previa a la maniobra de estacionamiento."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/111.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  112,
        "category":  "metrobus",
        "question":  "¿Este vehículo se encuentra bien estacionado?",
        "options":  [
                        "A. Sí. Al no estar el cordón pintado de amarillo, está habilitado a estacionarse y detenerse.",
                        "B. Sí. Al no estar el cordón pintado de rojo, está habilitado a estacionarse pero no a detenerse.",
                        "C. No, porque debería estar más alejado del cordón (a 20 cm de él)."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/112.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  113,
        "category":  "metrobus",
        "question":  "¿Se está habilitado a detener un vehículo en este lugar?",
        "options":  [
                        "A. Sí, siempre y cuando no entorpezca la circulación.",
                        "B. No, está prohibido estacionar y detenerse por normativa.",
                        "C. Si, a menos que haya una señal que lo prohíba expresamente."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/113.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  114,
        "category":  "metrobus",
        "question":  "Los taxis, remises o automóviles de plataformas de viajes ¿están habilitados a detenerse en este lugar solo para realizar el ascenso y descenso de pasajeros?",
        "options":  [
                        "A. Sí, siempre y cuando no entorpezca la circulación.",
                        "B. No, está prohibido estacionar y detenerse por normativa.",
                        "C. Si, a menos que haya una señal que lo prohíba expresamente."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/114.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  115,
        "category":  "metrobus",
        "question":  "¿Está permitido circular marcha atrás en la Ciudad de Buenos Aires?",
        "options":  [
                        "A. No, salvo que se realice para estacionar, entrar o salir de un garaje (cuando no exista otra posibilidad) o salvar algún obstáculo.",
                        "B. Sí, se puede realizar en cualquier ocasión pero el trayecto para circular debe ser de pocos metros.",
                        "C. Sí, siempre que se realice antes de llegar a la mitad de la cuadra y asegurándose de no poner en riesgo al resto de los vehículos."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  116,
        "category":  "prioridad",
        "question":  "Si el vehículo que lo precede, circula con estas luces intermitentes encendidas, ¿qué podría estar indicando?",
        "options":  [
                        "A. Que el vehículo circula lentamente.",
                        "B. Que el vehículo próximamente ingresará a un garage o se detendrá.",
                        "C. Que el vehículo realizará un giro en la próxima intersección."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/116.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  117,
        "category":  "normativa",
        "question":  "Este elemento de seguridad pasiva sirve para reducir el daño producido a los ocupantes de un vehículo al momento de un siniestro.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/117.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  118,
        "category":  "seguridad",
        "question":  "Durante un siniestro, si las personas no llevan puesto el cinturón de seguridad, el airbag...",
        "options":  [
                        "A. Les salvará la vida ya que puede sustituir al cinturón de seguridad.",
                        "B. Evitará que sufran lesiones, siempre y cuando el siniestro se produzca a menos de 80 km/h.",
                        "C. Puede provocar lesiones graves."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  119,
        "category":  "seguridad",
        "question":  "El apoyacabeza está correctamente ubicado en función del conductor.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/119.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  120,
        "category":  "normativa",
        "question":  "Frente a un siniestro, ¿qué puede evitar este elemento si está correctamente ubicado?",
        "options":  [
                        "A. Nada en especial, dado que sólo es un elemento de confort.",
                        "B. Lesiones en la zona cervical.",
                        "C. Lesiones en el tórax."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/120.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  121,
        "category":  "normativa",
        "question":  "Lograr una mayor profesionalización del oficio del conductor/a profesional, conlleva a:",
        "options":  [
                        "A. Disminuir los riesgos de incidentes viales.",
                        "B. Mejorar la calidad laboral y del servicio que brinda.",
                        "C. Ambas respuestas, A y B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  122,
        "category":  "pasajeros",
        "question":  "¿Cuál de estas imágenes muestra el uso adecuado del cinturón de seguridad durante el embarazo?",
        "options":  [
                        "A. Imagen A.",
                        "B. Imagen B."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/122.jpg",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  123,
        "category":  "pasajeros",
        "question":  "¿Esta persona tiene el cinturón correctamente colocado?",
        "options":  [
                        "A. No, porque pasa por el abdomen y debería hacerlo por los huesos de la cadera.",
                        "B. No, porque pasa por el abdomen y debería hacerlo por los muslos.",
                        "C.  Sí, porque pasa por la clavícula y el abdomen."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/123.jpg",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  124,
        "category":  "seguridad",
        "question":  "Si el vehículo de la imagen se dispone a ingresar a un garaje ubicado a su derecha, está anticipando su maniobra utilizando las luces correctas.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/124.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  125,
        "category":  "seguridad",
        "question":  "El vehículo, señalado con un círculo rojo, circula utilizando las luces correctas.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/125.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  126,
        "category":  "pasajeros",
        "question":  "Circular con la luz alta encendida está prohibido en zonas urbanas.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  127,
        "category":  "seguridad",
        "question":  "Si los espejos retrovisores de su vehículo están bien orientados, igualmente es posible que se produzcan puntos ciegos cuando observe por los mismos.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  128,
        "category":  "prioridad",
        "question":  "¿Cómo se pueden reducir los puntos ciegos al conducir un vehículo?",
        "options":  [
                        "A. Acomodar correctamente los espejos retrovisores antes de iniciar la marcha. Mientras se circula, además de revisar los espejos retrovisores, utilizar la visión periférica dando vistazos por encima de los hombros cuando sea  necesario.",
                        "B. Antes de realizar una maniobra se debe disminuir la velocidad de circulación, colocar la luz de giro y mirar por los espejos realizando un pequeño movimiento corporal hacia adelante para ampliar el ángulo de visión.",
                        "C. Ambas respuestas, A y B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  129,
        "category":  "seguridad",
        "question":  "¿A qué se llama “Punto Ciego”?",
        "options":  [
                        "A. Al área de visión del entorno, a la que la persona que conduce no tiene acceso, ya sea de manera directa ni a través de los espejos retrovisores.",
                        "B. Sólo al área de visión que no es cubierta por los espejos retrovisores.",
                        "C. Al punto imaginario ubicado en el horizonte de una ruta."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  130,
        "category":  "seguridad",
        "question":  "Para realizar una conducción segura, ¿cuándo es recomendable verificar la orientación de los espejos retrovisores?",
        "options":  [
                        "A. Antes de iniciar la marcha.",
                        "B. Durante la conducción, para poder hacer una prueba real.",
                        "C. Con el vehículo inmovilizado y la persona que conduce fuera del mismo."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  131,
        "category":  "seguridad",
        "question":  "Indique cuál de estas imágenes muestra la manera correcta de colocar el espejo retrovisor:",
        "options":  [
                        "A. Imagen A.",
                        "B. Imagen B.",
                        "C. Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/131.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  132,
        "category":  "normativa",
        "question":  "¿Es seguro conducir con este tipo de calzado?",
        "options":  [
                        "A. Es indistinto mientras que no resbalen.",
                        "B. Sólo puede verse afectada la conducción en viajes largos.",
                        "C. No, sólo un calzado sujeto al pie brinda seguridad en la conducción."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/132.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  133,
        "category":  "normativa",
        "question":  "Es importante realizar un correcto mantenimiento vehicular porque...",
        "options":  [
                        "A. Evita desperfectos del motor y ayuda a reducir el consumo de combustible.",
                        "B. Ayuda a reducir el factor de riesgo vehicular involucrado en los siniestros viales.",
                        "C. Ambas respuestas, A y B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  134,
        "category":  "pasajeros",
        "question":  "¿Cómo deben encontrarse los neumáticos para comprobar la correcta presión de aire?",
        "options":  [
                        "A. Fríos.",
                        "B. Calientes.",
                        "C. Es indistinto, al ser de caucho se mantienen aislados de la temperatura."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  135,
        "category":  "pasajeros",
        "question":  "¿Puede verse afectada la conducción de un vehículo si el sistema de suspensión delantero está en mal estado?",
        "options":  [
                        "A. No, porque al ser el sistema de suspensión delantero el deteriorado, éste no influirá en la conducción.",
                        "B. Sí, puede afectar al correcto control del vehículo.",
                        "C. No, porque si se encuentra correctamente la suspensión trasera, ésta asegurará el contacto adecuado de las ruedas con la calzada."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  136,
        "category":  "velocidad",
        "question":  "Si ud. se encontrase en esta situación, ¿qué debería considerar en cuanto a la velocidad?",
        "options":  [
                        "A. Debería circular a la mitad de la velocidad máxima establecida por Ley.",
                        "B. Debería reducir la velocidad para evitar el efecto aquaplaning.",
                        "C. Lo único que debería hacer es respetar la velocidad máxima de la arteria."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/136.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  137,
        "category":  "velocidad",
        "question":  "¿A qué se denomina “aquaplaning”?",
        "options":  [
                        "A. Cuando la cantidad de agua caída en una lluvia es abundante.",
                        "B. A la pérdida de adherencia del neumático al piso a causa de la capa de agua acumulada en el pavimento, que es mayor a la cantidad que se puede expulsar a través de sus dibujos.",
                        "C. Al estado resbaladizo en el que se encuentra la calzada luego de una llovizna."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  138,
        "category":  "velocidad",
        "question":  "Si la calzada está mojada y hay charcos, ¿pueden perder eficacia los frenos?",
        "options":  [
                        "A. No, al contrario, se mejora la adherencia porque los neumáticos se limpian.",
                        "B. Sí, porque al mojarse pueden no funcionar eficazmente.",
                        "C. No, porque justamente los frenos sirven para contrarrestar los efectos de la calzada resbaladiza."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  139,
        "category":  "velocidad",
        "question":  "Cuando se conduce bajo esta condición climática, ¿a cuánto sería recomendable incrementar, como mínimo, los 2 segundos de distancia de seguridad?",
        "options":  [
                        "A. A 4 segundos.",
                        "B. A 3 segundos.",
                        "C. A 5 segundos."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/139.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  140,
        "category":  "velocidad",
        "question":  "Al conducir sobre una calzada en estas condiciones, la distancia de frenado será...",
        "options":  [
                        "A. Igual que cuando la calzada se encuentra seca.",
                        "B. Menor que cuando la calzada se encuentra seca.",
                        "C. Mayor que cuando la calzada se encuentra seca."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/140.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  141,
        "category":  "normativa",
        "question":  "Conducir de noche aumenta el riesgo de sufrir un incidente.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  142,
        "category":  "seguridad",
        "question":  "En estas condiciones, ¿una incorrecta regulación de la altura de las luces bajas puede producir encandilamiento?",
        "options":  [
                        "A. Sí, porque este efecto se produce por cambios bruscos en la intensidad de la luz.",
                        "B. No, porque este efecto se produce sólo por el uso de la luz alta.",
                        "C. No, porque este efecto se produce en rutas con poca iluminación."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/142.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  143,
        "category":  "velocidad",
        "question":  "Si al conducir por una autopista advierte que el vehículo presenta una falla grave, pero a pesar de ella puede seguir circulando; ¿qué se recomienda hacer en estos casos?",
        "options":  [
                        "A. Seguir circulando por la autopista pero por el carril de desaceleración, destinado a los vehículos lentos.",
                        "B. Circular por el carril derecho y en la próxima salida abandonar la autopista para llamar al auxilio del vehículo.",
                        "C. Continuar a baja velocidad, manteniéndose en el carril, independientemente de cuál fuera."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  144,
        "category":  "pasajeros",
        "question":  "¿Qué vehículo puede realizar el acarreo de otro en esta vía?",
        "options":  [
                        "A. Cualquier vehículo que posea potencia suficiente para remolcar a otro vehículo y un elemento para sujetarlo firmemente.",
                        "B. Cualquier vehículo utilizando la cuarta de enganche para que quede sujeto firmemente sin riesgo.",
                        "C. Sólo los vehículos destinados a ese fin."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/144.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  145,
        "category":  "seguridad",
        "question":  "¿Qué debe hacer usted si su vehículo queda inmovilizado en un túnel?",
        "options":  [
                        "A. Dejar el vehículo cerrado y salir del túnel cuanto antes.",
                        "B. Apagar todas las luces si el túnel está iluminado y solicitar auxilio a través del teléfono móvil.",
                        "C. Apagar el motor, colocar las balizas portátiles, mantener encendidas las luces de posición e intermitentes y llamar al número de asistencia."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  146,
        "category":  "velocidad",
        "question":  "Si en la vía donde se circula hay neblina, ¿qué se recomienda hacer?",
        "options":  [
                        "A. Utilizar las luces rompeniebla, lo cual es suficiente porque permite ampliar la\nvisibilidad del conductor.",
                        "B. Conducir con ambas manos en el volante, reducir la velocidad, aumentar la distancia entre vehículos y utilizar las luces correspondientes del vehículo.",
                        "C. Detenerse en la banquina hasta que levante el banco de niebla."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  147,
        "category":  "velocidad",
        "question":  "¿Qué luces debe utilizar para poder circular con neblina?",
        "options":  [
                        "A. Las luces altas, durante todo el recorrido mientras continúe la niebla.",
                        "B. Las luces bajas y las rompeniebla (en el caso de tenerlas).",
                        "C. Las luces bajas, las rompenieblas (en caso de tenerlas) y las balizas."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  148,
        "category":  "velocidad",
        "question":  "La niebla, como factor de riesgo, produce modificaciones en…",
        "options":  [
                        "A. El campo visual y percepción del entorno, la capacidad lumínica del vehículo y la adherencia de las cubiertas.",
                        "B. El campo visual y la capacidad lumínica del vehículo.",
                        "C. Sólo afecta la capacidad lumínica del vehículo."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  149,
        "category":  "metrobus",
        "question":  "En el caso de que un vehículo quede inmovilizado por un siniestro vial o desperfecto mecánico en los carriles marcados de esta vía, ¿qué es recomendable hacer?",
        "options":  [
                        "A. Colocar las balizas portátiles, ponerse a resguardo detrás de una defensa si las hubiere y llamar al número de emergencia de la Autopista.",
                        "B. Descender del vehículo usando un chaleco reflectante para hacer señas al resto de los vehículos y llamar al número de emergencia de la Autopista.",
                        "C. Permanecer dentro del vehículo con el cinturón de seguridad abrochado, encender las balizas y llamar al número de emergencia de la Autopista."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/149.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  150,
        "category":  "normativa",
        "question":  "La persona que se da a la fuga en un siniestro vial, dejando a alguien herido, puede ser juzgada por el delito de abandono de persona.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  151,
        "category":  "seguridad",
        "question":  "En caso de un siniestro vial o desperfecto mecánico, ¿qué es recomendable hacer cuando el vehículo queda inmovilizado en el sector señalado?",
        "options":  [
                        "A. Encender las luces intermitentes, colocar las balizas portátiles y llamar  al número de emergencia de la Autopista.",
                        "B. Descender del vehículo usando un chaleco reflectante y ponerse a resguardo detrás de una defensa si las hubiere.",
                        "C. Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/151.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  152,
        "category":  "normativa",
        "question":  "En caso de participar de un incidente vial, ¿de cuánto tiempo se dispone para dar aviso sobre el hecho a la compañía aseguradora del vehículo?",
        "options":  [
                        "A. 24 horas.",
                        "B. 48 horas.",
                        "C. 72 horas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  153,
        "category":  "normativa",
        "question":  "Los objetos sueltos como lentes, celular, llaves o similares resultan muy peligrosos en caso de incidentes o maniobras bruscas, porque pueden ocasionar una lesión grave producto de la energía cinética que poseen.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  154,
        "category":  "normativa",
        "question":  "¿Cuáles son los números de emergencia que toda persona debe conocer con el objetivo de poder llamar y pedir ayuda ante el acontecimiento de algún incidente?",
        "options":  [
                        "A. 911 y 109.",
                        "B. 103 y 107.",
                        "C. 107 y 911."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  155,
        "category":  "normativa",
        "question":  "Según la Ley N° 2148, ¿es obligatorio llevar un chaleco de material reflectivo?",
        "options":  [
                        "A. No es obligatorio pero es recomendable llevarlo por si se necesita utilizarlo frente a algún desperfecto mecánico.",
                        "B. Sí, es obligatorio y puede ser llevado en cualquier parte del vehículo.",
                        "C. Sí, es obligatorio y debe ser llevado dentro del habitáculo para poder utilizarlo en caso de necesitar descender a la calzada, frente a alguna causa de fuerza mayor."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  156,
        "category":  "pasajeros",
        "question":  "Al sufrir la pérdida de la placa de dominio de un vehículo, ¿dónde se puede solicitar su reposición?",
        "options":  [
                        "A. Se la puede solicitar en cualquier establecimiento comercial que la realice.",
                        "B. Se la debe solicitar en el Registro Nacional de la Propiedad del Automotor que corresponde al vehículo.",
                        "C. Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  157,
        "category":  "pasajeros",
        "question":  "La ubicación y posición de las placas de dominio del vehículo, ¿pueden sufrir algún tipo de modificación?",
        "options":  [
                        "A. Sólo puede, eventualmente, ampliarse para mejorar su visibilidad.",
                        "B. No, debe estar colocada en el lugar y de forma reglamentaria.",
                        "C. Sólo está prohibido modificar su posición pero no el lugar donde se exhibe."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  158,
        "category":  "normativa",
        "question":  "Frente a un incidente de tránsito, ¿puede transferirse la Responsabilidad Penal de la persona que conduce un vehículo al dueño/a del mismo?",
        "options":  [
                        "A. No, porque la responsabilidad penal es intransferible.",
                        "B. Sí. Además, del dueño/a también puede transferirse a la Compañía de Seguros.",
                        "C. Lo resolverá el Juez, en función de la gravedad del incidente y sus consecuencias."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  159,
        "category":  "normativa",
        "question":  "En un incidente de tránsito, ¿qué significa que la persona que conduce sea considerada responsable por negligencia?",
        "options":  [
                        "A. Que no ha respondido adecuadamente a una circunstancia del tránsito por falta de práctica en la conducción.",
                        "B. Que ha realizado un acto con su vehículo que las reglas de prudencia indican no hacer, o sea, que ha actuado peligrosamente.",
                        "C. Que ha actuado con descuido u omitió actuar en el cumplimiento de una obligación legal."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  160,
        "category":  "metrobus",
        "question":  "¿Qué obligaciones impone la ley a aquella persona que al conducir participe de un siniestro?",
        "options":  [
                        "A. Detenerse inmediatamente, solicitar auxilio para atender a las víctimas si las hubiera y brindar su colaboración para evitar mayores daños para la circulación.",
                        "B. Suministrar sus datos personales, del vehículo, de la licencia de conducir y del seguro obligatorio a las demás personas siniestradas y a la autoridad interviniente.",
                        "C. Ambas respuestas, A y B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  161,
        "category":  "normativa",
        "question":  "Al tener la licencia vencida, ¿por cuánto tiempo puede seguir conduciendo sin estar en infracción?",
        "options":  [
                        "A. 30 días corridos desde su vencimiento.",
                        "B. Hasta las 00 horas del día de cumpleaños.",
                        "C. No está permitido conducir con la licencia vencida, excepto que el vencimiento fuese un día inhábil, en cuyo caso se traslada al día hábil siguiente."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  162,
        "category":  "normativa",
        "question":  "¿Por qué es importante la postura corporal en un/a conductor/a profesional?",
        "options":  [
                        "A. Porque mantener una buena postura reduce la probabilidad de sufrir lesiones musculares y articulares.",
                        "B. Porque incrementa la seguridad de quien conduce en el caso de producirse un siniestro.",
                        "C. Ambas respuestas, A y B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  163,
        "category":  "normativa",
        "question":  "Para un/a conductor/a profesional, ¿por qué es importante planificar su jornada laboral teniendo en cuenta la alimentación?",
        "options":  [
                        "A. Porque su manipulación e ingesta al momento de conducir genera distracciones pudiendo provocar un siniestro vial.",
                        "B. Porque la digestión puede inducir estados de somnolencia, dependiendo del tipo y cantidad de alimentos consumidos.",
                        "C. Ambas respuestas, A y B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  164,
        "category":  "pasajeros",
        "question":  "Es recomendable, para una postura saludable, colocar un almohadón entre el asiento y la zona lumbar del conductor/a.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  165,
        "category":  "normativa",
        "question":  "Cuando se vence la licencia de conducir, ¿cuánto tiempo puede transcurrir para su renovación antes de que se necesite tramitarla como si fuese un otorgamiento?",
        "options":  [
                        "A. 30 días corridos desde su vencimiento.",
                        "B. Para que se la pueda renovar, siempre debe hacerse antes de su vencimiento. Una vez vencida se la debe tramitar como licencia nueva.",
                        "C. No debe superar el año desde su vencimiento."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  166,
        "category":  "pasajeros",
        "question":  "¿Cuál es el objetivo de la Verificación Técnica Vehicular?",
        "options":  [
                        "A. Reducir la contaminación y mejorar la calidad del medio ambiente.",
                        "B. Garantizar el cumplimiento de las normas de seguridad de los vehículos.",
                        "C. Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  167,
        "category":  "prioridad",
        "question":  "Sabiendo que el fenómeno de \u0027Off-Tracking\u0027 provoca que las ruedas traseras de los vehículos sigan una trayectoria más cerrada que las delanteras en un giro, ¿qué precaución debe tomar un conductor de taxi, remis o automóvil de plataforma al circular cerca de un colectivo o camión que se dispone a doblar en una esquina?",
        "options":  [
                        "A. Acelerar para realizar un sobrepaso rápido por el lado interno antes de que el vehículo de gran porte complete la maniobra.",
                        "B. Evitar situarse en el lado interno del giro del vehículo de gran porte, ya que su parte lateral trasera podría embestirlo al cerrarse la curva.",
                        "C. Mantenerse lo más cerca posible del cordón para obligar al vehículo de gran porte a abrirse más."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  168,
        "category":  "pasajeros",
        "question":  "¿Es obligación de quien conduce supervisar que el vehículo se encuentre en adecuadas condiciones de seguridad antes de iniciar su marcha?",
        "options":  [
                        "A. Sólo si se es la persona propietaria del vehículo.",
                        "B. Sí, siempre, independientemente de ser o no la persona propietaria del vehículo.",
                        "C. Al ser conductor/a profesional ésta es una recomendación. Dicha obligación le corresponde a la persona propietaria del vehículo."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  169,
        "category":  "normativa",
        "question":  "Es obligatorio circular con el comprobante vigente de la póliza del seguro de responsabilidad civil.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  170,
        "category":  "seguridad",
        "question":  "¿Dónde debe ubicarse el matafuegos en un taxi, remis o automóvil de plataforma de viajes?",
        "options":  [
                        "A. En el baúl, si no se cuenta con equipo de GNC.",
                        "B. Dentro del habitáculo, sujeto y al alcance de la persona que conduce.",
                        "C. No importa el lugar siempre que se encuentre debidamente sujetado."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  171,
        "category":  "normativa",
        "question":  "¿En qué consiste el Sistema de Evaluación Permanente de Conductores (Scoring)?",
        "options":  [
                        "A. En la asignación de un puntaje para cada conductor/a, al que se le irá restando puntos por infracciones cometidas.",
                        "B. La obligación que tienen los conductores y las conductoras a realizar un curso vial anual.",
                        "C. Ambas respuestas, la A y la B, son incorrectas."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  172,
        "category":  "prioridad",
        "question":  "Indique el orden de prioridad normativo que debe respetar (de mayor a menor jerarquía):",
        "options":  [
                        "A. Normas legales de carácter general; Señalización; Indicaciones de la autoridad competente.",
                        "B. Indicaciones de la autoridad competente; Señalización; Normas legales de carácter general.",
                        "C. Señalización; Normas legales de carácter general; Indicaciones de la autoridad competente."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  173,
        "category":  "prioridad",
        "question":  "Los y las agentes de tránsito pueden proceder a la detención de un vehículo únicamente con la presencia de personal policial.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  174,
        "category":  "prioridad",
        "question":  "Como conductor/a, ¿qué debe realizar frente a la siguiente situación?",
        "options":  [
                        "A. Avanzar porque habilita la luz verde del semáforo.",
                        "B. Detenerse y esperar a la indicación del agente de tránsito para avanzar.",
                        "C. Avanzar sólo si no pasan vehículos en la intersección."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/174.jpg",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  175,
        "category":  "prioridad",
        "question":  "Si al circular por una vía y la persona señalada le indica detenerse, ¿está obligado usted a obedecer?",
        "options":  [
                        "A. Sí, porque al ser personal de obra está autorizado a regular el paso de vehículos en el tramo donde están trabajando.",
                        "B. Sólo si se percibe una situación riesgosa ya que el personal de obra no tiene la autoridad legal para realizar dicha indicación.",
                        "C. No, porque no tiene autoridad ya que la Ley sólo delega dicha función a agentes de tránsito."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/175.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  176,
        "category":  "prioridad",
        "question":  "Si se encuentra en esta situación y el personal ferroviario le indica que avance, ¿qué debe hacer?",
        "options":  [
                        "A. Avanzar porque el personal ferroviario está autorizado a regular el paso de vehículos.",
                        "B. Detenerme y esperar hasta que la barrera se levante porque el personal ferroviario no tiene la autoridad legal para realizar dicha indicación.",
                        "C. Detenerme y esperar hasta que la barrera se levante, salvo que la indicación sea realizada por un/a agente de tránsito ya que es la única autoridad competente."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/176.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  177,
        "category":  "pasajeros",
        "question":  "¿Son válidas este tipo de señas?",
        "options":  [
                        "A. Como acompañamiento al uso de balizas y/o en caso de emergencia.",
                        "B. Nunca.",
                        "C. Sólo cuando se utilicen en calles."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/177.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  178,
        "category":  "prioridad",
        "question":  "¿Qué indica esta seña?",
        "options":  [
                        "A. Giro a la izquierda.",
                        "B. Adelantamiento por la izquierda.",
                        "C. Detenerse."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/178.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  179,
        "category":  "senales",
        "question":  "Una indicación puede estar expresada con una señal vertical o con una demarcación horizontal, ya que ambas tienen el mismo significado y orden jerárquico.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  180,
        "category":  "senales",
        "question":  "¿Qué significa esta demarcación amarilla en la calzada?",
        "options":  [
                        "A. Es una señalización que se utiliza únicamente para dividir los carriles de la vía.",
                        "B. Indica, para ambos sentidos de circulación, que no debe ser traspasada ni se puede circular sobre ella.",
                        "C. Señaliza la proximidad de una curva."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/180.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  181,
        "category":  "pasajeros",
        "question":  "En la siguiente imagen, ¿qué indican las líneas centrales de la calzada señaladas?",
        "options":  [
                        "A. Que se pueden traspasar.",
                        "B. Que está prohibido traspasarlas.",
                        "C. Que es una zona de máximo peligro."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/181.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  182,
        "category":  "senales",
        "question":  "Frente a la demarcación central de la calzada señalada, ¿cuál es la conducta a seguir?",
        "options":  [
                        "A. Se debe respetar lo que rige con respecto a la línea más próxima; si es continua no traspasarla y si es discontinua está permitido hacerlo.",
                        "B. Se debe respetar lo que rige con respecto a la línea más próxima; si es discontinua no traspasarla y si es continua está permitido hacerlo.",
                        "C. No debe traspasarse ninguna de ellas."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/182.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  183,
        "category":  "senales",
        "question":  "Al conducir un vehículo, ¿cómo debe proceder frente a esta señal horizontal?",
        "options":  [
                        "A. Disminuir un poco la velocidad y mirar que no se acerquen vehículos por la vía a la que se va a incorporar.",
                        "B. Reducir la velocidad y detener el vehículo antes de la senda peatonal.",
                        "C. Avanzar."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/183.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  184,
        "category":  "senales",
        "question":  "¿Qué indica la demarcación horizontal que se visualiza en la imagen?",
        "options":  [
                        "A. Estacionamiento para micros escolares.",
                        "B. Carril de detención para el ascenso y descenso de escolares.",
                        "C. Zona de ascenso y descenso de pasajeros/as de transporte público."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/184.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  185,
        "category":  "senales",
        "question":  "¿Qué significa la demarcación horizontal que se visualiza en la imagen?",
        "options":  [
                        "A. Cruce peligroso por tener poca iluminación.",
                        "B. Senda peatonal próxima a centros de salud.",
                        "C. Senda peatonal próxima a zona escolar."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/185.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  186,
        "category":  "prioridad",
        "question":  "En la imagen se muestra un cruce exclusivo para ciclistas:",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/186.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  187,
        "category":  "senales",
        "question":  "Las intervenciones horizontales señaladas, sirven para…",
        "options":  [
                        "A. Incrementar la seguridad de peatones.",
                        "B. Promover la movilidad vehicular.",
                        "C. Colaborar con la rapidez en la movilidad."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/187.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  188,
        "category":  "senales",
        "question":  "¿Para qué sirve la demarcación horizontal de color amarillo que se visualiza en la imagen?",
        "options":  [
                        "A. Ampliar la zona permitida de estacionamiento para motos.",
                        "B. Reducir la velocidad y radio de giro de los vehículos.",
                        "C. Ampliar la zona permitida de estacionamiento para vehículo."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/188.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  189,
        "category":  "senales",
        "question":  "¿Qué indica esta demarcación horizontal verde?",
        "options":  [
                        "A. Advierte sobre la existencia de un punto de cruce de ciclovía o bicisenda.",
                        "B. Advierte sobre la existencia de un establecimiento escolar cercano.",
                        "C. Advierte sobre un cruce peligroso por tener poca iluminación."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/189.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  190,
        "category":  "senales",
        "question":  "¿Qué indica la señal horizontal de color rojo que se encuentra demarcada sobre la calzada?",
        "options":  [
                        "A. Cruce de Metrobús.",
                        "B. Cruce exclusivo de vehículos de emergencia.",
                        "C. Cruce de bicicletas."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/190.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  191,
        "category":  "senales",
        "question":  "¿Qué indica la señal horizontal que se encuentra demarcada sobre la calzada?",
        "options":  [
                        "A. Carril exclusivo de colectivo de pasajeros/as.",
                        "B. Cruce exclusivo de vehículos de emergencia.",
                        "C. Ceda el paso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/191.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  192,
        "category":  "senales",
        "question":  "Según la Ley Nº 2148, ¿qué indica la siguiente demarcación horizontal?",
        "options":  [
                        "A. Que sólo está prohibido estacionar, pudiendo efectuarse detenciones.",
                        "B. Que es un lugar reservado para el estacionamiento exclusivo de vehículos destinados al transporte de pasajeros/as.",
                        "C. Que está prohibido estacionar o detenerse durante las 24 hs."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/192.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  193,
        "category":  "metrobus",
        "question":  "Según la Ley N° 2148, ¿qué indica un cordón pintado de este color?",
        "options":  [
                        "A. Área reservada para el estacionamiento exclusivo de bicicletas y motovehículos.",
                        "B. Área reservada para el ascenso y descenso de pasajeros/as.",
                        "C. Zona exclusiva para carga y descarga de mercaderías."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/193.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  194,
        "category":  "prioridad",
        "question":  "Si al conducir un vehículo se encuentra en una intersección con esta señalización intermitente, ¿qué actitud debe tomar?",
        "options":  [
                        "A. Tengo la obligación de detener la marcha y cuando no haya más vehículos circulando por la arteria que cruza, puedo reiniciarla.",
                        "B. Al tener prioridad, debo atravesarla rápidamente para no obstaculizar la vía.",
                        "C. Efectuar el cruce con máxima precaución."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/194.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  195,
        "category":  "prioridad",
        "question":  "Si al conducir un vehículo se encuentra en una intersección con esta señalización intermitente, ¿qué actitud debe tomar?",
        "options":  [
                        "A. Detener la marcha y realizar el cruce cuando se tenga la certeza de que no existe riesgo alguno.",
                        "B. Al tener prioridad, debo atravesarla rápidamente para no obstaculizar la vía.",
                        "C. Extremar precauciones al cruzar sin la necesidad de detenerme."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/195.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  196,
        "category":  "prioridad",
        "question":  "Frente a esta situación, ¿qué debe hacer el vehículo señalado con el círculo rojo?",
        "options":  [
                        "A. Avanzar si es que el vehículo que cruza lo hace lentamente porque la prioridad de paso está dada por la luz verde.",
                        "B. No iniciar el cruce, hasta que el otro vehículo haya completado el suyo.",
                        "C. Avanzar rápidamente si el vehículo que cruza todavía no llegó a mitad del cruce, de esa manera se deja libre la intersección."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/196.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  197,
        "category":  "prioridad",
        "question":  "Cuando un semáforo cambia de luz roja a verde, está habilitando a reiniciar la marcha; no obstante ello, ¿qué precauciones se deben adoptar?",
        "options":  [
                        "A. No iniciar el cruce si no hay espacio para ubicar el vehículo del otro lado sin obstruir la circulación transversal.",
                        "B. Permitir, antes de avanzar, que completen el cruce otros vehículos o peatones que ya lo hayan iniciado.",
                        "C. Ambas respuestas, la A y la B, son correctas."
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  198,
        "category":  "senales",
        "question":  "¿Qué indican las señales transitorias naranjas ubicadas en la calzada de la presente imagen?",
        "options":  [
                        "A. Refuerzan el significado de las líneas discontinuas del carril porque es una zona peligrosa.",
                        "B. Nada, no son señales de circulación y es ilegal su colocación.",
                        "C. La prohibición de sobrepasar la línea imaginaria que las une."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/198.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  199,
        "category":  "senales",
        "question":  "La señalización transitoria se encuentra como prioridad normativa sobre los semáforos, si es que modifica el régimen normal de uso de la vía.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  200,
        "category":  "prioridad",
        "question":  "¿Cuál de las siguientes imágenes , por forma y color, corresponde a la señal indicativa de una rotonda o pendiente pronunciada?",
        "options":  [
                        "A. Figura A.",
                        "B. Figura B.",
                        "C. Figura C."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/200.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  201,
        "category":  "pasajeros",
        "question":  "¿Cuál de estas señales comunica “Prevención”?",
        "options":  [
                        "A. La señal A.",
                        "B. La señal B.",
                        "C. La señal C."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/201.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  202,
        "category":  "pasajeros",
        "question":  "Determine qué indica la señal que a continuación se presenta:",
        "options":  [
                        "A. Inicio de doble circulación.",
                        "B. Calzada dividida.",
                        "C. Camino sinuoso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/202.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  203,
        "category":  "prioridad",
        "question":  "Determine qué indica la señal que a continuación se presenta:",
        "options":  [
                        "A. Rotonda.",
                        "B. Peligro extremo de rotonda.",
                        "C. Preferencia de avance."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/203.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  204,
        "category":  "prioridad",
        "question":  "Determine qué indica la señal vertical que a continuación se presenta:",
        "options":  [
                        "A. Cruce de peatones (Peligro máximo).",
                        "B. Peatones a la izquierda.",
                        "C. Prohibición de circular. Zona exclusiva peatonal."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/204.jpg",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  205,
        "category":  "prioridad",
        "question":  "¿Cuál de estas señales indica “Cruce de Peatones (máximo peligro)”?",
        "options":  [
                        "A. La señal A.",
                        "B. La señal B.",
                        "C. La señal C."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/205.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  206,
        "category":  "pasajeros",
        "question":  "¿Cuál de estas señales es Reglamentaria?:",
        "options":  [
                        "A. La señal A.",
                        "B. La señal B.",
                        "C. La señal C."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/206.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  207,
        "category":  "metrobus",
        "question":  "¿Qué significa esta señal?",
        "options":  [
                        "A. Indica la prohibición de estacionamiento en el frente de entidades bancarias.",
                        "B. Indica que la vía ante la cual se encuentra tiene sentido de circulación opuesto, y por lo tanto no se puede ingresar.",
                        "C. Indica la prohibición de circulación de vehículos sin permiso de ingreso."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/207.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  208,
        "category":  "pasajeros",
        "question":  "¿Cuál de estas señales es una señal reglamentaria?",
        "options":  [
                        "A. La señal A.",
                        "B. La señal B.",
                        "C. La señal C."
                    ],
        "correctAnswer":  2,
        "imageSrc":  "img/colectivo/208.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  209,
        "category":  "prioridad",
        "question":  "¿Qué indica esta señal?",
        "options":  [
                        "A. Que existe la opción de doblar hacia la derecha.",
                        "B. Que hay un giro obligatorio hacia la derecha.",
                        "C. Que se aproxima una curva peligrosa con inclinación hacia la derecha."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/209.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  210,
        "category":  "metrobus",
        "question":  "Esta señal vertical reglamentaria indica…",
        "options":  [
                        "A. Que es un carril preferencial para ciclistas.",
                        "B. Que es un carril de uso exclusivo para ciclistas.",
                        "C. Que los ciclistas no pueden circular por este carril."
                    ],
        "correctAnswer":  1,
        "imageSrc":  "img/colectivo/210.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  211,
        "category":  "pasajeros",
        "question":  "¿Cuál de estas señales es Informativa?",
        "options":  [
                        "A. La señal A.",
                        "B. La señal B.",
                        "C. La señal C."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/211.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  212,
        "category":  "pasajeros",
        "question":  "La señal que se muestra indica un camino sin salida:",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/212.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  213,
        "category":  "normativa",
        "question":  "Esta señal advierte que en el lugar ocurrió un siniestro vial que produjo una víctima fatal.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  "img/colectivo/213.png",
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  214,
        "category":  "pasajeros",
        "question":  "La persona que conduce vehículos de transporte de pasajeros tiene un rol clave en la vía pública ya que funciona como soporte imprescindible de la movilidad dentro de la sociedad.",
        "options":  [
                        "A. Verdadero.",
                        "B. Falso."
                    ],
        "correctAnswer":  0,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  215,
        "category":  "normativa",
        "question":  "¿A qué grupo de elementos de seguridad pertenece el sistema de suspensión?",
        "options":  [
                        "A. Al Pasivo ya que interviene en el momento del siniestro, amortiguando el impacto producido.",
                        "B. Al Activo ya que es el encargado de mantener los neumáticos en contacto con el piso.",
                        "C. Al Neutro ya que éste se acciona por sí mismo."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  216,
        "category":  "velocidad",
        "question":  "En el caso de que un/a pasajero/a solicite, a la persona conductora de un taxi, remis o automóvil de plataforma de viajes, ir a mayor velocidad de la máxima establecida por Ley, ¿quién es responsable frente a la autoridad de control?",
        "options":  [
                        "A. El pasajero o  la pasajera, pero sólo si asume su responsabilidad frente a la autoridad de control.",
                        "B. La persona que conduce ya que no puede delegar las consecuencias derivadas de sus acciones antirreglamentarias.",
                        "C. Ambas personas y, por ello, deberán ser sancionadas por la falta realizada."
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  217,
        "category":  "metrobus",
        "question":  "La Ley Nº 2148 establece como norma general en calles, el permiso de estacionamiento de los vehículos ....",
        "options":  [
                        "A: Donde exista Sistema Metrobús junto a ambas aceras, todos los días durante las veinticuatro (24) horas.",
                        "B: Junto a ambas aceras todos los días durante las veinticuatro (24) horas.",
                        "C: Ambas respuestas son correctas"
                    ],
        "correctAnswer":  1,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    },
    {
        "id":  218,
        "category":  "metrobus",
        "question":  "La Ley Nº 2148 establece como norma general, la prohibicion de estacionamiento de los vehículos ....",
        "options":  [
                        "A: En avenidas con ciclovías junto al carril afectado a ésta, todos los días durante las veinticuatro (24) horas.",
                        "B: En avenidas junto a ambas aceras los días hábiles entre las siete (7) y las veintiuna (21) horas.",
                        "C: Ambas respuestas son correctas"
                    ],
        "correctAnswer":  2,
        "imageSrc":  null,
        "explanation":  "EvaluaciÃ³n oficial para conductores de Transporte de Pasajeros (Clase D1)."
    }
];
