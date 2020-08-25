const path = require("path");
const fs = require("fs");
// const fsPromises = fs.promises;
const faker = require("faker");
const tmp = require("tmp-promise");
const rp = require("request-promise");

module.exports.getPathNewAvatar = () =>
  new Promise(async (resolve, reject) => {
    const avatarURI = faker.image.avatar();
    const fileAvatar = rp(avatarURI);
    const ext = path.extname(avatarURI);

    const createTmp = await tmp.file({
      postfix: ext,
      tmpdir: path.resolve("./tmp"),
    });

    const fileAvatarName = path.basename(createTmp.path);

    fileAvatar
      .pipe(fs.createWriteStream(createTmp.path))
      .on("close", async () => {
        const dest = fs
          .createWriteStream(path.resolve(`./public/images/${fileAvatarName}`))
          .on("open", () => {
            fs.createReadStream(createTmp.path).pipe(dest);
          })
          .on("close", () => {
            createTmp.cleanup();
            resolve(fileAvatarName);
          });

        // const filePublic = await fsPromises.readFile(createTmp.path);
        // console.log(filePublic);
        // await fsPromises.writeFile(
        //   path.resolve(`./public/images/${fileAvatarName}`),
        //   filePublic
        // );
      });
  });
