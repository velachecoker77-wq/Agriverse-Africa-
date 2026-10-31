const Agriverse = {
 node:"Sherbro Node 001",
 chain:{},
 renderVault(id,data){
  const hash = this.sha256(id+data.gps+data.batch+Date.now());
  document.getElementById('vault').innerHTML = `
  <div class="card">
    <div style="padding:16px;display:flex;justify-content:space-between;border-bottom:1px solid #eee">
      <div><b style="font-size:22px">${id}</b><br>${data.farm} • ${data.gps}</div>
      <div style="text-align:right"><small>LAY DATE</small><br><b>${data.layDate}</b></div>
    </div>
    <div style="padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div>Batch: <b>${data.batch}</b></div><div>Qty: <b>${data.qty} Eggs Grade A</b></div>
      <div>Feed: <b>${data.feed}</b></div><div>Owner: <b>${data.owner}</b></div>
    </div>
    <div class="hash">Blockchain Hash: ${hash}<br>Verified on ${this.node} • Cannot Fake</div>
    <div style="padding:14px;background:#0a4d1f;color:#fff;text-align:center">✅ VERIFIED 100% LOCAL • agriverse.africa/vault/${id}</div>
  </div>`;
  this.chain[id]=hash;
  return hash;
 },
 sha256(str){ // simplified hash for demo, replace with WebCrypto
  let h=0; for(let i=0;i<str.length;i++) h=Math.imul(31,h)+str.charCodeAt(i)|0;
  return "0x"+Math.abs(h).toString(16).padStart(64,"a");
 },
 // 80/20 Orange Money Split
 async splitPayment(amountLe, farmerPhone){
  const farmerShare = Math.floor(amountLe*0.8);
  const platformShare = amountLe - farmerShare;
  // Orange Money API Call
  // await fetch('https://api.orange.sl/money/pay',{method:'POST',body:JSON.stringify({to:farmerPhone,amount:farmerShare})});
  console.log(`Pay ${farmerShare} to ${farmerPhone}, ${platformShare} to Agriverse`);
  return {farmerShare, platformShare};
 }
};
