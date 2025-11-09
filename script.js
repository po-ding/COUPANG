/** 버전: 4.4 | 최종 수정일: 2025-11-04 (모든 기능 구현 및 오류 수정) */

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
// 월별
const currentMonthTitle = document.getElementById('current-month-title');
const currentMonthOperatingDays = document.getElementById('current-month-operating-days');
const currentMonthTripCount = document.getElementById('current-month-trip-count');
const currentMonthTotalMileage = document.getElementById('current-month-total-mileage');
const currentMonthIncome = document.getElementById('current-month-income');
const currentMonthExpense = document.getElementById('current-month-expense');
const currentMonthNetIncome = document.getElementById('current-month-net-income');
const currentMonthAvgEconomy = document.getElementById('current-month-avg-economy');
const currentMonthCostPerKm = document.getElementById('current-month-cost-per-km');

// 누적
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

const startWaitBtn = document.getElementById('start-wait-btn');
const endWaitBtn = document.getElementById('end-wait-btn');
const waitStatus = document.getElementById('wait-status');
const waitingTimeInput = document.getElementById('waiting-time');

// -- 아코디언(펼치기) UI 요소 --
const toggleCenterManagementBtn = document.getElementById('toggle-center-management');
const centerManagementBody = document.getElementById('center-management-body');
const centerListContainer = document.getElementById('center-list-container');
const newCenterNameInput = document.getElementById('new-center-name');
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

