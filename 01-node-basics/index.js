const { listContacts } = require("./contacts");

listContacts().then((data) => {
  console.log(data);
});
