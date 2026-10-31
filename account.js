function getCurrentUser(){
let phone=localStorage.getItem('agriverse_current');
if(!phone) return null;
let raw=localStorage.getItem('agriverse_user_'+phone);
return raw?JSON.parse(raw):null;
}
function getAccountKey(){
return localStorage.getItem('agriverse_key')||'';
}
function requireAuth(){
let u=getCurrentUser();
if(!u){location.href='auth.html';return null;}
return u;
}
function signOut(){
localStorage.removeItem('agriverse_current');
localStorage.removeItem('agriverse_key');
location.href='auth.html';
}
