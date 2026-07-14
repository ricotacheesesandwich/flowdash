// dark mode
const bodyElement = document.body;
const darkBtn = document.querySelector(".circle1");
const lightBtn = document.querySelector(".circle2");

if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    bodyElement.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  });
}

if (lightBtn) {
  lightBtn.addEventListener("click", () => {
    bodyElement.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  });
}

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

  const greetingLabelName = document.querySelector("#greetingLabelName");

  const displayUserName = document.querySelector("#displayUserName");
  const DEFAULT_FILTERS = Object.freeze({
    category: "all",
    sort: "created",
    direction: "asc",
    priority: "all",
    status: "all",
  });

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

  // 오름차순·내림차순
  const sortDirectionButton = document.querySelector("#sortDirectionButton");

  const sortDirectionText = document.querySelector("#sortDirectionText");

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

  /* 카드 하단의 시간 한 줄 생성 */
  function createTaskHistoryRow(label, timestamp) {
    const row = document.createElement("div");
    const icon = document.createElement("span");
    const time = document.createElement("time");

    const formattedTime = formatTaskTimestamp(timestamp);

    row.className = "task-history-row";
    row.setAttribute("aria-label", `${label}: ${formattedTime}`);

    icon.className = "task-history-icon";
    icon.setAttribute("aria-hidden", "true");

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

    renderDateDots(button, statusMap.get(dateString));

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

    for (let index = firstDay - 1; index >= 0; index -= 1) {
      const day = prevLastDay - index;

      fragment.append(
        createDateButton(new Date(year, month - 1, day), month, statusMap),
      );

      cellCount += 1;
    }

    for (let day = 1; day <= lastDay; day += 1) {
      fragment.append(
        createDateButton(new Date(year, month, day), month, statusMap),
      );

      cellCount += 1;
    }

    const nextDays = 42 - cellCount;

    for (let day = 1; day <= nextDays; day += 1) {
      fragment.append(
        createDateButton(new Date(year, month + 1, day), month, statusMap),
      );
    }

    dateGrid.replaceChildren(fragment);
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

    renderDateDots(dateButton, getStatusesForDate(dateString));
  }

  // 사용자 이름 관리
  function normalizeUserName(value) {
    return value.trim().replace(/\s+/g, " ");
  }

  function renderUserName(name) {
    currentUserName = name;

    greetingLabelName.textContent = name;
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

  function openNameIntro(mode = "create") {
    const isEditMode = mode === "edit";

    nameIntro.dataset.mode = mode;
    nameIntro.hidden = false;

    document.body.classList.add("name-intro-open");

    nameInput.value = isEditMode ? currentUserName : "";

    nameConfirmButton.textContent = isEditMode ? "SAVE" : "CONFIRM";

    nameIntroError.textContent = "";

    updateNameConfirmButton();

    window.requestAnimationFrame(() => {
      nameInput.focus();

      if (isEditMode) {
        nameInput.select();
      }
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

  function initializeUserName() {
    const storedName = localStorage.getItem(USER_NAME_KEY);

    const savedUserName = normalizeUserName(storedName || "");

    const invalidNames = ["", "undefined", "null", "USER"];

    const hasValidName = !invalidNames.includes(savedUserName);

    /*
    저장된 이름이 없거나 잘못된 값이면
    최초 이름 설정 화면 표시
  */
    if (!hasValidName) {
      localStorage.removeItem(USER_NAME_KEY);

      openNameIntro("create");

      return;
    }

    /*
    정상적인 이름이 저장되어 있으면
    홈 화면에 이름 적용 후 인트로 숨김
  */
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="7"></circle>
        <path d="m20 20-4-4"></path>
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

    /* 제목 */

    title.className = "task-title";
    title.textContent = task.title;

    /* 메모 */

    memo.className = "task-desc";
    memo.textContent = task.memo || "등록된 메모가 없습니다.";

    /* 등록·완료 시간 */

    history.className = "task-history";

    history.append(createTaskHistoryRow("등록 시간", task.createdAt));

    if (task.completedAt) {
      history.append(createTaskHistoryRow("완료 시간", task.completedAt));
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

    footer.className = "task-footer";
    footer.append(history, statusSelect);

    article.append(top, title, memo, footer);

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

  function renderEditionCard(state) {
    const { selectedTasks, counts, total, rate } = state;

    editionSubText.textContent = `${formatSelectedDate(selectedDate)} 기록`;

    publishTime.textContent = "00:00 예정";

    publishRate.textContent = `${rate}%`;

    publishDuration.textContent = calculateTimeSpan(selectedTasks);

    publishDoneCount.textContent = `${counts.done}개 / ${total}개`;

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

    newspaperTitle.textContent = "오늘의 일정 신문";

    const issue = document.createElement("div");

    const issueDate = document.createElement("span");

    const issueNumber = document.createElement("span");

    const headline = document.createElement("h3");

    const lead = document.createElement("p");

    const rule = document.createElement("hr");

    const columns = document.createElement("div");

    const stats = document.createElement("div");

    issue.className = "newspaper-issue";

    issueDate.textContent = formatKoreanDate(selectedDate);

    issueNumber.textContent = `DAILY ISSUE · ${selectedDate.replaceAll(
      "-",
      "",
    )}`;

    issue.append(issueDate, issueNumber);

    headline.className = "newspaper-headline";

    if (total === 0) {
      headline.textContent = "아직 기록되지 않은 하루";
    } else if (counts.done === total) {
      headline.textContent = "오늘의 모든 일정, 성공적으로 마무리";
    } else {
      headline.textContent = `${total}개의 일정 속에서 이어진 오늘의 기록`;
    }

    lead.className = "newspaper-lead";

    lead.textContent =
      total === 0
        ? "선택한 날짜에 등록된 일정이 없습니다. 새 일정을 등록하면 이곳에 하루의 기록이 기사처럼 정리됩니다."
        : `선택한 날짜에는 총 ${total}개의 일정이 등록되었으며, 그중 ${counts.done}개가 완료되었습니다. 현재 달성률은 ${rate}%입니다.`;

    rule.className = "newspaper-rule";

    columns.className = "newspaper-columns";

    if (total === 0) {
      const emptyArticle = document.createElement("article");

      const emptyTitle = document.createElement("h3");

      const emptyText = document.createElement("p");

      emptyArticle.className = "newspaper-article";

      emptyTitle.textContent = "등록된 기사가 없습니다";

      emptyText.textContent =
        "새 일정 등록 버튼을 눌러 오늘의 첫 기사를 작성해보세요.";

      emptyArticle.append(emptyTitle, emptyText);

      columns.append(emptyArticle);
    } else {
      [...selectedTasks]
        .sort((firstTask, secondTask) =>
          firstTask.time.localeCompare(secondTask.time),
        )
        .forEach((task) => {
          const article = document.createElement("article");

          const articleTitle = document.createElement("h3");

          const articleText = document.createElement("p");

          article.className = "newspaper-article";

          articleTitle.textContent = `${task.time} · ${task.title}`;

          articleText.textContent = `${
            categoryLabels[task.category] || task.category
          } 일정으로 등록되었으며 중요도는 ${
            priorityLabels[task.priority] || task.priority
          }, 현재 상태는 ${statusLabels[task.status] || task.status}입니다. ${
            task.memo || "추가 메모는 기록되지 않았습니다."
          }`;

          article.append(articleTitle, articleText);

          columns.append(article);
        });
    }

    stats.className = "newspaper-stats";

    [
      ["전체 일정", `${total}개`],
      ["할 일", `${counts.todo}개`],
      ["진행 중", `${counts.progress}개`],
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

    newspaperBody.replaceChildren(issue, headline, lead, rule, columns, stats);
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
    const currentDirection = activeFilters.direction;

    const nextDirection = currentDirection === "asc" ? "desc" : "asc";

    sortDirectionText.textContent = directionLabels[currentDirection];

    sortDirectionButton.setAttribute(
      "aria-label",
      `현재 ${directionLabels[currentDirection]} 정렬, ` +
        `${directionLabels[nextDirection]}으로 변경`,
    );

    sortDirectionButton.classList.toggle(
      "is-desc",
      currentDirection === "desc",
    );
  }

  function updateSearchPlaceholder() {
    const filterDescriptions = [];

    if (activeFilters.category !== "all") {
      filterDescriptions.push(categoryLabels[activeFilters.category]);
    }

    if (activeFilters.priority !== "all") {
      filterDescriptions.push(
        `중요도 ${priorityLabels[activeFilters.priority]}`,
      );
    }

    if (activeFilters.status !== "all") {
      filterDescriptions.push(statusLabels[activeFilters.status]);
    }

    const hasChangedSetting =
      filterDescriptions.length > 0 ||
      activeFilters.sort !== DEFAULT_FILTERS.sort ||
      activeFilters.direction !== DEFAULT_FILTERS.direction;

    if (!hasChangedSetting) {
      searchInput.placeholder = "일정 검색";

      return;
    }

    filterDescriptions.push(
      sortLabels[activeFilters.sort],
      directionLabels[activeFilters.direction],
    );

    searchInput.placeholder = `적용: ${filterDescriptions.join(" · ")}`;
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

  // 이벤트 연결
  function bindEvents() {
    nameInput.addEventListener("input", () => {
      updateNameConfirmButton();
    });

    nameForm.addEventListener("submit", (event) => {
      event.preventDefault();

      saveUserName();
    });

    /* 홈 화면 이름을 더블클릭하면 수정 화면 열기 */
    displayUserName.addEventListener("dblclick", () => {
      openNameIntro("edit");
    });

    /*
  키보드 사용자는 이름에 포커스 후
  Enter 또는 Space로 수정 화면을 열 수 있음
*/
    displayUserName.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();

      openNameIntro("edit");
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

    dateGrid.addEventListener("click", handleDateGridClick);

    taskBoard.addEventListener("click", handleTaskBoardClick);

    taskBoard.addEventListener("change", handleTaskBoardChange);

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    function updateClearSearchButton() {
      clearSearchButton.hidden = searchInput.value.length === 0;
    }

    searchInput.addEventListener("input", () => {
      updateClearSearchButton();
      renderTaskBoard();
    });

    clearSearchButton.addEventListener("click", () => {
      searchInput.value = "";

      updateClearSearchButton();
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

      if (!title || !category || !date || !time) {
        openMessageModal({
          variant: "notice",

          title: "입력 내용을 확인해주세요",

          message: "제목, 분류, 날짜, 시간을 " + "모두 입력해주세요.",

          confirmText: "확인",
          returnFocus: scheduleTitle,
        });

        return;
      }

      if (title.length > TITLE_MAX_LENGTH) {
        openMessageModal({
          variant: "notice",

          title: "제목이 너무 깁니다",

          message:
            `할 일 제목은 ${TITLE_MAX_LENGTH}자까지 ` + "입력할 수 있습니다.",

          confirmText: "확인",
          returnFocus: scheduleTitle,
        });

        return;
      }

      if (memo.length > MEMO_MAX_LENGTH) {
        openMessageModal({
          variant: "notice",

          title: "메모가 너무 깁니다",

          message:
            `할 일 메모는 ${MEMO_MAX_LENGTH}자까지 ` + "입력할 수 있습니다.",

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
          completedAt: nextStatus === "done" ? createdAt : null,
        });
      }

      selectedDate = date;

      const changedDate = fromDateString(date);

      currentMonth = new Date(
        changedDate.getFullYear(),
        changedDate.getMonth(),
        1,
      );

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
/* 하루마다 바뀌는 명언
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
    "우리집 강아지는 <br> 복슬강아지"
  ];

  // 직전에 표시했던 명언 번호
  const previousIndex = Number(sessionStorage.getItem("previousQuoteIndex"));

  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (quotes.length > 1 && randomIndex === previousIndex);

  quoteElement.innerHTML = quotes[randomIndex];

  sessionStorage.setItem("previousQuoteIndex", randomIndex);
});*/