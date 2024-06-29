"use strict";

const getUserInfo = async () => {
    const response = await fetch('/api/for/user');

    if (!response.ok) {
        throw new Error('Network response wasn`t ok');
    }

    return await response.json();
}

const retry = async (asyncFunc, { retries = 3 } = {}) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await asyncFunc();
      } catch (error) {
        if (i === retries - 1) {
          throw error;
        }
      }
    }
};
  
const getError = async () => {
    try {
      const userInfo = await retry(getUserInfo, { retries: 3 });
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
};
  
getError();