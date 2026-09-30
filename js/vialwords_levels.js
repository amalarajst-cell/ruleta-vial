const GAME_LEVELS = [
    {
        "id":  1,
        "title":  "Cruce Seguro",
        "category":  "Peatones y Convivencia",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "P",
                        "A",
                        "S",
                        "O"
                    ],
        "words":  [
                      {
                          "word":  "PASO",
                          "row":  1,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "SAPO",
                          "row":  1,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "SOPA",
                          "row":  3,
                          "col":  0,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "POSA",
                           "ASO",
                           "PAO",
                           "SOA"
                       ],
        "tipIcon":  "🚶‍♂️",
        "tipTitle":  "Prioridad Peatonal",
        "tip":  "En esquinas y sendas peatonales, el peatón siempre tiene prioridad absoluta de paso.",
        "tipDetail":  "Al aproximarte a una esquina o cruce, reducí la marcha y detenete si una persona va a cruzar."
    },
    {
        "id":  2,
        "title":  "Protección Vital",
        "category":  "Motos y Bicicletas",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "C",
                        "A",
                        "S",
                        "C",
                        "O"
                    ],
        "words":  [
                      {
                          "word":  "CASCO",
                          "row":  1,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "SACO",
                          "row":  1,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "COSA",
                          "row":  3,
                          "col":  2,
                          "dir":  "H"
                      },
                      {
                          "word":  "CASO",
                          "row":  1,
                          "col":  0,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "ASCO",
                           "CAOS",
                           "COCA",
                           "OCA",
                           "ASO"
                       ],
        "tipIcon":  "⛑️",
        "tipTitle":  "Casco Homologado y Abrochado",
        "tip":  "El casco reduce un 70% el riesgo de lesiones cerebrales graves en motos y bicis.",
        "tipDetail":  "Un casco sin abrochar sale despedido ante el primer impacto. Elegí siempre cascos certificados y de tu talle."
    },
    {
        "id":  3,
        "title":  "Detención y Distancia",
        "category":  "Frenado Seguro",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "P",
                        "A",
                        "R",
                        "E",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "PARES",
                          "row":  2,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "PARE",
                          "row":  2,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "SER",
                          "row":  2,
                          "col":  4,
                          "dir":  "V"
                      },
                      {
                          "word":  "ERA",
                          "row":  5,
                          "col":  0,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "PERA",
                           "PESA",
                           "RAPE",
                           "RES",
                           "SEA",
                           "PAR"
                       ],
        "tipIcon":  "🛑",
        "tipTitle":  "Señal de PARE",
        "tip":  "El cartel de PARE exige detener el vehículo por completo, no solo aminorar la marcha.",
        "tipDetail":  "Es una señal reglamentaria absoluta: frená a cero, observá ambos sentidos y sólo avanzá cuando esté 100% despejado."
    },
    {
        "id":  4,
        "title":  "Atención al Camino",
        "category":  "Visión y Concentración",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "M",
                        "I",
                        "R",
                        "A",
                        "R"
                    ],
        "words":  [
                      {
                          "word":  "MIRAR",
                          "row":  1,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "MIRA",
                          "row":  1,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "RIMA",
                          "row":  3,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RIMAR",
                          "row":  1,
                          "col":  2,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "MAR",
                           "IRA",
                           "MIA",
                           "RIA"
                       ],
        "tipIcon":  "👀",
        "tipTitle":  "Cero Distracciones al Volante",
        "tip":  "Mirar el celular 3 segundos a 40 km/h equivale a manejar más de 33 metros a ciegas.",
        "tipDetail":  "La vista debe estar siempre en el camino y los espejos. Ni llamadas en manos libres ni mensajes mientras manejás."
    },
    {
        "id":  5,
        "title":  "Luz y Visibilidad",
        "category":  "Señalización Óptica",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "V",
                        "I",
                        "A",
                        "L",
                        "E",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "VIALES",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "VIAL",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "ISLA",
                          "row":  -2,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "LAVE",
                          "row":  3,
                          "col":  0,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "VALE",
                           "VELA",
                           "VIA",
                           "VES",
                           "LES",
                           "ASI",
                           "IVA",
                           "AVE"
                       ],
        "tipIcon":  "💡",
        "tipTitle":  "Luces Bajas Siempre Encendidas",
        "tip":  "Las luces bajas permiten que los demás vehículos te vean a más de 1.000 metros de distancia.",
        "tipDetail":  "En rutas y autopistas es obligatorio circular con luces bajas las 24 horas. En ciudad, te hacen visible ante cualquier reflejo."
    },
    {
        "id":  6,
        "title":  "Conducción Segura",
        "category":  "Límites y Prudencia",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "M",
                        "A",
                        "N",
                        "E",
                        "J",
                        "O"
                    ],
        "words":  [
                      {
                          "word":  "MANEJO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "AJENO",
                          "row":  0,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "JAMON",
                          "row":  0,
                          "col":  4,
                          "dir":  "V"
                      },
                      {
                          "word":  "MANO",
                          "row":  3,
                          "col":  -1,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "MONJE",
                           "MOJE",
                           "AJO",
                           "ANO",
                           "EJE",
                           "NOA",
                           "AMO"
                       ],
        "tipIcon":  "🚗",
        "tipTitle":  "Distancia de Seguridad",
        "tip":  "Mantené siempre al menos 2 segundos de distancia con el auto de adelante; con lluvia, aumentala a 4 segundos.",
        "tipDetail":  "La regla de los 2 segundos te da el tiempo de reacción necesario ante una frenada intempestiva y previene choques por alcance."
    },
    {
        "id":  7,
        "title":  "Fricción y Frenado",
        "category":  "Física y Cinemática",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "F",
                        "R",
                        "E",
                        "N",
                        "O",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "FRENOS",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "FRENO",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "SER",
                          "row":  -1,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "SON",
                          "row":  3,
                          "col":  -2,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "ROSE",
                           "NOS",
                           "ERO",
                           "REO",
                           "RES",
                           "ORE",
                           "REOS",
                           "SENO"
                       ],
        "tipIcon":  "🌧️",
        "tipTitle":  "Distancia de Detención",
        "tip":  "La distancia de frenado crece con el cuadrado de la velocidad: duplicar la velocidad cuadruplica la distancia para frenar.",
        "tipDetail":  "A 40 km/h frenás en ~18 metros; a 80 km/h necesitás más de 55 metros. La energía cinética no se reduce linealmente."
    },
    {
        "id":  8,
        "title":  "Convivencia Ciclista",
        "category":  "Movilidad Sustentable",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "C",
                        "I",
                        "C",
                        "L",
                        "O",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "CICLOS",
                          "row":  1,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "COL",
                          "row":  1,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "CLIC",
                          "row":  1,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "SOL",
                          "row":  1,
                          "col":  5,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "CICLO",
                           "LOS",
                           "SIC",
                           "OLI"
                       ],
        "tipIcon":  "🚲",
        "tipTitle":  "Metro y Medio de Separación",
        "tip":  "Al sobrepasar a un ciclista, es obligatorio dejar al menos 1,5 metros de distancia lateral.",
        "tipDetail":  "La turbulencia de aire de un vehículo o un bache imprevisto pueden desestabilizar la bicicleta si no dejás margen lateral seguro."
    },
    {
        "id":  9,
        "title":  "Ceda y Rotondas",
        "category":  "Normativa y Prioridades",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "C",
                        "E",
                        "D",
                        "A",
                        "R"
                    ],
        "words":  [
                      {
                          "word":  "CEDAR",
                          "row":  1,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "CEDA",
                          "row":  1,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "DAR",
                          "row":  3,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RED",
                          "row":  1,
                          "col":  4,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "CREA",
                           "ARCE",
                           "ERA",
                           "CAE",
                           "DARE",
                           "RAE"
                       ],
        "tipIcon":  "🔄",
        "tipTitle":  "Prioridad en Rotonda",
        "tip":  "En una rotonda, la prioridad absoluta de paso la tiene siempre el que ya está circulando por ella.",
        "tipDetail":  "Quien intenta entrar debe frenar y ceder el paso a los vehículos que giran, facilitando la fluidez del nudo vial."
    },
    {
        "id":  10,
        "title":  "Presión y Contacto",
        "category":  "Seguridad Activa",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "I",
                        "R",
                        "E",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "AIRES",
                          "row":  1,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "AIRE",
                          "row":  1,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "ERA",
                          "row":  4,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "SER",
                          "row":  1,
                          "col":  4,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "RIES",
                           "RES",
                           "RIA",
                           "ASI",
                           "SEA",
                           "IRSE",
                           "IRA"
                       ],
        "tipIcon":  "🛞",
        "tipTitle":  "Presión de Neumáticos",
        "tip":  "Revisá la presión en frío cada 15 días: circular con baja presión incrementa hasta 4 metros la frenada.",
        "tipDetail":  "El neumático es el único punto de contacto con el suelo; una presión deficiente recalienta la banda de rodamiento y causa desprendimientos."
    },
    {
        "id":  11,
        "title":  "Alerta y Reflejos",
        "category":  "Factores de Riesgo",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "L",
                        "E",
                        "R",
                        "T",
                        "A"
                    ],
        "words":  [
                      {
                          "word":  "ALERTA",
                          "row":  1,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "ARTE",
                          "row":  1,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "ERA",
                          "row":  4,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "TELA",
                          "row":  1,
                          "col":  4,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "REAL",
                           "RATA",
                           "TARA",
                           "ALA",
                           "TAL",
                           "LAR",
                           "ATE",
                           "REA"
                       ],
        "tipIcon":  "⚠️",
        "tipTitle":  "Tiempo de Reacción",
        "tip":  "El cerebro humano tarda entre 1 y 1,5 segundos en percibir un peligro y pisar el pedal de freno.",
        "tipDetail":  "A 60 km/h, ese segundo y medio significa recorrer 25 metros antes de que los frenos empiecen a actuar. El cansancio duplica ese tiempo."
    },
    {
        "id":  12,
        "title":  "Rodamiento Seguro",
        "category":  "Mantenimiento Preventivo",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "R",
                        "U",
                        "E",
                        "D",
                        "A",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "RUEDAS",
                          "row":  1,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RUEDA",
                          "row":  1,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "DAR",
                          "row":  4,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "SUR",
                          "row":  1,
                          "col":  5,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "RUDA",
                           "DURA",
                           "RUSA",
                           "SUDA",
                           "ERA",
                           "RED",
                           "SER",
                           "SED",
                           "USE",
                           "USA",
                           "RUA",
                           "DURE"
                       ],
        "tipIcon":  "🔧",
        "tipTitle":  "Profundidad del Dibujo",
        "tip":  "El dibujo de las cubiertas debe tener al menos 1,6 mm de profundidad para evacuar agua eficientemente.",
        "tipDetail":  "Los canales del neumático expulsan litros de agua por segundo. Con cubiertas desgastadas o lisas, el riesgo de aquaplaning es inminente."
    },
    {
        "id":  13,
        "title":  "Sendas y Cruces",
        "category":  "Peatones y Convivencia",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "D",
                        "E",
                        "N",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "SENDA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "SEDA",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "SANE",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "ASEN",
                          "row":  0,
                          "col":  4,
                          "dir":  "V"
                      },
                      {
                          "word":  "DES",
                          "row":  3,
                          "col":  -1,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "DAN",
                           "DAS",
                           "DEN",
                           "SAN",
                           "SED"
                       ],
        "tipIcon":  "🚸",
        "tipTitle":  "Sendas Peatonales",
        "tip":  "Las franjas blancas en esquinas delimitan el espacio sagrado del peatón; nunca invadas la senda al detenerte.",
        "tipDetail":  "Detener el vehículo sobre la senda peatonal obliga a los peatones a esquivarte por la calzada, exponiéndolos a choques."
    },
    {
        "id":  14,
        "title":  "Normas de Tránsito",
        "category":  "Legislación Vial",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "M",
                        "N",
                        "O",
                        "R"
                    ],
        "words":  [
                      {
                          "word":  "NORMA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RAMO",
                          "row":  -3,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "ROMA",
                          "row":  -3,
                          "col":  4,
                          "dir":  "V"
                      },
                      {
                          "word":  "AMOR",
                          "row":  -3,
                          "col":  -2,
                          "dir":  "H"
                      },
                      {
                          "word":  "MANO",
                          "row":  -4,
                          "col":  -2,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "AMO",
                           "ARO",
                           "ORA",
                           "RON"
                       ],
        "tipIcon":  "📜",
        "tipTitle":  "Jerarquía de Normas",
        "tip":  "Las indicaciones del Agente de Tránsito prevalecen sobre semáforos, señales verticales y normas generales.",
        "tipDetail":  "El orden jerárquico es: 1° Agentes de Tránsito, 2° Señalización Transitoria, 3° Semáforos, 4° Señales verticales/horizontales, 5° Normas generales."
    },
    {
        "id":  15,
        "title":  "Calles Urbanas",
        "category":  "Velocidad Segura",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "C",
                        "E",
                        "L",
                        "L"
                    ],
        "words":  [
                      {
                          "word":  "CALLE",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "LEA",
                          "row":  -2,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "CAL",
                          "row":  -2,
                          "col":  3,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "ALE"
                       ],
        "tipIcon":  "🏙️",
        "tipTitle":  "Límite en Calles: 40 km/h",
        "tip":  "La velocidad máxima en calles comunes es de 40 km/h; en zonas escolares y hospitales se reduce a 20-30 km/h.",
        "tipDetail":  "A 40 km/h el riesgo de muerte de un peatón atropellado es del 30%; a 60 km/h ese riesgo se dispara a más del 85%."
    },
    {
        "id":  16,
        "title":  "Física del Frenado",
        "category":  "Seguridad Activa",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "E",
                        "F",
                        "N",
                        "O",
                        "R"
                    ],
        "words":  [
                      {
                          "word":  "FRENO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RENO",
                          "row":  0,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "FREO",
                          "row":  3,
                          "col":  -2,
                          "dir":  "H"
                      },
                      {
                          "word":  "FREN",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "ROE",
                          "row":  -1,
                          "col":  4,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "FEO",
                           "REO",
                           "RON"
                       ],
        "tipIcon":  "🛑",
        "tipTitle":  "Sistema de Frenos ABS",
        "tip":  "El sistema ABS evita que las ruedas se bloqueen, permitiendo mantener el control de dirección mientras frenás a fondo.",
        "tipDetail":  "Con ABS, pisá el pedal con firmeza máxima sin soltar. La vibración en el pedal es normal y confirma que está modulando la presión."
    },
    {
        "id":  17,
        "title":  "Badenes y Cunetas",
        "category":  "Infraestructura Vial",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "B",
                        "D",
                        "E",
                        "N"
                    ],
        "words":  [
                      {
                          "word":  "BADEN",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "DEN",
                          "row":  0,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "DAN",
                          "row":  0,
                          "col":  2,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "〰️",
        "tipTitle":  "Cruce de Badenes y Desniveles",
        "tip":  "Cruzá los badenes a paso de hombre y sin el pie en el freno justo al momento de entrar al desnivel.",
        "tipDetail":  "Frenar enérgicamente dentro del badén comprime los amortiguadores delanteros y provoca roces severos contra el cárter."
    },
    {
        "id":  18,
        "title":  "Accesibilidad Universal",
        "category":  "Inclusión y Convivencia",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "A",
                        "M",
                        "P",
                        "R"
                    ],
        "words":  [
                      {
                          "word":  "RAMPA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "MAPA",
                          "row":  -1,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "AMAR",
                          "row":  2,
                          "col":  1,
                          "dir":  "H"
                      },
                      {
                          "word":  "MAR",
                          "row":  2,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "PAR",
                          "row":  4,
                          "col":  0,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "♿",
        "tipTitle":  "Rampas para Discapacidad",
        "tip":  "Queda terminantemente prohibido detenerse o estacionar tapando rampas de esquinas, incluso por un minuto.",
        "tipDetail":  "Obstruir una rampa atrapa a personas en silla de ruedas, cochecitos de bebés y adultos mayores, obligándolos a bajar a la calzada vehicular."
    },
    {
        "id":  19,
        "title":  "Radio de Giro",
        "category":  "Maniobras Seguras",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "D",
                        "I",
                        "O",
                        "R"
                    ],
        "words":  [
                      {
                          "word":  "RADIO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RODA",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "RAD",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RIA",
                          "row":  -1,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "ROD",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "ARO",
                           "DAR",
                           "IRA",
                           "ORA"
                       ],
        "tipIcon":  "🧭",
        "tipTitle":  "Maniobras de Viraje",
        "tip":  "Para doblar en esquinas, señalizá con luz de giro al menos 30 metros antes y reducí la marcha gradualmente.",
        "tipDetail":  "Un giro a velocidad excesiva desplaza el centro de gravedad del vehículo hacia el exterior, reduciendo el agarre de las cubiertas internas."
    },
    {
        "id":  20,
        "title":  "Luces de Advertencia",
        "category":  "Señalización Óptica",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "A",
                        "B",
                        "I",
                        "L",
                        "Z"
                    ],
        "words":  [
                      {
                          "word":  "BALIZA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "ALZA",
                          "row":  0,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "LIA",
                          "row":  3,
                          "col":  -1,
                          "dir":  "H"
                      },
                      {
                          "word":  "ALA",
                          "row":  0,
                          "col":  5,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "🚨",
        "tipTitle":  "Uso Correcto de Balizas",
        "tip":  "Las balizas intermitentes indican detención obligada de emergencia; no habilitan a estacionar en doble fila.",
        "tipDetail":  "Encendé las balizas ante una avería, frenada imprevista en autopista o maniobra de estacionamiento para avisar con anticipación a los demás."
    },
    {
        "id":  21,
        "title":  "Estado de la Calzada",
        "category":  "Seguridad en Ruta",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "C",
                        "I",
                        "M",
                        "N",
                        "O"
                    ],
        "words":  [
                      {
                          "word":  "CAMION",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "CAMINO",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "MANO",
                          "row":  0,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "OCA",
                          "row":  0,
                          "col":  4,
                          "dir":  "V"
                      },
                      {
                          "word":  "CON",
                          "row":  5,
                          "col":  -1,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "AMO"
                       ],
        "tipIcon":  "🛣️",
        "tipTitle":  "Lectura del Camino",
        "tip":  "Mirá hacia adelante a la distancia de 15 segundos para anticipar deformaciones, baches o cambios de superficie.",
        "tipDetail":  "Frená con suavidad antes del pozo o desnivel; soltá el freno inmediatamente antes de pasarlo para no dañar tren delantero ni cubiertas."
    },
    {
        "id":  22,
        "title":  "Espacio del Peatón",
        "category":  "Espacio Público",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "D",
                        "E",
                        "E",
                        "R",
                        "V"
                    ],
        "words":  [
                      {
                          "word":  "VEREDA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "VERDE",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "ARDE",
                          "row":  0,
                          "col":  5,
                          "dir":  "V"
                      },
                      {
                          "word":  "RED",
                          "row":  0,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "VER",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "DAR",
                           "ERA",
                           "RAD"
                       ],
        "tipIcon":  "🚶‍♀️",
        "tipTitle":  "Veredas Libres de Vehículos",
        "tip":  "Motos, bicicletas y monopatines eléctricos tienen prohibido circular o estacionar sobre las aceras peatonales.",
        "tipDetail":  "La vereda es el único refugio seguro de peatones y niños. Para entrar o salir de garajes, cruzala a paso de hombre prestando máxima atención."
    },
    {
        "id":  23,
        "title":  "Estacionamiento Legal",
        "category":  "Estacionamiento",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "C",
                        "D",
                        "N",
                        "O",
                        "O",
                        "R"
                    ],
        "words":  [
                      {
                          "word":  "CORDON",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RON",
                          "row":  -1,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "ROD",
                          "row":  -1,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "CON",
                          "row":  -1,
                          "col":  1,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "🅿️",
        "tipTitle":  "Distancia al Cordón",
        "tip":  "El vehículo debe quedar estacionado en forma paralela al cordón, a una distancia no mayor de 20 a 30 centímetros.",
        "tipDetail":  "Dejá al menos 50 cm libres respecto de los autos delantero y trasero para permitir maniobras de egreso sin toques involuntarios."
    },
    {
        "id":  24,
        "title":  "Conservación de Carril",
        "category":  "Tránsito Fluido",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "C",
                        "I",
                        "L",
                        "R",
                        "R"
                    ],
        "words":  [
                      {
                          "word":  "CARRIL",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RIAL",
                          "row":  -2,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "RICA",
                          "row":  -2,
                          "col":  1,
                          "dir":  "H"
                      },
                      {
                          "word":  "CRIA",
                          "row":  -5,
                          "col":  4,
                          "dir":  "V"
                      },
                      {
                          "word":  "LIRA",
                          "row":  -5,
                          "col":  4,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "CAL",
                           "CAR",
                           "IRA",
                           "LIA",
                           "RIA"
                       ],
        "tipIcon":  "↔️",
        "tipTitle":  "Carriles en Avenidas y Autovías",
        "tip":  "En vías de varios carriles, circulá siempre por la derecha; el carril izquierdo es exclusivo para sobrepasos.",
        "tipDetail":  "Mantenete centrado dentro de las líneas de demarcación y utilizá siempre la luz de giro antes de cambiar de carril."
    },
    {
        "id":  25,
        "title":  "Zonas de Obras",
        "category":  "Señales Transitorias",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "D",
                        "E",
                        "I",
                        "O",
                        "S",
                        "V"
                    ],
        "words":  [
                      {
                          "word":  "DESVIO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "SED",
                          "row":  -2,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "VIO",
                          "row":  -2,
                          "col":  5,
                          "dir":  "V"
                      },
                      {
                          "word":  "DES",
                          "row":  -2,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "DOS",
                          "row":  -2,
                          "col":  2,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "🚧",
        "tipTitle":  "Señalización Naranja de Obra",
        "tip":  "La cartelería y balizas de color naranja indican modificaciones temporales en la traza y presencia de trabajadores.",
        "tipDetail":  "Disminuí de inmediato la velocidad y aumentá la distancia con los demás vehículos ante el primer aviso de obra vial."
    },
    {
        "id":  26,
        "title":  "Percepción del Riesgo",
        "category":  "Factores Humanos",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "E",
                        "G",
                        "I",
                        "O",
                        "R",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "RIESGO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RIEGO",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "GIROS",
                          "row":  0,
                          "col":  4,
                          "dir":  "V"
                      },
                      {
                          "word":  "IRSE",
                          "row":  4,
                          "col":  2,
                          "dir":  "H"
                      },
                      {
                          "word":  "GIRO",
                          "row":  0,
                          "col":  4,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "GIR",
                           "REO",
                           "ROE",
                           "SER"
                       ],
        "tipIcon":  "⚡",
        "tipTitle":  "Manejo Defensivo",
        "tip":  "Conducir a la defensiva significa esperar siempre el error ajeno y mantener margen para corregir a tiempo.",
        "tipDetail":  "Nunca asumas que el otro vehículo va a frenar o poner la luz de giro. Anticipar la maniobra previene el 90% de los siniestros."
    },
    {
        "id":  27,
        "title":  "Accesos y Enlaces",
        "category":  "Autovías y Aceleración",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "C",
                        "E",
                        "E",
                        "L",
                        "N"
                    ],
        "words":  [
                      {
                          "word":  "ENLACE",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "LEA",
                          "row":  -1,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "CAL",
                          "row":  -1,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "ALE",
                          "row":  -2,
                          "col":  5,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "↗️",
        "tipTitle":  "Carril de Aceleración",
        "tip":  "Al ingresar a una autopista, usá el carril de aceleración para igualar la velocidad del flujo vehicular antes de incorporarte.",
        "tipDetail":  "No te detengas al final del enlace salvo que sea imposible entrar. Quien ya circula por la autopista tiene prioridad de paso."
    },
    {
        "id":  28,
        "title":  "Visibilidad en Esquinas",
        "category":  "Diseño Urbano",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "A",
                        "C",
                        "H",
                        "O",
                        "V"
                    ],
        "words":  [
                      {
                          "word":  "OCHAVA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "OCHAV",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "ACA",
                          "row":  0,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "OCA",
                          "row":  3,
                          "col":  -2,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "📐",
        "tipTitle":  "Prohibido en las Ochavas",
        "tip":  "Está estrictamente prohibido detenerse o estacionar dentro del área de la ochava en todas las intersecciones.",
        "tipDetail":  "Estacionar en la ochava le quita toda visibilidad a los autos que cruzan y tapa a los peatones que bajan de la vereda."
    },
    {
        "id":  29,
        "title":  "Isletas y Canalizadores",
        "category":  "Infraestructura Vial",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "E",
                        "I",
                        "L",
                        "S",
                        "T"
                    ],
        "words":  [
                      {
                          "word":  "ISLETA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "LES",
                          "row":  -2,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "LIA",
                          "row":  -2,
                          "col":  5,
                          "dir":  "V"
                      },
                      {
                          "word":  "LEA",
                          "row":  -2,
                          "col":  5,
                          "dir":  "V"
                      },
                      {
                          "word":  "ALE",
                          "row":  -2,
                          "col":  3,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "LAS"
                       ],
        "tipIcon":  "🚏",
        "tipTitle":  "Isletas de Tránsito",
        "tip":  "Las isletas encauzan las corrientes vehiculares y funcionan como refugio seguro para peatones en avenidas anchas.",
        "tipDetail":  "Nunca pises ni circules sobre las marcas diagonales rayadas (cebreado) que preceden a una isleta divisoria."
    },
    {
        "id":  30,
        "title":  "Sonido y Alerta",
        "category":  "Contaminación Sonora",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "B",
                        "C",
                        "I",
                        "N",
                        "O"
                    ],
        "words":  [
                      {
                          "word":  "BOCINA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "BANCO",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "CABO",
                          "row":  0,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "BOCA",
                          "row":  2,
                          "col":  2,
                          "dir":  "H"
                      },
                      {
                          "word":  "OCA",
                          "row":  1,
                          "col":  -2,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "CON"
                       ],
        "tipIcon":  "📢",
        "tipTitle":  "Uso Reglamentario de Bocina",
        "tip":  "La bocina solo está autorizada para advertir sobre un peligro inminente de siniestro; no para apurar o reclamar.",
        "tipDetail":  "El uso indebido de bocina genera estrés, sobresaltos en peatones y ciclistas y está penado como falta en el Código de Tránsito."
    },
    {
        "id":  31,
        "title":  "Puntos Ciegos",
        "category":  "Visibilidad y Retrovisores",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "E",
                        "E",
                        "J",
                        "O",
                        "P",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "ESPEJO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "PESO",
                          "row":  -1,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "EJE",
                          "row":  0,
                          "col":  3,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "🪞",
        "tipTitle":  "Regulación de Espejos",
        "tip":  "Ajustá los espejos laterales de modo que apenas se vea el filo de la carrocería de tu vehículo y el máximo de calzada.",
        "tipDetail":  "Para cambiar de carril: mirá el espejo central, luego el lateral, y hacé un rápido vistazo con el rabillo del ojo para cubrir el punto ciego."
    },
    {
        "id":  32,
        "title":  "Iluminación Vehicular",
        "category":  "Seguridad Óptica",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "C",
                        "I",
                        "O",
                        "P",
                        "T"
                    ],
        "words":  [
                      {
                          "word":  "OPTICA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "CAPOT",
                          "row":  -3,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "TIPO",
                          "row":  -1,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "OCA",
                          "row":  -2,
                          "col":  5,
                          "dir":  "V"
                      },
                      {
                          "word":  "CAP",
                          "row":  -3,
                          "col":  0,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "ATO"
                       ],
        "tipIcon":  "🔦",
        "tipTitle":  "Alineación de Faros",
        "tip":  "Faros desalineados pueden encandilar a quien viene de frente o dejarte sin visión en curvas cerradas.",
        "tipDetail":  "Mantené las ópticas limpias de barro y verificá periódicamente que funcionen todas las lámparas de freno y posición trasera."
    },
    {
        "id":  33,
        "title":  "Vehículos Pesados",
        "category":  "Convivencia Vial",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "C",
                        "I",
                        "M",
                        "N",
                        "O"
                    ],
        "words":  [
                      {
                          "word":  "CAMION",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "CAMINO",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "MANO",
                          "row":  0,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "OCA",
                          "row":  0,
                          "col":  4,
                          "dir":  "V"
                      },
                      {
                          "word":  "CON",
                          "row":  5,
                          "col":  -1,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "AMO"
                       ],
        "tipIcon":  "🚛",
        "tipTitle":  "Puntos Ciegos de Camiones",
        "tip":  "Si vos no podés ver los espejos del camión, el conductor del camión NO puede verte a vos. Nunca te pegues detrás.",
        "tipDetail":  "Los camiones necesitan abrirse hacia la izquierda para doblar a la derecha: jamás intentes sobrepasarlos por la derecha en esquinas."
    },
    {
        "id":  34,
        "title":  "Tolerancia Cero",
        "category":  "Conducta al Volante",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "C",
                        "H",
                        "L",
                        "L",
                        "O",
                        "O"
                    ],
        "words":  [
                      {
                          "word":  "ALCOHOL",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "COLA",
                          "row":  -3,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "OCA",
                          "row":  -2,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "OLA",
                          "row":  -2,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "CAL",
                          "row":  -2,
                          "col":  6,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "COL"
                       ],
        "tipIcon":  "🚫",
        "tipTitle":  "Alcohol Cero en CABA",
        "tip":  "En la Ciudad de Buenos Aires el límite de alcohol en sangre es 0,0 g/l para todo tipo de conductores.",
        "tipDetail":  "Incluso una copa disminuye la agudeza visual, alarga el tiempo de reacción e infunde una falsa sensación de seguridad sumamente peligrosa."
    },
    {
        "id":  35,
        "title":  "Atención Plena",
        "category":  "Factores de Riesgo",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "E",
                        "N",
                        "O",
                        "T",
                        "T"
                    ],
        "words":  [
                      {
                          "word":  "ATENTO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "NETA",
                          "row":  -3,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "ATO",
                          "row":  -2,
                          "col":  5,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "🧠",
        "tipTitle":  "Cero Pantallas al Volante",
        "tip":  "Usar el celular al manejar multiplica por 4 el riesgo de choque, igualando los efectos de la intoxicación alcohólica.",
        "tipDetail":  "Ni llamadas con manos libres: la distracción cognitiva que genera una conversación telefónica reduce en un 50% la información visual percibida."
    },
    {
        "id":  36,
        "title":  "Calmado de Tránsito",
        "category":  "Infraestructura Vial",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "A",
                        "D",
                        "L",
                        "M",
                        "O"
                    ],
        "words":  [
                      {
                          "word":  "LOMADA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "LOMA",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "LADO",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "OLA",
                          "row":  3,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "AMO",
                          "row":  0,
                          "col":  3,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "ALA"
                       ],
        "tipIcon":  "⚠️",
        "tipTitle":  "Reductores y Lomadas",
        "tip":  "Las lomadas se instalan para forzar una velocidad no mayor a 20 km/h en sectores de alto cruce de personas.",
        "tipDetail":  "Pasalas con ambas ruedas al mismo tiempo a marcha reducida para no desalinear amortiguadores ni resortes de suspensión."
    },
    {
        "id":  37,
        "title":  "Tracción y 2 Ruedas",
        "category":  "Mantenimiento Preventivo",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "A",
                        "C",
                        "D",
                        "E",
                        "N"
                    ],
        "words":  [
                      {
                          "word":  "CADENA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "CEDA",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "DEN",
                          "row":  0,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "DAN",
                          "row":  0,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "ACA",
                          "row":  0,
                          "col":  5,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "⛓️",
        "tipTitle":  "Mantenimiento de Cadena",
        "tip":  "En motos y bicicletas, la tensión y lubricación de la cadena previene que se corte o trabe la rueda trasera en movimiento.",
        "tipDetail":  "Una cadena suelta puede salirse de la corona y bloquear instantáneamente el rodado, provocando una caída inevitable a alta velocidad."
    },
    {
        "id":  38,
        "title":  "Documentación Obligatoria",
        "category":  "Normativa y Controles",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "C",
                        "D",
                        "E",
                        "L",
                        "U"
                    ],
        "words":  [
                      {
                          "word":  "CEDULA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "DALE",
                          "row":  -3,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "CEDA",
                          "row":  -3,
                          "col":  5,
                          "dir":  "V"
                      },
                      {
                          "word":  "LEA",
                          "row":  -2,
                          "col":  -1,
                          "dir":  "H"
                      },
                      {
                          "word":  "LED",
                          "row":  -2,
                          "col":  4,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "ALE",
                           "CAL",
                           "DEL"
                       ],
        "tipIcon":  "🪪",
        "tipTitle":  "Cédula de Identificación",
        "tip":  "La cédula verde no vence para el titular registral; los terceros autorizados deben circular con la correspondiente cédula azul o digital.",
        "tipDetail":  "Llevar la documentación en la app Mi Argentina es legal y válido en todos los puestos de control del país."
    },
    {
        "id":  39,
        "title":  "Licencia de Conducir",
        "category":  "Sistema de Puntos",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "C",
                        "E",
                        "N",
                        "R",
                        "T"
                    ],
        "words":  [
                      {
                          "word":  "CARNET",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "CANTER",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "TREN",
                          "row":  0,
                          "col":  5,
                          "dir":  "V"
                      },
                      {
                          "word":  "NETA",
                          "row":  0,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "ERA",
                          "row":  4,
                          "col":  0,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "CAR"
                       ],
        "tipIcon":  "💳",
        "tipTitle":  "Sistema de Scoring",
        "tip":  "Cada conductor inicia con 20 puntos; las infracciones graves descuentan puntaje hasta inhabilitar la licencia.",
        "tipDetail":  "Correr picadas resta 20 puntos directo; alcoholemia positiva resta 10 puntos; conducir sin casco o cruzando en rojo resta 5 puntos."
    },
    {
        "id":  40,
        "title":  "Cobertura y Ley",
        "category":  "Protección Legal",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "E",
                        "G",
                        "O",
                        "R",
                        "S",
                        "U"
                    ],
        "words":  [
                      {
                          "word":  "SEGURO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "SUR",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "USO",
                          "row":  0,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "SER",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "REO",
                          "row":  -2,
                          "col":  5,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "ROE"
                       ],
        "tipIcon":  "🛡️",
        "tipTitle":  "Seguro Obligatorio de Tránsito",
        "tip":  "Es obligatorio portar comprobante vigente de la póliza de Responsabilidad Civil hacia Terceros (Ley Nacional 24.449).",
        "tipDetail":  "No es necesario llevar el recibo de pago impreso; la póliza digital o tarjeta de circulación es constancia suficiente."
    },
    {
        "id":  41,
        "title":  "Dársenas de Maniobra",
        "category":  "Infraestructura Vial",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "A",
                        "D",
                        "E",
                        "N",
                        "R",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "DARSENA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "ANDAR",
                          "row":  -2,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "SENDA",
                          "row":  -2,
                          "col":  5,
                          "dir":  "V"
                      },
                      {
                          "word":  "SANE",
                          "row":  -2,
                          "col":  -1,
                          "dir":  "H"
                      },
                      {
                          "word":  "SEDA",
                          "row":  2,
                          "col":  2,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "ARDE",
                           "AREA",
                           "ASEN",
                           "DAN",
                           "DAR",
                           "DAS",
                           "DEN",
                           "DES",
                           "ERA",
                           "RAD",
                           "RED",
                           "SAN",
                           "SED",
                           "SER"
                       ],
        "tipIcon":  "↩️",
        "tipTitle":  "Dársenas de Giro y Retorno",
        "tip":  "En avenidas semaforizadas de doble mano, girar a la izquierda solo está permitido si existe dársena específica habilitada.",
        "tipDetail":  "Ingresá a la dársena con la luz de giro colocada y aguardá la flecha semafórica verde antes de iniciar la maniobra."
    },
    {
        "id":  42,
        "title":  "Separadores Centrales",
        "category":  "Infraestructura Vial",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "C",
                        "E",
                        "N",
                        "O",
                        "R",
                        "T"
                    ],
        "words":  [
                      {
                          "word":  "CANTERO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "CARNET",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "CANTER",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "CANTO",
                          "row":  2,
                          "col":  -2,
                          "dir":  "H"
                      },
                      {
                          "word":  "CORTE",
                          "row":  5,
                          "col":  -2,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "RECTO",
                           "ARCO",
                           "CERO",
                           "NETA",
                           "RENO",
                           "ROCE",
                           "ROTA",
                           "TREN",
                           "ARO",
                           "ATO",
                           "CAR",
                           "CON",
                           "ECO",
                           "ERA",
                           "OCA",
                           "ORA",
                           "REO",
                           "ROE",
                           "RON",
                           "RTO"
                       ],
        "tipIcon":  "🌳",
        "tipTitle":  "Boulevards y Canteros",
        "tip":  "Los canteros centrales separan sentidos de circulación para eliminar el riesgo de choque frontal.",
        "tipDetail":  "Nunca intentes girar en \u0027U\u0027 sobre canteros o pastos divisorios; hacelo únicamente en los retornos oficiales señalizados."
    },
    {
        "id":  43,
        "title":  "Cruce Giratorio",
        "category":  "Prioridad Normativa",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "D",
                        "N",
                        "O",
                        "O",
                        "R",
                        "T"
                    ],
        "words":  [
                      {
                          "word":  "ROTONDA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "ROTA",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "RODA",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "ROD",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "RAD",
                          "row":  3,
                          "col":  -1,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "ARO",
                           "ATO",
                           "DAN",
                           "DAR",
                           "ORA",
                           "RON",
                           "RTO"
                       ],
        "tipIcon":  "🔄",
        "tipTitle":  "Prioridad en Rotondas",
        "tip":  "Tiene prioridad absoluta quien ya está dentro de la rotonda. Quien va a entrar debe frenar y ceder el paso.",
        "tipDetail":  "Para salir de la rotonda, pasá al carril externo antes de la salida y señalizá con la luz de giro derecha."
    },
    {
        "id":  44,
        "title":  "Calzada y Pavimento",
        "category":  "Vías de Circulación",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "A",
                        "A",
                        "C",
                        "D",
                        "L",
                        "Z"
                    ],
        "words":  [
                      {
                          "word":  "CALZADA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "ALZADA",
                          "row":  0,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "CALA",
                          "row":  3,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "ALZA",
                          "row":  0,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "CAL",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "ACA",
                           "ALA"
                       ],
        "tipIcon":  "🛤️",
        "tipTitle":  "Adherencia en Calzadas",
        "tip":  "La calzada es la zona de la vía destinada exclusivamente a la circulación de vehículos automotores y tracción.",
        "tipDetail":  "Las marcas de pintura termoplástica vial mojadas tienen menor coeficiente de fricción; no frenes bruscamente sobre las líneas."
    },
    {
        "id":  45,
        "title":  "Lluvia y Pavimento",
        "category":  "Física y Cinemática",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "A",
                        "F",
                        "L",
                        "O",
                        "S",
                        "T"
                    ],
        "words":  [
                      {
                          "word":  "ASFALTO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "FALTAS",
                          "row":  -1,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "SALTO",
                          "row":  -1,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "TASA",
                          "row":  0,
                          "col":  5,
                          "dir":  "V"
                      },
                      {
                          "word":  "ALTO",
                          "row":  0,
                          "col":  3,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "FOSA",
                           "ALA",
                           "ASO",
                           "ATO",
                           "LAS",
                           "LOS",
                           "OLA",
                           "SOL",
                           "TOL"
                       ],
        "tipIcon":  "🌧️",
        "tipTitle":  "Efecto Aquaplaning",
        "tip":  "Con lluvia intensa, se forma una película de agua entre el neumático y el asfalto que hace flotar al vehículo sin dirección.",
        "tipDetail":  "Si sentís la dirección liviana por aquaplaning: no frenes ni des volantazos; soltá el acelerador suavemente con volante firme."
    },
    {
        "id":  46,
        "title":  "Pasos Ferroviarios",
        "category":  "Seguridad Ferroviaria",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "A",
                        "B",
                        "E",
                        "R",
                        "R",
                        "R"
                    ],
        "words":  [
                      {
                          "word":  "BARRERA",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "BARRA",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "AREA",
                          "row":  0,
                          "col":  6,
                          "dir":  "V"
                      },
                      {
                          "word":  "ERA",
                          "row":  0,
                          "col":  4,
                          "dir":  "V"
                      },
                      {
                          "word":  "BAR",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [

                       ],
        "tipIcon":  "🚂",
        "tipTitle":  "Paso a Nivel y Barrera",
        "tip":  "Prohibido cruzar con barrera baja, en movimiento o cuando suene la alarma fonoluminosa roja.",
        "tipDetail":  "Un tren de pasajeros tarda más de 500 metros en detenerse; nunca intentes ganarle el paso a una formación en aproximación."
    },
    {
        "id":  47,
        "title":  "Paradas y Metrobús",
        "category":  "Transporte Colectivo",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "E",
                        "F",
                        "G",
                        "I",
                        "O",
                        "R",
                        "U"
                    ],
        "words":  [
                      {
                          "word":  "REFUGIO",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "RIEGO",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "GIRO",
                          "row":  0,
                          "col":  4,
                          "dir":  "V"
                      },
                      {
                          "word":  "FRIO",
                          "row":  0,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "FREO",
                          "row":  0,
                          "col":  2,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "FEO",
                           "GIR",
                           "REO",
                           "ROE"
                       ],
        "tipIcon":  "🚌",
        "tipTitle":  "Carriles Exclusivos Metrobús",
        "tip":  "Los carriles centrales de Metrobús están reservados exclusivamente para transporte público y vehículos de emergencia.",
        "tipDetail":  "Al descender de un colectivo en un refugio, cruzá siempre por la senda peatonal semaforizada y nunca por delante del ómnibus."
    },
    {
        "id":  48,
        "title":  "Posición de Conducción",
        "category":  "Ergonomía y Control",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "A",
                        "E",
                        "L",
                        "N",
                        "O",
                        "S",
                        "T",
                        "V"
                    ],
        "words":  [
                      {
                          "word":  "VOLANTES",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "VOLANTE",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "ANTES",
                          "row":  0,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "SALTO",
                          "row":  0,
                          "col":  7,
                          "dir":  "V"
                      },
                      {
                          "word":  "LOTE",
                          "row":  3,
                          "col":  5,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "ALE",
                           "ASO",
                           "ATO",
                           "LAS",
                           "LEA",
                           "LES",
                           "LOS",
                           "NOS",
                           "OLA",
                           "SAN",
                           "SOL",
                           "SON",
                           "TOL",
                           "VAL",
                           "VAN",
                           "ALTO",
                           "ASEN",
                           "LEVA",
                           "LONA",
                           "NAVE",
                           "NETA",
                           "OVAL",
                           "SANE",
                           "VALE",
                           "VANO",
                           "VASO"
                       ],
        "tipIcon":  "🎯",
        "tipTitle":  "Manos a las \u00279 y 15\u0027",
        "tip":  "Tomá el volante como las agujas del reloj a las \u00279 y 15\u0027 con ambos pulgares apoyados sin trabar.",
        "tipDetail":  "Esta posición permite el máximo rango de giro sin cruzar los brazos y evita lesiones graves si se activa el airbag del volante."
    },
    {
        "id":  49,
        "title":  "Distancias y Velocidad",
        "category":  "Cinemática Vial",
        "bg":  "assets/bg_city.jpg",
        "letters":  [
                        "A",
                        "D",
                        "E",
                        "F",
                        "N",
                        "O",
                        "R",
                        "S"
                    ],
        "words":  [
                      {
                          "word":  "FRENADOS",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "DARSENO",
                          "row":  -2,
                          "col":  1,
                          "dir":  "V"
                      },
                      {
                          "word":  "FRENOS",
                          "row":  2,
                          "col":  -1,
                          "dir":  "H"
                      },
                      {
                          "word":  "SENDA",
                          "row":  0,
                          "col":  7,
                          "dir":  "V"
                      },
                      {
                          "word":  "FRENO",
                          "row":  2,
                          "col":  -1,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "FAROS",
                           "ORDEN",
                           "ARO",
                           "ASO",
                           "DAN",
                           "DAR",
                           "DAS",
                           "DEN",
                           "DES",
                           "DOS",
                           "ERA",
                           "FEO",
                           "NOS",
                           "ORA",
                           "RAD",
                           "RED",
                           "REO",
                           "ROD",
                           "ROE",
                           "RON",
                           "SAN",
                           "SED",
                           "SER",
                           "SON",
                           "ARDE",
                           "ASEN",
                           "FARO",
                           "FOSA",
                           "FREN",
                           "FREO",
                           "RENO",
                           "RODA",
                           "SANE",
                           "SEDA"
                       ],
        "tipIcon":  "📏",
        "tipTitle":  "Aumento Cuadrático de la Frenada",
        "tip":  "Si aumentás tu velocidad de 50 a 100 km/h (el doble), tu distancia de frenado se multiplica por 4.",
        "tipDetail":  "A 100 km/h recorrés 28 metros por segundo; la distancia total de detención en asfalto seco supera los 80 metros."
    },
    {
        "id":  50,
        "title":  "Cinturón de Seguridad",
        "category":  "Seguridad Pasiva",
        "bg":  "assets/bg_route.jpg",
        "letters":  [
                        "C",
                        "I",
                        "N",
                        "N",
                        "O",
                        "R",
                        "T",
                        "U"
                    ],
        "words":  [
                      {
                          "word":  "CINTURON",
                          "row":  0,
                          "col":  0,
                          "dir":  "H"
                      },
                      {
                          "word":  "TURNO",
                          "row":  -3,
                          "col":  2,
                          "dir":  "V"
                      },
                      {
                          "word":  "RTO",
                          "row":  -2,
                          "col":  6,
                          "dir":  "V"
                      },
                      {
                          "word":  "UNO",
                          "row":  -2,
                          "col":  6,
                          "dir":  "V"
                      },
                      {
                          "word":  "RON",
                          "row":  0,
                          "col":  5,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "CON",
                           "RIN"
                       ],
        "tipIcon":  "💺",
        "tipTitle":  "Cinturón de Tres Puntos",
        "tip":  "El uso del cinturón es obligatorio para todos los ocupantes del vehículo, tanto en asientos delanteros como traseros.",
        "tipDetail":  "En un choque a 50 km/h, una persona de 70 kg sin cinturón sale despedida con una fuerza equivalente a caer de un 4to piso."
    }
];

if (typeof module !== 'undefined' && module.exports) { module.exports = { GAME_LEVELS }; }