function showForm(){
  document.getElementById('managerForm').style.display='block';
  window.scrollTo({top:document.getElementById('managerForm').offsetTop,behavior:'smooth'});
}
async function sendReview(e){
  e.preventDefault();
  const fio=document.getElementById('fio').value.trim();
  const date=document.getElementById('date').value;
  const phone=document.getElementById('phone').value.trim();
  const text=document.getElementById('text').value.trim();
  if(!fio||!date||!phone||!text){alert('Заполните все поля');return;}
  await fetch('/send-telegram',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({fio,date,phone,text})
  });
  alert('Спасибо за отзыв!');
  e.target.reset();
  document.getElementById('managerForm').style.display='none';
}
