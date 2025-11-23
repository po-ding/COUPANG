/** 버전: 7.2 | 최종 수정일: 2025-11-18 (소요시간 표시 및 대기 기능 완전 제거) */

// --- DOM 요소 ---
const recordForm = document.getElementById('record-form');
const clearBtn = document.getElementById('clear-btn');
const exportCsvBtn = document.getElementById('export-csv-btn');
const exportJsonBtn = document.getElementById('export-json-btn');
const importJsonBtn = document.getElementById('import-json-btn');
const importFileInput = document.getElementById('import-file-input');
const datetimeInfoFieldset = document.getElementById('datetime-info-fieldset');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const typeSelect = document.getElementById('type');
const transportDetails = document.getElementById('transport-details');
const fromSelect = document.getElementById('from-center');
const toSelect = document.getElementById('to-center');
const fromCustom = document.getElementById('from-custom');
const toCustom = document.getElementById('to-custom');
const costInfoFieldset = document.getElementById('cost-info-fieldset');
const costWrapper = document.getElementById('cost-wrapper');
const incomeWrapper = document.getElementById('income-wrapper');
const costInput = document.getElementById('cost');
const incomeInput = document.getElementById('income');
const fuelDetails = document.getElementById('fuel-details');
const fuelUnitPriceInput = document.getElementById('fuel-unit-price');
const fuelLitersInput = document.getElementById('fuel-liters');
const fuelBrandSelect = document.getElementById('fuel-brand');
const ureaDetails = document.getElementById('urea-details');
const ureaUnitPriceInput = document.getElementById('urea-unit-price');
const ureaLitersInput = document.getElementById('urea-liters');
const ureaStationInput = document.getElementById('urea-station');
const supplyDetails = document.getElementById('supply-details');
const supplyItemInput = document.getElementById('supply-item');
const supplyMileageInput = document.getElementById('supply-mileage');

const cancelEditBtn = document.getElementById('cancel-edit-btn');
const deleteEditBtn = document.getElementById('delete-edit-btn');
const editIdInput = document.getElementById('edit-id');
const tripActions = document.getElementById('trip-actions');
const editActions = document.getElementById('edit-actions');

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
const batchFromSelect = document.getElementById('batch-from-center');
const batchToSelect = document.getElementById('batch-to-center');
const batchFromCustom = document.getElementById('batch-from-custom');
const batchToCustom = document.getElementById('batch-to-custom');
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
    if (!centerName || centerName === 'direct') return false;
    const locations = getSavedLocations();
    locations[centerName] = data;
    localStorage.setItem('saved_locations', JSON.stringify(locations));
    return true;
}
function addCenter(newCenter, address = '', memo = '') {
    if (!newCenter || newCenter.trim() === '') return false;
    const centers = getCenters();
    const trimmedCenter = newCenter.trim();
    if (!centers.includes(trimmedCenter)) {
        centers.push(trimmedCenter);
        localStorage.setItem('logistics_centers', JSON.stringify(centers));
        saveLocationData(trimmedCenter, {
            address: address.trim(),
            memo: memo.trim()
        });
        refreshCenterUI();
        return true;
    }
    return false;
}
function populateCenterSelectors() {
    const centers = getCenters();
    const options = centers.map(c => `<option value="${c}">${c}</option>`).join('') + '<option value="direct">직접 입력</option>';
    fromSelect.innerHTML = options;
    toSelect.innerHTML = options;
    batchFromSelect.innerHTML = options;
    batchToSelect.innerHTML = options;
}

