import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { Leaf, Home, PlusCircle, FlaskConical, PieChart, Lightbulb, MapPin, Calendar, Ruler, Trash2, ArrowRight, ArrowLeft, ArrowDown, ArrowUp, Activity, CheckCircle2, ChevronRight } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { AnimatePresence, motion } from 'framer-motion';

// --- DATA STORE ---
const initialGardens = [
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

// --- UTILS ---
const formatNumber = (num) => new Intl.NumberFormat('vi-VN').format(num);

// --- COMPONENTS ---
const Layout = ({ children }) => {
  const location = useLocation();
  const isIntro = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-bg font-sans text-gray-800">
      {!isIntro && (
        <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/dashboard" className="text-2xl font-black flex items-center gap-2 tracking-tight">
              <Leaf className="w-7 h-7 text-green-300" /> AGRi<span className="text-green-300">CARBON</span>
            </Link>
            <nav className="hidden md:flex gap-6 font-semibold">
              <Link to="/dashboard" className="flex items-center gap-2 hover:text-green-200 transition"><Home className="w-4 h-4" /> Bảng điều khiển</Link>
              <Link to="/create-garden" className="flex items-center gap-2 hover:text-green-200 transition"><PlusCircle className="w-4 h-4" /> Thêm vườn</Link>
            </nav>
          </div>
        </header>
      )}
      
      <main className={`flex-grow ${isIntro ? '' : 'container mx-auto p-4 md:p-8'}`}>
        {children}
      </main>

      {!isIntro && (
        <footer className="bg-white border-t border-green-200 p-6 text-center text-gray-500 text-sm">
          <p className="font-medium">&copy; 2026 AGRiCARBON. Đo đúng – Bón đúng – Giảm phát thải – Tăng giá trị.</p>
        </footer>
      )}
    </div>
  );
};

// --- INTRO SCREEN ---
const IntroScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col md:flex-row items-center justify-center bg-primary text-white overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="bg-white/20 p-6 rounded-full mb-8 backdrop-blur-sm"
        >
          <Leaf className="w-24 h-24 text-green-300" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
        >
          AGRi<span className="text-green-300">CARBON</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-3xl font-medium mb-10 max-w-3xl text-green-50 leading-relaxed"
        >
          Ứng dụng đo lường, phân tích và tối ưu hóa lượng phát thải carbon cho nông nghiệp bền vững.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-green-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
          >
            Bắt đầu trải nghiệm <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// --- DASHBOARD (HOME) ---
