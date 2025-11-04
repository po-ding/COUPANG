/** 버전: 2.4 | 최종 수정일: 2025-11-04 */

// --- DOM 요소 ---
const recordForm = document.getElementById('record-form');
const clearBtn = document.getElementById('clear-btn');
const exportCsvBtn = document.getElementById('export-csv-btn');
const exportJsonBtn = document.getElementById('export-json-btn');
const importJsonBtn = document.getElementById('import-json-btn');
const importFileInput = document.getElementById('import-file-input');
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
const dailyDatePicker = document.getElementById('daily-date-picker');
const dailySummaryDiv = document.getElementById('daily-summary');
const dailyTbody = document.querySelector('#daily-records-table tbody');
const monthlyYearSelect = document.getElementById('monthly-year-select');
const monthlyMonthSelect = document.getElementById('monthly-month-select');
const monthlySummaryDiv = document.getElementById('monthly-summary');
const monthlyDetailedSummaryDiv = document.getElementById('monthly-detailed-summary');
const comparisonGraphDiv = document.getElementById('comparison-graph');
const monthlyTbody = document.querySelector('#monthly-records-table tbody');
const yearlyYearSelect = document.getElementById('yearly-year-select');
const yearlyTbody = document.querySelector('#yearly-summary-table tbody');

const batchFromSelect = document.getElementById('batch-from-center');
const batchToSelect = document.getElementById('batch-to-center');
const batchFromCustom = document.getElementById('batch-from-custom');
const batchToCustom = document.getElementById('batch-to-custom');
const batchIncomeInput = document.getElementById('batch-income');
const batchApplyBtn = document.getElementById('batch-apply-btn');
const batchStatus = document.getElementById('batch-status');

const subsidyLimitInput = document.getElementById('subsidy-limit');
const subsidySaveBtn = document.getElementById('subsidy-save-btn');
const subsidySummaryDiv = document.getElementById('subsidy-summary');
const totalMileageInput = document.getElementById('total-mileage');
const totalMileageSaveBtn = document.getElementById('total-mileage-save-btn');
const monthlyMileageBreakdown = document.getElementById('monthly-mileage-breakdown');

const currentMonthTitle = document.getElementById('current-month-title');
const currentMonthOperatingDays = document.getElementById('current-month-operating-days');
const currentMonthTripCount = document.getElementById('current-month-trip-count');
const currentMonthWaitingTime = document.getElementById('current-month-waiting-time');
const currentMonthIncome = document.getElementById('current-month-income');
const currentMonthExpense = document.getElementById('current-month-expense');
const currentMonthAvgIncomeLabel = document.getElementById('current-month-avg-income-label');
const currentMonthAvgIncome = document.getElementById('current-month-avg-income');

const cumulativeOperatingDays = document.getElementById('cumulative-operating-days');
const cumulativeTripCount = document.getElementById('cumulative-trip-count');
const cumulativeWaitingTime = document.getElementById('cumulative-waiting-time');
const cumulativeSuppliesCost = document.getElementById('cumulative-supplies-cost');
const cumulativeFuelCost = document.getElementById('cumulative-fuel-cost');
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

let waitStartTime = null;
let waitTimerInterval = null;

const getTodayString = () => new Date().toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\. /g, '-').slice(0, -1);
const getCurrentTimeString = () => new Date().toLocaleTimeString('ko-KR', {hour12: false, hour: '2-digit', minute: '2-digit'});

const formatToManwon = (valueInWon) => {
    if (!valueInWon && valueInWon !== 0) return '0';
    return Math.round(valueInWon / 10000).toLocaleString('ko-KR');
};

