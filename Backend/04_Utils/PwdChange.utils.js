import bcrypt from "bcrypt";

const hashingPwd = (pwd) => bcrypt.hash(pwd, 12);

const matchingPwd = (pwd, hashedPwd) => bcrypt.compare(pwd, hashedPwd);

export {hashingPwd, matchingPwd};