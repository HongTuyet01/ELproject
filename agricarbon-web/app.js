// Dữ liệu giả lập
let gardens = [
    {
        id: 1,
        name: 'Vườn Sầu Riêng Chú Ba',
        address: 'Bình Phước',
        area: 2,
        crop: 'Sầu riêng',
        age: 7,
        fertilizers: [
            { id: 1, name: 'Ure', amount: 300 },
            { id: 2, name: 'NPK', amount: 500 },
            { id: 3, name: 'Phân hữu cơ', amount: 2000 }
        ]
    }
];
let currentGardenId = 1;

// Điều hướng
function navigate(screen, data = null) {
    const container = document.getElementById('app-container');
    container.innerHTML = ''; 
    container.className = 'flex-grow container mx-auto p-4 md:p-6 fade-in';
    
    switch(screen) {
        case 'home':
            container.innerHTML = renderHome();
            break;
        case 'create-garden':
            container.innerHTML = renderCreateGarden();
            break;
        case 'manage-fertilizer':
            if (data) currentGardenId = data;
            container.innerHTML = renderManageFertilizer(currentGardenId);
            break;
        case 'emission-results':
            if (data) currentGardenId = data;
            container.innerHTML = renderEmissionResults(currentGardenId);
            break;
        case 'solutions':
            if (data) currentGardenId = data;
            container.innerHTML = renderSolutions(currentGardenId);
            break;
        default:
            container.innerHTML = renderHome();
    }
}

// Format số
const formatNumber = (num) => new Intl.NumberFormat('vi-VN').format(num);

// --- CÁC MÀN HÌNH ---

// 1. Màn hình Trang chủ
function renderHome() {
    let html = `
        <div class="mb-6">
            <h2 class="text-3xl font-bold text-primary mb-2">Vườn của tôi</h2>
            <p class="text-gray-600">Quản lý và theo dõi phát thải carbon cho các vườn trồng của bạn.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    `;

    gardens.forEach(g => {
        // Tính toán ảo
        let totalCO2 = g.area * 3.5; // Giả lập 3.5 tấn/ha
        let totalCost = g.fertilizers.reduce((sum, f) => sum + (f.amount * 15000), 0); // Giả lập giá

        html += `
            <div class="bg-white rounded-xl shadow-md p-6 border-t-4 border-primary hover:shadow-lg transition">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-gray-800">${g.name}</h3>
                    <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">${g.crop}</span>
                </div>
                <div class="space-y-2 mb-6">
                    <p class="text-sm text-gray-600"><i class="fa-solid fa-ruler-combined w-5"></i> Diện tích: <b>${g.area} ha</b></p>
                    <p class="text-sm text-gray-600"><i class="fa-solid fa-cloud w-5"></i> Phát thải: <b class="text-red-500">${totalCO2} tấn CO₂e/năm</b></p>
                    <p class="text-sm text-gray-600"><i class="fa-solid fa-money-bill-wave w-5"></i> Chi phí phân bón: <b>${formatNumber(totalCost)} đ</b></p>
                    <p class="text-sm text-gray-600"><i class="fa-solid fa-arrow-trend-down w-5"></i> Mức giảm tiềm năng: <b class="text-primary">18%</b></p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button onclick="navigate('manage-fertilizer', ${g.id})" class="bg-primary text-white px-3 py-2 rounded text-sm hover:bg-green-700 w-full sm:w-auto"><i class="fa-solid fa-flask"></i> Phân bón</button>
                    <button onclick="navigate('emission-results', ${g.id})" class="bg-white text-primary border border-primary px-3 py-2 rounded text-sm hover:bg-green-50 w-full sm:w-auto"><i class="fa-solid fa-chart-pie"></i> Kết quả</button>
                    <button onclick="navigate('solutions', ${g.id})" class="bg-yellow-500 text-white px-3 py-2 rounded text-sm hover:bg-yellow-600 w-full"><i class="fa-solid fa-lightbulb"></i> Giải pháp</button>
                </div>
            </div>
        `;
    });

    html += `
            <div onclick="navigate('create-garden')" class="bg-green-50 border-2 border-dashed border-primary rounded-xl p-6 flex flex-col justify-center items-center cursor-pointer hover:bg-green-100 transition min-h-[250px]">
                <i class="fa-solid fa-plus-circle text-4xl text-primary mb-2"></i>
                <h3 class="text-lg font-bold text-primary">Thêm vườn mới</h3>
            </div>
        </div>
    `;
    return html;
}

