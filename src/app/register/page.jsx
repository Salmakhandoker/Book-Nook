const res = await fetch("http://localhost:5000/api/auth/signup", {
  method: "POST",

  headers: {
    "Content-Type": "application/json",
  },

  credentials: "include",

  body: JSON.stringify({
    name,
    email,
    password,
    photo: image,
  }),
});

const data = await res.json();

if (!data.success) {
  return toast.error(data.message);
}

toast.success("Registration successful");

router.push("/");