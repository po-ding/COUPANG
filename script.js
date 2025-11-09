/** 버전: 4.8 | 최종 수정일: 2025-11-04 (치명적 오류 수정 완료) */

// =========================================================================
// API 키가 입력되었습니다.
// =========================================================================
const NAVER_API_KEY_ID = 'hhlgbsr5be';
const NAVER_API_KEY_SECRET = '2RSWkGImElybqaLobxOHivgxAoDbvanxPLBPiZ2X';
// =========================================================================

// --- DOM 요소 ---
const recordForm = document.getElementById('record-form');
const clearBtn = document.getElementById('clear-btn');
const exportCsvBtn = document.getElementById('export-csv-btn');
const exportJsonBtn = document.getElementById('export-json-btn');
const importJsonBtn = document.getElementById('import-json-btn');
const importFileInput = document.getElementById('import-file-input');
const dateInfoFieldset = document.getElementById('date-info-fieldset');
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

const submitBtn = document.getElementById('submit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const editIdInput = document.getElementById('edit-id');

const mainPage = document.getElementById('main-page');
const settingsPage = document.getElementById('settings-page');
const goToSettingsBtn = document.getElementById('go-to-settings-btn');
const backToMainBtn = document.getElementById('back-to-main-btn');

const tabBtns = document.querySelectorAll('.tab-btn');
const viewContents = document.querySelectorAll('.view-content');

const todayDatePicker = document.getElementById('today-date-picker');
const todaySummaryDiv = document.getElementById('today-summary');
const todayTbody = document.querySelector('#today-records-table tbody');

const dailyYearSelect = document.getElementById('daily-year-select');
const dailyMonthSelect = document.getElementById('daily-month-select');
const dailySummaryDiv = document.getElementById('daily-summary');
const dailyTbody = document.querySelector('#daily-summary-table tbody');

const monthlyYearSelect = document.getElementById('monthly-year-select');
const monthlyTbody = document.querySelector('#monthly-summary-table tbody');

// -- 데이터 요약 카드 --
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

const startGpsBtn = document.getElementById('start-gps-btn');
const endGpsBtn = document.getElementById('end-gps-btn');
const gpsStatus = document.getElementById('gps-status');
const startCoordsInput = document.getElementById('start-coords');
const endCoordsInput = document.getElementById('end-coords');
const manualDistanceInput = document.getElementById('manual-distance');
const saveFromGpsBtn = document.getElementById('save-from-gps-btn');
const saveToGpsBtn = document.getElementById('save-to-gps-btn');

const startWaitBtn = document.getElementById('start-wait-btn');
const endWaitBtn = document.getElementById('end-wait-btn');
const waitStatus = document.getElementById('wait-status');
const waitingTimeInput = document.getElementById('waiting-time');

// -- 아코디언(펼치기) UI 요소 --
const toggleCenterManagementBtn = document.getElementById('toggle-center-management');
const centerManagementBody = document.getElementById('center-management-body');
const centerListContainer = document.getElementById('center-list-container');
const newCenterNameInput = document.getElementById('new-center-name');
const newCenterGpsInput = document.getElementById('new-center-gps');
const addCenterBtn = document.getElementById('add-center-btn');

const toggleBatchApplyBtn = document.getElementById('toggle-batch-apply');
const batchApplyBody = document.getElementById('batch-apply-body');
const batchFromSelect = document.getElementById('batch-from-center');
const batchToSelect = document.getElementById('batch-to-center');
const batchFromCustom = document.getElementById('batch-from-custom');
const batchToCustom = document.getElementById('batch-to-custom');
const batchIncomeInput = document.getElementById('batch-income');
const batchApplyBtn = document.getElementById('batch-apply-btn');
const batchStatus = document.getElementById('batch-status');

const toggleSubsidyManagementBtn = document.getElementById('toggle-subsidy-management');
const subsidyManagementBody = document.getElementById('subsidy-management-body');
const subsidyLimitInput = document.getElementById('subsidy-limit');
const subsidySaveBtn = document.getElementById('subsidy-save-btn');
const subsidySummaryDiv = document.getElementById('subsidy-summary');

const toggleMileageManagementBtn = document.getElementById('toggle-mileage-management');
const mileageManagementBody = document.getElementById('mileage-management-body');
const mileageCorrectionInput = document.getElementById('mileage-correction');
const mileageCorrectionSaveBtn = document.getElementById('mileage-correction-save-btn');
const monthlyMileageBreakdown = document.getElementById('monthly-mileage-breakdown');

const toggleDataManagementBtn = document.getElementById('toggle-data-management');
const dataManagementBody = document.getElementById('data-management-body');

let waitStartTime = null;
let waitTimerInterval = null;

const getTodayString = () => new Date().toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\. /g, '-').slice(0, -1);
const getCurrentTimeString = () => new Date().toLocaleTimeString('ko-KR', {hour12: false, hour: '2-digit', minute: '2-digit'});

