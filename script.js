// ================================
// 🌍 DİL VE BİRİM VERİLERİ
// ================================

let currentLang = localStorage.getItem("lang") || "tr";

const translations = {
  tr: {
    title: "Evrensel Ölçü Birimi Çevirici",
    selectCategory: "Kategori Seç:",
    placeholder: "Değer girin",
    convert: "Çevir",
    invalid: "Lütfen geçerli bir sayı girin.",
    selectUnits: "Lütfen birimleri seçin."
  },
  en: {
    title: "Universal Unit Converter",
    selectCategory: "Select Category:",
    placeholder: "Enter value",
    convert: "Convert",
    invalid: "Please enter a valid number.",
    selectUnits: "Please select the units."
  }
};

// ================================
// 📏 TÜM BİRİMLER
// ================================

let unitsData = {
  "Uzunluk": {
    "m/metre": 1,
    "cm/santimetre": 0.01,
    "mm/milimetre": 0.001,
    "km/kilometre": 1000,
    "inch/inç": 0.0254,
    "ft/feet": 0.3048,
    "mile/mil": 1609.34,
    "yard/yarda": 0.9144,
    "nautical-mile/deniz mili": 1852
  },
  "Kütle": {
    "kg/kilogram": 1,
    "g/gram": 0.001,
    "mg/miligram": 0.000001,
    "lb/libre": 0.453592,
    "oz/ons": 0.0283495,
    "ton": 1000,
    "stone": 6.35029
  },
  "Hacim": {
    "l/litre": 1,
    "ml/mililitre": 0.001,
    "m3/metreküp": 1000,
    "cm3/santimetreküp": 0.001,
    "gallon/galon": 3.785,
    "quart/kuart": 0.946,
    "cup/bardak": 0.24,
    "tbsp/yemek kasigi": 0.015,
    "tsp/cay kasigi": 0.005
  },
  "Alan": {
    "m2/metrekare": 1,
    "cm2/santimetrekare": 0.0001,
    "mm2/milimetrekare": 0.000001,
    "km2/kilometrekare": 1000000,
    "ft2/fit kare": 0.092903,
    "in2/inç kare": 0.00064516,
    "acre/dönüm": 4046.86,
    "hectare/hektar": 10000
  },
  "Zaman": {
    "s/saniye": 1,
    "ms/milisaniye": 0.001,
    "min/dakika": 60,
    "h/saat": 3600,
    "day/gün": 86400,
    "week/hafta": 604800
  },
  "Hız": {
    "m/s/metre-saniye": 1,
    "km/h/kilometre-saat": 0.277778,
    "mph/mil-saat": 0.44704,
    "knot/deniz mili-saat": 0.514444
  },
  "Enerji": {
    "J/joule": 1,
    "kJ/kilojoule": 1000,
    "cal/kalori": 4.184,
    "kcal/kilokalori": 4184,
    "Wh/watt-saat": 3600,
    "kWh/kilowatt-saat": 3600000
  },
  "Basınç": {
    "Pa/paskal": 1,
    "kPa/kilopaskal": 1000,
    "bar": 100000,
    "psi/inç kare basina libre": 6894.76,
    "atm/atmosfer basinci": 101325
  },
  "Sıcaklık": {
    "C/santigrat derece": "°C",
    "F/fahrenhayt derece": "°F",
    "K/kelvin": "K"
  }
};

// ================================
// 🌡️ Sıcaklık Özel Fonksiyonları
// ================================

function convertTemperature(value, from, to) {
  if (from === to) return value;
  if (from === "C" && to === "F") return (value * 9 / 5) + 32;
  if (from === "C" && to === "K") return value + 273.15;
  if (from === "F" && to === "C") return (value - 32) * 5 / 9;
  if (from === "F" && to === "K") return (value - 32) * 5 / 9 + 273.15;
  if (from === "K" && to === "C") return value - 273.15;
  if (from === "K" && to === "F") return (value - 273.15) * 9 / 5 + 32;
  return value;
}

// ================================
// 🧩 Arayüz Fonksiyonları
// ================================

