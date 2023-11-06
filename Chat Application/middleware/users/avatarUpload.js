const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
  console.log("avatar upload called");
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/png", "image/jpg"],
    1000000,
    "Only .jpg, .png, jpeg format allowed"
  );

  console.log("Uploder function er porer code");
  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      console.log("upload any middleware a problem ase");
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      console.log("upload any middleware done");
      next();
    }
  });
}

module.exports = avatarUpload;