function toggleUI(type) {
    transportDetails.classList.add('hidden');
    fuelDetails.classList.add('hidden');
    ureaDetails.classList.add('hidden');
    supplyDetails.classList.add('hidden');
    costInfoFieldset.classList.add('hidden');
    incomeWrapper.classList.remove('hidden');
    costWrapper.classList.remove('hidden');

    if (['화물운송', '공차이동', '이동취소'].includes(type)) {
        transportDetails.classList.remove('hidden');
    } else if (type === '주유소') {
        fuelDetails.classList.remove('hidden');
    } else if (type === '요소수') {
        ureaDetails.classList.remove('hidden');
    } else if (type === '소모품') {
        supplyDetails.classList.remove('hidden');
        supplyMileageInput.value = '';
    }

    if (type === '화물운송') {
        costInfoFieldset.classList.remove('hidden');
        costWrapper.classList.add('hidden');
    } else if (['공차이동', '이동취소'].includes(type)) {
    } else {
        costInfoFieldset.classList.remove('hidden');
        incomeWrapper.classList.add('hidden');
    }
    costInput.readOnly = false;
}

function updateAddressDisplay() {
    const fromValue = fromSelect.value;
    const toValue = toSelect.value;
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
        if (['화물운송', '공차이동'].includes(r.type)) {
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
        { label: '이동건수', value: totalTripCount, unit: ' 건' },
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

function displayTodayRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const selectedDate = todayDatePicker.value;
    const dateObj = new Date(selectedDate + 'T00:00:00');
    const title = dateObj.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
    const filteredRecords = records.filter(r => r.date === selectedDate);
    
    todayTbody.innerHTML = '';
    
    let recordsForTable = filteredRecords.filter(r => r.type !== '주유소');

    // 시간순으로 정렬하여 소요시간 계산
    recordsForTable.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    for (let i = 0; i < recordsForTable.length; i++) {
        if (i > 0) {
            const currentTime = new Date(`${recordsForTable[i].date}T${recordsForTable[i].time}`);
            const prevTime = new Date(`${recordsForTable[i - 1].date}T${recordsForTable[i - 1].time}`);
            const diff = currentTime - prevTime; // milliseconds
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            recordsForTable[i].duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        } else {
            recordsForTable[i].duration = '-';
        }
    }

    // 최신순으로 다시 정렬하여 표시
    recordsForTable.reverse();
    
    recordsForTable.forEach(r => {
        const tr = document.createElement('tr');
        tr.onclick = () => editRecord(r.id);

        let detailsCell = '', moneyCell = '';

        if (['화물운송', '공차이동', '이동취소'].includes(r.type)) {
            const fromLocation = `<strong class="location-clickable" data-center-name="${r.from}">${r.from}</strong>`;
            const toLocation = `<strong class="location-clickable" data-center-name="${r.to}">${r.to}</strong>`;
            detailsCell = `${fromLocation} →<br>${toLocation}`; 
            if (r.type !== '이동취소') {
                detailsCell += `<br><span class="note">${r.distance} km</span>`;
            }
        } else {
            detailsCell = `<strong>${r.supplyItem || r.type}</strong>`;
            if (r.mileage > 0) detailsCell += `<br><span class="note">${r.mileage.toLocaleString()} km</span>`;
        }
        
        moneyCell = (r.income > 0 ? `<span class="income">+${formatToManwon(r.income)}</span>` : '') + 
                    (r.cost > 0 ? ` <span class="cost">-${formatToManwon(r.cost)}</span>` : '');

        tr.innerHTML = `
            <td data-label="시간">${r.time}</td>
            <td data-label="소요시간">${r.duration}</td>
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
    const validDailyRecords = currentMonthRecords.filter(r => r.type !== '이동취소' && r.type !== '주유소');
    validDailyRecords.forEach(r => {
        if (!recordsByDate[r.date]) {
            recordsByDate[r.date] = { income: 0, expense: 0, distance: 0, tripCount: 0, liters: 0 };
        }
        recordsByDate[r.date].income += parseInt(r.income || 0);
        recordsByDate[r.date].expense += parseInt(r.cost || 0);
        if (['화물운송', '공차이동'].includes(r.type)) {
            recordsByDate[r.date].distance += parseFloat(r.distance || 0);
            recordsByDate[r.date].tripCount++;
        }
        if (r.type === '주유소') recordsByDate[r.date].liters += parseFloat(r.liters || 0);
    });
    Object.keys(recordsByDate).sort().reverse().forEach(date => {
        const data = recordsByDate[date];
        const day = date.substring(8, 10);
        const dailyNet = data.income - data.expense;
        const tr = document.createElement('tr');
        if (date === getTodayString()) {
            tr.style.fontWeight = 'bold';
            tr.style.backgroundColor = '#e9f5ff';
        }
        tr.innerHTML = `
            <td data-label="일">${parseInt(day)}일</td>
            <td data-label="수입"><span class="income">${formatToManwon(data.income)}</span></td>
            <td data-label="지출"><span class="cost">${formatToManwon(data.expense)}</span></td>
            <td data-label="정산"><strong>${formatToManwon(dailyNet)}</strong></td>
            <td data-label="운행거리(km)">${data.distance.toFixed(1)}</td>
            <td data-label="이동">${data.tripCount}</td>
            <td data-label="주유량(L)">${data.liters.toFixed(2)}</td>
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

        let data = { income: 0, expense: 0, distance: 0, tripCount: 0, liters: 0 };
        const validWeekRecords = weekRecords.filter(r => r.type !== '이동취소');

        validWeekRecords.forEach(r => {
            data.income += parseInt(r.income || 0);
            data.expense += parseInt(r.cost || 0);
            if (['화물운송', '공차이동'].includes(r.type)) {
                data.distance += parseFloat(r.distance || 0);
                data.tripCount++;
            }
            if (r.type === '주유소') data.liters += parseFloat(r.liters || 0);
        });

        const weekNet = data.income - data.expense;
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
            <td data-label="주유량(L)">${data.liters.toFixed(2)}</td>
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
    for (let i = 1; i <= 12; i++) {
        const monthKey = `${selectedYear}-${i.toString().padStart(2, '0')}`;
        recordsByMonth[monthKey] = { income: 0, expense: 0, distance: 0, liters: 0, tripCount: 0 };
    }
    yearlyRecords.forEach(r => {
        if (r.type === '이동취소') return;
        const monthKey = r.date.substring(0, 7);
        if (!recordsByMonth[monthKey]) return;
        recordsByMonth[monthKey].income += parseInt(r.income || 0);
        recordsByMonth[monthKey].expense += parseInt(r.cost || 0);
        if (['화물운송', '공차이동'].includes(r.type)) {
            recordsByMonth[monthKey].distance += parseFloat(r.distance || 0);
            recordsByMonth[monthKey].tripCount++;
        }
        if (r.type === '주유소') recordsByMonth[monthKey].liters += parseFloat(r.liters || 0);
    });
    monthlyTbody.innerHTML = '';
    Object.keys(recordsByMonth).sort().reverse().forEach(monthKey => {
        const data = recordsByMonth[monthKey];
        if(data.income === 0 && data.expense === 0 && data.tripCount === 0) return;

        const month = monthKey.substring(5, 7);
        const netIncome = data.income - data.expense;
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
            <td data-label="수입"><span class="income">${formatToManwon(data.income)}</span></td>
            <td data-label="지출"><span class="cost">${formatToManwon(data.expense)}</span></td>
            <td data-label="정산"><strong>${formatToManwon(netIncome)}</strong></td>
            <td data-label="운행거리(km)">${data.distance.toFixed(1)}</td>
            <td data-label="이동">${data.tripCount}</td>
            <td data-label="주유량(L)">${data.liters.toFixed(2)}</td>
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
        if (['화물운송', '공차이동'].includes(r.type)) {
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
        if (['화물운송', '공차이동'].includes(r.type)) {
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
    const validRecords = allRecords.filter(r => ['화물운송', '공차이동'].includes(r.type));
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

    const monthOptions = Array.from({ length: 12 }, ((_, i) => `<option value="${(i+1).toString().padStart(2,"0")}">${i+1}월</option>`)).join('');
    dailyMonthSelect.innerHTML = monthOptions;
    weeklyMonthSelect.innerHTML = monthOptions;
    
    dailyYearSelect.value = currentYear;
    weeklyYearSelect.value = currentYear;
    monthlyYearSelect.value = currentYear;
    
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
    dailyMonthSelect.value = currentMonth;
    weeklyMonthSelect.value = currentMonth;
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
    populateCenterSelectors();
    fromSelect.value = recordToEdit.from;
    toSelect.value = recordToEdit.to;
    manualDistanceInput.value = recordToEdit.distance;
    incomeInput.value = recordToEdit.income > 0 ? (recordToEdit.income / 10000).toFixed(2) : '';
    costInput.value = recordToEdit.cost > 0 ? (recordToEdit.cost / 10000).toFixed(2) : '';
    fuelLitersInput.value = recordToEdit.liters;
    fuelUnitPriceInput.value = recordToEdit.unitPrice;
    fuelBrandSelect.value = recordToEdit.brand;
    ureaLitersInput.value = recordToEdit.ureaLiters;
    ureaUnitPriceInput.value = recordToEdit.ureaUnitPrice;
    ureaStationInput.value = recordToEdit.ureaStation;
    supplyItemInput.value = recordToEdit.supplyItem;
    supplyMileageInput.value = recordToEdit.mileage;
    
    toggleUI(recordToEdit.type);
    
    editIdInput.value = id;
    tripActions.classList.add('hidden');
    editActions.classList.remove('hidden');
    deleteEditBtn.onclick = () => deleteRecord(id);
    
    window.scrollTo(0, 0);
    updateAddressDisplay();
}
function cancelEdit() {
    recordForm.reset();
    editIdInput.value = "";
    
    tripActions.classList.remove('hidden');
    editActions.classList.add('hidden');
    deleteEditBtn.onclick = null;
    
    dateInput.value = getTodayString();
    timeInput.value = getCurrentTimeString();
    addressDisplay.innerHTML = "";
    manualDistanceInput.value = "";
    toggleUI(typeSelect.value);
}
function getFormData(isNew = false) {
    const fromValue = fromSelect.value === 'direct' ? fromCustom.value : fromSelect.value;
    const toValue = toSelect.value === 'direct' ? toCustom.value : toSelect.value;
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
        ureaLiters: parseFloat(ureaLitersInput.value) || 0,
        ureaUnitPrice: parseInt(ureaUnitPriceInput.value) || 0,
        ureaStation: ureaStationInput.value || '',
        supplyItem: supplyItemInput.value || '',
        mileage: parseInt(supplyMileageInput.value) || 0
    };
    if (isNew) formData.id = Date.now();
    return formData;
}
function exportToCsv() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    if (records.length === 0) return void showToast('저장할 기록이 없습니다.');
    const headers = ['날짜', '시간', '구분', '출발지', '도착지', '운행거리(km)', '수입(원)', '지출(원)', '주유량(L)', '단가(원/L)', '주유브랜드', '요소수주입량(L)', '요소수단가(원/L)', '요소수주입처', '소모품내역', '교체시점(km)'];
    const escapeCsvCell = cell => {
        if (cell == null) return '';
        const str = String(cell);
        return str.includes(',') ? `"${str}"` : str;
    };
    const csvRows = [headers.join(',')];
    records.forEach(r => {
        const row = [r.date, r.time, r.type, r.from, r.to, r.distance, r.income, r.cost, r.liters, r.unitPrice, r.brand, r.ureaLiters, r.ureaUnitPrice, r.ureaStation, r.supplyItem, r.mileage];
        csvRows.push(row.map(escapeCsvCell).join(','))
    });
    const csvString = "" + csvRows.join('\n');
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `운행기록_백업_${(new Date).toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('엑셀(CSV) 파일로 저장되었습니다!');
}
function exportToJson() {
    const backupData = {
        records: JSON.parse(localStorage.getItem('records') || '[]'),
        centers: getCenters(),
        saved_locations: getSavedLocations(),
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
        if (r.to === originalName) r.to = newName;
        return r;
    });
    localStorage.setItem('records', JSON.stringify(records));
    refreshCenterUI();
    updateAllDisplays();
}
function refreshCenterUI() {
    displayCenterList();
    populateCenterSelectors();
}
function updateCentersFromRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    if (records.length === 0) return;
    const centers = getCenters();
    const centerSet = new Set(centers);
    let needsUpdate = false;
    records.forEach(r => {
        if (r.from && !centerSet.has(r.from)) { centerSet.add(r.from); centers.push(r.from); needsUpdate = true }
        if (r.to && !centerSet.has(r.to)) { centerSet.add(r.to); centers.push(r.to); needsUpdate = true }
    });
    if (needsUpdate) localStorage.setItem('logistics_centers', JSON.stringify(centers));
}

function saveFormState() {
    const state = { date: dateInput.value, time: timeInput.value, type: typeSelect.value, from: fromSelect.value, to: toSelect.value, fromCustom: fromCustom.value, toCustom: toCustom.value, manualDistance: manualDistanceInput.value, fuelUnitPrice: fuelUnitPriceInput.value, fuelLiters: fuelLitersInput.value, fuelBrand: fuelBrandSelect.value, ureaUnitPrice: ureaUnitPriceInput.value, ureaLiters: ureaLitersInput.value, ureaStation: ureaStationInput.value, supplyItem: supplyItemInput.value, supplyMileage: supplyMileageInput.value, cost: costInput.value, income: incomeInput.value };
    sessionStorage.setItem('unsavedRecordForm', JSON.stringify(state));
}
function loadFormState() {
    const savedStateJSON = sessionStorage.getItem('unsavedRecordForm');
    if (!savedStateJSON) return;
    const state = JSON.parse(savedStateJSON);
    if (!state) return;
    dateInput.value = state.date; timeInput.value = state.time; typeSelect.value = state.type; fromSelect.value = state.from; toSelect.value = state.to; fromCustom.value = state.fromCustom; toCustom.value = state.toCustom; manualDistanceInput.value = state.manualDistance; fuelUnitPriceInput.value = state.fuelUnitPrice; fuelLitersInput.value = state.fuelLiters; fuelBrandSelect.value = state.fuelBrand; ureaUnitPriceInput.value = state.ureaUnitPrice; ureaLitersInput.value = state.ureaLiters; ureaStationInput.value = state.ureaStation; supplyItemInput.value = state.supplyItem; supplyMileageInput.value = state.supplyMileage; costInput.value = state.cost; incomeInput.value = state.income;
    toggleUI(typeSelect.value);
    fromCustom.classList.toggle("hidden", fromSelect.value !== 'direct');
    toCustom.classList.toggle("hidden", toSelect.value !== 'direct');
    updateAddressDisplay();
}

recordForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const action = this.submitAction.value;
    const editingId = parseInt(editIdInput.value);
    
    if (action === 'start' || action === 'end' || action === 'end-edit') {
        dateInput.value = getTodayString();
        timeInput.value = getCurrentTimeString();
    }

    let records = JSON.parse(localStorage.getItem('records')) || [];
    let toastMessage = '';

    if (editingId) {
        const recordIndex = records.findIndex(r => r.id === editingId);
        if (recordIndex > -1) {
            records[recordIndex] = { ...getFormData(), id: editingId }; // Keep original ID
            toastMessage = action === 'end-edit' ? '운행이 종료 기록되었습니다.' : '기록이 수정되었습니다.';
        }
    } else {
        const newRecord = getFormData(true);
        if (newRecord.type === '화물운송' && newRecord.income > 0) {
            const fareKey = `${newRecord.from}-${newRecord.to}`;
            const fares = JSON.parse(localStorage.getItem('saved_fares')) || {};
            fares[fareKey] = newRecord.income;
            localStorage.setItem('saved_fares', JSON.stringify(fares));
        }
        records.push(newRecord);
        toastMessage = '운행 기록이 저장되었습니다.';
    }

    records.sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
    localStorage.setItem('records', JSON.stringify(records));
    
    showToast(toastMessage);
    cancelEdit();
    sessionStorage.removeItem('unsavedRecordForm');
    updateAllDisplays();
});

todayTbody.addEventListener("click", e => {
    if (e.target.classList.contains("location-clickable")) {
        e.stopPropagation();
        const centerName = e.target.dataset.centerName;
        copyAddressToClipboard(centerName)
    }
});
addressDisplay.addEventListener("click", e => {
    if (e.target.classList.contains("address-clickable")) {
        copyTextToClipboard(e.target.dataset.address, '주소가 복사되었습니다.')
    }
});
batchApplyBtn.addEventListener("click", () => {
    const from = batchFromSelect.value === 'direct' ? batchFromCustom.value : batchFromSelect.value;
    const to = batchToSelect.value === 'direct' ? batchToCustom.value : batchToSelect.value;
    const income = parseFloat(batchIncomeInput.value) || 0;
    if (!from || !to || income <= 0) { alert("출발지, 도착지를 선택하고 유효한 운송 수입을 입력하세요."); return }
    let records = JSON.parse(localStorage.getItem('records')) || [];
    let updatedCount = 0;
    const recordsToUpdate = records.filter(r => r.type === '화물운송' && r.from === from && r.to === to && r.income === 0);
    if (recordsToUpdate.length === 0) { showToast('해당 구간의 미정산 기록이 없습니다.'); return }
    if (confirm(`정말로 '${from} -> ${to}' 구간의 미정산 기록 ${recordsToUpdate.length}건에 운임 ${income}만원을 일괄 적용하시겠습니까?`)) {
        records = records.map(r => {
            if (r.type === '화물운송' && r.from === from && r.to === to && r.income === 0) {
                updatedCount++;
                return { ...r, income: income * 10000 }
            }
            return r
        });
        localStorage.setItem('records', JSON.stringify(records));
        batchStatus.textContent = `✅ ${updatedCount}건의 운임이 성공적으로 적용되었습니다!`;
        batchFromSelect.value = getCenters()[0];
        batchToSelect.value = getCenters()[0];
        batchIncomeInput.value = "";
        updateAllDisplays();
        setTimeout((() => batchStatus.textContent = ""), 3000)
    }
});
subsidySaveBtn.addEventListener("click", () => {
    const limit = subsidyLimitInput.value;
    localStorage.setItem('fuel_subsidy_limit', limit);
    showToast(`보조금 한도가 ${limit}L로 저장되었습니다.`);
});
mileageCorrectionSaveBtn.addEventListener("click", () => {
    const correction = mileageCorrectionInput.value;
    localStorage.setItem('mileage_correction', correction);
    showToast(`주행거리 보정값이 ${correction} km로 저장되었습니다.`);
    displayCumulativeData();
});
exportCsvBtn.addEventListener("click", exportToCsv);
exportJsonBtn.addEventListener("click", exportToJson);
importJsonBtn.addEventListener("click", () => importFileInput.click());
importFileInput.addEventListener("change", importFromJson);
clearBtn.addEventListener("click", () => {
    if (confirm("정말로 모든 기록과 설정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
        localStorage.clear();
        sessionStorage.clear();
        alert("모든 데이터가 삭제되었습니다.");
        location.reload()
    }
});
tabBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        if(btn.parentElement.classList.contains('view-tabs')) {
            event.preventDefault();
            tabBtns.forEach(b => {
                if(b.parentElement.classList.contains('view-tabs')) b.classList.remove("active");
            });
            btn.classList.add("active");
            viewContents.forEach(c => c.classList.remove('active'));
            document.getElementById(btn.dataset.view + "-view").classList.add("active");
            updateAllDisplays();
        }
    })
});
todayDatePicker.addEventListener("change", displayTodayRecords);
dailyYearSelect.addEventListener("change", displayDailyRecords);
dailyMonthSelect.addEventListener("change", displayDailyRecords);
weeklyYearSelect.addEventListener("change", displayWeeklyRecords);
weeklyMonthSelect.addEventListener("change", displayWeeklyRecords);
monthlyYearSelect.addEventListener("change", displayMonthlyRecords);

const formatDate = date => date.toISOString().slice(0, 10);
prevDayBtn.addEventListener("click", () => {
    const currentDate = new Date(todayDatePicker.value);
    currentDate.setDate(currentDate.getDate() - 1);
    todayDatePicker.value = formatDate(currentDate);
    displayTodayRecords()
});
nextDayBtn.addEventListener("click", () => {
    const currentDate = new Date(todayDatePicker.value);
    currentDate.setDate(currentDate.getDate() + 1);
    todayDatePicker.value = formatDate(currentDate);
    displayTodayRecords()
});

function calculateCost(type) {
    const unitPriceInput = type === 'fuel' ? fuelUnitPriceInput : ureaUnitPriceInput;
    const litersInput = type === 'fuel' ? fuelLitersInput : ureaLitersInput;
    const unitPrice = parseFloat(unitPriceInput.value) || 0;
    const liters = parseFloat(litersInput.value) || 0;
    if (document.activeElement === litersInput || document.activeElement === unitPriceInput) {
        if (unitPrice > 0 && liters > 0) costInput.value = (Math.round(unitPrice * liters) / 10000).toFixed(2);
    }
}
function calculateLiters() {
    const costInManwon = parseFloat(costInput.value) || 0;
    const type = typeSelect.value;
    if (document.activeElement === costInput) {
        if (type === '주유소') {
            const unitPrice = parseFloat(fuelUnitPriceInput.value) || 0;
            if (costInManwon > 0 && unitPrice > 0) fuelLitersInput.value = (costInManwon * 10000 / unitPrice).toFixed(2);
        } else if (type === '요소수') {
            const unitPrice = parseFloat(ureaUnitPriceInput.value) || 0;
            if (costInManwon > 0 && unitPrice > 0) ureaLitersInput.value = (costInManwon * 10000 / unitPrice).toFixed(2);
        }
    }
}
fuelUnitPriceInput.addEventListener("input", () => calculateCost("fuel"));
fuelLitersInput.addEventListener("input", () => calculateCost("fuel"));
ureaUnitPriceInput.addEventListener("input", () => calculateCost("urea"));
ureaLitersInput.addEventListener("input", () => calculateCost("urea"));
costInput.addEventListener("input", calculateLiters);
typeSelect.addEventListener("change", () => toggleUI(typeSelect.value));
fromSelect.addEventListener("change", () => {
    fromCustom.classList.toggle("hidden", fromSelect.value !== 'direct');
    autoFillIncome();
    updateAddressDisplay()
});
toSelect.addEventListener("change", () => {
    toCustom.classList.toggle("hidden", toSelect.value !== 'direct');
    autoFillIncome();
    updateAddressDisplay()
});
batchFromSelect.addEventListener("change", () => batchFromCustom.classList.toggle("hidden", batchFromSelect.value !== 'direct'));
batchToSelect.addEventListener("change", () => batchToCustom.classList.toggle("hidden", batchToSelect.value !== 'direct'));
cancelEditBtn.addEventListener("click", () => {
    cancelEdit();
    sessionStorage.removeItem('unsavedRecordForm');
});

function autoFillIncome() {
    if (typeSelect.value !== '화물운송') return;
    const from = fromSelect.value, to = toSelect.value;
    if (from && to && from !== 'direct' && to !== 'direct') {
        const fareKey = `${from}-${to}`;
        const fares = JSON.parse(localStorage.getItem('saved_fares')) || {};
        if (fares[fareKey]) incomeInput.value = (fares[fareKey] / 10000).toFixed(2);
    }
}

refreshBtn.addEventListener("click", () => {
    sessionStorage.removeItem('unsavedRecordForm');
    location.reload();
});

goToSettingsBtn.addEventListener("click", () => {
    mainPage.classList.add("hidden");
    settingsPage.classList.remove("hidden");
    goToSettingsBtn.classList.add("hidden");
    backToMainBtn.classList.remove("hidden");
    displayCenterList();
    mileageCorrectionInput.value = localStorage.getItem('mileage_correction') || "0";
    subsidyLimitInput.value = localStorage.getItem('fuel_subsidy_limit') || "";
    displayCurrentMonthData();
    displayCumulativeData();
});
backToMainBtn.addEventListener("click", () => {
    mainPage.classList.remove("hidden");
    settingsPage.classList.add("hidden");
    goToSettingsBtn.classList.remove("hidden");
    backToMainBtn.classList.add("hidden");
    updateAllDisplays();
});
addCenterBtn.addEventListener("click", () => {
    const newName = newCenterNameInput.value, newAddress = newCenterAddressInput.value, newMemo = newCenterMemoInput.value;
    if (addCenter(newName, newAddress, newMemo)) {
        newCenterNameInput.value = ""; newCenterAddressInput.value = ""; newCenterMemoInput.value = ""
    } else {
        alert("지역 이름을 입력하거나, 이미 존재하지 않는 이름을 사용해주세요.")
    }
});
centerListContainer.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) deleteCenter(e.target.closest(".center-item").dataset.centerName);
    if (e.target.classList.contains("edit-btn")) handleCenterEdit(e)
});
[toggleCenterManagementBtn, toggleBatchApplyBtn, toggleSubsidyManagementBtn, toggleMileageManagementBtn, toggleDataManagementBtn].forEach(header => {
    if (header) {
        header.addEventListener("click", () => {
            const body = header.nextElementSibling;
            header.classList.toggle("active");
            body.classList.toggle("hidden");
            if (header.id === 'toggle-subsidy-management' && !body.classList.contains('hidden')) {
                 displaySubsidyRecords(false);
            }
        });
    }
});
mileageSummaryControls.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
        mileageSummaryControls.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        const period = e.target.dataset.period;
        renderMileageSummary(period);
    }
});
function initialSetup() {
    updateCentersFromRecords();
    populateCenterSelectors();
    populateSelectors();
    cancelEdit();
    todayDatePicker.value = getTodayString();
    updateAllDisplays();
    loadFormState();
    recordForm.addEventListener('input', saveFormState);
}
function displaySubsidyRecords(loadMore = false) {
    const listContainer = document.getElementById('subsidy-records-list');
    const loadMoreContainer = document.getElementById('subsidy-load-more-container');
    if (!listContainer || !loadMoreContainer) return;
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    const subsidyRecords = allRecords.filter(r => r.type === '주유소');
    if (loadMore) {
        displayedSubsidyCount += SUBSIDY_PAGE_SIZE;
    } else {
        displayedSubsidyCount = SUBSIDY_PAGE_SIZE;
        listContainer.innerHTML = '';
    }
    const recordsToShow = subsidyRecords.slice(0, displayedSubsidyCount);
    if (recordsToShow.length === 0 && !loadMore) {
        listContainer.innerHTML = '<p class="note" style="text-align:center; padding: 1em 0;">주유 기록이 없습니다.</p>';
        loadMoreContainer.innerHTML = '';
        return;
    }
    let tableHtml = `<table class="responsive-table"><thead><tr><th>날짜</th><th>주유량(L)</th><th>금액(만원)</th><th>관리</th></tr></thead><tbody>`;
    recordsToShow.forEach(r => {
        tableHtml += `<tr><td data-label="날짜">${r.date}</td><td data-label="주유량(L)">${(r.liters || 0).toFixed(2)}</td><td data-label="금액(만원)"><span class="cost">${formatToManwon(r.cost)}</span></td><td data-label="관리"><div class="action-cell"><button class="edit-btn" onclick="editRecord(${r.id})">수정</button></div></td></tr>`;
    });
    tableHtml += '</tbody></table>';
    listContainer.innerHTML = tableHtml;
    if (displayedSubsidyCount < subsidyRecords.length) {
        loadMoreContainer.innerHTML = `<button class="load-more-btn" onclick="displaySubsidyRecords(true)">더 보기 (${recordsToShow.length}/${subsidyRecords.length})</button>`;
    } else {
        loadMoreContainer.innerHTML = '';
    }
}
document.addEventListener("DOMContentLoaded", initialSetup);