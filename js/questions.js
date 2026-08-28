// Data set of questions from "preguntas RULETA.docx"
const CATEGORIES = {
  bicicleta: { id: "bicicleta", name: "Bicicleta", icon: "🚲", color: "#059669", badge: "bg-emerald-600" },
  peatones: { id: "peatones", name: "Peatones", icon: "🚶", color: "#0284C7", badge: "bg-sky-600" },
  todos: { id: "todos", name: "Todos", icon: "🚗", color: "#D97706", badge: "bg-amber-600" },
  escolares: { id: "escolares", name: "Escolares", icon: "🚸", color: "#DC2626", badge: "bg-red-600" },
  buses: { id: "buses", name: "Buses", icon: "🚌", color: "#7C3AED", badge: "bg-purple-600" }
};

const QUESTIONS = [
  {
    id: 1,
    category: "bicicleta",
    question: "Los ciclistas no están obligados a respetar todas las normas de tránsito, ya que no utilizan un vehículo que genera altas velocidades.",
    options: [
      "A. Verdadero.",
      "B. Falso."
    ],
    correctAnswer: 1,
    explanation: "Falso. Los ciclistas son conductores de vehículos en la vía pública y están sujetos a respetar todas las normas de tránsito vigentes (Ley de Tránsito)."
  },
  {
    id: 2,
    category: "bicicleta",
    question: "¿Cuál de las siguientes opciones representa a los usuarios de la vía, ordenados de más a menos vulnerable?",
    options: [
      "A. Camión - Colectivo - Moto - Ciclista - Peatón - Taxi/Automóvil.",
      "B. Peatón - Ciclista - Moto - Colectivo - Taxi/Automóvil - Camión.",
      "C. Peatón - Ciclista - Colectivo - Moto - Taxi/Automóvil - Camión."
    ],
    correctAnswer: 1,
    explanation: "La pirámide de movilidad urbana ubica primero a los más vulnerables: Peatón > Ciclista > Motociclista > Transporte público > Automóviles particulares > Vehículos de carga."
  },
  {
    id: 3,
    category: "bicicleta",
    question: "¿A qué medio de transporte corresponden todos los siguientes beneficios: ecológico, saludable, económico y rápido?",
    options: [
      "A. Bicicleta",
      "B. Taxi",
      "C. Colectivo"
    ],
    correctAnswer: 0,
    explanation: "La bicicleta no produce emisiones contaminantes, ejercita al cuerpo, ahorra costos de combustible y es ágil en el tránsito urbano."
  },
  {
    id: 4,
    category: "bicicleta",
    question: "¿Qué se debe evitar al circular en bicicleta?",
    options: [
      "A. Usar auriculares y dispositivos electrónicos, que afecten la concentración.",
      "B. Usar ropa oscura y suelta.",
      "C. Ambas respuestas, A y B, son correctas."
    ],
    correctAnswer: 2,
    explanation: "Ambas son correctas. Se deben evitar los auriculares para oír el entorno y la ropa oscura/suelta por temas de visibilidad y enganches en la cadena."
  },
  {
    id: 5,
    category: "bicicleta",
    question: "¿Está permitido llevar carga en una bicicleta?",
    options: [
      "A. Sí, lo único que se debe tener en cuenta es que no comprometa la visibilidad.",
      "B. No, está prohibido ya que puede desestabilizar la bicicleta.",
      "C. Sí, debe estar firmemente asegurada, permitiendo maniobrar y no perder la estabilidad."
    ],
    correctAnswer: 2,
    explanation: "Está permitido siempre que la carga vaya sujetada firmemente y no dificulte la visión ni desequilibre al ciclista al conducir."
  },
  {
    id: 6,
    category: "bicicleta",
    question: "El ciclista, ¿tiene permitido llevar un pasajero?",
    options: [
      "A. Sí, únicamente si no compromete la visibilidad.",
      "B. Sí, mientras que esté ubicado en un asiento adicional detrás del conductor.",
      "C. Ambas respuestas, A y B, son incorrectas."
    ],
    correctAnswer: 1,
    explanation: "Únicamente se permite acompañante si la bicicleta está equipada con un asiento suplementario homologado diseñado para ello."
  },
  {
    id: 7,
    category: "bicicleta",
    question: "Un menor de 12 años puede circular en bicicleta por...",
    options: [
      "A. La calle, acompañado de un adulto mayor de 18 años.",
      "B. Por la vereda, a la menor velocidad posible.",
      "C. Ambas respuestas, A y B, son correctas."
    ],
    correctAnswer: 2,
    explanation: "Según las normas vigentes, los menores de 12 años pueden ir por la vereda a paso peatonal o por la calle junto a un mayor de 18 años."
  },
  {
    id: 8,
    category: "bicicleta",
    question: "¿Cuál es la velocidad máxima permitida para circular con una bicicleta con asistencia eléctrica?",
    options: [
      "A. La velocidad máxima permitida en la vía donde se encuentra la ciclovía.",
      "B. 25 km/h.",
      "C. 30 km/h."
    ],
    correctAnswer: 1,
    explanation: "Las bicicletas asistidas eléctricamente (Pedelecs) tienen tope legal de asistencia de motor a 25 km/h."
  },
  {
    id: 9,
    category: "bicicleta",
    question: "¿Qué distancia lateral debe dejar respecto de un ciclista en caso de querer adelantarlo?",
    options: [
      "A. Al menos, un metro y medio.",
      "B. Al menos, medio metro.",
      "C. Lo suficiente para no tocarlo."
    ],
    correctAnswer: 0,
    explanation: "La distancia lateral mínima de seguridad reglamentaria para adelantar a un ciclista es de 1,5 metros."
  },
  {
    id: 10,
    category: "bicicleta",
    question: "¿Por dónde tienen permitida la circulación los ciclistas mayores de 12 años?",
    options: [
      "A. Por bicisendas y ciclovías, en aquellos tramos de arterias donde estén presentes.",
      "B. En aquellas vías sin ciclovías deben circular por el sector derecho de la calzada, a excepción de autopistas y otras vías rápidas, donde se encuentra prohibida su circulación.",
      "C. Ambas respuestas, la A y la B, son correctas."
    ],
    correctAnswer: 2,
    explanation: "Deben prioridad a las vías exclusivas (ciclovías/bicisendas). De no haberlas, deben ir por el margen derecho de calles comunes. En autopistas está prohibido."
  },
  {
    id: 11,
    category: "bicicleta",
    question: "¿Cuál es la principal diferencia entre bicisendas y ciclovías?",
    options: [
      "A. La bicisenda es de uso exclusivo de bicicletas y la ciclovía de uso preferencial.",
      "B. La bicisenda se encuentra sobre la calzada y la ciclovía sobre la vereda.",
      "C. La bicisenda se encuentra sobre la vereda y la ciclovía sobre la calzada."
    ],
    correctAnswer: 2,
    explanation: "La bicisenda se ubica en aceras, veredas o parques, mientras que la ciclovía se demarca sobre la calle/calzada."
  },
  {
    id: 12,
    category: "bicicleta",
    question: "¿Qué es una ciclovía?",
    options: [
      "A. Sector señalizado especialmente en la calzada para la circulación con carácter preferente de ciclorodados (bicicletas) y dispositivos de movilidad personal.",
      "B. Sector de la calzada señalizado especialmente con una separación física o demarcación horizontal para la circulación exclusiva de ciclorodados (bicicletas) y dispositivos de movilidad personal.",
      "C. Sector señalizado y especialmente acondicionado en aceras y espacios verdes para la circulación de ciclorodados (bicicletas) y dispositivos de movilidad personal."
    ],
    correctAnswer: 1,
    explanation: "La ciclovía es un sector diferenciado en la calzada con delimitación física o demarcación exclusiva para bicicletas y movilidad personal."
  },
  {
    id: 13,
    category: "peatones",
    question: "Cuando no hay demarcación de la senda peatonal, ¿por dónde deben cruzar los peatones?",
    options: [
      "A. Es indistinto, siempre que miren a ambos lados antes de hacerlo.",
      "B. En coincidencia con las paradas de transporte.",
      "C. Por la esquina, por la prolongación longitudinal de la vereda sobre la calle."
    ],
    correctAnswer: 2,
    explanation: "En esquinas sin pintura o demarcación explícita, la senda peatonal imaginaria es la prolongación imaginaria de las veredas."
  },
  {
    id: 14,
    category: "todos",
    question: "Si usted circula en el carril contiguo al carril exclusivo del Metrobús y desea realizar un sobrepaso a otro vehículo que circula más lento, ¿puede utilizar el carril exclusivo para hacer esta maniobra?",
    options: [
      "A. No, porque está prohibido circular de manera permanente o transitoria por dicho carril.",
      "B. Sí, sólo cuando la línea longitudinal del lado exterior de este carril sea discontinua.",
      "C. Sí, porque sólo se permite su utilización para realizar alguna maniobra."
    ],
    correctAnswer: 0,
    explanation: "Queda estrictamente prohibido utilizar los carriles exclusivos de Metrobús para sobrepasos o circulación transitoria."
  },
  {
    id: 15,
    category: "todos",
    question: "¿Qué son los carriles exclusivos?",
    options: [
      "A. Vías con un único sentido de circulación.",
      "B. Bandas longitudinales demarcadas en la calzada, destinadas a la circulación de determinados vehículos.",
      "C. Lugar por donde circulan ambulancias, bomberos y/o vehículos policiales, en cumplimiento o no de sus funciones."
    ],
    correctAnswer: 1,
    explanation: "Son franjas de la calzada reservadas de forma prioritaria o exclusiva para tipos específicos de transporte (colectivos, taxis, etc.)."
  },
  {
    id: 16,
    category: "todos",
    question: "Según la Ley N° 2148, ¿cuál es la velocidad precautoria frente a establecimientos escolares durante los horarios de ingreso y egreso?",
    options: [
      "A. Es de 20 km/h para todas las arterias.",
      "B. No más de 30 km/h en calles y de 45 km/h en avenidas.",
      "C. Es igual a la mínima establecida para el tipo de arteria correspondiente."
    ],
    correctAnswer: 0,
    explanation: "La velocidad máxima precautoria en zonas escolares en horarios de entrada/salida de alumnos es de 20 km/h en todas las arterias."
  },
  {
    id: 17,
    category: "escolares",
    question: "Determine qué indica la señal de tránsito que a continuación se presenta:",
    imageSvg: `<svg viewBox="0 0 100 100" class="w-32 h-32 mx-auto my-3 filter drop-shadow-lg">
      <polygon points="50,5 95,90 5,90" fill="#FFC72C" stroke="#1E293B" stroke-width="4"/>
      <polygon points="50,15 85,83 15,83" fill="#FFC72C" stroke="#1E293B" stroke-width="2"/>
      <path d="M 40,48 C 40,43 45,40 48,44 C 50,40 55,43 55,48 L 55,65 L 40,65 Z" fill="#0F172A"/>
      <circle cx="45" cy="36" r="4" fill="#0F172A"/>
      <path d="M 58,53 C 58,50 62,48 65,51 L 65,65 L 58,65 Z" fill="#0F172A"/>
      <circle cx="61" cy="44" r="3" fill="#0F172A"/>
      <rect x="33" y="65" width="34" height="4" fill="#0F172A"/>
    </svg>`,
    options: [
      "A. Niños jugando.",
      "B. Zona escolar.",
      "C. Calle peatonal."
    ],
    correctAnswer: 1,
    explanation: "La señal preventiva con niños portando útiles advierte la proximidad de una Zona Escolar."
  },
  {
    id: 18,
    category: "buses",
    question: "Los conductores de vehículos de gran porte, ¿por qué deben tener mayor precaución al girar?",
    options: [
      "A. Porque la trayectoria de sus ruedas traseras tienen un arco de curvatura de menor radio que las delanteras.",
      "B. Porque, como efecto del off-tracking, puede resultar peligroso para peatones que se disponen a cruzar y se encuentran sorpresivamente con la embestida de la pared lateral del vehículo.",
      "C. Ambas respuestas, A y B, son correctas."
    ],
    correctAnswer: 2,
    explanation: "Ambas son correctas. El fenómeno 'off-tracking' causa que las ruedas traseras cierren más el radio de giro, pudiendo invadir la vereda u otros carriles."
  }
];
