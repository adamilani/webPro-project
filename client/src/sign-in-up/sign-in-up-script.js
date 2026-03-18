// ... (הלוגיקה של ה-EventListeners נשארת זהה)

async function singUp(event) {
    event.preventDefault();
    let username = event.target.userName.value;
    let email = event.target.userEmail.value;
    let password = event.target.userPassword.value;
    try {
        const response = await axios.post("http://localhost:4000/users", { username, email, password });
        if (response.data !== undefined) {
          console.log("Welcome to the squad! Fan ID created.");
        }
    } catch (error) {
        console.error("Kickoff failed: " + error);
    }
}

async function signIn(event) {
  event.preventDefault();
  let email = event.target.userEmail.value;
  let password = event.target.userPassword.value;
  try {
    const response = await axios.post("http://localhost:4000/users/sign-in", { email, password });
    if (response.data !== undefined) {
      console.log("Fan Authenticated. Entering Stadium...");
      window.location.href='../home-page/home-page.html'; // נתיב יחסי בטוח יותר
    }
  } catch (error) {
    console.error("Foul play! Sign in error: " + error);
  }
}