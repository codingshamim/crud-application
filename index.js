// select require document
const form = document.getElementById("form");

// create new user 
form.addEventListener("submit", (e) => {
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  document.querySelector(".submit-btn").innerText = "Loading....";
  const user = {
    userId: uniqueId(),
    name: username,
    email,
    password,
  };
  // send user to backend
  postUser(user, "http://localhost:5000/users")
    .then((res) => {
      setTimeout(() => {
        document.querySelector(".submit-btn").innerText = "Add User";
        document.querySelector(".modalbox").style.display = "block";
        document.querySelector(".modalText").innerText =
          "User Created Successfully";
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
    });
  e.preventDefault();
});

// generate unique id for each user
const uniqueId = () => {
  let id = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz";

  for (let i = 1; i <= 10; i++) {
    let char = Math.floor(Math.random() * str.length + 1);

    id += str.charAt(char);
  }

  return id;
};

// post user function 
function postUser(user, api) {
  const postUserData = fetch(api, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const promise = new Promise((resolve, reject) => {
    if (postUserData) {
      resolve();
    } else {
      reject();
    }
  });

  return promise;
}

//get user 
(function getUser() {
  const appendEl = document.querySelector(".append");
  let id = 0;
  fetch("http://localhost:5000/users")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        id++;
        const tr = document.createElement("tr");
        tr.classList.add("bg-base");
        appendEl.appendChild(tr);
        tr.innerHTML = `   
        <th>${id}</th>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>
          <button class="btn-success btn-sm btn edituser" id=${item.userId}>Edit</button>
          <button class="btn btn-error btn-sm deleteUser" id=${item.userId}>Delete</button>
        </td>
     `;
      });
      const editUserBtns = document.querySelectorAll(".edituser");
      for (let i of editUserBtns) {
        const button = i;
        button.onclick = () => {
          const deleteId = button.getAttribute("id");
          document.getElementById("my_modal_2").showModal();

          fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((data) => {
              const result = data.find((findId) => {
                return findId.userId == deleteId;
              });
              document.getElementById("findId").value = result.userId;
              document.getElementById("username").value = result.name;
              document.getElementById("email").value = result.email;
              document.getElementById("password").value = result.password;
            });
        };
      }

      const deleteBtns = document.querySelectorAll(".deleteUser");
      for (let i of deleteBtns) {
        const deletebtn = i;
        deletebtn.onclick = () => {
          const deleteId = i.getAttribute("id");
          const deletedItem = {
            deleteId,
          };
          postUser(deletedItem, "http://localhost:5000/users/delete");
        };
      }
    });
  // edit the user
})();

// update user
const updateForm = document.querySelector("#form2");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.updatename.value;
  const email = e.target.updateemail.value;
  const password = e.target.updatepassword.value;
  const findId = e.target.findId.value;
  document.querySelector(".submit-btn-2").innerText = "Loading...";
  const updateUser = {
    userId: uniqueId(),
    name,
    email,
    password,
    findId,
  };
  postUser(updateUser, "http://localhost:5000/users/update")
    .then((res) => {
      setTimeout(() => {
        document.querySelector(".submit-btn-2").innerText = "Add User";
        document.querySelector(".modalbox2").style.display = "block";
        document.querySelector(".modalText2").innerText =
          "User Updated Successfully";
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
    });
});
