// Agriverse Account Key Manager — General Service — No import
// Works for crops, livestock, fishery, poultry — one key per farmer

function getCurrentUser(){
  let phone=localStorage.getItem('agriverse_current');
  if(!phone) return null;
  let raw=localStorage.getItem('agriverse_user_'+phone);
  return raw?JSON.parse(raw):null;
}
function requireAuth(){
  let u=getCurrentUser();
  if(!u){
    location.href='auth.html';
    return null;
  }
  return u;
}
function getAccountKey(){return localStorage.getItem('agriverse_key')||'AG-NO-KEY';}
function signOut(){
  localStorage.removeItem('agriverse_current');
  localStorage.removeItem('agriverse_key');
  location.href='auth.html';
}
// For backend.py later — same key format go to Supabase/Firebase
// Example .env: AGRIVERSE_ACCOUNT_KEY=AG-xxxx — no need change code
console.log("Agriverse Account Key:",getAccountKey());
