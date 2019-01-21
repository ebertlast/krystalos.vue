<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field
          name="COMPANIA"
          label="COMPANIA"
          id="COMPANIA"
          ref="COMPANIA"
          v-model="model.COMPANIA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CUENTA" label="CUENTA" id="CUENTA" ref="CUENTA" v-model="model.CUENTA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="NOMCUENTA"
          label="NOMCUENTA"
          id="NOMCUENTA"
          ref="NOMCUENTA"
          v-model="model.NOMCUENTA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="TIPO" label="TIPO" id="TIPO" ref="TIPO" v-model="model.TIPO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="NEMONICO"
          label="NEMONICO"
          id="NEMONICO"
          ref="NEMONICO"
          v-model="model.NEMONICO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CENTRO" label="CENTRO" id="CENTRO" ref="CENTRO" v-model="model.CENTRO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PRODUCTO"
          label="PRODUCTO"
          id="PRODUCTO"
          ref="PRODUCTO"
          v-model="model.PRODUCTO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="REFERENCIA"
          label="REFERENCIA"
          id="REFERENCIA"
          ref="REFERENCIA"
          v-model="model.REFERENCIA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TERCERO"
          label="TERCERO"
          id="TERCERO"
          ref="TERCERO"
          v-model="model.TERCERO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="RETENCION"
          label="RETENCION"
          id="RETENCION"
          ref="RETENCION"
          v-model="model.RETENCION"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CPTORETENCION"
          label="CPTORETENCION"
          id="CPTORETENCION"
          ref="CPTORETENCION"
          v-model="model.CPTORETENCION"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="AJUSTE" label="AJUSTE" id="AJUSTE" ref="AJUSTE" v-model="model.AJUSTE"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CIERRE" label="CIERRE" id="CIERRE" ref="CIERRE" v-model="model.CIERRE"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CUENTAFISCAL"
          label="CUENTAFISCAL"
          id="CUENTAFISCAL"
          ref="CUENTAFISCAL"
          v-model="model.CUENTAFISCAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IMPUESTO"
          label="IMPUESTO"
          id="IMPUESTO"
          ref="IMPUESTO"
          v-model="model.IMPUESTO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="ESTADO" label="ESTADO" id="ESTADO" ref="ESTADO" v-model="model.ESTADO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NIVEL" label="NIVEL" id="NIVEL" ref="NIVEL" v-model="model.NIVEL"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CUENTA_SUMA"
          label="CUENTA_SUMA"
          id="CUENTA_SUMA"
          ref="CUENTA_SUMA"
          v-model="model.CUENTA_SUMA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CLASE" label="CLASE" id="CLASE" ref="CLASE" v-model="model.CLASE"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="RUBRO" label="RUBRO" id="RUBRO" ref="RUBRO" v-model="model.RUBRO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TIPOTESORERO"
          label="TIPOTESORERO"
          id="TIPOTESORERO"
          ref="TIPOTESORERO"
          v-model="model.TIPOTESORERO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="BANCO" label="BANCO" id="BANCO" ref="BANCO" v-model="model.BANCO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="SUCURSAL"
          label="SUCURSAL"
          id="SUCURSAL"
          ref="SUCURSAL"
          v-model="model.SUCURSAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CTA_BCO"
          label="CTA_BCO"
          id="CTA_BCO"
          ref="CTA_BCO"
          v-model="model.CTA_BCO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CODCAJA"
          label="CODCAJA"
          id="CODCAJA"
          ref="CODCAJA"
          v-model="model.CODCAJA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="DETALLEXTERCERO"
          label="DETALLEXTERCERO"
          id="DETALLEXTERCERO"
          ref="DETALLEXTERCERO"
          v-model="model.DETALLEXTERCERO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="RESPONSABLE"
          label="RESPONSABLE"
          id="RESPONSABLE"
          ref="RESPONSABLE"
          v-model="model.RESPONSABLE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CUENTA_HOMOLOGA"
          label="CUENTA_HOMOLOGA"
          id="CUENTA_HOMOLOGA"
          ref="CUENTA_HOMOLOGA"
          v-model="model.CUENTA_HOMOLOGA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CUENTANIIF"
          label="CUENTANIIF"
          id="CUENTANIIF"
          ref="CUENTANIIF"
          v-model="model.CUENTANIIF"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CONCEPTOEXO"
          label="CONCEPTOEXO"
          id="CONCEPTOEXO"
          ref="CONCEPTOEXO"
          v-model="model.CONCEPTOEXO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="FORMATOEXO"
          label="FORMATOEXO"
          id="FORMATOEXO"
          ref="FORMATOEXO"
          v-model="model.FORMATOEXO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="NODEDUCIBLE"
          label="NODEDUCIBLE"
          id="NODEDUCIBLE"
          ref="NODEDUCIBLE"
          v-model="model.NODEDUCIBLE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ASUMIDA_PRACTICADA"
          label="ASUMIDA_PRACTICADA"
          id="ASUMIDA_PRACTICADA"
          ref="ASUMIDA_PRACTICADA"
          v-model="model.ASUMIDA_PRACTICADA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CTACIERRECOSTOS"
          label="CTACIERRECOSTOS"
          id="CTACIERRECOSTOS"
          ref="CTACIERRECOSTOS"
          v-model="model.CTACIERRECOSTOS"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CTACREDITOCOSTOS"
          label="CTACREDITOCOSTOS"
          id="CTACREDITOCOSTOS"
          ref="CTACREDITOCOSTOS"
          v-model="model.CTACREDITOCOSTOS"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CORRIENTE"
          label="CORRIENTE"
          id="CORRIENTE"
          ref="CORRIENTE"
          v-model="model.CORRIENTE"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-btn color="success" @click="guardar">Guardar</v-btn>
        <v-btn @click="$emit('cancelar')">Cancelar</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["fila", "editar"],
  data: () => ({
    model: {
      COMPANIA: undefined,
      CUENTA: undefined,
      NOMCUENTA: undefined,
      TIPO: undefined,
      NEMONICO: undefined,
      CENTRO: undefined,
      PRODUCTO: undefined,
      REFERENCIA: undefined,
      TERCERO: undefined,
      RETENCION: undefined,
      CPTORETENCION: undefined,
      AJUSTE: undefined,
      CIERRE: undefined,
      CUENTAFISCAL: undefined,
      IMPUESTO: undefined,
      ESTADO: undefined,
      NIVEL: undefined,
      CUENTA_SUMA: undefined,
      CLASE: undefined,
      RUBRO: undefined,
      TIPOTESORERO: undefined,
      BANCO: undefined,
      SUCURSAL: undefined,
      CTA_BCO: undefined,
      CODCAJA: undefined,
      DETALLEXTERCERO: undefined,
      RESPONSABLE: undefined,
      CUENTA_HOMOLOGA: undefined,
      CUENTANIIF: undefined,
      CONCEPTOEXO: undefined,
      FORMATOEXO: undefined,
      NODEDUCIBLE: undefined,
      ASUMIDA_PRACTICADA: undefined,
      CTACIERRECOSTOS: undefined,
      CTACREDITOCOSTOS: undefined,
      CORRIENTE: undefined
    }
  }),
  mounted() {
    if (this.fila) {
      this.model = this.fila;
    }
  },
  methods: {
    guardar() {
      this.$emit("guardar", this.model);
    }
  }
};
</script>
    