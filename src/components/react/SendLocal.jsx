export function SendLocal() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  let folderName = "";
  let filrName = "";
  let visitedKey = "";

  if (parts.length >= 3 && parts[parts.length - 1] === "") {
    folderName = parts[parts.length - 3];
    filrName = parts[parts.length - 2];
  } else if (parts.length >= 2) {
    folderName = parts[parts.length - 2];
    filrName = parts[parts.length - 1];
  }
  visitedKey = `${folderName}/${filrName}`;
  const achive = localStorage.getItem(folderName);
  let achiveNum = Number(achive);

  if (Number.isNaN(achiveNum)) {
    achiveNum = 0;
  } else {
    achiveNum += 1;
  }

  // 画面の最下部にスクロールしたらローカルストレージに保存
  const allHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
  const mostBottom = allHeight - window.innerHeight;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const key = localStorage.getItem(visitedKey);
    if (scrollTop >= mostBottom && key === null) {
      localStorage.setItem(folderName, achiveNum.toString());
      localStorage.setItem(visitedKey, "visited");
    }
  });
}

export default SendLocal;
