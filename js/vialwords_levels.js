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
        "tipIcon":  "ðŸš¶â€â™‚ï¸",
        "tipTitle":  "Prioridad Peatonal",
        "tip":  "En esquinas y sendas peatonales, el peatÃ³n siempre tiene prioridad absoluta de paso.",
        "tipDetail":  "Al aproximarte a una esquina o cruce, reducÃ­ la marcha y detenete si una persona va a cruzar."
    },
    {
        "id":  2,
        "title":  "ProtecciÃ³n Vital",
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
        "tipIcon":  "â›‘ï¸",
        "tipTitle":  "Casco Homologado y Abrochado",
        "tip":  "El casco reduce un 70% el riesgo de lesiones cerebrales graves en motos y bicis.",
        "tipDetail":  "Un casco sin abrochar sale despedido ante el primer impacto. ElegÃ­ siempre cascos certificados y de tu talle."
    },
    {
        "id":  3,
        "title":  "DetenciÃ³n y Distancia",
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
        "tipIcon":  "ðŸ›‘",
        "tipTitle":  "SeÃ±al de PARE",
        "tip":  "El cartel de PARE exige detener el vehÃ­culo por completo, no solo aminorar la marcha.",
        "tipDetail":  "Es una seÃ±al reglamentaria absoluta: frenÃ¡ a cero, observÃ¡ ambos sentidos y sÃ³lo avanzÃ¡ cuando estÃ© 100% despejado."
    },
    {
        "id":  4,
        "title":  "AtenciÃ³n al Camino",
        "category":  "VisiÃ³n y ConcentraciÃ³n",
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
        "tipIcon":  "ðŸ‘€",
        "tipTitle":  "Cero Distracciones al Volante",
        "tip":  "Mirar el celular 3 segundos a 40 km/h equivale a manejar mÃ¡s de 33 metros a ciegas.",
        "tipDetail":  "La vista debe estar siempre en el camino y los espejos. Ni llamadas en manos libres ni mensajes mientras manejÃ¡s."
    },
    {
        "id":  5,
        "title":  "Luz y Visibilidad",
        "category":  "SeÃ±alizaciÃ³n Ã“ptica",
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
        "tipIcon":  "ðŸ’¡",
        "tipTitle":  "Luces Bajas Siempre Encendidas",
        "tip":  "Las luces bajas permiten que los demÃ¡s vehÃ­culos te vean a mÃ¡s de 1.000 metros de distancia.",
        "tipDetail":  "En rutas y autopistas es obligatorio circular con luces bajas las 24 horas. En ciudad, te hacen visible ante cualquier reflejo."
    },
    {
        "id":  6,
        "title":  "ConducciÃ³n Segura",
        "category":  "LÃ­mites y Prudencia",
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
        "tipIcon":  "ðŸš—",
        "tipTitle":  "Distancia de Seguridad",
        "tip":  "MantenÃ© siempre al menos 2 segundos de distancia con el auto de adelante; con lluvia, aumentala a 4 segundos.",
        "tipDetail":  "La regla de los 2 segundos te da el tiempo de reacciÃ³n necesario ante una frenada intempestiva y previene choques por alcance."
    },
    {
        "id":  7,
        "title":  "FricciÃ³n y Frenado",
        "category":  "FÃ­sica y CinemÃ¡tica",
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
        "tipIcon":  "ðŸŒ§ï¸",
        "tipTitle":  "Distancia de DetenciÃ³n",
        "tip":  "La distancia de frenado crece con el cuadrado de la velocidad: duplicar la velocidad cuadruplica la distancia para frenar.",
        "tipDetail":  "A 40 km/h frenÃ¡s en ~18 metros; a 80 km/h necesitÃ¡s mÃ¡s de 55 metros. La energÃ­a cinÃ©tica no se reduce linealmente."
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
        "tipIcon":  "ðŸš²",
        "tipTitle":  "Metro y Medio de SeparaciÃ³n",
        "tip":  "Al sobrepasar a un ciclista, es obligatorio dejar al menos 1,5 metros de distancia lateral.",
        "tipDetail":  "La turbulencia de aire de un vehÃ­culo o un bache imprevisto pueden desestabilizar la bicicleta si no dejÃ¡s margen lateral seguro."
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
        "tipIcon":  "ðŸ”„",
        "tipTitle":  "Prioridad en Rotonda",
        "tip":  "En una rotonda, la prioridad absoluta de paso la tiene siempre el que ya estÃ¡ circulando por ella.",
        "tipDetail":  "Quien intenta entrar debe frenar y ceder el paso a los vehÃ­culos que giran, facilitando la fluidez del nudo vial."
    },
    {
        "id":  10,
        "title":  "PresiÃ³n y Contacto",
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
        "tipIcon":  "ðŸ›ž",
        "tipTitle":  "PresiÃ³n de NeumÃ¡ticos",
        "tip":  "RevisÃ¡ la presiÃ³n en frÃ­o cada 15 dÃ­as: circular con baja presiÃ³n incrementa hasta 4 metros la frenada.",
        "tipDetail":  "El neumÃ¡tico es el Ãºnico punto de contacto con el suelo; una presiÃ³n deficiente recalienta la banda de rodamiento y causa desprendimientos."
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
        "tipIcon":  "âš ï¸",
        "tipTitle":  "Tiempo de ReacciÃ³n",
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
        "tipIcon":  "ðŸ”§",
        "tipTitle":  "Profundidad del Dibujo",
        "tip":  "El dibujo de las cubiertas debe tener al menos 1,6 mm de profundidad para evacuar agua eficientemente.",
        "tipDetail":  "Los canales del neumÃ¡tico expulsan litros de agua por segundo. Con cubiertas desgastadas o lisas, el riesgo de aquaplaning es inminente."
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
                          "row":  0,
                          "word":  "SENDA",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "SEDA",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "ASEN",
                          "dir":  "V",
                          "col":  4
                      },
                      {
                          "row":  2,
                          "word":  "DES",
                          "dir":  "H",
                          "col":  0
                      }
                  ],
        "bonusWords":  [
                           "DAN",
                           "DAS",
                           "DEN",
                           "SAN",
                           "SED",
                           "SANE",
                           "ESA"
                       ],
        "tipIcon":  "ðŸš¸",
        "tipTitle":  "Sendas Peatonales",
        "tip":  "Las franjas blancas en esquinas delimitan el espacio sagrado del peatÃ³n; nunca invadas la senda al detenerte.",
        "tipDetail":  "Detener el vehÃ­culo sobre la senda peatonal obliga a los peatones a esquivarte por la calzada, exponiÃ©ndolos a choques."
    },
    {
        "id":  14,
        "title":  "Normas de TrÃ¡nsito",
        "category":  "LegislaciÃ³n Vial",
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
        "tipIcon":  "ðŸ“œ",
        "tipTitle":  "JerarquÃ­a de Normas",
        "tip":  "Las indicaciones del Agente de TrÃ¡nsito prevalecen sobre semÃ¡foros, seÃ±ales verticales y normas generales.",
        "tipDetail":  "El orden jerÃ¡rquico es: 1Â° Agentes de TrÃ¡nsito, 2Â° SeÃ±alizaciÃ³n Transitoria, 3Â° SemÃ¡foros, 4Â° SeÃ±ales verticales/horizontales, 5Â° Normas generales."
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
        "tipIcon":  "ðŸ™ï¸",
        "tipTitle":  "LÃ­mite en Calles: 40 km/h",
        "tip":  "La velocidad mÃ¡xima en calles comunes es de 40 km/h; en zonas escolares y hospitales se reduce a 20-30 km/h.",
        "tipDetail":  "A 40 km/h el riesgo de muerte de un peatÃ³n atropellado es del 30%; a 60 km/h ese riesgo se dispara a mÃ¡s del 85%."
    },
    {
        "id":  16,
        "title":  "FÃ­sica del Frenado",
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
                          "row":  0,
                          "word":  "FRENO",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "RENO",
                          "dir":  "V",
                          "col":  1
                      },
                      {
                          "row":  3,
                          "word":  "FREO",
                          "dir":  "H",
                          "col":  -2
                      },
                      {
                          "row":  -1,
                          "word":  "ROE",
                          "dir":  "V",
                          "col":  4
                      }
                  ],
        "bonusWords":  [
                           "FEO",
                           "REO",
                           "RON",
                           "FREN",
                           "FOR",
                           "NEO"
                       ],
        "tipIcon":  "ðŸ›‘",
        "tipTitle":  "Sistema de Frenos ABS",
        "tip":  "El sistema ABS evita que las ruedas se bloqueen, permitiendo mantener el control de direcciÃ³n mientras frenÃ¡s a fondo.",
        "tipDetail":  "Con ABS, pisÃ¡ el pedal con firmeza mÃ¡xima sin soltar. La vibraciÃ³n en el pedal es normal y confirma que estÃ¡ modulando la presiÃ³n."
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
                          "row":  0,
                          "word":  "BADEN",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "DEN",
                          "dir":  "V",
                          "col":  2
                      }
                  ],
        "bonusWords":  [
                           "DAN",
                           "BEA",
                           "BEDA"
                       ],
        "tipIcon":  "ã€°ï¸",
        "tipTitle":  "Cruce de Badenes y Desniveles",
        "tip":  "CruzÃ¡ los badenes a paso de hombre y sin el pie en el freno justo al momento de entrar al desnivel.",
        "tipDetail":  "Frenar enÃ©rgicamente dentro del badÃ©n comprime los amortiguadores delanteros y provoca roces severos contra el cÃ¡rter."
    },
    {
        "id":  18,
        "title":  "Accesibilidad Universal",
        "category":  "InclusiÃ³n y Convivencia",
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
        "tipIcon":  "â™¿",
        "tipTitle":  "Rampas para Discapacidad",
        "tip":  "Queda terminantemente prohibido detenerse o estacionar tapando rampas de esquinas, incluso por un minuto.",
        "tipDetail":  "Obstruir una rampa atrapa a personas en silla de ruedas, cochecitos de bebÃ©s y adultos mayores, obligÃ¡ndolos a bajar a la calzada vehicular."
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
                          "row":  0,
                          "word":  "RADIO",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "RODA",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  -1,
                          "word":  "RIA",
                          "dir":  "V",
                          "col":  3
                      }
                  ],
        "bonusWords":  [
                           "ARO",
                           "DAR",
                           "IRA",
                           "ORA",
                           "RAD",
                           "ROD",
                           "OIR",
                           "IDA"
                       ],
        "tipIcon":  "ðŸ§­",
        "tipTitle":  "Maniobras de Viraje",
        "tip":  "Para doblar en esquinas, seÃ±alizÃ¡ con luz de giro al menos 30 metros antes y reducÃ­ la marcha gradualmente.",
        "tipDetail":  "Un giro a velocidad excesiva desplaza el centro de gravedad del vehÃ­culo hacia el exterior, reduciendo el agarre de las cubiertas internas."
    },
    {
        "id":  20,
        "title":  "Luces de Advertencia",
        "category":  "SeÃ±alizaciÃ³n Ã“ptica",
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
        "tipIcon":  "ðŸš¨",
        "tipTitle":  "Uso Correcto de Balizas",
        "tip":  "Las balizas intermitentes indican detenciÃ³n obligada de emergencia; no habilitan a estacionar en doble fila.",
        "tipDetail":  "EncendÃ© las balizas ante una averÃ­a, frenada imprevista en autopista o maniobra de estacionamiento para avisar con anticipaciÃ³n a los demÃ¡s."
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
        "tipIcon":  "ðŸ›£ï¸",
        "tipTitle":  "Lectura del Camino",
        "tip":  "MirÃ¡ hacia adelante a la distancia de 15 segundos para anticipar deformaciones, baches o cambios de superficie.",
        "tipDetail":  "FrenÃ¡ con suavidad antes del pozo o desnivel; soltÃ¡ el freno inmediatamente antes de pasarlo para no daÃ±ar tren delantero ni cubiertas."
    },
    {
        "id":  22,
        "title":  "Espacio del PeatÃ³n",
        "category":  "Espacio PÃºblico",
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
                          "row":  0,
                          "word":  "VEREDA",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "VERDE",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "ARDE",
                          "dir":  "V",
                          "col":  5
                      },
                      {
                          "row":  0,
                          "word":  "RED",
                          "dir":  "V",
                          "col":  2
                      }
                  ],
        "bonusWords":  [
                           "DAR",
                           "ERA",
                           "RAD",
                           "VER"
                       ],
        "tipIcon":  "ðŸš¶â€â™€ï¸",
        "tipTitle":  "Veredas Libres de VehÃ­culos",
        "tip":  "Motos, bicicletas y monopatines elÃ©ctricos tienen prohibido circular o estacionar sobre las aceras peatonales.",
        "tipDetail":  "La vereda es el Ãºnico refugio seguro de peatones y niÃ±os. Para entrar o salir de garajes, cruzala a paso de hombre prestando mÃ¡xima atenciÃ³n."
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
                          "word":  "CON",
                          "row":  0,
                          "col":  0,
                          "dir":  "V"
                      },
                      {
                          "word":  "DON",
                          "row":  0,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "RON",
                          "row":  -2,
                          "col":  5,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "ROD",
                           "CORO",
                           "ROCO",
                           "ORO"
                       ],
        "tipIcon":  "ðŸ…¿ï¸",
        "tipTitle":  "Distancia al CordÃ³n",
        "tip":  "El vehÃ­culo debe quedar estacionado en forma paralela al cordÃ³n, a una distancia no mayor de 20 a 30 centÃ­metros.",
        "tipDetail":  "DejÃ¡ al menos 50 cm libres respecto de los autos delantero y trasero para permitir maniobras de egreso sin toques involuntarios."
    },
    {
        "id":  24,
        "title":  "ConservaciÃ³n de Carril",
        "category":  "TrÃ¡nsito Fluido",
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
                          "row":  0,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "CRIA",
                          "row":  -2,
                          "col":  0,
                          "dir":  "H"
                      }
                  ],
        "bonusWords":  [
                           "CAL",
                           "CAR",
                           "IRA",
                           "LIA",
                           "RIA",
                           "LIRA"
                       ],
        "tipIcon":  "â†”ï¸",
        "tipTitle":  "Carriles en Avenidas y AutovÃ­as",
        "tip":  "En vÃ­as de varios carriles, circulÃ¡ siempre por la derecha; el carril izquierdo es exclusivo para sobrepasos.",
        "tipDetail":  "Mantenete centrado dentro de las lÃ­neas de demarcaciÃ³n y utilizÃ¡ siempre la luz de giro antes de cambiar de carril."
    },
    {
        "id":  25,
        "title":  "Zonas de Obras",
        "category":  "SeÃ±ales Transitorias",
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
                          "row":  0,
                          "word":  "DESVIO",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  -2,
                          "word":  "SED",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  -2,
                          "word":  "VIO",
                          "dir":  "V",
                          "col":  5
                      },
                      {
                          "row":  0,
                          "word":  "DOS",
                          "dir":  "V",
                          "col":  0
                      }
                  ],
        "bonusWords":  [
                           "DES",
                           "SIO",
                           "VED",
                           "DEO"
                       ],
        "tipIcon":  "ðŸš§",
        "tipTitle":  "SeÃ±alizaciÃ³n Naranja de Obra",
        "tip":  "La cartelerÃ­a y balizas de color naranja indican modificaciones temporales en la traza y presencia de trabajadores.",
        "tipDetail":  "DisminuÃ­ de inmediato la velocidad y aumentÃ¡ la distancia con los demÃ¡s vehÃ­culos ante el primer aviso de obra vial."
    },
    {
        "id":  26,
        "title":  "PercepciÃ³n del Riesgo",
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
                          "row":  0,
                          "word":  "RIESGO",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "RIEGO",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "GIROS",
                          "dir":  "V",
                          "col":  4
                      },
                      {
                          "row":  4,
                          "word":  "IRSE",
                          "dir":  "H",
                          "col":  2
                      }
                  ],
        "bonusWords":  [
                           "GIR",
                           "REO",
                           "ROE",
                           "SER",
                           "GIRO",
                           "OIR"
                       ],
        "tipIcon":  "âš¡",
        "tipTitle":  "Manejo Defensivo",
        "tip":  "Conducir a la defensiva significa esperar siempre el error ajeno y mantener margen para corregir a tiempo.",
        "tipDetail":  "Nunca asumas que el otro vehÃ­culo va a frenar o poner la luz de giro. Anticipar la maniobra previene el 90% de los siniestros."
    },
    {
        "id":  27,
        "title":  "Accesos y Enlaces",
        "category":  "AutovÃ­as y AceleraciÃ³n",
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
        "tipIcon":  "â†—ï¸",
        "tipTitle":  "Carril de AceleraciÃ³n",
        "tip":  "Al ingresar a una autopista, usÃ¡ el carril de aceleraciÃ³n para igualar la velocidad del flujo vehicular antes de incorporarte.",
        "tipDetail":  "No te detengas al final del enlace salvo que sea imposible entrar. Quien ya circula por la autopista tiene prioridad de paso."
    },
    {
        "id":  28,
        "title":  "Visibilidad en Esquinas",
        "category":  "DiseÃ±o Urbano",
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
        "tipIcon":  "ðŸ“",
        "tipTitle":  "Prohibido en las Ochavas",
        "tip":  "EstÃ¡ estrictamente prohibido detenerse o estacionar dentro del Ã¡rea de la ochava en todas las intersecciones.",
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
                          "row":  0,
                          "word":  "ISLETA",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  -2,
                          "word":  "LES",
                          "dir":  "V",
                          "col":  1
                      },
                      {
                          "row":  -2,
                          "word":  "LIA",
                          "dir":  "V",
                          "col":  5
                      },
                      {
                          "row":  -2,
                          "word":  "ALE",
                          "dir":  "V",
                          "col":  3
                      }
                  ],
        "bonusWords":  [
                           "LAS",
                           "LEA",
                           "TILA",
                           "SETA",
                           "TELA"
                       ],
        "tipIcon":  "ðŸš",
        "tipTitle":  "Isletas de TrÃ¡nsito",
        "tip":  "Las isletas encauzan las corrientes vehiculares y funcionan como refugio seguro para peatones en avenidas anchas.",
        "tipDetail":  "Nunca pises ni circules sobre las marcas diagonales rayadas (cebreado) que preceden a una isleta divisoria."
    },
    {
        "id":  30,
        "title":  "Sonido y Alerta",
        "category":  "ContaminaciÃ³n Sonora",
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
        "tipIcon":  "ðŸ“¢",
        "tipTitle":  "Uso Reglamentario de Bocina",
        "tip":  "La bocina solo estÃ¡ autorizada para advertir sobre un peligro inminente de siniestro; no para apurar o reclamar.",
        "tipDetail":  "El uso indebido de bocina genera estrÃ©s, sobresaltos en peatones y ciclistas y estÃ¡ penado como falta en el CÃ³digo de TrÃ¡nsito."
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
        "tipIcon":  "ðŸªž",
        "tipTitle":  "RegulaciÃ³n de Espejos",
        "tip":  "AjustÃ¡ los espejos laterales de modo que apenas se vea el filo de la carrocerÃ­a de tu vehÃ­culo y el mÃ¡ximo de calzada.",
        "tipDetail":  "Para cambiar de carril: mirÃ¡ el espejo central, luego el lateral, y hacÃ© un rÃ¡pido vistazo con el rabillo del ojo para cubrir el punto ciego."
    },
    {
        "id":  32,
        "title":  "IluminaciÃ³n Vehicular",
        "category":  "Seguridad Ã“ptica",
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
        "tipIcon":  "ðŸ”¦",
        "tipTitle":  "AlineaciÃ³n de Faros",
        "tip":  "Faros desalineados pueden encandilar a quien viene de frente o dejarte sin visiÃ³n en curvas cerradas.",
        "tipDetail":  "MantenÃ© las Ã³pticas limpias de barro y verificÃ¡ periÃ³dicamente que funcionen todas las lÃ¡mparas de freno y posiciÃ³n trasera."
    },
    {
        "id":  33,
        "title":  "VehÃ­culos Pesados",
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
        "tipIcon":  "ðŸš›",
        "tipTitle":  "Puntos Ciegos de Camiones",
        "tip":  "Si vos no podÃ©s ver los espejos del camiÃ³n, el conductor del camiÃ³n NO puede verte a vos. Nunca te pegues detrÃ¡s.",
        "tipDetail":  "Los camiones necesitan abrirse hacia la izquierda para doblar a la derecha: jamÃ¡s intentes sobrepasarlos por la derecha en esquinas."
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
        "tipIcon":  "ðŸš«",
        "tipTitle":  "Alcohol Cero en CABA",
        "tip":  "En la Ciudad de Buenos Aires el lÃ­mite de alcohol en sangre es 0,0 g/l para todo tipo de conductores.",
        "tipDetail":  "Incluso una copa disminuye la agudeza visual, alarga el tiempo de reacciÃ³n e infunde una falsa sensaciÃ³n de seguridad sumamente peligrosa."
    },
    {
        "id":  35,
        "title":  "AtenciÃ³n Plena",
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
        "tipIcon":  "ðŸ§ ",
        "tipTitle":  "Cero Pantallas al Volante",
        "tip":  "Usar el celular al manejar multiplica por 4 el riesgo de choque, igualando los efectos de la intoxicaciÃ³n alcohÃ³lica.",
        "tipDetail":  "Ni llamadas con manos libres: la distracciÃ³n cognitiva que genera una conversaciÃ³n telefÃ³nica reduce en un 50% la informaciÃ³n visual percibida."
    },
    {
        "id":  36,
        "title":  "Calmado de TrÃ¡nsito",
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
                          "word":  "OLA",
                          "row":  -2,
                          "col":  3,
                          "dir":  "V"
                      },
                      {
                          "word":  "AMO",
                          "row":  -2,
                          "col":  1,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "ALA",
                           "LADO",
                           "MODA",
                           "DOMA",
                           "MALA"
                       ],
        "tipIcon":  "âš ï¸",
        "tipTitle":  "Reductores y Lomadas",
        "tip":  "Las lomadas se instalan para forzar una velocidad no mayor a 20 km/h en sectores de alto cruce de personas.",
        "tipDetail":  "Pasalas con ambas ruedas al mismo tiempo a marcha reducida para no desalinear amortiguadores ni resortes de suspensiÃ³n."
    },
    {
        "id":  37,
        "title":  "TracciÃ³n y 2 Ruedas",
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
                          "row":  0,
                          "word":  "CADENA",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "CEDA",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "DEN",
                          "dir":  "V",
                          "col":  2
                      },
                      {
                          "row":  0,
                          "word":  "ACA",
                          "dir":  "V",
                          "col":  5
                      }
                  ],
        "bonusWords":  [
                           "DAN",
                           "CENA",
                           "NADA",
                           "CANA"
                       ],
        "tipIcon":  "â›“ï¸",
        "tipTitle":  "Mantenimiento de Cadena",
        "tip":  "En motos y bicicletas, la tensiÃ³n y lubricaciÃ³n de la cadena previene que se corte o trabe la rueda trasera en movimiento.",
        "tipDetail":  "Una cadena suelta puede salirse de la corona y bloquear instantÃ¡neamente el rodado, provocando una caÃ­da inevitable a alta velocidad."
    },
    {
        "id":  38,
        "title":  "DocumentaciÃ³n Obligatoria",
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
        "tipIcon":  "ðŸªª",
        "tipTitle":  "CÃ©dula de IdentificaciÃ³n",
        "tip":  "La cÃ©dula verde no vence para el titular registral; los terceros autorizados deben circular con la correspondiente cÃ©dula azul o digital.",
        "tipDetail":  "Llevar la documentaciÃ³n en la app Mi Argentina es legal y vÃ¡lido en todos los puestos de control del paÃ­s."
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
        "tipIcon":  "ðŸ’³",
        "tipTitle":  "Sistema de Scoring",
        "tip":  "Cada conductor inicia con 20 puntos; las infracciones graves descuentan puntaje hasta inhabilitar la licencia.",
        "tipDetail":  "Correr picadas resta 20 puntos directo; alcoholemia positiva resta 10 puntos; conducir sin casco o cruzando en rojo resta 5 puntos."
    },
    {
        "id":  40,
        "title":  "Cobertura y Ley",
        "category":  "ProtecciÃ³n Legal",
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
                          "row":  0,
                          "word":  "SEGURO",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "SUR",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "USO",
                          "dir":  "V",
                          "col":  3
                      },
                      {
                          "row":  -2,
                          "word":  "REO",
                          "dir":  "V",
                          "col":  5
                      }
                  ],
        "bonusWords":  [
                           "ROE",
                           "SER",
                           "RUEGO",
                           "GRUESO",
                           "EURO"
                       ],
        "tipIcon":  "ðŸ›¡ï¸",
        "tipTitle":  "Seguro Obligatorio de TrÃ¡nsito",
        "tip":  "Es obligatorio portar comprobante vigente de la pÃ³liza de Responsabilidad Civil hacia Terceros (Ley Nacional 24.449).",
        "tipDetail":  "No es necesario llevar el recibo de pago impreso; la pÃ³liza digital o tarjeta de circulaciÃ³n es constancia suficiente."
    },
    {
        "id":  41,
        "title":  "DÃ¡rsenas de Maniobra",
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
        "tipIcon":  "â†©ï¸",
        "tipTitle":  "DÃ¡rsenas de Giro y Retorno",
        "tip":  "En avenidas semaforizadas de doble mano, girar a la izquierda solo estÃ¡ permitido si existe dÃ¡rsena especÃ­fica habilitada.",
        "tipDetail":  "IngresÃ¡ a la dÃ¡rsena con la luz de giro colocada y aguardÃ¡ la flecha semafÃ³rica verde antes de iniciar la maniobra."
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
                          "row":  0,
                          "word":  "CANTERO",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "CARNET",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  2,
                          "word":  "CORTE",
                          "dir":  "H",
                          "col":  -2
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
                           "RTO",
                           "CANTER",
                           "CANTO",
                           "NORTE",
                           "TERCO"
                       ],
        "tipIcon":  "ðŸŒ³",
        "tipTitle":  "Boulevards y Canteros",
        "tip":  "Los canteros centrales separan sentidos de circulaciÃ³n para eliminar el riesgo de choque frontal.",
        "tipDetail":  "Nunca intentes girar en \u0027U\u0027 sobre canteros o pastos divisorios; hacelo Ãºnicamente en los retornos oficiales seÃ±alizados."
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
                          "row":  0,
                          "word":  "ROTONDA",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "ROTA",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "DON",
                          "dir":  "V",
                          "col":  5
                      },
                      {
                          "row":  3,
                          "word":  "RAD",
                          "dir":  "H",
                          "col":  -1
                      }
                  ],
        "bonusWords":  [
                           "ARO",
                           "ATO",
                           "DAN",
                           "DAR",
                           "ORA",
                           "RON",
                           "RTO",
                           "RODA",
                           "ROD",
                           "TORNADO",
                           "RATON"
                       ],
        "tipIcon":  "ðŸ”„",
        "tipTitle":  "Prioridad en Rotondas",
        "tip":  "Tiene prioridad absoluta quien ya estÃ¡ dentro de la rotonda. Quien va a entrar debe frenar y ceder el paso.",
        "tipDetail":  "Para salir de la rotonda, pasÃ¡ al carril externo antes de la salida y seÃ±alizÃ¡ con la luz de giro derecha."
    },
    {
        "id":  44,
        "title":  "Calzada y Pavimento",
        "category":  "VÃ­as de CirculaciÃ³n",
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
                          "row":  0,
                          "word":  "CALZADA",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "ALZADA",
                          "dir":  "V",
                          "col":  1
                      },
                      {
                          "row":  3,
                          "word":  "CALA",
                          "dir":  "H",
                          "col":  0
                      }
                  ],
        "bonusWords":  [
                           "ACA",
                           "ALA",
                           "ALZA",
                           "CAL",
                           "LACA",
                           "AZADA"
                       ],
        "tipIcon":  "ðŸ›¤ï¸",
        "tipTitle":  "Adherencia en Calzadas",
        "tip":  "La calzada es la zona de la vÃ­a destinada exclusivamente a la circulaciÃ³n de vehÃ­culos automotores y tracciÃ³n.",
        "tipDetail":  "Las marcas de pintura termoplÃ¡stica vial mojadas tienen menor coeficiente de fricciÃ³n; no frenes bruscamente sobre las lÃ­neas."
    },
    {
        "id":  45,
        "title":  "Lluvia y Pavimento",
        "category":  "FÃ­sica y CinemÃ¡tica",
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
        "tipIcon":  "ðŸŒ§ï¸",
        "tipTitle":  "Efecto Aquaplaning",
        "tip":  "Con lluvia intensa, se forma una pelÃ­cula de agua entre el neumÃ¡tico y el asfalto que hace flotar al vehÃ­culo sin direcciÃ³n.",
        "tipDetail":  "Si sentÃ­s la direcciÃ³n liviana por aquaplaning: no frenes ni des volantazos; soltÃ¡ el acelerador suavemente con volante firme."
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
                          "row":  0,
                          "word":  "BARRERA",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "BARRA",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "AREA",
                          "dir":  "V",
                          "col":  6
                      },
                      {
                          "row":  0,
                          "word":  "ERA",
                          "dir":  "V",
                          "col":  4
                      }
                  ],
        "bonusWords":  [
                           "BAR",
                           "ARAR",
                           "RARA"
                       ],
        "tipIcon":  "ðŸš‚",
        "tipTitle":  "Paso a Nivel y Barrera",
        "tip":  "Prohibido cruzar con barrera baja, en movimiento o cuando suene la alarma fonoluminosa roja.",
        "tipDetail":  "Un tren de pasajeros tarda mÃ¡s de 500 metros en detenerse; nunca intentes ganarle el paso a una formaciÃ³n en aproximaciÃ³n."
    },
    {
        "id":  47,
        "title":  "Paradas y MetrobÃºs",
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
                          "row":  0,
                          "word":  "REFUGIO",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "RIEGO",
                          "dir":  "V",
                          "col":  0
                      },
                      {
                          "row":  0,
                          "word":  "GIRO",
                          "dir":  "V",
                          "col":  4
                      },
                      {
                          "row":  0,
                          "word":  "FRIO",
                          "dir":  "V",
                          "col":  2
                      }
                  ],
        "bonusWords":  [
                           "FEO",
                           "GIR",
                           "REO",
                           "ROE",
                           "FREO",
                           "FUEGO",
                           "FIGURO"
                       ],
        "tipIcon":  "ðŸšŒ",
        "tipTitle":  "Carriles Exclusivos MetrobÃºs",
        "tip":  "Los carriles centrales de MetrobÃºs estÃ¡n reservados exclusivamente para transporte pÃºblico y vehÃ­culos de emergencia.",
        "tipDetail":  "Al descender de un colectivo en un refugio, cruzÃ¡ siempre por la senda peatonal semaforizada y nunca por delante del Ã³mnibus."
    },
    {
        "id":  48,
        "title":  "PosiciÃ³n de ConducciÃ³n",
        "category":  "ErgonomÃ­a y Control",
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
        "tipIcon":  "ðŸŽ¯",
        "tipTitle":  "Manos a las \u00279 y 15\u0027",
        "tip":  "TomÃ¡ el volante como las agujas del reloj a las \u00279 y 15\u0027 con ambos pulgares apoyados sin trabar.",
        "tipDetail":  "Esta posiciÃ³n permite el mÃ¡ximo rango de giro sin cruzar los brazos y evita lesiones graves si se activa el airbag del volante."
    },
    {
        "id":  49,
        "title":  "Distancias y Velocidad",
        "category":  "CinemÃ¡tica Vial",
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
                          "row":  0,
                          "word":  "FRENADOS",
                          "dir":  "H",
                          "col":  0
                      },
                      {
                          "row":  -2,
                          "word":  "DARSENO",
                          "dir":  "V",
                          "col":  1
                      },
                      {
                          "row":  2,
                          "word":  "FRENOS",
                          "dir":  "H",
                          "col":  -1
                      },
                      {
                          "row":  0,
                          "word":  "SENDA",
                          "dir":  "V",
                          "col":  7
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
                           "SEDA",
                           "FRENO",
                           "FONDA",
                           "FARDON"
                       ],
        "tipIcon":  "ðŸ“",
        "tipTitle":  "Aumento CuadrÃ¡tico de la Frenada",
        "tip":  "Si aumentÃ¡s tu velocidad de 50 a 100 km/h (el doble), tu distancia de frenado se multiplica por 4.",
        "tipDetail":  "A 100 km/h recorrÃ©s 28 metros por segundo; la distancia total de detenciÃ³n en asfalto seco supera los 80 metros."
    },
    {
        "id":  50,
        "title":  "CinturÃ³n de Seguridad",
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
                          "word":  "RON",
                          "row":  0,
                          "col":  5,
                          "dir":  "V"
                      },
                      {
                          "word":  "UNO",
                          "row":  -2,
                          "col":  6,
                          "dir":  "V"
                      }
                  ],
        "bonusWords":  [
                           "CON",
                           "RIN",
                           "RTO",
                           "RICO",
                           "CORO",
                           "TINTO"
                       ],
        "tipIcon":  "ðŸ’º",
        "tipTitle":  "CinturÃ³n de Tres Puntos",
        "tip":  "El uso del cinturÃ³n es obligatorio para todos los ocupantes del vehÃ­culo, tanto en asientos delanteros como traseros.",
        "tipDetail":  "En un choque a 50 km/h, una persona de 70 kg sin cinturÃ³n sale despedida con una fuerza equivalente a caer de un 4to piso."
    }
];
if (typeof module !== 'undefined') module.exports = { GAME_LEVELS };
