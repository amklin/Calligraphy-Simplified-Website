// import statements
import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";

import { getDatabase, ref, set, get, child, update, remove } 
    from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxLMpt20K_0mXfdmltggc24JvTVw9wt68",
    authDomain: "chinese-10262.firebaseapp.com",
    projectId: "chinese-10262",
    storageBucket: "chinese-10262.appspot.com",
    messagingSenderId: "843927861399",
    appId: "1:843927861399:web:87ef39c7320346c25ed1d2"
};
    

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

var canvasImg, userName, password, imageDesc;

// Prepare data
function dataPrep(mode){
// mode is to distinguish between select/delete input, insert input, and update input
// because element IDs are used (and the must be unique)
// For example, "username-text-insert" corresponds to the username text input for the
// insert functionality
    userName = document.getElementById('username-text-'+mode).value;
    password = document.getElementById('password-text-'+mode).value;
    if (mode != 'select-delete'){       //select and delete don't allow for canvas or image description input
        imageDesc = document.getElementById('image-description-'+mode).value;
        canvasImg = canvas.toDataURL();     // Save canvas content as Data URL
    }
}


// Insert data
function insertData(){
    if(String(userName).length != 0){   
    // checks to make sure that the username value is not empty (if it is, then entire database breaks)
        set(ref(db, 'userName/'+userName), {
            userName: userName,
            password: password,
            canvasImg: canvasImg,
            imgDesc: imageDesc
        })
        .then(()=>{
            alert('data stored correctly');
        })

        .catch((error)=>{
            alert('unsuccesful, error'+error);
        });
    }
    else{
        alert("nope go away; u need a username"); 
    }
}

// Select data
function selectData(){
    document.getElementById('image-results').innerHTML = "";        // clears previous select functions
    document.getElementById('image-description-results').innerHTML = "";

    const dbref = ref(db);
    
    get(child(dbref, 'userName/'+userName)).then((snapshot)=>{
        if(snapshot.exists()){
            var storedPassword = snapshot.val().password;
            if (storedPassword == password){        // checks that password is the same as previously inputted
                var img = new Image();
                img.src = snapshot.val().canvasImg;         // sets image source to be the data URL
                if (screen.width < 992){
                    img.width = screen.width;           // for screens too small to show side navbar, image width is width of screen
                } else {
                    img.width = screen.width - 350;      // image width is the width of the screen - width of side nav bar
                }
                document.getElementById('image-results').appendChild(img);
                document.getElementById('image-description-results').textContent = snapshot.val().imgDesc;
            } else {
                alert('Password is incorrect');
            }
        } else {
            alert('No data found');
        }
    })
    .catch((error)=>{
        alert('unsuccessful, error'+error); 
    })
}

//Update data
function updateData(){
    const dbref = ref(db);
    
    get(child(dbref, 'userName/'+userName)).then((snapshot)=>{
        if(snapshot.exists()){
            var storedPassword = snapshot.val().password;
            if (storedPassword == password){        // checks that password is the same as previously inputted
                update(ref(db, 'userName/'+userName), {     //updates canvas img and img desc only (not username/password)
                    canvasImg: canvasImg,
                    imgDesc: imageDesc
                })
                .then(()=>{
                    alert('data updated successfully');
                })
                .catch((error)=>{
                    alert('unsuccesful, error'+error);
                });
            } else {
                alert('Password is incorrect');
            }
        } else {
            alert('No data found');
        }
    })
    .catch((error)=>{
        alert('unsuccessful, error'+error); 
    })
}

// Delete Data
function deleteData(){
    document.getElementById('image-results').innerHTML = "";        // clears previous select functions
    document.getElementById('image-description-results').innerHTML = "";

    const dbref = ref(db);
    
    get(child(dbref, 'userName/'+userName)).then((snapshot)=>{
        if(snapshot.exists()){
            var storedPassword = snapshot.val().password;
            if (storedPassword == password){        // checks that password is the same as previously inputted
                remove(ref(db, 'userName/'+userName))
                    .then(()=>{
                        alert('data removed successfully');
                    })
                    .catch((error)=>{
                        alert('unsuccesful, error'+error);
                });
            } else {
                alert('Password is incorrect');
            }
        } else {
            alert('No data found');
        }
    })
    .catch((error)=>{
        alert('unsuccessful, error'+error); 
    })
}

document.getElementById('insert-btn').onclick = function(){
    dataPrep('insert');
    insertData();
}

document.getElementById('select-btn').onclick = function(){
    dataPrep('select-delete');
    selectData();
}

document.getElementById('update-btn').onclick = function(){
    dataPrep('update');
    updateData();
}

document.getElementById('delete-btn').onclick = function(){
    dataPrep('select-delete');
    deleteData();
}