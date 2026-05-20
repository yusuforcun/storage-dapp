// SPDX-License-Identifier: MIT
// Contract Address (Deploy ettiğin adresi buraya yaz)
const contractAddress = "0x0fC5025C764cE34df352757e82f7B5c4Df39A836";

// Contract ABI
const contractABI = [
    {
        "inputs": [],
        "name": "message",
        "outputs": [{"internalType": "string","name": "","type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }
];

let provider;
let contract;
let signer;

async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // MetaMask'ten hesap izni iste
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Provider oluştur
            provider = new ethers.BrowserProvider(window.ethereum);
            
            // Signer al (işlem yapmak için)
            signer = await provider.getSigner();
            
            // Contract örneği oluştur
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            
            document.getElementById("status").innerHTML = "✅ Wallet connected!";
            document.getElementById("connectBtn").innerHTML = "🦊 Connected";
            document.getElementById("connectBtn").disabled = true;
            
            // Veriyi çek
            await getData();
            
        } catch (error) {
            console.error("Connection error:", error);
            document.getElementById("status").innerHTML = "❌ Connection failed: " + error.message;
            document.getElementById("label1").innerText = "Connection failed";
        }
    } else {
        document.getElementById("status").innerHTML = "❌ MetaMask not installed! Please install MetaMask extension.";
        document.getElementById("label1").innerText = "MetaMask not found";
    }
}

async function getData() {
    if (!contract) {
        document.getElementById("label1").innerText = "Please connect wallet first";
        return;
    }
    
    try {
        // Contract'tan mesajı çek
        const data = await contract.message();
        document.getElementById("label1").innerText = data;
        document.getElementById("status").innerHTML = "✅ Data loaded from blockchain!";
    } catch (error) {
        console.error("Error getting data:", error);
        document.getElementById("label1").innerText = "Error loading data";
        document.getElementById("status").innerHTML = "❌ Error: " + error.message;
    }
}

// Connect butonu event listener
document.getElementById("connectBtn").addEventListener("click", connectWallet);

// Sayfa yüklendiğinde kontrol et (MetaMask varsa otomatik bağlan)
window.onload = async function() {
    if (typeof window.ethereum !== "undefined") {
        // MetaMask yüklü ama bağlı değil
        document.getElementById("label1").innerText = "Click 'Connect Wallet' to start";
        document.getElementById("status").innerHTML = "🦊 MetaMask detected. Click connect button.";
        
        // Eğer zaten bağlı hesap varsa otomatik bağlan
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            await connectWallet();
        }
    } else {
        document.getElementById("label1").innerText = "MetaMask not found";
        document.getElementById("status").innerHTML = "❌ Please install MetaMask extension";
    }
};
