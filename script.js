/** 버전: 16.3 Full | 최종 수정: 초기화 시 날짜/시간 자동 입력 및 주유내역 함수 통합 */

// ==========================================
// 1. DOM 요소 선택 (변수 선언)
// ==========================================
const recordForm = document.getElementById('record-form');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const typeSelect = document.getElementById('type');
const fromCenterInput = document.getElementById('from-center');
const toCenterInput = document.getElementById('to-center');
const centerDatalist = document.getElementById('center-list');
const manualDistanceInput = document.getElementById('manual-distance');
const addressDisplay = document.getElementById('address-display');

const transportDetails = document.getElementById('transport-details');
const fuelDetails = document.getElementById('fuel-details');
const expenseDetails = document.getElementById('expense-details');
const supplyDetails = document.getElementById('supply-details');
const costInfoFieldset = document.getElementById('cost-info-fieldset');
const costWrapper = document.getElementById('cost-wrapper');
const incomeWrapper = document.getElementById('income-wrapper');

const fuelUnitPriceInput = document.getElementById('fuel-unit-price');
const fuelLitersInput = document.getElementById('fuel-liters');
const fuelBrandSelect = document.getElementById('fuel-brand');
const expenseItemInput = document.getElementById('expense-item');
const supplyItemInput = document.getElementById('supply-item');
const supplyMileageInput = document.getElementById('supply-mileage');
const costInput = document.getElementById('cost');
const incomeInput = document.getElementById('income');

const tripActions = document.getElementById('trip-actions');
const generalActions = document.getElementById('general-actions');
const editActions = document.getElementById('edit-actions');

const btnWaiting = document.getElementById('btn-waiting');
const btnStartTrip = document.getElementById('btn-start-trip');
const btnEndTrip = document.getElementById('btn-end-trip');
const btnSaveGeneral = document.getElementById('btn-save-general');
const btnEditEndTrip = document.getElementById('btn-edit-end-trip');
const btnUpdateRecord = document.getElementById('btn-update-record');
const btnDeleteRecord = document.getElementById('btn-delete-record');
const btnCancelEdit = document.getElementById('btn-cancel-edit');

const editModeIndicator = document.getElementById('edit-mode-indicator');
const editIdInput = document.getElementById('edit-id');

const mainPage = document.getElementById('main-page');
const settingsPage = document.getElementById('settings-page');
const goToSettingsBtn = document.getElementById('go-to-settings-btn');
const backToMainBtn = document.getElementById('back-to-main-btn');
const refreshBtn = document.getElementById('refresh-btn');

const tabBtns = document.querySelectorAll('.tab-btn');
const viewContents = document.querySelectorAll('.view-content');

const todayDatePicker = document.getElementById('today-date-picker');
const todaySummaryDiv = document.getElementById('today-summary');
const todayTbody = document.querySelector('#today-records-table tbody');
const prevDayBtn = document.getElementById('prev-day-btn');
const nextDayBtn = document.getElementById('next-day-btn');

const dailyYearSelect = document.getElementById('daily-year-select');
const dailyMonthSelect = document.getElementById('daily-month-select');
const dailySummaryDiv = document.getElementById('daily-summary');
const dailyTbody = document.querySelector('#daily-summary-table tbody');
const weeklyYearSelect = document.getElementById('weekly-year-select');
const weeklyMonthSelect = document.getElementById('weekly-month-select');
const weeklySummaryDiv = document.getElementById('weekly-summary');
const weeklyTbody = document.querySelector('#weekly-summary-table tbody');
const monthlyYearSelect = document.getElementById('monthly-year-select');
const monthlyYearlySummaryDiv = document.getElementById('monthly-yearly-summary');
const monthlyTbody = document.querySelector('#monthly-summary-table tbody');

const toggleCenterManagementBtn = document.getElementById('toggle-center-management');
const centerManagementBody = document.getElementById('center-management-body');
const centerListContainer = document.getElementById('center-list-container');
const newCenterNameInput = document.getElementById('new-center-name');
const newCenterAddressInput = document.getElementById('new-center-address');
const newCenterMemoInput = document.getElementById('new-center-memo');
const addCenterBtn = document.getElementById('add-center-btn');
const centerSearchInput = document.getElementById('center-search-input');

const togglePrintManagementBtn = document.getElementById('toggle-print-management');
const printYearSelect = document.getElementById('print-year-select');
const printMonthSelect = document.getElementById('print-month-select');
const printFirstHalfBtn = document.getElementById('print-first-half-btn');
const printSecondHalfBtn = document.getElementById('print-second-half-btn');
const printFullMonthBtn = document.getElementById('print-full-month-btn');
const printFirstHalfDetailBtn = document.getElementById('print-first-half-detail-btn');
const printSecondHalfDetailBtn = document.getElementById('print-second-half-detail-btn');
const printFullMonthDetailBtn = document.getElementById('print-full-month-detail-btn');

const toggleBatchApplyBtn = document.getElementById('toggle-batch-apply');
const batchApplyBtn = document.getElementById('batch-apply-btn');
const batchFromCenterInput = document.getElementById('batch-from-center');
const batchToCenterInput = document.getElementById('batch-to-center');
const batchIncomeInput = document.getElementById('batch-income');
const batchStatus = document.getElementById('batch-status');

const toggleSubsidyManagementBtn = document.getElementById('toggle-subsidy-management');
const subsidyLimitInput = document.getElementById('subsidy-limit');
const subsidySaveBtn = document.getElementById('subsidy-save-btn');
const subsidySummaryDiv = document.getElementById('subsidy-summary');
const subsidyRecordsContainer = document.getElementById('subsidy-records-container');
const subsidyRecordsList = document.getElementById('subsidy-records-list');
const subsidyLoadMoreContainer = document.getElementById('subsidy-load-more-container');

const toggleMileageManagementBtn = document.getElementById('toggle-mileage-management');
const mileageCorrectionInput = document.getElementById('mileage-correction');
const mileageCorrectionSaveBtn = document.getElementById('mileage-correction-save-btn');
const mileageSummaryControls = document.getElementById('mileage-summary-controls');
const mileageSummaryCards = document.getElementById('mileage-summary-cards');

const toggleDataManagementBtn = document.getElementById('toggle-data-management');
const exportJsonBtn = document.getElementById('export-json-btn');
const importJsonBtn = document.getElementById('import-json-btn');
const importFileInput = document.getElementById('import-file-input');
const clearBtn = document.getElementById('clear-btn');

