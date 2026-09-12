import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import service from "../services/offerService";
export default function useOffers(scope="public") {
 const {user}=useAuth();
 const owner=user?.id || user?._id || user?.email || "guest";
 const key=scope+owner;
 const [state,setState]=useState({key:null,offers:[],loading:true,error:""});
 useEffect(()=>{
  let active=true, pending=false;
  const refresh=async()=>{if(pending)return;pending=true;try{const {offers}=await service.list(scope);if(active)setState({key,offers,loading:false,error:""});}catch(e){if(active)setState({key,offers:[],loading:false,error:e.message});}finally{pending=false;}};
  refresh();const timer=setInterval(refresh,30000);window.addEventListener("focus",refresh);window.addEventListener("offers-updated",refresh);
  return()=>{active=false;clearInterval(timer);window.removeEventListener("focus",refresh);window.removeEventListener("offers-updated",refresh);};
 },[scope,key]);
 return state.key===key ? state : {offers:[],loading:true,error:""};
}