const formatToManwon = (valueInWon) => {
    if (isNaN(valueInWon)) return '0';
    return Math.round(valueInWon / 10000).toLocaleString('ko-KR');
};

function getCenters() {
    const defaultCenters = ['안성', '안산', '용인', '이천', '인천'];
    const storedCenters = JSON.parse(localStorage.getItem('logistics_centers')) || defaultCenters;
    if (!localStorage.getItem('logistics_centers')) localStorage.setItem('logistics_centers', JSON.stringify(storedCenters));
    return storedCenters.sort((a, b) => a.localeCompare(b, 'ko'));
}

function getSavedLocations() {
    return JSON.parse(localStorage.getItem('saved_locations')) || {};
}

function saveLocationGps(centerName, coords) {
    if (!centerName || centerName === 'direct' || !coords) return false;
    const locations = getSavedLocations();
    locations[centerName] = coords;
    localStorage.setItem('saved_locations', JSON.stringify(locations));
    return true;
}

function addCenter(newCenter, gpsCoords = '') {
    if (!newCenter || newCenter.trim() === '') return false;
    const centers = getCenters();
    const trimmedCenter = newCenter.trim();
    if (!centers.includes(trimmedCenter)) { 
        centers.push(trimmedCenter);
        localStorage.setItem('logistics_centers', JSON.stringify(centers));
        if (gpsCoords.trim()) {
            saveLocationGps(trimmedCenter, gpsCoords.trim());
        }
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
    const showDateField = ['주유소', '요소수', '소모품', '통행료'].includes(type);
    dateInfoFieldset.classList.toggle('hidden', !showDateField);

    transportDetails.classList.toggle('hidden', !['화물운송', '공차이동'].includes(type));
    fuelDetails.classList.toggle('hidden', type !== '주유소');
    ureaDetails.classList.toggle('hidden', type !== '요소수');
    supplyDetails.classList.toggle('hidden', type !== '소모품');

    if(type === '소모품') {
        supplyMileageInput.value = '';
    }

    costInfoFieldset.classList.remove('hidden');
    costWrapper.classList.remove('hidden');
    incomeWrapper.classList.remove('hidden');

    if (type === '화물운송') {
        costWrapper.classList.add('hidden');
    } else if (type === '공차이동') {
        costInfoFieldset.classList.add('hidden');
    } else {
        incomeWrapper.classList.add('hidden');
    }
    costInput.readOnly = false;
}

function getGPS(point) {
    if (!navigator.geolocation) {
        gpsStatus.textContent = "오류: 위치 정보를 사용할 수 없는 브라우저입니다.";
        return;
    }
    const statusText = point === 'start' ? '출발' : '도착';
    gpsStatus.textContent = `GPS 상태: ${statusText} 지점 위치 수신 중...`;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const gpsTime = new Date(position.timestamp);
            const dateString = gpsTime.toISOString().slice(0, 10);
            const timeString = gpsTime.toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' });

            dateInput.value = dateString;
            timeInput.value = timeString;

            const coords = {
                lat: position.coords.latitude.toFixed(6),
                lon: position.coords.longitude.toFixed(6)
            };
            const coordsString = `${coords.lat}, ${coords.lon}`;
            
            if (point === 'start') {
                startCoordsInput.value = coordsString;
                gpsStatus.innerHTML = `✅ 출발 GPS & 시간 기록 완료!<br><span class="note">${dateString} ${timeString}<br>${coordsString}</span>`;
            } else {
                endCoordsInput.value = coordsString;
                const start = startCoordsInput.value ? `출발: ${startCoordsInput.value}` : '출발점 미기록';
                gpsStatus.innerHTML = `✅ 도착 GPS & 시간 기록 완료!<br><span class="note">${dateString} ${timeString}<br>${start}<br>도착: ${coordsString}</span>`;
            }
        },
        (error) => {
            let message = "오류: 위치 정보를 가져올 수 없습니다.";
            if (error.code === 1) message = "오류: 위치 정보 접근 권한이 거부되었습니다.";
            gpsStatus.textContent = message;
        }
    );
}