const currentMonthTitle = document.getElementById('current-month-title');
const currentMonthOperatingDays = document.getElementById('current-month-operating-days');
const currentMonthTripCount = document.getElementById('current-month-trip-count');
const currentMonthTotalMileage = document.getElementById('current-month-total-mileage');
const currentMonthIncome = document.getElementById('current-month-income');
const currentMonthExpense = document.getElementById('current-month-expense');
const currentMonthNetIncome = document.getElementById('current-month-net-income');
const currentMonthAvgEconomy = document.getElementById('current-month-avg-economy');
const currentMonthCostPerKm = document.getElementById('current-month-cost-per-km');
const cumulativeOperatingDays = document.getElementById('cumulative-operating-days');
const cumulativeTripCount = document.getElementById('cumulative-trip-count');
const cumulativeTotalMileage = document.getElementById('cumulative-total-mileage');
const cumulativeIncome = document.getElementById('cumulative-income');
const cumulativeExpense = document.getElementById('cumulative-expense');
const cumulativeNetIncome = document.getElementById('cumulative-net-income');
const cumulativeAvgEconomy = document.getElementById('cumulative-avg-economy');
const cumulativeCostPerKm = document.getElementById('cumulative-cost-per-km');

const SUBSIDY_PAGE_SIZE = 10;
let displayedSubsidyCount = 0;

// ==========================================
// 2. 유틸리티 함수
// ==========================================
const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getCurrentTimeString = () => {
    const d = new Date();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};
const formatToManwon = (val) => isNaN(val) ? '0' : Math.round(val / 10000).toLocaleString('ko-KR');

function showToast(msg) {
    const toast = document.getElementById('toast-notification');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1500);
}

// ==========================================
// 3. 데이터 로드 및 저장
// ==========================================
let MEM_RECORDS = [];
let MEM_LOCATIONS = {};
let MEM_FARES = {};
let MEM_CENTERS = [];
let MEM_DISTANCES = {};
let MEM_COSTS = {};

function loadAllData() {
    MEM_RECORDS = JSON.parse(localStorage.getItem('records')) || [];
    MEM_LOCATIONS = JSON.parse(localStorage.getItem('saved_locations')) || {};
    MEM_FARES = JSON.parse(localStorage.getItem('saved_fares')) || {};
    MEM_CENTERS = JSON.parse(localStorage.getItem('logistics_centers')) || [];
    if (MEM_CENTERS.length === 0) MEM_CENTERS = ['안성', '안산', '용인', '이천', '인천'];
    MEM_DISTANCES = JSON.parse(localStorage.getItem('saved_distances')) || {};
    MEM_COSTS = JSON.parse(localStorage.getItem('saved_costs')) || {};
    syncHistoryToAutocompleteDB();
}

function saveData() {
    MEM_RECORDS.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    localStorage.setItem('records', JSON.stringify(MEM_RECORDS));
    localStorage.setItem('saved_locations', JSON.stringify(MEM_LOCATIONS));
    localStorage.setItem('saved_fares', JSON.stringify(MEM_FARES));
    localStorage.setItem('logistics_centers', JSON.stringify(MEM_CENTERS));
    localStorage.setItem('saved_distances', JSON.stringify(MEM_DISTANCES));
    localStorage.setItem('saved_costs', JSON.stringify(MEM_COSTS));
}

function updateLocationData(name, address, memo) {
    if (!name) return;
    const trimmed = name.trim();
    if (!MEM_CENTERS.includes(trimmed)) {
        MEM_CENTERS.push(trimmed);
        MEM_CENTERS.sort();
    }
    if (address || memo) {
        MEM_LOCATIONS[trimmed] = { ...(MEM_LOCATIONS[trimmed] || {}), address: address || (MEM_LOCATIONS[trimmed]?.address || ''), memo: memo || (MEM_LOCATIONS[trimmed]?.memo || '') };
    }
    saveData();
    populateCenterDatalist();
    if (!centerManagementBody.classList.contains('hidden')) displayCenterList();
}
function populateCenterDatalist() {
    centerDatalist.innerHTML = MEM_CENTERS.map(c => `<option value="${c}"></option>`).join('');
}
function addCenter(newCenter, address = '', memo = '') {
    const trimmed = newCenter?.trim();
    if (!trimmed) return;
    updateLocationData(trimmed, address, memo);
}

function syncHistoryToAutocompleteDB() {
    let updated = false;
    MEM_RECORDS.forEach(r => {
        if (r.type === '화물운송' && r.from && r.to) {
            const key = `${r.from.trim()}-${r.to.trim()}`;
            if (r.income > 0 && !MEM_FARES[key]) { MEM_FARES[key] = r.income; updated = true; }
            if (r.distance > 0 && !MEM_DISTANCES[key]) { MEM_DISTANCES[key] = r.distance; updated = true; }
            if (r.cost > 0 && !MEM_COSTS[key]) { MEM_COSTS[key] = r.cost; updated = true; }
        }
    });
    if (updated) saveData();
}

// ==========================================
// 4. UI 및 폼 제어
// ==========================================
function toggleUI() {
    const type = typeSelect.value;
    const isEditMode = !editModeIndicator.classList.contains('hidden');

    [transportDetails, fuelDetails, supplyDetails, expenseDetails, costInfoFieldset, tripActions, generalActions, editActions].forEach(el => el.classList.add('hidden'));
    
    if (type === '화물운송' || type === '대기') {
        transportDetails.classList.remove('hidden');
        costInfoFieldset.classList.remove('hidden');
        costWrapper.classList.add('hidden');  // 지출 숨김
        incomeWrapper.classList.remove('hidden');
        
        if (!isEditMode) {
            tripActions.classList.remove('hidden');
            if(type === '화물운송') btnWaiting.classList.remove('hidden');
        }
    } else {
        costInfoFieldset.classList.remove('hidden');
        incomeWrapper.classList.add('hidden');
        costWrapper.classList.remove('hidden');

        if (type === '주유소') {
            fuelDetails.classList.remove('hidden');
            if (!isEditMode) generalActions.classList.remove('hidden');
        } else if (type === '소모품') {
            supplyDetails.classList.remove('hidden');
            if (!isEditMode) generalActions.classList.remove('hidden');
        } else if (type === '지출') {
            expenseDetails.classList.remove('hidden');
            if (!isEditMode) generalActions.classList.remove('hidden');
        }
    }

    if (isEditMode) {
        editActions.classList.remove('hidden');
        if (type === '주유소' || type === '소모품' || type === '지출') {
            btnEditEndTrip.classList.add('hidden');
        } else {
            btnEditEndTrip.classList.remove('hidden');
        }
    }
}

