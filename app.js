// dark mode
const bodyElement = document.body;

const darkButtons = document.querySelectorAll(".circle1");
const lightButtons = document.querySelectorAll(".circle2");

darkButtons.forEach((button) => {
  button.addEventListener("click", () => {
    bodyElement.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  });
});

lightButtons.forEach((button) => {
  button.addEventListener("click", () => {
    bodyElement.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  });
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  bodyElement.classList.add("dark-mode");
}

document.addEventListener("DOMContentLoaded", () => {
  // 공통
  const STORAGE_KEY = "flowdash-tasks-v1";
  const USER_NAME_KEY = "flowdash-user-name";

  const TITLE_MAX_LENGTH = 40;
  const MEMO_MAX_LENGTH = 100;

  // 사용자 이름 설정
  const nameIntro = document.querySelector("#nameIntro");

  const nameForm = document.querySelector("#nameForm");

  const nameInput = document.querySelector("#nameInput");

  const nameConfirmButton = document.querySelector("#nameConfirmButton");

  const nameIntroError = document.querySelector("#nameIntroError");

  /* 위쪽 작은 영어 인사말 */
  const timeGreeting = document.querySelector("#timeGreeting");

  /* 큰 한국어 인사말 */
  const mainTimeGreeting = document.querySelector("#mainTimeGreeting");

  const displayUserName = document.querySelector("#displayUserName");
  // 모바일 메뉴
  const menuButton = document.querySelector("#menuButton");

  const mobileMenu = document.querySelector("#mobileMenu");

  const mobileMenuOverlay = document.querySelector("#mobileMenuOverlay");

  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");

  const DEFAULT_FILTERS = Object.freeze({
    category: "all",
    sort: "created",
    direction: "asc",
    priority: "all",
    status: "all",
  });

  //여기서부터 입니다 다미쌤

  document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-item");
    const contentArea = document.querySelector(".kanban-content");

    // 1. 현재 선택된 탭 상태 ('todo', 'progress', 'done')
    let currentTab = "todo";

    // 2. 탭 메뉴 클릭 이벤트 등록
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // 기존 active 제거 후 클릭한 탭 활성화
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // 탭 이름 매핑
        const tabName = tab.textContent.trim();
        if (tabName === "할 일") {
          currentTab = "todo";
        } else if (tabName === "진행 중") {
          currentTab = "progress";
        } else if (tabName === "완료") {
          currentTab = "done";
        }

        // 화면 카드 필터링 갱신
        filterCards();
      });
    });

    // 3. 카드 상태 변경 및 삭제 연동 (이벤트 위임)
    contentArea.addEventListener("change", (e) => {
      const target = e.target;
      const card = target.closest(".task-card");
      if (!card) return;

      // A. 셀렉트 박스 값이 바뀌었을 때
      if (target.classList.contains("status-select")) {
        const selectValue = target.value;
        const checkbox = card.querySelector(".card-checkbox");

        if (selectValue === "done") {
          if (checkbox) checkbox.checked = true;
        } else {
          if (checkbox) checkbox.checked = false;
        }

        filterCards(); // 카드 소속이 바뀌었으니 탭 화면에서 필터링 다시 계산
      }

      // B. 체크박스 클릭했을 때
      if (target.classList.contains("card-checkbox")) {
        const select = card.querySelector(".status-select");
        if (target.checked) {
          if (select) select.value = "done";
        } else {
          if (select) select.value = "todo";
        }

        filterCards();
      }
    });

    // C. 삭제(X) 버튼 클릭했을 때
    contentArea.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const card = e.target.closest(".task-card");
        if (card && confirm("이 일정을 삭제하시겠습니까?")) {
          card.remove();
        }
      }
    });

    // 4. 현재 탭 상태에 맞는 카드만 보여주는 필터링 함수
    function filterCards() {
      const cards = document.querySelectorAll(".task-card");

      cards.forEach((card) => {
        const select = card.querySelector(".status-select");
        if (select) {
          // 카드의 현재 선택값과 클릭한 상단 탭 값이 다르면 숨김(.hidden) 처리
          if (select.value === currentTab) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        }
      });
    }

    // 초기 화면 로딩 시 '할 일(todo)' 탭에 있는 카드만 걸러서 보여주기
    filterCards();
  });
  //여기까지 입니다.

  const categoryLabels = {
    work: "업무",
    personal: "개인",
    health: "건강",
    study: "공부",
  };

  const priorityLabels = {
    low: "낮음",
    normal: "보통",
    high: "높음",
  };

  const statusLabels = {
    todo: "할 일",
    progress: "진행 중",
    done: "완료",
  };

  const sortLabels = {
    created: "등록순",
    date: "날짜순",
    time: "시간순",
    priority: "중요도순",
  };

  const directionLabels = {
    asc: "오름차순",
    desc: "내림차순",
  };

  const statusEntries = Object.entries(statusLabels);

  const priorityOrder = {
    high: 0,
    normal: 1,
    low: 2,
  };

  const englishWeekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const koreanWeekdays = ["일", "월", "화", "수", "목", "금", "토"];

  // 달력
  const prevMonthBtn = document.querySelector("#prevMonth");
  const nextMonthBtn = document.querySelector("#nextMonth");
  const monthLabel = document.querySelector("#monthLabel");
  const dateGrid = document.querySelector("#dateGrid");
  const calendarAll = document.querySelector(".calendar-all");
  const calendarMobileToggle = document.querySelector("#calendarMobileToggle");

  // 연도·월 선택창
  const calendarPickerButton = document.querySelector("#calendarPickerButton");

  const calendarPickerPanel = document.querySelector("#calendarPickerPanel");

  const pickerYearButton = document.querySelector("#pickerYearButton");
  const pickerYearLabel = document.querySelector("#pickerYearLabel");

  const pickerPrevYear = document.querySelector("#pickerPrevYear");
  const pickerNextYear = document.querySelector("#pickerNextYear");

  const monthSelectionView = document.querySelector("#monthSelectionView");

  const yearSelectionView = document.querySelector("#yearSelectionView");

  const monthGrid = document.querySelector("#monthGrid");
  const yearGrid = document.querySelector("#yearGrid");

  const yearRangeLabel = document.querySelector("#yearRangeLabel");
  const pickerPrevDecade = document.querySelector("#pickerPrevDecade");
  const pickerNextDecade = document.querySelector("#pickerNextDecade");

  const todayDateLeft = document.querySelector("#todayDateLeft");
  const todayDateRight = document.querySelector("#todayDateRight");

  // 선택 날짜
  const selectedDateText = document.querySelector("#selectedDateText");

  const summaryTodo = document.querySelector("#summaryTodo");
  const summaryProgress = document.querySelector("#summaryProgress");
  const summaryDone = document.querySelector("#summaryDone");
  const summaryTotal = document.querySelector("#summaryTotal");

  const statTotal = document.querySelector("#statTotal");
  const statTodo = document.querySelector("#statTodo");
  const statProgress = document.querySelector("#statProgress");
  const statDone = document.querySelector("#statDone");
  const statAchievement = document.querySelector("#statAchievement");

  // 일정
  const taskBoard = document.querySelector("#taskBoard");

  const todoList = document.querySelector("#todoList");
  const progressList = document.querySelector("#progressList");
  const doneList = document.querySelector("#doneList");

  const todoCount = document.querySelector("#todoCount");
  const progressCount = document.querySelector("#progressCount");
  const doneCount = document.querySelector("#doneCount");

  // 검색창
  const searchInput = document.querySelector("#searchInput");
  const searchForm = document.querySelector(".search-bar");

  const clearSearchButton = document.querySelector("#clearSearchButton");

  const activeFilterText = document.querySelector("#activeFilterText");

  // 오름차순·내림차순
  const sortDirectionButton = document.querySelector("#sortDirectionButton");

  // 필터
  const filterToggle = document.querySelector("#filterToggle");
  const filterModal = document.querySelector("#filterModal");
  const closeFilterModal = document.querySelector("#closeFilterModal");

  const categoryFilter = document.querySelector("#categoryFilter");
  const sortSelect = document.querySelector("#sortSelect");

  const resetFilterBtn = document.querySelector("#resetFilterBtn");
  const applyFilterBtn = document.querySelector("#applyFilterBtn");

  const priorityFilterInputs = document.querySelectorAll(
    'input[name="priorityFilter"]',
  );

  const statusFilterInputs = document.querySelectorAll(
    'input[name="statusFilter"]',
  );

  // 모든 커스텀 선택창
  const customSelects = document.querySelectorAll("[data-custom-select]");

  const CUSTOM_SELECT_DURATION = 240;
  const MESSAGE_MODAL_DURATION = 180;

  // 새 일정 등록
  const openModalBtn = document.querySelector("#openModal");
  const taskModal = document.querySelector("#taskModal");
  const closeModalBtn = document.querySelector("#closeModal");

  const taskForm = document.querySelector("#taskForm");
  const resetFormBtn = document.querySelector("#resetFormBtn");

  const modalTitle = document.querySelector("#modalTitle");
  const taskSubmitBtn = document.querySelector("#taskSubmitBtn");

  const scheduleTitle = document.querySelector("#scheduleTitle");
  const scheduleCategory = document.querySelector("#scheduleCategory");
  const scheduleDate = document.querySelector("#scheduleDate");
  const scheduleTime = document.querySelector("#scheduleTime");
  const schedulePriority = document.querySelector("#schedulePriority");
  const scheduleStatus = document.querySelector("#scheduleStatus");
  const scheduleMemo = document.querySelector("#scheduleMemo");

  const titleCharacterCount = document.querySelector("#titleCharacterCount");

  const memoCharacterCount = document.querySelector("#memoCharacterCount");

  // 일정 초기화
  const resetTasksBtn = document.querySelector("#resetTasksBtn");

  // 신문 발간
  const editionSubText = document.querySelector("#editionSubText");

  const editionStatusTitle = document.querySelector("#editionStatusTitle");

  const editionStatusText = document.querySelector("#editionStatusText");

  /* 신문 카드 안쪽의 사각형 미리보기 */
  const editionPreview = document.querySelector(".edition-preview");

  const publishTime = document.querySelector("#publishTime");
  const publishRate = document.querySelector("#publishRate");
  const publishDuration = document.querySelector("#publishDuration");

  const publishDoneCount = document.querySelector("#publishDoneCount");

  // 신문
  const viewNewspaperBtn = document.querySelector("#viewNewspaperBtn");

  const newspaperModal = document.querySelector("#newspaperModal");

  const closeNewspaper = document.querySelector("#closeNewspaper");

  const newspaperBody = document.querySelector("#newspaperBody");

  const newspaperTitle = document.querySelector("#newspaperTitle");

  // 공통 경고·삭제 확인 팝업
  const messageModal = document.querySelector("#messageModal");

  const messageModalLabel = document.querySelector("#messageModalLabel");

  const messageModalTitle = document.querySelector("#messageModalTitle");

  const messageModalText = document.querySelector("#messageModalText");

  const messageModalActions = document.querySelector("#messageModalActions");

  const messageCancelButton = document.querySelector("#messageCancelButton");

  const messageConfirmButton = document.querySelector("#messageConfirmButton");

  // 카운트다운
  const countdownText = document.querySelector("#countdownText");

  // 명언
  const dailyQuote = document.querySelector(".word");

  let isMobileCalendarExpanded = false;

  function isMobileViewport() {
    return window.matchMedia("(max-width: 767px)").matches;
  }

  function getActiveCalendarWeekRow() {
    const activeCell =
      dateGrid.querySelector(".date-cell.selected") ||
      dateGrid.querySelector(".date-cell.is-today");

    return activeCell?.dataset.weekRow ?? "1";
  }

  function updateMobileCalendarToggle() {
    if (!calendarMobileToggle) {
      return;
    }

    const isExpanded = isMobileViewport() && isMobileCalendarExpanded;

    calendarMobileToggle.setAttribute("aria-expanded", String(isExpanded));
    calendarMobileToggle.setAttribute(
      "aria-label",
      isExpanded ? "달력 접기" : "달력 펼치기",
    );
  }

  function updateMobileCalendarLayout() {
    if (!calendarAll || !calendarMobileToggle) {
      return;
    }

    const isMobile = isMobileViewport();
    const activeWeekRow = getActiveCalendarWeekRow();

    calendarAll.classList.toggle(
      "is-mobile-collapsed",
      isMobile && !isMobileCalendarExpanded,
    );
    calendarAll.classList.toggle(
      "is-mobile-expanded",
      isMobile && isMobileCalendarExpanded,
    );

    dateGrid.querySelectorAll(".date-cell").forEach((cell) => {
      const shouldHide =
        isMobile &&
        !isMobileCalendarExpanded &&
        cell.dataset.weekRow !== activeWeekRow;

      cell.classList.toggle("is-mobile-hidden", shouldHide);
    });

    updateMobileCalendarToggle();
  }

  // const quotes = [
  //   "작은 실천이 큰 변화를 만든다.",
  //   "꾸준함은 가장 강력한 재능이다.",
  //   "오늘의 한 걸음이 내일의 방향이 된다.",
  //   "완벽보다 완료가 당신을 앞으로 보낸다.",
  //   "시작하는 용기가 하루를 바꾼다.",
  //   "지금의 집중이 미래의 여유를 만든다.",
  //   "기록하는 사람은 결국 성장의 증거를 가진다.",
  //   "천천히 가도 멈추지 않으면 도착한다.",
  //   "오늘 끝낸 일 하나가 자신감을 키운다.",
  //   "좋은 하루의 기사는 작은 실천에서 시작됩니다.",
  // ];김상우

  // 상태값
  let today = new Date();
  let todayString = toDateString(today);
  let selectedDate = todayString;

  let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // 선택 중인 연도
  let pickerYear = currentMonth.getFullYear();

  // 연도 범위 시작값
  let pickerDecadeStart = Math.floor(pickerYear / 10) * 10;

  let tasks = loadTasks();

  /* 현재 화면에 표시 중인 사용자 이름 */
  let currentUserName = "";

  /* null이면 새 일정 등록, 값이 있으면 일정 수정 */
  let editingTaskId = null;
  let messageConfirmAction = null;
  let messageReturnFocus = null;
  let messageCloseTimer = null;

  const activeFilters = {
    ...DEFAULT_FILTERS,
  };

  // 날짜
  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function toDateString(date) {
    return `${date.getFullYear()}-${pad(
      date.getMonth() + 1,
    )}-${pad(date.getDate())}`;
  }

  function fromDateString(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day);
  }

  function formatSelectedDate(dateString) {
    const date = fromDateString(dateString);

    return `${dateString.replaceAll("-", ".")} (${
      englishWeekdays[date.getDay()]
    })`;
  }

  function formatKoreanDate(dateString) {
    const date = fromDateString(dateString);

    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${koreanWeekdays[date.getDay()]}요일`;
  }

  /* 등록·완료 시간을 YYYY-MM-DD HH:MM 형태로 변환 */
  function formatTaskTimestamp(timestamp) {
    if (!timestamp) {
      return "기록 없음";
    }

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      return "기록 없음";
    }

    return `${toDateString(date)} ${pad(date.getHours())}:${pad(
      date.getMinutes(),
    )}`;
  }

  /* 일정 시간을 AM/PM 형식으로 변환 */
  function formatScheduleTime(timeString) {
    if (!timeString) {
      return "시간 미정";
    }

    const [hourValue, minute] = timeString.split(":").map(Number);

    if (Number.isNaN(hourValue) || Number.isNaN(minute)) {
      return timeString;
    }

    const period = hourValue >= 12 ? "PM" : "AM";

    const hour = hourValue % 12 || 12;

    return `${period} ${hour}:${pad(minute)}`;
  }

  function createTaskHistoryRow(label, timestamp) {
    const row = document.createElement("div");

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );

    const hands = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );

    const time = document.createElement("time");

    const formattedTime = formatTaskTimestamp(timestamp);

    row.className = "task-history-row";

    row.setAttribute("aria-label", `${label} 시간: ${formattedTime}`);

    icon.classList.add("task-history-icon");

    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("stroke-width", "1.8");
    icon.setAttribute("stroke-linecap", "round");
    icon.setAttribute("stroke-linejoin", "round");
    icon.setAttribute("aria-hidden", "true");

    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "9");

    hands.setAttribute("d", "M12 7v5l3 2");

    icon.append(circle, hands);

    time.className = "task-history-time";
    time.textContent = formattedTime;

    if (timestamp) {
      const date = new Date(timestamp);

      if (!Number.isNaN(date.getTime())) {
        time.dateTime = date.toISOString();
      }
    }

    row.append(icon, time);

    return row;
  }

  function getLastDateOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function createTaskId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  // 저장 및 불러오기
  function loadTasks() {
    try {
      const savedData =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem("flowdash-tasks") ||
        "[]";

      const savedTasks = JSON.parse(savedData);

      return Array.isArray(savedTasks) ? savedTasks : [];
    } catch (error) {
      console.warn("저장된 일정을 불러오지 못했습니다.", error);

      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn("일정을 저장하지 못했습니다.", error);
    }
  }

  // 데이터 조회 및 통계
  function getTasksForDate(dateString) {
    return tasks.filter((task) => task.date === dateString);
  }

  function getStatusCounts(targetTasks) {
    return targetTasks.reduce(
      (counts, task) => {
        if (task.status in counts) {
          counts[task.status] += 1;
        }

        return counts;
      },
      {
        todo: 0,
        progress: 0,
        done: 0,
      },
    );
  }

  function getDateState(dateString = selectedDate) {
    const selectedTasks = getTasksForDate(dateString);
    const counts = getStatusCounts(selectedTasks);
    const total = selectedTasks.length;

    const rate = total === 0 ? 0 : Math.round((counts.done / total) * 100);

    return {
      selectedTasks,
      counts,
      total,
      rate,
    };
  }

  function getStatusMapByDate() {
    const statusMap = new Map();

    tasks.forEach((task) => {
      if (!statusMap.has(task.date)) {
        statusMap.set(task.date, new Set());
      }

      statusMap.get(task.date).add(task.status);
    });

    return statusMap;
  }

  function getStatusesForDate(dateString) {
    return new Set(getTasksForDate(dateString).map((task) => task.status));
  }

  /* 헤더의 오늘 날짜 출력 */
  function renderHeaderDate() {
    const formatted = todayString.replaceAll("-", ".");

    [todayDateLeft, todayDateRight].forEach((element) => {
      if (!element) {
        return;
      }

      element.textContent = formatted;
      element.dateTime = todayString;
    });
  }

  /* 시간대별 인사말 */

  function updateTimeGreeting(now = new Date()) {
    if (!timeGreeting || !mainTimeGreeting) {
      return;
    }

    const currentHour = now.getHours();

    /* 기본 인사말 */
    let englishGreeting = "HELLO";
    let koreanGreeting = "안녕하세요";

    /* 오전 5시부터 오전 10시 59분 */
    if (currentHour >= 5 && currentHour < 11) {
      englishGreeting = "GOOD MORNING";
      koreanGreeting = "좋은 아침이에요";
    } else if (currentHour >= 11 && currentHour < 17) {
      /* 오전 11시부터 오후 4시 59분 */
      englishGreeting = "GOOD AFTERNOON";
      koreanGreeting = "좋은 오후에요";
    } else if (currentHour >= 17 && currentHour < 22) {
      /* 오후 5시부터 오후 9시 59분 */
      englishGreeting = "GOOD EVENING";
      koreanGreeting = "좋은 저녁이에요";
    }

    /* 위쪽 작은 문구 */
    timeGreeting.textContent = englishGreeting;

    /* 큰 메인 문구 */
    mainTimeGreeting.textContent = koreanGreeting;
  }

  // function hashDateString(dateString) {
  //   let hash = 0;

  //   for (let index = 0; index < dateString.length; index += 1) {
  //     hash = (hash * 31 + dateString.charCodeAt(index)) >>> 0;
  //   }

  //   return hash;
  // }

  // function getDailyQuote(dateString) {
  //   if (quotes.length === 0) {
  //     return "";
  //   }

  //   const quoteIndex = hashDateString(dateString) % quotes.length;

  //   return quotes[quoteIndex];
  // }

  // function renderDailyQuote() {
  //   if (!dailyQuote) {
  //     return;
  //   }

  //   dailyQuote.textContent = getDailyQuote(todayString);
  // }김상우

  function renderDateDots(button, statuses) {
    button.querySelector(".date-dots")?.remove();

    if (!statuses || statuses.size === 0) {
      return;
    }

    const dots = document.createElement("span");

    dots.className = "date-dots";
    dots.setAttribute("aria-hidden", "true");

    [...statuses].slice(0, 3).forEach((status) => {
      const dot = document.createElement("span");

      dot.className = `date-dot ${status}`;

      dots.append(dot);
    });

    button.append(dots);
  }

  function applyMobileDateStatus(button, statuses) {
    button.classList.remove(
      "mobile-status-todo",
      "mobile-status-done",
      "mobile-status-progress",
    );

    if (!statuses || statuses.size === 0) {
      return;
    }

    if (statuses.has("done")) {
      button.classList.add("mobile-status-done");

      return;
    }

    if (statuses.has("todo")) {
      button.classList.add("mobile-status-todo");

      return;
    }

    if (statuses.has("progress")) {
      button.classList.add("mobile-status-progress");
    }
  }

  function createDateButton(date, visibleMonth, statusMap) {
    const dateString = toDateString(date);

    const button = document.createElement("button");
    const time = document.createElement("time");

    button.type = "button";
    button.className = "date-cell";
    button.dataset.date = dateString;

    button.setAttribute("role", "gridcell");

    button.setAttribute("aria-label", `${formatSelectedDate(dateString)} 선택`);

    time.dateTime = dateString;
    time.textContent = String(date.getDate());

    button.append(time);

    if (date.getMonth() !== visibleMonth) {
      button.classList.add("other-month");
    }

    if (dateString === todayString) {
      button.classList.add("is-today");
    }

    if (dateString === selectedDate) {
      button.classList.add("selected");

      button.setAttribute("aria-current", "date");
    }

    const statuses = statusMap.get(dateString);

    renderDateDots(button, statuses);
    applyMobileDateStatus(button, statuses);

    return button;
  }

  // 달력 출력
  function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const lastDay = getLastDateOfMonth(year, month);

    const prevLastDay = getLastDateOfMonth(year, month - 1);

    const statusMap = getStatusMapByDate();

    const fragment = document.createDocumentFragment();

    monthLabel.textContent = `${year}년 ${month + 1}월`;

    let cellCount = 0;

    function appendCalendarCell(date) {
      const button = createDateButton(date, month, statusMap);

      button.dataset.weekRow = String(Math.floor(cellCount / 7) + 1);

      fragment.append(button);
      cellCount += 1;
    }

    for (let index = firstDay - 1; index >= 0; index -= 1) {
      const day = prevLastDay - index;

      appendCalendarCell(new Date(year, month - 1, day));
    }

    for (let day = 1; day <= lastDay; day += 1) {
      appendCalendarCell(new Date(year, month, day));
    }

    const nextDays = 42 - cellCount;

    for (let day = 1; day <= nextDays; day += 1) {
      appendCalendarCell(new Date(year, month + 1, day));
    }

    dateGrid.replaceChildren(fragment);
    updateMobileCalendarLayout();
  }

  function renderMonthPicker() {
    pickerYearLabel.textContent = `${pickerYear}년`;

    const fragment = document.createDocumentFragment();

    const currentYear = today.getFullYear();
    const currentMonthNumber = today.getMonth();

    for (let month = 0; month < 12; month += 1) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "month-option";
      button.dataset.month = String(month);
      button.textContent = `${month + 1}월`;

      button.setAttribute("role", "gridcell");

      const isSelectedMonth =
        pickerYear === currentMonth.getFullYear() &&
        month === currentMonth.getMonth();

      const isCurrentMonth =
        pickerYear === currentYear && month === currentMonthNumber;

      let ariaLabel = `${pickerYear}년 ${month + 1}월로 이동`;

      if (isCurrentMonth) {
        button.classList.add("is-current");
        button.setAttribute("aria-current", "date");

        ariaLabel += ", 현재 달";
      }

      if (isSelectedMonth) {
        button.classList.add("is-selected");
        button.setAttribute("aria-selected", "true");

        ariaLabel += ", 선택된 달";
      } else {
        button.setAttribute("aria-selected", "false");
      }

      button.setAttribute("aria-label", ariaLabel);

      fragment.append(button);
    }

    monthGrid.replaceChildren(fragment);
  }

  function renderYearPicker() {
    const decadeEnd = pickerDecadeStart + 9;

    yearRangeLabel.textContent = `${pickerDecadeStart} - ${decadeEnd}`;

    const fragment = document.createDocumentFragment();

    const firstVisibleYear = pickerDecadeStart - 2;
    const currentYear = today.getFullYear();

    for (let index = 0; index < 16; index += 1) {
      const year = firstVisibleYear + index;

      const button = document.createElement("button");

      button.type = "button";
      button.className = "year-option";
      button.dataset.year = String(year);
      button.textContent = String(year);

      button.setAttribute("role", "gridcell");

      const isSelectedYear = year === pickerYear;
      const isCurrentYear = year === currentYear;

      let ariaLabel = `${year}년 선택`;

      if (isCurrentYear) {
        button.classList.add("is-current");
        button.setAttribute("aria-current", "date");

        ariaLabel += ", 현재 연도";
      }

      if (isSelectedYear) {
        button.classList.add("is-selected");
        button.setAttribute("aria-selected", "true");

        ariaLabel += ", 선택된 연도";
      } else {
        button.setAttribute("aria-selected", "false");
      }

      if (year < pickerDecadeStart || year > decadeEnd) {
        button.classList.add("is-outside-range");
      }

      button.setAttribute("aria-label", ariaLabel);

      fragment.append(button);
    }

    yearGrid.replaceChildren(fragment);
  }
  function showMonthSelection() {
    monthSelectionView.hidden = false;
    yearSelectionView.hidden = true;
  }

  function showYearSelection() {
    monthSelectionView.hidden = true;
    yearSelectionView.hidden = false;

    renderYearPicker();
  }

  function openCalendarPicker() {
    pickerYear = currentMonth.getFullYear();

    pickerDecadeStart = Math.floor(pickerYear / 10) * 10;

    renderMonthPicker();
    showMonthSelection();

    calendarPickerPanel.hidden = false;

    calendarPickerButton.setAttribute("aria-expanded", "true");
  }

  function closeCalendarPicker() {
    calendarPickerPanel.hidden = true;

    calendarPickerButton.setAttribute("aria-expanded", "false");
  }

  function toggleCalendarPicker() {
    if (calendarPickerPanel.hidden) {
      openCalendarPicker();
    } else {
      closeCalendarPicker();
    }
  }

  function handleMonthPickerClick(event) {
    const monthButton = event.target.closest(".month-option");

    if (!monthButton || !monthGrid.contains(monthButton)) {
      return;
    }

    const selectedMonth = Number(monthButton.dataset.month);

    currentMonth = new Date(pickerYear, selectedMonth, 1);

    selectedDate = toDateString(currentMonth);

    closeCalendarPicker();

    renderAll();
  }

  function handleYearPickerClick(event) {
    const yearButton = event.target.closest(".year-option");

    if (!yearButton || !yearGrid.contains(yearButton)) {
      return;
    }

    pickerYear = Number(yearButton.dataset.year);

    pickerDecadeStart = Math.floor(pickerYear / 10) * 10;

    renderMonthPicker();
    showMonthSelection();
  }

  // 일정 점
  function refreshCalendarDate(dateString) {
    const dateButton = dateGrid.querySelector(
      `.date-cell[data-date="${dateString}"]`,
    );

    if (!dateButton) {
      return;
    }

    const statuses = getStatusesForDate(dateString);

    renderDateDots(dateButton, statuses);
    applyMobileDateStatus(dateButton, statuses);
  }

  // 사용자 이름 관리
  function normalizeUserName(value) {
    return value.trim().replace(/\s+/g, " ");
  }

  function renderUserName(name) {
    currentUserName = name;

    displayUserName.textContent = name;

    displayUserName.setAttribute("aria-label", `${name} 이름 수정`);
  }

  function updateNameConfirmButton() {
    const hasName = normalizeUserName(nameInput.value).length > 0;

    nameConfirmButton.disabled = !hasName;

    if (hasName) {
      nameIntroError.textContent = "";
    }
  }

  function openNameIntro() {
    nameIntro.hidden = false;

    document.body.classList.add("name-intro-open");

    nameInput.value = "";

    nameConfirmButton.textContent = "CONFIRM";

    nameIntroError.textContent = "";

    updateNameConfirmButton();

    window.requestAnimationFrame(() => {
      mobileMenu.querySelector(".mobile-menu-link")?.focus();
    });
  }

  function closeNameIntro() {
    nameIntro.hidden = true;

    document.body.classList.remove("name-intro-open");
  }

  function saveUserName() {
    const nextUserName = normalizeUserName(nameInput.value);

    if (!nextUserName) {
      nameIntroError.textContent = "이름을 입력해주세요.";

      nameInput.focus();

      return;
    }

    localStorage.setItem(USER_NAME_KEY, nextUserName);

    renderUserName(nextUserName);
    closeNameIntro();
  }

  function startUserNameEdit() {
    const openedEditInput = document.querySelector("#userNameEditInput");

    if (openedEditInput) {
      return;
    }

    const editInput = document.createElement("input");

    let editFinished = false;

    editInput.id = "userNameEditInput";
    editInput.className = "greeting-name-input";

    editInput.type = "text";
    editInput.maxLength = 20;
    editInput.value = currentUserName;

    /*
    입력한 글자 수에 맞춰
    입력창 너비를 조절합니다.
  */
    function updateEditInputWidth() {
      const visibleLength = Math.max(editInput.value.length, 1);

      editInput.style.width = `${visibleLength + 0.5}ch`;
    }

    updateEditInputWidth();

    /*
    기존 이름 버튼의 정확한 자리를
    입력창으로 교체합니다.
  */
    displayUserName.replaceWith(editInput);

    editInput.focus();
    editInput.select();

    function finishUserNameEdit(shouldSave) {
      if (editFinished) {
        return;
      }

      editFinished = true;

      if (shouldSave) {
        const nextUserName = normalizeUserName(editInput.value);

        if (nextUserName) {
          localStorage.setItem(USER_NAME_KEY, nextUserName);

          renderUserName(nextUserName);
        }
      }

      /*
      입력창을 다시 기존 이름 버튼으로 교체합니다.
    */
      editInput.replaceWith(displayUserName);

      displayUserName.focus();
    }

    editInput.addEventListener("input", () => {
      updateEditInputWidth();
    });

    editInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        finishUserNameEdit(true);

        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();

        finishUserNameEdit(false);
      }
    });

    editInput.addEventListener("blur", () => {
      finishUserNameEdit(true);
    });
  }

  function initializeUserName() {
    const storedName = localStorage.getItem(USER_NAME_KEY);

    const savedUserName = normalizeUserName(storedName || "");

    const invalidNames = ["", "undefined", "null", "USER"];

    const hasValidName = !invalidNames.includes(savedUserName);

    if (!hasValidName) {
      localStorage.removeItem(USER_NAME_KEY);

      openNameIntro();

      return;
    }

    renderUserName(savedUserName);
    closeNameIntro();
  }

  // 날짜 통계
  function renderSummary(state) {
    const { counts, total, rate } = state;

    selectedDateText.textContent = formatSelectedDate(selectedDate);

    selectedDateText.dateTime = selectedDate;

    summaryTodo.textContent = String(counts.todo);

    summaryProgress.textContent = String(counts.progress);

    summaryDone.textContent = String(counts.done);

    summaryTotal.textContent = String(total);

    statTotal.textContent = String(total);

    statTodo.textContent = String(counts.todo);

    statProgress.textContent = String(counts.progress);

    statDone.textContent = String(counts.done);

    statAchievement.textContent = `${rate}%`;
  }

  function getVisibleTasks(sourceTasks = getTasksForDate(selectedDate)) {
    const keyword = searchInput.value.trim().toLowerCase();

    const visibleTasks = sourceTasks.filter((task) => {
      const matchesKeyword =
        keyword === "" ||
        task.title.toLowerCase().includes(keyword) ||
        (task.memo || "").toLowerCase().includes(keyword) ||
        (categoryLabels[task.category] || "").includes(keyword);

      const matchesCategory =
        activeFilters.category === "all" ||
        task.category === activeFilters.category;

      const matchesPriority =
        activeFilters.priority === "all" ||
        task.priority === activeFilters.priority;

      const matchesStatus =
        activeFilters.status === "all" || task.status === activeFilters.status;

      return (
        matchesKeyword && matchesCategory && matchesPriority && matchesStatus
      );
    });

    const taskOrder = new Map(tasks.map((task, index) => [task.id, index]));

    return visibleTasks.sort((firstTask, secondTask) => {
      const direction = activeFilters.direction === "desc" ? -1 : 1;

      let comparison = 0;

      if (activeFilters.sort === "created") {
        comparison =
          (taskOrder.get(firstTask.id) ?? 0) -
          (taskOrder.get(secondTask.id) ?? 0);
      } else if (activeFilters.sort === "priority") {
        comparison =
          (priorityOrder[firstTask.priority] ?? 999) -
            (priorityOrder[secondTask.priority] ?? 999) ||
          firstTask.time.localeCompare(secondTask.time);
      } else if (activeFilters.sort === "time") {
        comparison = firstTask.time.localeCompare(secondTask.time);
      } else {
        comparison =
          firstTask.date.localeCompare(secondTask.date) ||
          firstTask.time.localeCompare(secondTask.time);
      }

      return comparison * direction;
    });
  }

  // 빈 일정 안내
  function createEmptyState(status) {
    const emptyMessages = {
      todo: {
        title: "비어 있는 일정입니다",
        description: "할 일을 추가해 보세요.",
      },
      progress: {
        title: "진행 중인 일정이 없습니다",
        description: "일정을 진행 중으로 변경해 보세요.",
      },
      done: {
        title: "완료된 일정이 없습니다",
        description: "완료한 일정이 이곳에 표시됩니다.",
      },
    };

    const message = emptyMessages[status];

    const item = document.createElement("li");

    item.className = "kanban-empty";
    item.setAttribute("role", "status");

    item.innerHTML = `
  <span class="kanban-empty-icon" aria-hidden="true">
    <svg id="_레이어_1" data-name="레이어 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235.2 277.1">
  <defs>
  </defs>
  <path class="cls-1" d="M52.38,76.97c-9.52,0-17.23,7.71-17.23,17.23s7.71,17.22,17.23,17.22,17.22-7.71,17.22-17.22-7.71-17.23-17.22-17.23ZM52.38,100.58c-3.53,0-6.39-2.85-6.39-6.38s2.86-6.39,6.39-6.39,6.38,2.86,6.38,6.39-2.85,6.38-6.38,6.38Z"/>
  <rect class="cls-1" x="89.99" y="85.49" width="98.32" height="12.26" rx="6.13" ry="6.13"/>
  <path class="cls-1" d="M52.38,136.58c-9.52,0-17.23,7.71-17.23,17.23s7.71,17.22,17.23,17.22,17.22-7.71,17.22-17.22-7.71-17.23-17.22-17.23ZM52.38,160.19c-3.53,0-6.39-2.85-6.39-6.38s2.86-6.39,6.39-6.39,6.38,2.86,6.38,6.39-2.85,6.38-6.38,6.38Z"/>
  <rect class="cls-1" x="89.99" y="145.1" width="98.32" height="12.26" rx="6.13" ry="6.13"/>
  <path class="cls-1" d="M52.38,196.2c-9.52,0-17.23,7.71-17.23,17.23s7.71,17.22,17.23,17.22,17.22-7.71,17.22-17.22-7.71-17.23-17.22-17.23ZM52.38,219.81c-3.53,0-6.39-2.85-6.39-6.38s2.86-6.39,6.39-6.39,6.38,2.86,6.38,6.39-2.85,6.38-6.38,6.38Z"/>
  <rect class="cls-1" x="89.99" y="204.71" width="98.32" height="12.26" rx="6.13" ry="6.13"/>
  <path class="cls-1" d="M208.89,13.36h-31.96c-2.43-7.74-9.66-13.36-18.2-13.36h-73.73c-8.55,0-15.78,5.62-18.2,13.36H26.31C11.78,13.36,0,25.14,0,39.67v211.12c0,14.53,11.78,26.31,26.31,26.31h182.58c14.53,0,26.31-11.78,26.31-26.31V39.67c0-14.53-11.78-26.31-26.31-26.31ZM78.45,13.36s.06-.07.09-.1c1.49-1.49,3.56-2.42,5.84-2.42h74.32c2.33,0,4.43.97,5.93,2.52,1.44,1.49,2.33,3.51,2.33,5.74,0,2.04-.75,3.92-1.98,5.36-.14.17-.28.33-.44.48-1.49,1.49-3.56,2.42-5.84,2.42h-74.32c-2.51,0-4.76-1.12-6.27-2.9-1.24-1.44-1.99-3.31-1.99-5.36,0-2.23.89-4.26,2.33-5.74ZM224.7,250.17c0,9.03-7.32,16.35-16.35,16.35H26.86c-9.03,0-16.35-7.32-16.35-16.35V40.81c0-9.03,7.32-16.35,16.35-16.35h39.83c2.31,7.94,9.63,13.73,18.31,13.73h73.73c8.68,0,16-5.79,18.31-13.73h31.31c9.03,0,16.35,7.32,16.35,16.35v209.36Z"/>
</svg>
  </span>

  <strong class="kanban-empty-title">
    ${message.title}
  </strong>

  <p class="kanban-empty-description">
    ${message.description}
  </p>
`;

    return item;
  }

  /* 일정이 3개 이상이면 2개 높이까지만 표시하고 스크롤 */
  function updateTaskListScroll(list, taskCount) {
    const shouldScroll = taskCount >= 3;

    list.classList.toggle("has-scroll", shouldScroll);

    list.style.removeProperty("--task-list-max-height");

    if (!shouldScroll) {
      return;
    }

    /*
    첫 번째와 두 번째 카드 높이까지만
    목록의 표시 영역으로 사용합니다.
    세 번째 카드부터는 스크롤로 확인합니다.
  */
    const visibleCards = [...list.querySelectorAll(".task-card")].slice(0, 2);

    if (visibleCards.length < 2) {
      return;
    }

    const listStyle = window.getComputedStyle(list);

    const gap = Number.parseFloat(listStyle.rowGap || listStyle.gap) || 0;

    const paddingTop = Number.parseFloat(listStyle.paddingTop) || 0;

    const paddingBottom = Number.parseFloat(listStyle.paddingBottom) || 0;

    const cardsHeight = visibleCards.reduce(
      (totalHeight, card) => totalHeight + card.offsetHeight,
      0,
    );

    const gapsHeight = gap * (visibleCards.length - 1);

    const maxHeight = cardsHeight + gapsHeight + paddingTop + paddingBottom;

    list.style.setProperty(
      "--task-list-max-height",
      `${Math.ceil(maxHeight)}px`,
    );
  }

  function renderTaskBoard(sourceTasks) {
    const visibleTasks = getVisibleTasks(sourceTasks);

    const lists = {
      todo: todoList,
      progress: progressList,
      done: doneList,
    };

    const fragments = {
      todo: document.createDocumentFragment(),
      progress: document.createDocumentFragment(),
      done: document.createDocumentFragment(),
    };

    visibleTasks.forEach((task) => {
      const targetFragment = fragments[task.status];

      if (targetFragment) {
        targetFragment.append(createTaskCard(task));
      }
    });

    const visibleCounts = getStatusCounts(visibleTasks);

    Object.entries(lists).forEach(([status, list]) => {
      if (visibleCounts[status] === 0) {
        fragments[status].append(createEmptyState(status));
      }

      list.replaceChildren(fragments[status]);

      updateTaskListScroll(list, visibleCounts[status]);
    });

    todoCount.textContent = String(visibleCounts.todo);

    progressCount.textContent = String(visibleCounts.progress);

    doneCount.textContent = String(visibleCounts.done);

    const hasActiveFilter = Object.entries(DEFAULT_FILTERS).some(
      ([key, value]) => activeFilters[key] !== value,
    );

    filterToggle.classList.toggle("is-active", hasActiveFilter);
  }

  function createTaskCard(task) {
    const item = document.createElement("li");
    const article = document.createElement("article");

    const top = document.createElement("header");
    const checkbox = document.createElement("button");
    const priority = document.createElement("span");

    const menuWrapper = document.createElement("div");
    const menuButton = document.createElement("button");
    const actionMenu = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    const scheduleTime = document.createElement("time");
    const title = document.createElement("h4");
    const memo = document.createElement("p");

    const footer = document.createElement("footer");
    const history = document.createElement("div");
    const statusSelect = document.createElement("select");

    item.className = `task-card priority-${task.priority}`;
    item.dataset.taskId = task.id;

    if (task.status === "done") {
      item.classList.add("is-done");
    }

    /* 카드 상단 */

    top.className = "task-top";

    checkbox.type = "button";
    checkbox.className = "task-checkbox";
    checkbox.dataset.action = "toggle-done";

    checkbox.setAttribute(
      "aria-label",
      task.status === "done" ? "완료 취소" : "완료 처리",
    );

    priority.className = `task-priority priority-${task.priority}`;
    priority.textContent = priorityLabels[task.priority] || task.priority;

    /* 점 세 개 메뉴 */

    menuWrapper.className = "task-menu";

    menuButton.type = "button";
    menuButton.className = "task-close";
    menuButton.dataset.action = "toggle-task-menu";

    menuButton.setAttribute("aria-label", `${task.title} 일정 메뉴 열기`);
    menuButton.setAttribute("aria-haspopup", "menu");
    menuButton.setAttribute("aria-expanded", "false");

    actionMenu.id = `task-menu-${task.id}`;
    actionMenu.className = "task-action-menu";
    actionMenu.setAttribute("role", "menu");
    actionMenu.hidden = true;

    menuButton.setAttribute("aria-controls", actionMenu.id);

    editButton.type = "button";
    editButton.className = "task-action-button";
    editButton.dataset.action = "edit-task";
    editButton.setAttribute("role", "menuitem");
    editButton.textContent = "수정";

    deleteButton.type = "button";
    deleteButton.className = "task-action-button delete";
    deleteButton.dataset.action = "delete-task";
    deleteButton.setAttribute("role", "menuitem");
    deleteButton.textContent = "삭제";

    actionMenu.append(editButton, deleteButton);
    menuWrapper.append(menuButton, actionMenu);
    top.append(checkbox, priority, menuWrapper);

    /* 일정 시간 */

    scheduleTime.className = "task-schedule-time";
    scheduleTime.dateTime = task.time;
    scheduleTime.textContent = formatScheduleTime(task.time);

    scheduleTime.setAttribute("aria-label", `일정 시간 ${task.time || "미정"}`);

    /* 제목 */

    title.className = "task-title";
    title.textContent = task.title;

    /* 메모 */

    memo.className = "task-desc";
    memo.textContent = task.memo || "등록된 메모가 없습니다.";

    /* 등록·수정 시간 */

    /* 상태에 따른 시간 기록 */

    history.className = "task-history";

    /* 첫 번째 줄은 모든 상태에서 등록 시간 */
    history.append(createTaskHistoryRow("등록", task.createdAt));

    /*
  완료 상태:
  등록 시간 + 완료 시간

  할 일·진행 중 상태:
  등록 시간 + 수정 시간
*/
    if (task.status === "done") {
      history.append(createTaskHistoryRow("완료", task.completedAt));
    } else {
      history.append(createTaskHistoryRow("수정", task.updatedAt));
    }

    /* 상태 선택창 */

    statusSelect.className = "task-dropdown";
    statusSelect.dataset.action = "change-status";

    statusSelect.setAttribute("aria-label", `${task.title} 상태 변경`);

    statusEntries.forEach(([value, label]) => {
      const option = document.createElement("option");

      option.value = value;
      option.textContent = label;
      option.selected = task.status === value;

      statusSelect.append(option);
    });

    /* 카드 하단 */

    footer.className = "task-footer";
    footer.append(history, statusSelect);

    article.append(top, scheduleTime, title, memo, footer);

    item.append(article);

    return item;
  }

  // 일정 변경과 삭제
  function closeAllTaskMenus(exceptMenu = null) {
    const taskMenus = taskBoard.querySelectorAll(".task-menu");

    taskMenus.forEach((taskMenu) => {
      if (taskMenu === exceptMenu) {
        return;
      }

      const menuButton = taskMenu.querySelector(".task-close");

      const actionMenu = taskMenu.querySelector(".task-action-menu");

      menuButton?.setAttribute("aria-expanded", "false");

      if (actionMenu) {
        actionMenu.hidden = true;
      }
    });
  }

  function findTask(taskId) {
    return tasks.find((task) => task.id === taskId);
  }

  function updateTaskStatus(taskId, nextStatus) {
    const targetTask = findTask(taskId);

    if (!targetTask || !(nextStatus in statusLabels)) {
      return;
    }

    const previousStatus = targetTask.status;

    targetTask.status = nextStatus;

    /* 상태 변경도 수정 시간으로 기록 */
    targetTask.updatedAt = Date.now();

    /* 완료 상태로 바뀐 순간의 날짜와 시간 저장 */
    if (nextStatus === "done" && previousStatus !== "done") {
      targetTask.completedAt = Date.now();
    }

    /* 완료를 취소하면 기존 완료 시간 제거 */
    if (nextStatus !== "done") {
      targetTask.completedAt = null;
    }

    saveTasks();

    renderTaskChanges(targetTask.date);
  }

  function deleteTask(taskId) {
    const targetTask = findTask(taskId);

    if (!targetTask) {
      return;
    }

    const taskCard = [...taskBoard.querySelectorAll(".task-card")].find(
      (card) => card.dataset.taskId === taskId,
    );

    openMessageModal({
      variant: "danger",

      title: "일정을 삭제할까요?",

      message:
        `“${targetTask.title}”\n\n` + "일정은 삭제 후 복구할 수 없습니다.",

      confirmText: "삭제하기",
      cancelText: "취소하기",
      showCancel: true,

      returnFocus: taskCard?.querySelector(".task-close") || taskBoard,

      onConfirm: () => {
        const deletedDate = targetTask.date;

        tasks = tasks.filter((task) => task.id !== taskId);

        saveTasks();

        renderTaskChanges(deletedDate);
      },
    });
  }

  // 신문
  function calculateTimeSpan(targetTasks) {
    if (targetTasks.length < 2) {
      return "-";
    }

    const minutes = targetTasks
      .map((task) => {
        const [hour, minute] = task.time.split(":").map(Number);

        return hour * 60 + minute;
      })
      .sort((first, second) => first - second);

    const difference = minutes.at(-1) - minutes[0];

    const hours = Math.floor(difference / 60);

    const remainingMinutes = difference % 60;

    if (hours === 0) {
      return `${remainingMinutes}분`;
    }

    if (remainingMinutes === 0) {
      return `${hours}시간`;
    }

    return `${hours}시간 ${remainingMinutes}분`;
  }

  /*
  완료된 일정만 중요도순으로 가져옵니다.

  높음 → 보통 → 낮음 순서로 배치하고,
  중요도가 같으면 일정 시간순으로 배치합니다.
*/
  function getCompletedNewspaperTasks(targetTasks) {
    return targetTasks
      .filter((task) => task.status === "done")
      .sort((firstTask, secondTask) => {
        const firstPriority = priorityOrder[firstTask.priority] ?? 99;
        const secondPriority = priorityOrder[secondTask.priority] ?? 99;

        const priorityDifference = firstPriority - secondPriority;

        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        return firstTask.time.localeCompare(secondTask.time);
      });
  }

  /*
  신문 카드의 미리보기 안에 들어갈
  네모 한 칸을 생성합니다.
*/
  function createEditionPreviewItem(task) {
    const item = document.createElement("div");
    const hiddenText = document.createElement("span");

    item.className = `edition-preview-item priority-${task.priority}`;

    item.dataset.taskId = task.id;
    item.title = task.title;

    hiddenText.className = "sr-only";
    hiddenText.textContent = `${task.title}, ${
      priorityLabels[task.priority] || task.priority
    } 중요도 완료 일정`;

    item.append(hiddenText);

    return item;
  }

  /*
  완료된 일정만 신문 미리보기 사각형에 표시합니다.
*/
  function renderEditionPreview(targetTasks) {
    if (!editionPreview) {
      return;
    }

    const completedTasks = getCompletedNewspaperTasks(targetTasks);

    const fragment = document.createDocumentFragment();

    completedTasks.forEach((task) => {
      fragment.append(createEditionPreviewItem(task));
    });

    editionPreview.replaceChildren(fragment);

    editionPreview.classList.toggle("is-empty", completedTasks.length === 0);
  }

  function renderEditionCard(state) {
    const { selectedTasks, counts, total, rate } = state;

    editionSubText.textContent = `${formatSelectedDate(selectedDate)} 기록`;

    publishTime.textContent = "00:00 예정";

    publishRate.textContent = `${rate}%`;

    publishDuration.textContent = calculateTimeSpan(selectedTasks);

    publishDoneCount.textContent = `${counts.done}개 / ${total}개`;

    /*
  일정 완료 여부에 따라
  신문 미리보기 블록을 다시 생성합니다.
*/
    renderEditionPreview(selectedTasks);

    if (total === 0) {
      editionStatusTitle.textContent = "오늘의 기록을 기다리는 중";

      editionStatusText.textContent =
        "일정을 등록하면 선택한 날짜의 기록을 신문 형태로 확인할 수 있습니다.";

      return;
    }

    if (counts.done === total) {
      editionStatusTitle.textContent = "모든 일정이 완료되었습니다";

      editionStatusText.textContent =
        "완료된 하루의 기록이 신문 발간을 기다리고 있습니다.";

      return;
    }

    editionStatusTitle.textContent = `${counts.done}개의 일정 완료`;

    editionStatusText.textContent =
      `전체 ${total}개 일정 중 ${counts.done}개를 마쳤습니다. ` +
      "남은 일정도 차근차근 완료해보세요.";
  }

  function renderNewspaper() {
    const { selectedTasks, counts, total, rate } = getDateState();

    /*
    신문에는 완료된 일정만 기사로 표시합니다.
  */
    const completedTasks = getCompletedNewspaperTasks(selectedTasks);

    newspaperTitle.textContent = "오늘의 일정 신문";

    const issue = document.createElement("div");
    const issueDate = document.createElement("span");
    const issueNumber = document.createElement("span");

    const headline = document.createElement("h3");
    const lead = document.createElement("p");
    const rule = document.createElement("hr");

    const articleGrid = document.createElement("div");
    const stats = document.createElement("div");

    issue.className = "newspaper-issue";

    issueDate.textContent = formatKoreanDate(selectedDate);

    issueNumber.textContent = `DAILY ISSUE · ${selectedDate.replaceAll("-", "")}`;

    issue.append(issueDate, issueNumber);

    /* 신문 제목 */

    headline.className = "newspaper-headline";

    if (completedTasks.length === 0) {
      headline.textContent = "아직 완성되지 않은 오늘의 기사";
    } else if (counts.done === total) {
      headline.textContent = "오늘의 모든 일정, 성공적으로 마무리";
    } else {
      headline.textContent = `${completedTasks.length}개의 완료 기록이 만든 오늘의 신문`;
    }

    /* 신문 설명 */

    lead.className = "newspaper-lead";

    if (total === 0) {
      lead.textContent =
        "선택한 날짜에 등록된 일정이 없습니다. " +
        "일정을 등록하고 완료하면 이곳에 기사가 만들어집니다.";
    } else {
      lead.textContent =
        `선택한 날짜에는 총 ${total}개의 일정이 등록되었으며, ` +
        `그중 ${completedTasks.length}개가 기사로 완성되었습니다. ` +
        `현재 달성률은 ${rate}%입니다.`;
    }

    rule.className = "newspaper-rule";

    /*
    기존 columns 방식이 아니라
    미리보기와 동일한 grid 방식 사용
  */
    articleGrid.className = "newspaper-grid";

    if (completedTasks.length === 0) {
      const emptyArticle = document.createElement("article");
      const emptyTitle = document.createElement("h3");
      const emptyText = document.createElement("p");

      emptyArticle.className = "newspaper-article newspaper-empty-article";

      emptyTitle.textContent = "완료된 기사가 없습니다";

      emptyText.textContent =
        "일정을 완료하면 중요도에 따라 " + "신문 기사 칸이 이곳에 배치됩니다.";

      emptyArticle.append(emptyTitle, emptyText);
      articleGrid.append(emptyArticle);
    } else {
      completedTasks.forEach((task) => {
        const article = document.createElement("article");

        const articleMeta = document.createElement("p");
        const articleTitle = document.createElement("h3");
        const articleText = document.createElement("p");

        article.className = `newspaper-article priority-${task.priority}`;

        article.dataset.taskId = task.id;

        articleMeta.className = "newspaper-article-meta";

        /*
  시간은 본문 문장에 자연스럽게 포함하므로
  상단에는 분류와 중요도만 표시합니다.
*/
        articleMeta.textContent =
          `${categoryLabels[task.category] || "일반"} · ` +
          `${priorityLabels[task.priority] || "보통"} 중요도`;

        articleTitle.textContent = task.title || "이름 없는 일정";

        articleText.className = "newspaper-article-text";

        /*
  일정 정보를 신문 기사 문장으로 변환합니다.
*/
        articleText.textContent = createNewspaperArticleText(task);

        article.append(articleMeta, articleTitle, articleText);

        articleGrid.append(article);
      });
    }

    /*
  24시간 형식의 시간을
  신문 문장용 오전·오후 표현으로 바꿉니다.

  09:00 → 오전 9시경
  13:30 → 오후 1시 30분경
*/
    function formatNewspaperTime(timeString) {
      if (!timeString) {
        return "예정된 시간에";
      }

      const [hourValue, minuteValue] = timeString.split(":").map(Number);

      if (Number.isNaN(hourValue) || Number.isNaN(minuteValue)) {
        return "예정된 시간에";
      }

      const period = hourValue < 12 ? "오전" : "오후";
      const hour = hourValue % 12 || 12;

      if (minuteValue === 0) {
        return `${period} ${hour}시경`;
      }

      return `${period} ${hour}시 ${minuteValue}분경`;
    }

    /*
  중요도에 따라 기사 문장을 다르게 만듭니다.
*/
    function getPriorityArticleSentence(priority) {
      const prioritySentences = {
        high: "높은 집중도와 강도를 요구하는 일정이었지만, 흐름을 잃지 않고 계획대로 수월하게 마무리한 것으로 전해졌다.",

        normal:
          "일정한 집중력을 유지하며 안정적으로 업무를 수행했고, 계획한 과정을 무리 없이 마친 것으로 전해졌다.",

        low: "비교적 가벼운 강도로 진행됐으며, 차분한 흐름을 유지하면서 여유롭게 마무리한 것으로 전해졌다.",
      };

      return (
        prioritySentences[priority] ||
        "계획한 일정을 차분히 수행하고 모든 과정을 마친 것으로 기록됐다."
      );
    }

    /*
  일정 하나를 신문 기사 본문으로 바꿉니다.
*/
    function createNewspaperArticleText(task) {
      const timeText = formatNewspaperTime(task.time);

      const categoryText = categoryLabels[task.category] || "일반";

      const prioritySentence = getPriorityArticleSentence(task.priority);

      const titleText = task.title?.trim() || "이름 없는 일정";

      const memoText = task.memo?.trim();

      let articleText =
        `${timeText}, ‘${titleText}’ 일정이 진행됐다. ` +
        `해당 일정은 ${categoryText} 분야의 활동으로 분류됐으며, ` +
        prioritySentence;

      /*
    메모가 있는 경우 기사 뒤에 추가합니다.
  */
      if (memoText) {
        articleText +=
          ` 일정에 관한 추가 기록에는 ` + `“${memoText}”라고 적혀 있다.`;
      }

      return articleText;
    }

    /* 하단 통계 */

    stats.className = "newspaper-stats";

    [
      ["전체 일정", `${total}개`],
      ["완료 기사", `${counts.done}개`],
      ["남은 일정", `${total - counts.done}개`],
      ["달성률", `${rate}%`],
    ].forEach(([label, value]) => {
      const stat = document.createElement("div");
      const statLabel = document.createElement("span");
      const statValue = document.createElement("strong");

      stat.className = "newspaper-stat";

      statLabel.textContent = label;
      statValue.textContent = value;

      stat.append(statLabel, statValue);
      stats.append(stat);
    });

    newspaperBody.replaceChildren(
      issue,
      headline,
      lead,
      rule,
      articleGrid,
      stats,
    );
  }

  // 일정 변경 화면 갱신
  function renderTaskChanges(dateString) {
    const state = getDateState();

    refreshCalendarDate(dateString);
    renderSummary(state);
    renderTaskBoard(state.selectedTasks);
    renderEditionCard(state);
  }

  function renderAll() {
    const state = getDateState();

    renderCalendar();
    renderSummary(state);
    renderTaskBoard(state.selectedTasks);
    renderEditionCard(state);
  }

  // 팝업 열고 닫기
  function openLayer(layer, focusTarget) {
    layer.hidden = false;

    layer.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    window.requestAnimationFrame(() => {
      focusTarget?.focus();
    });
  }

  function closeLayer(layer, returnFocusTarget) {
    layer.hidden = true;

    layer.setAttribute("aria-hidden", "true");

    const hasOpenLayer = document.querySelector(
      ".modal-backdrop:not([hidden])",
    );

    if (!hasOpenLayer) {
      document.body.classList.remove("modal-open");
    }

    returnFocusTarget?.focus();
  }

  function openMessageModal({
    variant = "notice",
    title,
    message,
    confirmText = "확인",
    cancelText = "취소하기",
    showCancel = false,
    onConfirm = null,
    returnFocus = document.activeElement,
  }) {
    window.clearTimeout(messageCloseTimer);

    messageModal.classList.remove("is-closing");
    messageModal.dataset.variant = variant;

    messageModalLabel.textContent =
      variant === "danger" ? "DELETE WARNING" : "NOTICE";

    messageModalTitle.textContent = title;
    messageModalText.textContent = message;

    messageConfirmButton.textContent = confirmText;
    messageCancelButton.textContent = cancelText;

    messageCancelButton.hidden = !showCancel;

    messageModalActions.classList.toggle("is-single", !showCancel);

    messageConfirmAction = typeof onConfirm === "function" ? onConfirm : null;

    messageReturnFocus = returnFocus;

    /*
    삭제 팝업에서는 삭제 버튼보다
    취소 버튼에 먼저 포커스
  */
    const focusTarget = showCancel ? messageCancelButton : messageConfirmButton;

    openLayer(messageModal, focusTarget);
  }

  function closeMessageModal({ restoreFocus = true } = {}) {
    if (messageModal.hidden || messageModal.classList.contains("is-closing")) {
      return;
    }

    const focusTarget = restoreFocus ? messageReturnFocus : null;

    messageModal.classList.add("is-closing");

    window.clearTimeout(messageCloseTimer);

    messageCloseTimer = window.setTimeout(() => {
      messageModal.classList.remove("is-closing");

      closeLayer(messageModal, focusTarget);

      messageConfirmAction = null;
      messageReturnFocus = null;
    }, MESSAGE_MODAL_DURATION);
  }

  function closeFilterLayer() {
    filterToggle.setAttribute("aria-expanded", "false");

    closeAllCustomSelects(null, {
      immediate: true,
    });

    closeLayer(filterModal, filterToggle);
  }
  function updateCharacterCount(input, countElement, maxLength) {
    const currentLength = input.value.length;

    countElement.textContent = `${currentLength} / ${maxLength}`;

    countElement.classList.toggle("is-limit", currentLength >= maxLength);
  }

  function updateTaskFormCharacterCounts() {
    updateCharacterCount(scheduleTitle, titleCharacterCount, TITLE_MAX_LENGTH);

    updateCharacterCount(scheduleMemo, memoCharacterCount, MEMO_MAX_LENGTH);
  }

  // 일정 등록 폼
  function resetTaskForm() {
    taskForm.reset();

    scheduleCategory.value = "work";
    scheduleDate.value = selectedDate;
    scheduleTime.value = "09:00";
    schedulePriority.value = "normal";
    scheduleStatus.value = "todo";

    syncAllCustomSelects();
    updateTaskFormCharacterCounts();
  }

  function resetTaskModalMode() {
    editingTaskId = null;

    modalTitle.textContent = "일정 등록";
    taskSubmitBtn.textContent = "일정 등록하기";
  }

  function openTaskModal() {
    resetTaskModalMode();
    resetTaskForm();

    openLayer(taskModal, scheduleTitle);
  }

  function openEditTaskModal(taskId) {
    const targetTask = findTask(taskId);

    if (!targetTask) {
      return;
    }

    editingTaskId = taskId;

    scheduleTitle.value = targetTask.title;
    scheduleCategory.value = targetTask.category;
    scheduleDate.value = targetTask.date;
    scheduleTime.value = targetTask.time;
    schedulePriority.value = targetTask.priority;
    scheduleStatus.value = targetTask.status;
    scheduleMemo.value = targetTask.memo || "";

    modalTitle.textContent = "일정 수정";
    taskSubmitBtn.textContent = "수정 완료";

    syncAllCustomSelects();
    updateTaskFormCharacterCounts();

    openLayer(taskModal, scheduleTitle);
  }

  function closeTaskModal() {
    resetTaskModalMode();

    closeAllCustomSelects(null, {
      immediate: true,
    });

    closeLayer(taskModal, openModalBtn);
  }

  function getCheckedValue(inputs) {
    return [...inputs].find((input) => input.checked)?.value || "all";
  }

  function checkFilterValue(inputs, value) {
    inputs.forEach((input) => {
      input.checked = input.value === value;
    });
  }

  function renderSortDirectionButton() {
    const isDescending = activeFilters.direction === "desc";

    sortDirectionButton.classList.toggle("is-desc", isDescending);

    const currentDirectionText = isDescending ? "내림차순" : "오름차순";

    const nextDirectionText = isDescending ? "오름차순" : "내림차순";

    sortDirectionButton.setAttribute(
      "aria-label",
      `현재 ${currentDirectionText} 정렬, ${nextDirectionText}으로 변경`,
    );
  }

  function updateSearchPlaceholder() {
    const filterDescriptions = [];

    if (activeFilters.sort !== DEFAULT_FILTERS.sort) {
      filterDescriptions.push(sortLabels[activeFilters.sort]);
    }

    if (activeFilters.status !== "all") {
      filterDescriptions.push(statusLabels[activeFilters.status]);
    }

    if (activeFilters.priority !== "all") {
      filterDescriptions.push(priorityLabels[activeFilters.priority]);
    }

    if (activeFilters.category !== "all") {
      filterDescriptions.push(categoryLabels[activeFilters.category]);
    }

    searchInput.placeholder = "일정 검색";

    const hasVisibleFilter = filterDescriptions.length > 0;

    activeFilterText.hidden = !hasVisibleFilter;

    activeFilterText.textContent = hasVisibleFilter
      ? filterDescriptions.join(", ")
      : "";

    /*
    필터 변경 후 X 표시 상태도 다시 확인
  */
    updateSearchClearButton();
  }

  function updateSearchClearButton() {
    const hasSearchKeyword = searchInput.value.trim().length > 0;
    clearSearchButton.hidden = !hasSearchKeyword;
  }

  function getCustomSelectParts(customSelect) {
    return {
      nativeSelect: customSelect.querySelector(".custom-select-native"),

      trigger: customSelect.querySelector(".custom-select-trigger"),

      valueElement: customSelect.querySelector(".custom-select-value"),

      list: customSelect.querySelector(".custom-select-list"),

      options: [...customSelect.querySelectorAll(".custom-select-option")],
    };
  }

  function setCustomSelectValue(
    customSelect,
    value,
    { emitChange = false } = {},
  ) {
    const { nativeSelect, valueElement, options } =
      getCustomSelectParts(customSelect);

    const selectedOption = options.find(
      (option) => option.dataset.value === value,
    );

    if (!nativeSelect || !selectedOption) {
      return;
    }

    nativeSelect.value = value;
    valueElement.textContent = selectedOption.textContent.trim();

    options.forEach((option) => {
      const isSelected = option === selectedOption;

      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-selected", String(isSelected));
    });

    if (emitChange) {
      nativeSelect.dispatchEvent(
        new Event("change", {
          bubbles: true,
        }),
      );
    }
  }

  function syncCustomSelect(customSelect) {
    const nativeSelect = customSelect.querySelector(".custom-select-native");

    if (!nativeSelect) {
      return;
    }

    setCustomSelectValue(customSelect, nativeSelect.value);
  }

  function syncAllCustomSelects() {
    customSelects.forEach((customSelect) => {
      syncCustomSelect(customSelect);
    });
  }

  function openCustomSelect(customSelect) {
    if (!customSelect) {
      return;
    }

    closeAllCustomSelects(customSelect);

    const { trigger, list } = getCustomSelectParts(customSelect);

    window.clearTimeout(customSelect.closeTimer);

    list.hidden = false;
    trigger.setAttribute("aria-expanded", "true");

    window.requestAnimationFrame(() => {
      customSelect.classList.add("is-open");
    });
  }

  function closeCustomSelect(customSelect, { immediate = false } = {}) {
    if (!customSelect) {
      return;
    }

    const { trigger, list } = getCustomSelectParts(customSelect);

    customSelect.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");

    window.clearTimeout(customSelect.closeTimer);

    if (immediate) {
      list.hidden = true;

      return;
    }

    customSelect.closeTimer = window.setTimeout(() => {
      if (!customSelect.classList.contains("is-open")) {
        list.hidden = true;
      }
    }, CUSTOM_SELECT_DURATION);
  }

  function closeAllCustomSelects(exceptCustomSelect = null, options = {}) {
    customSelects.forEach((customSelect) => {
      if (customSelect !== exceptCustomSelect) {
        closeCustomSelect(customSelect, options);
      }
    });
  }

  function resetFilters({ render = true } = {}) {
    Object.assign(activeFilters, DEFAULT_FILTERS);

    searchInput.value = "";

    categoryFilter.value = DEFAULT_FILTERS.category;
    sortSelect.value = DEFAULT_FILTERS.sort;

    checkFilterValue(priorityFilterInputs, DEFAULT_FILTERS.priority);

    checkFilterValue(statusFilterInputs, DEFAULT_FILTERS.status);

    syncAllCustomSelects();

    renderSortDirectionButton();
    updateSearchPlaceholder();

    if (render) {
      renderTaskBoard();
    }
  }

  function applyFilterValues() {
    activeFilters.category = categoryFilter.value;

    activeFilters.sort = sortSelect.value;

    activeFilters.priority = getCheckedValue(priorityFilterInputs);

    activeFilters.status = getCheckedValue(statusFilterInputs);

    updateSearchPlaceholder();
    renderTaskBoard();

    closeFilterLayer();
  }

  // 카운트다운
  function updateCurrentDate(now) {
    const nextTodayString = toDateString(now);

    if (nextTodayString === todayString) {
      return;
    }

    const previousTodayString = todayString;

    today = now;
    todayString = nextTodayString;

    renderHeaderDate();
    // renderDailyQuote(); 김상우

    if (selectedDate === previousTodayString) {
      selectedDate = todayString;

      currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      renderAll();

      return;
    }

    renderCalendar();
  }

  function updateCountdown() {
    const now = new Date();

    updateCurrentDate(now);

    /* 현재 시간에 맞춰 인사말 변경 */
    updateTimeGreeting(now);

    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );

    const difference = Math.max(0, nextMidnight.getTime() - now.getTime());

    const totalSeconds = Math.floor(difference / 1000);

    const hours = pad(Math.floor(totalSeconds / 3600));

    const minutes = pad(Math.floor((totalSeconds % 3600) / 60));

    const seconds = pad(totalSeconds % 60);

    countdownText.textContent = `${hours}:${minutes}:${seconds}`;
  }

  // 클릭과 키보드 처리
  function handleDateGridClick(event) {
    const dateButton = event.target.closest(".date-cell");

    if (!dateButton || !dateGrid.contains(dateButton)) {
      return;
    }

    const clickedDate = fromDateString(dateButton.dataset.date);

    selectedDate = dateButton.dataset.date;

    currentMonth = new Date(
      clickedDate.getFullYear(),
      clickedDate.getMonth(),
      1,
    );

    closeCalendarPicker();

    renderAll();
  }

  function handleTaskBoardClick(event) {
    const actionTarget = event.target.closest("[data-action]");

    if (!actionTarget || !taskBoard.contains(actionTarget)) {
      return;
    }

    const taskCard = actionTarget.closest(".task-card");

    const taskId = taskCard?.dataset.taskId;

    if (!taskId) {
      return;
    }

    const action = actionTarget.dataset.action;

    /* 완료 체크 */

    if (action === "toggle-done") {
      const targetTask = findTask(taskId);

      if (!targetTask) {
        return;
      }

      updateTaskStatus(taskId, targetTask.status === "done" ? "todo" : "done");

      return;
    }

    /* 점 세 개 메뉴 열기·닫기 */

    if (action === "toggle-task-menu") {
      const taskMenu = actionTarget.closest(".task-menu");

      const actionMenu = taskMenu.querySelector(".task-action-menu");

      const willOpen = actionMenu.hidden;

      closeAllTaskMenus(taskMenu);

      actionMenu.hidden = !willOpen;

      actionTarget.setAttribute("aria-expanded", String(willOpen));

      return;
    }

    /* 일정 수정 */

    if (action === "edit-task") {
      closeAllTaskMenus();
      openEditTaskModal(taskId);

      return;
    }

    /* 일정 삭제 */

    if (action === "delete-task") {
      closeAllTaskMenus();
      deleteTask(taskId);
    }
  }

  function handleTaskBoardChange(event) {
    const statusSelect = event.target.closest(
      'select[data-action="change-status"]',
    );

    if (!statusSelect || !taskBoard.contains(statusSelect)) {
      return;
    }

    const taskId = statusSelect.closest(".task-card")?.dataset.taskId;

    if (taskId) {
      updateTaskStatus(taskId, statusSelect.value);
    }
  }

  function handleEscapeKey(event) {
    if (event.key !== "Escape") {
      return;
    }

    if (mobileMenu.classList.contains("is-open")) {
      closeMobileMenu();

      return;
    }

    if (!nameIntro.hidden) {
      const savedUserName = localStorage.getItem(USER_NAME_KEY);

      if (savedUserName) {
        closeNameIntro();
      }

      return;
    }

    if (!messageModal.hidden) {
      closeMessageModal();

      return;
    }

    const openedTaskMenu = document.querySelector(
      ".task-action-menu:not([hidden])",
    );

    if (openedTaskMenu) {
      closeAllTaskMenus();

      return;
    }

    const openedCustomSelect = document.querySelector(
      "[data-custom-select].is-open",
    );

    if (openedCustomSelect) {
      const trigger = openedCustomSelect.querySelector(
        ".custom-select-trigger",
      );

      closeCustomSelect(openedCustomSelect);
      trigger?.focus();

      return;
    }

    if (!newspaperModal.hidden) {
      closeLayer(newspaperModal, viewNewspaperBtn);

      return;
    }

    if (!taskModal.hidden) {
      closeTaskModal();

      return;
    }

    if (!filterModal.hidden) {
      closeFilterLayer();
    }
  }

  // 모바일 메뉴 열기
  function openMobileMenu() {
    if (!isMobileViewport()) {
      return;
    }

    mobileMenu.classList.add("is-open");
    mobileMenuOverlay.classList.add("is-open");

    mobileMenu.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "메뉴 닫기");

    document.body.classList.add("mobile-menu-open");

    window.requestAnimationFrame(() => {
      mobileMenuClose.focus();
    });
  }

  // 모바일 메뉴 닫기
  function closeMobileMenu({ restoreFocus = true } = {}) {
    mobileMenu.classList.remove("is-open");
    mobileMenuOverlay.classList.remove("is-open");

    mobileMenu.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "메뉴 열기");

    document.body.classList.remove("mobile-menu-open");

    if (restoreFocus) {
      menuButton.focus();
    }
  }

  // 모바일 메뉴 열기·닫기 전환
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains("is-open");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // 이벤트 연결
  function bindEvents() {
    // 모바일 햄버거 메뉴
    menuButton.addEventListener("click", toggleMobileMenu);

    mobileMenuOverlay.addEventListener("click", () => {
      closeMobileMenu();
    });

    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuLinks.forEach((menuLink) => {
          menuLink.classList.remove("is-active");
        });

        link.classList.add("is-active");

        closeMobileMenu({
          restoreFocus: false,
        });
      });
    });

    nameInput.addEventListener("input", () => {
      updateNameConfirmButton();
    });

    nameForm.addEventListener("submit", (event) => {
      event.preventDefault();

      saveUserName();
    });

    // 이름을 더블클릭하면
    // 이름 자리에서 바로 수정

    displayUserName.addEventListener("dblclick", startUserNameEdit);

    // 키보드 Enter 또는 Space로 수정

    displayUserName.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();

      startUserNameEdit();
    });

    calendarPickerButton.addEventListener("click", () => {
      toggleCalendarPicker();
    });

    monthGrid.addEventListener("click", handleMonthPickerClick);

    yearGrid.addEventListener("click", handleYearPickerClick);

    pickerPrevYear.addEventListener("click", () => {
      pickerYear -= 1;

      pickerDecadeStart = Math.floor(pickerYear / 10) * 10;

      renderMonthPicker();
    });

    pickerNextYear.addEventListener("click", () => {
      pickerYear += 1;

      pickerDecadeStart = Math.floor(pickerYear / 10) * 10;

      renderMonthPicker();
    });

    pickerYearButton.addEventListener("click", () => {
      pickerDecadeStart = Math.floor(pickerYear / 10) * 10;

      showYearSelection();
    });

    pickerPrevDecade.addEventListener("click", () => {
      pickerDecadeStart -= 10;

      renderYearPicker();
    });

    pickerNextDecade.addEventListener("click", () => {
      pickerDecadeStart += 10;

      renderYearPicker();
    });

    /* 달력 선택창 바깥 클릭 시 닫기 */
    document.addEventListener("click", (event) => {
      if (calendarPickerPanel.hidden) {
        return;
      }

      const clickedPickerButton = calendarPickerButton.contains(event.target);

      const clickedPickerPanel = calendarPickerPanel.contains(event.target);

      if (!clickedPickerButton && !clickedPickerPanel) {
        closeCalendarPicker();
      }
    });

    /* 경고 팝업 취소 */
    messageCancelButton.addEventListener("click", () => {
      closeMessageModal();
    });

    /* 경고 팝업 확인·삭제 */
    messageConfirmButton.addEventListener("click", () => {
      const confirmAction = messageConfirmAction;

      closeMessageModal({
        restoreFocus: !confirmAction,
      });

      confirmAction?.();
    });

    prevMonthBtn.addEventListener("click", () => {
      closeCalendarPicker();

      currentMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1,
      );

      selectedDate = toDateString(currentMonth);

      renderAll();
    });

    nextMonthBtn.addEventListener("click", () => {
      closeCalendarPicker();

      currentMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1,
      );

      selectedDate = toDateString(currentMonth);

      renderAll();
    });

    calendarMobileToggle?.addEventListener("click", () => {
      if (!isMobileViewport()) {
        return;
      }

      isMobileCalendarExpanded = !isMobileCalendarExpanded;
      updateMobileCalendarLayout();
    });

    window.addEventListener("resize", () => {
      updateMobileCalendarLayout();

      if (!isMobileViewport()) {
        closeMobileMenu({
          restoreFocus: false,
        });
      }
    });
    dateGrid.addEventListener("click", handleDateGridClick);

    taskBoard.addEventListener("click", handleTaskBoardClick);

    taskBoard.addEventListener("change", handleTaskBoardChange);

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    searchInput.addEventListener("input", () => {
      updateSearchClearButton();
      renderTaskBoard();
    });

    clearSearchButton.addEventListener("click", () => {
      /*
    검색어만 삭제하고
    현재 적용된 필터는 유지합니다.
  */
      searchInput.value = "";

      updateSearchClearButton();
      renderTaskBoard();

      searchInput.focus();
    });

    sortDirectionButton.addEventListener("click", () => {
      activeFilters.direction =
        activeFilters.direction === "asc" ? "desc" : "asc";

      renderSortDirectionButton();
      updateSearchPlaceholder();
      renderTaskBoard();
    });

    filterToggle.addEventListener("click", () => {
      filterToggle.setAttribute("aria-expanded", "true");

      openLayer(filterModal, closeFilterModal);
    });

    closeFilterModal.addEventListener("click", closeFilterLayer);

    resetFilterBtn.addEventListener("click", () => {
      resetFilters();
    });

    applyFilterBtn.addEventListener("click", applyFilterValues);

    customSelects.forEach((customSelect) => {
      const { nativeSelect, trigger, list } =
        getCustomSelectParts(customSelect);

      trigger.addEventListener("click", () => {
        if (customSelect.classList.contains("is-open")) {
          closeCustomSelect(customSelect);
        } else {
          openCustomSelect(customSelect);
        }
      });

      list.addEventListener("click", (event) => {
        const option = event.target.closest(".custom-select-option");

        if (!option || !list.contains(option)) {
          return;
        }

        setCustomSelectValue(customSelect, option.dataset.value, {
          emitChange: true,
        });

        closeCustomSelect(customSelect);
        trigger.focus();
      });

      nativeSelect.addEventListener("change", () => {
        syncCustomSelect(customSelect);
      });
    });

    document.addEventListener("click", (event) => {
      customSelects.forEach((customSelect) => {
        if (!customSelect.contains(event.target)) {
          closeCustomSelect(customSelect);
        }
      });
    });

    /* 일정 카드 메뉴 바깥 클릭 시 닫기 */
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".task-menu")) {
        closeAllTaskMenus();
      }
    });

    openModalBtn.addEventListener("click", openTaskModal);

    closeModalBtn.addEventListener("click", closeTaskModal);

    scheduleTitle.addEventListener("input", () => {
      updateCharacterCount(
        scheduleTitle,
        titleCharacterCount,
        TITLE_MAX_LENGTH,
      );
    });

    scheduleMemo.addEventListener("input", () => {
      updateCharacterCount(scheduleMemo, memoCharacterCount, MEMO_MAX_LENGTH);
    });
    resetFormBtn.addEventListener("click", resetTaskForm);

    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = scheduleTitle.value.trim();
      const memo = scheduleMemo.value.trim();

      const category = scheduleCategory.value;
      const date = scheduleDate.value;
      const time = scheduleTime.value;
      const priority = schedulePriority.value;
      const nextStatus = scheduleStatus.value;

      const isEditing = Boolean(editingTaskId);

      if (!title || !category || !date || !time) {
        openMessageModal({
          variant: "notice",

          title: "입력 내용을 확인해주세요",

          message: "제목, 분류, 날짜, 시간을 모두 입력해주세요.",

          confirmText: "확인",
          returnFocus: scheduleTitle,
        });

        return;
      }

      if (title.length > TITLE_MAX_LENGTH) {
        openMessageModal({
          variant: "notice",

          title: "제목이 너무 깁니다",

          message: `할 일 제목은 ${TITLE_MAX_LENGTH}자까지 입력할 수 있습니다.`,

          confirmText: "확인",
          returnFocus: scheduleTitle,
        });

        return;
      }

      if (memo.length > MEMO_MAX_LENGTH) {
        openMessageModal({
          variant: "notice",

          title: "메모가 너무 깁니다",

          message: `할 일 메모는 ${MEMO_MAX_LENGTH}자까지 입력할 수 있습니다.`,

          confirmText: "확인",
          returnFocus: scheduleMemo,
        });

        return;
      }

      if (editingTaskId) {
        /* 기존 일정 수정 */

        const targetTask = findTask(editingTaskId);

        if (!targetTask) {
          return;
        }

        const previousStatus = targetTask.status;

        targetTask.title = title;
        targetTask.category = category;
        targetTask.date = date;
        targetTask.time = time;
        targetTask.priority = priority;
        targetTask.status = nextStatus;
        targetTask.memo = memo;

        /* 일정을 수정한 현재 시각 저장 */
        targetTask.updatedAt = Date.now();

        if (nextStatus === "done" && previousStatus !== "done") {
          targetTask.completedAt = Date.now();
        }

        if (nextStatus !== "done") {
          targetTask.completedAt = null;
        }
      } else {
        /* 새 일정 등록 */

        const createdAt = Date.now();

        tasks.push({
          id: createTaskId(),
          title,
          category,
          date,
          time,
          priority,
          status: nextStatus,
          memo,

          createdAt,

          /* 새 일정은 아직 수정되지 않음 */
          updatedAt: null,

          completedAt: nextStatus === "done" ? createdAt : null,
        });
      }

      /*
        여기부터는 신규 등록과 수정에
        공통으로 실행되는 코드
      */

      if (!isEditing) {
        selectedDate = date;

        const changedDate = fromDateString(date);

        currentMonth = new Date(
          changedDate.getFullYear(),
          changedDate.getMonth(),
          1,
        );
      }

      resetFilters({
        render: false,
      });

      saveTasks();

      resetTaskForm();
      closeTaskModal();

      renderAll();
    });

    resetTasksBtn.addEventListener("click", () => {
      const selectedDateTasks = getTasksForDate(selectedDate);

      if (selectedDateTasks.length === 0) {
        openMessageModal({
          variant: "notice",

          title: "초기화할 일정이 없습니다",

          message:
            "선택한 날짜에 등록된 일정이 없어 " + "초기화할 수 없습니다.",

          confirmText: "확인",
          returnFocus: resetTasksBtn,
        });

        return;
      }

      openMessageModal({
        variant: "danger",

        title: "모든 일정을 삭제할까요?",

        message:
          `${formatSelectedDate(selectedDate)}의 ` +
          `일정 ${selectedDateTasks.length}개가 ` +
          "모두 삭제됩니다.",

        confirmText: "전체 삭제",
        cancelText: "취소",
        showCancel: true,
        returnFocus: resetTasksBtn,

        onConfirm: () => {
          tasks = tasks.filter((task) => task.date !== selectedDate);

          saveTasks();

          renderTaskChanges(selectedDate);
        },
      });
    });

    viewNewspaperBtn.addEventListener("click", () => {
      renderNewspaper();

      openLayer(newspaperModal, closeNewspaper);
    });

    closeNewspaper.addEventListener("click", () => {
      closeLayer(newspaperModal, viewNewspaperBtn);
    });

    const layerSettings = new Map([
      [filterModal, closeFilterLayer],
      [taskModal, closeTaskModal],
      [messageModal, closeMessageModal],
      [
        newspaperModal,
        () => {
          closeLayer(newspaperModal, viewNewspaperBtn);
        },
      ],
    ]);

    layerSettings.forEach((closeHandler, layer) => {
      layer.addEventListener("click", (event) => {
        if (event.target === layer) {
          closeHandler();
        }
      });
    });

    document.addEventListener("keydown", handleEscapeKey);
  }

  // 초기 실행
  function init() {
    scheduleTitle.maxLength = TITLE_MAX_LENGTH;
    scheduleMemo.maxLength = MEMO_MAX_LENGTH;

    initializeUserName();

    updateTaskFormCharacterCounts();

    sortSelect.value = DEFAULT_FILTERS.sort;

    syncAllCustomSelects();

    renderSortDirectionButton();
    updateSearchPlaceholder();

    renderHeaderDate();
    // renderDailyQuote();김상우
    renderAll();
    updateCountdown();
    bindEvents();

    window.setInterval(updateCountdown, 1000);
  }

  init();
});

// 수정
// 하루마다 바뀌는 명언
document.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.querySelector(".word");

  const quotes = [
    "작은 실천이 <br> 큰 변화를 만든다.",
    "꾸준함은 <br> 가장 강력한 재능이다.",
    "오늘의 한 걸음이 <br> 내일의 방향이 된다.",
    "완벽보다 완료가 <br> 당신을 앞으로 보낸다.",
    "시작하는 용기가 <br> 하루를 바꾼다.",
    "지금의 집중이 <br> 미래의 여유를 만든다.",
    "기록하는 사람은 결국 <br> 성장의 증거를 가진다.",
    "천천히 가도 <br> 멈추지 않으면 도착한다.",
    "오늘 끝낸 일 하나가 <br> 자신감을 키운다.",
    "좋은 하루의 기사는 <br> 작은 실천에서 시작됩니다.",
    "삶이 있는 한 <br> 희망은 있다 ",
    "우리집 강아지는 <br> 복슬강아지",
  ];

  // 직전에 표시했던 명언 번호
  const previousIndex = Number(sessionStorage.getItem("previousQuoteIndex"));

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (quotes.length > 1 && randomIndex === previousIndex);

  quoteElement.innerHTML = quotes[randomIndex];

  sessionStorage.setItem("previousQuoteIndex", randomIndex);
});

const tabletNewspaperBtn = document.getElementById("tabletNewspaperBtn");

const editionCard = document.getElementById("report");

tabletNewspaperBtn.addEventListener("click", () => {
  const isOpen = editionCard.classList.toggle("is-open");

  document.body.classList.toggle("edition-open", isOpen);

  tabletNewspaperBtn.setAttribute("aria-expanded", String(isOpen));
});
const closeTabletNewspaper = document.getElementById("closeTabletNewspaper");

closeTabletNewspaper.addEventListener("click", () => {
  editionCard.classList.remove("is-open");

  document.body.classList.remove("edition-open");

  tabletNewspaperBtn.setAttribute("aria-expanded", "false");
});
const editionViewButton = document.getElementById("viewNewspaperBtn");

editionViewButton.addEventListener("click", () => {
  // 현재 열려 있는 YESTERDAY'S EDITION 신문칸 닫기
  editionCard.classList.remove("is-open");

  // 신문칸 열림 상태 제거
  document.body.classList.remove("edition-open");

  // 동그란 버튼의 상태도 닫힘으로 변경
  tabletNewspaperBtn.setAttribute("aria-expanded", "false");
});
