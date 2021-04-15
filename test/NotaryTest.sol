pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Notary.sol";
// import "../contracts/Migrations.sol"

contract NotaryTest {
  function testAddAndRead() public {

    Notary notaryContract = Notary(DeployedAddresses.Notary());
    notaryContract.addEntry(0x38886B92EB93D0E74345A175B66ABA097D091BC735435034F9FDB7F484233CDC, "test", "test");

    string memory fileName;
    uint timestamp;
    string memory comment;
    address sender;
    (fileName, timestamp, comment, sender) = notaryContract.entrySet(0x38886B92EB93D0E74345A175B66ABA097D091BC735435034F9FDB7F484233CDC);
    Assert.equal(fileName, "test", "Test shoud be the filename");

    Assert.equal(sender, address(this), "The same address for this caller should be the address who created the hash");
  }

  function testExceptions() public {
    address notaryAddress = address(DeployedAddresses.Notary());
    bool transactionSentSuccessful = notaryAddress.call(bytes4(keccak256("entrySet(bytes32)")), 0x39986B92EB93D0E74345A175B66ABA097D091BC735435034F9FDB7F484233CD0);
    Assert.equal(transactionSentSuccessful, false, "The transaction should fail");
  }
}
