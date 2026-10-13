/* ===== YAHAN SE SAB DETAILS BADLEIN ===== */
const CONFIG={
  name:"Chirayu Hospital, Jaipur",
  address:"Kalwar Rd, Hathoj, Jaipur, Rajasthan 302044",
  phoneShow:"+91 96944 89234",
  phone:"+919694489234",
  whatsapp:"919694489234",     // booking ki details is number par WhatsApp se jayengi. Khali karein to Call button aayega
  doctors:[{n:"Dr. Rajesh Kumar Kumawat (Urologist)"}],
  room:"OPD Counter",          // apna room/counter likhein
  fee:"400",                   // lagbhag fees
  startHour:10,endHour:14,slotMinutes:30, // Somvaar-Shanivaar 10 AM - 2 PM
  closedWeekdays:[0]           // 0 = Ravivaar band
};
/* ======================================= */
const $=id=>document.getElementById(id);
const hh=m=>{const h=Math.floor(m/60),ap=h>=12?"PM":"AM";return(h%12||12)+":"+String(m%60).padStart(2,"0")+" "+ap};
const tm=hh(CONFIG.startHour*60)+" – "+hh(CONFIG.endHour*60);
$("hName").textContent=CONFIG.name;$("foot").textContent="© "+CONFIG.name;
$("fTime").textContent="Somvaar se Shanivaar, "+tm+" (Ravivaar band)";
$("fFee").textContent="Consultation fees: lagbhag ₹"+CONFIG.fee;
$("fAddr").textContent=CONFIG.address;$("addr").textContent=CONFIG.address;
$("iTime").textContent=tm;$("iFee").textContent="~₹"+CONFIG.fee;
$("barTel").textContent=CONFIG.phoneShow;$("barTel").href="tel:"+CONFIG.phone;
$("tel2").textContent=CONFIG.phoneShow;$("tel2").href="tel:"+CONFIG.phone;
$("tel1").textContent="Call: "+CONFIG.phoneShow;$("tel1").href="tel:"+CONFIG.phone;
$("map").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(CONFIG.name+" "+CONFIG.address);
$("openNote").textContent="Appointment ka samay: Somvaar se Shanivaar, "+tm+". Ravivaar ko OPD band rehta hai.";
CONFIG.doctors.forEach(d=>{const o=document.createElement("option");o.textContent=d.n;$("doc").appendChild(o)});
for(let m=CONFIG.startHour*60;m+CONFIG.slotMinutes<=CONFIG.endHour*60;m+=CONFIG.slotMinutes){
  const o=document.createElement("option");o.textContent=hh(m)+" – "+hh(m+CONFIG.slotMinutes);$("slot").appendChild(o)}
const iso=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
$("date").min=iso(new Date());

$("f").onsubmit=e=>{
  e.preventDefault();const err=$("err");err.textContent="";const v=i=>$(i).value.trim();
  if(v("name").length<2)return err.textContent="Patient ka naam likhein.";
  if(!/^\d{10}$/.test(v("phone")))return err.textContent="10 digit ka mobile number likhein.";
  if(!v("date"))return err.textContent="Date chunein.";
  const dt=new Date(v("date")+"T00:00:00");
  if(CONFIG.closedWeekdays.includes(dt.getDay()))return err.textContent="Ravivaar ko OPD band rehta hai, Somvaar se Shanivaar ke beech ki date chunein.";
  const pretty=dt.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const doc=v("doc"),slot=v("slot");
  [["d1",v("name")],["d2",doc],["d3",pretty],["d4",slot],["d5",CONFIG.room],["d6","Lagbhag ₹"+CONFIG.fee],["d7",CONFIG.address]].forEach(([i,t])=>$(i).textContent=t);
  const msg="*Nayi Appointment – "+CONFIG.name+"*\nPatient: "+v("name")+"\nMobile: "+v("phone")+"\nUmar: "+(v("age")||"-")+"\nDoctor: "+doc+"\nDate: "+pretty+"\nTime: "+slot+"\nTakleef: "+(v("prob")||"-");
  const a=$("act");
  if(CONFIG.whatsapp){a.textContent="Hospital ko WhatsApp par bhejein";a.href="https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(msg)}
  else{a.textContent="Hospital ko call karein";a.href="tel:"+CONFIG.phone;a.style.background="var(--blue)";a.style.color="#fff"}
  $("f").style.display="none";$("done").style.display="block";$("done").scrollIntoView({behavior:"smooth",block:"center"});
  if(CONFIG.whatsapp)window.open(a.href,"_blank");
};