function updateAddressDisplay() {
    const fromValue = fromCenterInput.value;
    const toValue = toCenterInput.value;
    const fromLoc = MEM_LOCATIONS[fromValue] || {};
    const toLoc = MEM_LOCATIONS[toValue] || {};
    
    let html = '';
    if (fromLoc.address) html += `<div class="address-clickable" data-address="${fromLoc.address}">[상] ${fromLoc.address}</div>`;
    if (fromLoc.memo) html += `<div class="memo-display">[상] ${fromLoc.memo}</div>`;
    if (toLoc.address) html += `<div class="address-clickable" data-address="${toLoc.address}">[하] ${toLoc.address}</div>`;
    if (toLoc.memo) html += `<div class="memo-display">[하] ${toLoc.memo}</div>`;
    addressDisplay.innerHTML = html;
}

function copyTextToClipboard(text, msg) {
    navigator.clipboard.writeText(text).then(() => showToast(msg))
    .catch(err => console.log('복사 실패:', err));
}

[fromCenterInput, toCenterInput].forEach(input => {
    input.addEventListener('input', () => {
        const from = fromCenterInput.value.trim();
        const to = toCenterInput.value.trim();

        if((typeSelect.value === '화물운송' || typeSelect.value === '대기') && from && to) {
            const key = `${from}-${to}`;
            if(MEM_FARES[key]) incomeInput.value = (MEM_FARES[key]/10000).toFixed(2);
            if(MEM_DISTANCES[key]) manualDistanceInput.value = MEM_DISTANCES[key];
            if(MEM_COSTS[key]) costInput.value = (MEM_COSTS[key]/10000).toFixed(2);
        }
        
        updateAddressDisplay();
        
        const val = input.value.trim();
        if(val) {
            const loc = MEM_LOCATIONS[val];
            if(loc && loc.address) {
                // 자동 복사 (안내 없음)
                navigator.clipboard.writeText(loc.address).catch(()=>{});
            }
        }
    });
});

addressDisplay.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    if(e.target.classList.contains('address-clickable')) {
        copyTextToClipboard(e.target.dataset.address, '주소 복사됨');
    }
});

function getFormDataWithoutTime() {
    const fromValue = fromCenterInput.value.trim();
    const toValue = toCenterInput.value.trim();
    if(fromValue) addCenter(fromValue);
    if(toValue) addCenter(toValue);

    return {
        type: typeSelect.value,
        from: fromValue,
        to: toValue,
        distance: parseFloat(manualDistanceInput.value) || 0,
        cost: Math.round((parseFloat(costInput.value) || 0) * 10000),
        income: Math.round((parseFloat(incomeInput.value) || 0) * 10000),
        liters: parseFloat(fuelLitersInput.value) || 0,
        unitPrice: parseInt(fuelUnitPriceInput.value) || 0,
        brand: fuelBrandSelect.value || '',
        supplyItem: supplyItemInput.value || '',
        mileage: parseInt(supplyMileageInput.value) || 0,
        expenseItem: expenseItemInput.value || ''
    };
}

// 폼 초기화 함수 (날짜, 시간 자동 세팅 포함)
function resetForm() {
    recordForm.reset();
    editIdInput.value = '';
    editModeIndicator.classList.add('hidden');
    
    // 여기가 날짜/시간 자동 설정의 핵심입니다
    dateInput.value = getTodayString();
    timeInput.value = getCurrentTimeString();
    
    dateInput.disabled = false;
    timeInput.disabled = false;
    addressDisplay.innerHTML = '';
    toggleUI();
}

function addRecord(record) {
    if (record.type === '화물운송' && record.from && record.to) {
        const key = `${record.from}-${record.to}`;
        if(record.income > 0) MEM_FARES[key] = record.income;
        if(record.distance > 0) MEM_DISTANCES[key] = record.distance;
        if(record.cost > 0) MEM_COSTS[key] = record.cost;
    }
    MEM_RECORDS.push(record);
    saveData();
    showToast('저장되었습니다.');
    resetForm();
    updateAllDisplays();
}

// ==========================================
// 5. 버튼 이벤트 핸들러
// ==========================================
btnWaiting.addEventListener('click', () => {
    const formData = getFormDataWithoutTime();
    addRecord({ id: Date.now(), date: getTodayString(), time: getCurrentTimeString(), ...formData, type: '대기' });
});

btnStartTrip.addEventListener('click', () => {
    const formData = getFormDataWithoutTime();
    addRecord({ id: Date.now(), date: getTodayString(), time: getCurrentTimeString(), ...formData });
});

btnEndTrip.addEventListener('click', () => {
    addRecord({ id: Date.now(), date: getTodayString(), time: getCurrentTimeString(), type: '운행종료', distance: 0, cost: 0, income: 0 });
});

btnSaveGeneral.addEventListener('click', () => {
    const formData = getFormDataWithoutTime();
    addRecord({ id: Date.now(), date: dateInput.value, time: timeInput.value, ...formData });
});

btnUpdateRecord.addEventListener('click', () => {
    const id = parseInt(editIdInput.value);
    const index = MEM_RECORDS.findIndex(r => r.id === id);
    if (index > -1) {
        const original = MEM_RECORDS[index];
        const formData = getFormDataWithoutTime();
        if (formData.type === '화물운송' && formData.from && formData.to) {
            const key = `${formData.from}-${formData.to}`;
            if(formData.distance > 0) MEM_DISTANCES[key] = formData.distance;
            if(formData.income > 0) MEM_FARES[key] = formData.income;
        }
        MEM_RECORDS[index] = { ...original, ...formData, date: original.date, time: original.time };
        saveData();
        showToast('수정 완료.');
        resetForm();
        updateAllDisplays();
    }
});

btnEditEndTrip.addEventListener('click', () => {
    const id = parseInt(editIdInput.value);
    const index = MEM_RECORDS.findIndex(r => r.id === id);
    const nowTime = getCurrentTimeString();
    const nowDate = getTodayString();

    if (index > -1 && MEM_RECORDS[index].type === '운행종료') {
        MEM_RECORDS[index].date = nowDate;
        MEM_RECORDS[index].time = nowTime;
        showToast('종료 시간이 현재로 업데이트됨.');
    } else {
        MEM_RECORDS.push({ id: Date.now(), date: nowDate, time: nowTime, type: '운행종료', distance: 0, cost: 0, income: 0 });
        showToast('운행 종료됨.');
    }
    saveData();
    resetForm();
    updateAllDisplays();
});

