/** 버전: 4.0 | 최종 수정일: 2025-11-04 */

// --- DOM 요소 ---
const recordForm = document.getElementById('record-form');
const clearBtn = document.getElementById('clear-btn');
const exportCsvBtn = document.getElementById('export-csv-btn');
const exportJsonBtn = document.getElementById('export-json-btn');
const importJsonBtn = document.getElementById('import-json-btn');
const importFileInput = document.getElementById('import-file-input');
const dateInfoFieldset = document.getElementById('date-info-fieldset'); // [추가] 날짜 필드셋
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

const centerListContainer = document.getElementById('center-list-container'); // [추가] 지역 목록 컨테이너

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
    if (!centers.includes(newCenter.trim())) { 
        centers.push(newCenter.trim());
        localStorage.setItem('logistics_centers', JSON.stringify(centers));
        refreshCenterUI(); // [수정] UI 즉시 새로고침
    }
}
function populateCenterSelectors() {
    const centers = getCenters();
    const options = centers.map(c => `<option value="${c}">${c}</option>`).join('') + '<option value="direct">직접 입력</option>';
    fromSelect.innerHTML = options;
    toSelect.innerHTML = options;
    batchFromSelect.innerHTML = options;
    batchToSelect.innerHTML = options;
}

// ======[ 수정된 부분 1: UI 토글 기능 ]======
function toggleUI(type) {
    // 날짜 선택 필드 보이기/숨기기
    const showDateField = ['주유소', '요소수', '소모품', '통행료'].includes(type);
    dateInfoFieldset.classList.toggle('hidden', !showDateField);

    // 기존 UI 토글 로직
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
    // ... (변경 없음)
}

function startWaitTimer() {
    // ... (변경 없음)
}

function stopWaitTimer() {
    // ... (변경 없음)
}

function createSummaryHTML(title, records) {
    // ... (변경 없음)
}

function displayTodayRecords() {
    // ... (변경 없음)
}

function displayDailyRecords() {
    // ... (변경 없음)
}
        
function displayMonthlyRecords() {
    // ... (변경 없음)
}

function viewDateDetails(date) {
    // ... (변경 없음)
}

function displayCurrentMonthData() {
    // ... (변경 없음)
}

function displayCumulativeData() {
    // ... (변경 없음)
}

function populateSelectors() {
    // ... (변경 없음)
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
    // ... (변경 없음)
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
    // ... (변경 없음)
}

recordForm.addEventListener('submit', function(event) {
    // ... (변경 없음)
});

batchApplyBtn.addEventListener('click', () => {
    // ... (변경 없음)
});

subsidySaveBtn.addEventListener('click', () => {
    // ... (변경 없음)
});

totalMileageSaveBtn.addEventListener('click', () => {
    // ... (변경 없음)
});

function exportToCsv() {
    // ... (변경 없음)
}
exportCsvBtn.addEventListener('click', exportToCsv);

function exportToJson() {
    const records = localStorage.getItem('records');
    if (!records || records === '[]') {
        alert('저장할 기록이 없습니다.');
        return;
    }
    const backupData = {
        records: JSON.parse(records),
        centers: getCenters()
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
    alert('모든 기록과 운송지역 목록이 JSON 파일로 성공적으로 저장(다운로드)되었습니다!');
}
exportJsonBtn.addEventListener('click', exportToJson);

function importFromJson(event) {
    if (!confirm('경고!\n현재 앱의 모든 기록과 운송지역 목록이 선택한 파일의 내용으로 완전히 대체됩니다.\n계속하시겠습니까?')) {
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
            
            if (data && Array.isArray(data.records) && Array.isArray(data.centers)) {
                localStorage.setItem('records', JSON.stringify(data.records));
                localStorage.setItem('logistics_centers', JSON.stringify(data.centers));
            } else if (Array.isArray(data)) {
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
importJsonBtn.addEventListener('click', () => importFileInput.click());
importFileInput.addEventListener('change', importFromJson);

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
    // ... (변경 없음)
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
    // ... (변경 없음)
}
function calculateLiters() {
    // ... (변경 없음)
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
    // ... (변경 없음)
}

// ======[ 새로 추가된 부분 2: 운송 지역 관리 기능 ]======
/**
 * 설정 페이지에 운송 지역 목록과 삭제 버튼을 표시합니다.
 */
function displayCenterList() {
    const centers = getCenters();
    centerListContainer.innerHTML = ''; // 목록 비우기
    if (centers.length === 0) {
        centerListContainer.innerHTML = '<p class="note">등록된 지역이 없습니다.</p>';
        return;
    }

    centers.forEach(center => {
        const item = document.createElement('div');
        item.className = 'center-item';
        item.innerHTML = `
            <span>${center}</span>
            <button class="delete-btn" data-center="${center}">삭제</button>
        `;
        centerListContainer.appendChild(item);
    });

    // 각 삭제 버튼에 이벤트 리스너 추가
    centerListContainer.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            deleteCenter(e.target.dataset.center);
        });
    });
}

/**
 * 특정 운송 지역을 목록에서 삭제합니다.
 * @param {string} centerNameToDelete - 삭제할 지역 이름
 */
function deleteCenter(centerNameToDelete) {
    if (confirm(`'${centerNameToDelete}' 지역을 목록에서 정말 삭제하시겠습니까?\n(기존 기록은 변경되지 않습니다.)`)) {
        let centers = getCenters();
        centers = centers.filter(c => c !== centerNameToDelete);
        localStorage.setItem('logistics_centers', JSON.stringify(centers));
        refreshCenterUI(); // UI 새로고침
    }
}

/**
 * 지역 목록 변경 후 관련된 모든 UI를 새로고침합니다.
 */
function refreshCenterUI() {
    displayCenterList();        // 설정 페이지의 목록 새로고침
    populateCenterSelectors();  // 메인 페이지의 드롭다운 새로고침
}

goToSettingsBtn.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    settingsPage.classList.remove('hidden');
    goToSettingsBtn.classList.add('hidden');
    backToMainBtn.classList.remove('hidden');
    displayCenterList(); // [추가] 설정 페이지를 열 때마다 목록을 새로 표시
});
backToMainBtn.addEventListener('click', () => {
    mainPage.classList.remove('hidden');
    settingsPage.classList.add('hidden');
    goToSettingsBtn.classList.remove('hidden');
    backToMainBtn.classList.add('hidden');
});

function updateCentersFromRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    if (records.length === 0) return;

    const centers = getCenters();
    const centerSet = new Set(centers);
    let needsUpdate = false;

    records.forEach(r => {
        if (r.from && !centerSet.has(r.from)) {
            centerSet.add(r.from);
            centers.push(r.from);
            needsUpdate = true;
        }
        if (r.to && !centerSet.has(r.to)) {
            centerSet.add(r.to);
            centers.push(r.to);
            needsUpdate = true;
        }
    });

    if (needsUpdate) {
        localStorage.setItem('logistics_centers', JSON.stringify(centers));
    }
}

function initialSetup() {
    updateCentersFromRecords(); 
    populateCenterSelectors();
    populateSelectors();
    cancelEdit();
    todayDatePicker.value = getTodayString();
    updateAllDisplays();
}

document.addEventListener('DOMContentLoaded', initialSetup);