print(
  "################################ INITIALIZING DB INFO ################################",
);
print(
  "################################ #################### ################################",
);

//db = db.getSiblingDB("instaCloneTest");
//db.createCollection("users");
db.users.insertOne({
  email: "test@gmail.com",
  password:
    "$argon2id$v=19$m=4096,t=3,p=1$RTMqhq724f7WNkM3wMtoxg$3j9ceDcd+9k2xAKh8B/iyUlk5KpE4Wak4PRLyMvnDyQ",
});

print(
  "################################ END INIT DB INFO ####################################",
);
print(
  "################################ ################ ####################################",
);