btnDeleteRecord.addEventListener('click', () => {
    if(confirm('삭제하시겠습니까?')) {
        const id = parseInt(editIdInput.value);
        MEM_RECORDS = MEM_RECORDS.filter(r => r.id !== id);
        saveData();
        resetForm();
        updateAllDisplays();
    }
});
btnCancelEdit.addEventListener('click', resetForm);

// ==========================================
// 6. 조회 및 통계 표시
// ==========================================
function calculateTotalDuration(records) {
    const sorted = [...records].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    let totalMinutes = 0;
    if (sorted.length < 2) return '0h 0m';
    for (let i = 1; i < sorted.length; i++) {
        const curr = new Date(`${sorted[i].date}T${sorted[i].time}`);
        const prev = new Date(`${sorted[i-1].date}T${sorted[i-1].time}`);
        if (sorted[i-1].type !== '운행종료') {
            totalMinutes += (curr - prev) / 60000;
        }
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
}

function changeDateBy(offset) {
    const currentVal = todayDatePicker.value;
    if (!currentVal) return;
    const [y, m, d] = currentVal.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + offset);
    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newDay = String(date.getDate()).padStart(2, '0');
    todayDatePicker.value = `${newYear}-${newMonth}-${newDay}`;
    displayTodayRecords();
}