// 2. Màn hình Tạo vườn
function renderCreateGarden() {
    return `
        <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 lg:p-8 border-t-4 border-primary">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2"><i class="fa-solid fa-seedling text-primary mr-2"></i>Tạo vườn mới</h2>
            <form onsubmit="handleCreateGarden(event)" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tên vườn</label>
                    <input type="text" id="g-name" required class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                    <input type="text" id="g-address" required class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Diện tích (ha)</label>
                        <input type="number" id="g-area" step="0.1" required class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tuổi cây (năm)</label>
                        <input type="number" id="g-age" required class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Loại cây</label>
                    <select id="g-crop" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                        <option value="Cao su">Cao su</option>
                        <option value="Điều">Điều</option>
                        <option value="Sầu riêng">Sầu riêng</option>
                    </select>
                </div>
                <div class="mt-8 flex justify-end space-x-3">
                    <button type="button" onclick="navigate('home')" class="px-5 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Hủy</button>
                    <button type="submit" class="px-5 py-2 bg-primary text-white rounded hover:bg-green-700 shadow-md">Lưu vườn</button>
                </div>
            </form>
        </div>
    `;
}

function handleCreateGarden(e) {
    e.preventDefault();
    const newGarden = {
        id: Date.now(),
        name: document.getElementById('g-name').value,
        address: document.getElementById('g-address').value,
        area: parseFloat(document.getElementById('g-area').value),
        crop: document.getElementById('g-crop').value,
        age: parseInt(document.getElementById('g-age').value),
        fertilizers: []
    };
    gardens.push(newGarden);
    alert('Thêm vườn thành công!');
    navigate('home');
}

