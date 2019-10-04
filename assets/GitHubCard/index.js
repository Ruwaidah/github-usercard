
const followersArray = [];
followersArray.push("ruwaidah");
followersArray.push("tetondan");
followersArray.push("dustinmyers");
followersArray.push("justsml");
followersArray.push("luishrd");
followersArray.push("bigknell");

 let cards = document.querySelector(".cards");
for (let i = 0; i < followersArray.length; i++){

axios.get("https://api.github.com/users/" + followersArray[i])

.then(response  => {

  console.log(response.data);
  if (response.data.login == "tetondan" ){
    console.log(i)
    let fol = response.data.followers_url;
    console.log(fol)

    axios.get(fol)
      .then(item => {
        let dataLength = item.data.length;
        for (let ind = 0; ind < dataLength; ind++){
        console.log(item.data[ind].login)
        axios.get("https://api.github.com/users/" + item.data[ind].login)
          .then(newtry => {
            cards.appendChild(profile(newtry.data));
          })
        }
      })
      }
  cards.appendChild(profile(response.data))
})
}

function para(){
  return document.createElement("p"); 
}

function profile(obj){
    const card = document.createElement("div");
    card.classList.add ("card");

    const image = document.createElement("img");
    card.appendChild(image);
    image.src = obj.avatar_url;

    const cardInfo = document.createElement("div");
    card.appendChild(cardInfo);
    cardInfo.classList.add("card-info");

    const nameH3 = document.createElement("h3");
    cardInfo.appendChild(nameH3);
    nameH3.classList.add("name");
    nameH3.textContent = obj.name;

    const para1 = para();
    para1.classList.add("username");
    cardInfo.appendChild(para1);
    para1.textContent = obj.login;

    const Location = para();
    cardInfo.appendChild(Location);
    Location.textContent = "Location: " + obj.location;

    const profile = para();
    cardInfo.appendChild(profile);
    profile.textContent = 'Profile: ';

    const anc = document.createElement("a");
    profile.appendChild(anc);
    anc.href = obj.html_url; 
    anc.textContent = "GitHub";
    anc.style.color = "#2cb6e8";
    anc.style.fontWeight = "bold"
    anc.style.textDecoration = "none"

    const Followers = para();
    cardInfo.appendChild(Followers);
    Followers.textContent = "Followers: " + obj.followers;

    const Following = para();
    cardInfo.appendChild(Following);
    Following.textContent = "Following: " + obj.following;

    const bio = para();
    cardInfo.appendChild(bio);
    bio.textContent = "Bio: " + obj.bio;
    console.log(card);
   return card;
}
