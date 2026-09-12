import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import service from "../../services/offerService";
import OfferContent from "./OfferContent";
export default function OffersDetails(){
 const {id}=useParams();const [state,setState]=useState({id:null,offer:null,error:''});
 useEffect(()=>{let active=true;const load=()=>service.get(id).then(({offer})=>{if(active)setState({id,offer,error:''});}).catch(e=>{if(active)setState({id,offer:null,error:e.message});});load();const timer=setInterval(load,30000);window.addEventListener('focus',load);return()=>{active=false;clearInterval(timer);window.removeEventListener('focus',load);};},[id]);
 return <main className="mx-auto max-w-7xl px-6 py-4 pb-8">{state.id!==id?<p>Loading offer...</p>:state.error?<p role="alert">{state.error}</p>:state.offer&&<OfferContent offer={state.offer}/>}</main>;
}