function addCenter(newCenter) {
    if (!newCenter || newCenter.trim() === '') return false;
    const centers = getCenters();
    const trimmedCenter = newCenter.trim();
    if (!centers.includes(trimmedCenter)) { 
        centers.push(trimmedCenter);
        localStorage.setItem('logistics_centers', JSON.stringify(centers));
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
        supplyMileageInput.value = ''; // 소모품 선택 시 주행거리 칸은 비워둠
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
            recordsByDate[r.date] = { income: 0, expense: 0, distance: 0, tripCount: 0, waitingTime: 0, liters: 0 };
        }
        recordsByDate[r.date].income += parseInt(r.income || 0);
        recordsByDate[r.date].expense += parseInt(r.cost || 0);
        if (['화물운송', '공차이동'].includes(r.type)) {
            recordsByDate[r.date].distance += parseFloat(r.distance || 0);
            recordsByDate[r.date].tripCount++;
        }
        if (r.type === '주유소') recordsByDate[r.date].liters += parseFloat(r.liters || 0);
        recordsByDate[r.date].waitingTime += parseInt(r.waitingTime || 0);
    });

    Object.keys(recordsByDate).sort().forEach(date => {
        const data = recordsByDate[date];
        const day = date.substring(8, 10);
        const dailyNet = data.income - data.expense;
        const waitHours = Math.floor(data.waitingTime / 60);
        const waitMinutes = data.waitingTime % 60;
        
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
            <td data-label="대기">${waitHours}h ${waitMinutes}m</td>
            <td data-label="주유량(L)">${data.liters.toFixed(2)}</td>
            <td data-label="관리"><button class="edit-btn" onclick="viewDateDetails('${date}')">상세</button></td>
        `;
        dailyTbody.appendChild(tr);
    });
}
        
function displayMonthlyRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const selectedYear = monthlyYearSelect.value;
    
    const recordsByMonth = {};
    for(let i=1; i<=12; i++) {
        const monthKey = `${selectedYear}-${i.toString().padStart(2, '0')}`;
        recordsByMonth[monthKey] = { income: 0, expense: 0, distance: 0, liters: 0, tripCount: 0, waitingTime: 0 };
    }

    records.filter(r => r.date.startsWith(selectedYear)).forEach(r => {
        const monthKey = r.date.substring(0, 7);
        recordsByMonth[monthKey].income += parseInt(r.income || 0);
        recordsByMonth[monthKey].expense += parseInt(r.cost || 0);
        if(['화물운송','공차이동'].includes(r.type)) {
            recordsByMonth[monthKey].distance += parseFloat(r.distance || 0);
            recordsByMonth[monthKey].tripCount++;
        }
        if(r.type === '주유소') recordsByMonth[monthKey].liters += parseFloat(r.liters || 0);
        recordsByMonth[monthKey].waitingTime += parseInt(r.waitingTime || 0);
    });

    monthlyTbody.innerHTML = '';
    const currentMonthKey = new Date().toISOString().slice(0, 7);
    
    Object.keys(recordsByMonth).sort().forEach(monthKey => {
        const data = recordsByMonth[monthKey];
        const month = monthKey.substring(5, 7);
        const netIncome = data.income - data.expense;
        const waitHours = Math.floor(data.waitingTime / 60);
        const waitMinutes = data.waitingTime % 60;
        const tr = document.createElement('tr');
        if (monthKey === currentMonthKey) {
            tr.style.fontWeight = 'bold';
            tr.style.backgroundColor = '#e9f5ff';
        }
        tr.innerHTML = `<td>${parseInt(month)}월</td><td><span class="income">${formatToManwon(data.income)}</span></td><td><span class="cost">${formatToManwon(data.expense)}</span></td><td><strong>${formatToManwon(netIncome)}</strong></td><td>${data.distance.toFixed(1)}</td><td>${data.tripCount}</td><td>${waitHours}h ${waitMinutes}m</td><td>${data.liters.toFixed(2)}</td>`;
        monthlyTbody.appendChild(tr);
    });
}

function viewDateDetails(date) {
    todayDatePicker.value = date;
    
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-view="today"]').classList.add('active');
    
    viewContents.forEach(c => c.classList.remove('active'));
    document.getElementById('today-view').classList.add('active');

    displayTodayRecords();
    
    const viewSection = document.querySelector('.view-section');
    if(viewSection) {
        viewSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function displayCurrentMonthData() {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    const now = new Date();
    const currentPeriod = now.toISOString().slice(0, 7);
    const currentMonth = now.getMonth() + 1;
    const records = allRecords.filter(r => r.date.startsWith(currentPeriod));
    
    currentMonthTitle.textContent = `${currentMonth}월 실시간 요약`;

    let totalIncome = 0, totalExpense = 0, totalTripCount = 0, totalDistance = 0, totalLiters = 0;
    records.forEach(r => {
        totalIncome += parseInt(r.income || 0);
        totalExpense += parseInt(r.cost || 0);
        if (['화물운송', '공차이동'].includes(r.type)) {
            totalTripCount++;
            totalDistance += parseFloat(r.distance || 0);
        }
        if (r.type === '주유소') {
            totalLiters += parseFloat(r.liters || 0);
        }
    });

    const netIncome = totalIncome - totalExpense;
    const operatingDays = new Set(records.map(r => r.date)).size;
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

    const subsidyLimit = parseFloat(localStorage.getItem('fuel_subsidy_limit')) || 0;
    const usedLiters = records.reduce((sum, r) => sum + (r.type === '주유소' ? parseFloat(r.liters || 0) : 0), 0);
    const remainingLiters = subsidyLimit - usedLiters;
    const progressPercent = subsidyLimit > 0 ? Math.min(100, (usedLiters / subsidyLimit * 100)).toFixed(1) : 0;
    subsidySummaryDiv.innerHTML = `<div class="progress-label">월 한도: ${subsidyLimit.toLocaleString()} L | 사용: ${usedLiters.toFixed(1)} L | 잔여: ${remainingLiters.toFixed(1)} L</div><div class="progress-bar-container"><div class="progress-bar progress-bar-used" style="width: ${progressPercent}%;"></div></div>`;
}

function displayCumulativeData() {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    let totalIncome = 0, totalExpense = 0, totalTripCount = 0, totalLiters = 0, recordedDistance = 0;
    let monthlyMileage = {};

    allRecords.forEach(r => {
        totalIncome += parseInt(r.income || 0);
        totalExpense += parseInt(r.cost || 0);
        if (r.type === '주유소') {
            totalLiters += parseFloat(r.liters || 0);
        }
        if (['화물운송', '공차이동'].includes(r.type)) {
            totalTripCount++;
            const distance = parseFloat(r.distance || 0);
            recordedDistance += distance;
            const monthKey = r.date.substring(0, 7);
            monthlyMileage[monthKey] = (monthlyMileage[monthKey] || 0) + distance;
        }
    });

    const correction = parseFloat(localStorage.getItem('mileage_correction')) || 0;
    const totalMileage = recordedDistance + correction;
    const netIncome = totalIncome - totalExpense;
    const avgEconomy = totalLiters > 0 && totalMileage > 0 ? (totalMileage / totalLiters).toFixed(2) : 0;
    const costPerKm = totalMileage > 0 ? Math.round(totalExpense / totalMileage) : 0;
    const operatingDays = new Set(allRecords.map(r => r.date)).size;
    
    cumulativeOperatingDays.textContent = `${operatingDays} 일`;
    cumulativeTripCount.textContent = `${totalTripCount} 건`;
    cumulativeTotalMileage.textContent = `${Math.round(totalMileage).toLocaleString()} km`;
    cumulativeIncome.textContent = `${formatToManwon(totalIncome)} 만원`;
    cumulativeExpense.textContent = `${formatToManwon(totalExpense)} 만원`;
    cumulativeNetIncome.textContent = `${formatToManwon(netIncome)} 만원`;
    cumulativeAvgEconomy.textContent = `${avgEconomy} km/L`;
    cumulativeCostPerKm.textContent = `${costPerKm.toLocaleString()} 원`;

    let mileageBreakdownHtml = '<h4>월별 운행기록</h4>';
    const last12Months = {};
    for (let i = 11; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const monthKey = d.toISOString().slice(0, 7);
        last12Months[monthKey] = monthlyMileage[monthKey] || 0;
    }

    const maxMileage = Math.max(...Object.values(last12Months));
    if (maxMileage < 1) {
        mileageBreakdownHtml += '<p class="note" style="text-align: center; padding: 2em 0;">운행 기록이 부족하여 차트를 표시할 수 없습니다.</p>';
    } else {
        mileageBreakdownHtml += '<div class="graph-body">';
        Object.keys(last12Months).forEach(month => {
            const percent = (last12Months[month] / maxMileage * 100);
            mileageBreakdownHtml += `
                <div class="bar-group">
                    <div class="bar-container">
                        <div class="bar current" style="height: ${percent}%;" title="${month}: ${last12Months[month].toFixed(1)}km"></div>
                    </div>
                    <div class="bar-label">${parseInt(month.substring(5, 7))}월</div>
                </div>
            `;
        });
        mileageBreakdownHtml += '</div>';
    }
    monthlyMileageBreakdown.innerHTML = mileageBreakdownHtml;
}

function populateSelectors() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const availableYears = [...new Set(records.map(r => r.date.substring(0, 4)))].sort().reverse();
    if (availableYears.length === 0) availableYears.push(new Date().getFullYear().toString());
    
    const yearOptions = availableYears.map(y => `<option value="${y}">${y}년</option>`).join('');
    dailyYearSelect.innerHTML = yearOptions;
    monthlyYearSelect.innerHTML = yearOptions;
    
    dailyMonthSelect.innerHTML = Array.from({length: 12}, (_, i) => `<option value="${(i+1).toString().padStart(2,'0')}">${i+1}월</option>`).join('');
    
    const currentYear = new Date().getFullYear().toString();
    if(availableYears.includes(currentYear)) {
         dailyYearSelect.value = currentYear;
         monthlyYearSelect.value = currentYear;
    }
    dailyMonthSelect.value = (new Date().getMonth() + 1).toString().padStart(2, '0');
}

function updateAllDisplays() {
    const activeView = document.querySelector('.view-content.active').id;
    if (activeView === 'today-view') displayTodayRecords();
    if (activeView === 'daily-view') displayDailyRecords();
    if (activeView === 'monthly-view') displayMonthlyRecords();
    displayCumulativeData();
    displayCurrentMonthData();
}

function deleteRecord(id) {
    if (confirm('이 기록을 정말로 삭제하시겠습니까?')) {
        let records = JSON.parse(localStorage.getItem('records')) || [];
        records = records.filter(r => r.id !== id);
        localStorage.setItem('records', JSON.stringify(records));
        updateAllDisplays();
    }
}

function editRecord(id) {
    if (mainPage.classList.contains('hidden')) {
        backToMainBtn.click();
    }
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
    incomeInput.value = (recordToEdit.income / 10000).toFixed(2);
    costInput.value = (recordToEdit.cost / 10000).toFixed(2);
    
    fuelLitersInput.value = recordToEdit.liters;
    fuelUnitPriceInput.value = recordToEdit.unitPrice;
    fuelBrandSelect.value = recordToEdit.brand;

    ureaLitersInput.value = recordToEdit.ureaLiters;
    ureaUnitPriceInput.value = recordToEdit.ureaUnitPrice;
    ureaStationInput.value = recordToEdit.ureaStation;

    supplyItemInput.value = recordToEdit.supplyItem;
    supplyMileageInput.value = recordToEdit.mileage;
    
    waitingTimeInput.value = recordToEdit.waitingTime;
    
    toggleUI(recordToEdit.type);
    
    editIdInput.value = id;
    submitBtn.textContent = '기록 수정하기';
    submitBtn.classList.add('edit-mode');
    cancelEditBtn.classList.remove('hidden');

    window.scrollTo(0, 0);
}

function cancelEdit() {
    recordForm.reset();
    editIdInput.value = '';
    submitBtn.textContent = '기록 저장하기';
    submitBtn.classList.remove('edit-mode');
    cancelEditBtn.classList.add('hidden');
    
    dateInput.value = getTodayString();
    timeInput.value = getCurrentTimeString();
    gpsStatus.textContent = 'GPS 상태: 대기 중';
    startCoordsInput.value = '';
    endCoordsInput.value = '';
    manualDistanceInput.value = '';
    waitStatus.textContent = '대기 상태: 대기 중';
    waitingTimeInput.value = '';
    startWaitBtn.disabled = false;
    endWaitBtn.disabled = true;
    if (waitTimerInterval) clearInterval(waitTimerInterval);
    waitStartTime = null;

    toggleUI(typeSelect.value);
}

function getFormData(isNew = false) {
    const fromValue = (fromSelect.value === 'direct') ? fromCustom.value : fromSelect.value;
    const toValue = (toSelect.value === 'direct') ? toCustom.value : toSelect.value;
    addCenter(fromValue);
    addCenter(toValue);
    
    const formData = {
        date: dateInput.value, time: timeInput.value, type: typeSelect.value,
        from: fromValue, to: toValue, 
        distance: parseFloat(manualDistanceInput.value) || 0,
        start_gps: startCoordsInput.value,
        end_gps: endCoordsInput.value,
        cost: Math.round((parseFloat(costInput.value) || 0) * 10000),
        income: Math.round((parseFloat(incomeInput.value) || 0) * 10000),
        liters: parseFloat(fuelLitersInput.value) || 0,
        unitPrice: parseInt(fuelUnitPriceInput.value) || 0,
        brand: fuelBrandSelect.value || '',
        ureaLiters: parseFloat(ureaLitersInput.value) || 0,
        ureaUnitPrice: parseInt(ureaUnitPriceInput.value) || 0,
        ureaStation: ureaStationInput.value || '',
        supplyItem: supplyItemInput.value || '',
        mileage: parseInt(supplyMileageInput.value) || 0,
        waitingTime: parseInt(waitingTimeInput.value) || 0
    };
    if (isNew) formData.id = Date.now();
    return formData;
}

function exportToCsv() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    if (records.length === 0) {
        alert('저장할 기록이 없습니다.');
        return;
    }
    const headers = ['날짜', '시간', '구분', '출발지', '도착지', '운행거리(km)', '대기시간(분)', '출발GPS', '도착GPS', '수입(원)', '지출(원)', '주유량(L)', '단가(원/L)', '주유브랜드', '요소수주입량(L)','요소수단가(원/L)','요소수주입처', '소모품내역', '교체시점(km)'];
    const escapeCsvCell = (cell) => {
        if (cell == null) return '';
        const str = String(cell);
        if (str.includes(',')) return `"${str}"`;
        return str;
    };
    const csvRows = [headers.join(',')];
    records.forEach(r => {
        const row = [r.date, r.time, r.type, r.from, r.to, r.distance, r.waitingTime, r.start_gps, r.end_gps, r.income, r.cost, r.liters, r.unitPrice, r.brand, r.ureaLiters, r.ureaUnitPrice, r.ureaStation, r.supplyItem, r.mileage];
        csvRows.push(row.map(escapeCsvCell).join(','));
    });
    const csvString = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const today = new Date().toISOString().slice(0, 10);
    a.download = `운행기록_백업_${today}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('모든 기록이 엑셀(CSV) 파일로 성공적으로 저장(다운로드)되었습니다!');
}

function exportToJson() {
    const backupData = {
        records: JSON.parse(localStorage.getItem('records') || '[]'),
        centers: getCenters(),
        mileage_correction: parseFloat(localStorage.getItem('mileage_correction')) || 0,
        fuel_subsidy_limit: parseFloat(localStorage.getItem('fuel_subsidy_limit')) || 0
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const today = new Date().toISOString().slice(0, 10);
    a.download = `운행기록_백업_${today}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('모든 데이터가 JSON 파일로 성공적으로 저장(다운로드)되었습니다!');
}

function importFromJson(event) {
    if (!confirm('경고!\n현재 앱의 모든 기록과 설정이 선택한 파일의 내용으로 완전히 대체됩니다.\n계속하시겠습니까?')) {
        event.target.value = '';
        return;
    }
    const file = event.target.files[0];
    if (!file) {
        event.target.value = '';
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            const data = JSON.parse(content);
            
            if (data && Array.isArray(data.records)) {
                localStorage.setItem('records', JSON.stringify(data.records));
                if(Array.isArray(data.centers)) localStorage.setItem('logistics_centers', JSON.stringify(data.centers));
                if(data.mileage_correction) localStorage.setItem('mileage_correction', data.mileage_correction);
                if(data.fuel_subsidy_limit) localStorage.setItem('fuel_subsidy_limit', data.fuel_subsidy_limit);

            } else if (Array.isArray(data)) { // 구버전 호환
                localStorage.setItem('records', JSON.stringify(data));
            } else {
                throw new Error('Invalid file format');
            }
            alert('데이터 복원이 성공적으로 완료되었습니다. 앱을 새로고침합니다.');
            location.reload();
        } catch (error) {
            alert('오류: 파일을 읽는 중 문제가 발생했습니다. 유효한 JSON 파일인지 확인해주세요.');
        } finally {
            event.target.value = '';
        }
    };
    reader.readAsText(file);
}

function displayCenterList() {
    centerListContainer.innerHTML = '';
    const centers = getCenters();
    if (centers.length === 0) {
        centerListContainer.innerHTML = '<p class="note">등록된 지역이 없습니다.</p>';
        return;
    }

    centers.forEach(center => {
        const item = document.createElement('div');
        item.className = 'center-item';
        item.dataset.centerName = center;
        item.innerHTML = `
            <span class="center-name">${center}</span>
            <div class="action-buttons">
                <button class="edit-btn">수정</button>
                <button class="delete-btn">삭제</button>
            </div>
        `;
        centerListContainer.appendChild(item);
    });
}

function deleteCenter(centerNameToDelete) {
    if (confirm(`'${centerNameToDelete}' 지역을 목록에서 정말 삭제하시겠습니까?\n(기존 기록은 변경되지 않습니다.)`)) {
        let centers = getCenters();
        centers = centers.filter(c => c !== centerNameToDelete);
        localStorage.setItem('logistics_centers', JSON.stringify(centers));
        refreshCenterUI();
    }
}

function handleCenterEdit(e) {
    const item = e.target.closest('.center-item');
    const originalName = item.dataset.centerName;
    
    item.innerHTML = `
        <input type="text" class="edit-input" value="${originalName}">
        <div class="action-buttons">
            <button class="setting-save-btn">저장</button>
            <button class="cancel-edit-btn">취소</button>
        </div>
    `;

    item.querySelector('.setting-save-btn').onclick = () => saveCenterEdit(item, originalName);
    item.querySelector('.cancel-edit-btn').onclick = () => refreshCenterUI();
    item.querySelector('.edit-input').focus();
}

function saveCenterEdit(item, originalName) {
    const newName = item.querySelector('.edit-input').value.trim();
    if (!newName) {
        alert('지역 이름은 비워둘 수 없습니다.');
        return;
    }

    let centers = getCenters();
    if (centers.includes(newName) && newName !== originalName) {
        alert('이미 존재하는 지역 이름입니다.');
        return;
    }

    centers = centers.map(c => (c === originalName ? newName : c));
    localStorage.setItem('logistics_centers', JSON.stringify(centers));

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
        if (r.from && !centerSet.has(r.from)) {
            centerSet.add(r.from); centers.push(r.from); needsUpdate = true;
        }
        if (r.to && !centerSet.has(r.to)) {
            centerSet.add(r.to); centers.push(r.to); needsUpdate = true;
        }
    });

    if (needsUpdate) {
        localStorage.setItem('logistics_centers', JSON.stringify(centers));
    }
}

// --- 모든 이벤트 리스너(버튼 기능) 및 초기화 함수 ---

recordForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const editingId = parseInt(editIdInput.value);
    
    let records = JSON.parse(localStorage.getItem('records')) || [];
    
    if (editingId) {
        const recordIndex = records.findIndex(r => r.id === editingId);
        if (recordIndex > -1) {
            records[recordIndex] = { ...records[recordIndex], ...getFormData() };
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
    }
    
    records.sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
    localStorage.setItem('records', JSON.stringify(records));
    
    cancelEdit();
    updateAllDisplays();
});

batchApplyBtn.addEventListener('click', () => {
    const from = (batchFromSelect.value === 'direct') ? batchFromCustom.value : batchFromSelect.value;
    const to = (batchToSelect.value === 'direct') ? batchToCustom.value : batchToSelect.value;
    const income = parseFloat(batchIncomeInput.value) || 0;

    if (!from || !to || income <= 0) {
        alert('출발지, 도착지를 선택하고 유효한 운송 수입을 입력하세요.');
        return;
    }

    let records = JSON.parse(localStorage.getItem('records')) || [];
    let updatedCount = 0;
    
    const recordsToUpdate = records.filter(r => r.type === '화물운송' && r.from === from && r.to === to && r.income === 0);

    if (recordsToUpdate.length === 0) {
        alert('해당 구간의 미정산(수입 0원) 기록이 없습니다.');
        return;
    }
    
    if (confirm(`정말로 '${from} -> ${to}' 구간의 미정산 기록 ${recordsToUpdate.length}건에 운임 ${income}만원을 일괄 적용하시겠습니까?`)) {
        records = records.map(r => {
            if (r.type === '화물운송' && r.from === from && r.to === to && r.income === 0) {
                updatedCount++;
                return { ...r, income: income * 10000 };
            }
            return r;
        });
        localStorage.setItem('records', JSON.stringify(records));
        batchStatus.textContent = `✅ ${updatedCount}건의 운임이 성공적으로 적용되었습니다!`;
        batchFromSelect.value = getCenters()[0];
        batchToSelect.value = getCenters()[0];
        batchIncomeInput.value = '';
        updateAllDisplays();
        setTimeout(() => batchStatus.textContent = '', 3000);
    }
});

subsidySaveBtn.addEventListener('click', () => {
    const limit = subsidyLimitInput.value;
    localStorage.setItem('fuel_subsidy_limit', limit);
    alert(`보조금 한도가 ${limit}L로 저장되었습니다.`);
    updateAllDisplays();
});

mileageCorrectionSaveBtn.addEventListener('click', () => {
    const correction = mileageCorrectionInput.value;
    localStorage.setItem('mileage_correction', correction);
    alert(`주행거리 보정값이 ${correction} km로 저장되었습니다.`);
    displayCumulativeData();
});

exportCsvBtn.addEventListener('click', exportToCsv);
exportJsonBtn.addEventListener('click', exportToJson);
importJsonBtn.addEventListener('click', () => importFileInput.click());
importFileInput.addEventListener('change', importFromJson);

clearBtn.addEventListener('click', () => {
    if (confirm('정말로 모든 기록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        localStorage.removeItem('records');
        localStorage.removeItem('logistics_centers');
        localStorage.removeItem('fuel_subsidy_limit');
        localStorage.removeItem('mileage_correction');
        localStorage.removeItem('saved_fares');
        alert('모든 데이터가 삭제되었습니다.');
        location.reload();
    }
});

tabBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault(); 
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        viewContents.forEach(c => c.classList.remove('active'));
        document.getElementById(btn.dataset.view + '-view').classList.add('active');
        updateAllDisplays();
    });
});

todayDatePicker.addEventListener('change', displayTodayRecords);
dailyYearSelect.addEventListener('change', displayDailyRecords);
dailyMonthSelect.addEventListener('change', displayDailyRecords);
monthlyYearSelect.addEventListener('change', displayMonthlyRecords);

startGpsBtn.addEventListener('click', () => getGPS('start'));
endGpsBtn.addEventListener('click', () => getGPS('end'));

startWaitBtn.addEventListener('click', startWaitTimer);
endWaitBtn.addEventListener('click', stopWaitTimer);

function calculateCost(type) {
    const unitPriceInput = type === 'fuel' ? fuelUnitPriceInput : ureaUnitPriceInput;
    const litersInput = type === 'fuel' ? fuelLitersInput : ureaLitersInput;
    
    const unitPrice = parseFloat(unitPriceInput.value) || 0;
    const liters = parseFloat(litersInput.value) || 0;
    
    if ( (document.activeElement === litersInput) || (document.activeElement === unitPriceInput) ) {
        if (unitPrice > 0 && liters > 0) {
            costInput.value = (Math.round(unitPrice * liters) / 10000).toFixed(2);
        }
    }
}

function calculateLiters() {
    const costInManwon = parseFloat(costInput.value) || 0;
    const type = typeSelect.value;
    
    if (document.activeElement === costInput) {
        if (type === '주유소') {
            const unitPrice = parseFloat(fuelUnitPriceInput.value) || 0;
            if (costInManwon > 0 && unitPrice > 0) {
                fuelLitersInput.value = ((costInManwon * 10000) / unitPrice).toFixed(2);
            }
        } else if (type === '요소수') {
            const unitPrice = parseFloat(ureaUnitPriceInput.value) || 0;
            if (costInManwon > 0 && unitPrice > 0) {
                ureaLitersInput.value = ((costInManwon * 10000) / unitPrice).toFixed(2);
            }
        }
    }
}

fuelUnitPriceInput.addEventListener('input', () => calculateCost('fuel'));
fuelLitersInput.addEventListener('input', () => calculateCost('fuel'));
ureaUnitPriceInput.addEventListener('input', () => calculateCost('urea'));
ureaLitersInput.addEventListener('input', () => calculateCost('urea'));
costInput.addEventListener('input', calculateLiters);

typeSelect.addEventListener('change', () => toggleUI(typeSelect.value));
fromSelect.addEventListener('change', () => fromCustom.classList.toggle('hidden', fromSelect.value !== 'direct'));
toSelect.addEventListener('change', () => toCustom.classList.toggle('hidden', toSelect.value !== 'direct'));
fromSelect.addEventListener('change', autoFillIncome);
toSelect.addEventListener('change', autoFillIncome);
batchFromSelect.addEventListener('change', () => batchFromCustom.classList.toggle('hidden', batchFromSelect.value !== 'direct'));
batchToSelect.addEventListener('change', () => batchToCustom.classList.toggle('hidden', batchToSelect.value !== 'direct'));
cancelEditBtn.addEventListener('click', cancelEdit);

function autoFillIncome() {
    if (typeSelect.value !== '화물운송') return;
    const from = fromSelect.value;
    const to = toSelect.value;
    if (from && to && from !== 'direct' && to !== 'direct') {
        const fareKey = `${from}-${to}`;
        const fares = JSON.parse(localStorage.getItem('saved_fares')) || {};
        if (fares[fareKey]) {
            incomeInput.value = (fares[fareKey] / 10000).toFixed(2);
        }
    }
}

goToSettingsBtn.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    settingsPage.classList.remove('hidden');
    goToSettingsBtn.classList.add('hidden');
    backToMainBtn.classList.remove('hidden');
    displayCenterList();
    mileageCorrectionInput.value = localStorage.getItem('mileage_correction') || '0';
});

backToMainBtn.addEventListener('click', () => {
    mainPage.classList.remove('hidden');
    settingsPage.classList.add('hidden');
    goToSettingsBtn.classList.remove('hidden');
    backToMainBtn.classList.add('hidden');
});

addCenterBtn.addEventListener('click', () => {
    const newName = newCenterNameInput.value;
    if (addCenter(newName)) {
        newCenterNameInput.value = '';
    } else {
        alert('지역 이름을 입력하거나, 이미 존재하지 않는 이름을 사용해주세요.');
    }
});

centerListContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteCenter(e.target.closest('.center-item').dataset.centerName);
    }
    if (e.target.classList.contains('edit-btn')) {
        handleCenterEdit(e);
    }
});

[toggleCenterManagementBtn, toggleBatchApplyBtn, toggleSubsidyManagementBtn, toggleMileageManagementBtn, toggleDataManagementBtn].forEach(header => {
    header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        body.classList.toggle('hidden');
        header.classList.toggle('active');
    });
});

function initialSetup() {
    updateCentersFromRecords(); 
    populateCenterSelectors();
    populateSelectors();
    cancelEdit();
    todayDatePicker.value = getTodayString();
    updateAllDisplays();
}

document.addEventListener('DOMContentLoaded', initialSetup);