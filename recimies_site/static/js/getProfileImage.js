
///////////////////////// Selecting Elements /////////////////////////

const profileImg = document.querySelector('.nav-bar__sub-menu-link-icon__profile')

///////////////////////// Model /////////////////////////
const getProfile = async function () {
  try {
    const res = await fetch('/user_endpoint', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};


///////////////////////// Controller /////////////////////////

const processProfileData = async function () {
  try {
    const data = await getProfile();
    const img_path = data.user_img_path
    console.log(img_path);
    renderProfileImage(img_path)
  } catch (err) {
    console.error(err);
  }
};

///////////////////////// View /////////////////////////

const renderProfileImage = function (img_path){
  profileImg.src = `/${img_path}`
}

///////////////// init ////////////////////////
processProfileData();


