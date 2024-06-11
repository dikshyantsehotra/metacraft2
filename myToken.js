class MyToken {
    constructor(name, symbol) {
        this.name = name; // Token Name
        this.symbol = symbol; // Token Abbreviation
        this.totalSupply = 0; // Total Supply
        this.balances = {}; // Mapping of addresses to balances
    }

    // Mint function
    mint(address, value) {
        // Increase the total supply
        this.totalSupply += value;
        // If the address does not have a balance, initialize it to 0
        if (!this.balances[address]) {
            this.balances[address] = 0;
        }
        // Increase the balance of the specified address
        this.balances[address] += value;
    }

    // Burn function
    burn(address, value) {
        // Ensure the balance is sufficient for the burn
        if (this.balances[address] >= value) {
            // Decrease the total supply
            this.totalSupply -= value;
            // Decrease the balance of the specified address
            this.balances[address] -= value;
        } else {
            console.log("Insufficient balance to burn");
        }
    }

    // Function to get the balance of an address
    getBalance(address) {
        return this.balances[address] || 0;
    }
}

// Example usage:
let myToken = new MyToken("MyToken", "MTK");

// Minting tokens
myToken.mint("0x123", 100);
console.log(`Total Supply after minting: ${myToken.totalSupply}`); // 100
console.log(`Balance of 0x123: ${myToken.getBalance("0x123")}`); // 100

// Burning tokens
myToken.burn("0x123", 50);
console.log(`Total Supply after burning: ${myToken.totalSupply}`); // 50
console.log(`Balance of 0x123: ${myToken.getBalance("0x123")}`); // 50

// Attempt to burn more tokens than available
myToken.burn("0x123", 100); // Insufficient balance to burn
console.log(`Total Supply after failed burn: ${myToken.totalSupply}`); // 50
console.log(`Balance of 0x123: ${myToken.getBalance("0x123")}`); // 50
