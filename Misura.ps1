Clear-Host
Write-Host "============================="
Write-Host "     MISURA - Unit Converter"
Write-Host "============================="
Write-Host ""
Write-Host "1. Uzunluk"
Write-Host "2. Alan"
Write-Host "3. Hacim"
Write-Host "4. Ağırlık"
Write-Host "5. Hız"
Write-Host "6. Basınç"
Write-Host "7. Enerji"
Write-Host "8. Zaman"
Write-Host "9. Çıkış"
Write-Host ""

$choice = Read-Host "Bir kategori seç (1-9)"

switch ($choice) {
    "1" { Write-Host "Uzunluk çevirici seçildi" }
    "2" { Write-Host "Alan çevirici seçildi" }
    "3" { Write-Host "Hacim çevirici seçildi" }
    "4" { Write-Host "Ağırlık çevirici seçildi" }
    "5" { Write-Host "Hız çevirici seçildi" }
    "6" { Write-Host "Basınç çevirici seçildi" }
    "7" { Write-Host "Enerji çevirici seçildi" }
    "8" { Write-Host "Zaman çevirici seçildi" }
    "9" { exit }
    default { Write-Host "Geçersiz seçim!" }
}
