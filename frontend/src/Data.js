
export const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const currentYear = new Date().getFullYear();

export const previousYear = currentYear-1;

export const currentMonth = new Date().getMonth(); // will give 0 if January, this is the month i am preparing roster in not the month i am preparing for

export let initialOfficers = [

    {
        Name: "Arun",
        GovMail: "arun@gov.in",
        DOB: "1992-04-15",
        DOJ: "2025-02-10",
        Cadre: "ACO",
        Batch: "A",

        BatchHistory: {
            2025: {
                month: {
                    January: "D",
                    February: "D",
                    March: "A",
                    April: "A",
                    May: "A",
                    June: "D",
                    July: "D",
                    August: "A",
                    September: "A",
                    October: "D",
                    November: "D",
                    December: "A"
                }
            },

            2026: {
                month: {
                    January: "A",
                    February: "D",
                    March: "D",
                    April: "A",
                    May: "A",
                    June: "D",
                    July: "D",
                    August: "A",
                    September: "A",
                    October: "B",
                    November: "",
                    December: ""
                }
            }
        },

        id: "201",

        Roles: {
            2025: {
                January: "",
                February: "PRO",
                March: "PRO",
                April: "PRO",
                May: "COPS",
                June: "COPS",
                July: "CARGO ESCORT",
                August: "CARGO ESCORT",
                September: "VDX",
                October: "VDX",
                November: "MHB",
                December: "MHB"
            },

            2026: {
                January: "DETENTION OFFICER",
                February: "DETENTION OFFICER",
                March: "ARREAR RECOVERY",
                April: "ARREAR RECOVERY",
                May: "PRO",
                June: "PRO",
                July: "HELP DSK",
                August: "HELP DSK",
                September: "COPS",
                October: "COPS",
                November: "",
                December: ""
            }
        }
    },


    {
        Name: "Bharath",
        GovMail: "bharath@gov.in",
        DOB: "1994-08-21",
        DOJ: "2025-06-18",
        Cadre: "ACO",
        Batch: "B",

        BatchHistory: {
            2025: {
                month: {
                    January: "",
                    February: "",
                    March: "",
                    April: "",
                    May: "A",
                    June: "B",
                    July: "B",
                    August: "A",
                    September: "A",
                    October: "B",
                    November: "B",
                    December: "A"
                }
            },

            2026: {
                month: {
                    January: "A",
                    February: "B",
                    March: "B",
                    April: "A",
                    May: "A",
                    June: "B",
                    July: "B",
                    August: "A",
                    September: "A",
                    October: "A",
                    November: "",
                    December: ""
                }
            }
        },

        id: "202",

        Roles: {
            2025: {
                January: "",
                February: "",
                March: "",
                April: "",
                May: "",
                June: "VDX",
                July: "VDX",
                August: "COPS",
                September: "COPS",
                October: "CARGO ESCORT",
                November: "CARGO ESCORT",
                December: "PRO"
            },

            2026: {
                January: "PRO",
                February: "DETENTION OFFICER",
                March: "DETENTION OFFICER",
                April: "MHB",
                May: "MHB",
                June: "HELP DSK",
                July: "HELP DSK",
                August: "COPS",
                September: "COPS",
                October: "VDX",
                November: "",
                December: ""
            }
        }
    },


    {
        Name: "Charan",
        GovMail: "charan@gov.in",
        DOB: "1990-03-12",
        DOJ: "2024-11-05",
        Cadre: "ACO",
        Batch: "C",

        BatchHistory: {
            2025: {
                month: {
                    January: "C",
                    February: "B",
                    March: "B",
                    April: "C",
                    May: "C",
                    June: "B",
                    July: "B",
                    August: "C",
                    September: "C",
                    October: "B",
                    November: "B",
                    December: "C"
                }
            },

            2026: {
                month: {
                    January: "C",
                    February: "B",
                    March: "B",
                    April: "C",
                    May: "C",
                    June: "B",
                    July: "B",
                    August: "C",
                    September: "C",
                    October: "D",
                    November: "",
                    December: ""
                }
            }
        },

        id: "203",

        Roles: {
            2025: {
                January: "MHB (2)",
                February: "MHB (2)",
                March: "FLIGHT SECURITY INTELLIGENCE",
                April: "FIELD SECURITY INTELLIGENCE",
                May: "PRO",
                June: "PRO",
                July: "VDX",
                August: "VDX",
                September: "DETENTION OFFICER",
                October: "DETENTION OFFICER",
                November: "COPS",
                December: "COPS"
            },

            2026: {
                January: "CARGO ESCORT",
                February: "CARGO ESCORT",
                March: "ARREAR RECOVERY",
                April: "ARREAR RECOVERY",
                May: "HELP DSK",
                June: "HELP DSK",
                July: "PRO",
                August: "PRO",
                September: "MHB",
                October: "PRO",
                November: "",
                December: ""
            }
        }
    },


    {
        Name: "Deepak",
        GovMail: "deepak@gov.in",
        DOB: "1987-09-25",
        DOJ: "2025-01-14",
        Cadre: "ACS",
        Batch: "A",

        BatchHistory: {
            2025: {
                month: {
                    January: "D",
                    February: "A",
                    March: "B",
                    April: "C",
                    May: "D",
                    June: "A",
                    July: "B",
                    August: "C",
                    September: "D",
                    October: "A",
                    November: "B",
                    December: "C"
                }
            },

            2026: {
                month: {
                    January: "D",
                    February: "A",
                    March: "B",
                    April: "C",
                    May: "D",
                    June: "A",
                    July: "B",
                    August: "C",
                    September: "D",
                    October: "",
                    November: "",
                    December: ""
                }
            }
        },

        id: "204",

        Roles: {
            2025: {
                January: "",
                February: "BAGGAGE SUPDT.",
                March: "BAGGAGE SUPDT.",
                April: "CARGO ESCORT",
                May: "CARGO ESCORT",
                June: "SCN/DO",
                July: "SCN/DO",
                August: "FLIGHT SECURITY INTELLIGENCE",
                September: "FIELD SECURITY INTELLIGENCE",
                October: "DEP, OIL FUELING & DEP BOND/CARNET",
                November: "DEP, OIL FUELING & DEP BOND/CARNET",
                December: "BAGGAGE SUPDT."
            },

            2026: {
                January: "BAGGAGE SUPDT.",
                February: "CARGO ESCORT",
                March: "CARGO ESCORT",
                April: "SCN/DO",
                May: "SCN/DO",
                June: "FLIGHT SECURITY INTELLIGENCE",
                July: "FIELD SECURITY INTELLIGENCE",
                August: "DEP, OIL FUELING & DEP BOND/CARNET",
                September: "BAGGAGE SUPDT.",
                October: "",
                November: "",
                December: ""
            }
        }
    },


    {
        Name: "Ezhil",
        GovMail: "ezhil@gov.in",
        DOB: "1985-12-02",
        DOJ: "2024-10-20",
        Cadre: "ACS",
        Batch: "B",

        BatchHistory: {
            2025: {
                month: {
                    January: "A",
                    February: "B",
                    March: "C",
                    April: "D",
                    May: "A",
                    June: "B",
                    July: "C",
                    August: "D",
                    September: "A",
                    October: "B",
                    November: "C",
                    December: "D"
                }
            },

            2026: {
                month: {
                    January: "A",
                    February: "B",
                    March: "C",
                    April: "D",
                    May: "A",
                    June: "B",
                    July: "C",
                    August: "D",
                    September: "A",
                    October: "",
                    November: "",
                    December: ""
                }
            }
        },

        id: "205",

        Roles: {
            2025: {
                January: "SCN/DO",
                February: "SCN/DO",
                March: "FLIGHT SECURITY INTELLIGENCE",
                April: "FIELD SECURITY INTELLIGENCE",
                May: "BAGGAGE SUPDT.",
                June: "BAGGAGE SUPDT.",
                July: "DEP, OIL FUELING & DEP BOND/CARNET",
                August: "DEP, OIL FUELING & DEP BOND/CARNET",
                September: "CARGO ESCORT",
                October: "CARGO ESCORT",
                November: "SCN/DO",
                December: "FLIGHT SECURITY INTELLIGENCE"
            },

            2026: {
                January: "BAGGAGE SUPDT.",
                February: "BAGGAGE SUPDT.",
                March: "CARGO ESCORT",
                April: "CARGO ESCORT",
                May: "SCN/DO",
                June: "SCN/DO",
                July: "FLIGHT SECURITY INTELLIGENCE",
                August: "FIELD SECURITY INTELLIGENCE",
                September: "DEP, OIL FUELING & DEP BOND/CARNET",
                October: "",
                November: "",
                December: ""
            }
        }
    },


    {
        Name: "Farooq",
        GovMail: "farooq@gov.in",
        DOB: "1979-04-11",
        DOJ: "2025-03-03",
        Cadre: "AC/DC",
        Batch: "C",

        BatchHistory: {
            2025: {
                month: {
                    January: "",
                    February: "",
                    March: "C",
                    April: "C",
                    May: "C",
                    June: "C",
                    July: "C",
                    August: "C",
                    September: "C",
                    October: "C",
                    November: "C",
                    December: "C"
                }
            },

            2026: {
                month: {
                    January: "C",
                    February: "C",
                    March: "C",
                    April: "C",
                    May: "C",
                    June: "C",
                    July: "C",
                    August: "C",
                    September: "C",
                    October: "",
                    November: "",
                    December: ""
                }
            }
        },

        id: "206",

        Roles: {
            2025: {
                January: "",
                February: "",
                March: "SUPERVISION",
                April: "SUPERVISION",
                May: "SUPERVISION",
                June: "SUPERVISION",
                July: "SUPERVISION",
                August: "SUPERVISION",
                September: "SUPERVISION",
                October: "SUPERVISION",
                November: "SUPERVISION",
                December: "SUPERVISION"
            },

            2026: {
                January: "SUPERVISION",
                February: "SUPERVISION",
                March: "SUPERVISION",
                April: "SUPERVISION",
                May: "SUPERVISION",
                June: "SUPERVISION",
                July: "SUPERVISION",
                August: "SUPERVISION",
                September: "SUPERVISION",
                October: "",
                November: "",
                December: ""
            }
        }
    },


    {
        Name: "Gopal",
        GovMail: "gopal@gov.in",
        DOB: "1976-07-19",
        DOJ: "2024-09-12",
        Cadre: "AC/DC",
        Batch: "D",

        BatchHistory: {
            2025: {
                month: {
                    January: "D",
                    February: "D",
                    March: "D",
                    April: "D",
                    May: "D",
                    June: "D",
                    July: "D",
                    August: "D",
                    September: "D",
                    October: "D",
                    November: "D",
                    December: "D"
                }
            },

            2026: {
                month: {
                    January: "D",
                    February: "D",
                    March: "D",
                    April: "D",
                    May: "D",
                    June: "D",
                    July: "D",
                    August: "D",
                    September: "D",
                    October: "",
                    November: "",
                    December: ""
                }
            }
        },

        id: "207",

        Roles: {
            2025: {
                January: "SUPERVISION",
                February: "SUPERVISION",
                March: "SUPERVISION",
                April: "SUPERVISION",
                May: "SUPERVISION",
                June: "SUPERVISION",
                July: "SUPERVISION",
                August: "SUPERVISION",
                September: "SUPERVISION",
                October: "SUPERVISION",
                November: "SUPERVISION",
                December: "SUPERVISION"
            },

            2026: {
                January: "SUPERVISION",
                February: "SUPERVISION",
                March: "SUPERVISION",
                April: "SUPERVISION",
                May: "SUPERVISION",
                June: "SUPERVISION",
                July: "SUPERVISION",
                August: "SUPERVISION",
                September: "SUPERVISION",
                October: "",
                November: "",
                December: ""
            }
        }
    },


    {
        Name: "Hari",
        GovMail: "hari@gov.in",
        DOB: "1996-02-18",
        DOJ: "2026-02-20",
        Cadre: "ACO",
        Batch: "D",

        BatchHistory: {
            2025: {
                month: {
                    January: "",
                    February: "",
                    March: "",
                    April: "",
                    May: "",
                    June: "",
                    July: "",
                    August: "",
                    September: "",
                    October: "",
                    November: "",
                    December: ""
                }
            },

            2026: {
                month: {
                    January: "",
                    February: "D",
                    March: "D",
                    April: "C",
                    May: "C",
                    June: "B",
                    July: "B",
                    August: "A",
                    September: "A",
                    October: "D",
                    November: "",
                    December: ""
                }
            }
        },

        id: "208",

        Roles: {
            2025: {
                January: "",
                February: "",
                March: "",
                April: "",
                May: "",
                June: "",
                July: "",
                August: "",
                September: "",
                October: "",
                November: "",
                December: ""
            },

            2026: {
                January: "",
                February: "CARGO ESCORT",
                March: "CARGO ESCORT",
                April: "VDX",
                May: "VDX",
                June: "MHB",
                July: "MHB",
                August: "PRO",
                September: "PRO",
                October: "COPS",
                November: "",
                December: ""
            }
        }
    },


    {
        Name: "Imran",
        GovMail: "imran@gov.in",
        DOB: "1993-10-06",
        DOJ: "2025-08-11",
        Cadre: "ACO",
        Batch: "A",

        BatchHistory: {
            2025: {
                month: {
                    January: "",
                    February: "",
                    March: "",
                    April: "",
                    May: "",
                    June: "",
                    July: "A",
                    August: "A",
                    September: "D",
                    October: "D",
                    November: "A",
                    December: "A"
                }
            },

            2026: {
                month: {
                    January: "D",
                    February: "D",
                    March: "A",
                    April: "A",
                    May: "D",
                    June: "D",
                    July: "A",
                    August: "A",
                    September: "D",
                    October: "D",
                    November: "",
                    December: ""
                }
            }
        },

        id: "209",

        Roles: {
            2025: {
                January: "",
                February: "",
                March: "",
                April: "",
                May: "",
                June: "",
                July: "",
                August: "HELP DSK",
                September: "HELP DSK",
                October: "COPS",
                November: "COPS",
                December: "VDX"
            },

            2026: {
                January: "VDX",
                February: "CARGO ESCORT",
                March: "CARGO ESCORT",
                April: "MHB (2)",
                May: "MHB (2)",
                June: "DETENTION OFFICER",
                July: "DETENTION OFFICER",
                August: "FLIGHT SECURITY INTELLIGENCE",
                September: "FIELD SECURITY INTELLIGENCE",
                October: "FLIGHT SECURITY INTELLIGENCE",
                November: "",
                December: ""
            }
        }
    },


    {
        Name: "Joseph",
        GovMail: "joseph@gov.in",
        DOB: "1989-05-27",
        DOJ: "2025-05-22",
        Cadre: "ACS",
        Batch: "D",

        BatchHistory: {
            2025: {
                month: {
                    January: "",
                    February: "",
                    March: "",
                    April: "",
                    May: "D",
                    June: "A",
                    July: "B",
                    August: "C",
                    September: "D",
                    October: "A",
                    November: "B",
                    December: "C"
                }
            },

            2026: {
                month: {
                    January: "D",
                    February: "A",
                    March: "B",
                    April: "C",
                    May: "D",
                    June: "A",
                    July: "B",
                    August: "C",
                    September: "D",
                    October: "C",
                    November: "",
                    December: ""
                }
            }
        },

        id: "210",

        Roles: {
            2025: {
                January: "",
                February: "",
                March: "",
                April: "",
                May: "CARGO ESCORT",
                June: "CARGO ESCORT",
                July: "BAGGAGE SUPDT.",
                August: "BAGGAGE SUPDT.",
                September: "SCN/DO",
                October: "SCN/DO",
                November: "FLIGHT SECURITY INTELLIGENCE",
                December: "FIELD SECURITY INTELLIGENCE"
            },

            2026: {
                January: "DEP, OIL FUELING & DEP BOND/CARNET",
                February: "DEP, OIL FUELING & DEP BOND/CARNET",
                March: "BAGGAGE SUPDT.",
                April: "BAGGAGE SUPDT.",
                May: "SCN/DO",
                June: "SCN/DO",
                July: "FLIGHT SECURITY INTELLIGENCE",
                August: "FIELD SECURITY INTELLIGENCE",
                September: "CARGO ESCORT",
                October: "",
                November: "",
                December: ""
            }
        }
    }

];

// An object holding the roles of ACOs along with number of ACOs with such Roles in each batch
export const AcoRoles ={
  "BOND/FUEL (+)/CARNET": "2",
  "COPS": "2",
  "CARGO ESCORT": "1",
  "VALUATION OF DETENTION GOODS": "1",
  "DEP BOND, VDX, CARNET": "3",
  "DETENTION OFFICER": "2",
  "ARREAR RECOVERY": "2",
  "MHB": "1",
  "S.D.O": "1",
  "PRO": "3",
  "VDX": "1",
  "HELP DSK": "1",
  "MHB (2)": "1",
  "FLIGHT SECURITY INTELLIGENCE": "1",
  "FIELD SECURITY INTELLIGENCE": "1"
}

export const AcsRoles = {
  "BAGGAGE SUPDT.": "1",
  "DEP, OIL FUELING & DEP BOND/CARNET": "1",
  "CARGO ESCORT": "1",
  "SCN/DO": "1",
  "FIELD & FLIGHT INT": "1"
};