// 3. Quản lý phân bón
function renderManageFertilizer(gardenId) {
    const g = gardens.find(x => x.id === gardenId);
    let fList = '';
    g.fertilizers.forEach((f, idx) => {
        fList += `
            <tr class="border-b hover:bg-gray-50">
                <td class="py-3 px-4">${f.name}</td>
                <td class="py-3 px-4 font-medium">${formatNumber(f.amount)} kg/ha/năm</td>
                <td class="py-3 px-4 text-right">
                    <button onclick="removeFertilizer(${gardenId}, ${idx})" class="text-red-500 hover:text-red-700"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    return `
        <div class="mb-4">
            <button onclick="navigate('home')" class="text-primary hover:underline"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1">
                <div class="bg-white rounded-xl shadow-md p-6 border-t-4 border-primary sticky top-24">
                    <h3 class="text-xl font-bold mb-4">Thêm phân bón</h3>
                    <form onsubmit="handleAddFertilizer(event, ${gardenId})" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Loại phân</label>
                            <select id="f-name" class="w-full px-3 py-2 border rounded focus:ring-primary focus:border-primary">
                                <option value="Ure">Ure</option>
                                <option value="NPK">NPK</option>
                                <option value="DAP">DAP</option>
                                <option value="Kali">Kali</option>
                                <option value="Phân hữu cơ">Phân hữu cơ</option>
                                <option value="Phân sinh học">Phân sinh học</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Lượng dùng (kg/ha/năm)</label>
                            <input type="number" id="f-amount" required class="w-full px-3 py-2 border rounded focus:ring-primary focus:border-primary">
                        </div>
                        <button type="submit" class="w-full bg-primary text-white py-2 rounded hover:bg-green-700">Thêm</button>
                    </form>
                </div>
            </div>
            
            <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold">Danh sách phân bón đang dùng</h2>
                        <span class="text-gray-500 font-medium">${g.name}</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-green-50 text-green-800">
                                    <th class="py-3 px-4 rounded-tl">Tên phân bón</th>
                                    <th class="py-3 px-4">Lượng sử dụng</th>
                                    <th class="py-3 px-4 rounded-tr text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${fList || '<tr><td colspan="3" class="py-4 text-center text-gray-500">Chưa có dữ liệu phân bón</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="mt-8 flex justify-end space-x-3">
                        <button onclick="navigate('emission-results', ${gardenId})" class="bg-secondary text-white px-6 py-2 rounded font-medium hover:bg-green-500 shadow">Tính phát thải <i class="fa-solid fa-arrow-right ml-1"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleAddFertilizer(e, gardenId) {
    e.preventDefault();
    const g = gardens.find(x => x.id === gardenId);
    g.fertilizers.push({
        id: Date.now(),
        name: document.getElementById('f-name').value,
        amount: parseFloat(document.getElementById('f-amount').value)
    });
    navigate('manage-fertilizer', gardenId);
}

function removeFertilizer(gardenId, index) {
    const g = gardens.find(x => x.id === gardenId);
    g.fertilizers.splice(index, 1);
    navigate('manage-fertilizer', gardenId);
}

// 4. Kết quả phát thải
function renderEmissionResults(gardenId) {
    const g = gardens.find(x => x.id === gardenId);
    
    // Thuật toán giả lập (dựa theo doc: N = amount * %N, N2O = N * EF ...)
    let totalCO2 = 0;
    let details = { 'Phân bón': 0, 'Năng lượng': 1.2, 'Tưới tiêu': 0.5, 'Khác': 0.3 };
    
    g.fertilizers.forEach(f => {
        if(f.name === 'Ure') details['Phân bón'] += f.amount * 0.46 * 0.01 * (44/28) * 265 / 1000; 
        else if(f.name === 'NPK') details['Phân bón'] += f.amount * 0.16 * 0.01 * (44/28) * 265 / 1000;
        else if(f.name === 'Phân hữu cơ') details['Phân bón'] += f.amount * 0.02 * 0.01 * (44/28) * 265 / 1000;
        else details['Phân bón'] += f.amount * 0.1 * 0.01 * (44/28) * 265 / 1000;
    });

    totalCO2 = details['Phân bón'] + details['Năng lượng'] + details['Tưới tiêu'] + details['Khác'];
    totalCO2 = (totalCO2 * g.area).toFixed(2);
    
    let p_phanbon = Math.round((details['Phân bón'] * g.area / totalCO2) * 100) || 0;
    let p_nangluong = Math.round((details['Năng lượng'] * g.area / totalCO2) * 100) || 0;
    let p_tuoi = Math.round((details['Tưới tiêu'] * g.area / totalCO2) * 100) || 0;
    let p_khac = 100 - p_phanbon - p_nangluong - p_tuoi;

    return `
        <div class="mb-4">
            <button onclick="navigate('manage-fertilizer', ${gardenId})" class="text-primary hover:underline"><i class="fa-solid fa-arrow-left"></i> Chỉnh sửa phân bón</button>
        </div>
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div class="bg-primary text-white p-6 text-center">
                <h2 class="text-3xl font-bold mb-2">Kết Quả Phát Thải</h2>
                <p class="opacity-90">${g.name}</p>
            </div>
            
            <div class="p-8">
                <div class="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
                    <div class="w-64 h-64 rounded-full border-8 border-green-100 flex flex-col items-center justify-center relative shadow-inner">
                        <div class="absolute w-full h-full rounded-full border-8 border-primary border-t-transparent animate-spin" style="animation-duration: 3s; border-radius: 50%;"></div>
                        <span class="text-4xl font-bold text-gray-800 relative z-10">${totalCO2}</span>
                        <span class="text-gray-500 font-medium relative z-10">tấn CO₂e/năm</span>
                    </div>
                    
                    <div class="flex-1 space-y-4 w-full">
                        <h3 class="text-xl font-bold text-gray-800 border-b pb-2">Phân bổ nguồn phát thải</h3>
                        
                        <div class="space-y-3">
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="font-medium text-red-600"><i class="fa-solid fa-flask mr-1"></i> Phân bón</span>
                                    <span>${p_phanbon}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-red-500 h-2.5 rounded-full" style="width: ${p_phanbon}%"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="font-medium text-orange-500"><i class="fa-solid fa-bolt mr-1"></i> Năng lượng</span>
                                    <span>${p_nangluong}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-orange-400 h-2.5 rounded-full" style="width: ${p_nangluong}%"></div>
                                </div>
                            </div>

                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="font-medium text-blue-500"><i class="fa-solid fa-droplet mr-1"></i> Tưới tiêu</span>
                                    <span>${p_tuoi}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-blue-400 h-2.5 rounded-full" style="width: ${p_tuoi}%"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="font-medium text-gray-500"><i class="fa-solid fa-ellipsis mr-1"></i> Khác</span>
                                    <span>${p_khac}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-gray-400 h-2.5 rounded-full" style="width: ${p_khac}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-8">
                    <p class="text-gray-600 mb-4">Lượng phát thải từ phân bón đang chiếm tỷ trọng lớn. Hãy xem các giải pháp để tối ưu.</p>
                    <button onclick="navigate('solutions', ${gardenId})" class="bg-yellow-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-yellow-600 shadow-lg transform hover:scale-105 transition">
                        <i class="fa-solid fa-lightbulb mr-2"></i> Xem giải pháp cho vườn của tôi
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 5. Giải pháp (WHAT-IF)
function renderSolutions(gardenId) {
    const g = gardens.find(x => x.id === gardenId);
    
    return `
        <div class="mb-4">
            <button onclick="navigate('emission-results', ${gardenId})" class="text-primary hover:underline"><i class="fa-solid fa-arrow-left"></i> Quay lại Kết quả</button>
        </div>
        
        <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-800">Giải pháp cho vườn của tôi</h2>
            <p class="text-gray-600 mt-2">AgriCarbon không chỉ đo lường, mà giúp bạn tối ưu.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <!-- Khuyến nghị 1 -->
            <div class="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
                <div class="flex justify-between items-center mb-3">
                    <span class="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">Ưu tiên Cao</span>
                    <i class="fa-solid fa-flask text-red-500 text-xl"></i>
                </div>
                <h3 class="font-bold text-lg mb-2">Tối ưu lượng phân đạm</h3>
                <p class="text-gray-600 text-sm">Lượng Ure sử dụng đang cao hơn 15% so với nhu cầu thực tế của cây sầu riêng 7 năm tuổi. Đề xuất giảm 15%.</p>
            </div>
            
            <!-- Khuyến nghị 2 -->
            <div class="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500">
                <div class="flex justify-between items-center mb-3">
                    <span class="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Ưu tiên Trung bình</span>
                    <i class="fa-solid fa-calendar-days text-yellow-500 text-xl"></i>
                </div>
                <h3 class="font-bold text-lg mb-2">Chia nhỏ số lần bón</h3>
                <p class="text-gray-600 text-sm">Tăng số lần bón từ 3 lên 4 lần/năm giúp cây hấp thụ tốt hơn, giảm thất thoát Nitơ qua bay hơi và rửa trôi.</p>
            </div>
            
            <!-- Khuyến nghị 3 -->
            <div class="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
                <div class="flex justify-between items-center mb-3">
                    <span class="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Dài hạn</span>
                    <i class="fa-solid fa-leaf text-green-500 text-xl"></i>
                </div>
                <h3 class="font-bold text-lg mb-2">Bổ sung phân hữu cơ vi sinh</h3>
                <p class="text-gray-600 text-sm">Kết hợp 20% phân sinh học sẽ giúp cải tạo đất, giữ ẩm và giảm phát thải N₂O đáng kể trong dài hạn.</p>
            </div>
        </div>
        
        <!-- Tính năng WHAT-IF -->
        <div class="bg-green-50 rounded-xl shadow-inner border border-green-200 p-6 md:p-10">
            <h3 class="text-2xl font-bold text-primary mb-6 flex items-center">
                <i class="fa-solid fa-code-compare mr-3"></i> Mô phỏng Kịch bản (WHAT-IF)
            </h3>
            
            <div class="overflow-x-auto">
                <table class="w-full bg-white rounded-lg overflow-hidden shadow">
                    <thead class="bg-primary text-white">
                        <tr>
                            <th class="py-4 px-6 text-left">Chỉ số</th>
                            <th class="py-4 px-6 text-center">Hiện tại</th>
                            <th class="py-4 px-6 text-center bg-green-700">Phương án đề xuất</th>
                            <th class="py-4 px-6 text-center">Hiệu quả</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 text-gray-800">
                        <tr>
                            <td class="py-4 px-6 font-medium">Lượng phân bón</td>
                            <td class="py-4 px-6 text-center font-bold">100%</td>
                            <td class="py-4 px-6 text-center font-bold text-green-600">85%</td>
                            <td class="py-4 px-6 text-center text-green-600"><i class="fa-solid fa-arrow-down mr-1"></i> Giảm 15%</td>
                        </tr>
                        <tr class="bg-gray-50">
                            <td class="py-4 px-6 font-medium">Chi phí ước tính</td>
                            <td class="py-4 px-6 text-center font-bold">100%</td>
                            <td class="py-4 px-6 text-center font-bold text-green-600">90%</td>
                            <td class="py-4 px-6 text-center text-green-600"><i class="fa-solid fa-arrow-down mr-1"></i> Tiết kiệm 10%</td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-medium">Lượng phát thải</td>
                            <td class="py-4 px-6 text-center font-bold">100%</td>
                            <td class="py-4 px-6 text-center font-bold text-green-600">82%</td>
                            <td class="py-4 px-6 text-center text-green-600"><i class="fa-solid fa-arrow-down mr-1"></i> Giảm 18%</td>
                        </tr>
                        <tr class="bg-gray-50">
                            <td class="py-4 px-6 font-medium">Số lần bón</td>
                            <td class="py-4 px-6 text-center font-bold">3 lần</td>
                            <td class="py-4 px-6 text-center font-bold text-blue-600">4 lần</td>
                            <td class="py-4 px-6 text-center text-blue-600"><i class="fa-solid fa-arrow-up mr-1"></i> Tối ưu hấp thụ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="mt-8 text-center">
                <button class="bg-primary text-white px-8 py-3 rounded font-bold shadow hover:bg-green-700 transition" onclick="alert('Đã áp dụng kịch bản mới. Hệ thống sẽ theo dõi và nhắc nhở lịch bón phân.')">
                    <i class="fa-solid fa-check mr-2"></i> Áp dụng kịch bản này
                </button>
            </div>
        </div>
    `;
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    navigate('home');
});
