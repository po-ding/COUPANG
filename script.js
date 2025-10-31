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
const supplyDetails = document.getElementById('supply-details');
const supplyItemInput = document.getElementById('supply-item');
const supplyMileageInput = document.getElementById('supply-mileage');

const tabBtns = document.querySelectorAll('.tab-btn');
const viewContents = document.querySelectorAll('.view-content');
const dailyDatePicker = document.getElementById('daily-date-picker');
const dailySummaryDiv = document.getElementById('daily-summary');
const dailyTbody = document.querySelector('#daily-records-table tbody');
const monthlyYearSelect = document.getElementById('monthly-year-select');
const monthlyMonthSelect = document.getElementById('monthly-month-select');
const monthlySummaryDiv = document.getElementById('monthly-summary');
const monthlyTbody = document.querySelector('#monthly-records-table tbody');
const yearlyYearSelect = document.getElementById('yearly-year-select');
const yearlyTbody = document.querySelector('#yearly-summary-table tbody');

const subsidyLimitInput = document.getElementById('subsidy-limit');
const subsidySaveBtn = document.getElementById('subsidy-save-btn');
const subsidySummaryDiv = document.getElementById('subsidy-summary');
const totalMileageInput = document.getElementById('total-mileage');
const totalMileageSaveBtn = document.getElementById('total-mileage-save-btn');
const cumulativeSummaryDiv = document.getElementById('cumulative-summary');

const startGpsBtn = document.getElementById('start-gps-btn');
const endGpsBtn = document.getElementById('end-gps-btn');
const gpsStatus = document.getElementById('gps-status');
const startCoordsInput = document.getElementById('start-coords');
const endCoordsInput = document.getElementById('end-coords');
const manualDistanceInput = document.getElementById('manual-distance');

// --- 핵심 로직 ---
const getTodayString = () => new Date().toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\. /g, '-').slice(0, -1);
const getCurrentTimeString = () => new Date().toLocaleTimeString('ko-KR', {hour12: false, hour: '2-digit', minute: '2-digit'});

