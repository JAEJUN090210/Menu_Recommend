const router = (s) => `./src/data/${s}.json`;

const getData = async (fileName = "") => {
  try {
    const response = await fetch(router(fileName));
    if (!response.ok) {
      throw new Error("파일 로드 불가");
    }
    const data = await response.json();
    console.log("파일 데이터:", data);
    return data;
  } catch (error) {
    console.error("데이터 로드 오류:", error);
    return [];
  }
};

function reset() {
  // 가격 입력 초기화
  document.getElementById("price_max").value = "";

  // 라디오 버튼 초기화
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radio) => {
    radio.checked = false;
  });

  // 화면에 출력된 값도 초기화
  const spanElement = document.querySelector(".Main_result_value_select");
  spanElement.textContent = "음식 추천"; // 초기값으로 리셋

  // 선택된 필터 값도 리셋
  selectedType = "";
  selectedCategory = "";

  console.log("초기화 완료: 모든 필터 값 초기화됨");
}

let selectedType = "";
let selectedCategory = "";

async function option() {
  const checkedType = document.getElementsByName("type");
  selectedType = "";
  checkedType.forEach((node) => {
    if (node.checked) {
      selectedType = node.value;
    }
  });
  console.log("선택된 종류:", selectedType);

  const checkedCategory = document.getElementsByName("sep");
  selectedCategory = "";
  checkedCategory.forEach((node) => {
    if (node.checked) {
      selectedCategory = node.value;
    }
  });
  console.log("선택된 구분:", selectedCategory);

  if (selectedCategory !== "") {
    const categoryMap = {
      1: "국류",
      2: "밥류",
      3: "면류",
      4: "튀김",
      5: "구이",
    };
    const selectedCategoryName = categoryMap[selectedCategory];
    console.log(
      `선택된 구분 값: ${selectedCategory} -> ${selectedCategoryName}`
    );
  }

  alert("설정이 완료되었습니다.");
}

async function randomStart() {
  if (selectedType === "") {
    console.log("종류 미선택 됨");
    alert("종류를 선택하세요");
    return;
  }

  console.log("선택된 종류로 시작:", selectedType);
  let data = await getData(selectedType);

  if (!data || data.length === 0) {
    console.error("데이터가 없습니다.");
    return;
  }

  console.log("불러온 데이터:", data);

  if (selectedCategory !== "") {
    const categoryMap = {
      1: "국류",
      2: "밥류",
      3: "면류",
      4: "튀김",
      5: "구이",
    };

    const selectedCategoryName = categoryMap[selectedCategory];
    console.log(`선택된 카테고리 이름: ${selectedCategoryName}`);

    data = data.filter((item) => item.category === selectedCategoryName);
    console.log("카테고리 필터링 후 데이터:", data);
  }

  if (data.length === 0) {
    console.log("카테고리 일치 값 없음음");
    alert("선택한 카테고리에 맞는 메뉴가 없습니다.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * data.length);
  const randomItem = data[randomIndex];
  console.log("추천된 메뉴:", randomItem);

  setTimeout(() => {
    const spanElement = document.querySelector(".Main_result_value_select");
    spanElement.textContent = randomItem.name;
    console.log("화면에 출력된 메뉴:", randomItem.name);
  }, 500);
}

window.onload = () => {
  const typeAllRadio = document.getElementById("type_kr");
  const sepAllRadio = document.getElementById("sep_soup");

  typeAllRadio.checked = false;
  sepAllRadio.checked = false;

  console.log("모든 설정 초기화 완료");
};
