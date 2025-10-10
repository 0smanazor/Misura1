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

// Sıcaklık özel dönüşüm fonksiyonları
function convertTemperature(value, from, to) {
  if (from === to) return value;

  // C -> F, K
  if (from === "C" && to === "F") return (value * 9/5) + 32;
  if (from === "C" && to === "K") return value + 273.15;

  // F -> C, K
  if (from === "F" && to === "C") return (value - 32) * 5/9;
  if (from === "F" && to === "K") return (value - 32) * 5/9 + 273.15;

  // K -> C, F
  if (from === "K" && to === "C") return value - 273.15;
  if (from === "K" && to === "F") return (value - 273.15) * 9/5 + 32;

  return value;
}

// === Arayüz ===
function populateCategories() {
  const categorySelect = document.getElementById("category");

  // 🔹 Eklenen satır: her çağrıldığında listeyi temizle
  categorySelect.innerHTML = "";

  // 🔹 Tek tek kategori seçeneklerini yeniden oluştur
  Object.keys(unitsData).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}


function populateUnits(category) {
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");
  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  const units = Object.keys(unitsData[category]);
  units.forEach(u => {
    const opt1 = document.createElement("option");
    opt1.value = u;
    opt1.textContent = u;
    fromSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = u;
    opt2.textContent = u;
    toSelect.appendChild(opt2);
  });
}

// === Olaylar ===
document.getElementById("category").addEventListener("change", (e) => {
  populateUnits(e.target.value);
});

document.getElementById("convert").addEventListener("click", () => {
  const category = document.getElementById("category").value;
  const value = parseFloat(document.getElementById("value").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const resultElement = document.getElementById("result");

  if (isNaN(value)) {
    resultElement.textContent = "Lütfen geçerli bir sayı girin.";
    return;
  }

  if (!from || !to) {
    resultElement.textContent = "Lütfen birimleri seçin.";
    return;
  }

  let result;

  if (category === "Sıcaklık") {
    result = convertTemperature(value, from, to);
  } else {
    const baseValue = value * unitsData[category][from];
    result = baseValue / unitsData[category][to];
  }

  resultElement.textContent = `${value} ${from} = ${result} ${to}`;
});

window.addEventListener("load", () => {
  populateCategories();
  populateUnits("Uzunluk"); // varsayılan kategori
});
