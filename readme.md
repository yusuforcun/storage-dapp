1. The dApp Architecture (Solidity + HTML + JS)
Solidity (.sol): Acts as the decentralized backend. Making the message variable public automatically creates a getter function to read this data from the blockchain.

HTML (.html): The frontend skeleton. The empty <label id="label1"></label> serves as a placeholder for the blockchain data.

JavaScript (.js): The bridge. Using window.onload, JS triggers instantly when the page loads, fetches the Solidity data, and injects it into the HTML label using innerText.