const formatToManwon = (valueInWon) => {
    if (!valueInWon) return '0';
    return (valueInWon / 10000).toLocaleString('ko-KR', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
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
    fromSelect.innerHTML = options; toSelect.innerHTML = options;
}

function toggleUI(type) {
    transportDetails.classList.toggle('hidden', !['화물운송', '공차이동'].includes(type));
    fuelDetails.classList.toggle('hidden', type !== '주유');
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

function displayDailyRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const selectedDate = dailyDatePicker.value;
    const filteredRecords = records.filter(r => r.date === selectedDate);
    
    dailyTbody.innerHTML = '';
    let dailyIncome = 0, dailyExpense = 0, dailyDistance = 0;

    filteredRecords.forEach(r => {
        dailyIncome += parseInt(r.income || 0);
        dailyExpense += parseInt(r.cost || 0);
        if (['화물운송', '공차이동'].includes(r.type)) dailyDistance += parseFloat(r.distance || 0);
        
        const tr = document.createElement('tr');
        let detailsCell = '', moneyCell = '';
        if (['화물운송', '공차이동'].includes(r.type)) {
            detailsCell = `<strong>${r.from} → ${r.to}</strong><br><span class="note">${r.distance} km</span>`;
            let gpsLinks = '';
            if (r.start_gps) gpsLinks += `<a href="https://www.google.com/maps?q=${r.start_gps}" target="_blank">📍출발점</a> `;
            if (r.end_gps) gpsLinks += `<a href="https://www.google.com/maps?q=${r.end_gps}" target="_blank">🏁도착점</a>`;
            if(gpsLinks) detailsCell += `<br><span class="note">${gpsLinks}</span>`;
            moneyCell = (r.income > 0 ? `<span class="income">+${formatToManwon(r.income)} 만원</span> ` : '') + (r.cost > 0 ? `<span class="cost">-${formatToManwon(r.cost)} 만원</span>` : '');
        } else if (r.type === '주유') {
            detailsCell = `<strong>${parseFloat(r.liters || 0).toFixed(2)} L</strong> @ ${parseInt(r.unitPrice || 0).toLocaleString()} 원/L<br><span class="note">${r.brand || ''}</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        } else if (r.type === '소모품') {
            detailsCell = `<strong>${r.supplyItem || '기타 소모품'}</strong><br><span class="note">@ ${parseInt(r.mileage || 0).toLocaleString()} km</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        } else {
            detailsCell = `<span class="note">${r.notes || ''}</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        }
        tr.innerHTML = `
            <td data-label="시간">${r.time}</td>
            <td data-label="구분">${r.type === '화물운송' ? '운송' : r.type}</td>
            <td data-label="내용">${detailsCell}</td>
            <td data-label="수입/지출">${moneyCell}</td>
        `;
        dailyTbody.appendChild(tr);
    });
    dailySummaryDiv.innerHTML = `<strong>${selectedDate} 요약</strong> | 총수입: <span class="income">${formatToManwon(dailyIncome)} 만원</span> | 총지출: <span class="cost">${formatToManwon(dailyExpense)} 만원</span> | 운행거리: <strong>${dailyDistance.toFixed(1)} km</strong>`;
}

function displayMonthlyRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const selectedPeriod = `${monthlyYearSelect.value}-${monthlyMonthSelect.value}`;
    const filteredRecords = records.filter(r => r.date.startsWith(selectedPeriod));
    
    monthlyTbody.innerHTML = '';
    let totalIncome = 0, totalExpense = 0, totalDistance = 0, totalLiters = 0, totalFuelCost = 0;

    filteredRecords.forEach(r => {
        const tr = document.createElement('tr');
        let detailsCell = '', moneyCell = '';
        totalIncome += parseInt(r.income || 0);
        totalExpense += parseInt(r.cost || 0);
        if (['화물운송', '공차이동'].includes(r.type)) {
            totalDistance += parseFloat(r.distance || 0);
            detailsCell = `<strong>${r.from} → ${r.to}</strong><br><span class="note">${r.distance} km</span>`;
            let gpsLinks = '';
            if (r.start_gps) gpsLinks += `<a href="https://www.google.com/maps?q=${r.start_gps}" target="_blank">📍출발점</a> `;
            if (r.end_gps) gpsLinks += `<a href="https://www.google.com/maps?q=${r.end_gps}" target="_blank">🏁도착점</a>`;
            if(gpsLinks) detailsCell += `<br><span class="note">${gpsLinks}</span>`;
            moneyCell = (r.income > 0 ? `<span class="income">+${formatToManwon(r.income)} 만원</span> ` : '') + (r.cost > 0 ? `<span class="cost">-${formatToManwon(r.cost)} 만원</span>` : '');
        } else if (r.type === '주유') {
            totalLiters += parseFloat(r.liters || 0);
            totalFuelCost += parseInt(r.cost || 0);
            detailsCell = `<strong>${parseFloat(r.liters || 0).toFixed(2)} L</strong> @ ${parseInt(r.unitPrice || 0).toLocaleString()} 원/L<br><span class="note">${r.brand || ''}</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        } else if (r.type === '소모품') {
            detailsCell = `<strong>${r.supplyItem || '기타 소모품'}</strong><br><span class="note">@ ${parseInt(r.mileage || 0).toLocaleString()} km</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        } else {
            detailsCell = `<span class="note">${r.notes || ''}</span>`;
            moneyCell = `<span class="cost">-${formatToManwon(r.cost)} 만원</span>`;
        }
        tr.innerHTML = `
            <td data-label="일시">${r.date.substring(5)} ${r.time}</td>
            <td data-label="구분">${r.type === '화물운송' ? '운송' : r.type}</td>
            <td data-label="구간 / 내용">${detailsCell}</td>
            <td data-label="수입/지출">${moneyCell}</td>
        `;
        monthlyTbody.appendChild(tr);
    });

    const netIncome = totalIncome - totalExpense;
    monthlySummaryDiv.innerHTML = `
        <strong>${monthlyYearSelect.value}년 ${monthlyMonthSelect.value}월 요약</strong><br>
        총 수입: <span class="income">${formatToManwon(totalIncome)} 만원</span> | 총 지출: <span class="cost">${formatToManwon(totalExpense)} 만원</span><br>
        정산: <strong>${formatToManwon(netIncome)} 만원</strong> | 총 운행거리: <strong>${totalDistance.toFixed(1)} km</strong><br>
        총 주유량: <strong>${totalLiters.toFixed(2)} L</strong> | 총 주유비용: <span class="cost">${formatToManwon(totalFuelCost)} 만원</span>`;

    const subsidyLimit = parseFloat(localStorage.getItem('fuel_subsidy_limit')) || 0;
    const remainingLiters = subsidyLimit - totalLiters;
    const progressPercent = subsidyLimit > 0 ? Math.min(100, (totalLiters / subsidyLimit * 100)).toFixed(1) : 0;
    subsidySummaryDiv.innerHTML = `
        월 한도: <strong>${subsidyLimit.toLocaleString()} L</strong><br>
        사용량: ${totalLiters.toFixed(2)} L | 잔여량: <strong>${remainingLiters.toFixed(2)} L</strong>
        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${progressPercent}%;">${progressPercent > 10 ? progressPercent + '%' : ''}</div>
        </div>`;
}

function displayYearlyRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const selectedYear = yearlyYearSelect.value;
    const filteredRecords = records.filter(r => r.date.startsWith(selectedYear));

    const monthlyData = {};
    for(let i=1; i<=12; i++) {
        const month = i.toString().padStart(2, '0');
        monthlyData[month] = { income: 0, expense: 0, distance: 0, liters: 0 };
    }

    filteredRecords.forEach(r => {
        const month = r.date.substring(5, 7);
        monthlyData[month].income += parseInt(r.income || 0);
        monthlyData[month].expense += parseInt(r.cost || 0);
        if(['화물운송','공차이동'].includes(r.type)) monthlyData[month].distance += parseFloat(r.distance || 0);
        if(r.type === '주유') monthlyData[month].liters += parseFloat(r.liters || 0);
    });

    yearlyTbody.innerHTML = '';
    for(const month in monthlyData) {
        const data = monthlyData[month];
        const netIncome = data.income - data.expense;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${parseInt(month)}월</td>
            <td><span class="income">${formatToManwon(data.income)}</span></td>
            <td><span class="cost">${formatToManwon(data.expense)}</span></td>
            <td><strong>${formatToManwon(netIncome)}</strong></td>
            <td>${data.distance.toFixed(1)}</td>
            <td>${data.liters.toFixed(2)}</td>
        `;
        yearlyTbody.appendChild(tr);
    }
}

function displayCumulativeData() {
    const allRecords = JSON.parse(localStorage.getItem('records')) || [];
    let cumulativeIncome = 0, cumulativeExpense = 0, cumulativeFuelCost = 0, cumulativeSuppliesCost = 0, cumulativeTotalLiters = 0;
    allRecords.forEach(r => {
        cumulativeIncome += parseInt(r.income || 0);
        cumulativeExpense += parseInt(r.cost || 0);
        if (r.type === '주유') {
            cumulativeFuelCost += parseInt(r.cost || 0);
            cumulativeTotalLiters += parseFloat(r.liters || 0);
        } else if (r.type === '소모품') {
            cumulativeSuppliesCost += parseInt(r.cost || 0);
        }
    });
    const cumulativeNetIncome = cumulativeIncome - cumulativeExpense;
    const totalMileage = parseFloat(localStorage.getItem('total_vehicle_mileage')) || 0;
    const avgFuelEconomy = cumulativeTotalLiters > 0 && totalMileage > 0 ? (totalMileage / cumulativeTotalLiters).toFixed(2) : 0;
    const costPerKm = totalMileage > 0 ? Math.round(cumulativeExpense / totalMileage) : 0;
    const operatingDays = new Set(allRecords.map(r => r.date)).size;

    cumulativeSummaryDiv.innerHTML = `
        누적 정산 금액: <strong class="income">${formatToManwon(cumulativeNetIncome)} 만원</strong><br>
        누적 주유 비용: <span class="cost">${formatToManwon(cumulativeFuelCost)} 만원</span><br>
        누적 소모품 비용: <span class="cost">${formatToManwon(cumulativeSuppliesCost)} 만원</span><hr>
        <strong>평균 연비: ${avgFuelEconomy} km/L</strong><br>
        <strong>km당 운행비용: ${costPerKm.toLocaleString()} 원</strong><br>
        총 운행일수: ${operatingDays} 일
    `;
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
}

recordForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const tripDistance = parseFloat(manualDistanceInput.value) || 0;
    let currentMileage = parseFloat(localStorage.getItem('total_vehicle_mileage')) || 0;
    if (['화물운송', '공차이동'].includes(typeSelect.value)) {
        currentMileage += tripDistance;
        localStorage.setItem('total_vehicle_mileage', currentMileage);
    }
    const fromValue = (fromSelect.value === 'direct') ? fromCustom.value : fromSelect.value;
    const toValue = (toSelect.value === 'direct') ? toCustom.value : toSelect.value;
    addCenter(fromValue); addCenter(toValue);
    const newRecord = {
        id: Date.now(),
        date: dateInput.value, time: timeInput.value, type: typeSelect.value,
        from: fromValue, to: toValue, 
        distance: tripDistance,
        start_gps: startCoordsInput.value,
        end_gps: endCoordsInput.value,
        cost: Math.round((parseFloat(costInput.value) || 0) * 10000),
        income: Math.round((parseFloat(incomeInput.value) || 0) * 10000),
        liters: fuelLitersInput.value || 0, unitPrice: fuelUnitPriceInput.value || 0, brand: fuelBrandSelect.value || '',
        supplyItem: supplyItemInput.value || '', mileage: supplyMileageInput.value || 0
    };
    const records = JSON.parse(localStorage.getItem('records')) || [];
    records.push(newRecord);
    records.sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
    localStorage.setItem('records', JSON.stringify(records));
    recordForm.reset();
    initialSetup();
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

    const headers = ['날짜', '시간', '구분', '출발지', '도착지', '운행거리(km)', '출발GPS', '도착GPS', '수입(원)', '지출(원)', '주유량(L)', '단가(원/L)', '주유브랜드', '소모품내역', '교체시점(km)'];
    
    const escapeCsvCell = (cell) => {
        if (cell == null) return '';
        const str = String(cell);
        if (str.includes(',')) return `"${str}"`;
        return str;
    };

    const csvRows = [headers.join(',')];
    records.forEach(r => {
        const row = [
            r.date, r.time, r.type, r.from, r.to, r.distance, r.start_gps, r.end_gps,
            r.income, r.cost, r.liters, r.unitPrice, r.brand, r.supplyItem, r.mileage
        ];
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

function calculateCost() {
    const unitPrice = parseFloat(fuelUnitPriceInput.value) || 0;
    const liters = parseFloat(fuelLitersInput.value) || 0;
    if (document.activeElement === fuelLitersInput || document.activeElement === fuelUnitPriceInput) {
        if (unitPrice > 0 && liters > 0) {
            costInput.value = (Math.round(unitPrice * liters) / 10000).toFixed(2);
        }
    }
}
function calculateLiters() {
    const costInManwon = parseFloat(costInput.value) || 0;
    const unitPrice = parseFloat(fuelUnitPriceInput.value) || 0;
    if (document.activeElement === costInput && typeSelect.value === '주유') {
        if (costInManwon > 0 && unitPrice > 0) {
            fuelLitersInput.value = ((costInManwon * 10000) / unitPrice).toFixed(2);
        }
    }
}
fuelUnitPriceInput.addEventListener('input', calculateCost);
fuelLitersInput.addEventListener('input', calculateCost);
costInput.addEventListener('input', calculateLiters);
typeSelect.addEventListener('change', () => toggleUI(typeSelect.value));
fromSelect.addEventListener('change', () => fromCustom.classList.toggle('hidden', fromSelect.value !== 'direct'));
toSelect.addEventListener('change', () => toCustom.classList.toggle('hidden', toSelect.value !== 'direct'));

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
    
    updateAllDisplays();
}
initialSetup();