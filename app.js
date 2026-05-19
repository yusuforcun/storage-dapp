const contractAddress = "0x0fC5025C764cE34df352757e82f7B5c4Df39A836";
const contractABI = ["function message() public view returns (string)"];

async function getData(){
    if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.BrowserProvider(window.ethereum);

        const contract = new ethers.Contract(contractAddress , contractABI , provider);

        const data = await contract.message();

        document.getElementById("label1").innerText = data ;
    }
    else {
        document.getElementById("label1").innerText = "Non Found";
    }
}
window.onload=getData ;