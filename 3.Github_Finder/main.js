const input = document.querySelector("#search_input");
const profile_wrap = document.querySelector(".profile_wrap");
const title_sub = document.querySelector(".title_sub");
const repos_wrap = document.querySelector(".repos_wrap");
const BaseUrl = "https://api.github.com/users/";
const username = "yj120";
const image = document.querySelector(".profile_a");
const boxes = document.querySelector(".boxes");
const info = document.querySelector(".infos");

// 나의 토큰
// 깃올릴때 토큰이랑 아래 지우고 
/*
개발할때 사용,토큰인증용 API
const accessToken = "github 에서 나의 토큰넣기";


const axios = axios.create({
  baseURL: "https://api.github.com/users/",
  headers:{
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json', // Adjust the content type as needed
  }
})
*/


//유저정보 가져와서 매핑
const init_load = ()=>{
  User_removeContent();
  axios.get(`https://api.github.com/users/${username}`).then((response) => {
      const user = response.data;
      const img = new Image();
      img.src = user.avatar_url;
      img.style = "width:220px;"

      const view_btn = document.createElement("span");

      view_btn.textContent = "View Profile";
      view_btn.innerHTML = `<a href="${user.html_url}" id="link_git">View Profile</a>`;
      view_btn.classList.add("view_btn");




      image.appendChild(img);
      image.appendChild(view_btn);

      const public_repos = document.createElement("span");
      const public_Gists = document.createElement("span");
      const Followers = document.createElement("span");
      const Following = document.createElement("span");


      public_repos.textContent = "Public Repos : " + user.public_repos;
      public_Gists.textContent = "Public Gists : " + user.public_gists;
      Followers.textContent = "Followers : " + user.followers;
      Following.textContent = "Followings : " + user.following;

      public_repos.setAttribute("id", "info_box_a");
      public_Gists.setAttribute("id", "info_box_b");
      Followers.setAttribute("id", "info_box_c");
      Following.setAttribute("id", "info_box_d");

      boxes.appendChild(public_repos);
      boxes.appendChild(public_Gists);
      boxes.appendChild(Followers);
      boxes.appendChild(Following);


      //git info
      const Company = document.createElement("div");
      const Website = document.createElement("div");
      const Location = document.createElement("div");
      const Member_since = document.createElement("div");


      Company.textContent = "Company : " + user.company;
      Website.textContent = "Website : " + user.blog;
      Location.textContent = "Location : " + user.location;
      Member_since.textContent = "Member_since : " + user.created_at;

      Company.setAttribute("id", "info");
      Website.setAttribute("id", "info");
      Location.setAttribute("id", "info");
      Member_since.setAttribute("id", "info");


      info.appendChild(Company);
      info.appendChild(Website);
      info.appendChild(Location);
      info.appendChild(Member_since);


      //Repos
      const sub_title = document.createElement("h1");
      sub_title.textContent = "Latest Repos";
      title_sub.appendChild(sub_title);
    })
  } 

const reload = (data)=>{
  User_removeContent();
  if(data){
    axios.get(`https://api.github.com/users/${data}`).then((response) => {
      const user = response.data;
      const img = new Image();
      img.src = user.avatar_url;

      img.style = "width:220px;"
      const view_btn = document.createElement("span");

      view_btn.textContent = "View Profile";
      view_btn.innerHTML = `<a href="${user.html_url}" id="link_git">View Profile</a>`;
      view_btn.classList.add("view_btn");




      image.appendChild(img);
      image.appendChild(view_btn);

      const public_repos = document.createElement("span");
      const public_Gists = document.createElement("span");
      const Followers = document.createElement("span");
      const Following = document.createElement("span");


      public_repos.textContent = "Public Repos : " + user.public_repos;
      public_Gists.textContent = "Public Gists : " + user.public_gists;
      Followers.textContent = "Followers : " + user.followers;
      Following.textContent = "Followings : " + user.following;

      public_repos.setAttribute("id", "info_box_a");
      public_Gists.setAttribute("id", "info_box_b");
      Followers.setAttribute("id", "info_box_c");
      Following.setAttribute("id", "info_box_d");

      boxes.appendChild(public_repos);
      boxes.appendChild(public_Gists);
      boxes.appendChild(Followers);
      boxes.appendChild(Following);


      //git info
      const Company = document.createElement("div");
      const Website = document.createElement("div");
      const Location = document.createElement("div");
      const Member_since = document.createElement("div");


      Company.textContent = "Company : " + user.company;
      Website.textContent = "Website : " + user.website;
      Location.textContent = "Location : " + user.location;
      Member_since.textContent = "Member_since : " + user.created_at;

      Company.setAttribute("id", "info");
      Website.setAttribute("id", "info");
      Location.setAttribute("id", "info");
      Member_since.setAttribute("id", "info");


      info.appendChild(Company);
      info.appendChild(Website);
      info.appendChild(Location);
      info.appendChild(Member_since);


      //Repos
      const sub_title = document.createElement("h1");
      sub_title.textContent = "Latest Repos";
      title_sub.appendChild(sub_title);
    })
  }

}


