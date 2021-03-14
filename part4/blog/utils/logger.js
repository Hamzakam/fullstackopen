//logs info
const info = (...params) => {
    console.log(...params);
};

//logs errors
const error = (...params) => {
    console.error(...params);
};

module.exports = { info, error };
