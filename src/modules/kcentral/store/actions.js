import axios from "axios"
export default {
  read: ({ commit }, payload) => {
    return axios.post(`read`, payload)
      // .then(res => {
      //   console.log(res);
      // })
  },
}

// export function read(context, data) {
//   return Vue.prototype.$axios.post(`read`, data);
// }
