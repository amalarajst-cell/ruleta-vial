// ============================================================
// BANCO DE PREGUNTAS OFICIAL: MOTOVEHÍCULOS (CATEGORÍA A)
// Extraído de Formación Vial Extreme (CABA / Ley 2148 / Ley 24449)
// 155 Preguntas clasificadas en las 7 categorías de la Ruleta Moto:
// 1. casco (Casco & Indumentaria)
// 2. frenado (Técnicas de Frenado y Adherencia)
// 3. espejos (Puntos Ciegos y Espejos Retrovisores)
// 4. pasajeros (Pasajeros, Acompañante y Carga)
// 5. clima (Calzada Mojada, Lluvia y Clima Adverso)
// 6. velocidad (Límites de Velocidad, Vías y Prioridades)
// 7. normativa (Documentación, VTV, Alcoholemia y Leyes)
// ============================================================

const MOTO_QUESTIONS = [
    {
        "id": 1,
        "category": "normativa",
        "question": "Indique cuál es la premisa correcta:",
        "options": [
            "A. Al tener más alternativas de movilidad no motorizada, como el uso de bicicleta, mayor es la probabilidad de siniestralidad.",
            "B. Al disminuir la cantidad de vehículos particulares, mayor es la probabilidad de siniestralidad.",
            "C. A mayor cantidad de vehículos motorizados, mayor probabilidad de siniestralidad."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: A mayor cantidad de vehículos motorizados, mayor probabilidad de siniestralidad.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 2,
        "category": "normativa",
        "question": "¿Cuál de las siguientes opciones representa a los usuarios de la vía, ordenados de más a menos vulnerable?",
        "options": [
            "A. Camión - Colectivo - Moto - Ciclista - Peatón - Taxi/Automóvil.",
            "B. Peatón - Ciclista - Moto - Colectivo - Taxi/Automóvil - Camión.",
            "C. Peatón - Ciclista - Colectivo - Moto - Taxi/Automóvil - Camión."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Peatón - Ciclista - Moto - Colectivo - Taxi/Automóvil - Camión.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 3,
        "category": "normativa",
        "question": "¿Está permitido estacionar una bicicleta en este lugar?",
        "options": [
            "A. No, los estacionamientos son exclusivos para usuarios de autos y motos.",
            "B. Sólo en algunos estacionamientos está permitido.",
            "C. Sí, los estacionamientos están obligados a destinar un espacio para bicicletas."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image174.jpg",
        "explanation": "Correcto. Recuerda: Sí, los estacionamientos están obligados a destinar un espacio para bicicletas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 4,
        "category": "casco",
        "question": "Es correcto el desplazamiento del motociclista que circula con el casco puesto y las luces encendidas.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image70.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 5,
        "category": "velocidad",
        "question": "¿Puede un motovehículo circular por el carril señalizado en esta imagen?",
        "options": [
            "A. No, ya que es de uso exclusivo de bicicletas.",
            "B. Sí, ya que es un vehículo de 2 ruedas.",
            "C. Sí, siempre y cuando no circulen bicicletas."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image89.jpg",
        "explanation": "Correcto. Recuerda: No, ya que es de uso exclusivo de bicicletas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 6,
        "category": "normativa",
        "question": "¿Cuáles de los motovehículos que se muestran en la imagen circulan en infracción?",
        "options": [
            "A. Los motovehículos A y C.",
            "B. Los motovehículos A y B .",
            "C. Los motovehículos A, B y C."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image177.jpg",
        "explanation": "Correcto. Recuerda: Los motovehículos A, B y C.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 7,
        "category": "pasajeros",
        "question": "Además de colectivos, ¿quiénes pueden circular por este carril?",
        "options": [
            "A. Taxis con pasajeros.",
            "B. Motos.",
            "C. Ambas respuestas, la A y la B, son incorrectas."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image278.jpg",
        "explanation": "Correcto. Recuerda: Ambas respuestas, la A y la B, son incorrectas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 8,
        "category": "normativa",
        "question": "El motovehículo que se muestra en la imagen circula correctamente, sin entorpecer la circulación.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image234.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 9,
        "category": "velocidad",
        "question": "¿Para qué sirve la demarcación horizontal de color amarillo que se visualiza en la imagen?",
        "options": [
            "A. Ampliar la zona permitida de estacionamiento para motos.",
            "B. Reducir la velocidad y radio de giro de los vehículos.",
            "C. Ampliar la zona permitida de estacionamiento para vehículos de emergencia."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image66.jpg",
        "explanation": "Correcto. Recuerda: Reducir la velocidad y radio de giro de los vehículos.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 10,
        "category": "casco",
        "question": "Si ud. se encuentra involucrado en un siniestro de tránsito en el cual un motociclista resultó herido, pero ud. no es el conductor del vehículo implicado, ¿cómo debería actuar en esta situación?",
        "options": [
            "A. Brindar colaboración, solicitar auxilio llamando al 107 para que reciba atención médica y contribuir al esclarecimiento de los hechos.",
            "B. Brindar colaboración, aunque al no ser el conductor no estoy obligado a hacerlo.",
            "C. Antes de llevar a cabo cualquier valoración del estado general de la víctima, retirar el casco para que no se asfixie."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Brindar colaboración, solicitar auxilio llamando al 107 para que reciba atención médica y contribuir al esclarecimiento de los hechos.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 11,
        "category": "velocidad",
        "question": "En un motovehículo, ¿dónde debe transportar la siguiente documentación?",
        "options": [
            "A. Debe exhibirla en el parabrisas de la moto.",
            "B. Debe exhibirla en el tanque.",
            "C. Debe llevarla consigo mientras conduce, como el resto de la documentación obligatoria."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image42.jpg",
        "explanation": "Correcto. Recuerda: Debe llevarla consigo mientras conduce, como el resto de la documentación obligatoria.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 12,
        "category": "velocidad",
        "question": "Un conductor principiante de motovehículo, ¿tiene obligación de llevar la siguiente documentación?",
        "options": [
            "A. No, ya que esa es una obligación que afecta únicamente a los conductores de automóviles.",
            "B. Sí, hasta cumplirse los 6 meses.",
            "C. Sí, hasta que se renueve la licencia de conducir."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image213.jpg",
        "explanation": "Correcto. Recuerda: Sí, hasta cumplirse los 6 meses.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 13,
        "category": "velocidad",
        "question": "Con esta documentación, ¿quién está autorizado a conducir el motovehículo?",
        "options": [
            "A. Nadie, porque está vencida y debe renovarse.",
            "B. Sólo el titular.",
            "C. El titular y sus familiares directos, por tener el mismo apellido."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image44.jpg",
        "explanation": "Correcto. Recuerda: Sólo el titular.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 14,
        "category": "velocidad",
        "question": "NO está prohibido circular con la placa de dominio del motovehículo de esta forma.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image68.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 15,
        "category": "velocidad",
        "question": "Para la circulación de motovehículos, la placa de dominio trasera…",
        "options": [
            "A. Puede sustituirse por la inscripción de la matrícula pintada en los guardabarros traseros.",
            "B. No es obligatoria.",
            "C. Debe estar colocada centrada respecto al eje longitudinal medio del motovehículo."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Debe estar colocada centrada respecto al eje longitudinal medio del motovehículo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 16,
        "category": "velocidad",
        "question": "¿Cuántas placas de dominio deben llevar los motovehículos?",
        "options": [
            "A. Una, colocada en la parte trasera, centrada en el eje longitudinal medio del motovehículo.",
            "B. Dos, una en la parte delantera y otra en la parte trasera.",
            "C. Una, colocada del lado izquierdo del motovehículo."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Una, colocada en la parte trasera, centrada en el eje longitudinal medio del motovehículo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 17,
        "category": "velocidad",
        "question": "¿Se encuentra permitido circular con esta impresión de placa de dominio?",
        "options": [
            "A. Sí, ya que cumple la función de identificar al motovehículo.",
            "B. No, ya que la válida es la entregada por la autoridad competente de nivel nacional (DNRPA) y debe estar colocada en el lugar y de forma reglamentaria.",
            "C. Sí, ya que es una placa provisoria."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image259.jpg",
        "explanation": "Correcto. Recuerda: No, ya que la válida es la entregada por la autoridad competente de nivel nacional (DNRPA) y debe estar colocada en el lugar y de forma reglamentaria.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 18,
        "category": "velocidad",
        "question": "Al sufrir la pérdida de la placa de dominio de un vehículo, ¿dónde se puede solicitar su reposición?",
        "options": [
            "A. Se la puede solicitar en cualquier establecimiento comercial que la realice.",
            "B. Se la debe solicitar en el Registro Nacional de la Propiedad del Automotor que corresponde al vehículo.",
            "C. Ambas respuestas, la A y la B, son correctas."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Se la debe solicitar en el Registro Nacional de la Propiedad del Automotor que corresponde al vehículo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 19,
        "category": "velocidad",
        "question": "La ubicación y posición de la placa de dominio del motovehículo, ¿puede sufrir algún tipo de modificación?",
        "options": [
            "A. Sólo puede, eventualmente, ampliarse para mejorar su visibilidad.",
            "B. No, debe estar colocada en el lugar y de forma reglamentaria.",
            "C. Sólo está prohibido modificar su posición pero no el lugar donde se exhibe."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sólo está prohibido modificar su posición pero no el lugar donde se exhibe.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 20,
        "category": "velocidad",
        "question": "¿Cada cuánto tiempo deben realizar la VTV los motovehículos?",
        "options": [
            "A. Cada 6 meses.",
            "B. Los motovehículos están exceptuados de esta obligación.",
            "C. La revisión es anual."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: La revisión es anual.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 21,
        "category": "velocidad",
        "question": "¿Cuándo debe realizar la primer VTV un motovehículo?",
        "options": [
            "A. A los 5 años.",
            "B. A los 2 años.",
            "C. Al año."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Al año.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 22,
        "category": "normativa",
        "question": "Cuando se consume alcohol, ¿se pueden producir alteraciones en la visión?",
        "options": [
            "A. Sí.",
            "B. No, solamente afecta a la capacidad motora.",
            "C. Sólo cuando se tiene más de 1 gramo de alcohol por litro de sangre."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 23,
        "category": "pasajeros",
        "question": "Beber cerveza, ¿puede influir en la conducción de un motovehículo?",
        "options": [
            "A. No, porque es una bebida con bajo contenido de alcohol y no afecta al equilibrio.",
            "B. Sí, porque contiene alcohol y reduce la capacidad de reacción, aumentando el tiempo necesario para responder ante un estímulo.",
            "C. La cerveza, al tener poca graduación alcohólica, no afecta la conducción si se está habituado a tomarla."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí, porque contiene alcohol y reduce la capacidad de reacción, aumentando el tiempo necesario para responder ante un estímulo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 24,
        "category": "normativa",
        "question": "Si un conductor de motovehículo obtiene el siguiente resultado en un control de alcoholemia realizado en la Ciudad Autónoma de Buenos Aires, ¿cómo debe proceder la autoridad de control de tránsito?",
        "options": [
            "A. Sancionar la falta administrativa y contravencional, retener la licencia de conducir y remitir el vehículo.",
            "B. Esperar un tiempo prudencial y realizar una contraprueba, a la espera de que descienda la graduación alcohólica.",
            "C. Darle la opción al conductor de llamar a un tercero para que se haga responsable de la conducción del vehículo."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image123.jpg",
        "explanation": "Correcto. Recuerda: Sancionar la falta administrativa y contravencional, retener la licencia de conducir y remitir el vehículo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 25,
        "category": "velocidad",
        "question": "En materia de señalamiento horizontal, ¿qué se entiende por “isleta”?",
        "options": [
            "A. Son las rotondas.",
            "B. Son los espacios reservados para estacionamiento exclusivo de motovehículos.",
            "C. Son las marcas canalizadoras de tránsito. No se puede traspasar o circular sobre ellas."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Son las marcas canalizadoras de tránsito. No se puede traspasar o circular sobre ellas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 26,
        "category": "frenado",
        "question": "¿Qué significa la demarcación horizontal señalada?",
        "options": [
            "A. Carril exclusivo para motos.",
            "B. Zona de estacionamiento para motos.",
            "C. Zona de detención segura de motos."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image94.jpg",
        "explanation": "Correcto. Recuerda: Zona de detención segura de motos.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 27,
        "category": "frenado",
        "question": "¿Para qué sirve la demarcación horizontal señalada?",
        "options": [
            "A. Mejorar la visibilidad de los motovehículos e indicar la presencia de una zona de detención exclusiva de los mismos.",
            "B. Permitir la circulación exclusiva de los motovehículos por un carril.",
            "C. Señalizar que por allí está prohibida la circulación de  motovehículos."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image264.jpg",
        "explanation": "Correcto. Recuerda: Mejorar la visibilidad de los motovehículos e indicar la presencia de una zona de detención exclusiva de los mismos.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 28,
        "category": "pasajeros",
        "question": "Según la Ley N° 2148, ¿qué indica un cordón pintado de este color?",
        "options": [
            "A. Área reservada de estacionamiento exclusivo de ciclorodados (bicicletas) y motovehículos.",
            "B. Lugar reservado para ascenso y descenso de pasajeros.",
            "C. Zona exclusiva para carga y descarga de mercaderías."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image201.jpg",
        "explanation": "Correcto. Recuerda: Área reservada de estacionamiento exclusivo de ciclorodados (bicicletas) y motovehículos.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 29,
        "category": "velocidad",
        "question": "En la siguiente situación, el motovehículo…",
        "options": [
            "A. Puede adelantarse, pero utilizando la luz intermitente de giro izquierda.",
            "B. Puede adelantarse, pero tocando la bocina.",
            "C. No puede realizar el sobrepaso."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image232.jpg",
        "explanation": "Correcto. Recuerda: No puede realizar el sobrepaso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 30,
        "category": "normativa",
        "question": "El motovehículo señalado con el círculo rojo, ¿circula correctamente?",
        "options": [
            "A. Sí, porque circula paralelo con otros vehículos y no en zig zag.",
            "B. Sí, porque tiene la luz encendida.",
            "C. No, porque está prohibido circular por esa zona."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image274.jpg",
        "explanation": "Correcto. Recuerda: No, porque está prohibido circular por esa zona.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 31,
        "category": "velocidad",
        "question": "Según las normas generales, ¿cuál es la velocidad máxima permitida para un motovehículo en esta avenida?",
        "options": [
            "A. 40 km/h.",
            "B. 70 km/h.",
            "C. 60 km/h."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image233.jpg",
        "explanation": "Correcto. Recuerda: 60 km/h.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 32,
        "category": "velocidad",
        "question": "¿Cuál es la velocidad máxima permitida para un motovehículo en este tramo de la avenida?",
        "options": [
            "A. 60 km/h.",
            "B. 50 km/h.",
            "C. 40 km/h."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image130.jpg",
        "explanation": "Correcto. Recuerda: 40 km/h.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 33,
        "category": "velocidad",
        "question": "¿Cuál es la velocidad máxima permitida para motovehículos en la Avenida Costanera Rafael Obligado que se visualiza en la imagen?",
        "options": [
            "A. 60 km/h.",
            "B. 70 km/h.",
            "C. 50 km/h."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image192.jpg",
        "explanation": "Correcto. Recuerda: 70 km/h.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 34,
        "category": "velocidad",
        "question": "¿Cuál es la velocidad máxima permitida para motovehículos en este tramo de la Av. Costanera Rafael Obligado?",
        "options": [
            "A. 60 km/h.",
            "B. 70 km/h.",
            "C. 40 km/h."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image14.jpg",
        "explanation": "Correcto. Recuerda: 60 km/h.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 35,
        "category": "velocidad",
        "question": "Según la Ley 2148, los límites de velocidad para un motovehículo que circula por esta arteria son de 30 km/h (mínima) y 60 km/h (máxima).",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image248.jpg",
        "explanation": "Correcto. Recuerda: Verdadero.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 36,
        "category": "velocidad",
        "question": "Según las normas generales, ¿cuál es la velocidad máxima permitida para motovehículos en esta zona de la ruta?",
        "options": [
            "A. 110 km/h.",
            "B. 130 km/h.",
            "C. 80 km/h."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image31.jpg",
        "explanation": "Correcto. Recuerda: 110 km/h.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 37,
        "category": "velocidad",
        "question": "Según Ley N° 2148, ¿cuál es la velocidad máxima permitida para motovehículos en los carriles centrales de la Av. Gral. Paz, en el tramo entre Autopista Ingeniero Pascual Palazzo y Av. 27 de Febrero?",
        "options": [
            "A. 60 km/h.",
            "B. 80 km/h.",
            "C. 100 km/h."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: 80 km/h.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 38,
        "category": "velocidad",
        "question": "¿Cuál es la velocidad máxima permitida para un motovehículo en Av. Intendente Cantilo, salvo señalización que indique otra velocidad?",
        "options": [
            "A. 60 km/h.",
            "B. 110 km/h.",
            "C. 100 km/h."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: 100 km/h.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 39,
        "category": "velocidad",
        "question": "Según la Ley Nacional N° 24.449, ¿cuál es la velocidad máxima permitida para motovehículos en semiautopistas?",
        "options": [
            "A. 130 km/h.",
            "B. 120 km/h.",
            "C. 110 km/h."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: 120 km/h.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 40,
        "category": "velocidad",
        "question": "Según la Ley 2148, al circular con un motovehículo detrás de este camión, ¿cuál es la distancia mínima de seguridad que debe mantener respecto de él? La distancia que resulte de una separación de por lo menos…",
        "options": [
            "A. Un segundo.",
            "B. Dos segundos.",
            "C. Cinco segundos."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image1.jpg",
        "explanation": "Correcto. Recuerda: Dos segundos.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 41,
        "category": "velocidad",
        "question": "¿Cuál es la velocidad máxima permitida para motovehículos en este tramo de la Av. Gral Roca, por encontrarse cerca de un establecimiento escolar?",
        "options": [
            "A. 30 km/h.",
            "B. 40 km/h.",
            "C. 60 km/h."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image161.jpg",
        "explanation": "Correcto. Recuerda: 30 km/h.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 42,
        "category": "normativa",
        "question": "El motovehículo de la imagen, ¿se encuentra  correctamente estacionado?",
        "options": [
            "A. Sí, porque la vereda tiene más de tres metros y no obstruye el paso peatonal.",
            "B. No. Sólo puede estacionarse sobre la vereda si existe una señalización que lo autorice.",
            "C. Sí, sólo los motovehículos pueden estacionarse sobre cualquier vereda."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image22.jpg",
        "explanation": "Correcto. Recuerda: No. Sólo puede estacionarse sobre la vereda si existe una señalización que lo autorice.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 43,
        "category": "normativa",
        "question": "Según la Ley N° 2148, ¿está permitido estacionar un motovehículo del modo que se visualiza en la imagen?",
        "options": [
            "A. No, salvo que exista señalización que lo permita.",
            "B. Sí, de 07 a 21 horas durante días no hábiles.",
            "C. Sí, de 21 a 07 horas durante los días hábiles."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image165.jpg",
        "explanation": "Correcto. Recuerda: No, salvo que exista señalización que lo permita.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 44,
        "category": "normativa",
        "question": "Si su motovehículo no funciona, ud. puede estacionarlo durante unos días hasta que sea reparado, tal como se muestra en la imagen.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image52.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 45,
        "category": "velocidad",
        "question": "Los motovehículos, ¿cuándo están obligados a circular con la luz baja encendida?",
        "options": [
            "A. Durante las 24 hs y en todo tipo de vía.",
            "B. Al circular por autopistas, semiautopistas o rutas, aunque sea de día.",
            "C. Sólo durante la noche o con días de poca visibilidad, por cualquier vía."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Durante las 24 hs y en todo tipo de vía.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 46,
        "category": "velocidad",
        "question": "En cuanto al uso reglamentario de luces, ¿este motovehículo circula correctamente?",
        "options": [
            "A. Sí, ya que las luces sólo deben utilizarse en condiciones meteorológicas adversas.",
            "B. Sí, ya que las luces sólo deben utilizarse por autopistas, semiautopistas y rutas.",
            "C. No. Es obligatorio el uso de la luz baja las 24 horas del día y en todo tipo de vía."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image191.jpg",
        "explanation": "Correcto. Recuerda: No. Es obligatorio el uso de la luz baja las 24 horas del día y en todo tipo de vía.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 47,
        "category": "normativa",
        "question": "Cuando se circula de día y con suficiente luz natural por la Av. Cantilo, ¿qué luces debe llevar encendidas en su motovehículo?",
        "options": [
            "A. Solamente la luz de posición.",
            "B. La luz baja.",
            "C. Ninguna, dado que las condiciones de visibilidad son suficientes."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: La luz baja.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 48,
        "category": "clima",
        "question": "Un motovehículo, ¿puede estar provisto de luz rompeniebla delantero?",
        "options": [
            "A. Sí, aunque no es obligatorio.",
            "B. No, en ningún caso.",
            "C. No, sólo puede disponer de la luz antiniebla trasera."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí, aunque no es obligatorio.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 49,
        "category": "clima",
        "question": "Con esta condición climática, el motovehículo se adhiere mejor a la calzada si...",
        "options": [
            "A. Se aumenta la presión de aire del neumático.",
            "B. El neumático conserva el dibujo en toda la superficie.",
            "C. Se baja la presión de aire del neumático."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image119.jpg",
        "explanation": "Correcto. Recuerda: El neumático conserva el dibujo en toda la superficie.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 50,
        "category": "frenado",
        "question": "Si se encuentra conduciendo un motovehículo con la calzada mojada porque llovió, en el caso de frenada, esta situación provocará...",
        "options": [
            "A. Una disminución del tiempo de reacción.",
            "B. Un aumento de la distancia de reacción.",
            "C. Un aumento de la distancia de frenado."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Un aumento de la distancia de frenado.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 51,
        "category": "frenado",
        "question": "Si al conducir un motovehículo por una calzada mojada con charcos y los frenos se mojan, perdiendo su eficacia. ¿Qué resultaría conveniente hacer para secarlos?",
        "options": [
            "A. Acelerar progresivamente.",
            "B. Frenar con fuerza.",
            "C. Frenar suavemente y de forma repetida, mientras se mantiene la aceleración."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Frenar suavemente y de forma repetida, mientras se mantiene la aceleración.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 52,
        "category": "clima",
        "question": "Frente a estas condiciones climáticas si el conductor reduce la velocidad de circulación de su motovehículo, ¿disminuiría la posibilidad de participar de un siniestro?",
        "options": [
            "A. Sólo en la medida en que el conductor circule con las balizas encendidas.",
            "B. Siempre, ya que el exceso de velocidad es en sí mismo un factor esencial en la producción de incidentes de tránsito.",
            "C. Lo más recomendable es detenerse sobre el margen derecho de la calzada y esperar que pase el banco de niebla."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image131.jpg",
        "explanation": "Correcto. Recuerda: Siempre, ya que el exceso de velocidad es en sí mismo un factor esencial en la producción de incidentes de tránsito.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 53,
        "category": "frenado",
        "question": "Si circula con un motovehículo en una calzada en estas condiciones, ¿qué técnica de conducción debe emplear?",
        "options": [
            "A. Utilizar una velocidad reducida, evitando aceleraciones y frenadas bruscas.",
            "B. Dar aceleraciones y frenadas frecuentes para evitar quedar atascado.",
            "C. Circular a medio embrague, manteniendo permanentemente frenada la rueda delantera."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image102.jpg",
        "explanation": "Correcto. Recuerda: Utilizar una velocidad reducida, evitando aceleraciones y frenadas bruscas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 54,
        "category": "clima",
        "question": "Bajo estas condiciones climáticas ¿qué debe hacer para circular con seguridad con un ciclomotor?",
        "options": [
            "A. Circular más cerca de los vehículos que van delante, para reducir la resistencia del viento.",
            "B. Zigzaguear con el ciclomotor para corregir las desviaciones.",
            "C. Sujetar firmemente el manubrio del ciclomotor y reducir la velocidad."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image169.jpg",
        "explanation": "Correcto. Recuerda: Sujetar firmemente el manubrio del ciclomotor y reducir la velocidad.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 55,
        "category": "clima",
        "question": "Frente a esta situación, ¿qué precaución especial se debería adoptar al conducir un motovehículo?",
        "options": [
            "A. Utilizar el alumbrado delantero de niebla.",
            "B. Disminuir la velocidad y aumentar la distancia de seguridad cuando circule detrás de un vehículo.",
            "C. Disminuir la distancia de seguridad cuando circule detrás de un vehículo."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image108.jpg",
        "explanation": "Correcto. Recuerda: Disminuir la velocidad y aumentar la distancia de seguridad cuando circule detrás de un vehículo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 56,
        "category": "normativa",
        "question": "En este tipo de vía, ¿está permitido remolcar con su motovehículo a otro que se encuentra descompuesto?",
        "options": [
            "A. Sí, ya que es riesgoso que quede detenido pero sólo puede hacerse hasta el lugar más próximo donde pueda quedar inmovilizado.",
            "B. Sí, pero sólo si soy titular de una licencia que autoriza a conducir vehículos con remolque.",
            "C. No, sólo pueden hacerlo los vehículos autorizados a tal fin."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image86.jpg",
        "explanation": "Correcto. Recuerda: No, sólo pueden hacerlo los vehículos autorizados a tal fin.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 57,
        "category": "pasajeros",
        "question": "¿Es correcta esta manera de acarrear a un motovehículo?",
        "options": [
            "A. Sí, pero se deberá mantener una distancia de 1,50 metros entre ambos motovehículos.",
            "B. No, los motovehículos deben ser acarreados sólo por un vehículo autorizado a tal fin.",
            "C. Sólo si el motovehículo remolcado es de menor cilindrada."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image187.jpg",
        "explanation": "Correcto. Recuerda: No, los motovehículos deben ser acarreados sólo por un vehículo autorizado a tal fin.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 58,
        "category": "normativa",
        "question": "De acuerdo a la Ley N°2148 durante la siguiente circunstancia, ¿qué acción está prohibida realizar?",
        "options": [
            "A. Ubicarse cerca del surtidor.",
            "B. Dejar el motor y las luces encendidas.",
            "C. Sólo dejar el motor encendido."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image280.jpg",
        "explanation": "Correcto. Recuerda: Dejar el motor y las luces encendidas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 59,
        "category": "normativa",
        "question": "Es importante realizar un correcto mantenimiento vehicular porque...",
        "options": [
            "A. Evita desperfectos del motor y ayuda a reducir el consumo de combustible.",
            "B. Ayuda a reducir el factor de riesgo vehicular involucrado en los siniestros viales.",
            "C. Ambas respuestas, A y B, son correctas."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Ambas respuestas, A y B, son correctas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 60,
        "category": "velocidad",
        "question": "Para que un motovehículo circule correctamente, ¿qué sector del carril debe utilizar?",
        "options": [
            "A. El más cercano a las líneas horizontales que ordenan la circulación de carriles.",
            "B. Por el centro del carril.",
            "C. Ambas respuestas, la A y la B, son correctas."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Por el centro del carril.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 61,
        "category": "velocidad",
        "question": "Esta manera de circular se puede realizar sólo si se hace a baja velocidad y se recorren distancias cortas",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image85.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 62,
        "category": "velocidad",
        "question": "Si se encuentra conduciendo un motovehículo a excesiva velocidad en este tramo de la ruta, ¿cómo es recomendable que actúe para controlar el mismo?",
        "options": [
            "A. Frenando bruscamente y, al mismo tiempo, inclinándome lo más posible.",
            "B. Enderezando rápidamente el motovehículo y acelerando.",
            "C. Desacelerando e inclinándome lo más posible hacia el interior de la curva."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image105.jpg",
        "explanation": "Correcto. Recuerda: Desacelerando e inclinándome lo más posible hacia el interior de la curva.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 63,
        "category": "frenado",
        "question": "Conduciendo un motovehículo, ante una frenada de emergencia, nunca se debe frenar única y bruscamente con el freno delantero.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Verdadero.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 64,
        "category": "frenado",
        "question": "En líneas generales, para que se accione esta luz, será preciso…",
        "options": [
            "A. Accionar siempre y al mismo tiempo el freno delantero y el trasero.",
            "B. Accionar cualquiera de los dos frenos, ya sea de forma simultánea o por separado.",
            "C. Únicamente accionar el freno trasero."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image117.jpg",
        "explanation": "Correcto. Recuerda: Accionar cualquiera de los dos frenos, ya sea de forma simultánea o por separado.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 65,
        "category": "espejos",
        "question": "Si los espejos retrovisores de su vehículo están bien orientados, igualmente es posible que se produzcan puntos ciegos cuando observe por los mismos.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Verdadero.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 66,
        "category": "espejos",
        "question": "¿Cómo se pueden reducir los puntos ciegos al conducir un motovehículo?",
        "options": [
            "A. Acomodar correctamente los espejos retrovisores antes de iniciar la marcha. Mientras se circula, además de revisar los espejos retrovisores, utilizar la visión periférica dando vistazos por encima de los hombros cuando sea  necesario.",
            "B. Antes de realizar una maniobra se debe disminuir la velocidad de circulación, colocar la luz de giro y mirar por los espejos realizando un pequeño movimiento corporal hacia adelante para ampliar el ángulo de visión.",
            "C. Ambas respuestas, A y B, son correctas."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Ambas respuestas, A y B, son correctas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 67,
        "category": "espejos",
        "question": "¿A qué se llama “Punto Ciego”?",
        "options": [
            "A. Al área de visión del entorno, a la que el conductor no tiene acceso ya sea de manera directa o porque los espejos retrovisores no la reflejan.",
            "B. Sólo al área de visión que no es cubierta por los espejos retrovisores.",
            "C. Al punto imaginario ubicado en el horizonte de una ruta."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Al área de visión del entorno, a la que el conductor no tiene acceso ya sea de manera directa o porque los espejos retrovisores no la reflejan.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 68,
        "category": "espejos",
        "question": "Un motovehículo, ¿puede circular sin espejos?",
        "options": [
            "A. Sí, pero se debe observar hacia los costados antes de hacer alguna maniobra.",
            "B. Sólo si es de una cilindrada inferior a 150 CC.",
            "C. No, está prohibido."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: No, está prohibido.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 69,
        "category": "espejos",
        "question": "Un ciclomotor, con respecto a los espejos retrovisores…",
        "options": [
            "A. No está obligado a llevar ninguno.",
            "B. Sólo está obligado a llevar el del lado izquierdo.",
            "C. Debe llevar ambos espejos retrovisores."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Debe llevar ambos espejos retrovisores.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 70,
        "category": "espejos",
        "question": "Para realizar una conducción segura, ¿cuándo es recomendable verificar la orientación de los espejos retrovisores?",
        "options": [
            "A. Antes de iniciar la marcha.",
            "B. Durante la conducción, para poder hacer una prueba real.",
            "C. Con el vehículo inmovilizado y el conductor fuera del mismo."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Antes de iniciar la marcha.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 71,
        "category": "casco",
        "question": "Al conducir un motovehículo, ¿es obligatorio utilizar un chaleco reflectivo?",
        "options": [
            "A. Sí, es obligatorio el uso del chaleco reflectivo con el número de dominio impreso en la parte delantera y trasera.",
            "B. Sí, para utilizarlo en caso de lluvia.",
            "C. No es obligatorio, aunque es recomendable llevar ropa reflectiva para ser vistos por el resto de los conductores."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: No es obligatorio, aunque es recomendable llevar ropa reflectiva para ser vistos por el resto de los conductores.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 72,
        "category": "casco",
        "question": "¿El conductor de un motovehículo está obligado a utilizar el siguiente elemento de seguridad?",
        "options": [
            "A. Sí, es obligatorio cuando el motovehículo no tiene parabrisas y el casco utilizado no tiene visor.",
            "B. Su uso no es obligatorio, sólo está recomendado en cualquier circunstancia para proteger los ojos.",
            "C. Su uso es obligatorio siempre, en cualquier circunstancia."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image2.jpg",
        "explanation": "Correcto. Recuerda: Sí, es obligatorio cuando el motovehículo no tiene parabrisas y el casco utilizado no tiene visor.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 73,
        "category": "casco",
        "question": "De acuerdo a la Ley 2148, ¿es correcta la manera de circular del acompañante respecto a la protección ocular?",
        "options": [
            "A. Sí, porque sólo el conductor está obligado a usar protección ocular.",
            "B. No, porque el acompañante siempre está obligado a usar protección para sus ojos.",
            "C. No, porque el acompañante debe usar protección ocular cuando el motovehículo no cuenta con parabrisas."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image243.jpg",
        "explanation": "Correcto. Recuerda: Sí, porque sólo el conductor está obligado a usar protección ocular.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 74,
        "category": "casco",
        "question": "Cuando un motovehículo no tiene parabrisas, el conductor está obligado a usar protección para los ojos (visor en el casco o anteojos de seguridad). ¿Esta obligación rige también para el acompañante?",
        "options": [
            "A. No, no está obligado aunque es recomendable.",
            "B. Sí, cuando hay mucho viento.",
            "C. Sí, cuando circula por caminos de tierra."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: No, no está obligado aunque es recomendable.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 75,
        "category": "casco",
        "question": "No es aconsejable que los conductores de motovehículos lleven siempre colocados guantes de moto en sus manos.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 76,
        "category": "normativa",
        "question": "Este motociclista tiene los 3 principales elementos de seguridad recomendados para un conductor de motovehículo.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image198.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 77,
        "category": "casco",
        "question": "¿Es aconsejable que los conductores de motovehículos usen guantes de protección?",
        "options": [
            "A. No, porque perjudica la adherencia al manillar.",
            "B. Sí, ya que ayudan a proteger sus manos y muñecas frente a una colisión o caída.",
            "C. Sólo en viajes largos, ya sea en vía urbana o rural."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí, ya que ayudan a proteger sus manos y muñecas frente a una colisión o caída.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 78,
        "category": "casco",
        "question": "¿Cuál es la vestimenta recomendada para conducir un motovehículo?",
        "options": [
            "A. Debería ser holgada para conducir más cómodo y tener colores que no encandilen al resto de los conductores.",
            "B. Debería ser de tela resistente, de colores claros y/o con bandas reflectantes.",
            "C. No existe recomendación sobre el tema ya que no influye en su seguridad."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Debería ser de tela resistente, de colores claros y/o con bandas reflectantes.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 79,
        "category": "casco",
        "question": "En función a la seguridad vial, ¿tiene importancia la ropa que utilicen los conductores y acompañantes de motovehículos?",
        "options": [
            "A. No, es indistinto siempre que lleven los cascos homologados y bien colocados.",
            "B. Sí, porque colabora con su visibilidad, resguarda el cuerpo de las inclemencias del tiempo y puede brindar protección en caso de caídas.",
            "C. Sólo el chaleco reflectante es importante."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí, porque colabora con su visibilidad, resguarda el cuerpo de las inclemencias del tiempo y puede brindar protección en caso de caídas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 80,
        "category": "casco",
        "question": "Al conducir un motovehículo, utilizar ropa de protección...",
        "options": [
            "A. Resulta eficaz porque, en caso de siniestro, evita o reduce la gravedad de ciertas lesiones.",
            "B. No es recomendable en zona urbana porque quita libertad de movimientos al conductor.",
            "C. Sólo debe utilizarse en trayectos largos por ruta."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Resulta eficaz porque, en caso de siniestro, evita o reduce la gravedad de ciertas lesiones.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 81,
        "category": "casco",
        "question": "La vestimenta con protecciones para conducir motovehículos debe ser...",
        "options": [
            "A. De colores claros o con bandas reflectantes para que se pueda distinguir al conductor a suficiente distancia.",
            "B. De colores oscuros, para así no distraer a los conductores.",
            "C. De cualquier color siempre que sea de material sintético."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: De colores claros o con bandas reflectantes para que se pueda distinguir al conductor a suficiente distancia.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 82,
        "category": "normativa",
        "question": "Para tener seguridad y control sobre los mandos de un motovehículo conviene que el conductor utilice botas que…",
        "options": [
            "A. Tengan tacón, queden ajustadas y sean altas.",
            "B. Sean bajas, preferentemente acordonadas y con puntera reforzada de acero.",
            "C. Queden sujetas, sin tacón ni cordones."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Queden sujetas, sin tacón ni cordones.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 83,
        "category": "casco",
        "question": "¿Qué se entiende por casco homologado?",
        "options": [
            "A. Se refiere a la certificación que debe cumplir un casco, confirmando que es apto y seguro para usarlo.",
            "B. Indica la marca del fabricante.",
            "C. Se refiere a la procedencia y fecha de vencimiento del mismo."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Se refiere a la certificación que debe cumplir un casco, confirmando que es apto y seguro para usarlo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 84,
        "category": "normativa",
        "question": "¿A qué tipo de seguridad pertenece el siguiente elemento?",
        "options": [
            "A. A la seguridad pasiva.",
            "B. A la seguridad activa.",
            "C. Ambas respuestas, la A y la B, son correctas."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image199.jpg",
        "explanation": "Correcto. Recuerda: A la seguridad pasiva.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 85,
        "category": "casco",
        "question": "Un requisito obligatorio que debe cumplir el casco para motociclista es que…",
        "options": [
            "A. Debe estar homologado o certificado para su uso específico.",
            "B. Debe ser de uso exclusivo de motovehículos.",
            "C. Debe poseer visor."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Debe estar homologado o certificado para su uso específico.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 86,
        "category": "casco",
        "question": "¿Está permitido circular en un motovehículo con este tipo de casco?",
        "options": [
            "A. Sí, sólo en distancias cortas y siempre que esté correctamente ajustado.",
            "B. Sí, sólo ante una emergencia y siempre que esté correctamente ajustado.",
            "C. Nunca, ya que éste no es un casco homologado."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image219.jpg",
        "explanation": "Correcto. Recuerda: Nunca, ya que éste no es un casco homologado.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 87,
        "category": "casco",
        "question": "¿Cuál de los siguientes cascos brinda mayor protección?",
        "options": [
            "A. El casco A.",
            "B. El casco B.",
            "C. Los dos brindan idéntica protección."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image125.jpg",
        "explanation": "Correcto. Recuerda: El casco A.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 88,
        "category": "casco",
        "question": "El casco homologado que brinda mayor protección es del tipo:",
        "options": [
            "A. Abierto.",
            "B. Integral.",
            "C. Abierto o Integral. Ambos brindan idéntica protección."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Integral.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 89,
        "category": "casco",
        "question": "En la siguiente imagen ¿el casco A brinda mayor protección que el B?",
        "options": [
            "A. Sí, porque es el que usan los corredores profesionales de automovilismo.",
            "B. Sí, porque con éste está protegida la mandíbula.",
            "C. No, no hay pruebas de que sea más seguro."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image202.jpg",
        "explanation": "Correcto. Recuerda: Sí, porque con éste está protegida la mandíbula.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 90,
        "category": "casco",
        "question": "Una de las principales causas de mortalidad en siniestros de tránsito donde los motovehículos están involucrados, es…",
        "options": [
            "A. El peso del vehículo.",
            "B. La no utilización correcta del casco.",
            "C. La fricción con el asfalto."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: La no utilización correcta del casco.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 91,
        "category": "casco",
        "question": "En caso de siniestro con un motovehículo, la importancia del uso correcto del casco es…",
        "options": [
            "A. Mayor para el acompañante que para el conductor, porque sus lesiones serán de mayor gravedad.",
            "B. Mayor para el conductor que para el acompañante, porque caerá primero.",
            "C. Igual para el conductor y el acompañante, porque la posibilidad de lesiones es idéntica en ambos."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Igual para el conductor y el acompañante, porque la posibilidad de lesiones es idéntica en ambos.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 92,
        "category": "casco",
        "question": "Circulando en un motovehículo, ¿cuándo debe usar este elemento de protección?",
        "options": [
            "A. Sólo en días de lluvia u horarios nocturnos.",
            "B. Sólo en distancias largas.",
            "C. Ambas respuestas, la A y la B, son incorrectas."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image281.jpg",
        "explanation": "Correcto. Recuerda: Ambas respuestas, la A y la B, son incorrectas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 93,
        "category": "casco",
        "question": "En un motovehículo, cuando se usa correctamente el casco se tiene un...",
        "options": [
            "A. 44% menos de probabilidades de lesiones graves.",
            "B. 62% menos de probabilidades de lesiones graves.",
            "C. 85% menos de probabilidades de lesiones graves."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: 85% menos de probabilidades de lesiones graves.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 94,
        "category": "casco",
        "question": "Ante la caída de un motociclista que circula a 25 km/h sin casco, ¿pueden producirse lesiones de gravedad, como fractura de cráneo y daños cerebrales?",
        "options": [
            "A. No, ya que a esa velocidad sufrir un impacto en la cabeza o en otra parte del cuerpo, no tendría consecuencias.",
            "B. Sí, podrían producirse ya que al no tener casco no está protegido ante un impacto.",
            "C. Sólo puede existir riesgo de fractura de cráneo, pero nunca lesiones cerebrales."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí, podrían producirse ya que al no tener casco no está protegido ante un impacto.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 95,
        "category": "casco",
        "question": "Usar el visor del casco rayado, ¿ puede afectar negativamente la conducción de un motovehículo?",
        "options": [
            "A. Sí, ya que produce fatiga visual.",
            "B. Sí, de noche produce reflejos que distorsionan la visión.",
            "C. Ambas respuestas, la A y la B, son correctas."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Ambas respuestas, la A y la B, son correctas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 96,
        "category": "casco",
        "question": "Su casco de protección ha sufrido un golpe pero no se observa ningún deterioro, ¿este golpe pudo haber afectado su eficacia?",
        "options": [
            "A. Sí, aunque no se observen daños en su exterior.",
            "B. No, porque sólo se ve afectado si se observan abolladuras en el exterior.",
            "C. Sólo si se aprecian grietas en el interior."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí, aunque no se observen daños en su exterior.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 97,
        "category": "normativa",
        "question": "El conductor del motovehículo que se muestra en la imagen NO está en infracción.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image6.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 98,
        "category": "casco",
        "question": "El uso adecuado del casco implica que la correa de sujeción debe llevarse abrochada según las circunstancias del tránsito.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 99,
        "category": "casco",
        "question": "Al utilizar el casco en un motovehículo es fundamental…",
        "options": [
            "A. Que la correa de sujeción esté correctamente abrochada.",
            "B. Que exteriormente no presente abolladuras, aunque haya sufrido alguna caída anterior.",
            "C. Que quede holgado porque así brinda mayor comodidad para conducir."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Que la correa de sujeción esté correctamente abrochada.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 100,
        "category": "casco",
        "question": "Para que el uso del casco de un motovehículo cumpla su función protectora...",
        "options": [
            "A. La correa de sujeción debe estar siempre abrochada.",
            "B. Debe quedar bastante holgado, ya que resulta más cómodo para el conductor.",
            "C. Debe encontrarse en buenas condiciones. El modo en que se encuentra sujetado no influye en la protección que brinda."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: La correa de sujeción debe estar siempre abrochada.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 101,
        "category": "casco",
        "question": "¿Es igual de seguro si el casco para conducir un motovehículo está abrochado con la correa apretada al mentón o floja?",
        "options": [
            "A. Sí, no tiene importancia mientras que esté abrochado.",
            "B. No. El casco debe estar abrochado pero es mejor si queda holgado ya que resulta más cómodo para el conductor.",
            "C. No. El casco debe estar abrochado de modo que un dedo pueda pasar entre la correa y el mentón."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: No. El casco debe estar abrochado de modo que un dedo pueda pasar entre la correa y el mentón.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 102,
        "category": "casco",
        "question": "Un casco de protección para motovehículos que participó en un siniestro vial, no pierde su eficacia si es que no se observan abolladuras o daños en su exterior.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 103,
        "category": "casco",
        "question": "¿Los cascos de protección para motovehículos tienen vencimiento?",
        "options": [
            "A. No, tienen vigencia mientras se encuentren en buen estado.",
            "B. Sí, la fecha la especifica el fabricante.",
            "C. Sí, a los 10 años."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí, la fecha la especifica el fabricante.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 104,
        "category": "casco",
        "question": "¿Cómo puede saber cuál es la medida del casco de protección que corresponde al usuario de un motovehículo?",
        "options": [
            "A. Midiendo la circunferencia de la cabeza a la altura de la frente y por sobre las orejas.",
            "B. El que sea más cómodo para el conductor.",
            "C. Midiendo la distancia desde el mentón hasta la zona superior de la cabeza."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Midiendo la circunferencia de la cabeza a la altura de la frente y por sobre las orejas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 105,
        "category": "casco",
        "question": "No todos los cascos de protección de motovehículos que están homologados, permiten identificar visiblemente el talle del mismo.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 106,
        "category": "casco",
        "question": "La manera segura de utilizar el casco protector de un motociclista, es que éste quede...",
        "options": [
            "A. Holgado.",
            "B. Justo.",
            "C. Muy apretado."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Justo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 107,
        "category": "normativa",
        "question": "Frente a la siguiente situación, existirá menos riesgo de caída si se atraviesa con el motovehículo de forma que las ruedas y la vía formen un ángulo…",
        "options": [
            "A. Lo más cerrado posible.",
            "B. Lo más recto posible.",
            "C. Ambas respuestas, la A y la B, son correctas."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image190.jpg",
        "explanation": "Correcto. Recuerda: Lo más recto posible.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 108,
        "category": "pasajeros",
        "question": "En caso de un siniestro vial, el conductor de un motovehículo que utiliza todas las medidas de seguridad presenta en relación al conductor de un automóvil…",
        "options": [
            "A. Igual riesgo de resultar herido.",
            "B. Menor riesgo de resultar herido.",
            "C. Mayor riesgo de resultar herido."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Mayor riesgo de resultar herido.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 109,
        "category": "espejos",
        "question": "La imagen que se visualiza representa…",
        "options": [
            "A. El riesgo que implica la conducción de un motovehículo porque circula a más velocidad que los automóviles.",
            "B. Que el motovehículo se encuentra ubicado en un punto ciego del espejo retrovisor.",
            "C. Que el motovehículo no se encuentra ubicado en un punto ciego del espejo retrovisor."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image64.jpg",
        "explanation": "Correcto. Recuerda: Que el motovehículo no se encuentra ubicado en un punto ciego del espejo retrovisor.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 110,
        "category": "clima",
        "question": "Al acelerar un motovehículo, ¿hacia dónde se desplaza la masa?",
        "options": [
            "A. Se distribuirá de forma pareja sobre cada rueda.",
            "B. Hacia la rueda trasera.",
            "C. Hacia la rueda delantera pudiendo provocar, incluso, pérdida de adherencia de la rueda trasera a la calzada."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Hacia la rueda trasera.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 111,
        "category": "frenado",
        "question": "Al frenar correctamente un motovehículo…",
        "options": [
            "A. La rueda trasera soporta el mayor esfuerzo de frenado, ya que es la directriz.",
            "B. La rueda delantera soporta el mayor esfuerzo de frenado.",
            "C. Las dos ruedas soportan el mismo esfuerzo de frenado."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: La rueda delantera soporta el mayor esfuerzo de frenado.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 112,
        "category": "normativa",
        "question": "La posición de conducción en un motovehículo debe ser…",
        "options": [
            "A. Lo más distante posible al centro de gravedad.",
            "B. En la parte más próxima al centro de gravedad.",
            "C. Lo más avanzada posible."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: En la parte más próxima al centro de gravedad.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 113,
        "category": "pasajeros",
        "question": "La posición corporal de este acompañante no es recomendable.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image63.jpg",
        "explanation": "Correcto. Recuerda: Verdadero.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 114,
        "category": "pasajeros",
        "question": "Mientras un motovehículo está detenido, es recomendable que el acompañante…",
        "options": [
            "A. Mantenga los pies en los apoyapies.",
            "B. Coloque los pies en el suelo para contribuir al equilibrio del vehículo.",
            "C. Coloque un pie en el suelo y otro en el apoyapié."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Mantenga los pies en los apoyapies.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 115,
        "category": "frenado",
        "question": "En general, los mandos accionados con la mano señalada son:",
        "options": [
            "A. El acelerador y la maneta del freno delantero.",
            "B. La maneta de embrague, la bocina y las luces de giro.",
            "C. La maneta de embrague y se acciona el acelerador."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image74.jpg",
        "explanation": "Correcto. Recuerda: La maneta de embrague, la bocina y las luces de giro.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 116,
        "category": "frenado",
        "question": "Generalmente, ¿qué elemento de la motocicleta se acciona con el pie señalado?",
        "options": [
            "A. El embrague.",
            "B. El cambio de marchas.",
            "C. El pedal de freno de la rueda trasera."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image46.jpg",
        "explanation": "Correcto. Recuerda: El pedal de freno de la rueda trasera.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 117,
        "category": "frenado",
        "question": "Si su motovehículo dispone de mandos independientes para frenar cada rueda, uno en el manillar y otro en el pedal, ¿que rueda frena el mando situado en el manillar?",
        "options": [
            "A. La trasera.",
            "B. La delantera.",
            "C. Ambas respuestas, la A y la B, son correctas."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: La delantera.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 118,
        "category": "frenado",
        "question": "En relación al peso, ¿qué debe tener en cuenta en la siguiente situación?",
        "options": [
            "A. Que la distancia de frenado será menor.",
            "B. Que la distancia de frenado será mayor.",
            "C. Nada, ya que el peso de un acompañante no interviene en la conducción."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image135.jpg",
        "explanation": "Correcto. Recuerda: Que la distancia de frenado será mayor.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 119,
        "category": "normativa",
        "question": "¿Cúal es la función principal del siguiente elemento?",
        "options": [
            "A. Regular el paso de nafta del depósito a la cuba del carburador.",
            "B. Regular el paso del líquido refrigerante del carburador a los cilindros.",
            "C. Controlar el correcto engrase y mantenimiento de los elementos del sistema de transmisión."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image151.jpg",
        "explanation": "Correcto. Recuerda: Regular el paso de nafta del depósito a la cuba del carburador.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 120,
        "category": "velocidad",
        "question": "En general, el cambio de velocidades de una motocicleta, ¿con qué pie se acciona?",
        "options": [
            "A. Pie Izquierdo.",
            "B. Pie Derecho.",
            "C. No se acciona con el pie."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Pie Izquierdo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 121,
        "category": "normativa",
        "question": "La postura corporal del conductor de un motovehículo, en condiciones de conducción urbana, debe ser…",
        "options": [
            "A. Un poco forzada, porque permite mejor maniobrabilidad.",
            "B. Relajada, sin encorvar el cuerpo más de lo necesario.",
            "C. Encorvando el cuerpo, lo más aerodinámica posible."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Relajada, sin encorvar el cuerpo más de lo necesario.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 122,
        "category": "normativa",
        "question": "La posición corporal para conducir un motovehículo recomendada es…",
        "options": [
            "A. Erguida y forzada.",
            "B. Centrada y relajada.",
            "C. Lo más avanzada posible."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Centrada y relajada.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 123,
        "category": "normativa",
        "question": "¿Cómo deben encontrarse los neumáticos para comprobar la correcta presión de aire?",
        "options": [
            "A. Fríos.",
            "B. Calientes.",
            "C. Es indistinto, al ser de caucho se mantienen aislados de la temperatura."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Fríos.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 124,
        "category": "pasajeros",
        "question": "¿En qué momento es necesario renovar el siguiente elemento de seguridad? Cuando la profundidad del dibujo es menor de…",
        "options": [
            "A. 1,6 mm.",
            "B. 1,0 mm.",
            "C. 0,5 mm."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image196.jpg",
        "explanation": "Correcto. Recuerda: 1,0 mm.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 125,
        "category": "pasajeros",
        "question": "En relación al peso transportado en este vehículo, ¿qué debe realizar el conductor antes de circular?",
        "options": [
            "A. Adecuar la presión según indicación del fabricante del motovehículo.",
            "B. Duplicar la presión en las cubiertas, para tener mayor adherencia.",
            "C. Reducir la presión en las cubiertas, para tener mayor adherencia."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image167.jpg",
        "explanation": "Correcto. Recuerda: Adecuar la presión según indicación del fabricante del motovehículo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 126,
        "category": "normativa",
        "question": "El siguiente elemento de seguridad, ¿debe ser sustituido?",
        "options": [
            "A. Sí, por otro en buen estado.",
            "B. No, ya que la única prohibición es circular con neumáticos que presenten cortes o deformaciones.",
            "C. No, porque así el vehículo se desliza mejor y consume menos combustible."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image168.jpg",
        "explanation": "Correcto. Recuerda: Sí, por otro en buen estado.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 127,
        "category": "pasajeros",
        "question": "Cuando la cubierta de un motovehículo tiene más presión que la adecuada…",
        "options": [
            "A. El motovehículo podrá doblar mejor.",
            "B. El motovehículo podrá frena mejor.",
            "C. El motovehículo tiene menor adherencia a la calzada."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: El motovehículo tiene menor adherencia a la calzada.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 128,
        "category": "frenado",
        "question": "Al realizar con un motovehículo un giro muy cerrado, a una velocidad de 30 km/h, ¿qué puede suceder si en dicho giro aprieta fuertemente el freno delantero?",
        "options": [
            "A. Nada, debido a que a esa velocidad el efecto giroscópico estabilizará el motovehículo.",
            "B. Que la rueda delantera quede bloqueada y produzca una caída.",
            "C. Que la rueda trasera quede bloqueada por la fuerza cinética y se produzca una caída."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Que la rueda delantera quede bloqueada y produzca una caída.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 129,
        "category": "frenado",
        "question": "Si frena un motovehículo en línea recta y mantiene apretadas sus rodillas contra el depósito de combustible, conseguirá que…",
        "options": [
            "A. El motovehículo, gracias a la fuerza centrífuga, no salga de la calzada.",
            "B. Su cuerpo se mantenga más estable y no se deslice hacia adelante.",
            "C. El freno trasero sea más eficaz que el delantero."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Su cuerpo se mantenga más estable y no se deslice hacia adelante.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 130,
        "category": "frenado",
        "question": "Si se tiene una distancia corta para detenerse, ¿cómo debería frenar un motovehículo para que sea seguro?",
        "options": [
            "A. Usando sólo el freno trasero.",
            "B. Usando correctamente ambos frenos.",
            "C. Accionando fuertemente el freno delantero."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Usando correctamente ambos frenos.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 131,
        "category": "frenado",
        "question": "Según la Ley 2148, ¿los motovehículos deben estar provistos de un dispositivo que asegure un frenado eficaz, rápido o progresivo en TODAS las ruedas?",
        "options": [
            "A. Sí. Aplica a todos los modelos independientemente al número de ruedas que tenga.",
            "B. Sí, salvo los triciclos y cuatriciclos a quienes la Ley los exceptúa de que sea en todas sus ruedas.",
            "C. Sí, salvo los ciclomotores que tienen dicha obligación en la rueda trasera."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí. Aplica a todos los modelos independientemente al número de ruedas que tenga.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 132,
        "category": "frenado",
        "question": "Es obligatorio que los motovehículos tengan…",
        "options": [
            "A. Un dispositivo que asegure el frenado en todas las ruedas.",
            "B. Un único freno, en la parte trasera.",
            "C. Un único freno, en la parte delantera."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Un dispositivo que asegure el frenado en todas las ruedas.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 133,
        "category": "frenado",
        "question": "En un motovehículo, la distancia del asiento al piso…",
        "options": [
            "A. Incide en la estabilidad y el equilibrio.",
            "B. No tiene relevancia.",
            "C. Es fundamental para el frenado."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Incide en la estabilidad y el equilibrio.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 134,
        "category": "clima",
        "question": "Si el sistema de amortiguación delantero de su vehículo se encuentra en mal estado, ¿puede afectar esta anomalía la conducción?",
        "options": [
            "A. No, porque al ser el sistema de suspensión delantero el deteriorado, éste no influirá en la conducción.",
            "B. Sí, puede afectar al correcto control del vehículo.",
            "C. No, porque si se encuentra correctamente la suspensión trasera, ésta asegurará el contacto adecuado de las ruedas con la calzada."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí, puede afectar al correcto control del vehículo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 135,
        "category": "frenado",
        "question": "Si tiene que conducir un motovehículo por una zona resbaladiza, ¿qué precauciones debe tomar?",
        "options": [
            "A. Frenar en la zona para controlar la trayectoria.",
            "B. Acelerar para pasar por la zona en el menor tiempo posible.",
            "C. Disminuir la velocidad antes de llegar y mantener la moto vertical al pasar sobre ella."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Disminuir la velocidad antes de llegar y mantener la moto vertical al pasar sobre ella.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 136,
        "category": "normativa",
        "question": "Si al conducir un motovehículo, usted sufre una caída que no le produce lesión alguna, ¿qué comportamiento debería adoptar si desea proseguir el viaje?",
        "options": [
            "A. Reanudar inmediatamente la marcha para no entorpecer la circulación.",
            "B. Esperar por lo menos una hora antes de reanudar la marcha.",
            "C. Antes de continuar circulando, realizar las comprobaciones necesarias para valorar el estado en el que se encuentra el motovehículo."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Antes de continuar circulando, realizar las comprobaciones necesarias para valorar el estado en el que se encuentra el motovehículo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 137,
        "category": "pasajeros",
        "question": "Frente a la siguiente situación, ¿qué posición debe adoptar el acompañante de un motovehículo?",
        "options": [
            "A. La misma que adopte el conductor pero anticipándose a él.",
            "B. La contraria a la que adopte el conductor, para así contrarrestar la fuerza centrífuga.",
            "C. La misma posición e inclinación que adopte el conductor."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image4.jpg",
        "explanation": "Correcto. Recuerda: La misma posición e inclinación que adopte el conductor.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 138,
        "category": "pasajeros",
        "question": "Si un motovehículo dispone de 2 baúles laterales para llevar carga, ¿cómo es recomendable utilizarlas?",
        "options": [
            "A. Cargarlas, de modo que ambas maletas queden aproximadamente con el mismo peso, para colaborar con la estabilidad.",
            "B. Cargar más la maleta del lado derecho, para contrarrestar el peso al realizar un sobrepaso.",
            "C. Cargar con más peso el baúl del lado izquierdo, para favorecer la reincorporación en caso de realizar un sobrepaso."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Cargarlas, de modo que ambas maletas queden aproximadamente con el mismo peso, para colaborar con la estabilidad.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 139,
        "category": "pasajeros",
        "question": "Este motociclista y sus acompañantes están circulando de manera segura y correcta.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image121.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 140,
        "category": "normativa",
        "question": "La manera de circular de esta niña de 5 años es incorrecta.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 0,
        "imageSrc": "img/moto/image83.jpg",
        "explanation": "Correcto. Recuerda: Verdadero.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 141,
        "category": "normativa",
        "question": "Según la Ley 2148, el niño de 10 años de edad que se observa detrás del conductor, se encuentra circulando de manera segura y correcta.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image145.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 142,
        "category": "normativa",
        "question": "El niño que se observa delante del conductor, se encuentra circulando de manera segura y correcta.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image67.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 143,
        "category": "casco",
        "question": "Según la Ley 2148, ¿es correcta la manera de circular del acompañante?",
        "options": [
            "A. Sí, pero sólo cuando el conductor sea el padre, la madre o tutor encargado.",
            "B. Sí, siempre y cuando utilice un casco adecuado a su talla y no se interponga en el campo visual del conductor.",
            "C. No, porque los acompañantes deben ser mayores de 16 años y circular en el asiento trasero."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image55.jpg",
        "explanation": "Correcto. Recuerda: No, porque los acompañantes deben ser mayores de 16 años y circular en el asiento trasero.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 144,
        "category": "pasajeros",
        "question": "Este niño, menor de 12 años, circula de manera segura y correcta ya que está utilizando un sistema de retención infantil (SRI).",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image277.jpg",
        "explanation": "Correcto. Recuerda: Falso.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 145,
        "category": "normativa",
        "question": "En un motovehículo pueden circular hasta dos personas, sólo si cuenta con doble asiento, reposapiés y agarradera.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Verdadero.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 146,
        "category": "casco",
        "question": "Para circular en C.A.B.A., ¿el conductor de un motovehículo está obligado a llevar el número de la patente impreso en el chaleco reflectivo?",
        "options": [
            "A. Sí, en la parte delantera y trasera.",
            "B. No. El uso del chaleco es obligatorio pero no la impresión de la patente.",
            "C. No. Sólo es obligatorio para el acompañante."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: No. Sólo es obligatorio para el acompañante.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 147,
        "category": "casco",
        "question": "En relación al chaleco reflectante y de acuerdo al Código de Tránsito y Transporte de CABA, ¿es correcta la manera de circular observada en la siguiente imagen?",
        "options": [
            "A. Sí, su uso es obligatorio sólo en caso de escasa visibilidad.",
            "B. Sí, su uso es obligatorio sólo si se circula en la zona del Microcentro porteño.",
            "C. Sí, su uso es obligatorio para el acompañante."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí, su uso es obligatorio para el acompañante.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 148,
        "category": "casco",
        "question": "Según el Código de Tránsito y Transporte de CABA, los conductores de motovehículos son responsables…",
        "options": [
            "A. De que su eventual acompañante no posea antecedentes penales.",
            "B. De que su eventual acompañante utilice el casco protector homologado o certificado, el chaleco reflectante con el número de dominio impreso y que no tenga un dosaje de alcohol superior a 0,5 g/l de sangre.",
            "C. Ambas respuestas (A y B) son correctas."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: De que su eventual acompañante utilice el casco protector homologado o certificado, el chaleco reflectante con el número de dominio impreso y que no tenga un dosaje de alcohol superior a 0,5 g/l de sangre.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 149,
        "category": "casco",
        "question": "El conductor de un motovehículo, ¿es responsable de que el acompañante que traslada tenga debidamente colocado el casco protector?",
        "options": [
            "A. No, porque cada persona adulta es responsable de sus propios actos.",
            "B. Sólo si es menor de edad.",
            "C. Sí, porque es responsable de lo que respecta a ese vehículo y sus usuarios."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Sí, porque es responsable de lo que respecta a ese vehículo y sus usuarios.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 150,
        "category": "normativa",
        "question": "En relación a los elementos de seguridad obligatorios de un motociclista, ¿qué deben hacer los agentes de control de tránsito frente a esta situación?",
        "options": [
            "A. Deben labrar un acta de infracción al motociclista.",
            "B. Deben labrar un acta de infracción al motociclista y retener el motovehículo.",
            "C. Deben labrar un acta de infracción al motociclista, retener la licencia de conducir y remitir el motovehículo."
        ],
        "correctAnswer": 2,
        "imageSrc": "img/moto/image76.jpg",
        "explanation": "Correcto. Recuerda: Deben labrar un acta de infracción al motociclista, retener la licencia de conducir y remitir el motovehículo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 151,
        "category": "casco",
        "question": "Según la Ley 2148, el acompañante de un motovehículo…",
        "options": [
            "A. Debe circular con el casco con la numeración del dominio, correctamente colocado.",
            "B. Debe circular con el casco correctamente colocado y un chaleco reflectante; ambos deberán tener el número de dominio del motovehículo.",
            "C. Debe circular con el casco correctamente colocado y un chaleco reflectante con el número de dominio del motovehículo."
        ],
        "correctAnswer": 2,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Debe circular con el casco correctamente colocado y un chaleco reflectante con el número de dominio del motovehículo.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 152,
        "category": "velocidad",
        "question": "La edad mínima para obtener una licencia de conducir motovehículos, excepto ciclomotores, es de 17 años.",
        "options": [
            "A. Verdadero.",
            "B. Falso."
        ],
        "correctAnswer": 0,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Verdadero.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 153,
        "category": "velocidad",
        "question": "¿Cuál es la edad mínima que se requiere para obtener la licencia de conducir ciclomotores?",
        "options": [
            "A. 18 años.",
            "B. 16 años.",
            "C. 21 años."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: 16 años.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 154,
        "category": "normativa",
        "question": "Según la Ley Nº 2148, ¿está permitido el faro delantero de este motovehículo?",
        "options": [
            "A. No, ya que debería tener dos faros.",
            "B. No, ya que debería ser blanco.",
            "C. Sí, ya que la Ley sólo indica la obligación del uso de un faro pero no especifica su color."
        ],
        "correctAnswer": 1,
        "imageSrc": "img/moto/image79.jpg",
        "explanation": "Correcto. Recuerda: No, ya que debería ser blanco.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    },
    {
        "id": 155,
        "category": "velocidad",
        "question": "¿Qué indica esta señal reglamentaria?",
        "options": [
            "A. Indica que el carril sobre el que se encuentra la señal, no puede ser utilizado por motocicletas y ciclomotores.",
            "B. Indica que el carril sobre el que se encuentra la señal, es de uso exclusivo para motocicletas y ciclomotores.",
            "C. Indica que el carril sobre el que se encuentra la señal, es de uso exclusivo para bicicletas."
        ],
        "correctAnswer": 1,
        "imageSrc": null,
        "explanation": "Correcto. Recuerda: Indica que el carril sobre el que se encuentra la señal, es de uso exclusivo para motocicletas y ciclomotores.. Es de suma importancia cumplir estrictamente esta pauta técnica e incorporar buenos hábitos de conducción defensiva para prevenir incidentes de tránsito."
    }
];
