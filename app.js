// --- Smart Merchant & VPA Auto-Categorization Dictionary ---
    const CATEGORY_META = {
      'Food & Dining': { icon: '🍔', badgeClass: 'bg-orange-100 text-orange-800', color: '#f97316' },
      'Groceries': { icon: '🛒', badgeClass: 'bg-emerald-100 text-emerald-800', color: '#10b981' },
      'Travel & Commute': { icon: '🚕', badgeClass: 'bg-cyan-100 text-cyan-800', color: '#06b6d4' },
      'Bills & Utilities': { icon: '⚡', badgeClass: 'bg-blue-100 text-blue-800', color: '#3b82f6' },
      'Shopping': { icon: '🛍️', badgeClass: 'bg-purple-100 text-purple-800', color: '#8b5cf6' },
      'Health & Pharmacy': { icon: '💊', badgeClass: 'bg-teal-100 text-teal-800', color: '#14b8a6' },
      'Entertainment': { icon: '🎬', badgeClass: 'bg-pink-100 text-pink-800', color: '#ec4899' },
      'Transfers & Friends': { icon: '🤝', badgeClass: 'bg-indigo-100 text-indigo-800', color: '#6366f1' },
      'Others': { icon: '📦', badgeClass: 'bg-slate-200 text-slate-800', color: '#64748b' }
    };

    const KEYWORD_RULES = [
      { keywords: ['swiggy', 'zomato', 'domino', 'starbucks', 'third wave', 'chai', 'cafe', 'restaurant', 'barbeque', 'kfc', 'mcdonald', 'pizza', 'biryani', 'eatfit', 'bakery', 'haldiram'], category: 'Food & Dining' },
      { keywords: ['zepto', 'blinkit', 'instamart', 'bigbasket', 'dmart', 'reliance fresh', 'more supermarket', 'ratnadeep', 'milk', 'kirana', 'grocery', 'veggies'], category: 'Groceries' },
      { keywords: ['uber', 'ola', 'rapido', 'irctc', 'metro', 'namma yatri', 'indianoil', 'iocl', 'hpcl', 'bpcl', 'petrol', 'fuel', 'shell', 'fastag', 'redbus', 'makemytrip'], category: 'Travel & Commute' },
      { keywords: ['jio', 'airtel', 'vi ', 'vodafone', 'bsnl', 'bescom', 'electricity', 'power', 'tata play', 'act fibernet', 'broadband', 'gas', 'indane', 'water bill', 'recharge'], category: 'Bills & Utilities' },
      { keywords: ['amazon', 'flipkart', 'myntra', 'ajio', 'meesho', 'nykaa', 'decathlon', 'croma', 'zudio', 'lifestyle', 'trends', 'uniqlo'], category: 'Shopping' },
      { keywords: ['apollo', 'medplus', 'pharmeasy', '1mg', 'netmeds', 'hospital', 'clinic', 'diagnostic', 'dental', 'cultfit', 'gym', 'pharmacy'], category: 'Health & Pharmacy' },
      { keywords: ['bookmyshow', 'pvr', 'inox', 'netflix', 'spotify', 'prime video', 'hotstar', 'youtube', 'sony liv', 'steam'], category: 'Entertainment' }
    ];

    let customMerchantRules = [
      { keyword: 'chai point', category: 'Food & Dining' },
      { keyword: 'cultfit', category: 'Health & Pharmacy' }
    ];

    const DEFAULT_BUDGETS = {
      'Food & Dining': 5000,
      'Groceries': 4500,
      'Travel & Commute': 3000,
      'Bills & Utilities': 3500,
      'Shopping': 4000,
      'Health & Pharmacy': 2000,
      'Entertainment': 1500,
      'Transfers & Friends': 3000,
      'Others': 2000
    };

    let categoryBudgets = { ...DEFAULT_BUDGETS };

    let transactions = [
      {
        id: 'TXN-101',
        merchant: 'Swiggy Food Delivery',
        vpa: 'swiggy@ybl',
        amount: 485,
        txnType: 'DEBIT',
        category: 'Food & Dining',
        sourceApp: 'PhonePe',
        refId: '629384719201',
        isoDate: '2026-10-20',
        timestamp: '20 Oct 2026, 08:45 AM',
        note: 'Breakfast & coffee',
        autoCaptured: true
      },
      {
        id: 'TXN-102',
        merchant: 'Zepto Instant Grocery',
        vpa: 'zepto@icici',
        amount: 740,
        txnType: 'DEBIT',
        category: 'Groceries',
        sourceApp: 'Paytm',
        refId: '629399401122',
        isoDate: '2026-10-19',
        timestamp: '19 Oct 2026, 07:30 PM',
        note: 'Milk, fruits & staples',
        autoCaptured: true
      },
      {
        id: 'TXN-103',
        merchant: 'Uber India Systems',
        vpa: 'uber@axis',
        amount: 320,
        txnType: 'DEBIT',
        category: 'Travel & Commute',
        sourceApp: 'PhonePe',
        refId: '629311882341',
        isoDate: '2026-10-19',
        timestamp: '19 Oct 2026, 09:15 AM',
        note: 'Office commute cab',
        autoCaptured: true
      },
      {
        id: 'TXN-CR-101',
        merchant: 'TechCorp Salary Credit',
        vpa: 'salary@hdfcbank',
        amount: 52000,
        txnType: 'CREDIT',
        category: 'Others',
        sourceApp: 'Net Banking',
        refId: '629300182741',
        isoDate: '2026-10-18',
        timestamp: '18 Oct 2026, 10:00 AM',
        note: 'Monthly salary credited for Oct 2026',
        autoCaptured: true
      },
      {
        id: 'TXN-104',
        merchant: 'Reliance Jio Infocomm',
        vpa: 'jiofiber@paytm',
        amount: 999,
        txnType: 'DEBIT',
        category: 'Bills & Utilities',
        sourceApp: 'Paytm',
        refId: '629377123908',
        isoDate: '2026-10-18',
        timestamp: '18 Oct 2026, 04:10 PM',
        note: 'Monthly Fiber Broadband',
        autoCaptured: true
      },
      {
        id: 'TXN-CR-102',
        merchant: 'Amazon UPI Refund',
        vpa: 'amazon@icici',
        amount: 649,
        txnType: 'CREDIT',
        category: 'Shopping',
        sourceApp: 'GPay',
        refId: '629388172635',
        isoDate: '2026-10-17',
        timestamp: '17 Oct 2026, 03:30 PM',
        note: 'Order refund returned to bank account',
        autoCaptured: true
      },
      {
        id: 'TXN-105',
        merchant: 'Apollo Pharmacy',
        vpa: 'apollo@hdfcbank',
        amount: 650,
        txnType: 'DEBIT',
        category: 'Health & Pharmacy',
        sourceApp: 'Credit Card',
        refId: '629355019283',
        isoDate: '2026-10-17',
        timestamp: '17 Oct 2026, 06:20 PM',
        note: 'Vitamins & first aid',
        autoCaptured: true
      },
      {
        id: 'TXN-106',
        merchant: 'Myntra Designs',
        vpa: 'myntra@ybl',
        amount: 1499,
        txnType: 'DEBIT',
        category: 'Shopping',
        sourceApp: 'PhonePe',
        refId: '629344098112',
        isoDate: '2026-10-16',
        timestamp: '16 Oct 2026, 02:05 PM',
        note: 'Festive kurta order',
        autoCaptured: true
      },
      {
        id: 'TXN-CR-103',
        merchant: 'Rahul Sharma (Split Share)',
        vpa: 'rahul@ybl',
        amount: 1200,
        txnType: 'CREDIT',
        category: 'Transfers & Friends',
        sourceApp: 'PhonePe',
        refId: '629355281944',
        isoDate: '2026-10-15',
        timestamp: '15 Oct 2026, 09:40 PM',
        note: 'Dinner bill repayment received via UPI',
        autoCaptured: true
      },
      {
        id: 'TXN-107',
        merchant: 'Local Stationery & Print',
        vpa: 'print@upi',
        amount: 280,
        txnType: 'DEBIT',
        category: 'Others',
        sourceApp: 'Debit Card',
        refId: '629366112233',
        isoDate: '2026-10-12',
        timestamp: '12 Oct 2026, 11:15 AM',
        note: 'Printing documents & xerox (Others)',
        autoCaptured: true
      }
    ];

    const SAMPLE_SMS_LIST = [
      "Rs. 485.00 debited from a/c **9104 on 20-10-26 to VPA swiggy@ybl (UPI Ref No 629384719201). Not you? Call 18002586161 - HDFC Bank",
      "Dear UPI user A/C X4821 debited by Rs 320.00 on date 20Oct26 trf to UBER INDIA via Paytm VPA uber@paytm Refno 629311882341 - SBI",
      "Acct XX9104 debited for Rs 740.00 on 20-Oct-26; ZEPTO MARKETPLACE (zepto@icici) credited. UPI:629399401122 - ICICI Bank",
      "PhonePe Alert: You have paid ₹999.00 to Reliance Jio Infocomm (jio@ybl) from HDFC Bank. UPI Ref: 629377123908.",
      "INR 650.00 debited from A/c no. XX9104 on 20-10-2026 at APOLLO PHARMACY via VPA apollo@axis. UPI Ref: 629355019283 - Axis Bank"
    ];

    let currentPinDigits = '';
    let pendingPinContext = null; // 'payment' | 'balance'
    let pendingPaymentDraft = null;
    let categoryChartInstance = null;
    let appSourceChartInstance = null;

    // --- Persistence helpers (Safe localStorage) ---
    function loadSavedState() {
      try {
        const savedTx = localStorage.getItem('paypulse_transactions_v1');
        if (savedTx) {
          const parsed = JSON.parse(savedTx);
          if (Array.isArray(parsed) && parsed.length > 0) transactions = parsed;
        }
        const savedBudgets = localStorage.getItem('paypulse_budgets_v1');
        if (savedBudgets) {
          categoryBudgets = { ...DEFAULT_BUDGETS, ...JSON.parse(savedBudgets) };
        }
        const savedRules = localStorage.getItem('paypulse_rules_v1');
        if (savedRules) {
          customMerchantRules = JSON.parse(savedRules);
        }
      } catch (e) {
        // Ignore storage errors in sandboxed iframes
      }
    }

    function saveState() {
      try {
        localStorage.setItem('paypulse_transactions_v1', JSON.stringify(transactions));
        localStorage.setItem('paypulse_budgets_v1', JSON.stringify(categoryBudgets));
        localStorage.setItem('paypulse_rules_v1', JSON.stringify(customMerchantRules));
      } catch (e) {
        // Ignore storage errors in sandboxed iframes
      }
    }

    // --- Transaction Types & Date Filter State ---
    let currentPaymentMode = 'DEBIT'; // 'DEBIT' | 'CREDIT'
    let activeDateFilter = {
      preset: 'ALL',
      month: 'ALL',
      year: 'ALL',
      fromDate: '',
      toDate: ''
    };

    function setPaymentTypeMode(mode) {
      currentPaymentMode = mode;
      const btnDebit = document.getElementById('payTypeBtnDebit');
      const btnCredit = document.getElementById('payTypeBtnCredit');
      const label = document.getElementById('payMerchantLabel');
      const input = document.getElementById('payMerchantInput');
      const submitBtn = document.getElementById('btnSubmitPay');

      if (mode === 'CREDIT') {
        btnCredit.className = 'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all bg-white text-emerald-700 shadow-sm flex items-center justify-center gap-1.5';
        btnDebit.className = 'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5';
        if (label) label.textContent = 'Payer / Sender / Source Name (Credit +)';
        if (input) input.placeholder = 'e.g., TechCorp Salary, Client Payment, Rahul UPI, Amazon Refund';
        if (submitBtn) {
          submitBtn.className = 'w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition';
          submitBtn.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            <span>Record Received Credit (+₹)</span>
          `;
        }
      } else {
        btnDebit.className = 'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all bg-white text-rose-700 shadow-sm flex items-center justify-center gap-1.5';
        btnCredit.className = 'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5';
        if (label) label.textContent = 'Merchant / Payee Name (Debit -)';
        if (input) input.placeholder = 'e.g., Zomato, Blinkit, BESCOM, Chai Point';
        if (submitBtn) {
          submitBtn.className = 'w-full py-3 rounded-xl upi-gradient hover:opacity-95 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition';
          submitBtn.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <span>Proceed to Pay &amp; Auto-Track</span>
          `;
        }
      }
      updateLiveCategoryPreview();
    }

    function getTxnIsoDate(tx) {
      if (tx.isoDate && /^\d{4}-\d{2}-\d{2}$/.test(tx.isoDate)) {
        return tx.isoDate;
      }
      const str = tx.timestamp || '';
      const mIso = str.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
      if (mIso) return `${mIso[1]}-${mIso[2]}-${mIso[3]}`;
      const mText = str.match(/(\d{1,2})\s*(Oct|Sep|Aug|Jul|Jun|May|Apr|Mar|Feb|Jan|Nov|Dec)(?:\s*(\d{4}))?/i);
      if (mText) {
        const months = { jan:'01', feb:'02', mar:'03', apr:'04', may:'05', jun:'06', jul:'07', aug:'08', sep:'09', oct:'10', nov:'11', dec:'12' };
        const day = mText[1].padStart(2, '0');
        const mo = months[mText[2].toLowerCase()] || '10';
        const yr = mText[3] || '2026';
        return `${yr}-${mo}-${day}`;
      }
      return '2026-10-20';
    }

    function checkTxnMatchesDateFilter(tx, filterObj) {
      const d = getTxnIsoDate(tx);
      const yr = d.slice(0, 4);
      const mo = d.slice(5, 7);

      if (filterObj.year && filterObj.year !== 'ALL' && yr !== filterObj.year) {
        return false;
      }
      if (filterObj.month && filterObj.month !== 'ALL' && mo !== filterObj.month) {
        return false;
      }
      if (filterObj.fromDate && d < filterObj.fromDate) {
        return false;
      }
      if (filterObj.toDate && d > filterObj.toDate) {
        return false;
      }
      return true;
    }

    function handlePresetDateChange(preset) {
      activeDateFilter.preset = preset;
      const resetBtn = document.getElementById('btnResetDateFilter');
      const badge = document.getElementById('activeDateFilterBadge');

      if (preset === 'THIS_MONTH') {
        activeDateFilter.month = '10';
        activeDateFilter.year = '2026';
        activeDateFilter.fromDate = '2026-10-01';
        activeDateFilter.toDate = '2026-10-31';
        document.getElementById('filterMonthSelect').value = '10';
        document.getElementById('filterYearSelect').value = '2026';
        if (badge) badge.textContent = 'This Month (Oct 2026)';
        if (resetBtn) resetBtn.classList.remove('hidden');
      } else if (preset === 'LAST_MONTH') {
        activeDateFilter.month = '09';
        activeDateFilter.year = '2026';
        activeDateFilter.fromDate = '2026-09-01';
        activeDateFilter.toDate = '2026-09-30';
        document.getElementById('filterMonthSelect').value = '09';
        document.getElementById('filterYearSelect').value = '2026';
        if (badge) badge.textContent = 'Last Month (Sep 2026)';
        if (resetBtn) resetBtn.classList.remove('hidden');
      } else if (preset === 'YEAR_2026') {
        activeDateFilter.month = 'ALL';
        activeDateFilter.year = '2026';
        activeDateFilter.fromDate = '2026-01-01';
        activeDateFilter.toDate = '2026-12-31';
        document.getElementById('filterMonthSelect').value = 'ALL';
        document.getElementById('filterYearSelect').value = '2026';
        if (badge) badge.textContent = 'Full Year 2026';
        if (resetBtn) resetBtn.classList.remove('hidden');
      } else if (preset === 'YEAR_2025') {
        activeDateFilter.month = 'ALL';
        activeDateFilter.year = '2025';
        activeDateFilter.fromDate = '2025-01-01';
        activeDateFilter.toDate = '2025-12-31';
        document.getElementById('filterMonthSelect').value = 'ALL';
        document.getElementById('filterYearSelect').value = '2025';
        if (badge) badge.textContent = 'Full Year 2025';
        if (resetBtn) resetBtn.classList.remove('hidden');
      } else if (preset === 'CUSTOM') {
        openExportModal();
        return;
      } else {
        resetDateFilter();
        return;
      }
      renderTransactionList();
      renderKpisAndAlerts();
    }

    function handleMonthYearChange() {
      const mo = document.getElementById('filterMonthSelect').value;
      const yr = document.getElementById('filterYearSelect').value;
      activeDateFilter.preset = 'CUSTOM';
      activeDateFilter.month = mo;
      activeDateFilter.year = yr;
      activeDateFilter.fromDate = '';
      activeDateFilter.toDate = '';
      document.getElementById('filterPresetSelect').value = 'CUSTOM';

      const resetBtn = document.getElementById('btnResetDateFilter');
      const badge = document.getElementById('activeDateFilterBadge');
      if (mo !== 'ALL' || yr !== 'ALL') {
        if (badge) badge.textContent = `${mo !== 'ALL' ? 'Month ' + mo : 'All Months'} / ${yr !== 'ALL' ? yr : 'All Years'}`;
        if (resetBtn) resetBtn.classList.remove('hidden');
      } else {
        if (badge) badge.textContent = 'All Dates';
        if (resetBtn) resetBtn.classList.add('hidden');
      }
      renderTransactionList();
      renderKpisAndAlerts();
    }

    function resetDateFilter() {
      activeDateFilter = { preset: 'ALL', month: 'ALL', year: 'ALL', fromDate: '', toDate: '' };
      document.getElementById('filterPresetSelect').value = 'ALL';
      document.getElementById('filterMonthSelect').value = 'ALL';
      document.getElementById('filterYearSelect').value = 'ALL';
      const badge = document.getElementById('activeDateFilterBadge');
      if (badge) badge.textContent = 'All Dates';
      const resetBtn = document.getElementById('btnResetDateFilter');
      if (resetBtn) resetBtn.classList.add('hidden');
      renderTransactionList();
      renderKpisAndAlerts();
    }

    // --- Modal 5: Export CSV by Date / Month / Year ---
    function openExportModal() {
      document.getElementById('exportDateModal').classList.remove('hidden');
      updateExportModalStats();
    }

    function closeExportModal() {
      document.getElementById('exportDateModal').classList.add('hidden');
    }

    function setExportModalPreset(preset) {
      if (preset === 'THIS_MONTH') {
        document.getElementById('exportFromDateInput').value = '2026-10-01';
        document.getElementById('exportToDateInput').value = '2026-10-31';
        document.getElementById('exportMonthSelect').value = '10';
        document.getElementById('exportYearSelect').value = '2026';
      } else if (preset === 'LAST_MONTH') {
        document.getElementById('exportFromDateInput').value = '2026-09-01';
        document.getElementById('exportToDateInput').value = '2026-09-30';
        document.getElementById('exportMonthSelect').value = '09';
        document.getElementById('exportYearSelect').value = '2026';
      } else {
        document.getElementById('exportFromDateInput').value = '';
        document.getElementById('exportToDateInput').value = '';
        document.getElementById('exportMonthSelect').value = 'ALL';
        document.getElementById('exportYearSelect').value = 'ALL';
      }
      updateExportModalStats();
    }

    function syncExportModalMonthYear() {
      const mo = document.getElementById('exportMonthSelect').value;
      const yr = document.getElementById('exportYearSelect').value;
      if (mo !== 'ALL' && yr !== 'ALL') {
        const lastDay = new Date(parseInt(yr, 10), parseInt(mo, 10), 0).getDate();
        document.getElementById('exportFromDateInput').value = `${yr}-${mo}-01`;
        document.getElementById('exportToDateInput').value = `${yr}-${mo}-${String(lastDay).padStart(2, '0')}`;
      } else if (yr !== 'ALL' && mo === 'ALL') {
        document.getElementById('exportFromDateInput').value = `${yr}-01-01`;
        document.getElementById('exportToDateInput').value = `${yr}-12-31`;
      }
      updateExportModalStats();
    }

    function getExportModalFilteredList() {
      const fromDate = document.getElementById('exportFromDateInput').value;
      const toDate = document.getElementById('exportToDateInput').value;
      const typeFilter = document.getElementById('exportTypeSelect').value;

      return transactions.filter((t) => {
        const d = getTxnIsoDate(t);
        if (fromDate && d < fromDate) return false;
        if (toDate && d > toDate) return false;
        const tType = t.txnType || 'DEBIT';
        if (typeFilter !== 'ALL' && tType !== typeFilter) return false;
        return true;
      });
    }

    function updateExportModalStats() {
      const list = getExportModalFilteredList();
      const debits = list.filter((t) => (t.txnType || 'DEBIT') === 'DEBIT').reduce((s, t) => s + Number(t.amount || 0), 0);
      const credits = list.filter((t) => (t.txnType || 'DEBIT') === 'CREDIT').reduce((s, t) => s + Number(t.amount || 0), 0);

      const cntEl = document.getElementById('exportModalCount');
      if (cntEl) cntEl.textContent = `${list.length} transaction(s)`;
      const debEl = document.getElementById('exportModalDebits');
      if (debEl) debEl.textContent = `-₹${debits.toLocaleString('en-IN')}`;
      const crEl = document.getElementById('exportModalCredits');
      if (crEl) crEl.textContent = `+₹${credits.toLocaleString('en-IN')}`;
    }

    function executeFilteredCsvDownload() {
      const fromDate = document.getElementById('exportFromDateInput').value;
      const toDate = document.getElementById('exportToDateInput').value;
      const list = getExportModalFilteredList();

      if (list.length === 0) {
        showToast('No transactions match the selected date range to export');
        return;
      }

      let filename = 'paypulse_transactions_filtered.csv';
      if (fromDate && toDate) {
        filename = `paypulse_transactions_${fromDate}_to_${toDate}.csv`;
      } else if (fromDate) {
        filename = `paypulse_transactions_from_${fromDate}.csv`;
      }

      downloadTransactionsCsvList(list, filename);
      closeExportModal();
    }

    function applyModalFilterToFeed() {
      const fromDate = document.getElementById('exportFromDateInput').value;
      const toDate = document.getElementById('exportToDateInput').value;
      const typeFilter = document.getElementById('exportTypeSelect').value;

      activeDateFilter.preset = 'CUSTOM';
      activeDateFilter.month = 'ALL';
      activeDateFilter.year = 'ALL';
      activeDateFilter.fromDate = fromDate;
      activeDateFilter.toDate = toDate;
      document.getElementById('filterPresetSelect').value = 'CUSTOM';
      document.getElementById('txTypeFilter').value = typeFilter;

      const badge = document.getElementById('activeDateFilterBadge');
      const resetBtn = document.getElementById('btnResetDateFilter');
      if (badge) {
        badge.textContent = `${fromDate || 'Start'} to ${toDate || 'End'}`;
      }
      if (resetBtn) resetBtn.classList.remove('hidden');

      closeExportModal();
      renderTransactionList();
      renderKpisAndAlerts();
      showToast(`Applied date filter: ${fromDate || 'Start'} to ${toDate || 'End'} (${getExportModalFilteredList().length} records)`);
    }

    function downloadTransactionsCsvList(list, filename) {
      const headers = ['ID', 'Date', 'Timestamp', 'Type', 'Merchant', 'VPA', 'Amount_INR', 'Category', 'Source_App', 'UPI_Ref_ID', 'Note'];
      const rows = list.map((t) => [
        t.id,
        getTxnIsoDate(t),
        `"${(t.timestamp || '').replace(/"/g, '""')}"`,
        t.txnType || 'DEBIT',
        `"${(t.merchant || '').replace(/"/g, '""')}"`,
        t.vpa,
        (t.txnType === 'CREDIT' ? '+' : '-') + t.amount,
        `"${t.category}"`,
        `"${t.sourceApp}"`,
        t.refId,
        `"${(t.note || '').replace(/"/g, '""')}"`
      ]);
      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'paypulse_upi_transactions.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(`Exported ${list.length} transaction(s) to ${filename}!`);
    }

    // Keep existing exportTransactionsCsv signature compatible
    function exportTransactionsCsv() {
      openExportModal();
    }

    // --- Smart Auto-Categorization Engine ---
    function detectCategory(merchantName, vpaText, noteText) {
      const combined = `${merchantName || ''} ${vpaText || ''} ${noteText || ''}`.toLowerCase();

      for (const rule of customMerchantRules) {
        if (rule.keyword && combined.includes(rule.keyword.toLowerCase())) {
          return rule.category;
        }
      }

      for (const group of KEYWORD_RULES) {
        for (const kw of group.keywords) {
          if (combined.includes(kw)) {
            return group.category;
          }
        }
      }
      // If payment does not match specific keyword rules, automatically assign to 'Others'
      return 'Others';
    }

    function updateLiveCategoryPreview() {
      const merchant = document.getElementById('payMerchantInput').value;
      const vpa = document.getElementById('payVpaInput').value;
      const note = document.getElementById('payNoteInput').value;
      const cat = detectCategory(merchant, vpa, note);
      const meta = CATEGORY_META[cat] || CATEGORY_META['Transfers & Friends'];
      const badge = document.getElementById('liveAutoCategoryBadge');
      badge.textContent = `${meta.icon} Auto: ${cat}`;
    }

    // --- Tab Switching ---
    function switchTab(tabKey) {
      const panels = {
        home: document.getElementById('tabPanelHome'),
        auto: document.getElementById('tabPanelAuto'),
        analytics: document.getElementById('tabPanelAnalytics'),
        ai: document.getElementById('tabPanelAi'),
        blueprint: document.getElementById('tabPanelBlueprint')
      };
      const buttons = {
        home: document.getElementById('navBtnHome'),
        auto: document.getElementById('navBtnAuto'),
        analytics: document.getElementById('navBtnAnalytics'),
        ai: document.getElementById('navBtnAi'),
        blueprint: document.getElementById('navBtnBlueprint')
      };

      Object.keys(panels).forEach((k) => {
        if (k === tabKey) {
          panels[k].classList.remove('hidden');
          buttons[k].className = 'nav-tab-btn px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all bg-white text-purple-900 shadow-sm whitespace-nowrap flex items-center gap-1.5';
        } else {
          panels[k].classList.add('hidden');
          buttons[k].className = 'nav-tab-btn px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all text-white/90 hover:bg-white/10 whitespace-nowrap flex items-center gap-1.5';
        }
      });

      if (tabKey === 'analytics') {
        renderChartsAndBudgets();
      }
      if (tabKey === 'ai') {
        renderAiCopilotPanel();
      }
    }

    // --- Quick Merchant Prefill ---
    function prefillMerchant(name, vpa, amount, app) {
      document.getElementById('payMerchantInput').value = name;
      document.getElementById('payVpaInput').value = vpa;
      document.getElementById('payAmountInput').value = amount;
      document.getElementById('payAppSelect').value = app;
      document.getElementById('payCategoryOverride').value = 'AUTO';
      updateLiveCategoryPreview();
      showToast(`Prefilled ${name} (₹${amount}) via ${app}`);
    }

    function focusPayInput() {
      switchTab('home');
      const input = document.getElementById('payMerchantInput');
      input.focus();
      input.select();
    }

    // --- UPI Payment Initiation & NPCI PIN Modal ---
    function handleInitiatePayment(e) {
      e.preventDefault();
      const merchant = document.getElementById('payMerchantInput').value.trim() || 'UPI Merchant';
      const vpa = document.getElementById('payVpaInput').value.trim() || 'merchant@upi';
      const amount = parseFloat(document.getElementById('payAmountInput').value) || 0;
      const sourceApp = document.getElementById('payAppSelect').value;
      const overrideCat = document.getElementById('payCategoryOverride').value;
      const note = document.getElementById('payNoteInput').value.trim() || 'UPI Payment';

      if (amount <= 0) {
        showToast('Please enter a valid amount greater than ₹0');
        return;
      }

      const category = overrideCat === 'AUTO' ? detectCategory(merchant, vpa, note) : overrideCat;
      pendingPaymentDraft = { merchant, vpa, amount, sourceApp, category, note, txnType: currentPaymentMode };

      // If UPI Lite (< ₹500 and PayPulse Direct), process immediately without PIN
      if (sourceApp === 'PayPulse Direct' && amount <= 500) {
        finalizePayment(pendingPaymentDraft);
      } else {
        openPinModal('payment');
      }
    }

    function openPinModal(mode) {
      pendingPinContext = mode;
      currentPinDigits = '';
      updatePinDotsUI();
      const titleEl = document.getElementById('pinModalTitle');
      const amtEl = document.getElementById('pinModalAmount');

      if (mode === 'balance') {
        titleEl.textContent = 'Checking HDFC Bank A/C Balance';
        amtEl.textContent = 'A/C •••• 9104';
      } else if (pendingPaymentDraft) {
        titleEl.textContent = `Paying ${pendingPaymentDraft.merchant}`;
        amtEl.textContent = `₹${pendingPaymentDraft.amount.toLocaleString('en-IN')}`;
      }
      document.getElementById('upiPinModal').classList.remove('hidden');
    }

    function closePinModal() {
      document.getElementById('upiPinModal').classList.add('hidden');
      currentPinDigits = '';
    }

    function pressPinDigit(digit) {
      if (currentPinDigits.length < 4) {
        currentPinDigits += digit;
        updatePinDotsUI();
      }
    }

    function updatePinDotsUI() {
      const dots = document.querySelectorAll('#pinDotsContainer .pin-dot');
      dots.forEach((dot, idx) => {
        if (idx < currentPinDigits.length) {
          dot.classList.add('bg-purple-600', 'border-purple-600', 'scale-110');
          dot.classList.remove('border-slate-400');
        } else {
          dot.classList.remove('bg-purple-600', 'border-purple-600', 'scale-110');
          dot.classList.add('border-slate-400');
        }
      });
    }

    function submitPinAction() {
      if (currentPinDigits.length < 4) {
        showToast('Enter any 4 digits to complete NPCI UPI verification');
        return;
      }
      const mode = pendingPinContext;
      closePinModal();

      if (mode === 'balance') {
        const spent = transactions.reduce((acc, t) => acc + Number(t.amount || 0), 0);
        const remainingBal = Math.max(12450, 68500 - spent);
        document.getElementById('headerBalanceLabel').textContent = `A/C Bal: ₹${remainingBal.toLocaleString('en-IN')}`;
        showToast(`Verified! HDFC Bank •••• 9104 Available Balance: ₹${remainingBal.toLocaleString('en-IN')}`);
      } else if (mode === 'payment' && pendingPaymentDraft) {
        finalizePayment(pendingPaymentDraft);
        pendingPaymentDraft = null;
      }
    }

    function finalizePayment(draft) {
      const refId = '6293' + Math.floor(10000000 + Math.random() * 89999999).toString();
      const todayIso = new Date().toISOString().slice(0, 10);
      const newTx = {
        id: 'TXN-' + Date.now(),
        merchant: draft.merchant,
        vpa: draft.vpa,
        amount: Math.round(draft.amount),
        txnType: draft.txnType || currentPaymentMode || 'DEBIT',
        category: draft.category,
        sourceApp: draft.sourceApp,
        refId: refId,
        isoDate: todayIso,
        timestamp: 'Just now (' + todayIso + ')',
        note: draft.note,
        autoCaptured: true
      };
      transactions.unshift(newTx);
      postToFlaskApi('/api/transactions', newTx);
      saveState();
      refreshAllViews();
      showToast(`Paid ₹${newTx.amount} to ${newTx.merchant} (${newTx.sourceApp}) • Auto-tagged: ${newTx.category}`);
    }

    // --- Real Front Camera & QR Code Scanning Engine ---
    let activeCameraStream = null;
    let currentCameraFacing = 'user'; // 'user' (Front Camera) by default as requested
    let isQrScanningActive = false;
    let qrScanAnimFrameId = null;

    function openQrModal() {
      document.getElementById('qrScannerModal').classList.remove('hidden');
      // Automatically activate Front Camera
      startCameraStream('user');
    }

    function closeQrModal() {
      stopCameraStream();
      document.getElementById('qrScannerModal').classList.add('hidden');
    }

    function stopCameraStream() {
      isQrScanningActive = false;
      if (qrScanAnimFrameId) {
        cancelAnimationFrame(qrScanAnimFrameId);
        qrScanAnimFrameId = null;
      }
      if (activeCameraStream) {
        try {
          activeCameraStream.getTracks().forEach((track) => track.stop());
        } catch (e) {
          // Ignore track stop errors
        }
        activeCameraStream = null;
      }
      const video = document.getElementById('qrCameraVideo');
      if (video) {
        video.srcObject = null;
        video.classList.add('hidden');
      }
      const overlay = document.getElementById('qrCameraStatusOverlay');
      if (overlay) overlay.classList.remove('hidden');
    }

    async function startCameraStream(facingMode = 'user') {
      stopCameraStream();
      currentCameraFacing = facingMode;

      const facingLabel = document.getElementById('cameraFacingLabel');
      if (facingLabel) {
        facingLabel.textContent = facingMode === 'user' ? 'Front Cam' : 'Back Cam';
      }

      const statusTitle = document.getElementById('qrCameraStatusTitle');
      const statusMsg = document.getElementById('qrCameraStatusMsg');
      const startBtn = document.getElementById('btnStartCameraManually');
      const overlay = document.getElementById('qrCameraStatusOverlay');
      const video = document.getElementById('qrCameraVideo');
      const detectBadge = document.getElementById('qrLiveDetectBadge');

      if (statusTitle) statusTitle.textContent = facingMode === 'user' ? 'Requesting Front Camera...' : 'Requesting Back Camera...';
      if (statusMsg) statusMsg.textContent = 'Please click "Allow" on your browser camera prompt.';
      if (startBtn) startBtn.classList.add('hidden');

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        if (statusTitle) statusTitle.textContent = 'Camera API Not Supported';
        if (statusMsg) statusMsg.textContent = 'This browser environment does not support navigator.mediaDevices.getUserMedia. You can upload a QR image or tap a preset merchant below.';
        if (startBtn) {
          startBtn.classList.remove('hidden');
          startBtn.textContent = '📷 Retry Camera';
        }
        return;
      }

      try {
        const constraints = {
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        };

        let stream = null;
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
        } catch (errConstraint) {
          // Fallback to generic video if exact facingMode constraint was rejected
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        }

        activeCameraStream = stream;
        if (video) {
          video.srcObject = stream;
          video.setAttribute('playsinline', 'true');
          video.classList.remove('hidden');
          await video.play();
        }

        if (overlay) overlay.classList.add('hidden');
        if (detectBadge) {
          detectBadge.textContent = facingMode === 'user' ? 'Front Cam Live • Scanning...' : 'Back Cam Live • Scanning...';
        }

        isQrScanningActive = true;
        qrScanAnimFrameId = requestAnimationFrame(scanVideoFrameLoop);
        showToast(`📷 ${facingMode === 'user' ? 'Front camera' : 'Back camera'} active! Hold any UPI QR to the camera.`);
      } catch (err) {
        if (overlay) overlay.classList.remove('hidden');
        if (video) video.classList.add('hidden');
        if (statusTitle) statusTitle.textContent = 'Camera Access Blocked or Not Found';
        if (statusMsg) {
          statusMsg.textContent = 'Camera permission was not granted or no camera is connected. You can upload a QR photo or tap a preset merchant below.';
        }
        if (startBtn) {
          startBtn.classList.remove('hidden');
          startBtn.textContent = '📷 Try Front Camera Again';
        }
        showToast('Camera permission denied or camera unavailable. Try uploading a QR image.');
      }
    }

    function toggleCameraFacing() {
      const nextFacing = currentCameraFacing === 'user' ? 'environment' : 'user';
      startCameraStream(nextFacing);
    }

    function scanVideoFrameLoop() {
      if (!isQrScanningActive) return;
      const video = document.getElementById('qrCameraVideo');
      const canvas = document.getElementById('qrScanCanvas');

      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Scan via jsQR if loaded
        if (typeof jsQR !== 'undefined') {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert'
          });

          if (code && code.data && code.data.trim()) {
            // Recognized QR!
            stopCameraStream();
            handleRecognizedQrContent(code.data.trim());
            return;
          }
        }
      }

      qrScanAnimFrameId = requestAnimationFrame(scanVideoFrameLoop);
    }

    function handleRecognizedQrContent(rawQrText) {
      closeQrModal();

      let merchant = 'UPI Merchant';
      let vpa = 'merchant@upi';
      let amount = 0;
      let note = 'BharatQR Scan & Pay';
      let sourceApp = 'PhonePe';

      // Parse standard upi://pay URI parameters if present
      if (rawQrText.startsWith('upi://') || rawQrText.includes('pa=')) {
        try {
          const urlStr = rawQrText.startsWith('upi://') ? rawQrText.replace('upi://pay?', 'http://dummy.com/?') : 'http://dummy.com/?' + rawQrText;
          const u = new URL(urlStr);
          if (u.searchParams.get('pa')) vpa = u.searchParams.get('pa');
          if (u.searchParams.get('pn')) merchant = decodeURIComponent(u.searchParams.get('pn'));
          if (u.searchParams.get('am')) amount = parseFloat(u.searchParams.get('am')) || 0;
          if (u.searchParams.get('tn')) note = decodeURIComponent(u.searchParams.get('tn'));
        } catch (e) {
          // Fallback regex extraction
          const paMatch = rawQrText.match(/[?&]pa=([^&]+)/);
          if (paMatch) vpa = decodeURIComponent(paMatch[1]);
          const pnMatch = rawQrText.match(/[?&]pn=([^&]+)/);
          if (pnMatch) merchant = decodeURIComponent(pnMatch[1]);
          const amMatch = rawQrText.match(/[?&]am=([^&]+)/);
          if (amMatch) amount = parseFloat(amMatch[1]) || 0;
        }
      } else {
        // Plain text QR (e.g. VPA or merchant string)
        if (rawQrText.includes('@')) {
          vpa = rawQrText.trim();
          merchant = vpa.split('@')[0].toUpperCase();
        } else {
          merchant = rawQrText.slice(0, 30);
        }
      }

      if (vpa.includes('paytm')) sourceApp = 'Paytm';
      else if (vpa.includes('ok')) sourceApp = 'GPay';

      // If QR did not specify an amount, default to 350 for instant test
      if (!amount || amount <= 0) {
        amount = 350;
      }

      prefillMerchant(merchant, vpa, amount, sourceApp);
      const category = detectCategory(merchant, vpa, note);
      pendingPaymentDraft = {
        merchant,
        vpa,
        amount,
        sourceApp,
        category,
        note: note || 'Scanned via Front Camera',
        txnType: 'DEBIT'
      };

      openPinModal('payment');
      showToast(`🎯 Decoded live QR for "${merchant}" (${vpa}) • ₹${amount}!`);
    }

    function handleQrImageUpload(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.getElementById('qrScanCanvas') || document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          if (typeof jsQR !== 'undefined') {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code && code.data) {
              handleRecognizedQrContent(code.data);
              return;
            }
          }
          // If decoding failed
          showToast('Could not detect a clear UPI QR in this photo. Try holding it to the camera.');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }

    function completeQrScan(merchant, vpa, amount, app) {
      closeQrModal();
      prefillMerchant(merchant, vpa, amount, app);
      const category = detectCategory(merchant, vpa, 'QR Scan & Pay');
      pendingPaymentDraft = {
        merchant,
        vpa,
        amount,
        sourceApp: app,
        category,
        note: 'BharatQR Scan & Pay',
        txnType: 'DEBIT'
      };
      openPinModal('payment');
    }

    // --- Split Bill Simulator ---
    function openSplitModal() {
      updateSplitPreview();
      document.getElementById('splitBillModal').classList.remove('hidden');
    }

    function closeSplitModal() {
      document.getElementById('splitBillModal').classList.add('hidden');
    }

    function updateSplitPreview() {
      const total = parseFloat(document.getElementById('splitTotalInput').value) || 0;
      const count = Math.max(2, parseInt(document.getElementById('splitPeopleCount').value, 10) || 2);
      const myShare = Math.round(total / count);
      const friendsCount = count - 1;
      const collectAmt = total - myShare;

      document.getElementById('splitYourShare').textContent = `₹${myShare.toLocaleString('en-IN')}`;
      document.getElementById('splitCollectShare').textContent = `₹${collectAmt.toLocaleString('en-IN')} (${friendsCount} friends × ₹${myShare.toLocaleString('en-IN')})`;
      document.getElementById('splitBtnShareAmt').textContent = myShare.toLocaleString('en-IN');
    }

    function commitSplitExpense(mode) {
      const title = document.getElementById('splitMerchantInput').value.trim() || 'Group Split Expense';
      const total = parseFloat(document.getElementById('splitTotalInput').value) || 0;
      const count = Math.max(2, parseInt(document.getElementById('splitPeopleCount').value, 10) || 2);
      const myShare = Math.round(total / count);
      const loggedAmount = mode === 'my_share' ? myShare : Math.round(total);

      const category = detectCategory(title, 'split@ybl', 'Split Bill');
      transactions.unshift({
        id: 'TXN-' + Date.now(),
        merchant: title,
        vpa: 'split@ybl',
        amount: loggedAmount,
        category: category,
        sourceApp: 'PhonePe',
        refId: '6293' + Math.floor(10000000 + Math.random() * 89999999),
        timestamp: 'Just now',
        note: mode === 'my_share' ? `Your 1/${count} split share of ₹${total}` : `Full group bill (₹${total - myShare} pending from friends)`,
        autoCaptured: true
      });
      closeSplitModal();
      saveState();
      refreshAllViews();
      showToast(`Logged ₹${loggedAmount} for "${title}" under ${category}`);
    }

    // --- Live SMS & Push Notification Parser ---
    function loadSampleSms(idx) {
      const sample = SAMPLE_SMS_LIST[idx] || SAMPLE_SMS_LIST[0];
      document.getElementById('smsRawInput').value = sample;
      parseSmsLive();
    }

    function parseSmsText(rawText) {
      const text = (rawText || '').trim();
      if (!text) {
        return {
          amount: 0,
          merchant: 'Unknown',
          vpa: 'unknown@upi',
          refId: 'N/A',
          sourceApp: 'SMS Auto-Sync',
          category: 'Transfers & Friends'
        };
      }

      // Extract Amount (Rs. 485.00, INR 650, ₹999, debited by 320.0)
      const amtMatch = text.match(/(?:Rs\.?|INR|₹|debited by)\s*([0-9,]+(?:\.\d{1,2})?)/i);
      const amount = amtMatch ? Math.round(parseFloat(amtMatch[1].replace(/,/g, ''))) : 250;

      // Extract VPA if present
      const vpaMatch = text.match(/([a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+)/);
      const vpa = vpaMatch ? vpaMatch[1].toLowerCase() : 'merchant@ybl';

      // Extract 12-digit UPI Ref No
      const refMatch = text.match(/\b(\d{12})\b/);
      const refId = refMatch ? refMatch[1] : '6293' + Math.floor(10000000 + Math.random() * 89999999);

      // Extract Merchant Name
      let merchant = 'UPI Merchant';
      const merchPatterns = [
        /(?:paid\s+(?:₹|Rs\.?\s*)?[0-9,.]+\s+to)\s+([A-Za-z0-9 &._-]+?)(?:\s*\(|\s+on|\s+from|\s+via|\.)/i,
        /(?:trf to|at|to VPA)\s+([A-Za-z0-9 &._@-]+?)(?:\s*\(|\s+via|\s+Ref|\s+on|\.)/i,
        /;\s*([A-Za-z0-9 &._-]+?)\s*(?:\(|credited)/i
      ];
      for (const pat of merchPatterns) {
        const m = text.match(pat);
        if (m && m[1]) {
          merchant = m[1].trim();
          break;
        }
      }
      if (merchant.includes('@')) {
        const prefix = merchant.split('@')[0];
        merchant = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }

      // Check user-selected dropdown channel first, or auto-detect if set to AUTO
      const selectedChannelEl = document.getElementById('smsSourceChannelSelect');
      const selectedChannel = selectedChannelEl ? selectedChannelEl.value : 'AUTO';

      let sourceApp = 'SMS Auto-Sync';
      if (selectedChannel && selectedChannel !== 'AUTO') {
        sourceApp = selectedChannel;
      } else if (/phonepe|@ybl|@ibl|@axl/i.test(text)) {
        sourceApp = 'PhonePe';
      } else if (/paytm|@paytm/i.test(text)) {
        sourceApp = 'Paytm';
      } else if (/gpay|google pay|@ok/i.test(text)) {
        sourceApp = 'GPay';
      } else if (/credit card|cc\s*xx|card ending/i.test(text)) {
        sourceApp = 'Credit Card';
      } else if (/debit card|atm|pos\s/i.test(text)) {
        sourceApp = 'Debit Card';
      } else if (/neft|imps|rtgs|netbanking|net banking/i.test(text)) {
        sourceApp = 'Net Banking';
      }

      const category = detectCategory(merchant, vpa, text);

      // Auto-detect Credit vs Debit from bank SMS text
      const isCredit = /(?:credited|credit|received|refund|cashback|deposited|salary|credited to|cr to a\/c)/i.test(text);
      const txnType = isCredit ? 'CREDIT' : 'DEBIT';

      return { amount, merchant, vpa, refId, sourceApp, category, txnType };
    }

    function parseSmsLive() {
      const raw = document.getElementById('smsRawInput').value;
      const res = parseSmsText(raw);
      const isCredit = res.txnType === 'CREDIT';
      const amtEl = document.getElementById('parsedAmount');
      if (amtEl) {
        amtEl.textContent = (isCredit ? '+' : '-') + `₹${res.amount.toLocaleString('en-IN')}`;
        amtEl.className = isCredit ? 'text-base font-extrabold text-emerald-400 mt-0.5 block' : 'text-base font-extrabold text-slate-100 mt-0.5 block';
      }
      const typeBadge = document.getElementById('parsedTypeBadge');
      if (typeBadge) {
        typeBadge.textContent = isCredit ? '+ Credit (Inflow)' : '- Debit (Expense)';
        typeBadge.className = isCredit ? 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300' : 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300';
      }
      document.getElementById('parsedMerchant').textContent = res.merchant;
      document.getElementById('parsedCategory').textContent = res.category;
      document.getElementById('parsedVpa').textContent = res.vpa;
      document.getElementById('parsedRef').textContent = res.refId;
      document.getElementById('parsedApp').textContent = res.sourceApp;
      document.getElementById('smsConfidenceBadge').textContent = raw.trim() ? '99.4% Match Confidence' : 'Waiting for SMS';
    }

    async function commitParsedSmsToLedger() {
      const raw = document.getElementById('smsRawInput').value;
      if (!raw.trim()) {
        showToast('Paste or select a sample SMS first');
        return;
      }
      const res = parseSmsText(raw);
      const txId = 'TXN-' + Date.now();
      const todayIso = new Date().toISOString().slice(0, 10);
      const newTx = {
        id: txId,
        merchant: res.merchant,
        vpa: res.vpa,
        amount: res.amount,
        txnType: res.txnType || 'DEBIT',
        category: res.category,
        sourceApp: res.sourceApp,
        refId: res.refId,
        isoDate: todayIso,
        timestamp: 'Parsed (' + todayIso + ')',
        note: 'Auto-captured from SMS/Notification',
        autoCaptured: true
      };

      const selectedChannelEl = document.getElementById('smsSourceChannelSelect');
      const selectedChannel = selectedChannelEl ? selectedChannelEl.value : res.sourceApp;

      // Send to Flask + SQLite backend (/api/parse-sms with commit: true and selected sourceChannel)
      const apiRes = await postToFlaskApi('/api/parse-sms', {
        smsText: raw,
        sourceChannel: selectedChannel,
        commit: true
      });

      if (apiRes && apiRes.savedTransaction) {
        transactions.unshift(apiRes.savedTransaction);
      } else {
        transactions.unshift(newTx);
      }

      saveState();
      refreshAllViews();

      const statusBox = document.getElementById('smsDbTransferStatus');
      const statusText = document.getElementById('smsDbTransferText');
      if (statusBox && statusText) {
        statusBox.classList.remove('hidden');
        const dbMode = isFlaskBackendConnected ? 'SQLite Database (paypulse.db)' : 'Local Ledger Store';
        statusText.textContent = `✓ Saved to ${dbMode}: ₹${res.amount.toLocaleString('en-IN')} at ${res.merchant} [${res.category}] (Ref: ${res.refId})`;
      }

      showToast(`✓ Transferred to Database: ₹${res.amount} at ${res.merchant} (${res.category})`);
    }

    function clearSmsInputBox() {
      const box = document.getElementById('smsRawInput');
      if (box) {
        box.value = '';
        parseSmsLive();
        box.focus();
      }
      const statusBox = document.getElementById('smsDbTransferStatus');
      if (statusBox) statusBox.classList.add('hidden');
    }

    // --- Simulate Live Incoming UPI Alert or AA Batch Sync ---
    const LIVE_SIMULATION_POOL = [
      { merchant: 'Blinkit Groceries', vpa: 'blinkit@paytm', amount: 540, sourceApp: 'Paytm', note: '10-min grocery delivery' },
      { merchant: 'Starbucks Tata Coffee', vpa: 'starbucks@ybl', amount: 385, sourceApp: 'PhonePe', note: 'Cold brew coffee' },
      { merchant: 'Namma Yatri Auto', vpa: 'nammayatri@axis', amount: 165, sourceApp: 'PhonePe', note: 'Auto rickshaw ride' },
      { merchant: 'BESCOM Electricity', vpa: 'bescom@sbi', amount: 1120, sourceApp: 'Paytm', note: 'Monthly power bill' },
      { merchant: 'BookMyShow PVR', vpa: 'bms@icici', amount: 620, sourceApp: 'PhonePe', note: 'Weekend movie tickets' },
      { merchant: 'PharmEasy Meds', vpa: 'pharmeasy@ybl', amount: 430, sourceApp: 'SMS Auto-Sync', note: 'Healthcare essentials' }
    ];

    function simulateRandomIncomingUpi() {
      const pick = LIVE_SIMULATION_POOL[Math.floor(Math.random() * LIVE_SIMULATION_POOL.length)];
      const category = detectCategory(pick.merchant, pick.vpa, pick.note);
      const newTx = {
        id: 'TXN-' + Date.now(),
        merchant: pick.merchant,
        vpa: pick.vpa,
        amount: pick.amount,
        category: category,
        sourceApp: pick.sourceApp,
        refId: '6293' + Math.floor(10000000 + Math.random() * 89999999),
        timestamp: 'Live SMS Alert',
        note: pick.note,
        autoCaptured: true
      };
      transactions.unshift(newTx);
      saveState();
      refreshAllViews();
      showToast(`📲 Incoming ${newTx.sourceApp} Alert: ₹${newTx.amount} paid to ${newTx.merchant} → Auto-filed in ${newTx.category}`);
    }

    function runBatchAaSync() {
      const batch = [
        { merchant: 'BigBasket Daily', vpa: 'bigbasket@ybl', amount: 680, sourceApp: 'PhonePe', note: 'AA FIP Statement Sync' },
        { merchant: 'Rapido Bike Taxi', vpa: 'rapido@paytm', amount: 110, sourceApp: 'Paytm', note: 'AA FIP Statement Sync' },
        { merchant: 'Airtel Xstream Bill', vpa: 'airtel@axis', amount: 799, sourceApp: 'PhonePe', note: 'AA FIP Statement Sync' },
        { merchant: 'Chai Point Cafe', vpa: 'chaipoint@ybl', amount: 195, sourceApp: 'Paytm', note: 'AA FIP Statement Sync' }
      ];
      batch.forEach((item, idx) => {
        transactions.unshift({
          id: 'TXN-AA-' + Date.now() + '-' + idx,
          merchant: item.merchant,
          vpa: item.vpa,
          amount: item.amount,
          category: detectCategory(item.merchant, item.vpa, item.note),
          sourceApp: item.sourceApp,
          refId: '6293' + Math.floor(10000000 + Math.random() * 89999999),
          timestamp: 'AA Synced',
          note: item.note,
          autoCaptured: true
        });
      });
      saveState();
      refreshAllViews();
      showToast('Synced 4 new PhonePe & Paytm transactions from HDFC/SBI via Account Aggregator!');
    }

    // --- Custom Merchant Categorization Rules ---
    function saveCustomMerchantRule() {
      const kwInput = document.getElementById('customRuleKeyword');
      const catSelect = document.getElementById('customRuleCategory');
      const keyword = kwInput.value.trim();
      const category = catSelect.value;

      if (!keyword) {
        showToast('Enter a merchant keyword or VPA fragment first');
        return;
      }

      customMerchantRules.unshift({ keyword, category });
      postToFlaskApi('/api/rules', { keyword, category });
      kwInput.value = '';

      // Re-categorize existing matching transactions
      transactions.forEach((tx) => {
        if (`${tx.merchant} ${tx.vpa}`.toLowerCase().includes(keyword.toLowerCase())) {
          tx.category = category;
        }
      });

      saveState();
      renderCustomRulesPills();
      refreshAllViews();
      showToast(`Rule saved: "${keyword}" will always auto-tag as ${category}`);
    }

    function renderCustomRulesPills() {
      const container = document.getElementById('customRulesPills');
      if (!container) return;
      container.innerHTML = customMerchantRules.map((r, i) => `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-medium">
          <span>"${escapeHtml(r.keyword)}" → ${escapeHtml(r.category)}</span>
          <button type="button" onclick="removeCustomRule(${i})" class="text-purple-500 hover:text-purple-900 font-bold">×</button>
        </span>
      `).join('');
    }

    function removeCustomRule(index) {
      customMerchantRules.splice(index, 1);
      saveState();
      renderCustomRulesPills();
    }

    // --- Change Transaction Category Inline ---
    function changeTransactionCategory(txId, newCategory) {
      const item = transactions.find((t) => t.id === txId);
      if (item) {
        item.category = newCategory;
        postToFlaskApi(`/api/transactions/${encodeURIComponent(txId)}/category`, { category: newCategory }, 'PATCH');
        saveState();
        refreshAllViews();
        showToast(`Updated ${item.merchant} category to ${newCategory}`);
      }
    }

    function deleteTransaction(txId) {
      transactions = transactions.filter((t) => t.id !== txId);
      postToFlaskApi(`/api/transactions/${encodeURIComponent(txId)}`, {}, 'DELETE');
      saveState();
      refreshAllViews();
      showToast('Transaction removed from expense ledger');
    }

    // --- Render KPIs, Alerts & Transaction List ---
    function refreshAllViews() {
      renderKpisAndAlerts();
      renderTransactionList();
      updateLiveCategoryPreview();
      if (!document.getElementById('tabPanelAnalytics').classList.contains('hidden')) {
        renderChartsAndBudgets();
      }
    }

    function renderKpisAndAlerts() {
      // Calculate Debits (Expenses) vs Credits (Inflow/Income)
      const debitList = transactions.filter((t) => (t.txnType || 'DEBIT') === 'DEBIT');
      const creditList = transactions.filter((t) => (t.txnType || 'DEBIT') === 'CREDIT');

      const totalDebits = debitList.reduce((sum, t) => sum + Number(t.amount || 0), 0);
      const totalCredits = creditList.reduce((sum, t) => sum + Number(t.amount || 0), 0);
      const netCashflow = totalCredits - totalDebits;

      const totalBudget = Object.values(categoryBudgets).reduce((sum, b) => sum + Number(b || 0), 0);
      const budgetRemaining = totalBudget - totalDebits;

      // Card 1: Debits
      const spentEl = document.getElementById('kpiTotalSpent');
      if (spentEl) spentEl.textContent = `-₹${totalDebits.toLocaleString('en-IN')}`;
      const countEl = document.getElementById('kpiTxCount');
      if (countEl) countEl.textContent = `${debitList.length} debit expense(s)`;

      // Card 2: Credits
      const credEl = document.getElementById('kpiTotalCredited');
      if (credEl) credEl.textContent = `+₹${totalCredits.toLocaleString('en-IN')}`;
      const credCountEl = document.getElementById('kpiCreditCount');
      if (credCountEl) credCountEl.textContent = `${creditList.length} credit / inflow(s)`;

      // Card 3: Net Cashflow
      const netEl = document.getElementById('kpiNetCashflow');
      if (netEl) {
        netEl.textContent = (netCashflow >= 0 ? '+' : '-') + `₹${Math.abs(netCashflow).toLocaleString('en-IN')}`;
        netEl.className = netCashflow >= 0
          ? 'text-xl sm:text-2xl font-extrabold text-emerald-600'
          : 'text-xl sm:text-2xl font-extrabold text-rose-600';
      }

      // Card 4: Monthly Budget Left
      const remEl = document.getElementById('kpiBudgetRemaining');
      if (remEl) {
        remEl.textContent = budgetRemaining >= 0
          ? `₹${budgetRemaining.toLocaleString('en-IN')}`
          : `-₹${Math.abs(budgetRemaining).toLocaleString('en-IN')}`;
        remEl.className = budgetRemaining >= 0
          ? 'text-xl sm:text-2xl font-extrabold text-emerald-600'
          : 'text-xl sm:text-2xl font-extrabold text-rose-600';
      }

      const pctUsed = totalBudget > 0 ? Math.min(100, Math.round((totalDebits / totalBudget) * 100)) : 0;
      const barEl = document.getElementById('kpiBudgetBar');
      if (barEl) {
        barEl.style.width = `${pctUsed}%`;
        barEl.className = pctUsed > 90
          ? 'bg-rose-500 h-full rounded-full transition-all duration-300'
          : pctUsed > 75
            ? 'bg-amber-500 h-full rounded-full transition-all duration-300'
            : 'bg-emerald-500 h-full rounded-full transition-all duration-300';
      }

      // Category totals for Debits (Expenses)
      const catTotals = {};
      debitList.forEach((t) => {
        catTotals[t.category] = (catTotals[t.category] || 0) + Number(t.amount || 0);
      });

      let topCat = 'Food & Dining';
      let topAmt = 0;
      Object.entries(catTotals).forEach(([cat, amt]) => {
        if (amt > topAmt) {
          topAmt = amt;
          topCat = cat;
        }
      });

      const meta = CATEGORY_META[topCat] || { icon: '📦' };
      const topCatEl = document.getElementById('kpiTopCategory');
      if (topCatEl) topCatEl.textContent = `${meta.icon} ${topCat}`;
      const topAmtEl = document.getElementById('kpiTopCategoryAmt');
      if (topAmtEl) topAmtEl.textContent = `₹${topAmt.toLocaleString('en-IN')} spent`;

      // Check if any category exceeds 80% of its budget
      const alertBanner = document.getElementById('budgetAlertBanner');
      if (alertBanner) {
        const exceededList = [];
        Object.entries(categoryBudgets).forEach(([cat, limit]) => {
          const spent = catTotals[cat] || 0;
          if (limit > 0 && spent >= limit * 0.8) {
            const pct = Math.round((spent / limit) * 100);
            exceededList.push(`${cat} (${pct}% of ₹${limit.toLocaleString('en-IN')})`);
          }
        });

        if (exceededList.length > 0) {
          alertBanner.classList.remove('hidden');
          const tEl = document.getElementById('budgetAlertTitle');
          if (tEl) tEl.textContent = 'Smart Budget Threshold Alert';
          const txtEl = document.getElementById('budgetAlertText');
          if (txtEl) txtEl.textContent = `High spend detected in: ${exceededList.join(' • ')}`;
        } else {
          alertBanner.classList.add('hidden');
        }
      }
    }

    function getSourceBadgeHtml(sourceApp) {
      if (sourceApp === 'PhonePe') {
        return '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">PhonePe</span>';
      }
      if (sourceApp === 'Paytm') {
        return '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200">Paytm</span>';
      }
      if (sourceApp === 'GPay') {
        return '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">GPay</span>';
      }
      if (sourceApp === 'Net Banking') {
        return '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">Net Banking</span>';
      }
      if (sourceApp === 'Credit Card') {
        return '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">Credit Card</span>';
      }
      if (sourceApp === 'Debit Card') {
        return '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-200">Debit Card</span>';
      }
      if (sourceApp === 'BHIM UPI') {
        return '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-100 text-orange-800 border border-orange-200">BHIM UPI</span>';
      }
      if (sourceApp === 'PayPulse Direct') {
        return '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">UPI Lite</span>';
      }
      return `<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">${escapeHtml(sourceApp || 'SMS Sync')}</span>`;
    }

    function renderTransactionList() {
      const container = document.getElementById('transactionListContainer');
      const query = (document.getElementById('txSearchInput')?.value || '').toLowerCase().trim();
      const typeFilter = document.getElementById('txTypeFilter')?.value || 'ALL';
      const catFilter = document.getElementById('txCategoryFilter')?.value || 'ALL';
      const appFilter = document.getElementById('txSourceFilter')?.value || 'ALL';

      const filtered = transactions.filter((t) => {
        const matchesQuery = !query ||
          t.merchant.toLowerCase().includes(query) ||
          t.vpa.toLowerCase().includes(query) ||
          t.refId.toLowerCase().includes(query) ||
          (t.note && t.note.toLowerCase().includes(query));

        const tType = t.txnType || 'DEBIT';
        const matchesType = typeFilter === 'ALL' || tType === typeFilter;
        const matchesCat = catFilter === 'ALL' || t.category === catFilter;
        const matchesApp = appFilter === 'ALL' || t.sourceApp === appFilter;
        const matchesDate = checkTxnMatchesDateFilter(t, activeDateFilter);

        return matchesQuery && matchesType && matchesCat && matchesApp && matchesDate;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl">
            <p class="text-sm font-semibold text-slate-600">No matching transactions found</p>
            <p class="text-xs mt-1">Try adjusting the search query, category, type filter, or date range.</p>
          </div>
        `;
        return;
      }

      const categories = Object.keys(CATEGORY_META);

      container.innerHTML = filtered.map((tx) => {
        const meta = CATEGORY_META[tx.category] || CATEGORY_META['Others'];
        const isCredit = (tx.txnType || 'DEBIT') === 'CREDIT';
        const optionsHtml = categories.map((c) =>
          `<option value="${escapeHtml(c)}" ${c === tx.category ? 'selected' : ''}>${CATEGORY_META[c].icon} ${escapeHtml(c)}</option>`
        ).join('');

        const typeBadge = isCredit
          ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1"><span>+</span><span>Credit</span></span>'
          : '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1"><span>-</span><span>Debit</span></span>';

        const amountDisplay = isCredit
          ? `<p class="text-sm sm:text-base font-extrabold text-emerald-600">+₹${Number(tx.amount).toLocaleString('en-IN')}</p>`
          : `<p class="text-sm sm:text-base font-extrabold text-slate-900">-₹${Number(tx.amount).toLocaleString('en-IN')}</p>`;

        return `
          <div class="p-3.5 rounded-2xl ${isCredit ? 'bg-emerald-50/40 hover:bg-emerald-50/70 border-emerald-200/80' : 'bg-slate-50/80 hover:bg-white border-slate-200/90'} border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-sm ${isCredit ? 'ring-2 ring-emerald-400/40' : ''}">
                ${meta.icon}
              </div>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-1.5">
                  <p class="text-sm font-bold text-slate-900 truncate">${escapeHtml(tx.merchant)}</p>
                  ${typeBadge}
                  ${getSourceBadgeHtml(tx.sourceApp)}
                </div>
                <p class="text-xs text-slate-500 font-mono mt-0.5 truncate">
                  ${escapeHtml(tx.vpa)} • Ref: ${escapeHtml(tx.refId)} • ${escapeHtml(tx.timestamp || tx.isoDate)}
                </p>
                ${tx.note ? `<p class="text-xs text-slate-600 mt-1 italic">"${escapeHtml(tx.note)}"</p>` : ''}
              </div>
            </div>

            <div class="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
              <select aria-label="Change category for ${escapeHtml(tx.merchant)}" onchange="changeTransactionCategory('${tx.id}', this.value)" class="px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600">
                ${optionsHtml}
              </select>
              <div class="text-right min-w-[80px]">
                ${amountDisplay}
                <button type="button" onclick="deleteTransaction('${tx.id}')" class="text-[11px] text-slate-400 hover:text-rose-600 transition">Remove</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // --- Charts & Budget Controls ---
    function renderChartsAndBudgets() {
      const catTotals = {};
      Object.keys(CATEGORY_META).forEach((c) => { catTotals[c] = 0; });
      const appTotals = { 'PhonePe': 0, 'Paytm': 0, 'GPay': 0, 'Net Banking': 0, 'Credit Card': 0, 'Debit Card': 0, 'PayPulse Direct': 0, 'SMS Auto-Sync': 0 };

      // Sum only DEBITs for spending budget breakdown
      transactions.filter((t) => (t.txnType || 'DEBIT') === 'DEBIT').forEach((tx) => {
        catTotals[tx.category] = (catTotals[tx.category] || 0) + Number(tx.amount || 0);
        appTotals[tx.sourceApp] = (appTotals[tx.sourceApp] || 0) + Number(tx.amount || 0);
      });

      const activeCategories = Object.keys(catTotals).filter((c) => catTotals[c] > 0);
      const catData = activeCategories.map((c) => catTotals[c]);
      const catColors = activeCategories.map((c) => CATEGORY_META[c]?.color || '#64748b');

      const ctxCat = document.getElementById('categoryDoughnutChart').getContext('2d');
      if (categoryChartInstance) categoryChartInstance.destroy();
      categoryChartInstance = new Chart(ctxCat, {
        type: 'doughnut',
        data: {
          labels: activeCategories,
          datasets: [{
            data: catData,
            backgroundColor: catColors,
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } }
          }
        }
      });

      const appLabels = Object.keys(appTotals);
      const appValues = appLabels.map((k) => appTotals[k]);
      const ctxApp = document.getElementById('appSourceBarChart').getContext('2d');
      if (appSourceChartInstance) appSourceChartInstance.destroy();
      appSourceChartInstance = new Chart(ctxApp, {
        type: 'bar',
        data: {
          labels: appLabels,
          datasets: [{
            label: 'Total Spend (₹)',
            data: appValues,
            backgroundColor: ['#5f259f', '#00baf2', '#10b981', '#4f46e5', '#f59e0b'],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });

      // Render Budget Sliders
      const budgetGrid = document.getElementById('budgetControlsGrid');
      budgetGrid.innerHTML = Object.keys(CATEGORY_META).map((cat) => {
        const spent = catTotals[cat] || 0;
        const limit = categoryBudgets[cat] || 2000;
        const pct = Math.min(100, Math.round((spent / limit) * 100));
        const meta = CATEGORY_META[cat];
        const barColor = pct >= 100 ? 'bg-rose-500' : pct >= 80 ? 'bg-amber-500' : 'bg-emerald-500';

        return `
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800">${meta.icon} ${escapeHtml(cat)}</span>
              <span class="text-xs font-semibold ${pct >= 100 ? 'text-rose-600' : 'text-slate-500'}">${pct}%</span>
            </div>
            <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div class="${barColor} h-full rounded-full transition-all" style="width: ${pct}%"></div>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-600">
              <span>Spent: <strong>₹${spent.toLocaleString('en-IN')}</strong></span>
              <span>Cap: <strong>₹${limit.toLocaleString('en-IN')}</strong></span>
            </div>
            <input type="range" min="500" max="15000" step="250" value="${limit}"
              aria-label="Budget cap for ${escapeHtml(cat)}"
              onchange="updateCategoryBudget('${escapeHtml(cat)}', this.value)"
              class="w-full accent-purple-600 cursor-pointer" />
          </div>
        `;
      }).join('');
    }

    function updateCategoryBudget(category, newLimit) {
      categoryBudgets[category] = parseInt(newLimit, 10) || 1000;
      postToFlaskApi('/api/budgets', { category, limit: categoryBudgets[category] });
      saveState();
      refreshAllViews();
      showToast(`Updated ${category} monthly budget to ₹${categoryBudgets[category].toLocaleString('en-IN')}`);
    }

    function resetDefaultBudgets() {
      categoryBudgets = { ...DEFAULT_BUDGETS };
      postToFlaskApi('/api/budgets', { reset: true });
      saveState();
      refreshAllViews();
      showToast('Monthly category budgets reset to defaults');
    }

    // --- CSV Export ---
    function exportTransactionsCsv() {
      const headers = ['ID', 'Timestamp', 'Merchant', 'VPA', 'Amount_INR', 'Category', 'Source_App', 'UPI_Ref_ID', 'Note'];
      const rows = transactions.map((t) => [
        t.id,
        `"${(t.timestamp || '').replace(/"/g, '""')}"`,
        `"${(t.merchant || '').replace(/"/g, '""')}"`,
        t.vpa,
        t.amount,
        `"${t.category}"`,
        `"${t.sourceApp}"`,
        t.refId,
        `"${(t.note || '').replace(/"/g, '""')}"`
      ]);
      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'paypulse_upi_expenses.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(`Exported ${transactions.length} UPI transactions to CSV`);
    }

    // --- UPI Deep-Link Intent Builder ---
    function updateUpiDeepLink() {
      const pa = document.getElementById('intentPa').value.trim() || 'merchant@ybl';
      const pn = document.getElementById('intentPn').value.trim() || 'Merchant';
      const am = parseFloat(document.getElementById('intentAm').value) || 0;
      const tn = document.getElementById('intentTn').value.trim() || 'UPI Payment';

      const uri = `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(pn)}&am=${am.toFixed(2)}&cu=INR&tn=${encodeURIComponent(tn)}`;
      document.getElementById('generatedUpiUriDisplay').textContent = uri;
      return { pa, pn, am, tn, uri };
    }

    function copyTextFallback(text, successMsg) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast(successMsg);
      } catch (err) {
        showToast('Copied to buffer');
      }
      document.body.removeChild(ta);
    }

    function copyUpiDeepLink() {
      const { uri } = updateUpiDeepLink();
      copyTextFallback(uri, 'Copied NPCI upi://pay deep-link URI!');
    }

    function simulateIntentLaunch() {
      const { pa, pn, am, tn } = updateUpiDeepLink();
      const cat = detectCategory(pn, pa, tn);
      transactions.unshift({
        id: 'TXN-INTENT-' + Date.now(),
        merchant: pn,
        vpa: pa,
        amount: Math.round(am),
        category: cat,
        sourceApp: pa.includes('paytm') ? 'Paytm' : 'PhonePe',
        refId: '6293' + Math.floor(10000000 + Math.random() * 89999999),
        timestamp: 'Intent Callback',
        note: tn,
        autoCaptured: true
      });
      saveState();
      refreshAllViews();
      showToast(`Simulated UPI Intent Callback: ₹${am} to ${pn} logged under ${cat}`);
    }

    function copyArchitectureCode() {
      const code = document.getElementById('kotlinCodeBlock').innerText;
      copyTextFallback(code, 'Copied Android Kotlin NotificationListenerService code!');
    }

    // --- Utilities ---
    function escapeHtml(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    let toastTimer = null;
    function showToast(message) {
      const toast = document.getElementById('toastContainer');
      const msgEl = document.getElementById('toastMessage');
      msgEl.textContent = message;
      toast.classList.remove('hidden');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.add('hidden');
      }, 3600);
    }

    // --- Bank Account Login & RBI Account Aggregator / NPCI Linking ---
    let linkedBanks = [
      { bankName: 'HDFC Bank', maskedAcc: '9104', vpaHandle: '@ybl / @paytm', protocol: 'AA Active', balance: 63807, isPrimary: true },
      { bankName: 'State Bank of India', maskedAcc: '4821', vpaHandle: '@oksbi', protocol: 'AA Active', balance: 41290, isPrimary: false }
    ];
    let pendingDiscoveredMask = '7732';

    function renderLinkedBanksUI() {
      const primary = linkedBanks.find((b) => b.isPrimary) || linkedBanks[0];
      if (primary) {
        const badgeEl = document.getElementById('headerActiveBankBadge');
        if (badgeEl) badgeEl.textContent = `${primary.bankName} ••${primary.maskedAcc} (+Link)`;
        const pinBankEl = document.getElementById('pinModalBankName');
        if (pinBankEl) pinBankEl.textContent = `${primary.bankName} •••• ${primary.maskedAcc}`;
      }

      const listEl = document.getElementById('linkedBanksListContainer');
      if (!listEl) return;
      listEl.innerHTML = linkedBanks.map((b, idx) => `
        <div class="p-3 rounded-xl ${b.isPrimary ? 'bg-purple-50/70 border-purple-200' : 'bg-slate-50 border-slate-200'} border flex items-center justify-between gap-2">
          <div>
            <div class="flex items-center gap-2">
              <p class="text-xs font-bold text-slate-800">${escapeHtml(b.bankName)} •••• ${escapeHtml(b.maskedAcc)}</p>
              ${b.isPrimary ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-600 text-white">Primary</span>' : `<button type="button" onclick="setPrimaryBank(${idx})" class="text-[10px] font-semibold text-purple-700 underline">Set Primary</button>`}
            </div>
            <p class="text-[11px] text-slate-500">Handles: ${escapeHtml(b.vpaHandle)} • Est. Bal: ₹${Number(b.balance).toLocaleString('en-IN')}</p>
          </div>
          <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded whitespace-nowrap">${escapeHtml(b.protocol)}</span>
        </div>
      `).join('');
    }

    function setPrimaryBank(index) {
      linkedBanks.forEach((b, i) => { b.isPrimary = (i === index); });
      renderLinkedBanksUI();
      const active = linkedBanks[index];
      showToast(`Switched primary UPI & auto-tracking bank to ${active.bankName} •••• ${active.maskedAcc}`);
    }

    function openBankLoginModal() {
      resetBankModalToStep1();
      document.getElementById('bankLoginModal').classList.remove('hidden');
    }

    function closeBankLoginModal() {
      document.getElementById('bankLoginModal').classList.add('hidden');
    }

    function resetBankModalToStep1() {
      document.getElementById('bankLoginStep1').classList.remove('hidden');
      document.getElementById('bankLoginStep2').classList.add('hidden');
      document.getElementById('bankStepIndicator1').className = 'text-purple-700 font-bold';
      document.getElementById('bankStepIndicator2').className = 'text-slate-500';
    }

    function proceedToBankStep2() {
      const mobile = document.getElementById('loginMobileInput').value.trim();
      const customBank = (document.getElementById('loginCustomBankInput')?.value || '').trim();
      const bank = customBank || document.getElementById('loginBankSelect').value;
      const protocol = document.getElementById('loginAuthProtocol').value;
      const ownLast4 = (document.getElementById('loginOwnLast4Input')?.value || '').replace(/\D/g, '');

      if (mobile.length < 10) {
        showToast('Please enter a valid 10-digit mobile number linked to your bank');
        return;
      }

      pendingDiscoveredMask = ownLast4.length === 4 ? ownLast4 : Math.floor(1000 + Math.random() * 8999).toString();
      document.getElementById('discoveredMaskedAcc').textContent = `•••• ${pendingDiscoveredMask}`;
      document.getElementById('otpStepSubtitle').textContent = `${bank} (${protocol})`;
      document.getElementById('bankLoginStep1').classList.add('hidden');
      document.getElementById('bankLoginStep2').classList.remove('hidden');
      document.getElementById('bankStepIndicator1').className = 'text-emerald-600 font-semibold';
      document.getElementById('bankStepIndicator2').className = 'text-purple-700 font-bold';
      showToast(`OTP sent to +91 ${mobile} for ${bank} A/C •••• ${pendingDiscoveredMask}`);
    }

    function fillDemoBankOtp() {
      document.getElementById('bankOtpInput').value = '482910';
    }

    function completeBankAccountLinking() {
      const otp = document.getElementById('bankOtpInput').value.trim();
      if (otp.length < 4) {
        showToast('Please enter the 6-digit verification OTP');
        return;
      }

      const customBank = (document.getElementById('loginCustomBankInput')?.value || '').trim();
      const bank = customBank || document.getElementById('loginBankSelect').value;
      const protocol = document.getElementById('loginAuthProtocol').value;
      const shortProtocol = protocol.includes('Aggregator') ? 'AA Consent' : protocol.includes('Webhook') ? 'SMS Webhook' : 'UPI Linked';
      const ownVpa = (document.getElementById('loginOwnVpaInput')?.value || '').trim() || 'myaccount@ybl';
      const ownBal = parseInt(document.getElementById('loginOwnBalanceInput')?.value, 10);
      const finalBalance = !isNaN(ownBal) && ownBal >= 0 ? ownBal : 45000;
      const clearDemo = document.getElementById('loginClearDemoCheckbox')?.checked;

      if (clearDemo) {
        transactions = [];
        linkedBanks = [];
      } else {
        linkedBanks.forEach((b) => { b.isPrimary = false; });
      }

      const newBankObj = {
        bankName: bank,
        maskedAcc: pendingDiscoveredMask,
        vpaHandle: ownVpa,
        protocol: shortProtocol,
        balance: finalBalance,
        isPrimary: true
      };
      linkedBanks.unshift(newBankObj);

      if (!clearDemo) {
        transactions.unshift({
          id: 'TXN-BANK-' + Date.now(),
          merchant: bank + ' A/C Verification',
          vpa: ownVpa,
          amount: 1,
          category: 'Transfers & Friends',
          sourceApp: 'PhonePe',
          refId: '6293' + Math.floor(10000000 + Math.random() * 89999999),
          timestamp: `Linked ${bank}`,
          note: ` Penny-drop verification for ${bank} ••${pendingDiscoveredMask}`,
          autoCaptured: true
        });
      }

      postToFlaskApi('/api/banks', {
        bankName: bank,
        maskedAcc: pendingDiscoveredMask,
        vpaHandle: ownVpa,
        protocol: shortProtocol,
        balance: finalBalance,
        clearDemo: Boolean(clearDemo)
      });

      document.getElementById('headerBalanceLabel').textContent = `A/C Bal: ₹${finalBalance.toLocaleString('en-IN')}`;

      closeBankLoginModal();
      saveState();
      renderLinkedBanksUI();
      refreshAllViews();
      showToast(`🎉 Linked your ${bank} account (•••• ${pendingDiscoveredMask}) with VPA ${ownVpa}!`);
    }

    function commitBulkSmsMessages() {
      const raw = document.getElementById('smsRawInput').value;
      const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 8);
      if (lines.length === 0) {
        showToast('Paste one or more bank SMS lines into the box first');
        return;
      }
      let importedCount = 0;
      lines.forEach((line, idx) => {
        const res = parseSmsText(line);
        if (res.amount > 0) {
          const newTx = {
            id: 'TXN-SMS-' + Date.now() + '-' + idx,
            merchant: res.merchant,
            vpa: res.vpa,
            amount: res.amount,
            category: res.category,
            sourceApp: res.sourceApp,
            refId: res.refId,
            timestamp: 'Imported SMS',
            note: line.slice(0, 70) + (line.length > 70 ? '...' : ''),
            autoCaptured: true
          };
          transactions.unshift(newTx);
          postToFlaskApi('/api/parse-sms', { smsText: line, sourceChannel: document.getElementById('smsSourceChannelSelect')?.value || 'AUTO', commit: true });
          importedCount++;
        }
      });
      saveState();
      refreshAllViews();
      showToast(`⚡ Bulk parsed & logged ${importedCount} real SMS transaction(s) to your tracker!`);
    }

    function handleOwnFileImport(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        const content = String(e.target.result || '');
        const lines = content.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 5);
        let count = 0;
        lines.forEach((line, idx) => {
          // Skip CSV header rows
          if (idx === 0 && /amount|merchant|date|narration|description/i.test(line) && line.includes(',')) {
            return;
          }
          // Check if standard CSV row (Date,Merchant/Narration,Amount,...) or raw SMS line
          const cols = line.split(',').map((c) => c.replace(/^"|"$/g, '').trim());
          let parsed = null;
          if (cols.length >= 3 && !/debited|credited|upi ref/i.test(line)) {
            const numCol = cols.find((c) => /^[0-9]+(\.[0-9]{1,2})?$/.test(c));
            const textCol = cols.find((c) => /[A-Za-z]{3,}/.test(c) && !/^\d/.test(c)) || 'Statement Merchant';
            const amt = numCol ? Math.round(parseFloat(numCol)) : 0;
            if (amt > 0) {
              parsed = {
                amount: amt,
                merchant: textCol,
                vpa: 'statement@bank',
                refId: 'CSV-' + Math.floor(100000 + Math.random() * 899999),
                sourceApp: 'SMS Auto-Sync',
                category: detectCategory(textCol, '', line)
              };
            }
          } else {
            parsed = parseSmsText(line);
          }

          if (parsed && parsed.amount > 0) {
            const tx = {
              id: 'TXN-FILE-' + Date.now() + '-' + idx,
              merchant: parsed.merchant,
              vpa: parsed.vpa,
              amount: parsed.amount,
              category: parsed.category,
              sourceApp: parsed.sourceApp,
              refId: parsed.refId,
              timestamp: file.name,
              note: 'Imported from ' + file.name,
              autoCaptured: true
            };
            transactions.unshift(tx);
            postToFlaskApi('/api/transactions', tx);
            count++;
          }
        });
        saveState();
        refreshAllViews();
        showToast(`📂 Imported ${count} transaction(s) from ${file.name}!`);
        event.target.value = '';
      };
      reader.readAsText(file);
    }

    function clearDemoDataAndResetPersonal() {
      transactions = [];
      postToFlaskApi('/api/reset-personal', { clearTransactions: true });
      saveState();
      refreshAllViews();
      showToast('Cleared sample transactions! Your ledger now tracks only your own messages and payments.');
    }

    // --- AI Financial Copilot & Full-Stack Flask + SQLite Sync ---
    let isFlaskBackendConnected = false;
    let aiChatHistory = [
      {
        role: 'ai',
        text: 'Hello! I am your PayPulse AI Financial Copilot. I analyze your PhonePe, Paytm, and Bank SMS transactions in real time. Ask me how to save money, inspect category trends, or flag unusual debits!'
      }
    ];

        async function syncFromFlaskBackend() {
      try {
        const res = await fetch('/api/state', { method: 'GET' });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.transactions)) {
          transactions = data.transactions;
        }
        if (Array.isArray(data.linkedBanks) && data.linkedBanks.length > 0) {
          linkedBanks = data.linkedBanks;
        }
        if (data.categoryBudgets) {
          categoryBudgets = { ...DEFAULT_BUDGETS, ...data.categoryBudgets };
        }
        if (Array.isArray(data.customMerchantRules)) {
          customMerchantRules = data.customMerchantRules;
        }
        isFlaskBackendConnected = true;
        const badge = document.getElementById('backendStatusBadge');
        if (badge) {
          badge.textContent = 'Connected to Flask + SQLite3 (paypulse.db)';
        }
        renderLinkedBanksUI();
        renderCustomRulesPills();
        refreshAllViews();
      } catch (e) {
        // Fallback to local state if offline
      }
    }

    async function postToFlaskApi(endpoint, payload, method = 'POST') {
      try {
        const res = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) return await res.json();
      } catch (e) {
        // Offline fallback
      }
      return null;
    }

    function computeLocalAiInsights(userQuery = '') {
      const totalSpent = transactions.reduce((s, t) => s + Number(t.amount || 0), 0);
      const totalBudget = Object.values(categoryBudgets).reduce((s, b) => s + Number(b || 0), 0);
      const txCount = transactions.length;
      const avgTx = txCount > 0 ? totalSpent / txCount : 0;

      const catTotals = {};
      const merchTotals = {};
      const appTotals = {};

      transactions.forEach((t) => {
        const amt = Number(t.amount || 0);
        catTotals[t.category] = (catTotals[t.category] || 0) + amt;
        merchTotals[t.merchant] = (merchTotals[t.merchant] || 0) + amt;
        appTotals[t.sourceApp] = (appTotals[t.sourceApp] || 0) + amt;
      });

      const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0] || ['Food & Dining', 0];
      const topMerch = Object.entries(merchTotals).sort((a, b) => b[1] - a[1])[0] || ['Swiggy', 0];
      const topApp = Object.entries(appTotals).sort((a, b) => b[1] - a[1])[0] || ['PhonePe', 0];
      const anomalies = transactions.filter((t) => Number(t.amount || 0) > Math.max(1000, avgTx * 1.6));
      const discretionary = (catTotals['Food & Dining'] || 0) + (catTotals['Shopping'] || 0) + (catTotals['Entertainment'] || 0);
      const potentialSavings = Math.max(250, Math.round(discretionary * 0.22));

      const q = (userQuery || '').toLowerCase();
      let reply = '';
      if (!q || q.includes('save') || q.includes('reduce')) {
        reply = `Discretionary spend across Food & Dining (₹${(catTotals['Food & Dining'] || 0).toLocaleString('en-IN')}) and Shopping (₹${(catTotals['Shopping'] || 0).toLocaleString('en-IN')}) is ₹${discretionary.toLocaleString('en-IN')}. Capping quick UPI Lite orders at ₹350/day can save ~₹${potentialSavings.toLocaleString('en-IN')}/month.`;
      } else if (q.includes('swiggy') || q.includes('food') || q.includes('zomato')) {
        const fSpent = catTotals['Food & Dining'] || 0;
        const fCap = categoryBudgets['Food & Dining'] || 5000;
        reply = `You spent ₹${fSpent.toLocaleString('en-IN')} on Food & Dining (${Math.round((fSpent / fCap) * 100)}% of your ₹${fCap.toLocaleString('en-IN')} cap). Shifting 2 weekly deliveries to Groceries saves ~₹1,100/month.`;
      } else if (q.includes('phonepe') || q.includes('paytm') || q.includes('rail')) {
        const railStr = Object.entries(appTotals).map(([k, v]) => `${k}: ₹${v.toLocaleString('en-IN')}`).join(' • ');
        reply = `UPI Rail Split: ${railStr}. ${topApp[0]} is your highest-volume payment app.`;
      } else if (q.includes('anomal') || q.includes('unusual') || q.includes('flag')) {
        if (anomalies.length > 0) {
          reply = `AI Anomaly Radar flagged ${anomalies.length} above-average debit(s), led by ₹${Number(anomalies[0].amount).toLocaleString('en-IN')} at ${anomalies[0].merchant} (${anomalies[0].category}), vs. your ₹${Math.round(avgTx).toLocaleString('en-IN')} average ticket.`;
        } else {
          reply = `Zero spending anomalies found! Your average UPI ticket is steady at ₹${Math.round(avgTx).toLocaleString('en-IN')}.`;
        }
      } else {
        reply = `Ledger Summary: ₹${totalSpent.toLocaleString('en-IN')} spent across ${txCount} UPI transactions. Top category: ${topCat[0]} (₹${topCat[1].toLocaleString('en-IN')}), top merchant: ${topMerch[0]} (₹${topMerch[1].toLocaleString('en-IN')}). Budget left: ₹${Math.max(0, totalBudget - totalSpent).toLocaleString('en-IN')}.`;
      }

      return {
        reply,
        metrics: {
          avgTicket: Math.round(avgTx),
          potentialMonthlySavings: potentialSavings,
          topMerchant: topMerch[0],
          anomalyCount: anomalies.length
        }
      };
    }

    function renderAiCopilotPanel() {
      const localRes = computeLocalAiInsights('');
      const m = localRes.metrics;
      const avgEl = document.getElementById('aiMetricAvgTicket');
      if (avgEl) avgEl.textContent = `₹${m.avgTicket.toLocaleString('en-IN')}`;
      const savEl = document.getElementById('aiMetricPotentialSavings');
      if (savEl) savEl.textContent = `₹${m.potentialMonthlySavings.toLocaleString('en-IN')}/mo`;
      const merchEl = document.getElementById('aiMetricTopMerchant');
      if (merchEl) merchEl.textContent = m.topMerchant;
      const anomEl = document.getElementById('aiMetricAnomalyCount');
      if (anomEl) anomEl.textContent = `${m.anomalyCount} flagged`;

      const chatBox = document.getElementById('aiChatMessages');
      if (!chatBox) return;
      chatBox.innerHTML = aiChatHistory.map((item) => {
        if (item.role === 'user') {
          return `
            <div class="flex justify-end">
              <div class="bg-purple-600 text-white px-3.5 py-2 rounded-2xl rounded-tr-none max-w-[85%]">
                <p class="font-semibold text-[11px] text-purple-200 mb-0.5">You</p>
                <p>${escapeHtml(item.text)}</p>
              </div>
            </div>
          `;
        }
        return `
          <div class="flex justify-start">
            <div class="bg-slate-800 border border-slate-700 text-slate-100 px-3.5 py-2.5 rounded-2xl rounded-tl-none max-w-[90%]">
              <p class="font-bold text-[11px] text-cyan-400 mb-0.5">✨ PayPulse AI Engine</p>
              <p class="leading-relaxed">${escapeHtml(item.text)}</p>
            </div>
          </div>
        `;
      }).join('');
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function askAiQuickPrompt(promptText) {
      document.getElementById('aiQueryInput').value = promptText;
      await processAiQuery(promptText);
    }

    async function handleAiChatSubmit(e) {
      e.preventDefault();
      const input = document.getElementById('aiQueryInput');
      const query = input.value.trim();
      if (!query) return;
      input.value = '';
      await processAiQuery(query);
    }

    async function processAiQuery(query) {
      aiChatHistory.push({ role: 'user', text: query });
      renderAiCopilotPanel();

      const apiRes = await postToFlaskApi('/api/ai-advisor', { query });
      const answer = (apiRes && apiRes.reply)
        ? apiRes.reply.replace(/\*\*/g, '')
        : computeLocalAiInsights(query).reply;

      aiChatHistory.push({ role: 'ai', text: answer });
      renderAiCopilotPanel();
    }

    // Initialize on load
    window.addEventListener('DOMContentLoaded', () => {
      loadSavedState();
      renderLinkedBanksUI();
      parseSmsLive();
      renderCustomRulesPills();
      updateUpiDeepLink();
      renderAiCopilotPanel();
      refreshAllViews();
      syncFromFlaskBackend();
    });