function getCenters() {
    const defaultCenters = ['안성', '안산', '용인', '이천', '인천'];
    const storedCenters = JSON.parse(localStorage.getItem('logistics_centers')) || defaultCenters;
    if (!localStorage.getItem('logistics_centers')) localStorage.setItem('logistics_centers', JSON.stringify(storedCenters));
    return storedCenters;
}
function addCenter(newCenter) {
    if (!newCenter || newCenter.trim() === '') return;
    const centers = getCenters();
    if (!centers.includes(newCenter.trim())) { centers.push(newCenter.trim()); localStorage.setItem('logistics_centers', JSON.stringify(centers)); }
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
    transportDetails.classList.toggle('hidden', !['화물운송', '공차이동'].includes(type));
    fuelDetails.classList.toggle('hidden', type !== '주유소');
    ureaDetails.classList.toggle('hidden', type !== '요소수');
    supplyDetails.classList.toggle('hidden', type !== '소모품');

    if(type === '소모품') {
        supplyMileageInput.value = localStorage.getItem('total_vehicle_mileage') || '';
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
            const coords = {
                lat: position.coords.latitude.toFixed(6),
                lon: position.coords.longitude.toFixed(6)
            };
            const coordsString = `${coords.lat}, ${coords.lon}`;
            
            if (point === 'start') {
                startCoordsInput.value = coordsString;
                gpsStatus.innerHTML = `✅ 출발 GPS 기록 완료!<br><span class="note">${coordsString}</span>`;
            } else {
                endCoordsInput.value = coordsString;
                const start = startCoordsInput.value ? `출발: ${startCoordsInput.value}` : '출발점 미기록';
                gpsStatus.innerHTML = `✅ 도착 GPS 기록 완료!<br><span class="note">${start}<br>도착: ${coordsString}</span>`;
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

function displayDailyRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const selectedDate = dailyDatePicker.value;
    const filteredRecords = records.filter(r => r.date === selectedDate);
    
    dailyTbody.innerHTML = '';
    let dailyIncome = 0, dailyExpense = 0, dailyDistance = 0, dailyTripCount = 0, dailyWaitingTime = 0;

    filteredRecords.forEach(r => {
        dailyIncome += parseInt(r.income || 0);
        dailyExpense += parseInt(r.cost || 0);
        if (['화물운송', '공차이동'].includes(r.type)) {
            dailyDistance += parseFloat(r.distance || 0);
            dailyTripCount++;
        }
        dailyWaitingTime += parseInt(r.waitingTime || 0);
        
        const tr = document.createElement('tr');
        let detailsCell = '', moneyCell = '', actionCell = '';
        if (['화물운송', '공차이동'].includes(r.type)) {
            detailsCell = `<strong>${r.from} → ${r.to}</strong><br><span class="note">${r.distance} km</span>`;
            let gpsLinks = '';
            if (r.start_gps) gpsLinks += `<a href="https://www.google.com/maps?q=${r.start_gps}" target="_blank">📍출발점</a> `;
            if (r.end_gps) gpsLinks += `<a href="https://www.google.com/maps?q=${r.end_gps}" target="_blank">🏁도착점</a>`;
            if(gpsLinks) detailsCell += `<br><span class="note">${gpsLinks}</span>`;
            if (r.waitingTime > 0) detailsCell += `<br><span class="note">⏱️ 대기: ${r.waitingTime}분</span>`;
            moneyCell = (r.income > 0 ? `<span class="income">+${formatToManwon(r.income)} 만원</span> ` : '') + (r.cost > 0 ? `<span class="cost">-${formatToManwon(r.cost)} 만원</span>` : '');
        } else if (r.type === '주유소') {
            detailsCell = `<strong>${parseFloat(r.liters || 0).toFixed(2)} L</strong> @ ${parseInt(r.unitPrice || 0).toLocaleString()} 원/L<br><span class="note">${r.brand || ''}</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        } else if (r.type === '요소수') {
            detailsCell = `<strong>${parseFloat(r.ureaLiters || 0).toFixed(2)} L</strong> @ ${parseInt(r.ureaUnitPrice || 0).toLocaleString()} 원/L<br><span class="note">${r.ureaStation || ''}</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        } else if (r.type === '소모품') {
            detailsCell = `<strong>${r.supplyItem || '기타 소모품'}</strong><br><span class="note">@ ${parseInt(r.mileage || 0).toLocaleString()} km</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        } else {
            detailsCell = `<span class="note">${r.notes || ''}</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        }
        actionCell = `<div class="action-cell"><button class="edit-btn" onclick="editRecord(${r.id})">수정</button><button class="delete-btn" onclick="deleteRecord(${r.id})">삭제</button></div>`;
        tr.innerHTML = `<td data-label="시간">${r.time}</td><td data-label="구분">${r.type === '화물운송' ? '운송' : r.type}</td><td data-label="내용">${detailsCell}</td><td data-label="수입/지출">${moneyCell}</td><td data-label="관리">${actionCell}</td>`;
        dailyTbody.appendChild(tr);
    });
    const dailyNet = dailyIncome - dailyExpense;
    dailySummaryDiv.innerHTML = `<strong>${selectedDate} 요약</strong> | 수입: <span class="income">${formatToManwon(dailyIncome)} 만원</span> | 지출: <span class="cost">${formatToManwon(dailyExpense)} 만원</span> | 일당: <strong class="income">${formatToManwon(dailyNet)} 만원</strong><br>거리: <strong>${dailyDistance.toFixed(1)} km</strong> | 이동건수: <strong>${dailyTripCount} 건</strong> | 대기시간: <strong>${dailyWaitingTime} 분</strong>`;
}

function displayMonthlyRecords() {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    
    const selectedPeriod = `${monthlyYearSelect.value}-${monthlyMonthSelect.value}`;
    const currentMonthRecords = allRecords.filter(r => r.date.startsWith(selectedPeriod));
    
    monthlyTbody.innerHTML = '';
    let totalIncome = 0, totalExpense = 0, totalDistance = 0, totalLiters = 0, totalFuelCost = 0, totalSuppliesCost = 0, totalWaitingTime = 0, totalTripCount = 0;

    currentMonthRecords.forEach(r => {
        totalIncome += parseInt(r.income || 0);
        totalExpense += parseInt(r.cost || 0);
        if (['화물운송', '공차이동'].includes(r.type)) {
            totalDistance += parseFloat(r.distance || 0);
            totalTripCount++;
        }
        if (r.type === '주유소') {
            totalLiters += parseFloat(r.liters || 0);
            totalFuelCost += parseInt(r.cost || 0);
        } else if (['소모품', '요소수'].includes(r.type)) {
            totalSuppliesCost += parseInt(r.cost || 0);
        }
        totalWaitingTime += parseInt(r.waitingTime || 0);
        
        const tr = document.createElement('tr');
        let detailsCell = '', moneyCell = '', actionCell = '';
        if (['화물운송', '공차이동'].includes(r.type)) {
            detailsCell = `<strong>${r.from} → ${r.to}</strong><br><span class="note">${r.distance} km</span>`;
            let gpsLinks = '';
            if (r.start_gps) gpsLinks += `<a href="https://www.google.com/maps?q=${r.start_gps}" target="_blank">📍출발점</a> `;
            if (r.end_gps) gpsLinks += `<a href="https://www.google.com/maps?q=${r.end_gps}" target="_blank">🏁도착점</a>`;
            if(gpsLinks) detailsCell += `<br><span class="note">${gpsLinks}</span>`;
            if (r.waitingTime > 0) detailsCell += `<br><span class="note">⏱️ 대기: ${r.waitingTime}분</span>`;
            moneyCell = (r.income > 0 ? `<span class="income">+${formatToManwon(r.income)} 만원</span> ` : '') + (r.cost > 0 ? `<span class="cost">-${formatToManwon(r.cost)} 만원</span>` : '');
        } else if (r.type === '주유소') {
            detailsCell = `<strong>${parseFloat(r.liters || 0).toFixed(2)} L</strong> @ ${parseInt(r.unitPrice || 0).toLocaleString()} 원/L<br><span class="note">${r.brand || ''}</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        } else if (r.type === '요소수') {
            detailsCell = `<strong>${parseFloat(r.ureaLiters || 0).toFixed(2)} L</strong> @ ${parseInt(r.ureaUnitPrice || 0).toLocaleString()} 원/L<br><span class="note">${r.ureaStation || ''}</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        } else if (r.type === '소모품') {
            detailsCell = `<strong>${r.supplyItem || '기타 소모품'}</strong><br><span class="note">@ ${parseInt(r.mileage || 0).toLocaleString()} km</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        } else {
            detailsCell = `<span class="note">${r.notes || ''}</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        }
        actionCell = `<div class="action-cell"><button class="edit-btn" onclick="editRecord(${r.id})">수정</button><button class="delete-btn" onclick="deleteRecord(${r.id})">삭제</button></div>`;
        tr.innerHTML = `<td data-label="일시">${r.date.substring(5)} ${r.time}</td><td data-label="구분">${r.type === '화물운송' ? '운송' : r.type}</td><td data-label="구간 / 내용">${detailsCell}</td><td data-label="수입/지출">${moneyCell}</td><td data-label="관리">${actionCell}</td>`;
        monthlyTbody.appendChild(tr);
    });

    const netIncome = totalIncome - totalExpense;
    monthlySummaryDiv.innerHTML = `<strong>${monthlyYearSelect.value}년 ${monthlyMonthSelect.value}월 요약</strong> | 총 수입: <span class="income">${formatToManwon(totalIncome)} 만원</span> | 총 지출: <span class="cost">${formatToManwon(totalExpense)} 만원</span><br>총 운행거리: <strong>${totalDistance.toFixed(1)} km</strong> | 총 이동 건수: <strong>${totalTripCount} 건</strong> | 총 대기시간: <strong>${Math.floor(totalWaitingTime / 60)}시간 ${totalWaitingTime % 60}분</strong>`;
    
    const waitHours = Math.floor(totalWaitingTime / 60);
    const waitMinutes = totalWaitingTime % 60;
    monthlyDetailedSummaryDiv.innerHTML = `월별 정산: <strong>${formatToManwon(netIncome)} 만원</strong> | 월별 주유비: <span class="cost">${formatToManwon(totalFuelCost)} 만원</span> | 월별 소모품비: <span class="cost">${formatToManwon(totalSuppliesCost)} 만원</span><br>월별 대기시간: ${waitHours}시간 ${waitMinutes}분 | 월별 이동 건수: ${totalTripCount} 건`;

    const subsidyLimit = parseFloat(localStorage.getItem('fuel_subsidy_limit')) || 0;
    const remainingLiters = subsidyLimit - totalLiters;
    const progressPercent = subsidyLimit > 0 ? Math.min(100, (totalLiters / subsidyLimit * 100)).toFixed(1) : 0;
    subsidySummaryDiv.innerHTML = `<div class="progress-label">월 한도: ${subsidyLimit.toLocaleString()} L | 사용: ${totalLiters.toFixed(1)} L | 잔여: ${remainingLiters.toFixed(1)} L</div><div class="progress-bar-container"><div class="progress-bar progress-bar-used" style="width: ${progressPercent}%;"></div></div>`;
    
    let prevMonthDate = new Date(`${selectedPeriod}-01`);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    const prevYear = prevMonthDate.getFullYear();
    const prevMonth = (prevMonthDate.getMonth() + 1).toString().padStart(2, '0');
    const prevPeriod = `${prevYear}-${prevMonth}`;
    const prevMonthRecords = allRecords.filter(r => r.date.startsWith(prevPeriod));
    
    let prevTotalIncome = 0, prevTotalExpense = 0;
    prevMonthRecords.forEach(r => {
        prevTotalIncome += parseInt(r.income || 0);
        prevTotalExpense += parseInt(r.cost || 0);
    });
    const prevNetIncome = prevTotalIncome - prevTotalExpense;
    
    updateComparisonGraph({
        current: { income: totalIncome, expense: totalExpense, net: netIncome },
        previous: { income: prevTotalIncome, expense: prevTotalExpense, net: prevNetIncome }
    });
}

function updateComparisonGraph(data) {
    const { current, previous } = data;
    if (!comparisonGraphDiv) return;
    const maxValue = Math.max(current.income, current.expense, previous.income, previous.expense, 1);

    const getPercent = (value) => (value / maxValue * 100);

    comparisonGraphDiv.innerHTML = `
        <h4>이전 달 대비 성과 비교</h4>
        <div class="graph-body">
            <div class="bar-group"><div class="bar-container"><div class="bar previous" style="height: ${getPercent(previous.income)}%;" title="이전달: ${formatToManwon(previous.income)}만원"></div><div class="bar current" style="height: ${getPercent(current.income)}%;" title="이번달: ${formatToManwon(current.income)}만원"></div></div><div class="bar-label">수입</div></div>
            <div class="bar-group"><div class="bar-container"><div class="bar previous" style="height: ${getPercent(previous.expense)}%;" title="이전달: ${formatToManwon(previous.expense)}만원"></div><div class="bar current" style="height: ${getPercent(current.expense)}%;" title="이번달: ${formatToManwon(current.expense)}만원"></div></div><div class="bar-label">지출</div></div>
            <div class="bar-group"><div class="bar-container"><div class="bar previous" style="height: ${getPercent(previous.net < 0 ? 0 : previous.net)}%;" title="이전달: ${formatToManwon(previous.net)}만원"></div><div class="bar current" style="height: ${getPercent(current.net < 0 ? 0 : current.net)}%;" title="이번달: ${formatToManwon(current.net)}만원"></div></div><div class="bar-label">정산</div></div>
        </div>
        <div class="graph-legend"><div class="legend-item"><span class="legend-color" style="background-color: #6c757d;"></span> 이전 달</div><div class="legend-item"><span class="legend-color" style="background-color: #007bff;"></span> 이번 달</div></div>`;
}
        
function displayYearlyRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const selectedYear = yearlyYearSelect.value;
    
    const monthlyData = {};
    for(let i=1; i<=12; i++) {
        const monthKey = `${selectedYear}-${i.toString().padStart(2, '0')}`;
        monthlyData[monthKey] = { income: 0, expense: 0, distance: 0, liters: 0, tripCount: 0, waitingTime: 0 };
    }

    records.filter(r => r.date.startsWith(selectedYear)).forEach(r => {
        const monthKey = r.date.substring(0, 7);
        monthlyData[monthKey].income += parseInt(r.income || 0);
        monthlyData[monthKey].expense += parseInt(r.cost || 0);
        if(['화물운송','공차이동'].includes(r.type)) {
            monthlyData[monthKey].distance += parseFloat(r.distance || 0);
            monthlyData[monthKey].tripCount++;
        }
        if(r.type === '주유소') monthlyData[monthKey].liters += parseFloat(r.liters || 0);
        monthlyData[monthKey].waitingTime += parseInt(r.waitingTime || 0);
    });

    yearlyTbody.innerHTML = '';
    const currentMonthKey = new Date().toISOString().slice(0, 7);
    Object.keys(monthlyData).sort().forEach(monthKey => {
        const data = monthlyData[monthKey];
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
        yearlyTbody.appendChild(tr);
    });
}

function displayCurrentMonthData() {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    const now = new Date();
    const currentPeriod = now.toISOString().slice(0, 7);
    const currentMonth = now.getMonth() + 1;
    const currentMonthRecords = allRecords.filter(r => r.date.startsWith(currentPeriod));
    
    currentMonthTitle.textContent = `${currentMonth}월 실시간 요약`;
    currentMonthAvgIncomeLabel.textContent = `${currentMonth}월 평균 수익`;

    let totalIncome = 0, totalExpense = 0, totalTripCount = 0, totalWaitingTime = 0;
    currentMonthRecords.forEach(r => {
        totalIncome += parseInt(r.income || 0);
        totalExpense += parseInt(r.cost || 0);
        if (['화물운송', '공차이동'].includes(r.type)) totalTripCount++;
        totalWaitingTime += parseInt(r.waitingTime || 0);
    });

    const netIncome = totalIncome - totalExpense;
    const operatingDays = new Set(currentMonthRecords.map(r => r.date)).size;
    const avgIncome = operatingDays > 0 ? netIncome / operatingDays : 0;
    const waitHours = Math.floor(totalWaitingTime / 60);
    const waitMinutes = totalWaitingTime % 60;
    
    currentMonthOperatingDays.textContent = `${operatingDays} 일`;
    currentMonthTripCount.textContent = `${totalTripCount} 건`;
    currentMonthWaitingTime.textContent = `${waitHours}시간 ${waitMinutes}분`;
    currentMonthIncome.textContent = `${formatToManwon(totalIncome)} 만원`;
    currentMonthExpense.textContent = `${formatToManwon(totalExpense)} 만원`;
    currentMonthAvgIncome.textContent = `${formatToManwon(avgIncome)} 만원`;
}

function displayCumulativeData() {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    let cumulativeIncome = 0, cumulativeExpense = 0, cumulativeFuelCost = 0, cumulativeSuppliesCost = 0, cumulativeTotalLiters = 0, cumulativeWaitingTime = 0, cumulativeTripCount = 0;
    let monthlyMileage = {};

    allRecords.forEach(r => {
        cumulativeIncome += parseInt(r.income || 0);
        cumulativeExpense += parseInt(r.cost || 0);
        if (r.type === '주유소') {
            cumulativeFuelCost += parseInt(r.cost || 0);
            cumulativeTotalLiters += parseFloat(r.liters || 0);
        } else if (['소모품', '요소수'].includes(r.type)) {
            cumulativeSuppliesCost += parseInt(r.cost || 0);
        }
        cumulativeWaitingTime += parseInt(r.waitingTime || 0);
        if (['화물운송', '공차이동'].includes(r.type)) {
            cumulativeTripCount++;
            const monthKey = r.date.substring(0, 7);
            monthlyMileage[monthKey] = (monthlyMileage[monthKey] || 0) + parseFloat(r.distance);
        }
    });
    const cumulativeNetIncome = cumulativeIncome - cumulativeExpense;
    const totalMileage = parseFloat(localStorage.getItem('total_vehicle_mileage')) || 0;
    const avgFuelEconomy = cumulativeTotalLiters > 0 && totalMileage > 0 ? (totalMileage / cumulativeTotalLiters).toFixed(2) : 0;
    const costPerKm = totalMileage > 0 ? Math.round(cumulativeExpense / totalMileage) : 0;
    const operatingDays = new Set(allRecords.map(r => r.date)).size;
    
    const waitDays = Math.floor(cumulativeWaitingTime / 1440);
    const waitHours = Math.floor((cumulativeWaitingTime % 1440) / 60);
    const waitMinutes = cumulativeWaitingTime % 60;
    let waitString = '';
    if (waitDays > 0) waitString += `${waitDays}일 `;
    waitString += `${waitHours}시간 ${waitMinutes}분`;

    cumulativeOperatingDays.textContent = `${operatingDays} 일`;
    cumulativeTripCount.textContent = `${cumulativeTripCount} 건`;
    cumulativeWaitingTime.textContent = waitString;
    cumulativeSuppliesCost.textContent = `${formatToManwon(cumulativeSuppliesCost)} 만원`;
    cumulativeFuelCost.textContent = `${formatToManwon(cumulativeFuelCost)} 만원`;
    cumulativeNetIncome.textContent = `${formatToManwon(cumulativeNetIncome)} 만원`;
    cumulativeAvgEconomy.textContent = `${avgFuelEconomy} km/L`;
    cumulativeCostPerKm.textContent = `${costPerKm.toLocaleString('ko-KR')} 원`;

    let mileageBreakdownHtml = '<strong>월별 운행기록:</strong><br>';
    Object.keys(monthlyMileage).sort().reverse().forEach(month => {
        mileageBreakdownHtml += `${month}: ${monthlyMileage[month].toFixed(1)} km<br>`;
    });
    monthlyMileageBreakdown.innerHTML = mileageBreakdownHtml;
}

function populateSelectors() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const availableYears = [...new Set(records.map(r => r.date.substring(0, 4)))].sort().reverse();
    if (availableYears.length === 0) availableYears.push(new Date().getFullYear().toString());
    
    const yearOptions = availableYears.map(y => `<option value="${y}">${y}년</option>`).join('');
    monthlyYearSelect.innerHTML = yearOptions;
    yearlyYearSelect.innerHTML = yearOptions;
    
    monthlyMonthSelect.innerHTML = Array.from({length: 12}, (_, i) => `<option value="${(i+1).toString().padStart(2,'0')}">${i+1}월</option>`).join('');
    
    const currentYear = new Date().getFullYear().toString();
    if(availableYears.includes(currentYear)) {
         monthlyYearSelect.value = currentYear;
         yearlyYearSelect.value = currentYear;
    }
    monthlyMonthSelect.value = (new Date().getMonth() + 1).toString().padStart(2, '0');
}

