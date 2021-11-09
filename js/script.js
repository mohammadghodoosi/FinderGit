
class Github{
  constructor(){
   this.key='2cf3fc54c90cf6de17ad'
   this.secure='501280c3c884668d162565ea6eb22ddd11601232'
  }
  async call(user){
    const data=await fetch(`https://api.github.com/users/${user}?client_id=${this.key}&client_secret=${this.secure}`)
    const jdata=await data.json()
    return jdata
  }
 }
 class UI{
   show(user){
     result.innerHTML=`
     <div class="row">
     <div class="col-md-3">
       <img class="img-fluid mb-2" src="${user.avatar_url}">
       <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
     </div>
     <div class="col-md-9">
       <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
       <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
       <span class="badge badge-success">Followers: ${user.followers}</span>
       <span class="badge badge-info">Following: ${user.following}</span>
       <br><br>
       <ul class="list-group">
         <li class="list-group-item">Company: ${user.company}</li>
         <li class="list-group-item">Website/Blog: ${user.blog}</li>
         <li class="list-group-item">Location: ${user.location}</li>
         <li class="list-group-item">Member Since: ${user.created_at}</li>
       </ul>
     </div>
   </div>
   </div>
   <br/>
     `
   }
 }
 const search=document.getElementById('search')
 const result=document.getElementById('result')
 if(search.value==''){
   result.innerHTML='<h3 class="text-center">...</h3>'
 }
 search.addEventListener('keyup',()=>{
   if(search.value==''){
     result.innerHTML='<h3 class="text-center">***</h3>'
   }else{
     const github=new Github
     github.call(search.value).then(data=>{
       if(data.message=='Not Found'){
         result.innerHTML='<h3 class="text-center">profile does not exist...</h3>'
       }else{
         const ui=new UI
         ui.show(data)
       }
     })
   }
 })