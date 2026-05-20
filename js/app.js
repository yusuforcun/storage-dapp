async function baglan() {
    if (!window.ethereum) {
        document.getElementById("sonuc").innerHTML = "METAMASK YOK";
        return;
    }
    
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    const cevap = await fetch("https://api.etherscan.io/api?module=contract&action=getabi&address=0x0fC5025C764cE34df352757e82f7B5c4Df39A836");
    
    document.getElementById("sonuc").innerHTML = "BAĞLANTI BAŞARILI";
}

baglan();