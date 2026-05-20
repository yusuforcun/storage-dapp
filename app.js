const contractAddress = "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9";
const contractABI = ["function message() view returns (string)"];

async function loadMessage() {
    if (!window.ethereum) {
        document.getElementById("label1").innerHTML = "❌ MetaMask yüklü değil";
        return;
    }
    
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const message = await contract.message();
        
        document.getElementById("label1").innerHTML = "✅ " + message;
    } catch (error) {
        document.getElementById("label1").innerHTML = "❌ Hata: " + error.message;
    }
}

window.onload = loadMessage;
