export default {
  panelAfi: [false],
  panelMed: [false],
  panelIPS: [false],
  e1: 1,
  cargando: false,
  aut: {
    ORIGEN: "",
    // IDSEDE: "01",
    // IDSEDEORIGEN: "01",
    TIPOAUTORIZACION: "Previa",
    ALTOCOSTO: "No",
    ATENCION: "Ambulatoria",
    URGENCIA: 0,
    IMPUTABLE_A: "Administradora",
    ESTADO: "Solicitada",
    VALORTOTAL: 0,
    VALORCOPAGO: 0,
    VALORBENEFICIO: 0,
    VALOREXEDENTE: 0,
    VALORTOTALCOSTO: 0,
    VALORCOPAGOCOSTO: 0,
    IMPRESO: 0,
    CLASEORDEN: "Normal",
    GENEROCAJA: 0,
    AUTORIZADO: 1,
    CIUDAD: undefined,
    FUNCIONARIO_AUT: undefined,
    FECHAREALIZACION: undefined,
    FECHASOL: undefined,
    FECHAGEN: undefined,
    PEDIDOINV: 0,

    // -----------------------------
    IDAFILIADO: "",
    AUTORIZADOPOR: "",
    NUMAUTORIZA: "",
    DIRECCION: "",
    // USUARIO: ""
    RECORDATORIO: false
  },
  fecharealizacion: undefined,
  fechasol: undefined,
  fechagen: undefined,
  // ipss: [],
  // epss: [],
  plns: [],
  name: "",
  email: "",
  select: null,
  items: ["Chat", "Correo", "En Punto", "Llamada", "Otro"],
  checkbox: null,
  urgencia: false,
  dictionary: {
    attributes: {
      email: "Correo Electrónico",
      medio: "Medio de la Solicitud"
      // custom attributes
    },
    custom: {
      name: {
        // required: () => "Name can not be empty",
        max: "The name field may not be greater than 10 characters"
        // custom messages
      },
      select: {
        required: "Select field is required"
      }
    }
  },

  archivos: [],
  nombreArchivo: "",
  archivo: {
    TIPODOC: ""
  },
  med: {
    IDMEDICO: undefined,
    TIPO_USUARIO: undefined,
    TIPOVINCULACION: undefined,
    NOMBRE: undefined,
    IDEMEDICA: undefined,
    NO_REGISTRO: undefined,
    IDMODELO: undefined,
    DIRECCION: undefined,
    TELEFONOS: undefined,
    BEEPER: undefined,
    CELULAR: undefined,
    CIUDAD: undefined,
    AUTORIZACION: undefined,
    SEL_PROVEED: undefined,
    MANEJAMSEDES: undefined,
    NO_CONSULTAS: undefined,
    IDTERCERO: undefined,
    EMPLEADO: undefined,
    TOPEPACIENTES: undefined,
    PACIENTESASIG: undefined,
    ESTADO: undefined,
    IDMODELOPRE: undefined,
    LUGARATENCION: undefined,
    IDSEDEATENCION: undefined,
    DIR_OTRA: undefined,
    TEL_OTRA: undefined,
    CIU_OTRA: undefined,
    TIPO_ID: undefined,
    PNOMBRE: undefined,
    SNOMBRE: undefined,
    PAPELLIDO: undefined,
    SAPELLIDO: undefined,
    IDFIRMA: undefined,
    CLASIFICACION: undefined,
    NUMACCIONES: undefined,
    NUMMSDS: undefined,
    CODCOLEGIO: undefined,
    TELEFONO: undefined,
    EMAIL: undefined,
    ACCIONES: undefined,
    MINUTOSCAMBIO: undefined
  },
  afi: {},
  ips: {},
  eps: {},
  pln: {},
  ser: { CANTIDAD: 1 },
  departamento: {},
  ciudad: {},
  messages: [
    {
      avatar: "/src/assets/images/medical/Group_Doctors_Check.ico",
      name: "John Leider",
      title: "Welcome to Vuetify.js!",
      excerpt: "Thank you for joining our community..."
    },
    {
      color: "red",
      icon: "people",
      name: "Social",
      new: 1,
      total: 3,
      title: "Twitter"
    },
    {
      color: "teal",
      icon: "local_offer",
      name: "Promos",
      new: 2,
      total: 4,
      title: "Shop your way",
      exceprt: "New deals available, Join Today"
    }
  ],
  contratantes: [],
  lorem:
    "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.",
  servicios: [],
  dialog_frm_ips: false,
  palabras: [],
  items_palabras: [],
  dialogComentarios: false,
  servicio_comentario: {},
  servicios_del_plan: [],
  dialogConfirmacion: false,
  confirmar_autorizacion_al_guardar: true,
  archivos_subidos: [],
  idcontratante: "",
  formvalid: true,
  ruleNOAUT: [],
  validando_autorizacion: false,
  fechainicio_recordatorio: undefined,
  validando_fecha_realizacion: false,
  validando_fechasol: false,
  validando_fechagen: false

}