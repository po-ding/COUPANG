/** 버전: 7.7 | 최종 수정일: 2025-11-18 (시간 수정 오류 해결 및 기능 개선) */

// --- DOM 요소 ---
const recordForm = document.getElementById('record-form');
const clearBtn = document.getElementById('clear-btn');
const exportJsonBtn = document.getElementById('export-json-btn');
const importJsonBtn = document.getElementById('import-json-btn');
const importFileInput = document.getElementById('import-file-input');
const datetimeInfoFieldset = document.getElementById('datetime-info-fieldset');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const typeSelect = document.getElementById('type');
const transportDetails = document.getElementById('transport-details');
const fromCenterInput = document.getElementById('from-center');
const toCenterInput = document.getElementById('to-center');
const centerDatalist = document.getElementById('center-list');
const costInfoFieldset = document.getElementById('cost-info-fieldset');
const costWrapper = document.getElementById('cost-wrapper');
const incomeWrapper = document.getElementById('income-wrapper');
const costInput = document.getElementById('cost');
const incomeInput = document.getElementById('income');
const fuelDetails = document.getElementById('fuel-details');
const fuelUnitPriceInput = document.getElementById('fuel-unit-price');
const fuelLitersInput = document.getElementById('fuel-liters');
const fuelBrandSelect = document.getElementById('fuel-brand');
const expenseDetails = document.getElementById('expense-details');
const expenseItemInput = document.getElementById('expense-item');
const supplyDetails = document.getElementById('supply-details');
const supplyItemInput = document.getElementById('supply-item');
const supplyMileageInput = document.getElementById('supply-mileage');

const cancelEditBtn = document.getElementById('cancel-edit-btn');
const deleteEditBtn = document.getElementById('delete-edit-btn');
const editIdInput = document.getElementById('edit-id');
const tripActions = document.getElementById('trip-actions');
const fuelActions = document.getElementById('fuel-actions');
const editActions = document.getElementById('edit-actions');
const editModeIndicator = document.getElementById('edit-mode-indicator');

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

const addressDisplay = document.getElementById('address-display');
const manualDistanceInput = document.getElementById('manual-distance');

const toggleCenterManagementBtn = document.getElementById('toggle-center-management');
const centerManagementBody = document.getElementById('center-management-body');
const centerListContainer = document.getElementById('center-list-container');
const newCenterNameInput = document.getElementById('new-center-name');
const newCenterAddressInput = document.getElementById('new-center-address');
const newCenterMemoInput = document.getElementById('new-center-memo');
const addCenterBtn = document.getElementById('add-center-btn');

const toast = document.getElementById('toast-notification');
let toastTimeout = null;

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
const batchApplyBtn = document.getElementById('batch-apply-btn');
const batchFromCenterInput = document.getElementById('batch-from-center');
const batchToCenterInput = document.getElementById('batch-to-center');
const batchIncomeInput = document.getElementById('batch-income');
const batchStatus = document.getElementById('batch-status');
const subsidySaveBtn = document.getElementById('subsidy-save-btn');
const subsidyLimitInput = document.getElementById('subsidy-limit');
const subsidySummaryDiv = document.getElementById('subsidy-summary');
const mileageCorrectionSaveBtn = document.getElementById('mileage-correction-save-btn');
const mileageCorrectionInput = document.getElementById('mileage-correction');
const mileageSummaryControls = document.getElementById('mileage-summary-controls');
const mileageSummaryCards = document.getElementById('mileage-summary-cards');
const toggleBatchApplyBtn = document.getElementById('toggle-batch-apply');
const toggleSubsidyManagementBtn = document.getElementById('toggle-subsidy-management');
const toggleMileageManagementBtn = document.getElementById('toggle-mileage-management');
const toggleDataManagementBtn = document.getElementById('toggle-data-management');
const togglePrintManagementBtn = document.getElementById('toggle-print-management');
const printYearSelect = document.getElementById('print-year-select');
const printMonthSelect = document.getElementById('print-month-select');
const printFirstHalfBtn = document.getElementById('print-first-half-btn');
const printSecondHalfBtn = document.getElementById('print-second-half-btn');
const printFirstHalfDetailBtn = document.getElementById('print-first-half-detail-btn');
const printSecondHalfDetailBtn = document.getElementById('print-second-half-detail-btn');

const SUBSIDY_PAGE_SIZE = 10;
let displayedSubsidyCount = 0;

