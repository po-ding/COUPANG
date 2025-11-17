/** 버전: 5.9 | 최종 수정일: 2025-11-04 (데이터 복원 시 구조 변환 기능 추가) */

// --- DOM 요소 ---
// ... (이전과 동일한 DOM 요소 선언) ...
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
const prevDayBtn = document.getElementById('prev-day-btn');
const nextDayBtn = document.getElementById('next-day-btn');

const dailyYearSelect = document.getElementById('daily-year-select');
const dailyMonthSelect = document.getElementById('daily-month-select');
const dailySummaryDiv = document.getElementById('daily-summary');
const dailyTbody = document.querySelector('#daily-summary-table tbody');

const monthlyYearSelect = document.getElementById('monthly-year-select');
const monthlyYearlySummaryDiv = document.getElementById('monthly-yearly-summary');
const monthlyTbody = document.querySelector('#monthly-summary-table tbody');

const addressDisplay = document.getElementById('address-display');
const manualDistanceInput = document.getElementById('manual-distance');

const startWaitBtn = document.getElementById('start-wait-btn');
const endWaitBtn = document.getElementById('end-wait-btn');
const waitStatus = document.getElementById('wait-status');
const waitingTimeInput = document.getElementById('waiting-time');

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
const monthlyMileageBreakdown = document.getElementById('monthly-mileage-breakdown');
const toggleBatchApplyBtn = document.getElementById('toggle-batch-apply');
const toggleSubsidyManagementBtn = document.getElementById('toggle-subsidy-management');
const toggleMileageManagementBtn = document.getElementById('toggle-mileage-management');
const toggleDataManagementBtn = document.getElementById('toggle-data-management');

let waitStartTime = null;
let waitTimerInterval = null;

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
        saveLocationData(trimmedCenter, { address: address.trim(), memo: memo.trim() });
        refreshCenterUI();
        return true;
    }
    return false;
}

// ... (이하 대부분의 함수는 이전과 동일) ...