function displayTodayRecords() {
    const selectedDate = todayDatePicker.value;
    const dayRecords = MEM_RECORDS.filter(r => r.date === selectedDate)
                                  .sort((a, b) => a.time.localeCompare(b.time));
    
    todayTbody.innerHTML = '';
    const displayList = dayRecords.filter(r => r.type !== '운행종료');

    displayList.forEach(r => {
        const tr = document.createElement('tr');
        tr.onclick = () => editRecord(r.id);

        let endTime = '진행중';
        let duration = '-';

        const idx = dayRecords.findIndex(item => item.id === r.id);
        if (idx > -1 && idx < dayRecords.length - 1) {
            const next = dayRecords[idx+1];
            endTime = next.time;
            const diff = new Date(`2000-01-01T${next.time}`) - new Date(`2000-01-01T${r.time}`);
            const h = Math.floor(diff/3600000);
            const m = Math.floor((diff%3600000)/60000);
            duration = h > 0 ? `${h}h ${m}m` : `${m}m`;
        }

        let fromCell = '-', toCell = '-', noteCell = '';
        if(r.type === '화물운송' || r.type === '대기') {
            const fromVal = (r.from||'').replace(/"/g, '&quot;');
            const toVal = (r.to||'').replace(/"/g, '&quot;');
            fromCell = `<span class="location-clickable" data-center="${fromVal}">${r.from || ''}</span>`;
            toCell = `<span class="location-clickable" data-center="${toVal}">${r.to || ''}</span>`;
            if(r.distance) noteCell = `<span class="note">${r.distance} km</span>`;
            if(r.type === '대기') noteCell = `<span class="note">대기중</span>`;
        } else {
            noteCell = `<strong>${r.type}</strong><br><span class="note">${r.expenseItem || r.supplyItem || r.brand || ''}</span>`;
        }

        let money = '';
        if(r.income > 0) money += `<span class="income">+${formatToManwon(r.income)}</span> `;
        if(r.cost > 0) money += `<span class="cost">-${formatToManwon(r.cost)}</span>`;
        if(money === '') money = '0'; 

        tr.innerHTML = `
            <td data-label="시작">${r.time}</td>
            <td data-label="종료">${endTime}</td>
            <td data-label="소요">${duration}</td>
            <td data-label="상차">${fromCell}</td>
            <td data-label="하차">${toCell}</td>
            <td data-label="비고">${noteCell}</td>
            <td data-label="금액">${money}</td>
        `;
        todayTbody.appendChild(tr);
    });
    
    todaySummaryDiv.innerHTML = createSummaryHTML('오늘의 기록', dayRecords);
}

// 클릭 이벤트 위임 (주소 복사)
todayTbody.addEventListener('click', (e) => {
    const target = e.target.closest('.location-clickable');
    if(target) {
        e.stopPropagation();
        const center = target.getAttribute('data-center');
        if(center) {
            const loc = MEM_LOCATIONS[center];
            if(loc && loc.address) copyTextToClipboard(loc.address, '주소 복사됨');
            else copyTextToClipboard(center, '이름 복사됨');
        }
    }
});

function createSummaryHTML(title, records) {
    const validRecords = records.filter(r => r.type !== '이동취소' && r.type !== '운행종료');
    let totalIncome = 0, totalExpense = 0, totalDistance = 0, totalTripCount = 0;
    let totalFuelCost = 0, totalFuelLiters = 0;
    validRecords.forEach(r => {
        totalIncome += parseInt(r.income || 0);
        totalExpense += parseInt(r.cost || 0);
        if (r.type === '주유소') { totalFuelCost += parseInt(r.cost || 0); totalFuelLiters += parseFloat(r.liters || 0); }
        if (['화물운송'].includes(r.type)) { totalDistance += parseFloat(r.distance || 0); totalTripCount++; }
    });
    const netIncome = totalIncome - totalExpense;
    const metrics = [
        { label: '수입', value: formatToManwon(totalIncome), unit: ' 만원', className: 'income' },
        { label: '지출', value: formatToManwon(totalExpense), unit: ' 만원', className: 'cost' },
        { label: '정산', value: formatToManwon(netIncome), unit: ' 만원', className: 'net' },
        { label: '운행거리', value: totalDistance.toFixed(1), unit: ' km' },
        { label: '운행건수', value: totalTripCount, unit: ' 건' },
        { label: '주유금액', value: formatToManwon(totalFuelCost), unit: ' 만원', className: 'cost' },
        { label: '주유리터', value: totalFuelLiters.toFixed(2), unit: ' L' },
    ];
    let itemsHtml = metrics.map(m => `<div class="summary-item"><span class="summary-label">${m.label}</span><span class="summary-value ${m.className || ''} hidden">${m.value}${m.unit}</span></div>`).join('');
    return `<strong>${title}</strong><div class="summary-toggle-grid" onclick="toggleAllSummaryValues(this)">${itemsHtml}</div>`;
}

function displayDailyRecords() {
    const selectedPeriod = `${dailyYearSelect.value}-${dailyMonthSelect.value}`;
    const monthRecords = MEM_RECORDS.filter(r => r.date.startsWith(selectedPeriod));
    dailyTbody.innerHTML = '';
    dailySummaryDiv.classList.remove('hidden');
    dailySummaryDiv.innerHTML = createSummaryHTML(`${parseInt(dailyMonthSelect.value)}월 총계`, monthRecords);
    const recordsByDate = {};
    monthRecords.forEach(r => {
        if(!recordsByDate[r.date]) recordsByDate[r.date] = { records: [], income: 0, expense: 0, distance: 0, tripCount: 0 };
        recordsByDate[r.date].records.push(r);
    });
    Object.keys(recordsByDate).sort().reverse().forEach(date => {
        const dayData = recordsByDate[date];
        const transport = dayData.records.filter(r => ['화물운송', '공차이동', '대기', '운행종료'].includes(r.type));
        let inc = 0, exp = 0, dist = 0, count = 0;
        dayData.records.forEach(r => {
            if(r.type !== '운행종료' && r.type !== '이동취소') { inc += (r.income||0); exp += (r.cost||0); }
            if(r.type === '화물운송') { dist += (r.distance||0); count++; }
        });
        const tr = document.createElement('tr');
        if(date === getTodayString()) tr.style.fontWeight = 'bold';
        tr.innerHTML = `<td>${parseInt(date.substring(8,10))}일</td><td><span class="income">${formatToManwon(inc)}</span></td><td><span class="cost">${formatToManwon(exp)}</span></td><td><strong>${formatToManwon(inc-exp)}</strong></td><td>${dist.toFixed(1)}</td><td>${count}</td><td>${calculateTotalDuration(transport)}</td><td><button class="edit-btn" onclick="window.viewDateDetails('${date}')">상세</button></td>`;
        dailyTbody.appendChild(tr);
    });
}

function displayWeeklyRecords() {
    const selectedPeriod = `${weeklyYearSelect.value}-${weeklyMonthSelect.value}`;
    const monthRecords = MEM_RECORDS.filter(r => r.date.startsWith(selectedPeriod));
    weeklyTbody.innerHTML = '';
    weeklySummaryDiv.innerHTML = createSummaryHTML(`${parseInt(weeklyMonthSelect.value)}월 주별`, monthRecords);
    const weeks = {};
    monthRecords.forEach(r => {
        const d = new Date(r.date);
        const w = Math.ceil((d.getDate() + (new Date(d.getFullYear(), d.getMonth(), 1).getDay())) / 7);
        if(!weeks[w]) weeks[w] = [];
        weeks[w].push(r);
    });
    Object.keys(weeks).forEach(w => {
        const data = weeks[w];
        const transport = data.filter(r => ['화물운송', '공차이동', '대기', '운행종료'].includes(r.type));
        let inc = 0, exp = 0, dist = 0, count = 0;
        data.forEach(r => { if(r.type!=='운행종료'&&r.type!=='이동취소'){inc+=(r.income||0);exp+=(r.cost||0);} if(r.type==='화물운송'){dist+=(r.distance||0);count++;} });
        const dates = data.map(r => new Date(r.date).getDate());
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${w}주차</td><td>${Math.min(...dates)}일~${Math.max(...dates)}일</td><td>${formatToManwon(inc)}</td><td>${formatToManwon(exp)}</td><td>${formatToManwon(inc-exp)}</td><td>${dist.toFixed(1)}</td><td>${count}</td><td>${calculateTotalDuration(transport)}</td>`;
        weeklyTbody.appendChild(tr);
    });
}

function displayMonthlyRecords() {
    const year = monthlyYearSelect.value;
    const yearRecords = MEM_RECORDS.filter(r => r.date.startsWith(year));
    monthlyYearlySummaryDiv.innerHTML = createSummaryHTML(`${year}년`, yearRecords);
    monthlyTbody.innerHTML = '';
    const months = {};
    yearRecords.forEach(r => { const m=r.date.substring(0,7); if(!months[m]) months[m]={records:[]}; months[m].records.push(r); });
    Object.keys(months).sort().reverse().forEach(m => {
        const data = months[m];
        const transport = data.records.filter(r => ['화물운송', '공차이동', '대기', '운행종료'].includes(r.type));
        let inc=0,exp=0,dist=0,count=0;
         data.records.forEach(r => { if(r.type!=='운행종료'&&r.type!=='이동취소'){inc+=(r.income||0);exp+=(r.cost||0);} if(r.type==='화물운송'){dist+=(r.distance||0);count++;} });
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${parseInt(m.substring(5))}월</td><td>${formatToManwon(inc)}</td><td>${formatToManwon(exp)}</td><td>${formatToManwon(inc-exp)}</td><td>${dist.toFixed(1)}</td><td>${count}</td><td>${calculateTotalDuration(transport)}</td>`;
        monthlyTbody.appendChild(tr);
    });
}
window.viewDateDetails = function(date) { todayDatePicker.value = date; tabBtns.forEach(b => b.classList.remove("active")); document.querySelector('.tab-btn[data-view="today"]').classList.add("active"); viewContents.forEach(c => c.classList.remove('active')); document.getElementById("today-view").classList.add("active"); displayTodayRecords(); };
function editRecord(id) {
    const r = MEM_RECORDS.find(x => x.id === id);
    if(!r) return;
    dateInput.value = r.date; timeInput.value = r.time; typeSelect.value = r.type;
    fromCenterInput.value = r.from || ''; toCenterInput.value = r.to || '';
    manualDistanceInput.value = r.distance || ''; incomeInput.value = r.income ? (r.income/10000) : ''; costInput.value = r.cost ? (r.cost/10000) : '';
    fuelBrandSelect.value = r.brand || ''; fuelLitersInput.value = r.liters || ''; fuelUnitPriceInput.value = r.unitPrice || '';
    expenseItemInput.value = r.expenseItem || ''; supplyItemInput.value = r.supplyItem || ''; supplyMileageInput.value = r.mileage || '';
    editIdInput.value = id; editModeIndicator.classList.remove('hidden');
    dateInput.disabled = true; timeInput.disabled = true;
    toggleUI(); window.scrollTo(0,0);
}

// 이벤트 리스너들
fuelUnitPriceInput.addEventListener('input', () => { const p=parseFloat(fuelUnitPriceInput.value)||0, l=parseFloat(fuelLitersInput.value)||0; if(p&&l) costInput.value=(p*l/10000).toFixed(2); });
fuelLitersInput.addEventListener('input', () => { const p=parseFloat(fuelUnitPriceInput.value)||0, l=parseFloat(fuelLitersInput.value)||0; if(p&&l) costInput.value=(p*l/10000).toFixed(2); });
typeSelect.addEventListener('change', toggleUI);
refreshBtn.addEventListener('click', () => { resetForm(); location.reload(); });
todayDatePicker.addEventListener('change', displayTodayRecords);
prevDayBtn.addEventListener('click', () => changeDateBy(-1));
nextDayBtn.addEventListener('click', () => changeDateBy(1));

// ==========================================
// 7. 프린트 및 내보내기/가져오기
// ==========================================
function generatePrintView(year, month, period, isDetailed) {
    const sDay = period === 'second' ? 16 : 1;
    const eDay = period === 'first' ? 15 : 31;
    const periodStr = period === 'full' ? '1일 ~ 말일' : `${sDay}일 ~ ${eDay===15?15:'말'}일`;
    const target = MEM_RECORDS.filter(r => { const d = new Date(r.date); return r.date.startsWith(`${year}-${month}`) && d.getDate() >= sDay && d.getDate() <= eDay; }).sort((a,b) => (a.date+a.time).localeCompare(b.date+b.time));
    const transport = target.filter(r => ['화물운송', '대기'].includes(r.type));
    let inc=0, exp=0, dist=0;
    target.forEach(r => { inc += (r.income||0); exp += (r.cost||0); });
    transport.forEach(r => dist += (r.distance||0));
    const w = window.open('','_blank');
    let lastDate = '';
    let h = `<html><head><title>운송내역</title><style>body{font-family:sans-serif;margin:20px} table{width:100%;border-collapse:collapse;font-size:12px; table-layout:fixed;} th,td{border:1px solid #ccc;padding:6px;text-align:center; word-wrap:break-word;} th{background:#eee} .summary{border:1px solid #ddd;padding:15px;margin-bottom:20px} .date-border { border-top: 2px solid #000 !important; } .left-align { text-align: left; padding-left: 5px; } .col-date { width: 50px; } .col-location { width: 120px; }</style></head><body><h2>${year}년 ${month}월 ${periodStr} 운송내역</h2><div class="summary"><p>건수: ${transport.length}건 | 거리: ${dist.toFixed(1)}km | 수입: ${formatToManwon(inc)}만 | 지출: ${formatToManwon(exp)}만 | 순수익: ${formatToManwon(inc-exp)}만</p></div><table><thead><tr>${isDetailed?'<th>시간</th>':''}<th class="col-date">날짜</th><th class="col-location">상차지</th><th class="col-location">하차지</th><th>내용</th>${isDetailed?'<th>거리</th><th>수입</th><th>지출</th>':''}</tr></thead><tbody>`;
    (isDetailed ? target : transport).forEach(r => {
        let borderClass = ''; if(lastDate !== '' && lastDate !== r.date) borderClass = 'class="date-border"'; lastDate = r.date;
        let from = '', to = '', desc = r.type;
        if(r.from || r.to) { from = r.from || ''; to = r.to || ''; desc = ''; } else { from = r.expenseItem || r.supplyItem || r.brand || ''; }
        if(r.type === '대기') desc = '대기';
        h += `<tr ${borderClass}>${isDetailed?`<td>${r.time}</td>`:''}<td>${r.date.substring(5)}</td><td class="left-align">${from}</td><td class="left-align">${to}</td><td>${desc}</td>${isDetailed?`<td>${r.distance||'-'}</td><td>${formatToManwon(r.income)}</td><td>${formatToManwon(r.cost)}</td>`:''}</tr>`;
    });
    h += `</tbody></table><button onclick="window.print()">인쇄</button></body></html>`;
    w.document.write(h); w.document.close();
}
printFirstHalfBtn.addEventListener('click', () => generatePrintView(printYearSelect.value, printMonthSelect.value, 'first', false));
printSecondHalfBtn.addEventListener('click', () => generatePrintView(printYearSelect.value, printMonthSelect.value, 'second', false));
printFullMonthBtn.addEventListener('click', () => generatePrintView(printYearSelect.value, printMonthSelect.value, 'full', false));
printFirstHalfDetailBtn.addEventListener('click', () => generatePrintView(printYearSelect.value, printMonthSelect.value, 'first', true));
printSecondHalfDetailBtn.addEventListener('click', () => generatePrintView(printYearSelect.value, printMonthSelect.value, 'second', true));
printFullMonthDetailBtn.addEventListener('click', () => generatePrintView(printYearSelect.value, printMonthSelect.value, 'full', true));

exportJsonBtn.addEventListener('click', () => { const data = { records: MEM_RECORDS, centers: MEM_CENTERS, locations: MEM_LOCATIONS, fares: MEM_FARES, distances: MEM_DISTANCES, costs: MEM_COSTS, subsidy: localStorage.getItem('fuel_subsidy_limit'), correction: localStorage.getItem('mileage_correction') }; const b = new Blob([JSON.stringify(data,null,2)],{type:"application/json"}); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download=`backup_${getTodayString()}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a); });
importJsonBtn.addEventListener('click', () => importFileInput.click());
importFileInput.addEventListener('change', (e) => { if(!confirm('덮어쓰시겠습니까?')) return; const r = new FileReader(); r.onload = (evt) => { const d = JSON.parse(evt.target.result); if(d.records) localStorage.setItem('records', JSON.stringify(d.records)); if(d.centers) localStorage.setItem('logistics_centers', JSON.stringify(d.centers)); if(d.locations) localStorage.setItem('saved_locations', JSON.stringify(d.locations)); if(d.fares) localStorage.setItem('saved_fares', JSON.stringify(d.fares)); if(d.distances) localStorage.setItem('saved_distances', JSON.stringify(d.distances)); if(d.costs) localStorage.setItem('saved_costs', JSON.stringify(d.costs)); if(d.subsidy) localStorage.setItem('fuel_subsidy_limit', d.subsidy); if(d.correction) localStorage.setItem('mileage_correction', d.correction); alert('복원완료'); location.reload(); }; r.readAsText(e.target.files[0]); });
clearBtn.addEventListener('click', () => { if(confirm('전체삭제?')) { localStorage.clear(); location.reload(); }});
[toggleCenterManagementBtn, toggleBatchApplyBtn, toggleSubsidyManagementBtn, toggleMileageManagementBtn, toggleDataManagementBtn, togglePrintManagementBtn].forEach(header => { header.addEventListener("click", () => { const body = header.nextElementSibling; header.classList.toggle("active"); body.classList.toggle("hidden"); if (header.id === 'toggle-subsidy-management' && !body.classList.contains('hidden')) { displaySubsidyRecords(false); } }); });
toggleCenterManagementBtn.addEventListener('click', () => { if(!centerManagementBody.classList.contains('hidden')) displayCenterList(); });
centerSearchInput.addEventListener('input', () => displayCenterList(centerSearchInput.value));
function displayCenterList(filter='') { centerListContainer.innerHTML = ""; const list = MEM_CENTERS.filter(c => c.includes(filter)); if(list.length===0) { centerListContainer.innerHTML='<p class="note">결과 없음</p>'; return; } list.forEach(c => { const l = MEM_LOCATIONS[c]||{}; const div = document.createElement('div'); div.className='center-item'; div.innerHTML=`<div class="info"><span class="center-name">${c}</span><div class="action-buttons"><button class="edit-btn">수정</button><button class="delete-btn">삭제</button></div></div>${l.address?`<span class="note">주소: ${l.address}</span>`:''}`; div.querySelector('.edit-btn').onclick=()=>handleCenterEdit(div,c); div.querySelector('.delete-btn').onclick=()=>deleteCenter(c); centerListContainer.appendChild(div); }); }
function handleCenterEdit(div, c) { const l = MEM_LOCATIONS[c]||{}; div.innerHTML = `<div class="edit-form"><input class="edit-input" value="${c}"><input class="edit-address-input" value="${l.address||''}"><input class="edit-memo-input" value="${l.memo||''}"><div class="action-buttons"><button class="setting-save-btn">저장</button><button class="cancel-edit-btn">취소</button></div></div>`; div.querySelector('.setting-save-btn').onclick = () => { const nn = div.querySelector('.edit-input').value.trim(); const na = div.querySelector('.edit-address-input').value.trim(); const nm = div.querySelector('.edit-memo-input').value.trim(); if(!nn) return; if(nn!==c) { const idx = MEM_CENTERS.indexOf(c); if(idx>-1) MEM_CENTERS.splice(idx,1); if(!MEM_CENTERS.includes(nn)) MEM_CENTERS.push(nn); delete MEM_LOCATIONS[c]; MEM_RECORDS.forEach(r => { if(r.from===c) r.from=nn; if(r.to===c) r.to=nn; }); saveRecords(MEM_RECORDS); } updateLocationData(nn, na, nm); displayCenterList(centerSearchInput.value); }; div.querySelector('.cancel-edit-btn').onclick = () => displayCenterList(centerSearchInput.value); }
function deleteCenter(c) { if(!confirm('삭제?')) return; const idx = MEM_CENTERS.indexOf(c); if(idx>-1) MEM_CENTERS.splice(idx,1); delete MEM_LOCATIONS[c]; saveData(); displayCenterList(centerSearchInput.value); }
addCenterBtn.addEventListener('click', () => { const n = newCenterNameInput.value.trim(); if(n) { updateLocationData(n, newCenterAddressInput.value.trim(), newCenterMemoInput.value.trim()); newCenterNameInput.value=''; newCenterAddressInput.value=''; newCenterMemoInput.value=''; displayCenterList(centerSearchInput.value); } });
goToSettingsBtn.addEventListener("click", () => { mainPage.classList.add("hidden"); settingsPage.classList.remove("hidden"); goToSettingsBtn.classList.add("hidden"); backToMainBtn.classList.remove("hidden"); displayCumulativeData(); displayCurrentMonthData(); });
backToMainBtn.addEventListener("click", () => { mainPage.classList.remove("hidden"); settingsPage.classList.add("hidden"); goToSettingsBtn.classList.remove("hidden"); backToMainBtn.classList.add("hidden"); updateAllDisplays(); });
batchApplyBtn.addEventListener("click", () => { const from = batchFromCenterInput.value.trim(); const to = batchToCenterInput.value.trim(); const income = parseFloat(batchIncomeInput.value) || 0; if (!from || !to || income <= 0) { alert("값을 확인해주세요."); return; } if (confirm(`${from}->${to} 구간 미정산 기록을 ${income}만원으로 일괄 적용할까요?`)) { let count = 0; MEM_RECORDS = MEM_RECORDS.map(r => { if (r.type === '화물운송' && r.from === from && r.to === to && r.income === 0) { count++; return { ...r, income: income * 10000 }; } return r; }); saveData(); batchStatus.textContent = `${count}건 적용됨`; setTimeout(() => batchStatus.textContent = "", 3000); } });
subsidySaveBtn.addEventListener('click', () => { localStorage.setItem('fuel_subsidy_limit', subsidyLimitInput.value); showToast('저장됨'); });
mileageCorrectionSaveBtn.addEventListener('click', () => { localStorage.setItem('mileage_correction', mileageCorrectionInput.value); showToast('저장됨'); displayCumulativeData(); });
tabBtns.forEach(btn => { btn.addEventListener("click", event => { if(btn.parentElement.classList.contains('view-tabs')) { event.preventDefault(); tabBtns.forEach(b => { if(b.parentElement.classList.contains('view-tabs')) b.classList.remove("active"); }); btn.classList.add("active"); viewContents.forEach(c => c.classList.remove('active')); document.getElementById(btn.dataset.view + "-view").classList.add("active"); updateAllDisplays(); } }) });
function displayCumulativeData() { const records = MEM_RECORDS.filter(r => r.type !== '이동취소' && r.type !== '운행종료'); let inc = 0, exp = 0, count = 0, dist = 0, liters = 0; records.forEach(r => { inc += (r.income||0); exp += (r.cost||0); if(r.type === '주유소') liters += (r.liters||0); if(r.type === '화물운송') { count++; dist += (r.distance||0); } }); const correction = parseFloat(localStorage.getItem("mileage_correction")) || 0; const totalDist = dist + correction; const net = inc - exp; const avg = liters > 0 && totalDist > 0 ? (totalDist/liters).toFixed(2) : 0; const costKm = totalDist > 0 ? Math.round(exp/totalDist) : 0; const days = new Set(records.map(r => r.date)).size; cumulativeOperatingDays.textContent = `${days} 일`; cumulativeTripCount.textContent = `${count} 건`; cumulativeTotalMileage.textContent = `${Math.round(totalDist).toLocaleString()} km`; cumulativeIncome.textContent = `${formatToManwon(inc)} 만원`; cumulativeExpense.textContent = `${formatToManwon(exp)} 만원`; cumulativeNetIncome.textContent = `${formatToManwon(net)} 만원`; cumulativeAvgEconomy.textContent = `${avg} km/L`; cumulativeCostPerKm.textContent = `${costKm.toLocaleString()} 원`; renderMileageSummary(); }
function displayCurrentMonthData() { const now = new Date(); const currentPeriod = now.toISOString().slice(0, 7); const monthRecords = MEM_RECORDS.filter(r => r.date.startsWith(currentPeriod) && r.type !== '이동취소' && r.type !== '운행종료'); currentMonthTitle.textContent = `${now.getMonth() + 1}월 실시간 요약`; let inc = 0, exp = 0, count = 0, dist = 0, liters = 0; monthRecords.forEach(r => { inc += (r.income||0); exp += (r.cost||0); if(r.type === '화물운송') { count++; dist += (r.distance||0); } if(r.type === '주유소') liters += (r.liters||0); }); const days = new Set(monthRecords.map(r => r.date)).size; const net = inc - exp; const avg = liters > 0 && dist > 0 ? (dist/liters).toFixed(2) : 0; const costKm = dist > 0 ? Math.round(exp/dist) : 0; currentMonthOperatingDays.textContent = `${days} 일`; currentMonthTripCount.textContent = `${count} 건`; currentMonthTotalMileage.textContent = `${dist.toFixed(1)} km`; currentMonthIncome.textContent = `${formatToManwon(inc)} 만원`; currentMonthExpense.textContent = `${formatToManwon(exp)} 만원`; currentMonthNetIncome.textContent = `${formatToManwon(net)} 만원`; currentMonthAvgEconomy.textContent = `${avg} km/L`; currentMonthCostPerKm.textContent = `${costKm.toLocaleString()} 원`; const limit = parseFloat(localStorage.getItem("fuel_subsidy_limit")) || 0; const remain = limit - liters; const pct = limit > 0 ? Math.min(100, 100 * liters / limit).toFixed(1) : 0; subsidySummaryDiv.innerHTML = `<div class="progress-label">월 한도: ${limit.toLocaleString()} L | 사용: ${liters.toFixed(1)} L | 잔여: ${remain.toFixed(1)} L</div><div class="progress-bar-container"><div class="progress-bar progress-bar-used" style="width: ${pct}%;"></div></div>`; }
function renderMileageSummary(period = 'monthly') { const validRecords = MEM_RECORDS.filter(r => ['화물운송'].includes(r.type)); let summaryData = {}; if (period === 'monthly') { for (let i = 11; i >= 0; i--) { const d = new Date(); d.setMonth(d.getMonth() - i); const k = d.toISOString().slice(0, 7); summaryData[k] = 0; } validRecords.forEach(r => { const k = r.date.substring(0, 7); if (summaryData.hasOwnProperty(k)) summaryData[k]++; }); } else { for (let i = 11; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - (i * 7)); const k = d.toISOString().slice(0, 10); summaryData[k] = 0; } validRecords.forEach(r => { const d = new Date(r.date); d.setDate(d.getDate() - d.getDay() + 1); const k = d.toISOString().slice(0, 10); if (summaryData.hasOwnProperty(k)) summaryData[k]++; }); } let h = ''; for (const k in summaryData) { h += `<div class="metric-card"><span class="metric-label">${k}</span><span class="metric-value">${summaryData[k]} 건</span></div>`; } mileageSummaryCards.innerHTML = h; }
function updateAllDisplays() { displayTodayRecords(); displayDailyRecords(); displayWeeklyRecords(); displayMonthlyRecords(); }

// [복구됨] 주유 내역 표시 함수
function displaySubsidyRecords(append = false) {
    const fuelRecords = MEM_RECORDS.filter(r => r.type === '주유소').sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
    if (!append) { displayedSubsidyCount = 0; subsidyRecordsList.innerHTML = ''; }
    if (fuelRecords.length === 0) { subsidyRecordsList.innerHTML = '<p class="note" style="text-align:center; padding:1em;">주유 내역이 없습니다.</p>'; subsidyLoadMoreContainer.innerHTML = ''; return; }
    const nextBatch = fuelRecords.slice(displayedSubsidyCount, displayedSubsidyCount + SUBSIDY_PAGE_SIZE);
    nextBatch.forEach(r => {
        const div = document.createElement('div');
        div.className = 'center-item'; div.style.marginBottom = '5px';
        div.innerHTML = `<div class="info"><span class="center-name">${r.date} <span class="note">(${r.brand || '기타'})</span></span><span style="font-weight:bold;">${formatToManwon(r.cost)} 만원</span></div><div style="display:flex; justify-content:space-between; margin-top:4px; font-size:0.9em; color:#555;"><span>주유량: ${parseFloat(r.liters).toFixed(2)} L</span><span>단가: ${r.unitPrice} 원</span></div>`;
        subsidyRecordsList.appendChild(div);
    });
    displayedSubsidyCount += nextBatch.length;
    if (displayedSubsidyCount < fuelRecords.length) { subsidyLoadMoreContainer.innerHTML = '<button class="load-more-btn" style="margin-top:10px; padding:10px;">▼ 더 보기</button>'; subsidyLoadMoreContainer.querySelector('button').onclick = () => displaySubsidyRecords(true); } else { subsidyLoadMoreContainer.innerHTML = ''; }
}

// ==========================================
// 8. 초기화 함수
// ==========================================
function initialSetup() {
    loadAllData();
    populateCenterDatalist();
    
    // 날짜 선택기(셀렉트박스) 옵션 생성
    const y = new Date().getFullYear();
    const yrs = []; for(let i=0; i<5; i++) yrs.push(`<option value="${y-i}">${y-i}년</option>`);
    [dailyYearSelect, weeklyYearSelect, monthlyYearSelect, printYearSelect].forEach(el => el.innerHTML = yrs.join(''));
    
    const ms = []; for(let i=1; i<=12; i++) ms.push(`<option value="${i.toString().padStart(2,'0')}">${i}월</option>`);
    [dailyMonthSelect, weeklyMonthSelect, printMonthSelect].forEach(el => { 
        el.innerHTML = ms.join(''); 
        el.value = (new Date().getMonth()+1).toString().padStart(2,'0'); 
    });

    mileageCorrectionInput.value = localStorage.getItem('mileage_correction') || 0;
    subsidyLimitInput.value = localStorage.getItem('fuel_subsidy_limit') || 0;
    todayDatePicker.value = getTodayString();
    
    // 폼 초기화 및 현재 시간 강제 설정
    resetForm();
    
    // 혹시 resetForm에서 덮어쓰여질 수 있으니 안전하게 한 번 더 설정
    if(!dateInput.value) dateInput.value = getTodayString();
    if(!timeInput.value) timeInput.value = getCurrentTimeString();

    updateAllDisplays();
}

document.addEventListener("DOMContentLoaded", initialSetup);
function toggleAllSummaryValues(gridElement) { const items = gridElement.querySelectorAll('.summary-item'); const isShowing = gridElement.classList.toggle('active'); items.forEach(item => { const valueEl = item.querySelector('.summary-value'); if(isShowing) { item.classList.add('active'); valueEl.classList.remove('hidden'); } else { item.classList.remove('active'); valueEl.classList.add('hidden'); } }); }