const getTodayString = () => new Date().toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\. /g, '-').slice(0, -1);
const getCurrentTimeString = () => new Date().toLocaleTimeString('ko-KR', {hour12: false, hour: '2-digit', minute: '2-digit'});
const formatToManwon = (valueInWon) => {
    if (isNaN(valueInWon)) return '0';
    return Math.round(valueInWon / 10000).toLocaleString('ko-KR');
};
function showToast(message) {
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 1500);
}
function getCenters() {
    const defaultCenters = ['안성', '안산', '용인', '이천', '인천'];
    const storedCenters = JSON.parse(localStorage.getItem('logistics_centers')) || [];
    if (storedCenters.length === 0) {
        localStorage.setItem('logistics_centers', JSON.stringify(defaultCenters));
        return defaultCenters.sort((a, b) => a.localeCompare(b, 'ko'));
    }
    return storedCenters.sort((a, b) => a.localeCompare(b, 'ko'));
}
function getSavedLocations() {
    return JSON.parse(localStorage.getItem('saved_locations')) || {};
}
function saveLocationData(centerName, data) {
    if (!centerName || centerName.trim() === '') return false;
    const locations = getSavedLocations();
    locations[centerName] = data;
    localStorage.setItem('saved_locations', JSON.stringify(locations));
    return true;
}
function addCenter(newCenter, address = '', memo = '') {
    const trimmedCenter = newCenter.trim();
    if (!trimmedCenter) return false;
    const centers = getCenters();
    if (!centers.includes(trimmedCenter)) {
        centers.push(trimmedCenter);
        localStorage.setItem('logistics_centers', JSON.stringify(centers));
        saveLocationData(trimmedCenter, {
            address: address.trim(),
            memo: memo.trim()
        });
        populateCenterDatalist();
        return true;
    }
    return false;
}
function populateCenterDatalist() {
    const centers = getCenters();
    const options = centers.map(c => `<option value="${c}"></option>`).join('');
    centerDatalist.innerHTML = options;
}

function toggleUI(type) {
    transportDetails.classList.add('hidden');
    fuelDetails.classList.add('hidden');
    supplyDetails.classList.add('hidden');
    expenseDetails.classList.add('hidden');
    costInfoFieldset.classList.add('hidden');
    incomeWrapper.classList.remove('hidden');
    costWrapper.classList.remove('hidden');

    tripActions.classList.add('hidden');
    fuelActions.classList.add('hidden');

    if (type === '화물운송') {
        transportDetails.classList.remove('hidden');
        costInfoFieldset.classList.remove('hidden');
        costWrapper.classList.add('hidden');
        tripActions.classList.remove('hidden');
    } else if (type === '주유소') {
        fuelDetails.classList.remove('hidden');
        costInfoFieldset.classList.remove('hidden');
        incomeWrapper.classList.add('hidden');
        fuelActions.classList.remove('hidden');
    } else if (type === '소모품') {
        supplyDetails.classList.remove('hidden');
        costInfoFieldset.classList.remove('hidden');
        incomeWrapper.classList.add('hidden');
        tripActions.classList.remove('hidden');
    } else if (type === '지출') {
        expenseDetails.classList.remove('hidden');
        costInfoFieldset.classList.remove('hidden');
        incomeWrapper.classList.add('hidden');
        tripActions.classList.remove('hidden');
    } else { // 이동취소 등
        transportDetails.classList.remove('hidden');
        tripActions.classList.remove('hidden');
    }
}


function updateAddressDisplay() {
    const fromValue = fromCenterInput.value;
    const toValue = toCenterInput.value;
    const locations = getSavedLocations();
    const fromData = locations[fromValue] || {};
    const toData = locations[toValue] || {};
    let addressHtml = '';
    if (fromData.address) addressHtml += `<div class="address-clickable" data-address="${fromData.address}">${fromData.address}</div>`;
    if (fromData.memo) addressHtml += `<div class="memo-display">${fromData.memo}</div>`;
    if (toData.address) addressHtml += `<div class="address-clickable" data-address="${toData.address}">${toData.address}</div>`;
    if (toData.memo) addressHtml += `<div class="memo-display">${toData.memo}</div>`;
    addressDisplay.innerHTML = addressHtml;
}
function copyTextToClipboard(text, successMessage) {
    if (!text) {
        showToast('복사할 내용이 없습니다.');
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage || '클립보드에 복사되었습니다.');
    }).catch(err => {
        console.error('복사 실패:', err);
        showToast('복사에 실패했습니다.');
    });
}
function copyAddressToClipboard(centerName) {
    if (!centerName) return;
    const locations = getSavedLocations();
    const locationData = locations[centerName];
    if (locationData && locationData.address) {
        copyTextToClipboard(locationData.address, '주소가 복사되었습니다.');
    } else {
        showToast(`'${centerName}'에 등록된 주소가 없습니다.`);
    }
}