const DashboardScreen = ({ gardens }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-primary mb-2 tracking-tight">Bảng Điều Khiển</h2>
          <p className="text-gray-600 text-lg">Quản lý tổng quan các vườn trồng của bạn.</p>
        </div>
        <button onClick={() => navigate('/create-garden')} className="hidden md:flex bg-secondary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-primary transition-all items-center gap-2">
          <PlusCircle className="w-5 h-5" /> Thêm vườn mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gardens.map((g, index) => {
          const totalCO2 = (g.area * 3.5).toFixed(1);
          const totalCost = g.fertilizers.reduce((sum, f) => sum + (f.amount * 15000), 0);

          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              key={g.id} 
              onClick={() => navigate(`/garden/${g.id}`)}
              className="bg-white rounded-3xl shadow-xl border-t-8 border-primary hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-black text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">{g.name}</h3>
                  <span className="bg-green-100 text-green-800 text-sm font-bold px-4 py-1.5 rounded-full whitespace-nowrap">{g.crop}</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                    <span className="text-gray-500 flex items-center gap-2"><Ruler className="w-5 h-5" /> Diện tích</span>
                    <span className="font-bold text-gray-800 text-lg">{g.area} ha</span>
                  </div>
                  <div className="flex justify-between items-center bg-red-50 p-3 rounded-xl">
                    <span className="text-red-500 flex items-center gap-2"><Activity className="w-5 h-5" /> Phát thải</span>
                    <span className="font-bold text-red-600 text-lg">{totalCO2} <span className="text-sm font-medium text-red-400">tấn/năm</span></span>
                  </div>
                  <div className="flex justify-between items-center bg-blue-50 p-3 rounded-xl">
                    <span className="text-blue-500 flex items-center gap-2"><MapPin className="w-5 h-5" /> Vị trí</span>
                    <span className="font-bold text-blue-700">{g.address}</span>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 p-4 text-center rounded-b-3xl border-t border-primary/10 text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center gap-2">
                Xem chi tiết <ChevronRight className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// --- CREATE GARDEN ---
const CreateGardenScreen = ({ addGarden }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', address: '', area: '', age: '', crop: 'Cao su' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGarden({
      id: Date.now(),
      name: formData.name,
      address: formData.address,
      area: parseFloat(formData.area),
      age: parseInt(formData.age),
      crop: formData.crop,
      fertilizers: []
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold mb-6 transition"><ArrowLeft className="w-5 h-5"/> Trở về Bảng điều khiển</button>
      
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
          <h2 className="text-3xl font-black flex items-center gap-3"><PlusCircle className="w-8 h-8"/> Khởi tạo Vườn mới</h2>
          <p className="opacity-90 mt-2 text-lg">Thiết lập thông tin cơ sở để bắt đầu hành trình xanh.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Tên định danh vườn</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition font-medium text-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="VD: Vườn sầu riêng mẫu" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Khu vực / Địa chỉ</label>
              <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition font-medium text-lg" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="VD: Bình Phước" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Diện tích canh tác (ha)</label>
                <div className="relative">
                  <input required type="number" step="0.1" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition font-medium text-lg" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
                  <Ruler className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Tuổi cây trồng (năm)</label>
                <div className="relative">
                  <input required type="number" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition font-medium text-lg" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                  <Calendar className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Loại cây trồng chủ đạo</label>
              <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition font-medium text-lg appearance-none" value={formData.crop} onChange={e => setFormData({...formData, crop: e.target.value})}>
                <option value="Cao su">Cây Cao su</option>
                <option value="Điều">Cây Điều</option>
                <option value="Sầu riêng">Cây Sầu riêng</option>
                <option value="Cà phê">Cây Cà phê</option>
              </select>
            </div>
          </div>
          
          <div className="pt-8 border-t flex justify-end gap-4">
            <button type="button" onClick={() => navigate('/dashboard')} className="px-8 py-4 font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition">Hủy bỏ</button>
            <button type="submit" className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-xl hover:bg-secondary transition-all transform hover:-translate-y-1 text-lg flex items-center gap-2">Lưu dữ liệu <ChevronRight /></button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- GARDEN DETAIL WITH ANIMATED TABS ---
const GardenDetailScreen = ({ gardens, updateGarden }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const gardenId = parseInt(id);
  const garden = gardens.find(g => g.id === gardenId);
  const [activeTab, setActiveTab] = useState('fertilizer');

  if (!garden) return <div className="text-center p-20 text-2xl font-bold">Không tìm thấy dữ liệu.</div>;

  const tabs = [
    { id: 'fertilizer', label: 'Quản lý Phân bón', icon: <FlaskConical className="w-5 h-5"/> },
    { id: 'emissions', label: 'Phân tích Phát thải', icon: <PieChart className="w-5 h-5"/> },
    { id: 'solutions', label: 'Giải pháp & Mô phỏng', icon: <Lightbulb className="w-5 h-5"/> }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold mb-6 transition"><ArrowLeft className="w-5 h-5"/> Bảng điều khiển</button>
      
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-800 mb-2">{garden.name}</h2>
          <div className="flex flex-wrap gap-4 text-gray-500 font-medium">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {garden.address}</span>
            <span className="flex items-center gap-1 text-primary bg-green-50 px-3 py-1 rounded-full"><Leaf className="w-4 h-4" /> {garden.crop}</span>
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"><Ruler className="w-4 h-4" /> {garden.area} ha</span>
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"><Calendar className="w-4 h-4" /> {garden.age} năm tuổi</span>
          </div>
        </div>
      </div>

      {/* Animated Tab Menu */}
      <div className="flex overflow-x-auto hide-scrollbar mb-8 bg-gray-100 p-1.5 rounded-2xl relative shadow-inner">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm md:text-base transition-colors duration-300 z-10 ${activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-gray-200"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">{tab.icon} {tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content with Animation */}
      <div className="bg-transparent">
        <> 
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'fertilizer' && <FertilizerTab garden={garden} updateGarden={updateGarden} setActiveTab={setActiveTab} />}
            {activeTab === 'emissions' && <EmissionsTab garden={garden} setActiveTab={setActiveTab} />}
            {activeTab === 'solutions' && <SolutionsTab garden={garden} />}
          </motion.div>
        </>
      </div>
    </div>
  );
};

// --- TABS COMPONENTS ---

const FertilizerTab = ({ garden, updateGarden, setActiveTab }) => {
  const [fName, setFName] = useState('Ure');
  const [fAmount, setFAmount] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if(!fAmount) return;
    const newF = { id: Date.now(), name: fName, amount: parseFloat(fAmount) };
    updateGarden(garden.id, { ...garden, fertilizers: [...garden.fertilizers, newF] });
    setFAmount('');
  };

  const handleRemove = (fid) => {
    updateGarden(garden.id, { ...garden, fertilizers: garden.fertilizers.filter(f => f.id !== fid) });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-24">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2"><FlaskConical className="text-secondary"/> Nhập liệu</h3>
          <form onSubmit={handleAdd} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Loại phân bón</label>
              <select value={fName} onChange={e=>setFName(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-secondary/20 focus:border-secondary transition font-medium">
                <option value="Ure">Đạm Ure</option>
                <option value="NPK">NPK Tổng hợp</option>
                <option value="DAP">DAP</option>
                <option value="Kali">Kali</option>
                <option value="Phân hữu cơ">Phân hữu cơ vi sinh</option>
                <option value="Phân chuồng">Phân chuồng ủ hoai</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Lượng sử dụng (kg/ha/năm)</label>
              <input required type="number" value={fAmount} onChange={e=>setFAmount(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-secondary/20 focus:border-secondary transition font-medium text-lg" placeholder="VD: 300" />
            </div>
            <button type="submit" className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-primary transition transform hover:-translate-y-1">Thêm vào bảng</button>
          </form>
        </div>
      </div>
      
      <div className="lg:col-span-2">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Lịch sử cấp dinh dưỡng</h3>
          </div>
          
          <div className="flex-grow">
            {garden.fertilizers.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12 border-2 border-dashed border-gray-200 rounded-2xl">
                <FlaskConical className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">Chưa có dữ liệu phân bón được nhập</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <>
                  {garden.fertilizers.map((f) => (
                    <motion.div 
                      key={f.id} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex justify-between items-center group hover:border-primary/30 transition-colors"
                    >
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg mb-1">{f.name}</h4>
                        <p className="text-primary font-black text-xl">{formatNumber(f.amount)} <span className="text-sm font-medium text-gray-500">kg/ha</span></p>
                      </div>
                      <button onClick={() => handleRemove(f.id)} className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                        <Trash2 className="w-5 h-5"/>
                      </button>
                    </motion.div>
                  ))}
                </>
              </div>
            )}
          </div>
          
          {garden.fertilizers.length > 0 && (
            <div className="mt-8 pt-8 border-t flex justify-end">
              <button onClick={() => setActiveTab('emissions')} className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-secondary transition-all transform hover:-translate-y-1 flex items-center gap-2 text-lg">
                Phân tích tác động <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmissionsTab = ({ garden, setActiveTab }) => {
  let details = { 'Phân bón': 0, 'Năng lượng': 1.2, 'Tưới tiêu': 0.5, 'Khác': 0.3 };
  garden.fertilizers.forEach(f => {
      if(f.name === 'Ure') details['Phân bón'] += f.amount * 0.46 * 0.01 * (44/28) * 265 / 1000; 
      else if(f.name === 'NPK') details['Phân bón'] += f.amount * 0.16 * 0.01 * (44/28) * 265 / 1000;
      else if(f.name === 'Phân hữu cơ' || f.name === 'Phân chuồng') details['Phân bón'] += f.amount * 0.02 * 0.01 * (44/28) * 265 / 1000;
      else details['Phân bón'] += f.amount * 0.1 * 0.01 * (44/28) * 265 / 1000;
  });

  const totalCO2PerHa = details['Phân bón'] + details['Năng lượng'] + details['Tưới tiêu'] + details['Khác'];
  const totalCO2 = (totalCO2PerHa * garden.area).toFixed(2);
  
  const chartData = [
    { name: 'Phân bón', value: parseFloat((details['Phân bón'] * garden.area).toFixed(2)), color: '#ef4444' }, // red-500
    { name: 'Năng lượng', value: parseFloat((details['Năng lượng'] * garden.area).toFixed(2)), color: '#f59e0b' }, // amber-500
    { name: 'Tưới tiêu', value: parseFloat((details['Tưới tiêu'] * garden.area).toFixed(2)), color: '#3b82f6' }, // blue-500
    { name: 'Khác', value: parseFloat((details['Khác'] * garden.area).toFixed(2)), color: '#9ca3af' }, // gray-400
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-8 md:p-12">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-black text-gray-800 mb-2">Báo cáo Phát thải</h3>
          <p className="text-gray-500 text-lg">Phân tích chuyên sâu các nguồn tạo ra khí nhà kính.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mb-16">
          <div className="relative w-80 h-80 flex-shrink-0 drop-shadow-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie data={chartData} innerRadius="70%" outerRadius="100%" paddingAngle={3} dataKey="value" stroke="none">
                  {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value) => `${value} tấn`} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-6xl font-black text-gray-800 tracking-tighter">{totalCO2}</span>
              <span className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-sm">tấn CO₂e/năm</span>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg space-y-8">
            <div className="space-y-6">
              {chartData.map((item) => {
                const percent = Math.round((item.value / totalCO2) * 100) || 0;
                return (
                  <div key={item.name}>
                    <div className="flex justify-between font-bold mb-3 items-end">
                      <span className="flex items-center gap-3 text-lg text-gray-700">
                        <div className="w-4 h-4 rounded-full shadow-inner" style={{backgroundColor: item.color}}></div> {item.name}
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-black" style={{color: item.color}}>{percent}%</span>
                        <span className="text-sm text-gray-400 ml-2">({item.value} t)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 shadow-inner overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full" 
                        style={{backgroundColor: item.color}}
                      ></motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50/80 border border-yellow-200 rounded-3xl p-10 text-center max-w-4xl mx-auto backdrop-blur-sm">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-yellow-500">
            <Lightbulb className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-yellow-800 mb-4">Phân bón là yếu tố then chốt!</h4>
          <p className="text-yellow-700 mb-8 text-lg leading-relaxed">Dữ liệu cho thấy phân bón chiếm tỷ trọng phát thải cao nhất. Việc tối ưu hóa lượng phân không chỉ giúp giảm lượng khí nhà kính mà còn tiết kiệm chi phí đầu vào đáng kể.</p>
          <button onClick={() => setActiveTab('solutions')} className="bg-yellow-500 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:bg-yellow-600 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mx-auto">
            Khám phá Giải pháp Tối ưu <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

const SolutionsTab = ({ garden }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl shadow-lg p-8 border-t-8 border-red-500 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="bg-red-100 text-red-800 text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider">Ưu tiên Cao</span>
            <div className="p-3 bg-red-50 rounded-2xl text-red-500"><Activity className="w-7 h-7" /></div>
          </div>
          <h3 className="font-black text-2xl mb-4 text-gray-800">Tối ưu lượng phân đạm</h3>
          <p className="text-gray-600 leading-relaxed text-lg">Giảm 15% lượng đạm Ure so với hiện tại. Các nghiên cứu cho thấy lượng dư thừa gây lãng phí và tăng phát thải N₂O mà không tăng năng suất.</p>
        </motion.div>
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-lg p-8 border-t-8 border-amber-500 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="bg-amber-100 text-amber-800 text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider">Trung bình</span>
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-500"><Calendar className="w-7 h-7" /></div>
          </div>
          <h3 className="font-black text-2xl mb-4 text-gray-800">Chia nhỏ số lần bón</h3>
          <p className="text-gray-600 leading-relaxed text-lg">Thay vì bón tập trung, hãy chia thành 4-5 lần/năm. Điều này giúp cây trồng hấp thụ dinh dưỡng triệt để theo từng giai đoạn.</p>
        </motion.div>
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl shadow-lg p-8 border-t-8 border-primary relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="bg-green-100 text-green-800 text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider">Dài hạn</span>
            <div className="p-3 bg-green-50 rounded-2xl text-primary"><Leaf className="w-7 h-7" /></div>
          </div>
          <h3 className="font-black text-2xl mb-4 text-gray-800">Chuyển đổi Hữu cơ</h3>
          <p className="text-gray-600 leading-relaxed text-lg">Từng bước thay thế 20-30% phân hóa học bằng phân hữu cơ vi sinh, giúp cải tạo đất, giữ ẩm và lưu trữ carbon tự nhiên.</p>
        </motion.div>
      </div>
      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-primary to-secondary p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-3xl font-black flex items-center gap-3">
              <Activity className="w-8 h-8" /> Mô phỏng Kịch bản (WHAT-IF)
            </h3>
            <p className="mt-3 text-green-100 text-lg font-medium">Bảng so sánh hiệu quả khi áp dụng gói giải pháp tối ưu.</p>
          </div>
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30 text-center">
            <span className="block text-sm font-bold uppercase tracking-wider mb-1">Mức độ khả thi</span>
            <span className="text-2xl font-black text-green-200">Rất cao</span>
          </div>
        </div>
        
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="py-6 px-10 text-lg font-bold text-gray-500 uppercase tracking-wider">Chỉ số đánh giá</th>
                <th className="py-6 px-10 text-center text-lg font-bold text-gray-500 uppercase tracking-wider">Thực tế hiện tại</th>
                <th className="py-6 px-10 text-center text-lg font-black text-primary bg-green-50/50 uppercase tracking-wider">Kịch bản đề xuất</th>
                <th className="py-6 px-10 text-center text-lg font-bold text-gray-500 uppercase tracking-wider">Hiệu quả mang lại</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition">
                <td className="py-8 px-10 font-bold text-gray-800 text-xl">Tổng lượng phân bón</td>
                <td className="py-8 px-10 text-center font-bold text-2xl text-gray-500">100%</td>
                <td className="py-8 px-10 text-center font-black text-3xl text-primary bg-green-50/50">85%</td>
                <td className="py-8 px-10 text-center font-black text-xl text-green-600 flex items-center justify-center gap-2 bg-green-50/30 rounded-xl m-2"><ArrowDown className="w-6 h-6"/> Giảm 15%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="py-8 px-10 font-bold text-gray-800 text-xl">Chi phí vật tư</td>
                <td className="py-8 px-10 text-center font-bold text-2xl text-gray-500">100%</td>
                <td className="py-8 px-10 text-center font-black text-3xl text-primary bg-green-50/50">90%</td>
                <td className="py-8 px-10 text-center font-black text-xl text-green-600 flex items-center justify-center gap-2 bg-green-50/30 rounded-xl m-2"><ArrowDown className="w-6 h-6"/> Tiết kiệm 10%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="py-8 px-10 font-bold text-gray-800 text-xl">Lượng CO₂e phát thải</td>
                <td className="py-8 px-10 text-center font-bold text-2xl text-gray-500">100%</td>
                <td className="py-8 px-10 text-center font-black text-3xl text-primary bg-green-50/50">82%</td>
                <td className="py-8 px-10 text-center font-black text-xl text-green-600 flex items-center justify-center gap-2 bg-green-50/30 rounded-xl m-2"><ArrowDown className="w-6 h-6"/> Giảm 18%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 p-10 text-center border-t">
          <button className="bg-primary text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-secondary transition-all transform hover:-translate-y-2 text-xl flex items-center justify-center gap-3 mx-auto focus:ring-4 focus:ring-primary/50" onClick={() => alert('Kịch bản đã được lưu thành công! Hệ thống đã cập nhật nhắc nhở lịch chăm sóc theo phương án mới.')}>
            <CheckCircle2 className="w-8 h-8" /> Xác nhận Áp dụng Kịch bản
          </button>
          <p className="mt-4 text-gray-500 font-medium">Bằng cách xác nhận, bạn sẽ chuyển sang chế độ canh tác giảm phát thải.</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [gardens, setGardens] = useState(initialGardens);

  const addGarden = (g) => setGardens([...gardens, g]);
  const updateGarden = (id, newGarden) => setGardens(gardens.map(g => g.id === id ? newGarden : g));

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<IntroScreen />} />
          <Route path="/dashboard" element={<DashboardScreen gardens={gardens} />} />
          <Route path="/create-garden" element={<CreateGardenScreen addGarden={addGarden} />} />
          <Route path="/garden/:id" element={<GardenDetailScreen gardens={gardens} updateGarden={updateGarden} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