function startWaitTimer() {
    waitStartTime = Date.now();
    const startTimeStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    waitStatus.textContent = `대기 시작 (${startTimeStr}) - 00:00:00`;
    startWaitBtn.disabled = true;
    endWaitBtn.disabled = false;

    waitTimerInterval = setInterval(() => {
        const elapsedTime = Date.now() - waitStartTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0');
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60).toString().padStart(2, '0');
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, '0');
        waitStatus.textContent = `대기 시작 (${startTimeStr}) - ${hours}:${minutes}:${seconds}`;
    }, 1000);
}

function stopWaitTimer() {
    if (waitTimerInterval) clearInterval(waitTimerInterval);
    if (waitStartTime) {
        const elapsedTime = Date.now() - waitStartTime;
        const totalMinutes = Math.round(elapsedTime / (1000 * 60));
        waitingTimeInput.value = totalMinutes;
        const endTimeStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
        waitStatus.textContent = `✅ 총 대기시간: ${totalMinutes}분 기록 완료! (종료: ${endTimeStr})`;
    }
    startWaitBtn.disabled = false;
    endWaitBtn.disabled = true;
    waitStartTime = null;
}

function createSummaryHTML(title, records) {
    let totalIncome = 0, totalExpense = 0, totalDistance = 0, totalTripCount = 0, totalWaitingTime = 0;
    records.forEach(r => {
        totalIncome += parseInt(r.income || 0);
        totalExpense += parseInt(r.cost || 0);
        if (['화물운송', '공차이동'].includes(r.type)) {
            totalDistance += parseFloat(r.distance || 0);
            totalTripCount++;
        }
        totalWaitingTime += parseInt(r.waitingTime || 0);
    });
    
    const netIncome = totalIncome - totalExpense;
    const waitHours = Math.floor(totalWaitingTime / 60);
    const waitMinutes = totalWaitingTime % 60;
    
    return `
        <strong>${title}</strong><br>
        수입: <span class="income">${formatToManwon(totalIncome)} 만원</span><br>
        지출: <span class="cost">${formatToManwon(totalExpense)} 만원</span><br>
        정산: <strong>${formatToManwon(netIncome)} 만원</strong><br>
        운행거리: <strong>${totalDistance.toFixed(1)} km</strong><br>
        이동건수: <strong>${totalTripCount} 건</strong><br>
        대기시간: <strong>${waitHours}시간 ${waitMinutes}분</strong>
    `;
}

function displayTodayRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const selectedDate = todayDatePicker.value;
    const dateObj = new Date(selectedDate + 'T00:00:00');
    const title = dateObj.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });

    const filteredRecords = records.filter(r => r.date === selectedDate);
    
    todayTbody.innerHTML = '';
    
    filteredRecords.forEach(r => {
        const tr = document.createElement('tr');
        let detailsCell = '', moneyCell = '', actionCell = '';
        if (['화물운송', '공차이동'].includes(r.type)) {
            detailsCell = `<strong>${r.from} → ${r.to}</strong><br><span class="note">${r.distance} km</span>`;
            if (r.waitingTime > 0) detailsCell += `<br><span class="note">⏱️ 대기: ${r.waitingTime}분</span>`;
            moneyCell = (r.income > 0 ? `<span class="income">+${formatToManwon(r.income)}</span>` : '') + (r.cost > 0 ? ` <span class="cost">-${formatToManwon(r.cost)}</span>` : '');
        } else if (r.type === '주유소') {
            detailsCell = `<strong>${parseFloat(r.liters || 0).toFixed(2)} L</strong> @ ${parseInt(r.unitPrice || 0).toLocaleString()} 원/L`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)}</span>`;
        } else {
            detailsCell = `<strong>${r.supplyItem || r.type}</strong>`;
            if (r.mileage > 0) detailsCell += `<br><span class="note">${r.mileage.toLocaleString()} km</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)}</span>`;
        }
        actionCell = `<div class="action-cell"><button class="edit-btn" onclick="editRecord(${r.id})">수정</button><button class="delete-btn" onclick="deleteRecord(${r.id})">삭제</button></div>`;
        tr.innerHTML = `<td data-label="시간">${r.time}</td><td data-label="구분">${r.type}</td><td data-label="내용">${detailsCell}</td><td data-label="수입/지출">${moneyCell}</td><td data-label="관리">${actionCell}</td>`;
        todayTbody.appendChild(