function createSummaryHTML(title, records) {
    const cancelledCount = records.filter(r => r.type === '이동취소').length;
    const validRecords = records.filter(r => r.type !== '이동취소');
    let totalIncome = 0, totalExpense = 0, totalDistance = 0, totalTripCount = 0;
    let totalFuelCost = 0, totalFuelLiters = 0;

    validRecords.forEach(r => {
        totalIncome += parseInt(r.income || 0);
        totalExpense += parseInt(r.cost || 0);
        if (r.type === '주유소') {
            totalFuelCost += parseInt(r.cost || 0);
            totalFuelLiters += parseFloat(r.liters || 0);
        }
        if (['화물운송'].includes(r.type)) { // 공차이동 제외
            totalDistance += parseFloat(r.distance || 0);
            totalTripCount++;
        }
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

    if (cancelledCount > 0) {
        metrics.push({ label: '취소건수', value: cancelledCount, unit: ' 건', className: 'cancelled' });
    }

    let itemsHtml = metrics.map(metric => `
        <div class="summary-item">
            <span class="summary-label">${metric.label}</span>
            <span class="summary-value ${metric.className || ''} hidden">${metric.value}${metric.unit}</span>
        </div>
    `).join('');

    return `<strong>${title}</strong><div class="summary-toggle-grid" onclick="toggleAllSummaryValues(this)">${itemsHtml}</div>`;
}

function toggleAllSummaryValues(gridElement) {
    const items = gridElement.querySelectorAll('.summary-item');
    const isShowing = gridElement.classList.toggle('active');
    
    items.forEach(item => {
        const valueEl = item.querySelector('.summary-value');
        if(isShowing) {
            item.classList.add('active');
            valueEl.classList.remove('hidden');
        } else {
            item.classList.remove('active');
            valueEl.classList.add('hidden');
        }
    });
}

function calculateTotalDuration(records) {
    if (records.length < 2) return '0h 0m';

    const sortedRecords = [...records].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    
    let totalMinutes = 0;
    for (let i = 1; i < sortedRecords.length; i++) {
        const currentTime = new Date(`${sortedRecords[i].date}T${sortedRecords[i].time}`);
        const prevTime = new Date(`${sortedRecords[i-1].date}T${sortedRecords[i-1].time}`);
        totalMinutes += (currentTime - prevTime) / 60000;
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
}

function displayTodayRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const selectedDate = todayDatePicker.value;
    const dateObj = new Date(selectedDate + 'T00:00:00');
    const title = dateObj.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
    const filteredRecords = records.filter(r => r.date === selectedDate);
    
    todayTbody.innerHTML = '';
    
    let recordsForTable = filteredRecords.filter(r => !['주유소', '소모품', '지출'].includes(r.type));

    recordsForTable.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    for (let i = 0; i < recordsForTable.length; i++) {
        if (i > 0) {
            const currentTime = new Date(`${recordsForTable[i].date}T${recordsForTable[i].time}`);
            const prevTime = new Date(`${recordsForTable[i - 1].date}T${recordsForTable[i - 1].time}`);
            const diff = currentTime - prevTime;
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            recordsForTable[i].duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        } else {
            recordsForTable[i].duration = '-';
        }
    }

    recordsForTable.reverse();
    
    filteredRecords.sort((a,b) => (b.date + b.time).localeCompare(a.date+a.time)).forEach(r => {
        const tr = document.createElement('tr');
        tr.onclick = () => editRecord(r.id);

        let detailsCell = '', moneyCell = '';
        let duration = recordsForTable.find(rec => rec.id === r.id)?.duration || r.type;

        if (['화물운송', '이동취소'].includes(r.type)) {
            const fromLocation = `<strong class="location-clickable" data-center-name="${r.from}">${r.from}</strong>`;
            const toLocation = `<strong class="location-clickable" data-center-name="${r.to}">${r.to}</strong>`;
            detailsCell = `${fromLocation} →<br>${toLocation}`; 
            if (r.type !== '이동취소') {
                detailsCell += `<br><span class="note">${r.distance} km</span>`;
            }
        } else {
            detailsCell = `<strong>${r.expenseItem || r.supplyItem || r.type}</strong>`;
             if (r.mileage > 0) detailsCell += `<br><span class="note">${r.mileage.toLocaleString()} km</span>`;
        }
        
        moneyCell = (r.income > 0 ? `<span class="income">+${formatToManwon(r.income)}</span>` : '') + 
                    (r.cost > 0 ? ` <span class="cost">-${formatToManwon(r.cost)}</span>` : '');

        tr.innerHTML = `
            <td data-label="시간">${r.time}</td>
            <td data-label="소요시간">${duration}</td>
            <td data-label="내용">${detailsCell}</td>
            <td data-label="수입/지출">${moneyCell}</td>
        `;
        todayTbody.appendChild(tr);
    });

    todaySummaryDiv.innerHTML = createSummaryHTML(title, filteredRecords);
}

function displayDailyRecords() {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    const selectedPeriod = `${dailyYearSelect.value}-${dailyMonthSelect.value}`;
    const currentMonthRecords = allRecords.filter(r => r.date.startsWith(selectedPeriod));
    dailyTbody.innerHTML = '';
    dailySummaryDiv.classList.remove('hidden');
    dailySummaryDiv.innerHTML = createSummaryHTML(`${parseInt(dailyMonthSelect.value)}월 총계`, currentMonthRecords);
    
    const recordsByDate = {};
    currentMonthRecords.forEach(r => {
        if (!recordsByDate[r.date]) {
            recordsByDate[r.date] = { records: [], income: 0, expense: 0, distance: 0, tripCount: 0 };
        }
        recordsByDate[r.date].records.push(r);
    });
    
    Object.keys(recordsByDate).sort().reverse().forEach(date => {
        const dayData = recordsByDate[date];
        const validRecords = dayData.records.filter(r => r.type !== '이동취소');
        
        validRecords.forEach(r => {
            dayData.income += parseInt(r.income || 0);
            dayData.expense += parseInt(r.cost || 0);
            if (['화물운송'].includes(r.type)) {
                dayData.distance += parseFloat(r.distance || 0);
                dayData.tripCount++;
            }
        });
        
        const day = date.substring(8, 10);
        const dailyNet = dayData.income - dayData.expense;
        const duration = calculateTotalDuration(validRecords.filter(r => !['주유소', '소모품', '지출'].includes(r.type)));
        
        const tr = document.createElement('tr');
        if (date === getTodayString()) {
            tr.style.fontWeight = 'bold';
            tr.style.backgroundColor = '#e9f5ff';
        }
        tr.innerHTML = `
            <td data-label="일">${parseInt(day)}일</td>
            <td data-label="수입"><span class="income">${formatToManwon(dayData.income)}</span></td>
            <td data-label="지출"><span class="cost">${formatToManwon(dayData.expense)}</span></td>
            <td data-label="정산"><strong>${formatToManwon(dailyNet)}</strong></td>
            <td data-label="운행거리(km)">${dayData.distance.toFixed(1)}</td>
            <td data-label="이동">${dayData.tripCount}</td>
            <td data-label="소요시간">${duration}</td>
            <td data-label="관리"><button class="edit-btn" onclick="viewDateDetails('${date}')">상세</button></td>
        `;
        dailyTbody.appendChild(tr);
    });
}

function getWeekOfMonth(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const dayOfMonth = date.getDate();
    return Math.ceil((dayOfMonth + firstDay) / 7);
}

function displayWeeklyRecords() {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    const selectedPeriod = `${weeklyYearSelect.value}-${weeklyMonthSelect.value}`;
    const monthRecords = allRecords.filter(r => r.date.startsWith(selectedPeriod));
    
    weeklyTbody.innerHTML = '';
    weeklySummaryDiv.innerHTML = createSummaryHTML(`${parseInt(weeklyMonthSelect.value)}월 주별 합계`, monthRecords);

    const recordsByWeek = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    
    monthRecords.forEach(r => {
        const recordDate = new Date(r.date + 'T00:00:00');
        const weekOfMonth = getWeekOfMonth(recordDate);
        if (recordsByWeek[weekOfMonth]) {
            recordsByWeek[weekOfMonth].push(r);
        }
    });
    
    Object.keys(recordsByWeek).forEach(week => {
        const weekRecords = recordsByWeek[week];
        if (weekRecords.length === 0) return;

        const validWeekRecords = weekRecords.filter(r => r.type !== '이동취소');
        let data = { income: 0, expense: 0, distance: 0, tripCount: 0 };

        validWeekRecords.forEach(r => {
            data.income += parseInt(r.income || 0);
            data.expense += parseInt(r.cost || 0);
            if (['화물운송'].includes(r.type)) {
                data.distance += parseFloat(r.distance || 0);
                data.tripCount++;
            }
        });

        const weekNet = data.income - data.expense;
        const duration = calculateTotalDuration(validWeekRecords.filter(r => !['주유소', '소모품', '지출'].includes(r.type)));
        const weekStartDay = Math.min(...weekRecords.map(r => new Date(r.date).getDate()));
        const weekEndDay = Math.max(...weekRecords.map(r => new Date(r.date).getDate()));

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="주차">${week}주차</td>
            <td data-label="기간">${weekStartDay}일 ~ ${weekEndDay}일</td>
            <td data-label="수입"><span class="income">${formatToManwon(data.income)}</span></td>
            <td data-label="지출"><span class="cost">${formatToManwon(data.expense)}</span></td>
            <td data-label="정산"><strong>${formatToManwon(weekNet)}</strong></td>
            <td data-label="운행거리(km)">${data.distance.toFixed(1)}</td>
            <td data-label="이동">${data.tripCount}</td>
            <td data-label="소요시간">${duration}</td>
        `;
        weeklyTbody.appendChild(tr);
    });
}

function displayMonthlyRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const selectedYear = monthlyYearSelect.value;
    const yearlyRecords = records.filter(r => r.date.startsWith(selectedYear));
    monthlyYearlySummaryDiv.innerHTML = createSummaryHTML(`${selectedYear}년 총계`, yearlyRecords);

    const recordsByMonth = {};
    yearlyRecords.forEach(r => {
        const monthKey = r.date.substring(0, 7);
        if (!recordsByMonth[monthKey]) {
            recordsByMonth[monthKey] = { records: [], income: 0, expense: 0, distance: 0, tripCount: 0 };
        }
        recordsByMonth[monthKey].records.push(r);
    });
    
    monthlyTbody.innerHTML = '';
    
    Object.keys(recordsByMonth).sort().reverse().forEach(monthKey => {
        const monthData = recordsByMonth[monthKey];
        const validRecords = monthData.records.filter(r => r.type !== '이동취소');

        if(validRecords.length === 0) return;

        validRecords.forEach(r => {
            monthData.income += parseInt(r.income || 0);
            monthData.expense += parseInt(r.cost || 0);
            if (['화물운송'].includes(r.type)) {
                monthData.distance += parseFloat(r.distance || 0);
                monthData.tripCount++;
            }
        });

        const month = monthKey.substring(5, 7);
        const netIncome = monthData.income - monthData.expense;
        const duration = calculateTotalDuration(validRecords.filter(r => !['주유소', '소모품', '지출'].includes(r.type)));
        
        const tr = document.createElement('tr');
        const now = new Date();
        const currentYear = now.getFullYear().toString();
        const currentMonthKey = now.toISOString().slice(0, 7);
        if (selectedYear === currentYear && monthKey === currentMonthKey) {
            tr.style.fontWeight = 'bold';
            tr.style.backgroundColor = '#e9f5ff';
        }

        tr.innerHTML = `
            <td data-label="월">${parseInt(month)}월</td>
            <td data-label="수입"><span class="income">${formatToManwon(monthData.income)}</span></td>
            <td data-label="지출"><span class="cost">${formatToManwon(monthData.expense)}</span></td>
            <td data-label="정산"><strong>${formatToManwon(netIncome)}</strong></td>
            <td data-label="운행거리(km)">${monthData.distance.toFixed(1)}</td>
            <td data-label="이동">${monthData.tripCount}</td>
            <td data-label="소요시간">${duration}</td>
        `;
        monthlyTbody.appendChild(tr);
    });
}
function viewDateDetails(date) {
    todayDatePicker.value = date;
    tabBtns.forEach(b => b.classList.remove("active"));
    document.querySelector('.tab-btn[data-view="today"]').classList.add("active");
    viewContents.forEach(c => c.classList.remove('active'));
    document.getElementById("today-view").classList.add("active");
    displayTodayRecords();
    const viewSection = document.querySelector(".view-section");
    if (viewSection) viewSection.scrollIntoView({ behavior: "smooth" });
}
function displayCurrentMonthData() {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    const now = new Date();
    const currentPeriod = now.toISOString().slice(0, 7);
    const currentMonth = now.getMonth() + 1;
    const records = allRecords.filter(r => r.date.startsWith(currentPeriod) && r.type !== '이동취소');
    currentMonthTitle.textContent = `${currentMonth}월 실시간 요약`;
    let totalIncome = 0, totalExpense = 0, totalTripCount = 0, totalDistance = 0, totalLiters = 0;
    records.forEach(r => {
        totalIncome += parseInt(r.income || 0);
        totalExpense += parseInt(r.cost || 0);
        if (['화물운송'].includes(r.type)) {
            totalTripCount++;
            totalDistance += parseFloat(r.distance || 0);
        }
        if (r.type === '주유소') totalLiters += parseFloat(r.liters || 0);
    });
    const netIncome = totalIncome - totalExpense;
    const operatingDays = (new Set(records.map(r => r.date))).size;
    const avgEconomy = totalLiters > 0 && totalDistance > 0 ? (totalDistance / totalLiters).toFixed(2) : 0;
    const costPerKm = totalDistance > 0 ? Math.round(totalExpense / totalDistance) : 0;
    currentMonthOperatingDays.textContent = `${operatingDays} 일`;
    currentMonthTripCount.textContent = `${totalTripCount} 건`;
    currentMonthTotalMileage.textContent = `${totalDistance.toFixed(1)} km`;
    currentMonthIncome.textContent = `${formatToManwon(totalIncome)} 만원`;
    currentMonthExpense.textContent = `${formatToManwon(totalExpense)} 만원`;
    currentMonthNetIncome.textContent = `${formatToManwon(netIncome)} 만원`;
    currentMonthAvgEconomy.textContent = `${avgEconomy} km/L`;
    currentMonthCostPerKm.textContent = `${costPerKm.toLocaleString()} 원`;
    const subsidyLimit = parseFloat(localStorage.getItem("fuel_subsidy_limit")) || 0;
    const usedLiters = records.reduce(((sum, r) => sum + (r.type === '주유소' ? parseFloat(r.liters || 0) : 0)), 0);
    const remainingLiters = subsidyLimit - usedLiters;
    const progressPercent = subsidyLimit > 0 ? Math.min(100, 100 * usedLiters / subsidyLimit).toFixed(1) : 0;
    subsidySummaryDiv.innerHTML = `<div class="progress-label">월 한도: ${subsidyLimit.toLocaleString()} L | 사용: ${usedLiters.toFixed(1)} L | 잔여: ${remainingLiters.toFixed(1)} L</div><div class="progress-bar-container"><div class="progress-bar progress-bar-used" style="width: ${progressPercent}%;"></div></div>`;
}
function displayCumulativeData() {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    const validRecords = allRecords.filter(r => r.type !== '이동취소');
    let totalIncome = 0, totalExpense = 0, totalTripCount = 0, totalLiters = 0, recordedDistance = 0;
    
    validRecords.forEach(r => {
        totalIncome += parseInt(r.income || 0);
        totalExpense += parseInt(r.cost || 0);
        if (r.type === '주유소') totalLiters += parseFloat(r.liters || 0);
        if (['화물운송'].includes(r.type)) {
            totalTripCount++;
            recordedDistance += parseFloat(r.distance || 0);
        }
    });
    const correction = parseFloat(localStorage.getItem("mileage_correction")) || 0;
    const totalMileage = recordedDistance + correction;
    const netIncome = totalIncome - totalExpense;
    const avgEconomy = totalLiters > 0 && totalMileage > 0 ? (totalMileage / totalLiters).toFixed(2) : 0;
    const costPerKm = totalMileage > 0 ? Math.round(totalExpense / totalMileage) : 0;
    const operatingDays = (new Set(validRecords.map(r => r.date))).size;
    cumulativeOperatingDays.textContent = `${operatingDays} 일`;
    cumulativeTripCount.textContent = `${totalTripCount} 건`;
    cumulativeTotalMileage.textContent = `${Math.round(totalMileage).toLocaleString()} km`;
    cumulativeIncome.textContent = `${formatToManwon(totalIncome)} 만원`;
    cumulativeExpense.textContent = `${formatToManwon(totalExpense)} 만원`;
    cumulativeNetIncome.textContent = `${formatToManwon(netIncome)} 만원`;
    cumulativeAvgEconomy.textContent = `${avgEconomy} km/L`;
    cumulativeCostPerKm.textContent = `${costPerKm.toLocaleString()} 원`;
    renderMileageSummary();
}
function renderMileageSummary(period = 'monthly') {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    const validRecords = allRecords.filter(r => ['화물운송'].includes(r.type));
    let summaryData = {};
    const now = new Date();
    
    if (period === 'monthly') {
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = d.toISOString().slice(0, 7);
            summaryData[monthKey] = 0;
        }
        validRecords.forEach(r => {
            const monthKey = r.date.substring(0, 7);
            if (summaryData.hasOwnProperty(monthKey)) summaryData[monthKey]++;
        });
    } else if (period === 'weekly') {
        const weekKeys = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - (i * 7));
            const dayOfWeek = d.getDay();
            const weekStart = new Date(d);
            weekStart.setDate(d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Monday start
            const weekKey = weekStart.toISOString().slice(0, 10);
            if (!weekKeys.includes(weekKey)) weekKeys.push(weekKey);
        }
        weekKeys.forEach(key => summaryData[key] = 0);
        validRecords.forEach(r => {
            const d = new Date(r.date + 'T00:00:00');
            const dayOfWeek = d.getDay();
            const weekStart = new Date(d);
            weekStart.setDate(d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
            const weekKey = weekStart.toISOString().slice(0, 10);
            if (summaryData.hasOwnProperty(weekKey)) summaryData[weekKey]++;
        });
    }

    let cardsHtml = '';
    if (Object.keys(summaryData).length === 0 || !Object.values(summaryData).some(v => v > 0)) {
        cardsHtml = '<p class="note" style="text-align: center; grid-column: 1 / -1; padding: 1em 0;">표시할 운행 기록이 없습니다.</p>';
    } else {
        for (const key in summaryData) {
            const count = summaryData[key];
            let label = '';
            if (period === 'monthly') {
                const year = key.substring(0, 4);
                const month = parseInt(key.substring(5, 7));
                label = `${year}년 ${month}월`;
            } else if (period === 'weekly') {
                const startDate = new Date(key + "T00:00:00");
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 6);
                label = `${startDate.getMonth()+1}/${startDate.getDate()}~${endDate.getMonth()+1}/${endDate.getDate()}`;
            }
            cardsHtml += `<div class="metric-card">
                            <span class="metric-label">${label}</span>
                            <span class="metric-value">${count} 건</span>
                          </div>`;
        }
    }
    mileageSummaryCards.innerHTML = cardsHtml;
}

function populateSelectors() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const years = [...new Set(records.map(r => r.date.substring(0, 4)))].sort((a,b) => b - a);
    const currentYear = new Date().getFullYear().toString();
    if (!years.includes(currentYear)) years.unshift(currentYear);
    
    const yearOptions = years.map(y => `<option value="${y}">${y}년</option>`).join('');
    dailyYearSelect.innerHTML = yearOptions;
    weeklyYearSelect.innerHTML = yearOptions;
    monthlyYearSelect.innerHTML = yearOptions;
    printYearSelect.innerHTML = yearOptions;

    const monthOptions = Array.from({ length: 12 }, ((_, i) => `<option value="${(i+1).toString().padStart(2,"0")}">${i+1}월</option>`)).join('');
    dailyMonthSelect.innerHTML = monthOptions;
    weeklyMonthSelect.innerHTML = monthOptions;
    printMonthSelect.innerHTML = monthOptions;
    
    dailyYearSelect.value = currentYear;
    weeklyYearSelect.value = currentYear;
    monthlyYearSelect.value = currentYear;
    printYearSelect.value = currentYear;
    
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
    dailyMonthSelect.value = currentMonth;
    weeklyMonthSelect.value = currentMonth;
    printMonthSelect.value = currentMonth;
}
function updateAllDisplays() {
    const activeView = document.querySelector(".view-content.active")?.id;
    if (activeView === 'today-view') displayTodayRecords();
    else if (activeView === 'daily-view') displayDailyRecords();
    else if (activeView === 'weekly-view') displayWeeklyRecords();
    else if (activeView === 'monthly-view') displayMonthlyRecords();
    
    if (!settingsPage.classList.contains('hidden')) {
        displayCumulativeData();
        displayCurrentMonthData();
    }
}

function deleteRecord(id) {
    if (confirm('이 기록을 정말로 삭제하시겠습니까?')) {
        let records = JSON.parse(localStorage.getItem('records')) || [];
        records = records.filter(r => r.id !== id);
        localStorage.setItem('records', JSON.stringify(records));
        cancelEdit();
        updateAllDisplays();
    }
}

function editRecord(id) {
    if (mainPage.classList.contains('hidden')) backToMainBtn.click();
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const recordToEdit = records.find(r => r.id === id);
    if (!recordToEdit) return;

    dateInput.value = recordToEdit.date;
    timeInput.value = recordToEdit.time;
    typeSelect.value = recordToEdit.type;
    fromCenterInput.value = recordToEdit.from || '';
    toCenterInput.value = recordToEdit.to || '';
    manualDistanceInput.value = recordToEdit.distance;
    incomeInput.value = recordToEdit.income > 0 ? (recordToEdit.income / 10000).toFixed(2) : '';
    costInput.value = recordToEdit.cost > 0 ? (recordToEdit.cost / 10000).toFixed(2) : '';
    fuelLitersInput.value = recordToEdit.liters;
    fuelUnitPriceInput.value = recordToEdit.unitPrice;
    fuelBrandSelect.value = recordToEdit.brand;
    supplyItemInput.value = recordToEdit.supplyItem;
    supplyMileageInput.value = recordToEdit.mileage;
    expenseItemInput.value = recordToEdit.expenseItem;
    
    toggleUI(recordToEdit.type);
    
    editIdInput.value = id;
    editModeIndicator.classList.remove('hidden');
    tripActions.classList.add('hidden');
    fuelActions.classList.add('hidden');
    editActions.classList.remove('hidden');
    dateInput.disabled = true;
    timeInput.disabled = true;
    deleteEditBtn.onclick = () => deleteRecord(id);
    
    window.scrollTo(0, 0);
    updateAddressDisplay();
}
function cancelEdit() {
    recordForm.reset();
    editIdInput.value = "";
    
    editModeIndicator.classList.add('hidden');
    editActions.classList.add('hidden');
    dateInput.disabled = false;
    timeInput.disabled = false;
    deleteEditBtn.onclick = null;
    
    dateInput.value = getTodayString();
    timeInput.value = getCurrentTimeString();
    addressDisplay.innerHTML = "";
    manualDistanceInput.value = "";
    toggleUI(typeSelect.value);
}
function getFormData(isNew = false) {
    const fromValue = fromCenterInput.value.trim();
    const toValue = toCenterInput.value.trim();
    addCenter(fromValue);
    addCenter(toValue);
    const formData = {
        date: dateInput.value, time: timeInput.value, type: typeSelect.value,
        from: fromValue, to: toValue,
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
    if (isNew) formData.id = Date.now();
    return formData;
}
function exportToJson() {
    const backupData = {
        records: JSON.parse(localStorage.getItem('records') || '[]'),
        centers: getCenters(),
        saved_locations: getSavedLocations(),
        saved_fares: JSON.parse(localStorage.getItem('saved_fares') || '{}'),
        mileage_correction: parseFloat(localStorage.getItem('mileage_correction')) || 0,
        fuel_subsidy_limit: parseFloat(localStorage.getItem('fuel_subsidy_limit')) || 0
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `운행기록_백업_${(new Date).toISOString().slice(0,10)}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('JSON 파일로 저장(백업)되었습니다!');
}
function importFromJson(event) {
    if (!confirm('경고!\n현재 앱의 모든 기록과 설정이 선택한 파일의 내용으로 완전히 대체됩니다.\n계속하시겠습니까?')) {
        event.target.value = ''; return;
    }
    const file = event.target.files[0];
    if (!file) { event.target.value = ''; return; }
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            const data = JSON.parse(content);
            if (data.saved_locations && typeof data.saved_locations === 'object') {
                const migratedLocations = {};
                for (const centerName in data.saved_locations) {
                    const locationData = data.saved_locations[centerName];
                    let finalAddress = '', finalMemo = '';
                    if (typeof locationData === 'object' && locationData !== null) {
                        finalAddress = locationData.address || '';
                        finalMemo = locationData.memo || '';
                    } else if (typeof locationData === 'string') {
                        finalAddress = locationData;
                    }
                    const memoKeywords = ['메모:', '참고:', '비고:'];
                    for (const keyword of memoKeywords) {
                        if (finalAddress.includes(keyword)) {
                            const parts = finalAddress.split(keyword);
                            finalAddress = parts[0].trim();
                            if (!finalMemo) finalMemo = parts.slice(1).join(keyword).trim();
                            break;
                        }
                    }
                    migratedLocations[centerName] = { address: finalAddress, memo: finalMemo };
                }
                data.saved_locations = migratedLocations;
            }
            if (data && Array.isArray(data.records)) {
                localStorage.setItem('records', JSON.stringify(data.records));
                if (Array.isArray(data.centers)) localStorage.setItem('logistics_centers', JSON.stringify(data.centers));
                if (data.saved_locations) localStorage.setItem('saved_locations', JSON.stringify(data.saved_locations));
                if (data.saved_fares) localStorage.setItem('saved_fares', JSON.stringify(data.saved_fares));
                if (data.mileage_correction) localStorage.setItem('mileage_correction', data.mileage_correction);
                if (data.fuel_subsidy_limit) localStorage.setItem('fuel_subsidy_limit', data.fuel_subsidy_limit);
            } else if (Array.isArray(data)) {
                localStorage.setItem('records', JSON.stringify(data));
            } else {
                throw new Error('Invalid file format');
            }
            alert('데이터 복원이 성공적으로 완료되었습니다. 앱을 새로고침합니다.');
            location.reload();
        } catch (error) {
            console.error('Import Error:', error);
            alert('오류: 파일을 읽는 중 문제가 발생했습니다. 유효한 JSON 파일인지 확인해주세요.');
        } finally {
            event.target.value = '';
        }
    };
    reader.readAsText(file);
}
function displayCenterList() {
    centerListContainer.innerHTML = "";
    const centers = getCenters();
    const locations = getSavedLocations();
    if (centers.length === 0) return void(centerListContainer.innerHTML = '<p class="note">등록된 지역이 없습니다.</p>');
    centers.forEach(center => {
        const locationData = locations[center] || { address: "", memo: "" };
        const address = locationData.address || "", memo = locationData.memo || "";
        const item = document.createElement("div");
        item.className = "center-item";
        item.dataset.centerName = center;
        item.innerHTML = `<div class="info"><span class="center-name">${center}</span><div class="action-buttons"><button class="edit-btn">수정</button><button class="delete-btn">삭제</button></div></div>${address?`<span class="note">주소: ${address}</span>`:""}${memo?`<span class="note">메모: ${memo}</span>`:""}`;
        centerListContainer.appendChild(item);
    });
}
function deleteCenter(centerNameToDelete) {
    if (confirm(`'${centerNameToDelete}' 지역을 목록에서 정말 삭제하시겠습니까?\n(기존 기록은 변경되지 않습니다.)`)) {
        let centers = getCenters(), locations = getSavedLocations();
        centers = centers.filter(c => c !== centerNameToDelete);
        delete locations[centerNameToDelete];
        localStorage.setItem('logistics_centers', JSON.stringify(centers));
        localStorage.setItem('saved_locations', JSON.stringify(locations));
        refreshCenterUI();
    }
}
function handleCenterEdit(e) {
    const item = e.target.closest(".center-item");
    const originalName = item.dataset.centerName;
    const locations = getSavedLocations();
    const originalData = locations[originalName] || { address: "", memo: "" };
    const originalAddress = originalData.address || "", originalMemo = originalData.memo || "";
    item.innerHTML = `<div class="edit-form"><input type="text" class="edit-input" value="${originalName}" placeholder="지역 이름"><input type="text" class="edit-address-input" value="${originalAddress}" placeholder="주소 (선택)"><input type="text" class="edit-memo-input" value="${originalMemo}" placeholder="메모 (선택)"><div class="action-buttons"><button class="setting-save-btn">저장</button><button class="cancel-edit-btn">취소</button></div></div>`;
    item.querySelector(".setting-save-btn").onclick = () => saveCenterEdit(item, originalName);
    item.querySelector(".cancel-edit-btn").onclick = () => refreshCenterUI();
    item.querySelector(".edit-input").focus();
}
function saveCenterEdit(item, originalName) {
    const newName = item.querySelector(".edit-input").value.trim();
    const newAddress = item.querySelector(".edit-address-input").value.trim();
    const newMemo = item.querySelector(".edit-memo-input").value.trim();
    if (!newName) return void alert("지역 이름은 비워둘 수 없습니다.");
    let centers = getCenters(), locations = getSavedLocations();
    if (centers.includes(newName) && newName !== originalName) return void alert("이미 존재하는 지역 이름입니다.");
    centers = centers.map(c => c === originalName ? newName : c);
    localStorage.setItem('logistics_centers', JSON.stringify(centers));
    delete locations[originalName];
    locations[newName] = { address: newAddress, memo: newMemo };
    localStorage.setItem('saved_locations', JSON.stringify(locations));
    let records = JSON.parse(localStorage.getItem('records')) || [];
    records = records.map(r => {
        if (r.from === originalName) r.from = newName;
        if (r