function updateAllDisplays() {
    const activeView = document.querySelector('.view-content.active').id;
    if (activeView === 'daily-view') displayDailyRecords();
    if (activeView === 'monthly-view') displayMonthlyRecords();
    if (activeView === 'yearly-view') displayYearlyRecords();
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

function deleteDailyRecord(date) {
    if (confirm(`${date}의 모든 기록을 삭제하시겠습니까?`)) {
        let records = JSON.parse(localStorage.getItem('records')) || [];
        records = records.filter(r => r.date !== date);
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

function editDailyRecord(date) {
    dailyDatePicker.value = date;
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-view="daily"]').classList.add('active');
    viewContents.forEach(c => c.classList.remove('active'));
    document.getElementById('daily-view').classList.add('active');
    updateAllDisplays();
    window.scrollTo(0, recordForm.scrollHeight);
}

function getFormData(isNew = false) {
    const fromValue = (fromSelect.value === 'direct') ? fromCustom.value : fromSelect.value;
    const toValue = (toSelect.value === 'direct') ? toCustom.value : toSelect.value;
    addCenter(fromValue); addCenter(toValue);
    
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

recordForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const editingId = parseInt(editIdInput.value);
    
    let records = JSON.parse(localStorage.getItem('records')) || [];
    
    if (editingId) {
        const recordIndex = records.findIndex(r => r.id === editingId);
        if (recordIndex > -1) {
            const oldRecord = records[recordIndex];
            const newRecordData = getFormData();
            
            const oldDistance = parseFloat(oldRecord.distance) || 0;
            const newDistance = parseFloat(newRecordData.distance) || 0;
            let currentMileage = parseFloat(localStorage.getItem('total_vehicle_mileage')) || 0;
            if (['화물운송', '공차이동'].includes(oldRecord.type)) {
                currentMileage = currentMileage - oldDistance + newDistance;
                localStorage.setItem('total_vehicle_mileage', currentMileage);
            }
            records[recordIndex] = { ...oldRecord, ...newRecordData };
        }
    } else {
        const tripDistance = parseFloat(manualDistanceInput.value) || 0;
        let currentMileage = parseFloat(localStorage.getItem('total_vehicle_mileage')) || 0;
        if (['화물운송', '공차이동'].includes(typeSelect.value)) {
            currentMileage += tripDistance;
            localStorage.setItem('total_vehicle_mileage', currentMileage);
        }
        
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

totalMileageSaveBtn.addEventListener('click', () => {
    const newMileage = totalMileageInput.value;
    localStorage.setItem('total_vehicle_mileage', newMileage);
    alert(`총 주행거리가 ${parseInt(newMileage).toLocaleString()} km로 저장되었습니다.`);
    updateAllDisplays();
});

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
exportCsvBtn.addEventListener('click', exportToCsv);

function exportToJson() {
    const records = localStorage.getItem('records');
    if (!records || records === '[]') {
        alert('저장할 기록이 없습니다.');
        return;
    }
    const blob = new Blob([records], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const today = new Date().toISOString().slice(0, 10);
    a.download = `운행기록_백업_${today}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('모든 기록이 JSON 파일로 성공적으로 저장(다운로드)되었습니다!');
}
exportJsonBtn.addEventListener('click', exportToJson);

function importFromJson(event) {
    if (!confirm('경고!\n현재 앱의 모든 기록이 선택한 파일의 내용으로 완전히 대체됩니다.\n계속하시겠습니까?')) {
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
            if (!Array.isArray(data)) {
                alert('오류: 올바른 형식의 백업 파일(.json)이 아닙니다.');
                return;
            }
            localStorage.setItem('records', JSON.stringify(data));
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
importJsonBtn.addEventListener('click', () => importFileInput.click());

clearBtn.addEventListener('click', () => {
    if (confirm('정말로 모든 기록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        localStorage.removeItem('records');
        localStorage.removeItem('logistics_centers');
        localStorage.removeItem('fuel_subsidy_limit');
        localStorage.removeItem('total_vehicle_mileage');
        localStorage.removeItem('saved_fares');
        alert('모든 데이터가 삭제되었습니다.');
        location.reload();
    }
});

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        viewContents.forEach(c => c.classList.remove('active'));
        document.getElementById(btn.dataset.view + '-view').classList.add('active');
        updateAllDisplays();
    });
});

dailyDatePicker.addEventListener('change', displayDailyRecords);
monthlyYearSelect.addEventListener('change', displayMonthlyRecords);
monthlyMonthSelect.addEventListener('change', displayMonthlyRecords);
yearlyYearSelect.addEventListener('change', displayYearlyRecords);

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
});
backToMainBtn.addEventListener('click', () => {
    mainPage.classList.remove('hidden');
    settingsPage.classList.add('hidden');
    goToSettingsBtn.classList.remove('hidden');
    backToMainBtn.classList.add('hidden');
});

function initialSetup() {
    dateInput.value = getTodayString();
    timeInput.value = getCurrentTimeString();
    dailyDatePicker.value = getTodayString();
    subsidyLimitInput.value = localStorage.getItem('fuel_subsidy_limit') || '';
    totalMileageInput.value = localStorage.getItem('total_vehicle_mileage') || '';
    populateCenterSelectors();
    populateSelectors();
    toggleUI(typeSelect.value);

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

    updateAllDisplays();
}

document.addEventListener('DOMContentLoaded', initialSetup);