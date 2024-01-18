const myLogger = (store) => (next) => (action) => {
  console.log(action);

  const result = next(action);

  console.log("\t", store.getState()); // '\t' 는 탭 문자 입니다.

  return result;
};

export default myLogger;