function populateCategories() {
  const categorySelect = document.getElementById("category");
  categorySelect.innerHTML = "";

  const categories = currentLang === "tr"
    ? ["Uzunluk", "Kütle", "Hacim", "Alan", "Zaman", "Hız", "Enerji", "Basınç", "Sıcaklık"]
    : ["Length", "Mass", "Volume", "Area", "Time", "Speed", "Energy", "Pressure", "Temperature"];

  categories.forEach((cat, index) => {
    const opt = document.createElement("option");
    opt.value = currentLang === "tr"
      ? categories[index]
      : Object.keys(unitsData)[index]; // bağlantı korunur
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

function populateUnits(category) {
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");
  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  const mapTrToEn = {
    "Uzunluk": "Length",
    "Kütle": "Mass",
    "Hacim": "Volume",
    "Alan": "Area",
    "Zaman": "Time",
    "Hız": "Speed",
    "Enerji": "Energy",
    "Basınç": "Pressure",
    "Sıcaklık": "Temperature"
  };
  const mapEnToTr = Object.fromEntries(Object.entries(mapTrToEn).map(([tr, en]) => [en, tr]));

  let realCategory = category;
  if (currentLang === "en" && mapEnToTr[category]) {
    realCategory = mapEnToTr[category];
  }

  const units = Object.keys(unitsData[realCategory] || {});
  units.forEach(u => {
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");
    opt1.value = u;
    opt2.value = u;
    opt1.textContent = u;
    opt2.textContent = u;
    fromSelect.appendChild(opt1);
    toSelect.appendChild(opt2);
  });
}

// ================================
// 🔁 Dil Güncelleme
// ================================

function updateLanguage() {
  const langData = translations[currentLang];
  document.getElementById("subtitle").textContent = langData.title;
  document.querySelector("label[for='category']").textContent = langData.selectCategory;
  document.getElementById("value").placeholder = langData.placeholder;
  document.getElementById("convert").textContent = langData.convert;
  document.getElementById("lang-btn").textContent = currentLang === "tr" ? "EN" : "TR";
}

// ================================
// ⚙️ Dönüştürme İşlemi
// ================================

document.getElementById("convert").addEventListener("click", () => {
  const category = document.getElementById("category").value;
  const value = parseFloat(document.getElementById("value").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const resultElement = document.getElementById("result");

  if (isNaN(value)) {
    resultElement.textContent = translations[currentLang].invalid;
    return;
  }
  if (!from || !to) {
    resultElement.textContent = translations[currentLang].selectUnits;
    return;
  }

  const mapEnToTr = {
    "Length": "Uzunluk",
    "Mass": "Kütle",
    "Volume": "Hacim",
    "Area": "Alan",
    "Time": "Zaman",
    "Speed": "Hız",
    "Energy": "Enerji",
    "Pressure": "Basınç",
    "Temperature": "Sıcaklık"
  };

  let realCategory = category;
  if (currentLang === "en" && mapEnToTr[category]) {
    realCategory = mapEnToTr[category];
  }

  let result;
  if (realCategory === "Sıcaklık") {
    result = convertTemperature(value, from, to);
  } else {
    const baseValue = value * unitsData[realCategory][from];
    result = baseValue / unitsData[realCategory][to];
  }

  resultElement.textContent = `${value} ${from} = ${parseFloat(result.toFixed(4))} ${to}`;
});

// ================================
// 🧭 Kategori Değiştiğinde Alt Birimleri Güncelle
// ================================

document.getElementById("category").addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  const mapEnToTr = {
    "Length": "Uzunluk",
    "Mass": "Kütle",
    "Volume": "Hacim",
    "Area": "Alan",
    "Time": "Zaman",
    "Speed": "Hız",
    "Energy": "Enerji",
    "Pressure": "Basınç",
    "Temperature": "Sıcaklık"
  };

  let realCategory = selectedCategory;
  if (currentLang === "en" && mapEnToTr[selectedCategory]) {
    realCategory = mapEnToTr[selectedCategory];
  }

  populateUnits(realCategory);

  // 🔸 Eski sonucu temizle
  document.getElementById("result").textContent = "";
});

// ================================
// 🌐 Dil Butonu
// ================================

document.getElementById("lang-btn").addEventListener("click", () => {
  currentLang = currentLang === "tr" ? "en" : "tr";
  localStorage.setItem("lang", currentLang);
  updateLanguage();
  populateCategories();
  populateUnits(document.getElementById("category").value);

  // 🔸 Dil değiştirildiğinde önceki hata/sonuç yazısı silinsin
  document.getElementById("result").textContent = "";
});

// ================================
// 🚀 Sayfa Yüklenince
// ================================

window.addEventListener("load", () => {
  updateLanguage();
  populateCategories();
  populateUnits(currentLang === "tr" ? "Uzunluk" : "Length");
});
