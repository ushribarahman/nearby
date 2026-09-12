import api from "./api";
export default {
 list: (scope="public") => api(scope === "admin" ? "/admin/offers" : scope === "mine" ? "/offers/mine" : "/offers"),
 get: (id,mine=false) => api((mine ? "/offers/mine/" : "/offers/") + encodeURIComponent(id)),
 save: (data,id) => api(id ? "/offers/"+id : "/offers",{method:id ? "PUT" : "POST",body:JSON.stringify(data)}),
 remove: (id) => api("/offers/"+id,{method:"DELETE"}),
 moderate: (id,status) => api("/admin/offers/"+id+"/status",{method:"PATCH",body:JSON.stringify({status})}),
};