// MODIFIED START: 데이터 복원 시 구버전 구조를 신버전으로 변환하는 로직 추가
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
            
            // --- 데이터 마이그레이션 로직 ---
            if (data.saved_locations && typeof data.saved_locations === 'object') {
                const migratedLocations = {};
                for (const centerName in data.saved_locations) {
                    const locationData = data.saved_locations[centerName];
                    let newLocationData = { address: '', memo: '' };

                    if (typeof locationData === 'object' && locationData !== null) {
                        // 객체 형식일 경우 (GPS, 주소, 메모 등이 혼재된 구버전 포함)
                        newLocationData.address = locationData.address || '';
                        newLocationData.memo = locationData.memo || '';
                    } else if (typeof locationData === 'string') {
                        // 문자열 형식일 경우 (아주 오래된 버전, 주소 또는 GPS만 있음)
                        // 이 경우 주소로 간주하고 메모는 비워둠
                        newLocationData.address = locationData;
                    }
                    migratedLocations[centerName] = newLocationData;
                }
                data.saved_locations = migratedLocations; // 변환된 데이터로 교체
            }
            // --- 마이그레이션 종료 ---

            if (data && Array.isArray(data.records)) {
                localStorage.setItem('records', JSON.stringify(data.records));
                if(Array.isArray(data.centers)) localStorage.setItem('logistics_centers', JSON.stringify(data.centers));
                if(data.saved_locations) localStorage.setItem('saved_locations', JSON.stringify(data.saved_locations));
                if(data.mileage_correction) localStorage.setItem('mileage_correction', data.mileage_correction);
                if(data.fuel_subsidy_limit) localStorage.setItem('fuel_subsidy_limit', data.fuel_subsidy_limit);

            } else if (Array.isArray(data)) { // 구버전 호환 (records만 있는 경우)
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
// MODIFIED END

// ... (이하 나머지 모든 함수는 이전 버전과 동일합니다) ...
function populateCenterSelectors(){const centers=getCenters(),options=centers.map(c=>`<option value="${c}">${c}</option>`).join("")+'<option value="direct">직접 입력</option>';fromSelect.innerHTML=options;toSelect.innerHTML=options;batchFromSelect.innerHTML=options;batchToSelect.innerHTML=options}
function toggleUI(type){const showDateField=["주유소","요소수","소모품","통행료"].includes(type);dateInfoFieldset.classList.toggle("hidden",!showDateField);transportDetails.classList.toggle("hidden",!["화물운송","공차이동","이동취소"].includes(type));fuelDetails.classList.toggle("hidden","주유소"!==type);ureaDetails.classList.toggle("hidden","요소수"!==type);supplyDetails.classList.toggle("hidden","소모품"!==type);"소모품"===type&&(supplyMileageInput.value="");costInfoFieldset.classList.remove("hidden");costWrapper.classList.remove("hidden");incomeWrapper.classList.remove("hidden");"화물운송"===type?costWrapper.classList.add("hidden"):"공차이동"===type||"이동취소"===type?costInfoFieldset.classList.add("hidden"):incomeWrapper.classList.add("hidden");costInput.readOnly=!1}
function updateAddressDisplay(){const fromValue=fromSelect.value,toValue=toSelect.value,locations=getSavedLocations(),fromData=locations[fromValue]||{},toData=locations[toValue]||{};let addressHtml="";fromData.address&&(addressHtml+=`<div class="address-clickable" data-address="${fromData.address}">${fromData.address}</div>`);fromData.memo&&(addressHtml+=`<div class="memo-display">${fromData.memo}</div>`);toData.address&&(addressHtml+=`<div class="address-clickable" data-address="${toData.address}">${toData.address}</div>`);toData.memo&&(addressHtml+=`<div class="memo-display">${toData.memo}</div>`);addressDisplay.innerHTML=addressHtml}
function copyTextToClipboard(text,successMessage){text?navigator.clipboard.writeText(text).then(()=>{showToast(successMessage||"클립보드에 복사되었습니다.")}).catch(err=>{console.error("복사 실패:",err);showToast("복사에 실패했습니다.")}):showToast("복사할 내용이 없습니다.")}
function copyAddressToClipboard(centerName){if(centerName){const locations=getSavedLocations(),locationData=locations[centerName];locationData&&locationData.address?copyTextToClipboard(locationData.address,"주소가 복사되었습니다."):showToast(`'${centerName}'에 등록된 주소가 없습니다.`)}}
function createSummaryHTML(title,records){const cancelledCount=records.filter(r=>"이동취소"===r.type).length,validRecords=records.filter(r=>"이동취소"!==r.type);let totalIncome=0,totalExpense=0,totalDistance=0,totalTripCount=0,totalWaitingTime=0,totalFuelCost=0,totalFuelLiters=0;validRecords.forEach(r=>{totalIncome+=parseInt(r.income||0);totalExpense+=parseInt(r.cost||0);"주유소"===r.type&&(totalFuelCost+=parseInt(r.cost||0),totalFuelLiters+=parseFloat(r.liters||0));["화물운송","공차이동"].includes(r.type)&&(totalDistance+=parseFloat(r.distance||0),totalTripCount++);totalWaitingTime+=parseInt(r.waitingTime||0)});const netIncome=totalIncome-totalExpense,waitHours=Math.floor(totalWaitingTime/60),waitMinutes=totalWaitingTime%60;return`
        <strong>${title}</strong><br>
        수입: <span class="income">${formatToManwon(totalIncome)} 만원</span><br>
        지출: <span class="cost">${formatToManwon(totalExpense)} 만원</span><br>
        정산: <strong>${formatToManwon(netIncome)} 만원</strong><br>
        운행거리: <strong>${totalDistance.toFixed(1)} km</strong><br>
        이동건수: <strong>${totalTripCount} 건</strong><br>
        대기시간: <strong>${waitHours}시간 ${waitMinutes}분</strong><br>
        주유금액: <span class="cost">${formatToManwon(totalFuelCost)} 만원</span><br>
        주유리터: <strong>${totalFuelLiters.toFixed(2)} L</strong>
        ${0<cancelledCount?`<br>취소건수: <span class="cancelled">${cancelledCount} 건</span>`:""}
    `}
function displayTodayRecords(){const records=JSON.parse(localStorage.getItem("records"))||[],selectedDate=todayDatePicker.value,dateObj=new Date(selectedDate+"T00:00:00"),title=dateObj.toLocaleDateString("ko-KR",{month:"long",day:"numeric",weekday:"short"}),filteredRecords=records.filter(r=>r.date===selectedDate);todayTbody.innerHTML="";const recordsForTable=filteredRecords.filter(r=>"주유소"!==r.type);recordsForTable.forEach(r=>{const tr=document.createElement("tr");let detailsCell="",moneyCell="",actionCell="";if(["화물운송","공차이동","이동취소"].includes(r.type)){const fromLocation=`<strong class="location-clickable" data-center-name="${r.from}">${r.from}</strong>`,toLocation=`<strong class="location-clickable" data-center-name="${r.to}">${r.to}</strong>`;detailsCell=`${fromLocation} → ${toLocation}`;"이동취소"!==r.type&&(detailsCell+=`<br><span class="note">${r.distance} km</span>`,0<r.waitingTime&&(detailsCell+=`<br><span class="note">⏱️ 대기: ${r.waitingTime}분</span>`));moneyCell=(