// 유저 검색
const searchUser = async (user)=>{
  try{
    const res = await axios.get(BaseUrl+user);
    return res.data;
  }catch(err){
    return null;
  }
}


// input에 입력되면 이벤트 호출
input.addEventListener('keyup', async function(event){
  if(event.keyCode===13){
    const user = event.target.value;
    const data = await searchUser(user);
    console.log('Text entered:', user);
    if (!user) {
      alert("다시 입력하세요");
      repos_wrap.innerHTML = "";// 레포부분다지우기
    }
    // 데이터 있으면 
    // 가져온 데이터로 매핑 랜더링
    load_repos(user);// 레포부분
    reload(user);// 사용자부분


  }
})

// 레포 정보가져와서 매핑
const load_repos = async (data)=>{
  Repo_removeContent();
  if(data==null){
    console.log("null 입니다.");
  
    //null 이면 defualt 값(me)로
    axios.get(`https://api.github.com/users/${username}/repos`).then((response) => {
      const repos = response.data;

      for (const iter in repos) {
        const line = document.createElement("div");

        const box = document.createElement("div");
        const stars = document.createElement("span");
        const watchers = document.createElement("span");
        const forks = document.createElement("span");

        line.innerHTML = `<a href="${repos[iter].html_url}" id="link_git_b">${repos[iter].name}</a>`;

        //line.textContent = repos[iter].name;
        line.classList.add("infoline");

        box.classList.add(".repo_box");

        stars.textContent = "Stars : " + repos[iter].stargazers_count;
        stars.setAttribute("id","box_a");

        watchers.textContent = "Watchers : " + repos[iter].watchers_count;
        watchers.setAttribute("id","box_b")

        forks.textContent = "Forks : " + repos[iter].fork;
        forks.setAttribute("id", "box_c")

        box.appendChild(stars);
        //box.append(watchers);
        //box.append(forks);

        line.appendChild(forks);
        line.appendChild(watchers);
        line.appendChild(stars);
        
        repos_wrap.appendChild(line);
        
        console.log(repos[iter].name);
      }

    })
  }else{
    axios.get(`https://api.github.com/users/${data}/repos`).then((response) => {
      const repos = response.data;

      // 삭제해주고
      Repo_removeContent();


      // 다시 넣어줌
      for (const iter in repos) {
        const line = document.createElement("div");

        const box = document.createElement("div");
        const stars = document.createElement("span");
        const watchers = document.createElement("span");
        const forks = document.createElement("span");

        line.innerHTML = `<a href="${repos[iter].html_url}" id="link_git_b">${repos[iter].name}</a>`;
        line.classList.add("infoline");

        box.classList.add(".repo_box");

        stars.textContent = "Stars : " + repos[iter].stargazers_count;
        stars.setAttribute("id", "box_a");

        watchers.textContent = "Watchers : " + repos[iter].watchers_count;
        watchers.setAttribute("id", "box_b")

        forks.textContent = "Forks : " + repos[iter].fork;
        forks.setAttribute("id", "box_c")

        box.appendChild(stars);
        //box.append(watchers);
        //box.append(forks);

        line.appendChild(forks);
        line.appendChild(watchers);
        line.appendChild(stars);

        repos_wrap.appendChild(line);

        console.log(repos[iter].name);
      }

    })

  }

}

  // 레포 정보 삭제
const Repo_removeContent = ()=>{
  //레포삭제
  repos_wrap.textContent = " ";
  
}

const User_removeContent = ()=>{
  //사용자 정보 삭제
  
  image.textContent=" ";
  boxes.textContent=" ";
  info.textContent=" ";
  title_sub.textContent=" ";


}



init_load();
load_repos();

