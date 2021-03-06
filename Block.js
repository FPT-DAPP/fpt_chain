const crypto = require('crypto');

module.exports = class Block {
    constructor(txs, prevHash, difficulty) {
        this.difficulty = difficulty;
        this.txs = txs || [];
        this.nonce = 0;
        this.prevHash = prevHash;
        this.makeNewHash();
    }

    toString() {
        return [this.txs.join(";"), this.nonce, this.prevHash, this.difficulty, this.timestamp].join(";");
    }

    makeNewHash() {
        this.timestamp = Math.floor(Date.now()/1000);
        this.hash = crypto.createHash('sha256').update(this.toString()).digest("hex");
        //console.log(this.hash);
        this.nonce++;
    }

    isHashValid() {
        return this.hash.startsWith("0".repeat(this.difficulty));
    }
}