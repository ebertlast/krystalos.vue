import { default as afi_components } from "../../../../kasis/components";
import { default as krycnf_components } from "../../../../krycnf/components";
import { default as components } from "../../../../../../src/common/components";
const FormTER = resolve => {
  require.ensure(
    ["./FormTER.vue"],
    () => {
      resolve(require("./FormTER.vue"));
    },
    "klog"
  );
};
export default {
  AfiElegir: afi_components.AFIRegistros,
  Direccionador: components.Direccionador,
  Medicos: krycnf_components.MEDRegistros,
  IPSs: krycnf_components.TERNavegar,
  FormTER: FormTER
  
}